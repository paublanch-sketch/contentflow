#!/usr/bin/env python3
"""
instagram_publisher.py
──────────────────────
Publica posts en Instagram web automáticamente usando Playwright.
Lee la cola de posts desde Supabase (status='approved') o desde un
archivo JSON local de cola.

Requisitos:
    pip install playwright supabase --break-system-packages
    playwright install chromium

Uso:
    # Publicar todos los posts aprobados de un cliente
    python3 instagram_publisher.py --client entelsat-instalaciones-y-promociones-integrales-slu

    # Publicar un post concreto
    python3 instagram_publisher.py --post-id entelsat-instalaciones-y-promociones-integrales-slu-3

    # Modo dry-run (no publica, solo abre el navegador y hace screenshot)
    python3 instagram_publisher.py --client entelsat --dry-run
"""

import asyncio
import argparse
import json
import os
import sys
import time
from pathlib import Path
from datetime import datetime

from playwright.async_api import async_playwright, TimeoutError as PWTimeout

# ── Supabase ──────────────────────────────────────────────────────────────────
try:
    from supabase import create_client
    SUPABASE_URL = 'https://afbussamfzqfvozrycsr.supabase.co'
    SUPABASE_KEY = 'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
    sb = create_client(SUPABASE_URL, SUPABASE_KEY)
except ImportError:
    sb = None
    print("⚠️  supabase no instalado. Usa --queue-file para modo local.")

# ── Configuración de pantalla ─────────────────────────────────────────────────
WINDOW_W = 1280
WINDOW_H = 800
SCREENSHOTS_DIR = Path(__file__).parent / "screenshots"
SCREENSHOTS_DIR.mkdir(exist_ok=True)

# ── Clientes (credenciales cargadas desde clients_credentials.json) ───────────
CREDENTIALS_FILE = Path(__file__).parent / "clients_credentials.json"


# ═════════════════════════════════════════════════════════════════════════════
# Helpers
# ═════════════════════════════════════════════════════════════════════════════

def load_credentials(client_id: str) -> dict | None:
    """Carga usuario/contraseña desde clients_credentials.json"""
    if not CREDENTIALS_FILE.exists():
        print(f"❌ No existe {CREDENTIALS_FILE}")
        print("   Crea ese archivo con el formato del ejemplo en credentials_example.json")
        return None
    with open(CREDENTIALS_FILE, encoding='utf-8') as f:
        data = json.load(f)
    return data.get(client_id)


def get_approved_posts(client_id: str) -> list:
    """Obtiene posts con status='approved' de Supabase para el cliente."""
    if not sb:
        return []
    res = sb.table('posts').select('*').eq('client_id', client_id).eq('status', 'approved').order('post_number').execute()
    return res.data or []


def mark_scheduled(post_id: str):
    """Marca el post como 'scheduled' en Supabase."""
    if sb:
        sb.table('posts').update({
            'status': 'scheduled',
            'webhook_sent_at': datetime.utcnow().isoformat()
        }).eq('id', post_id).execute()


def screenshot(page, name: str) -> Path:
    """Toma un screenshot y lo guarda con timestamp."""
    ts = datetime.now().strftime('%Y%m%d_%H%M%S')
    path = SCREENSHOTS_DIR / f"{ts}_{name}.png"
    # Se llama desde async, usar asyncio
    return path


# ═════════════════════════════════════════════════════════════════════════════
# Instagram Publisher
# ═════════════════════════════════════════════════════════════════════════════

async def dismiss_dialogs(page):
    """Cierra los diálogos típicos de Instagram tras login."""
    dialogs = [
        # "Guardar información de inicio de sesión"
        'button:has-text("Ahora no")',
        'button:has-text("Not Now")',
        'button:has-text("Not now")',
        # "Activar notificaciones"
        'button:has-text("Ahora no")',
    ]
    for selector in dialogs:
        try:
            btn = page.locator(selector).first
            if await btn.is_visible(timeout=3000):
                await btn.click()
                await page.wait_for_timeout(800)
        except PWTimeout:
            pass


async def instagram_login(page, username: str, password: str) -> bool:
    """Hace login en Instagram web. Devuelve True si tiene éxito."""
    print(f"  → Navegando a Instagram...")
    await page.goto('https://www.instagram.com/', wait_until='domcontentloaded')
    await page.wait_for_timeout(2000)

    # Aceptar cookies si aparece
    try:
        cookie_btn = page.locator('button:has-text("Allow all cookies"), button:has-text("Permitir todas las cookies")').first
        if await cookie_btn.is_visible(timeout=3000):
            await cookie_btn.click()
            await page.wait_for_timeout(1000)
    except PWTimeout:
        pass

    # Rellenar login
    try:
        await page.fill('input[name="username"]', username, timeout=8000)
        await page.fill('input[name="password"]', password)
        await page.click('button[type="submit"]')
        print(f"  → Credenciales enviadas, esperando...")
        await page.wait_for_timeout(4000)
    except PWTimeout:
        print("  ❌ No se encontró el formulario de login")
        return False

    # Detectar si pide verificación (2FA / SMS)
    url = page.url
    if 'challenge' in url or 'two_factor' in url or 'verify' in url:
        print("\n  ⚠️  Instagram pide verificación adicional (2FA o SMS).")
        print("     Completa la verificación manualmente en el navegador.")
        print("     Pulsa ENTER aquí cuando estés dentro de la cuenta...")
        input()

    # Descartar diálogos post-login
    await dismiss_dialogs(page)
    await page.wait_for_timeout(1500)

    # Verificar que estamos dentro
    if 'instagram.com' in page.url and 'accounts/login' not in page.url:
        print(f"  ✅ Login correcto como @{username}")
        return True

    print(f"  ❌ Login fallido — URL actual: {page.url}")
    return False


def parse_image_urls(raw: str) -> list:
    """Parsea image_url: puede ser vacío, URL única o JSON array de URLs."""
    if not raw:
        return []
    try:
        parsed = json.loads(raw)
        if isinstance(parsed, list):
            return [u for u in parsed if u]
    except Exception:
        pass
    return [raw]


async def download_url_to_tmp(url: str, suffix: str = '.jpg') -> str | None:
    """Descarga una URL a /tmp y devuelve la ruta local."""
    import urllib.request
    import tempfile
    try:
        tmp = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
        print(f"  → Descargando {url[:60]}...")
        urllib.request.urlretrieve(url, tmp.name)
        return tmp.name
    except Exception as e:
        print(f"  ❌ Error descargando imagen: {e}")
        return None


async def create_instagram_post(
    page,
    image_paths: list,   # lista de rutas locales (1 = imagen única, >1 = carrusel)
    caption: str,
    dry_run: bool = False
) -> bool:
    """
    Crea un post en Instagram web. Soporta imagen única y carrusel.
    image_paths: lista de rutas locales a las imágenes (JPG/PNG).
    caption: texto del post (copy + hashtags).
    """
    is_carousel = len(image_paths) > 1
    print(f"  → Iniciando creación de {'CARRUSEL' if is_carousel else 'imagen única'} ({len(image_paths)} imagen/s)...")

    # ── 1. Abrir modal de nueva publicación ──────────────────────────────────
    opened = False
    try:
        new_post_btn = page.locator(
            'a[href="/create/style/"], '
            'svg[aria-label="New post"], '
            'svg[aria-label="Nueva publicación"]'
        ).first
        await new_post_btn.click(timeout=8000)
        await page.wait_for_timeout(1500)
        opened = True
    except PWTimeout:
        pass

    if not opened:
        try:
            create_link = page.get_by_role('link', name='Create')
            if not await create_link.is_visible(timeout=3000):
                create_link = page.get_by_role('link', name='Crear')
            await create_link.click()
            await page.wait_for_timeout(1500)
            opened = True
        except PWTimeout:
            pass

    if not opened:
        print("  ❌ No se encontró el botón de nueva publicación")
        return False

    # Seleccionar "Post" del menú si aparece
    try:
        post_option = page.locator('button:has-text("Post"), span:has-text("Post")').first
        if await post_option.is_visible(timeout=3000):
            await post_option.click()
            await page.wait_for_timeout(1000)
    except PWTimeout:
        pass

    # ── 2. Subir primera imagen ──────────────────────────────────────────────
    print(f"  → Subiendo imagen 1/{len(image_paths)}: {Path(image_paths[0]).name}")
    try:
        file_input = page.locator('input[type="file"]').first
        await file_input.set_input_files(image_paths[0], timeout=10000)
        await page.wait_for_timeout(3000)
    except Exception as e:
        print(f"  ❌ Error al subir imagen principal: {e}")
        return False

    # ── 3. Si es carrusel, activar modo "Seleccionar varias" y subir el resto ─
    if is_carousel:
        print(f"  → Activando modo carrusel...")
        # Instagram muestra botón "Select multiple" / "Seleccionar varias" en la vista de recorte
        try:
            multi_btn = page.locator(
                'button:has-text("Select multiple"), '
                'button:has-text("Seleccionar varias"), '
                'svg[aria-label="Select multiple"], '
                'svg[aria-label="Seleccionar varias"]'
            ).first
            if await multi_btn.is_visible(timeout=5000):
                await multi_btn.click()
                await page.wait_for_timeout(1500)
                print(f"  ✅ Modo carrusel activado")
            else:
                print(f"  ⚠️  Botón 'Seleccionar varias' no visible, intentando click en ícono de carrusel...")
        except PWTimeout:
            pass

        # Subir las imágenes restantes una a una con el botón "+"
        for idx, img_path in enumerate(image_paths[1:], start=2):
            print(f"  → Añadiendo slide {idx}/{len(image_paths)}: {Path(img_path).name}")
            try:
                # El botón "+" para añadir más imágenes en modo carrusel
                add_more_btn = page.locator(
                    'button[aria-label="Open media gallery"], '
                    'button[aria-label="Abrir galería multimedia"], '
                    'svg[aria-label="Add photo or video"], '
                    'svg[aria-label="Añadir foto o vídeo"]'
                ).first
                if await add_more_btn.is_visible(timeout=4000):
                    await add_more_btn.click()
                    await page.wait_for_timeout(1000)

                # El input de archivo que aparece para añadir más slides
                extra_input = page.locator('input[type="file"]').first
                await extra_input.set_input_files(img_path, timeout=8000)
                await page.wait_for_timeout(2500)
            except Exception as e:
                print(f"  ⚠️  No se pudo añadir slide {idx}: {e}")
                # Continuar con las demás slides

    # ── 4. Avanzar pasos: Recorte → Filtros → Caption ───────────────────────
    steps = ['Recorte/Crop', 'Filtros/Filters', 'Caption']
    for step_name in steps:
        try:
            next_btn = page.locator(
                'button:has-text("Next"), '
                'button:has-text("Siguiente")'
            ).last
            if await next_btn.is_visible(timeout=6000):
                await next_btn.click()
                print(f"  → Paso: {step_name}")
                await page.wait_for_timeout(2000)
        except PWTimeout:
            print(f"  ⚠️  No se encontró 'Siguiente' en paso {step_name}")

    # ── 5. Escribir el caption ───────────────────────────────────────────────
    print(f"  → Escribiendo caption ({len(caption)} chars)...")
    try:
        caption_area = page.locator(
            'textarea[aria-label="Write a caption..."], '
            'textarea[aria-label="Escribe un pie de foto..."], '
            'div[role="textbox"][aria-label*="caption"], '
            'div[role="textbox"][aria-label*="pie"]'
        ).first
        await caption_area.click(timeout=6000)
        await page.wait_for_timeout(500)
        await caption_area.fill(caption)
        await page.wait_for_timeout(1000)
    except PWTimeout:
        print("  ⚠️  No se encontró el área de caption. Intentando con teclado...")
        await page.keyboard.type(caption)

    # ── 6. Screenshot previo ─────────────────────────────────────────────────
    ts = datetime.now().strftime('%Y%m%d_%H%M%S')
    pre_shot = SCREENSHOTS_DIR / f"{ts}_pre_publish.png"
    await page.screenshot(path=str(pre_shot), full_page=False)
    print(f"  📸 Screenshot guardado: {pre_shot.name}")

    if dry_run:
        print()
        print("  ┌─────────────────────────────────────────────────────┐")
        print("  │  🔵 SIMULACRO (--dry-run)                           │")
        print("  │  No se ha publicado nada.                           │")
        print(f"  │  Revisa el screenshot: {pre_shot.name:<28}│")
        print("  └─────────────────────────────────────────────────────┘")
        return True

    # ── 7. Confirmación obligatoria antes de publicar ────────────────────────
    print()
    print("  ┌─────────────────────────────────────────────────────┐")
    print("  │  👀 Revisa el navegador y el screenshot antes de    │")
    print("  │     continuar.                                       │")
    print("  │                                                      │")
    print("  │  Escribe  SI  y pulsa Enter para PUBLICAR            │")
    print("  │  Escribe  NO  y pulsa Enter para CANCELAR            │")
    print("  └─────────────────────────────────────────────────────┘")
    confirmacion = input("  → Tu respuesta: ").strip().upper()

    if confirmacion != 'SI':
        print("  🚫 Publicación cancelada por el usuario.")
        return False

    # ── 8. Publicar ──────────────────────────────────────────────────────────
    print(f"  → Publicando...")
    try:
        share_btn = page.locator(
            'button:has-text("Share"), '
            'button:has-text("Compartir")'
        ).last
        await share_btn.click(timeout=8000)
        await page.wait_for_timeout(5000)
    except PWTimeout:
        print("  ❌ No se encontró el botón 'Compartir'")
        return False

    post_shot = SCREENSHOTS_DIR / f"{ts}_published.png"
    await page.screenshot(path=str(post_shot))
    print(f"  📸 Screenshot de confirmación: {post_shot.name}")
    print(f"  ✅ Post publicado correctamente")
    return True


# ═════════════════════════════════════════════════════════════════════════════
# Flujo principal
# ═════════════════════════════════════════════════════════════════════════════

async def publish_post(post: dict, creds: dict, dry_run: bool = False):
    """Publica un post en Instagram para el cliente dado. Soporta imagen única y carrusel."""
    username = creds.get('username', '')
    password = creds.get('password', '')
    raw_image_url = post.get('image_url', '')
    hashtags = post.get('hashtags', [])
    # Añadir # solo si no lo tienen ya
    tags_str = ' '.join(h if h.startswith('#') else f'#{h}' for h in hashtags)
    caption = post.get('copy', '') + ('\n\n' + tags_str if tags_str else '')

    # ── Parsear URLs (imagen única o carrusel JSON) ──────────────────────────
    image_urls = parse_image_urls(raw_image_url)

    if not image_urls:
        print(f"  ⚠️  El post no tiene imágenes asociadas.")
        print("       Sube las imágenes al post en ContentFlow primero y vuelve a intentarlo.")
        return False

    # ── Descargar todas las URLs a ficheros temporales ───────────────────────
    local_paths = []
    for i, url in enumerate(image_urls):
        if url.startswith('http'):
            local = await download_url_to_tmp(url, suffix=f'_slide{i+1}.jpg')
            if local:
                local_paths.append(local)
            else:
                print(f"  ❌ No se pudo descargar slide {i+1}. Abortando.")
                return False
        elif os.path.exists(url):
            local_paths.append(url)
        else:
            print(f"  ❌ Ruta no encontrada: {url}")
            return False

    print(f"  → {len(local_paths)} imagen/s lista/s para publicar")

    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=False,
            args=[
                f'--window-size={WINDOW_W},{WINDOW_H}',
                '--disable-blink-features=AutomationControlled',
            ]
        )
        context = await browser.new_context(
            viewport={'width': WINDOW_W, 'height': WINDOW_H},
            user_agent=(
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                'AppleWebKit/537.36 (KHTML, like Gecko) '
                'Chrome/124.0.0.0 Safari/537.36'
            )
        )
        page = await context.new_page()

        ok = await instagram_login(page, username, password)
        if not ok:
            await browser.close()
            return False

        ok = await create_instagram_post(page, local_paths, caption, dry_run=dry_run)

        await browser.close()

        # Limpiar temporales
        for p_path in local_paths:
            if p_path.startswith('/tmp/'):
                try:
                    os.remove(p_path)
                except Exception:
                    pass

        return ok


async def main():
    parser = argparse.ArgumentParser(description='Auto-publisher Instagram para ContentFlow J2')
    parser.add_argument('--client', help='ID del cliente (slug de clients.json)')
    parser.add_argument('--post-id', help='ID concreto del post a publicar')
    parser.add_argument('--dry-run', action='store_true', help='No publica, solo simula y hace screenshot')
    parser.add_argument('--queue-file', help='Archivo JSON con cola de posts (alternativa a Supabase)')
    args = parser.parse_args()

    posts_to_publish = []

    if args.queue_file:
        with open(args.queue_file, encoding='utf-8') as f:
            posts_to_publish = json.load(f)
    elif args.post_id and sb:
        res = sb.table('posts').select('*').eq('id', args.post_id).execute()
        posts_to_publish = res.data or []
    elif args.client and sb:
        posts_to_publish = get_approved_posts(args.client)
    else:
        print("❌ Especifica --client, --post-id o --queue-file")
        sys.exit(1)

    if not posts_to_publish:
        print("ℹ️  No hay posts aprobados para publicar.")
        return

    print(f"\n📋 Posts a publicar: {len(posts_to_publish)}")
    for p in posts_to_publish:
        print(f"   • [{p['id']}] Post #{p.get('post_number')} — {p.get('headline_visual','')[:50]}")

    print()
    for post in posts_to_publish:
        client_id = post.get('client_id', args.client or '')
        print(f"\n{'─'*60}")
        print(f"🚀 Publicando: {post['id']}")
        print(f"   Cliente: {client_id}")
        print(f"   Post #{post.get('post_number')}: {post.get('headline_visual','')}")

        creds = load_credentials(client_id)
        if not creds:
            print(f"  ⚠️  Sin credenciales para {client_id}. Saltando.")
            continue

        ok = await publish_post(post, creds, dry_run=args.dry_run)

        if ok and not args.dry_run:
            mark_scheduled(post['id'])
            print(f"  ✅ Marcado como 'scheduled' en Supabase")

        # Pausa entre posts para no disparar rate-limits de Instagram
        if len(posts_to_publish) > 1:
            print("  ⏳ Esperando 15s antes del siguiente post...")
            await asyncio.sleep(15)

    print(f"\n{'═'*60}")
    print(f"✅ Sesión completada. Screenshots en: {SCREENSHOTS_DIR}")


if __name__ == '__main__':
    asyncio.run(main())

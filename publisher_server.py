#!/usr/bin/env python3
"""
publisher_server.py
───────────────────
Servidor local Flask en localhost:8765.
ContentFlow llama a /publish desde el navegador y este servidor
lanza Playwright para publicar el post en Instagram automáticamente.

Instalación (solo la primera vez):
    pip install flask flask-cors playwright supabase --break-system-packages
    playwright install chromium

Uso:
    python3 publisher_server.py
    → Deja esta ventana abierta mientras usas ContentFlow
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import asyncio
import threading
import json
import os
import tempfile
import uuid
import urllib.request
from pathlib import Path
from datetime import datetime, timezone

app = Flask(__name__)
CORS(app)  # Permite llamadas desde ContentFlow (Vercel o localhost)

# ── Jobs en memoria ────────────────────────────────────────────────────────────
# job_id → {status, message, post, creds, continue_event}
jobs: dict = {}

# Estados posibles:
#   pending             → en cola, arrancando
#   running             → ejecutando Playwright
#   needs_2fa           → Instagram pide código 2FA, esperando usuario
#   wrong_credentials   → usuario/contraseña incorrectos
#   success             → publicado ✅
#   error               → error inesperado

# ── Supabase ───────────────────────────────────────────────────────────────────
try:
    from supabase import create_client
    SUPABASE_URL = 'https://afbussamfzqfvozrycsr.supabase.co'
    SUPABASE_KEY = 'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
    sb = create_client(SUPABASE_URL, SUPABASE_KEY)
    print("✅ Supabase conectado")
except ImportError:
    sb = None
    print("⚠️  supabase no instalado — ejecuta: pip install supabase --break-system-packages")

CREDENTIALS_FILE = Path(__file__).parent / "clients_credentials.json"


# ─────────────────────────────────────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────────────────────────────────────

def load_credentials(client_id: str) -> dict | None:
    """Carga usuario/contraseña de Instagram desde clients_credentials.json"""
    if not CREDENTIALS_FILE.exists():
        return None
    with open(CREDENTIALS_FILE, encoding='utf-8') as f:
        return json.load(f).get(client_id)


def parse_image_urls(raw: str) -> list:
    """image_url puede ser: '' | 'https://...' | '["url1","url2"]'"""
    if not raw:
        return []
    try:
        parsed = json.loads(raw)
        if isinstance(parsed, list):
            return [u for u in parsed if u]
    except Exception:
        pass
    return [raw]


# ─────────────────────────────────────────────────────────────────────────────
# Rutas HTTP
# ─────────────────────────────────────────────────────────────────────────────

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'server': 'ContentFlow Publisher v1.0'})


@app.route('/publish', methods=['POST'])
def publish():
    """Inicia la publicación de un post. Devuelve job_id para hacer polling."""
    data = request.get_json(force=True) or {}
    post_id = data.get('post_id', '').strip()

    if not post_id:
        return jsonify({'error': 'post_id requerido'}), 400
    if not sb:
        return jsonify({'error': 'Supabase no disponible. Instala: pip install supabase --break-system-packages'}), 500

    # Obtener post de Supabase
    try:
        res = sb.table('posts').select('*').eq('id', post_id).single().execute()
    except Exception as e:
        return jsonify({'error': f'Error consultando Supabase: {e}'}), 500

    if not res.data:
        return jsonify({'error': f'Post no encontrado: {post_id}'}), 404

    post = res.data
    client_id = post['client_id']

    # Verificar credenciales
    creds = load_credentials(client_id)
    if not creds:
        return jsonify({
            'error': 'wrong_credentials',
            'message': (
                f'No hay credenciales de Instagram para "{client_id}".\n'
                f'Añádelas en clients_credentials.json con el formato:\n'
                f'  "{client_id}": {{"username": "...", "password": "..."}}'
            )
        }), 401

    # Verificar imágenes
    urls = parse_image_urls(post.get('image_url', ''))
    if not urls:
        return jsonify({'error': 'El post no tiene imágenes subidas en ContentFlow'}), 400

    # Crear job y lanzar thread
    job_id = uuid.uuid4().hex[:8]
    continue_event = threading.Event()
    jobs[job_id] = {
        'status':         'pending',
        'message':        'Iniciando...',
        'post':           post,
        'creds':          creds,
        'continue_event': continue_event,
    }

    t = threading.Thread(target=_run_sync, args=(job_id,), daemon=True)
    t.start()

    return jsonify({'job_id': job_id, 'status': 'pending'})


@app.route('/status/<job_id>', methods=['GET'])
def status(job_id):
    """Devuelve el estado actual del job."""
    job = jobs.get(job_id)
    if not job:
        return jsonify({'error': 'Job no encontrado'}), 404
    return jsonify({
        'status':  job['status'],
        'message': job.get('message', ''),
    })


@app.route('/continue/<job_id>', methods=['POST'])
def continue_job(job_id):
    """El usuario pulsó 'Ya introduje el código 2FA' → Playwright continúa."""
    job = jobs.get(job_id)
    if not job:
        return jsonify({'error': 'Job no encontrado'}), 404
    job['continue_event'].set()
    return jsonify({'ok': True})


# ─────────────────────────────────────────────────────────────────────────────
# Playwright: automatización de Instagram
# ─────────────────────────────────────────────────────────────────────────────

def _run_sync(job_id: str):
    """Wrapper síncrono que corre el loop asyncio en un thread dedicado."""
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    try:
        loop.run_until_complete(_publish_async(job_id))
    finally:
        loop.close()


async def _publish_async(job_id: str):
    from playwright.async_api import async_playwright, TimeoutError as PWTimeout

    job   = jobs[job_id]
    post  = job['post']
    creds = job['creds']
    tmp_paths: list = []

    def upd(status: str, msg: str):
        job['status']  = status
        job['message'] = msg
        print(f"  [{job_id}] {status.upper()}: {msg}", flush=True)

    try:
        # ── 1. Descargar imágenes a /tmp ──────────────────────────────────
        upd('running', 'Descargando imágenes...')
        for url in parse_image_urls(post.get('image_url', '')):
            ext = '.jpg' if '.jpg' in url.lower() else '.png'
            tmp = tempfile.NamedTemporaryFile(delete=False, suffix=ext)
            try:
                urllib.request.urlretrieve(url, tmp.name)
                tmp_paths.append(tmp.name)
                upd('running', f'Imagen {len(tmp_paths)} descargada ✓')
            except Exception as e:
                upd('error', f'Error descargando imagen: {e}')
                return

        # ── 2. Preparar caption ───────────────────────────────────────────
        caption = post.get('copy', '')
        hashtags = post.get('hashtags') or []
        if isinstance(hashtags, list) and hashtags:
            caption = caption.rstrip() + '\n\n' + ' '.join(
                h if h.startswith('#') else f'#{h}' for h in hashtags
            )

        # ── 3. Playwright ─────────────────────────────────────────────────
        async with async_playwright() as pw:
            browser = await pw.chromium.launch(headless=False)
            ctx  = await browser.new_context(viewport={'width': 1280, 'height': 900})
            page = await ctx.new_page()

            try:
                # — Login —
                upd('running', 'Abriendo Instagram...')
                await page.goto('https://www.instagram.com/', wait_until='domcontentloaded')
                await page.wait_for_timeout(2000)

                # Aceptar cookies
                for sel in ['button:has-text("Permitir todas")', 'button:has-text("Allow all")']:
                    try:
                        btn = page.locator(sel).first
                        if await btn.is_visible(timeout=2500):
                            await btn.click()
                            await page.wait_for_timeout(800)
                            break
                    except PWTimeout:
                        pass

                # Formulario de login
                try:
                    await page.fill('input[name="username"]', creds['username'], timeout=8000)
                    await page.fill('input[name="password"]', creds['password'])
                    await page.click('button[type="submit"]')
                    upd('running', 'Credenciales enviadas, esperando respuesta...')
                    await page.wait_for_timeout(4500)
                except PWTimeout:
                    upd('error', 'No se encontró el formulario de login de Instagram')
                    return

                # Detectar credenciales incorrectas
                for sel in [
                    '#slfErrorAlert',
                    'p[data-testid="login-error-message"]',
                    'div[role="alert"]',
                ]:
                    try:
                        el = page.locator(sel).first
                        if await el.is_visible(timeout=1500):
                            upd('wrong_credentials', 'Usuario o contraseña incorrectos en Instagram. Revisa clients_credentials.json.')
                            return
                    except PWTimeout:
                        pass

                # Detectar 2FA
                if any(k in page.url for k in ('challenge', 'two_factor', 'verify')):
                    upd('needs_2fa',
                        'Instagram pide verificación. Introduce el código en la ventana '
                        'de Chrome que se ha abierto y luego pulsa "Ya introduje el código" aquí.')
                    # Esperar hasta 5 minutos a que el usuario pulse "continuar"
                    job['continue_event'].wait(timeout=300)
                    upd('running', 'Continuando tras verificación...')
                    await page.wait_for_timeout(3000)

                # Cerrar diálogos post-login
                for sel in [
                    'button:has-text("Ahora no")',
                    'button:has-text("Not Now")',
                    'button:has-text("Not now")',
                ]:
                    try:
                        btn = page.locator(sel).first
                        if await btn.is_visible(timeout=2000):
                            await btn.click()
                            await page.wait_for_timeout(700)
                    except PWTimeout:
                        pass

                if 'accounts/login' in page.url:
                    upd('wrong_credentials', 'No se pudo iniciar sesión. Comprueba las credenciales.')
                    return

                upd('running', 'Login correcto ✓ — creando publicación...')

                # — Abrir creador de posts —
                for sel in [
                    'svg[aria-label="Nueva publicación"]',
                    'svg[aria-label="New post"]',
                    'a[href="/create/select-type/"]',
                    '[aria-label="New post"]',
                ]:
                    try:
                        btn = page.locator(sel).first
                        if await btn.is_visible(timeout=3000):
                            await btn.click()
                            break
                    except PWTimeout:
                        pass

                await page.wait_for_timeout(2000)

                # — Subir primera imagen —
                upd('running', 'Subiendo imagen 1...')
                fi = page.locator('input[type="file"]').first
                await fi.set_input_files(tmp_paths[0])
                await page.wait_for_timeout(2500)

                # — Carrusel (si hay más de 1 imagen) —
                if len(tmp_paths) > 1:
                    for sel in [
                        'button:has-text("Seleccionar varias")',
                        'button:has-text("Select Multiple")',
                    ]:
                        try:
                            btn = page.locator(sel).first
                            if await btn.is_visible(timeout=3000):
                                await btn.click()
                                await page.wait_for_timeout(1000)
                                break
                        except PWTimeout:
                            pass

                    for i, path in enumerate(tmp_paths[1:], 2):
                        upd('running', f'Subiendo imagen {i}/{len(tmp_paths)}...')
                        for sel in [
                            'button[aria-label="Abrir selector de archivos"]',
                            'button:has-text("+")',
                        ]:
                            try:
                                btn = page.locator(sel).first
                                if await btn.is_visible(timeout=3000):
                                    await btn.click()
                                    await page.wait_for_timeout(500)
                                    break
                            except PWTimeout:
                                pass

                        fi2 = page.locator('input[type="file"]').first
                        await fi2.set_input_files(path)
                        await page.wait_for_timeout(1800)

                # — Avanzar pantallas (recorte → filtros → caption) —
                upd('running', 'Avanzando pantallas...')
                for _ in range(3):
                    for sel in [
                        'button:has-text("Siguiente")',
                        'button:has-text("Next")',
                    ]:
                        try:
                            btn = page.locator(sel).first
                            if await btn.is_visible(timeout=3000):
                                await btn.click()
                                await page.wait_for_timeout(1500)
                                break
                        except PWTimeout:
                            pass

                # — Escribir caption —
                upd('running', 'Escribiendo caption...')
                try:
                    area = page.locator(
                        'div[aria-label="Escribe un pie de foto..."],'
                        'div[aria-label="Write a caption..."],'
                        'textarea[aria-label*="caption"],'
                        'div[contenteditable="true"]'
                    ).first
                    if await area.is_visible(timeout=5000):
                        await area.click()
                        await page.keyboard.type(caption, delay=8)
                except PWTimeout:
                    pass  # No bloquear si no se encuentra, seguimos adelante

                # — Publicar —
                upd('running', '¡Publicando! No cierres el navegador...')
                shared = False
                for sel in [
                    'button:has-text("Compartir")',
                    'button:has-text("Share")',
                ]:
                    try:
                        share = page.locator(sel).first
                        if await share.is_visible(timeout=8000):
                            await share.click()
                            await page.wait_for_timeout(6000)
                            shared = True
                            break
                    except PWTimeout:
                        pass

                if not shared:
                    upd('error', 'No se encontró el botón "Compartir". Puede que Instagram haya cambiado su interfaz.')
                    return

                # — Actualizar estado en Supabase —
                if sb:
                    sb.table('posts').update({
                        'status': 'scheduled',
                        'webhook_sent_at': datetime.now(timezone.utc).isoformat()
                    }).eq('id', post['id']).execute()

                upd('success', f'✅ Post #{post["post_number"]} publicado correctamente en Instagram')

            except Exception as e:
                upd('error', f'Error inesperado: {e}')

            finally:
                await page.wait_for_timeout(1500)
                await browser.close()

    finally:
        # Limpiar archivos temporales
        for p in tmp_paths:
            try:
                os.unlink(p)
            except Exception:
                pass


# ─────────────────────────────────────────────────────────────────────────────
if __name__ == '__main__':
    print()
    print("╔══════════════════════════════════════════════════════════╗")
    print("║   ContentFlow Publisher Server  —  localhost:8765        ║")
    print("║   Deja esta ventana abierta mientras usas ContentFlow    ║")
    print("║   Ctrl+C para parar el servidor                          ║")
    print("╚══════════════════════════════════════════════════════════╝")
    print()
    app.run(host='127.0.0.1', port=8765, debug=False, threaded=True)

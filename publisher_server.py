#!/usr/bin/env python3
"""
publisher_server.py
───────────────────
Servidor local Flask en localhost:8765.
Publica posts en Instagram, LinkedIn o Facebook según el campo `platform` del post.

Instalación (solo la primera vez):
    pip install flask flask-cors playwright supabase --break-system-packages
    playwright install chromium

Uso:
    python3 publisher_server.py
    → Deja esta ventana abierta mientras usas ContentFlow

Formato de clients_credentials.json:
    {
      "nombre-cliente-id": {
        "IG": { "username": "mi_cuenta_ig", "password": "contraseña" },
        "LI": { "email": "correo@empresa.com", "password": "contraseña" },
        "FB": { "email": "correo@empresa.com", "password": "contraseña" }
      }
    }
    (Solo necesitas las plataformas que uses para cada cliente)
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import asyncio, threading, json, os, tempfile, uuid, urllib.request
from pathlib import Path
from datetime import datetime, timezone

app = Flask(__name__)
CORS(app)

# ── Jobs en memoria ────────────────────────────────────────────────────────────
jobs: dict = {}
# Estados: pending | running | needs_2fa | wrong_credentials | success | error

# ── Supabase ───────────────────────────────────────────────────────────────────
try:
    from supabase import create_client
    sb = create_client(
        'https://afbussamfzqfvozrycsr.supabase.co',
        'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
    )
    print("✅ Supabase conectado")
except ImportError:
    sb = None
    print("⚠️  pip install supabase --break-system-packages")

CREDENTIALS_FILE = Path(__file__).parent / "clients_credentials.json"
SESSIONS_DIR     = Path(__file__).parent / "sessions"
SESSIONS_DIR.mkdir(exist_ok=True)


def session_path(client_id: str, platform: str) -> Path:
    """Ruta del fichero de cookies guardado para este cliente y plataforma."""
    return SESSIONS_DIR / f"{client_id}_{platform}.json"


def save_session(client_id: str, platform: str, storage_state: dict):
    """Guarda sesión en local Y en Supabase (funciona desde cualquier ordenador)."""
    state_str = json.dumps(storage_state)
    # 1. Local (backup)
    p = session_path(client_id, platform)
    with open(p, 'w', encoding='utf-8') as f:
        f.write(state_str)
    print(f"  💾 Sesión guardada local: {p.name}", flush=True)
    # 2. Supabase (multi-ordenador)
    if sb:
        try:
            sb.table('sessions').upsert({
                'id':            f'{client_id}_{platform}',
                'client_id':     client_id,
                'platform':      platform,
                'storage_state': state_str,
                'updated_at':    datetime.now(timezone.utc).isoformat(),
            }).execute()
            print(f"  ☁️  Sesión guardada en Supabase: {client_id}/{platform}", flush=True)
        except Exception as e:
            print(f"  ⚠️  No se pudo guardar en Supabase: {e}", flush=True)


def load_session(client_id: str, platform: str) -> dict | None:
    """Carga sesión: primero Supabase (más reciente), luego local."""
    # 1. Intentar desde Supabase
    if sb:
        try:
            res = sb.table('sessions').select('storage_state').eq(
                'id', f'{client_id}_{platform}'
            ).maybe_single().execute()
            if res and res.data and res.data.get('storage_state'):
                print(f"  ☁️  Sesión cargada desde Supabase: {client_id}/{platform}", flush=True)
                return json.loads(res.data['storage_state'])
        except Exception as e:
            print(f"  ⚠️  Error leyendo sesión de Supabase: {e}", flush=True)
    # 2. Fallback local
    p = session_path(client_id, platform)
    if p.exists():
        print(f"  💾 Sesión cargada desde local: {p.name}", flush=True)
        with open(p, encoding='utf-8') as f:
            return json.load(f)
    return None


# ─────────────────────────────────────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────────────────────────────────────

def load_credentials(client_id: str, platform: str) -> dict | None:
    """
    Carga credenciales para el cliente y plataforma.
    Prioridad: 1) Supabase ig_credentials (guardadas desde ContentFlow)
               2) clients_credentials.json (local, fallback)
    """
    # 1. Supabase ig_credentials (Instagram)
    if platform == 'IG' and sb:
        try:
            res = sb.table('ig_credentials').select('ig_username,ig_password').eq(
                'client_id', client_id
            ).maybe_single().execute()
            if res and res.data:
                print(f"  ☁️  Credenciales IG cargadas desde Supabase: {client_id}", flush=True)
                return {
                    'username': res.data['ig_username'],
                    'password': res.data['ig_password'],
                }
        except Exception as e:
            print(f"  ⚠️  Error leyendo ig_credentials: {e}", flush=True)

    # 2. Fallback: clients_credentials.json local
    if not CREDENTIALS_FILE.exists():
        return None
    with open(CREDENTIALS_FILE, encoding='utf-8') as f:
        data = json.load(f)
    client = data.get(client_id)
    if not client:
        return None
    if platform in client:
        return client[platform]
    if 'username' in client or 'email' in client:
        return client
    return None


def parse_image_urls(raw: str) -> list:
    if not raw:
        return []
    try:
        parsed = json.loads(raw)
        if isinstance(parsed, list):
            return [u for u in parsed if u]
    except Exception:
        pass
    return [raw]


async def download_images(image_urls: list, upd) -> list:
    """Descarga todas las imágenes a /tmp y devuelve lista de rutas."""
    tmp_paths = []
    for url in image_urls:
        ext = '.jpg' if '.jpg' in url.lower() else '.png'
        tmp = tempfile.NamedTemporaryFile(delete=False, suffix=ext)
        try:
            urllib.request.urlretrieve(url, tmp.name)
            tmp_paths.append(tmp.name)
            upd('running', f'Imagen {len(tmp_paths)}/{len(image_urls)} descargada ✓')
        except Exception as e:
            upd('error', f'Error descargando imagen: {e}')
            return []
    return tmp_paths


def build_caption(post: dict) -> str:
    caption = post.get('copy', '')
    hashtags = post.get('hashtags') or []
    if isinstance(hashtags, list) and hashtags:
        caption = caption.rstrip() + '\n\n' + ' '.join(
            h if h.startswith('#') else f'#{h}' for h in hashtags
        )
    return caption


# ─────────────────────────────────────────────────────────────────────────────
# Rutas HTTP
# ─────────────────────────────────────────────────────────────────────────────

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'server': 'ContentFlow Publisher v2.0', 'platforms': ['IG', 'LI', 'FB']})


@app.route('/publish', methods=['POST'])
def publish():
    data = request.get_json(force=True) or {}
    post_id = data.get('post_id', '').strip()
    if not post_id:
        return jsonify({'error': 'post_id requerido'}), 400
    if not sb:
        return jsonify({'error': 'Supabase no disponible'}), 500

    try:
        res = sb.table('posts').select('*').eq('id', post_id).single().execute()
    except Exception as e:
        return jsonify({'error': f'Error Supabase: {e}'}), 500

    if not res.data:
        return jsonify({'error': f'Post no encontrado: {post_id}'}), 404

    post = res.data
    client_id = post['client_id']
    platform  = post.get('platform', 'IG').upper()

    creds = load_credentials(client_id, platform)
    if not creds:
        return jsonify({
            'error': 'wrong_credentials',
            'message': (
                f'No hay credenciales de {platform} para "{client_id}".\n'
                f'Añádelas en clients_credentials.json:\n'
                f'  "{client_id}": {{ "{platform}": {{ ... }} }}'
            )
        }), 401

    urls = parse_image_urls(post.get('image_url', ''))
    if not urls:
        return jsonify({'error': 'El post no tiene imágenes subidas en ContentFlow'}), 400

    job_id = uuid.uuid4().hex[:8]
    jobs[job_id] = {
        'status':         'pending',
        'message':        'Iniciando...',
        'post':           post,
        'creds':          creds,
        'platform':       platform,
        'continue_event': threading.Event(),
    }
    threading.Thread(target=_run_sync, args=(job_id,), daemon=True).start()
    return jsonify({'job_id': job_id, 'status': 'pending'})


@app.route('/status/<job_id>', methods=['GET'])
def status(job_id):
    job = jobs.get(job_id)
    if not job:
        return jsonify({'error': 'Job no encontrado'}), 404
    return jsonify({'status': job['status'], 'message': job.get('message', '')})


@app.route('/continue/<job_id>', methods=['POST'])
def continue_job(job_id):
    job = jobs.get(job_id)
    if not job:
        return jsonify({'error': 'Job no encontrado'}), 404
    job['continue_event'].set()
    return jsonify({'ok': True})


@app.route('/save-session', methods=['POST'])
def save_session_route():
    """
    Abre Chrome para que el usuario haga login manualmente.
    El usuario confirma desde ContentFlow cuando está en el feed.
    """
    data      = request.get_json(force=True) or {}
    client_id = data.get('client_id', '').strip()
    platform  = data.get('platform', 'IG').upper()

    if not client_id:
        return jsonify({'error': 'client_id requerido'}), 400

    job_id = uuid.uuid4().hex[:8]
    jobs[job_id] = {
        'status':         'pending',
        'message':        'Iniciando...',
        'client_id':      client_id,
        'platform':       platform,
        'continue_event': threading.Event(),
    }
    threading.Thread(target=_run_save_session_sync, args=(job_id,), daemon=True).start()
    return jsonify({'job_id': job_id, 'status': 'pending'})


def _run_save_session_sync(job_id: str):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    try:
        loop.run_until_complete(_save_session_async(job_id))
    finally:
        loop.close()


async def _save_session_async(job_id: str):
    from playwright.async_api import async_playwright
    job       = jobs[job_id]
    client_id = job['client_id']
    platform  = job['platform']

    def upd(status: str, msg: str):
        job['status']  = status
        job['message'] = msg
        print(f"  [{job_id}][SAVE-SESSION][{platform}] {status.upper()}: {msg}", flush=True)

    PLATFORM_URLS = {
        'IG': 'https://www.instagram.com/accounts/login/',
        'LI': 'https://www.linkedin.com/login',
        'FB': 'https://www.facebook.com/login',
    }
    url = PLATFORM_URLS.get(platform, 'https://www.instagram.com/accounts/login/')

    upd('running', f'Abriendo {platform} en Chrome...')
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=False)
        ctx  = await browser.new_context(viewport={'width': 1280, 'height': 900})
        page = await ctx.new_page()
        await page.goto(url, wait_until='domcontentloaded')

        upd('needs_login',
            f'Inicia sesión en {platform} en la ventana de Chrome y pulsa "Ya he iniciado sesión".')

        # Esperar confirmación del usuario desde ContentFlow
        job['continue_event'].wait(timeout=300)

        upd('running', 'Guardando sesión...')
        try:
            state = await ctx.storage_state()
            save_session(client_id, platform, state)
            upd('success', f'✅ Sesión de {platform} guardada para "{client_id}". Ya puedes publicar sin login.')
        except Exception as e:
            upd('error', f'Error guardando sesión: {e}')
        finally:
            await page.wait_for_timeout(1500)
            await browser.close()
    return jsonify({'ok': True})


@app.route('/metricool-blogs', methods=['GET'])
def metricool_blogs():
    """Devuelve la lista de blogs/perfiles conectados a la cuenta Metricool."""
    import urllib.request as urlreq
    import urllib.error
    token = request.headers.get('X-Mc-Auth', '')
    req = urlreq.Request(
        'https://app.metricool.com/api/v2.0/blogs',
        headers={
            'Accept': 'application/json',
            'X-Mc-Auth': token,
        },
        method='GET',
    )
    try:
        with urlreq.urlopen(req, timeout=15) as resp:
            body = resp.read().decode('utf-8')
            return app.response_class(response=body, status=resp.status, mimetype='application/json')
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', errors='replace')
        print(f"[METRICOOL-BLOGS] ← ERROR {e.code}: {body[:200]}")
        return app.response_class(response=body, status=e.code, mimetype='application/json')
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/metricool', methods=['POST'])
def metricool_proxy():
    """Proxy para la API de Metricool (evita CORS desde el navegador)."""
    import urllib.request as urlreq
    import urllib.error
    data = request.get_json(force=True) or {}
    token = data.pop('_token', '')
    body_bytes = json.dumps(data).encode('utf-8')

    print(f"\n[METRICOOL] → Enviando a API:")
    print(f"  Token: {token[:8]}...{token[-4:]}")
    print(f"  Body:  {json.dumps(data, ensure_ascii=False)[:300]}")

    req = urlreq.Request(
        'https://app.metricool.com/api/v2/scheduler/posts',
        data=body_bytes,
        headers={
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Mc-Auth': token,
        },
        method='POST',
    )
    try:
        with urlreq.urlopen(req, timeout=15) as resp:
            resp_body = resp.read().decode('utf-8')
            print(f"[METRICOOL] ← Respuesta {resp.status}: {resp_body[:200]}")
            return app.response_class(
                response=resp_body,
                status=resp.status,
                mimetype='application/json',
            )
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', errors='replace')
        print(f"[METRICOOL] ← ERROR {e.code}: {body[:400]}")
        return app.response_class(response=body, status=e.code, mimetype='application/json')
    except Exception as e:
        print(f"[METRICOOL] ← EXCEPCIÓN: {e}")
        return jsonify({'error': str(e)}), 500


# ─────────────────────────────────────────────────────────────────────────────
# Runner
# ─────────────────────────────────────────────────────────────────────────────

def _run_sync(job_id: str):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    try:
        loop.run_until_complete(_publish_async(job_id))
    finally:
        loop.close()


async def _publish_async(job_id: str):
    job      = jobs[job_id]
    post     = job['post']
    creds    = job['creds']
    platform = job['platform']

    def upd(status: str, msg: str):
        job['status']  = status
        job['message'] = msg
        print(f"  [{job_id}][{platform}] {status.upper()}: {msg}", flush=True)

    tmp_paths = []
    try:
        upd('running', 'Descargando imágenes...')
        tmp_paths = await download_images(parse_image_urls(post.get('image_url', '')), upd)
        if not tmp_paths:
            return

        caption = build_caption(post)

        from playwright.async_api import async_playwright
        async with async_playwright() as pw:
            browser = await pw.chromium.launch(headless=False)
            # Cargar sesión guardada si existe (evita el formulario de login)
            saved = load_session(post['client_id'], platform)
            ctx_kwargs = {'viewport': {'width': 1280, 'height': 900}}
            if saved:
                ctx_kwargs['storage_state'] = saved
                upd('running', '🍪 Sesión guardada encontrada — saltando login...')
            ctx  = await browser.new_context(**ctx_kwargs)
            page = await ctx.new_page()
            try:
                if platform == 'IG':
                    await _publish_instagram(page, post, creds, tmp_paths, caption, upd, job)
                elif platform == 'LI':
                    await _publish_linkedin(page, post, creds, tmp_paths, caption, upd, job)
                elif platform == 'FB':
                    await _publish_facebook(page, post, creds, tmp_paths, caption, upd, job)
                else:
                    upd('error', f'Plataforma no soportada: {platform}')
                    return

                # Marcar como publicado en Supabase
                if sb and job['status'] == 'success':
                    sb.table('posts').update({
                        'status': 'scheduled',
                        'webhook_sent_at': datetime.now(timezone.utc).isoformat()
                    }).eq('id', post['id']).execute()

            except Exception as e:
                upd('error', f'Error inesperado: {e}')
            finally:
                await page.wait_for_timeout(1500)
                await browser.close()
    finally:
        for p in tmp_paths:
            try: os.unlink(p)
            except: pass


# ─────────────────────────────────────────────────────────────────────────────
# Instagram
# ─────────────────────────────────────────────────────────────────────────────

async def _publish_instagram(page, post, creds, tmp_paths, caption, upd, job):
    from playwright.async_api import TimeoutError as PWTimeout

    upd('running', 'Abriendo Instagram...')
    await page.goto('https://www.instagram.com/accounts/login/', wait_until='networkidle')
    await page.wait_for_timeout(3000)

    # Cookies / banner de consentimiento
    for sel in [
        'button:has-text("Permitir todas las cookies")',
        'button:has-text("Allow all cookies")',
        'button:has-text("Permitir todas")',
        'button:has-text("Allow all")',
        'button:has-text("Accept")',
        'button:has-text("Aceptar")',
    ]:
        try:
            btn = page.locator(sel).first
            if await btn.is_visible(timeout=2000):
                await btn.click()
                await page.wait_for_timeout(1000)
                break
        except PWTimeout: pass

    # Esperar formulario — Instagram usa distintos selectores según versión
    upd('running', 'Esperando formulario de login...')
    USERNAME_SELS = [
        'input[name="username"]',
        'input[autocomplete="username"]',
        'input[aria-label*="username" i]',
        'input[aria-label*="usuario" i]',
        'input[aria-label*="teléfono" i]',
        'input[aria-label*="Phone" i]',
        'input[type="text"]',
    ]
    username_sel = None
    for sel in USERNAME_SELS:
        try:
            await page.wait_for_selector(sel, timeout=4000)
            username_sel = sel
            break
        except PWTimeout:
            continue

    if not username_sel:
        # Log de la URL actual para diagnóstico
        upd('error', f'No se encontró el campo de usuario. URL actual: {page.url}')
        return

    PASSWORD_SELS = [
        'input[name="password"]',
        'input[autocomplete="current-password"]',
        'input[type="password"]',
    ]
    password_sel = None
    for sel in PASSWORD_SELS:
        try:
            await page.wait_for_selector(sel, timeout=3000)
            password_sel = sel
            break
        except PWTimeout:
            continue

    if not password_sel:
        upd('error', 'No se encontró el campo de contraseña'); return

    # Rellenar y enviar
    try:
        await page.click(username_sel)
        await page.wait_for_timeout(400)
        await page.type(username_sel, creds['username'], delay=50)
        await page.wait_for_timeout(400)
        await page.click(password_sel)
        await page.wait_for_timeout(400)
        await page.type(password_sel, creds['password'], delay=50)
        await page.wait_for_timeout(400)
        # Intentar submit
        submitted = False
        for btn_sel in ['button[type="submit"]', 'button:has-text("Entrar")', 'button:has-text("Log in")', 'button:has-text("Iniciar sesión")']:
            try:
                btn = page.locator(btn_sel).first
                if await btn.is_visible(timeout=2000):
                    await btn.click()
                    submitted = True
                    break
            except PWTimeout: pass
        if not submitted:
            await page.keyboard.press('Enter')
        upd('running', 'Credenciales enviadas, esperando respuesta...')
        await page.wait_for_timeout(5000)
    except Exception as e:
        upd('error', f'Error rellenando formulario: {e}'); return

    # Credenciales incorrectas
    for sel in ['#slfErrorAlert', 'p[data-testid="login-error-message"]', 'div[role="alert"]']:
        try:
            if await page.locator(sel).first.is_visible(timeout=1500):
                upd('wrong_credentials', 'Usuario o contraseña incorrectos en Instagram'); return
        except PWTimeout: pass

    # 2FA
    if any(k in page.url for k in ('challenge', 'two_factor', 'verify')):
        upd('needs_2fa', 'Instagram pide verificación. Introduce el código en Chrome y pulsa "Ya introduje el código".')
        job['continue_event'].wait(timeout=300)
        upd('running', 'Continuando tras 2FA...')
        await page.wait_for_timeout(3000)

    # Cerrar diálogos
    for sel in ['button:has-text("Ahora no")', 'button:has-text("Not Now")']:
        try:
            btn = page.locator(sel).first
            if await btn.is_visible(timeout=2000): await btn.click(); await page.wait_for_timeout(700)
        except PWTimeout: pass

    if 'accounts/login' in page.url:
        upd('wrong_credentials', 'Login fallido. Comprueba las credenciales.'); return

    # Guardar sesión para próximas publicaciones (evita repetir login)
    try:
        state = await page.context.storage_state()
        save_session(post['client_id'], 'IG', state)
    except Exception:
        pass

    upd('running', 'Login ✓ — creando post...')

    # Abrir creador
    for sel in ['svg[aria-label="Nueva publicación"]', 'svg[aria-label="New post"]', 'a[href="/create/select-type/"]']:
        try:
            btn = page.locator(sel).first
            if await btn.is_visible(timeout=3000): await btn.click(); break
        except PWTimeout: pass
    await page.wait_for_timeout(2000)

    # Subir imagen 1
    upd('running', 'Subiendo imagen 1...')
    await page.locator('input[type="file"]').first.set_input_files(tmp_paths[0])
    await page.wait_for_timeout(2500)

    # Carrusel
    if len(tmp_paths) > 1:
        for sel in ['button:has-text("Seleccionar varias")', 'button:has-text("Select Multiple")']:
            try:
                btn = page.locator(sel).first
                if await btn.is_visible(timeout=3000): await btn.click(); await page.wait_for_timeout(1000); break
            except PWTimeout: pass

        for i, path in enumerate(tmp_paths[1:], 2):
            upd('running', f'Subiendo imagen {i}/{len(tmp_paths)}...')
            for sel in ['button[aria-label="Abrir selector de archivos"]', 'button:has-text("+")']:
                try:
                    btn = page.locator(sel).first
                    if await btn.is_visible(timeout=3000): await btn.click(); await page.wait_for_timeout(500); break
                except PWTimeout: pass
            await page.locator('input[type="file"]').first.set_input_files(path)
            await page.wait_for_timeout(1800)

    # Next x3
    upd('running', 'Avanzando pantallas...')
    for _ in range(3):
        for sel in ['button:has-text("Siguiente")', 'button:has-text("Next")']:
            try:
                btn = page.locator(sel).first
                if await btn.is_visible(timeout=3000): await btn.click(); await page.wait_for_timeout(1500); break
            except PWTimeout: pass

    # Caption
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
    except PWTimeout: pass

    # Compartir
    upd('running', '¡Publicando! No cierres el navegador...')
    for sel in ['button:has-text("Compartir")', 'button:has-text("Share")']:
        try:
            share = page.locator(sel).first
            if await share.is_visible(timeout=8000):
                await share.click()
                await page.wait_for_timeout(6000)
                upd('success', f'✅ Post #{post["post_number"]} publicado en Instagram')
                return
        except PWTimeout: pass

    upd('error', 'No se encontró el botón "Compartir". Instagram puede haber cambiado su interfaz.')


# ─────────────────────────────────────────────────────────────────────────────
# LinkedIn
# ─────────────────────────────────────────────────────────────────────────────

async def _publish_linkedin(page, post, creds, tmp_paths, caption, upd, job):
    from playwright.async_api import TimeoutError as PWTimeout

    upd('running', 'Abriendo LinkedIn...')
    await page.goto('https://www.linkedin.com/login', wait_until='domcontentloaded')
    await page.wait_for_timeout(2000)

    # Login
    try:
        await page.fill('input[name="session_key"]', creds.get('email', creds.get('username', '')), timeout=8000)
        await page.fill('input[name="session_password"]', creds['password'])
        await page.click('button[type="submit"]')
        upd('running', 'Credenciales enviadas...')
        await page.wait_for_timeout(4000)
    except PWTimeout:
        upd('error', 'No se encontró el formulario de login de LinkedIn'); return

    # Credenciales incorrectas
    for sel in ['.alert-content', '#error-for-password', '.form__label--error']:
        try:
            if await page.locator(sel).first.is_visible(timeout=1500):
                upd('wrong_credentials', 'Email o contraseña incorrectos en LinkedIn'); return
        except PWTimeout: pass

    # 2FA / verificación
    if any(k in page.url for k in ('checkpoint', 'challenge', 'verify', 'pin')):
        upd('needs_2fa', 'LinkedIn pide verificación. Complétala en Chrome y pulsa "Ya introduje el código".')
        job['continue_event'].wait(timeout=300)
        upd('running', 'Continuando...')
        await page.wait_for_timeout(3000)

    if 'feed' not in page.url and 'mynetwork' not in page.url:
        # Intentar ir al feed
        await page.goto('https://www.linkedin.com/feed/', wait_until='domcontentloaded')
        await page.wait_for_timeout(2000)

    if 'login' in page.url:
        upd('wrong_credentials', 'Login fallido. Comprueba las credenciales de LinkedIn.'); return

    upd('running', 'Login ✓ — creando post...')

    # Clic en "Iniciar un post" / "Start a post"
    for sel in [
        'button:has-text("Iniciar un post")',
        'button:has-text("Start a post")',
        '[aria-label="Iniciar una publicación"]',
        '[aria-label="Start a post"]',
        '.share-box-feed-entry__trigger',
    ]:
        try:
            btn = page.locator(sel).first
            if await btn.is_visible(timeout=4000): await btn.click(); break
        except PWTimeout: pass
    await page.wait_for_timeout(2000)

    # Escribir texto primero
    upd('running', 'Escribiendo texto...')
    try:
        area = page.locator(
            'div[aria-label="Cuadro de texto del editor de publicaciones"],'
            'div[aria-label="Text editor for creating content"],'
            'div[data-placeholder*="publicación"],'
            'div[data-placeholder*="post"],'
            '.ql-editor'
        ).first
        if await area.is_visible(timeout=5000):
            await area.click()
            await page.keyboard.type(caption, delay=8)
    except PWTimeout: pass

    # Añadir fotos
    upd('running', 'Añadiendo imágenes...')
    for sel in [
        'button[aria-label*="foto"]',
        'button[aria-label*="Photo"]',
        'button[aria-label*="imagen"]',
        'button[aria-label*="Image"]',
        'li-icon[type="image-medium"]',
    ]:
        try:
            btn = page.locator(sel).first
            if await btn.is_visible(timeout=3000): await btn.click(); await page.wait_for_timeout(1000); break
        except PWTimeout: pass

    # Subir imágenes
    try:
        fi = page.locator('input[type="file"]').first
        await fi.set_input_files(tmp_paths)  # LinkedIn acepta múltiples a la vez
        await page.wait_for_timeout(3000)
    except Exception as e:
        upd('error', f'Error subiendo imágenes: {e}'); return

    # Publicar
    upd('running', '¡Publicando! No cierres el navegador...')
    for sel in [
        'button:has-text("Publicar")',
        'button:has-text("Post")',
        'button[aria-label="Publicar"]',
        'button[aria-label="Post"]',
    ]:
        try:
            btn = page.locator(sel).first
            if await btn.is_visible(timeout=8000):
                await btn.click()
                await page.wait_for_timeout(5000)
                upd('success', f'✅ Post #{post["post_number"]} publicado en LinkedIn')
                return
        except PWTimeout: pass

    upd('error', 'No se encontró el botón "Publicar" en LinkedIn.')


# ─────────────────────────────────────────────────────────────────────────────
# Facebook
# ─────────────────────────────────────────────────────────────────────────────

async def _publish_facebook(page, post, creds, tmp_paths, caption, upd, job):
    from playwright.async_api import TimeoutError as PWTimeout

    upd('running', 'Abriendo Facebook...')
    await page.goto('https://www.facebook.com/', wait_until='domcontentloaded')
    await page.wait_for_timeout(2000)

    # Aceptar cookies
    for sel in ['button:has-text("Permitir todas")', 'button:has-text("Accept all")', '[data-cookiebanner="accept_button"]']:
        try:
            btn = page.locator(sel).first
            if await btn.is_visible(timeout=2500): await btn.click(); await page.wait_for_timeout(800); break
        except PWTimeout: pass

    # Login
    try:
        await page.fill('input[name="email"]', creds.get('email', creds.get('username', '')), timeout=8000)
        await page.fill('input[name="pass"]', creds['password'])
        await page.click('button[name="login"]')
        upd('running', 'Credenciales enviadas...')
        await page.wait_for_timeout(4500)
    except PWTimeout:
        upd('error', 'No se encontró el formulario de login de Facebook'); return

    # Credenciales incorrectas
    for sel in ['#error_box', '[data-testid="royal_login_button"] ~ div', '#login_error']:
        try:
            if await page.locator(sel).first.is_visible(timeout=1500):
                upd('wrong_credentials', 'Email o contraseña incorrectos en Facebook'); return
        except PWTimeout: pass

    # 2FA / checkpoint
    if any(k in page.url for k in ('checkpoint', 'two_step', 'confirm')):
        upd('needs_2fa', 'Facebook pide verificación. Complétala en Chrome y pulsa "Ya introduje el código".')
        job['continue_event'].wait(timeout=300)
        upd('running', 'Continuando...')
        await page.wait_for_timeout(3000)

    if 'login' in page.url:
        upd('wrong_credentials', 'Login fallido. Comprueba las credenciales de Facebook.'); return

    upd('running', 'Login ✓ — creando post...')

    # Ir al feed y hacer clic en "¿Qué estás pensando?"
    await page.goto('https://www.facebook.com/', wait_until='domcontentloaded')
    await page.wait_for_timeout(2000)

    for sel in [
        'div[aria-label*="pensando"]',
        'div[aria-label*="mind"]',
        'div[aria-placeholder*="pensando"]',
        'div[aria-placeholder*="mind"]',
        '[data-pagelet="FeedComposer"] [role="button"]',
    ]:
        try:
            btn = page.locator(sel).first
            if await btn.is_visible(timeout=4000): await btn.click(); await page.wait_for_timeout(1500); break
        except PWTimeout: pass

    # Escribir texto
    upd('running', 'Escribiendo texto...')
    try:
        area = page.locator(
            'div[aria-label*="pensando"],'
            'div[aria-label*="mind"],'
            'div[contenteditable="true"]'
        ).first
        if await area.is_visible(timeout=4000):
            await area.click()
            await page.keyboard.type(caption, delay=8)
    except PWTimeout: pass

    # Añadir fotos
    upd('running', 'Añadiendo imágenes...')
    for sel in [
        'div[aria-label*="Foto/vídeo"]',
        'div[aria-label*="Photo/video"]',
        'input[accept*="image"]',
    ]:
        try:
            el = page.locator(sel).first
            if await el.is_visible(timeout=3000):
                await el.click()
                await page.wait_for_timeout(1000)
                break
        except PWTimeout: pass

    try:
        fi = page.locator('input[type="file"]').first
        await fi.set_input_files(tmp_paths)
        await page.wait_for_timeout(3000)
    except Exception as e:
        upd('error', f'Error subiendo imágenes en Facebook: {e}'); return

    # Publicar
    upd('running', '¡Publicando! No cierres el navegador...')
    for sel in [
        'div[aria-label="Publicar"]',
        'div[aria-label="Post"]',
        'button:has-text("Publicar")',
        'button:has-text("Post")',
    ]:
        try:
            btn = page.locator(sel).first
            if await btn.is_visible(timeout=8000):
                await btn.click()
                await page.wait_for_timeout(5000)
                upd('success', f'✅ Post #{post["post_number"]} publicado en Facebook')
                return
        except PWTimeout: pass

    upd('error', 'No se encontró el botón "Publicar" en Facebook.')


# ─────────────────────────────────────────────────────────────────────────────
if __name__ == '__main__':
    print()
    print("╔══════════════════════════════════════════════════════════════╗")
    print("║   ContentFlow Publisher Server v2.0  —  localhost:8765      ║")
    print("║   Plataformas: Instagram · LinkedIn · Facebook               ║")
    print("║   Deja esta ventana abierta mientras usas ContentFlow        ║")
    print("║   Ctrl+C para parar                                          ║")
    print("╚══════════════════════════════════════════════════════════════╝")
    print()
    app.run(host='127.0.0.1', port=8765, debug=False, threaded=True)

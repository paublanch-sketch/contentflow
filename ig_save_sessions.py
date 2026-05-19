#!/usr/bin/env python3
"""
ig_save_sessions.py
Lee las sesiones de Instagram del perfil de Chrome de Sunamis
y las guarda en Supabase. Usa la IP local → sin 2FA.

Requisito: Chrome CERRADO antes de ejecutar.
"""

import asyncio, json, requests, platform as _platform
from pathlib import Path
from playwright.async_api import async_playwright

# ── Config ────────────────────────────────────────────────────────────────────
SUPABASE_URL = 'https://afbussamfzqfvozrycsr.supabase.co'
SUPABASE_KEY = 'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
DELAY = 4  # segundos entre cuentas

# ── Path de Chrome según SO ───────────────────────────────────────────────────
if _platform.system() == 'Windows':
    CHROME_PROFILE = str(Path.home() / 'AppData/Local/Google/Chrome/User Data')
elif _platform.system() == 'Darwin':
    CHROME_PROFILE = str(Path.home() / 'Library/Application Support/Google/Chrome')
else:  # Linux
    CHROME_PROFILE = str(Path.home() / '.config/google-chrome')

# ── Mapa username → client_id ─────────────────────────────────────────────────
USERNAME_TO_CLIENT = {
    'acaymocerrajeria':               'acaymo-delgado-higuero',
    'metodo.y.arquitectura':          'aida-camara-mancha',
    'gruponewenergy':                 'albert-xavier-termens-arderiu',
    'alutekaluminis':                 'aluminis-alutek-sl',
    'aromaticcbd':                    'aromed-company-sl',
    'cffuturoinmobiliaria':           'asesores-inmobiliarios-cf-futuro-sl',
    'AutoGucoso.Opel':                'auto-gucoso-sl',
    'autogucoso.opel':                'auto-gucoso-sl',
    'autoescuelabartrina':            'autoescuela-bartrina-sl',
    'avilec.industrial':              'avilec-valles-sl',
    'AVILEC.INDUSTRIAL':              'avilec-valles-sl',
    'info@bacarditextil.com':         'bacardi-textil-sl',
    'Bnefitcenter':                   'bnefit-paief-sl',
    'bnefitcenter':                   'bnefit-paief-sl',
    'c_alegre95':                     'carmen-alegre-sl',
    'clinicasfamed_':                 'centro-de-especialidades-medicas-famed-sl',
    'clinicasfamed':                  'centro-de-especialidades-medicas-famed-sl',
    '655700769':                      'christian-alessandria',
    'alessandriarider':               'christian-alessandria',
    'h.montanaroses':                 'clan-rivas-sl',
    'confex_sa':                      'confex-sa',
    'rotuwear':                       'creati-rr-sl',
    'crespioliverassessors':          'crespi-oliver-assessors-sl',
    'bar_elporron_terrassa':          'david-gonzalez-medina',
    'alreveseditor':                  'editorial-alreves-sl',
    'limonardemallorca':              'el-limonar-de-inca-sl',
    'excavacionstarres':              'excavacions-transports-i-obra-publica-tarres-sl',
    'optimmumestilistes':             'garmer-style-sl',
    'bellesaibenestargemma':          'gemma-vila-bibiloni',
    'lespedreres_bdb':                'gregorio-jerez-ballesteros-sl',
    'guiverbarcelona':                'guillen-associats-sl',
    'bigmathnosmoreno':               'hermanos-moreno-m-sl',
    'santjordiboutique':              'hotel-sant-jordi-sa',
    'Kensington.maresme':             'indisi-group-sl',
    'kensington.maresme':             'indisi-group-sl',
    'santateresa_inmobiliaria':       'inmobiliaria-rustica-y-urbana-santa-teresa-sl',
    'adriana@interactivos.net':       'instaladores-profvert-sl',
    'integralservicesmarinabaixa':    'integral-services-marina-baixa',
    'jdiaz.mantenimientos':           'j-diaz-mantenimientos-sl',
    'cancolls':                       'joan-bigas-vidal',
    'cancolls@gmail.com':             'joan-bigas-vidal',
    'lupovetiberica':                 'jose-manuel-gonzalez-navarro',
    'laboratoriosaverroes':           'juan-ramon-pina-membrado',
    'katiagarabitoabogados':          'katia-garabito-rubio',
    'kabio_sl':                       'kbio-slp',
    'livebarcelonatours':             'live-barcelona-sl',
    'fresh_laundry_santadria':        'luxa-lerona-2017-sl',
    'madeirasdoxallasgal':            'madeiras-do-xallas-sl',
    'maquinasdecoserlopezcepero':     'maquinas-de-coser-a-lopez-cepero-sl',
    'barcelona.sail':                 'maria-de-los-angeles-matilla-carot',
    'marian_arteterapia':             'marian-crespo-brands',
    'nurahousebarcelona':             'marta-bayona-mas',
    'refugiarp_caudellops':           'maria-cabrera-gallardo',
    'psicologa_en_malaga':            'mariangeles-marchese',
    'aquafusion_':                    'miguel-angel-galan-castro',
    'mon.ioga':                       'monica-cornet-bellmunt',
    'ocastrorestaurante':             'motel-o-castro-sl',
    'nataliagoma':                    'natalia-goma-argilaga',
    'greenhopper.grass':              'navacreus-luona-sl',
    'NebliCentrodeHalcones':          'nebli-centro-de-halcones-sl',
    'neblicentrodehalcones':          'nebli-centro-de-halcones-sl',
    'olgav':                          'olga-villacampa-laita',
    'clinicadentalotedent':           'otedent-sl',
    'pesgaliasl':                     'pesgalia-slu',
    'Contabilidad@riegosdeltormes.es':'riegos-del-tormes-slu',
    'serviciosdelimpiezarita':        'rita-heredia-bermudez',
    'rodrivegas':                     'rodrigo-veiga-sobral',
    'seifourgarraf':                  'seifour-garraf',
    'winter_school_empresas':         'semuliki-sl',
    'winterschoolbcn':                'semuliki-sl',
    'indigodjschool':                 'sergio-rodriguez-cortazar',
    'sif.servicios':                  'servicios-integrales-de-formacion-sl',
    'mima_mascotas':                  'silvia-sanchez-gonzalez',
    'xaviergarciabarcelona':          'solo-gafas-sl',
    'terafis_bcn':                    'terapias-y-tratamientos-fisicos-slp',
    'oficit_com':                     'tienda-oficit-sl',
    'comercial@oficit.es':            'tienda-oficit-sl',
    'totclinic':                      'totclinic-slu',
    'winfitclubs':                    'win-fitness-clubs-sl',
    'century21_xarxa':                'xarxa-realty-2021-sl',
}

# ── Contraseñas por username ──────────────────────────────────────────────────
PASSWORDS = {
    'acaymocerrajeria':            'Higuero_Tenerife_749_04',
    'metodo.y.arquitectura':       'CamBonArq15',
    'gruponewenergy':              'Gruponewenergy26#',
    'alutekaluminis':              'alutekaluminis2017',
    'aromaticcbd':                 'ManuelPereaVargas2022!',
    'cffuturoinmobiliaria':        'Interactivos25!',
    'autogucoso.opel':             'K1tDigital2025*',
    'AutoGucoso.Opel':             'K1tDigital2025*',
    'autoescuelabartrina':         'Bartrina@08191',
    'avilec.industrial':           'Interactivos26!',
    'AVILEC.INDUSTRIAL':           'Interactivos26!',
    'bnefitcenter':                'M@rk3t1ngT3l3m@tik@',
    'Bnefitcenter':                'M@rk3t1ngT3l3m@tik@',
    'clinicasfamed_':              'familiamedina',
    'clinicasfamed':               'familiamedina',
    '655700769':                   'CHfA2366934-8',
    'alessandriarider':            'CHfA2366934-8',
    'h.montanaroses':              'Interactivos26!',
    'confex_sa':                   'Cnfx2KXI2016',
    'rotuwear':                    'Jerez2025xx.',
    'crespioliverassessors':       'Interactivos25!',
    'bar_elporron_terrassa':       'Baza26',
    'alreveseditor':               'Alreves@2026.',
    'limonardemallorca':           'Limon2025',
    'excavacionstarres':           'Histamina-1',
    'optimmumestilistes':          'CommunityBrainUp2017',
    'bellesaibenestargemma':       'gv220712',
    'lespedreres_bdb':             'Gregorio98',
    'guiverbarcelona':             'camp23-25',
    'bigmathnosmoreno':            'Interactivos25!',
    'santjordiboutique':           'Chevrolet12',
    'kensington.maresme':          'indisigroup2023',
    'Kensington.maresme':          'indisigroup2023',
    'santateresa_inmobiliaria':    'SantaTeresa5',
    'integralservicesmarinabaixa': 'ponhe3-cijhuJ-bocwur',
    'jdiaz.mantenimientos':        'diazmantenimientos25#',
    'lupovetiberica':              'Lupovet_España_2025',
    'laboratoriosaverroes':        'Averroes2025_',
    'katiagarabitoabogados':       '637586598Kat',
    'cancolls':                    '972864363botiga',
    'cancolls@gmail.com':          '972864363botiga',
    # c_alegre95, nataliagoma, olgav → añadir contraseña cuando se conozca
    'kabio_sl':                    'kabio22',
    'livebarcelonatours':          'Eucaliptus44',
    'fresh_laundry_santadria':     'Luxa_Lerona_925_05',
    'madeirasdoxallasgal':         'K!tdigital2025*',
    'maquinasdecoserlopezcepero':  'Jerez2023xx.',
    'barcelona.sail':              'Barcelonasafa!',
    'marian_arteterapia':          'MiEsencia3',
    'nurahousebarcelona':          'zihjyt-toqnuX-biwxaz',
    'refugiarp_caudellops':        'RefugiDelArp2025!',
    'psicologa_en_malaga':         'Solreina69',
    'aquafusion_':                 'michelgalan564813',
    'mon.ioga':                    'Monica',
    'ocastrorestaurante':          'Ocastro310892',
    'greenhopper.grass':           'greenhopperCW2025',
    'neblicentrodehalcones':       'K1tDigital2025*',
    'NebliCentrodeHalcones':       'K1tDigital2025*',
    'clinicadentalotedent':        'Clinica41!!',
    'pesgaliasl':                  'K!tAkira2025*',
    'serviciosdelimpiezarita':     'K1tDigital2025*',
    'rodrivegas':                  'Danita1985',
    'seifourgarraf':               'SEI.FOUR4!',
    'winter_school_empresas':      'Semul478&',
    'winterschoolbcn':             'Semul478&',
    'indigodjschool':              'KitDigit@l',
    'sif.servicios':               'plazachavian',
    'mima_mascotas':               'minipanter1275',
    'xaviergarciabarcelona':       '0535sXG-Instagram',
    'terafis_bcn':                 'Terafis_79',
    'oficit_com':                  'Insta#oficit25',
    'totclinic':                   'T0tClin1c2025',
    'winfitclubs':                 'Surfacex10!',
    'century21_xarxa':             'Xarxa2021Century21@',
}

# ── Helpers ───────────────────────────────────────────────────────────────────
def save_to_supabase(client_id, username, cookies):
    storage_state = {
        'cookies': [dict(c) for c in cookies],
        'origins': []
    }
    try:
        r = requests.post(
            f'{SUPABASE_URL}/rest/v1/sessions',
            headers={
                'Content-Type':  'application/json',
                'apikey':        SUPABASE_KEY,
                'Authorization': f'Bearer {SUPABASE_KEY}',
                'Prefer':        'resolution=merge-duplicates',
            },
            json={
                'client_id':     client_id,
                'platform':      'IG',
                'storage_state': json.dumps(storage_state),
            },
            timeout=10
        )
        return r.status_code
    except Exception as e:
        print(f'[Supabase error: {e}]', end=' ')
        return 0

async def logout(page):
    try:
        await page.evaluate('''
            const csrf = document.cookie.match(/csrftoken=([^;]+)/)?.[1] || '';
            fetch('/accounts/logout/', {
                method: 'POST',
                headers: {'X-CSRFToken': csrf, 'Content-Type': 'application/x-www-form-urlencoded'},
                body: 'one_tap_app_login=0'
            });
        ''')
        await page.wait_for_timeout(2000)
        # Navegar a login para confirmar que el logout fue efectivo
        await page.goto('https://www.instagram.com/accounts/login/',
                        wait_until='domcontentloaded', timeout=15000)
        await page.wait_for_timeout(1500)
    except Exception:
        pass

async def is_logged_in(page):
    url = page.url
    return ('instagram.com' in url and
            'accounts/login' not in url and
            'challenge' not in url and
            'checkpoint' not in url)

async def get_ig_cookies(context):
    cookies = await context.cookies(['https://www.instagram.com', 'https://instagram.com'])
    return [c for c in cookies if 'instagram' in c.get('domain', '')]

# ── Main ──────────────────────────────────────────────────────────────────────
async def main():
    results = []

    print('\n' + '═'*60)
    print('  🔑 Instagram Session Extractor — Perfil Chrome de Sunamis')
    print('═'*60)
    print()

    # En Windows: matar cualquier proceso Chrome residual antes de abrir
    if _platform.system() == 'Windows':
        import subprocess as _sp
        _sp.run(['taskkill', '/F', '/IM', 'chrome.exe'], capture_output=True)
        await asyncio.sleep(2)

    async with async_playwright() as p:
        print('📂 Abriendo Chrome con tu perfil...')
        try:
            context = await p.chromium.launch_persistent_context(
                user_data_dir=CHROME_PROFILE,
                channel='chrome',
                headless=False,
                slow_mo=200,
                args=[],
                ignore_default_args=['--enable-automation', '--no-sandbox',
                                     '--disable-blink-features=AutomationControlled'],
            )
        except Exception as e:
            print(f'\n❌ Error abriendo Chrome: {e}')
            print('   → Asegúrate de que Chrome está completamente cerrado')
            return

        # Usar la página que ya abrió Playwright
        pages = context.pages
        page = pages[0] if pages else await context.new_page()

        # ── Paso 1: Determinar qué cuentas procesar ───────────────────────────
        print('🌐 Navegando a Instagram...\n')
        await page.goto('https://www.instagram.com/accounts/login/',
                        wait_until='domcontentloaded', timeout=30000)
        await page.wait_for_timeout(4000)

        # Extraer usernames del picker (si aparece)
        picker_usernames = await page.evaluate('''
            () => {
                const results = [];
                const candidates = document.querySelectorAll(
                    'div[role="button"], button, a[role="button"]'
                );
                candidates.forEach(el => {
                    const lines = (el.innerText || '').trim().split("\\n")
                        .map(l => l.trim()).filter(Boolean);
                    lines.forEach(line => {
                        if (/^[a-zA-Z0-9_.@]{3,50}$/.test(line) &&
                            !['Iniciar sesión','Log in','Continue',
                              'Iniciar','Login'].includes(line)) {
                            results.push(line);
                        }
                    });
                });
                return [...new Set(results)];
            }
        ''')

        saved_accounts = [u for u in picker_usernames
                          if u in USERNAME_TO_CLIENT or u.lower() in USERNAME_TO_CLIENT]

        if not saved_accounts:
            # Fallback: procesar TODAS las cuentas del mapa usando login directo
            print('ℹ️  Picker no detectado — se usará login directo con usuario+contraseña.')
            saved_accounts = [u for u in USERNAME_TO_CLIENT if u in PASSWORDS]

        # Deduplicar: si hay variantes mayúsculas/minúsculas del mismo username,
        # quedarse solo con la primera aparición (evita procesar la misma cuenta 2 veces)
        seen_lower = set()
        deduped = []
        for u in saved_accounts:
            if u.lower() not in seen_lower:
                seen_lower.add(u.lower())
                deduped.append(u)
        saved_accounts = deduped
        print(f'   Procesando {len(saved_accounts)} cuentas únicas.\n')

        print(f'📋 Cuentas a procesar: {len(saved_accounts)}')
        for u in saved_accounts:
            cid = USERNAME_TO_CLIENT.get(u) or USERNAME_TO_CLIENT.get(u.lower(), '???')
            print(f'   • @{u:<35} → {cid}')
        print()

        # ── Paso 2: Procesar cada cuenta ──────────────────────────────────────
        for idx, username in enumerate(saved_accounts, 1):
            client_id = USERNAME_TO_CLIENT.get(username) or USERNAME_TO_CLIENT.get(username.lower())
            password  = PASSWORDS.get(username) or PASSWORDS.get(username.lower())

            print(f'[{idx:>2}/{len(saved_accounts)}] @{username}', end=' ', flush=True)

            if not client_id:
                print('⚠️  Sin client_id → saltando')
                results.append({'u': username, 'cid': '???', 's': 'no_client_id'})
                continue
            if not password:
                print('❓ Sin contraseña → saltando')
                results.append({'u': username, 'cid': client_id, 's': 'no_password'})
                continue

            # ── Ir a login y esperar form ────────────────────────────────────
            await page.goto('https://www.instagram.com/accounts/login/',
                            wait_until='domcontentloaded')
            await page.wait_for_timeout(3000)

            url_now = page.url

            # Si ya estamos en el feed (sesión activa), hacer logout primero
            if 'login' not in url_now and 'instagram.com' in url_now:
                await logout(page)
                await page.wait_for_timeout(2000)
                await page.goto('https://www.instagram.com/accounts/login/',
                                wait_until='domcontentloaded')
                await page.wait_for_timeout(3000)

            # ── Intentar click en picker ─────────────────────────────────────
            picker_clicked = False
            try:
                btn = page.get_by_text(username, exact=True).first
                if await btn.is_visible(timeout=2000):
                    await btn.click()
                    await page.wait_for_timeout(2500)
                    picker_clicked = True
            except Exception:
                pass

            # ── Si picker no funcionó: rellenar form usuario + contraseña ────
            if not picker_clicked or 'login' in page.url:
                try:
                    user_input = page.locator('input[name="username"]').first
                    pass_input = page.locator('input[name="password"]').first
                    if await user_input.is_visible(timeout=3000):
                        await user_input.fill(username)
                        await page.wait_for_timeout(400)
                        await pass_input.fill(password)
                        await page.wait_for_timeout(400)
                        await pass_input.press('Enter')
                        await page.wait_for_timeout(5000)
                except Exception as e:
                    print(f'❌ Error en form: {e}')
                    results.append({'u': username, 'cid': client_id, 's': 'error'})
                    continue

            # ── Si el picker pidió contraseña ────────────────────────────────
            url_now = page.url
            pwd_visible = await page.locator('input[type="password"]').is_visible()
            if 'login' in url_now or pwd_visible:
                try:
                    inp = page.locator('input[type="password"]').first
                    await inp.fill(password)
                    await page.wait_for_timeout(400)
                    await inp.press('Enter')
                    await page.wait_for_timeout(5000)
                except Exception:
                    pass

            url_now = page.url

            # ── Checkpoint / 2FA ─────────────────────────────────────────────
            if 'challenge' in url_now or 'checkpoint' in url_now:
                print('⚠️  Checkpoint/2FA — saltando')
                results.append({'u': username, 'cid': client_id, 's': 'checkpoint'})
                await page.goto('https://www.instagram.com/accounts/login/',
                                wait_until='domcontentloaded', timeout=15000)
                await page.wait_for_timeout(1500)
                continue

            # ── Verificar login ──────────────────────────────────────────────
            if not await is_logged_in(page):
                print(f'❌ Sin login — {url_now[:60]}')
                results.append({'u': username, 'cid': client_id, 's': 'error'})
                continue

            # ── Confirmar que es la cuenta correcta ──────────────────────────
            # (solo si el username es un handle válido, no un email)
            if '@' not in username:
                try:
                    await page.goto(f'https://www.instagram.com/{username}/',
                                    wait_until='domcontentloaded', timeout=15000)
                    await page.wait_for_timeout(2000)
                except Exception:
                    pass

            # ── Extraer y guardar cookies ─────────────────────────────────────
            cookies = await get_ig_cookies(context)
            has_session = any(c['name'] == 'sessionid' for c in cookies)

            if not has_session:
                print('⚠️  Sin sessionid — saltando')
                results.append({'u': username, 'cid': client_id, 's': 'no_session'})
            else:
                sc = save_to_supabase(client_id, username, cookies)
                if sc in (200, 201):
                    print(f'✅ Guardado (HTTP {sc})')
                    results.append({'u': username, 'cid': client_id, 's': 'ok'})
                else:
                    print(f'⚠️  Supabase HTTP {sc}')
                    results.append({'u': username, 'cid': client_id, 's': f'supabase_{sc}'})

            # ── Logout antes de la siguiente cuenta ───────────────────────────
            await logout(page)
            await asyncio.sleep(DELAY)

        await context.close()

    # ── Resumen final ─────────────────────────────────────────────────────────
    ok          = [r for r in results if r['s'] == 'ok']
    checkpoint  = [r for r in results if r['s'] == 'checkpoint']
    errors      = [r for r in results if r['s'] not in ('ok',)]

    print('\n' + '═'*60)
    print(f'✅ Sesiones guardadas en Supabase: {len(ok)}/{len(results)}')
    print(f'⚠️  Checkpoints/2FA:               {len(checkpoint)}')
    print(f'❌ Errores/Sin guardar:             {len(errors) - len(checkpoint)}')
    print()
    for r in results:
        icon = {'ok':'✅','checkpoint':'⚠️','no_password':'❓','no_session':'🔶','error':'❌'}.get(r['s'],'?')
        print(f'  {icon} @{r["u"]:<35} → {r["s"]}')

    # Guardar CSV
    import csv, datetime
    fn = f'ig_sessions_{datetime.date.today()}.csv'
    with open(fn, 'w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, ['u','cid','s'])
        w.writeheader(); w.writerows(results)
    print(f'\n📄 Resultado guardado en: {fn}')

if __name__ == '__main__':
    asyncio.run(main())

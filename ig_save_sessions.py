#!/usr/bin/env python3
"""
ig_save_sessions.py
Lee las sesiones de Instagram del perfil de Chrome de Sunamis
y las guarda en Supabase. Usa la IP local → sin 2FA.

Requisito: Chrome CERRADO antes de ejecutar.
"""

import asyncio, json, requests
from pathlib import Path
from playwright.async_api import async_playwright, TimeoutError as PWTimeout

# ── Config ────────────────────────────────────────────────────────────────────
SUPABASE_URL = 'https://afbussamfzqfvozrycsr.supabase.co'
SUPABASE_KEY = 'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
CHROME_PROFILE = str(Path.home() / 'Library/Application Support/Google/Chrome')
DELAY = 4  # segundos entre cuentas

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
        await page.wait_for_timeout(1500)
    except:
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

    async with async_playwright() as p:
        print('📂 Abriendo Chrome con tu perfil...')
        try:
            context = await p.chromium.launch_persistent_context(
                user_data_dir=CHROME_PROFILE,
                channel='chrome',
                headless=False,
                slow_mo=200,
                args=['--disable-blink-features=AutomationControlled'],
                ignore_default_args=['--enable-automation'],
            )
        except Exception as e:
            print(f'\n❌ Error abriendo Chrome: {e}')
            print('   → Asegúrate de que Chrome está completamente cerrado')
            return

        page = await context.new_page()

        # ── Paso 1: Ir a la página de login ──────────────────────────────────
        print('🌐 Navegando a Instagram...\n')
        await page.goto('https://www.instagram.com/accounts/login/', wait_until='domcontentloaded')
        await page.wait_for_timeout(3000)

        # ── Paso 2: Obtener lista de cuentas guardadas del picker ────────────────
        import re

        # Esperar a que el picker cargue
        await page.wait_for_timeout(2000)

        # Extraer usernames directamente de los elementos del picker de IG
        # El picker muestra botones/divs con el username como texto visible
        picker_usernames = await page.evaluate('''
            () => {
                const results = [];
                // Selector del picker de cuentas de Instagram
                const candidates = document.querySelectorAll(
                    'div[role="button"], button, a[role="button"]'
                );
                candidates.forEach(el => {
                    const text = el.innerText?.trim() || '';
                    // Username de IG: solo letras, números, puntos, guiones, @
                    const lines = text.split("\\n").map(l => l.trim()).filter(Boolean);
                    lines.forEach(line => {
                        if (/^[a-zA-Z0-9_.@]{3,50}$/.test(line) &&
                            !line.includes(' ') &&
                            line !== 'Iniciar sesión' &&
                            line !== 'Log in' &&
                            line !== 'Continue') {
                            results.push(line);
                        }
                    });
                });
                return [...new Set(results)];
            }
        ''')

        # Cotejar con nuestro mapa de clientes → solo los 39 guardados en Chrome
        saved_accounts = [u for u in picker_usernames
                          if u in USERNAME_TO_CLIENT or u.lower() in USERNAME_TO_CLIENT]

        # Si el picker no detectó nada (IG redirigió directo), aviso
        if not saved_accounts:
            print('⚠️  No se detectaron cuentas en el picker.')
            print('   → Puede que Instagram haya redirigido. Revisa la ventana de Chrome.')
            await page.wait_for_timeout(5000)
            # Reintento más agresivo: buscar cualquier texto que coincida con nuestros usernames
            all_text = await page.inner_text('body')
            for u in USERNAME_TO_CLIENT:
                if u in all_text:
                    saved_accounts.append(u)
            saved_accounts = list(dict.fromkeys(saved_accounts))  # dedup

        print(f'📋 Cuentas del picker de Chrome cotejadas con clientes: {len(saved_accounts)}')
        for u in saved_accounts:
            cid = USERNAME_TO_CLIENT.get(u) or USERNAME_TO_CLIENT.get(u.lower())
            print(f'   • @{u:<35} → {cid}')
        print()

        # ── Paso 3: Procesar cada cuenta ──────────────────────────────────────
        for idx, username in enumerate(saved_accounts, 1):
            client_id = USERNAME_TO_CLIENT.get(username) or USERNAME_TO_CLIENT.get(username.lower())
            password   = PASSWORDS.get(username) or PASSWORDS.get(username.lower())

            print(f'[{idx:>2}/{len(saved_accounts)}] @{username}', end=' ... ', flush=True)

            # Navegar al login picker
            await page.goto('https://www.instagram.com/accounts/login/', wait_until='domcontentloaded')
            await page.wait_for_timeout(2000)

            # Click en la cuenta
            clicked = await page.evaluate(f'''
                (() => {{
                    const all = Array.from(document.querySelectorAll('*'));
                    const el  = all.find(e => e.children.length <= 2 && e.innerText?.trim() === {json.dumps(username)});
                    if (!el) return false;
                    let p = el;
                    for (let i = 0; i < 12; i++) {{
                        if (!p) break;
                        if (p.onclick || p.tagName === 'BUTTON' || p.tagName === 'A' ||
                            p.getAttribute?.('role') === 'button') {{
                            p.click();
                            return true;
                        }}
                        p = p.parentElement;
                    }}
                    // Fallback: click the element itself
                    el.click();
                    return true;
                }})()
            ''')

            await page.wait_for_timeout(2500)

            # Detectar si pide contraseña
            content = await page.content()
            asks_password = ('type="password"' in content or
                             'Contraseña' in content or
                             'Password' in content)
            url_now = page.url

            if asks_password:
                if not password:
                    print('❓ Pide contraseña → no tenemos, saltando')
                    results.append({'u': username, 'cid': client_id, 's': 'no_password'})
                    await page.keyboard.press('Escape')
                    await page.wait_for_timeout(500)
                    continue

                # Escribir contraseña
                try:
                    inp = page.locator('input[type="password"]').first
                    await inp.fill(password)
                    await page.wait_for_timeout(500)
                    await inp.press('Enter')
                    await page.wait_for_timeout(4000)
                except:
                    pass

                url_now = page.url

            # Comprobar resultado
            if await is_logged_in(page):
                cookies = await get_ig_cookies(context)
                has_session = any(c['name'] == 'sessionid' for c in cookies)
                sc = save_to_supabase(client_id, username, cookies) if has_session else 0
                if has_session:
                    print(f'✅ Guardado en Supabase (HTTP {sc})')
                    results.append({'u': username, 'cid': client_id, 's': 'ok'})
                else:
                    print('⚠️  Logueado pero sin sessionid')
                    results.append({'u': username, 'cid': client_id, 's': 'no_session'})
                await logout(page)

            elif 'challenge' in url_now or 'checkpoint' in url_now:
                print('⚠️  Checkpoint (2FA) — saltando')
                results.append({'u': username, 'cid': client_id, 's': 'checkpoint'})
                await page.goto('https://www.instagram.com/accounts/login/')
                await page.wait_for_timeout(1500)

            else:
                print(f'❌ Sin login — {url_now[:60]}')
                results.append({'u': username, 'cid': client_id, 's': 'error'})

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
    with open(fn, 'w', newline='') as f:
        w = csv.DictWriter(f, ['u','cid','s'])
        w.writeheader(); w.writerows(results)
    print(f'\n📄 Resultado guardado en: {fn}')

if __name__ == '__main__':
    asyncio.run(main())

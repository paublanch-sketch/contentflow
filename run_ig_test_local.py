#!/usr/bin/env python3
"""
run_ig_test_local.py
Loop de prueba de credenciales Instagram desde IP local (Mac de Sunamis).
Guarda sesiones válidas en Supabase.

Requisitos: pip3 install requests
Uso: python3 run_ig_test_local.py
"""

import requests
import time
import json
import csv
import re
from datetime import datetime

# ── Config ────────────────────────────────────────────────────────────────────
SUPABASE_URL = 'https://afbussamfzqfvozrycsr.supabase.co'
SUPABASE_KEY = 'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'
DELAY = 4  # segundos entre pruebas

UA = ('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) '
      'AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1')

# ── Clientes ──────────────────────────────────────────────────────────────────
CLIENTS = [
  {"id": "acaymo-delgado-higuero", "name": "ACAYMO DELGADO HIGUERO", "ig_username": "acaymocerrajeria", "ig_password": "Higuero_Tenerife_749_04"},
  {"id": "aida-camara-mancha", "name": "AIDA CÀMARA MANCHA", "ig_username": "metodo.y.arquitectura", "ig_password": "CamBonArq15"},
  {"id": "albert-xavier-termens-arderiu", "name": "ALBERT XAVIER TERMENS ARDERIU", "ig_username": "gruponewenergy", "ig_password": "Gruponewenergy26#"},
  {"id": "aluminis-alutek-sl", "name": "ALUMINIS ALUTEK, SL", "ig_username": "alutekaluminis", "ig_password": "alutekaluminis2017"},
  {"id": "aromed-company-sl", "name": "AROMED COMPANY SL", "ig_username": "aromaticcbd", "ig_password": "ManuelPereaVargas2022!"},
  {"id": "asesores-inmobiliarios-cf-futuro-sl", "name": "ASESORES INMOBILIARIOS CF FUTURO SL", "ig_username": "cffuturoinmobiliaria", "ig_password": "Interactivos25!"},
  {"id": "auto-gucoso-sl", "name": "AUTO GUCOSO S.L", "ig_username": "AutoGucoso.Opel", "ig_password": "K1tDigital2025*"},
  {"id": "autoescuela-bartrina-sl", "name": "AUTOESCUELA BARTRINA, S.L.", "ig_username": "autoescuelabartrina@gmail.com", "ig_password": "Bartrina@08191"},
  {"id": "avilec-valles-sl", "name": "AVILEC VALLÈS S.L.", "ig_username": "AVILEC.INDUSTRIAL", "ig_password": "Interactivos26!"},
  {"id": "bacardi-textil-sl", "name": "BACARDI TEXTIL, S.L.", "ig_username": "info@bacarditextil.com", "ig_password": "bacardi@24"},
  {"id": "bnefit-paief-sl", "name": "BNEFIT PAIEF, SL", "ig_username": "Bnefitcenter", "ig_password": "M@rk3t1ngT3l3m@tik@"},
  {"id": "carmen-alegre-sl", "name": "CARMEN ALEGRE SL", "ig_username": "c_alegre95@hotmail.com", "ig_password": "Novias95#"},
  {"id": "centro-de-especialidades-medicas-famed-sl", "name": "CENTRO DE ESPECIALIDADES MEDICAS FAMED SL", "ig_username": "clinicasfamed_", "ig_password": "familiamedina"},
  {"id": "christian-alessandria", "name": "CHRISTIAN ALESSANDRIA", "ig_username": "655700769", "ig_password": "CHfA2366934-8"},
  {"id": "clan-rivas-sl", "name": "CLAN RIVAS SL", "ig_username": "h.montanaroses", "ig_password": "Interactivos26!"},
  {"id": "confex-sa", "name": "CONFEX S.A.", "ig_username": "confex_sa", "ig_password": "Cnfx2KXI2016"},
  {"id": "creati-rr-sl", "name": "CREATI RR SL", "ig_username": "rotuwear", "ig_password": "Jerez2025xx."},
  {"id": "crespi-oliver-assessors-sl", "name": "CRESPI-OLIVER ASSESSORS SL", "ig_username": "crespioliverassessors", "ig_password": "Interactivos25!"},
  {"id": "david-gonzalez-medina", "name": "DAVID GONZALEZ MEDINA", "ig_username": "bar_elporron_terrassa", "ig_password": "Baza26"},
  {"id": "editorial-alreves-sl", "name": "EDITORIAL ALREVES SL", "ig_username": "alreveseditor", "ig_password": "Alreves@2026."},
  {"id": "el-limonar-de-inca-sl", "name": "EL LIMONAR DE INCA, S.L.", "ig_username": "limonardemallorca", "ig_password": "Limon2025"},
  {"id": "excavacions-transports-i-obra-publica-tarres-sl", "name": "EXCAVACIONS TRANSPORTS I OBRA PUBLICA TARRES SL", "ig_username": "excavacionstarres", "ig_password": "Histamina-1"},
  {"id": "garmer-style-sl", "name": "GARMER STYLE SL", "ig_username": "optimmumestilistes", "ig_password": "CommunityBrainUp2017"},
  {"id": "gemma-vila-bibiloni", "name": "GEMMA VILA BIBILONI", "ig_username": "bellesaibenestargemma", "ig_password": "gv220712"},
  {"id": "gregorio-jerez-ballesteros-sl", "name": "GREGORIO JEREZ BALLESTEROS SL", "ig_username": "lespedreres_bdb", "ig_password": "Gregorio98"},
  {"id": "guillen-associats-sl", "name": "GUILLEN & ASSOCIATS, SL", "ig_username": "guiverbarcelona", "ig_password": "camp23-25"},
  {"id": "hermanos-moreno-m-sl", "name": "HERMANOS MORENO M SL", "ig_username": "bigmathnosmoreno", "ig_password": "Interactivos25!"},
  {"id": "hotel-sant-jordi-sa", "name": "HOTEL SANT JORDI SA.", "ig_username": "hotelsantjordi@hotelsantjordi.com", "ig_password": "Chevrolet12"},
  {"id": "indisi-group-sl", "name": "INDISI GROUP SL", "ig_username": "Kensington.maresme", "ig_password": "indisigroup2023"},
  {"id": "inmobiliaria-rustica-y-urbana-santa-teresa-sl", "name": "INMOBILIARIA RUSTICA Y URBANA SANTA TERESA SL", "ig_username": "santateresa_inmobiliaria", "ig_password": "SantaTeresa5"},
  {"id": "instaladores-profvert-sl", "name": "INSTALADORES PROFVERT, S.L.", "ig_username": "adriana@interactivos.net", "ig_password": "Ver@cc25"},
  {"id": "integral-services-marina-baixa", "name": "INTEGRAL SERVICES MARINA BAIXA", "ig_username": "integralservicesmarinabaixa", "ig_password": "ponhe3-cijhuJ-bocwur"},
  {"id": "j-diaz-mantenimientos-sl", "name": "J DIAZ MANTENIMIENTOS SL", "ig_username": "jdiaz.mantenimientos", "ig_password": "diazmantenimientos25#"},
  {"id": "joan-bigas-vidal", "name": "JOAN BIGAS VIDAL", "ig_username": "cancolls@gmail.com", "ig_password": "972864363botiga"},
  {"id": "jose-manuel-gonzalez-navarro", "name": "JOSE MANUEL GONZÁLEZ NAVARRO", "ig_username": "lupovetiberica", "ig_password": "Lupovet_España_2025"},
  {"id": "juan-ramon-pina-membrado", "name": "JUAN RAMON PINA MEMBRADO", "ig_username": "laboratoriosaverroes", "ig_password": "Averroes2025_"},
  {"id": "katia-garabito-rubio", "name": "KATIA GARABITO RUBIO", "ig_username": "katiagarabitoabogados", "ig_password": "637586598Kat"},
  {"id": "kbio-slp", "name": "KBIO SLP", "ig_username": "kabio_sl", "ig_password": "kabio22"},
  {"id": "live-barcelona-sl", "name": "LIVE BARCELONA SL", "ig_username": "livebarcelonatours", "ig_password": "Eucaliptus44"},
  {"id": "luxa-lerona-2017-sl", "name": "LUXA-LERONA 2017 SL", "ig_username": "fresh_laundry_santadria", "ig_password": "Luxa_Lerona_925_05"},
  {"id": "madeiras-do-xallas-sl", "name": "MADEIRAS DO XALLAS, S.L.", "ig_username": "madeirasdoxallasgal", "ig_password": "K!tdigital2025*"},
  {"id": "maquinas-de-coser-a-lopez-cepero-sl", "name": "MAQUINAS DE COSER A LOPEZ CEPERO SL", "ig_username": "maquinasdecoserlopezcepero", "ig_password": "Jerez2023xx."},
  {"id": "maria-de-los-angeles-matilla-carot", "name": "MARIA DE LOS ANGELES MATILLA CAROT", "ig_username": "barcelona.sail", "ig_password": "Barcelonasafa!"},
  {"id": "marian-crespo-brands", "name": "MARIAN CRESPO BRANDS", "ig_username": "marian_arteterapia", "ig_password": "MiEsencia3"},
  {"id": "marta-bayona-mas", "name": "MARTA BAYONA MAS", "ig_username": "nurahousebarcelona", "ig_password": "zihjyt-toqnuX-biwxaz"},
  {"id": "maria-cabrera-gallardo", "name": "MARÍA CABRERA GALLARDO", "ig_username": "refugiarp_caudellops", "ig_password": "RefugiDelArp2025!"},
  {"id": "mariangeles-marchese", "name": "MARÍANGELES MARCHESE", "ig_username": "psicologa_en_malaga", "ig_password": "Solreina69"},
  {"id": "miguel-angel-galan-castro", "name": "MIGUEL ANGEL GALAN CASTRO", "ig_username": "aquafusion_", "ig_password": "michelgalan564813"},
  {"id": "monica-cornet-bellmunt", "name": "MONICA CORNET BELLMUNT", "ig_username": "mon.ioga", "ig_password": "Monica"},
  {"id": "motel-o-castro-sl", "name": "MOTEL O CASTRO SL", "ig_username": "ocastrorestaurante", "ig_password": "Ocastro310892"},
  {"id": "natalia-goma-argilaga", "name": "NATALIA GOMÁ ARGILAGA", "ig_username": "nataliagoma@gmail.com", "ig_password": "social2012"},
  {"id": "navacreus-luona-sl", "name": "NAVACREUS LUONA SL", "ig_username": "greenhopper.grass", "ig_password": "greenhopperCW2025"},
  {"id": "nebli-centro-de-halcones-sl", "name": "NEBLI CENTRO DE HALCONES SL", "ig_username": "NebliCentrodeHalcones", "ig_password": "K1tDigital2025*"},
  {"id": "olga-villacampa-laita", "name": "OLGA VILLACAMPA LAITA", "ig_username": "olgav@noemaconsulting.net", "ig_password": "Canada1992!"},
  {"id": "otedent-sl", "name": "OTEDENT SL", "ig_username": "clinicadentalotedent", "ig_password": "Clinica41!!"},
  {"id": "pesgalia-slu", "name": "PESGALIA SLU", "ig_username": "pesgaliasl", "ig_password": "K!tAkira2025*"},
  {"id": "riegos-del-tormes-slu", "name": "RIEGOS DEL TORMES SLU", "ig_username": "Contabilidad@riegosdeltormes.es", "ig_password": "Co2602750"},
  {"id": "rita-heredia-bermudez", "name": "RITA HEREDIA BERMUDEZ", "ig_username": "serviciosdelimpiezarita", "ig_password": "K1tDigital2025*"},
  {"id": "rodrigo-veiga-sobral", "name": "RODRIGO VEIGA SOBRAL", "ig_username": "rodrivegas", "ig_password": "Danita1985"},
  {"id": "seifour-garraf", "name": "SEIFOUR GARRAF", "ig_username": "seifourgarraf", "ig_password": "SEI.FOUR4!"},
  {"id": "semuliki-sl", "name": "SEMULIKI S.L.", "ig_username": "winter_school_empresas", "ig_password": "Semul478&"},
  {"id": "sergio-rodriguez-cortazar", "name": "SERGIO RODRIGUEZ CORTAZAR", "ig_username": "indigodjschool", "ig_password": "KitDigit@l"},
  {"id": "servicios-integrales-de-formacion-sl", "name": "SERVICIOS INTEGRALES DE FORMACION SL", "ig_username": "sif.servicios", "ig_password": "plazachavian"},
  {"id": "silvia-sanchez-gonzalez", "name": "SILVIA SANCHEZ GONZALEZ", "ig_username": "mima_mascotas", "ig_password": "minipanter1275"},
  {"id": "solo-gafas-sl", "name": "SOLO GAFAS SL", "ig_username": "xaviergarciabarcelona", "ig_password": "0535sXG-Instagram"},
  {"id": "terapias-y-tratamientos-fisicos-slp", "name": "TERAPIAS Y TRATAMIENTOS FÍSICOS SLP", "ig_username": "terafis_bcn", "ig_password": "Terafis_79"},
  {"id": "tienda-oficit-sl", "name": "TIENDA OFICIT SL", "ig_username": "comercial@oficit.es", "ig_password": "Insta#oficit25"},
  {"id": "totclinic-slu", "name": "TOTCLINIC S.L.U", "ig_username": "totclinic", "ig_password": "T0tClin1c2025"},
  {"id": "win-fitness-clubs-sl", "name": "WIN FITNESS CLUBS SL", "ig_username": "winfitclubs", "ig_password": "Surfacex10!"},
  {"id": "xarxa-realty-2021-sl", "name": "XARXA REALTY 2021 SL", "ig_username": "century21_xarxa", "ig_password": "Xarxa2021Century21@"},
]

# ── Helpers ───────────────────────────────────────────────────────────────────
def parse_cookies(cookies_header):
    """Convierte header set-cookie al formato Playwright."""
    seen = set()
    result = []
    if not cookies_header:
        return result
    # Extraer pares clave=valor ignorando atributos
    skip = {'path','domain','expires','max-age','samesite','httponly','secure','version'}
    for part in re.finditer(r'([^,=\s]+)=([^;,]*)', cookies_header):
        name = part.group(1).strip()
        val  = part.group(2).strip()
        if name.lower() in skip or name in seen:
            continue
        seen.add(name)
        result.append({
            'name': name, 'value': val,
            'domain': '.instagram.com', 'path': '/',
            'expires': -1, 'httpOnly': False, 'secure': True, 'sameSite': 'Lax',
        })
    return result


def save_session(client_id, storage_state):
    """Guarda storage_state en Supabase tabla sessions."""
    r = requests.post(
        f'{SUPABASE_URL}/rest/v1/sessions',
        headers={
            'Content-Type':  'application/json',
            'apikey':        SUPABASE_KEY,
            'Authorization': f'Bearer {SUPABASE_KEY}',
            'Prefer':        'resolution=merge-duplicates',
        },
        json={'client_id': client_id, 'platform': 'IG', 'storage_state': json.dumps(storage_state)},
        timeout=10,
    )
    return r.status_code


def test_client(client):
    """Prueba credenciales IG. Devuelve (status, note)."""
    username = client['ig_username']
    password = client['ig_password']
    client_id = client['id']

    headers_base = {
        'User-Agent':      UA,
        'Accept-Language': 'es-ES,es;q=0.9',
    }

    try:
        # 1. Obtener CSRF
        page = requests.get(
            'https://www.instagram.com/accounts/login/',
            headers={**headers_base, 'Accept': 'text/html,application/xhtml+xml,*/*;q=0.8'},
            timeout=10,
        )
        page_cookies = page.headers.get('set-cookie', '')
        csrf = re.search(r'csrftoken=([^;,\s]+)', page_cookies)
        csrf = csrf.group(1) if csrf else ''

        if not csrf:
            return 'error', 'No CSRF — Instagram bloqueó'

        # 2. Login AJAX
        ts = int(time.time())
        enc_password = f'#PWD_INSTAGRAM_BROWSER:0:{ts}:{password}'

        login = requests.post(
            'https://www.instagram.com/api/v1/web/accounts/login/ajax/',
            headers={
                **headers_base,
                'Content-Type':     'application/x-www-form-urlencoded',
                'X-CSRFToken':      csrf,
                'X-Instagram-AJAX': str(ts),
                'X-Requested-With': 'XMLHttpRequest',
                'Referer':          'https://www.instagram.com/accounts/login/',
                'Cookie':           f'csrftoken={csrf}',
                'Accept':           '*/*',
            },
            data={
                'username':            username,
                'enc_password':        enc_password,
                'queryParams':         '{}',
                'optIntoOneTap':       'false',
                'stopDeletionNonce':   '',
                'trustedDeviceRecords':'{}',
            },
            timeout=10,
        )
        login_cookies = login.headers.get('set-cookie', '')
        data = login.json()

    except Exception as e:
        return 'error', str(e)[:120]

    # 3. Interpretar respuesta
    if data.get('authenticated') is True:
        all_cookies = parse_cookies(page_cookies + ', ' + login_cookies)
        storage_state = {'cookies': all_cookies, 'origins': []}
        sc = save_session(client_id, storage_state)
        return 'ok', f'Login OK — sesión guardada (HTTP {sc})'

    if data.get('two_factor_required'):
        return 'needs_2fa', '2FA requerido (SMS/app)'

    if data.get('checkpoint_url') or data.get('message') == 'checkpoint_required':
        return 'needs_2fa', f"Checkpoint: {data.get('checkpoint_url', '')}"

    if data.get('user') is False or data.get('message') == 'bad_password':
        return 'wrong_creds', 'Contraseña incorrecta'

    if data.get('user') is None:
        return 'wrong_creds', 'Usuario no encontrado'

    return 'error', json.dumps(data)[:150]


# ── Main loop ─────────────────────────────────────────────────────────────────
def main():
    results = []
    total = len(CLIENTS)

    print(f'\n🔑 IG Credential Test — {total} cuentas — delay {DELAY}s\n')
    print(f'{"#":<4} {"Usuario":<35} {"Estado":<15} {"Nota"}')
    print('─' * 90)

    for i, client in enumerate(CLIENTS, 1):
        status, note = test_client(client)
        icon = {'ok':'✅','needs_2fa':'⚠️','wrong_creds':'❌','error':'🔴'}.get(status, '?')
        print(f'[{i:>2}/{total}] {icon} @{client["ig_username"]:<32} {status:<15} {note}')
        results.append({
            'id': client['id'],
            'name': client['name'],
            'username': client['ig_username'],
            'status': status,
            'note': note,
            'tested_at': datetime.now().isoformat(),
        })

        if i < total:
            time.sleep(DELAY)

    # Resumen
    ok    = [r for r in results if r['status'] == 'ok']
    twofa = [r for r in results if r['status'] == 'needs_2fa']
    wrong = [r for r in results if r['status'] == 'wrong_creds']
    errors= [r for r in results if r['status'] == 'error']

    print('\n' + '═' * 90)
    print(f'✅ OK:            {len(ok)}')
    print(f'⚠️  2FA:           {len(twofa)}')
    print(f'❌ Credenciales:  {len(wrong)}')
    print(f'🔴 Errores:       {len(errors)}')

    if twofa:
        print(f'\n⚠️  Necesitan 2FA: {", ".join("@"+r["username"] for r in twofa)}')
    if wrong:
        print(f'❌ Contraseña mal: {", ".join("@"+r["username"] for r in wrong)}')

    # Guardar CSV
    csv_path = f'ig_test_resultado_{datetime.now().strftime("%Y%m%d_%H%M")}.csv'
    with open(csv_path, 'w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, fieldnames=['id','name','username','status','note','tested_at'])
        w.writeheader()
        w.writerows(results)
    print(f'\n📄 CSV guardado: {csv_path}')


if __name__ == '__main__':
    main()

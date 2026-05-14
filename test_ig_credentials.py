#!/usr/bin/env python3
"""
test_ig_credentials.py
──────────────────────
Prueba masiva de credenciales Instagram para todos los clientes de ContentFlow.
Lee clients_credentials.json, filtra los de plataforma IG y comprueba si el
login funciona, necesita 2FA/checkpoint, o las credenciales son incorrectas.

Genera:
    - ig_test_results.json    → resultados en crudo
    - ig_test_report.html     → informe visual para abrir en el navegador

Uso:
    python3 test_ig_credentials.py                   # prueba todos los clientes IG
    python3 test_ig_credentials.py --limit 5         # solo los primeros 5
    python3 test_ig_credentials.py --client acaymo-delgado-higuero
    python3 test_ig_credentials.py --resume          # salta los ya probados
    python3 test_ig_credentials.py --headless        # modo headless (más rápido)

Requisitos (ya en FlowAPP):
    pip install playwright --break-system-packages
    playwright install chromium
"""

import asyncio
import argparse
import json
import os
import sys
import time
from pathlib import Path
from datetime import datetime
from collections import Counter

from playwright.async_api import async_playwright, TimeoutError as PWTimeout

# ── Paths ─────────────────────────────────────────────────────────────────────
BASE_DIR        = Path(__file__).parent
CREDS_FILE      = BASE_DIR / "clients_credentials.json"
RESULTS_FILE    = BASE_DIR / "ig_test_results.json"
REPORT_FILE     = BASE_DIR / "ig_test_report.html"
SCREENSHOTS_DIR = BASE_DIR / "ig_test_screenshots"
SCREENSHOTS_DIR.mkdir(exist_ok=True)

# ── Status codes ──────────────────────────────────────────────────────────────
STATUS_OK      = "ok"
STATUS_2FA     = "needs_2fa"
STATUS_WRONG   = "wrong_creds"
STATUS_BLOCKED = "blocked"
STATUS_ERROR   = "error"

WINDOW_W   = 1280
WINDOW_H   = 800
USER_AGENT = (
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) '
    'AppleWebKit/537.36 (KHTML, like Gecko) '
    'Chrome/124.0.0.0 Safari/537.36'
)


async def test_one_account(username: str, password: str, client_id: str,
                           headless: bool = False) -> dict:
    result = {
        "client_id": client_id,
        "username": username,
        "status": STATUS_ERROR,
        "url_after_login": "",
        "note": "",
        "screenshot": "",
        "tested_at": datetime.utcnow().isoformat()
    }

    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(
                headless=headless,
                args=[
                    f'--window-size={WINDOW_W},{WINDOW_H}',
                    '--disable-blink-features=AutomationControlled',
                    '--no-sandbox',
                ]
            )
            context = await browser.new_context(
                viewport={'width': WINDOW_W, 'height': WINDOW_H},
                user_agent=USER_AGENT,
                locale='es-ES',
            )
            page = await context.new_page()

            await page.add_init_script("""
                Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
                Object.defineProperty(navigator, 'plugins',   { get: () => [1,2,3] });
            """)

            # 1. Ir a Instagram
            await page.goto('https://www.instagram.com/', wait_until='domcontentloaded', timeout=20000)
            await page.wait_for_timeout(2000)

            # 2. Aceptar cookies
            for txt in ['Allow all cookies', 'Permitir todas las cookies', 'Accept All', 'Aceptar todo']:
                try:
                    btn = page.locator(f'button:has-text("{txt}")').first
                    if await btn.is_visible(timeout=2000):
                        await btn.click()
                        await page.wait_for_timeout(800)
                        break
                except PWTimeout:
                    pass

            # 3. Login
            try:
                await page.fill('input[name="username"]', username, timeout=10000)
                await page.fill('input[name="password"]', password)
                await page.click('button[type="submit"]')
                await page.wait_for_timeout(5000)
            except PWTimeout:
                result["note"] = "Formulario de login no encontrado (puede ser bloqueo o cambio de UI)"
                shot = f"{client_id}_error.png"
                try:
                    await page.screenshot(path=str(SCREENSHOTS_DIR / shot))
                    result["screenshot"] = shot
                except Exception:
                    pass
                await browser.close()
                return result

            # 4. Analizar resultado
            url = page.url
            result["url_after_login"] = url

            shot = f"{client_id}_result.png"
            try:
                await page.screenshot(path=str(SCREENSHOTS_DIR / shot), full_page=False)
                result["screenshot"] = shot
            except Exception:
                pass

            if any(x in url for x in ['challenge', 'two_factor', 'verify', 'checkpoint']):
                result["status"] = STATUS_2FA
                result["note"]   = "Checkpoint / 2FA requerido"

            elif 'accounts/login' in url or 'accounts/suspended' in url:
                try:
                    err = await page.locator(
                        '#slfErrorAlert, [role="alert"], p:has-text("password"), '
                        'p:has-text("contraseña"), p:has-text("Sorry"), p:has-text("Lo sentimos")'
                    ).first.inner_text(timeout=3000)
                    result["note"] = err[:200]
                except Exception:
                    result["note"] = "Credenciales incorrectas o cuenta no encontrada"
                result["status"] = STATUS_WRONG

            elif any(x in url for x in ['help', 'disabled', 'suspended', 'unusual_activity']):
                result["status"] = STATUS_BLOCKED
                result["note"]   = "Cuenta bloqueada o actividad inusual"

            elif 'instagram.com' in url:
                result["status"] = STATUS_OK
                result["note"]   = "Login correcto ✓"

            else:
                result["status"] = STATUS_ERROR
                result["note"]   = f"URL inesperada: {url[:120]}"

            await browser.close()

    except Exception as e:
        result["status"] = STATUS_ERROR
        result["note"]   = str(e)[:200]

    return result


def build_html_report(results: list, total_elapsed: float) -> str:
    c = Counter(r["status"] for r in results)
    rows = ""
    for r in results:
        st = r["status"]
        icon  = {"ok":"✅","needs_2fa":"⚠️","wrong_creds":"❌","blocked":"🚫","error":"🔴"}.get(st,"❓")
        color = {"ok":"#d4edda","needs_2fa":"#fff3cd","wrong_creds":"#f8d7da",
                 "blocked":"#e8d5f5","error":"#f8d7da"}.get(st,"#fff")
        shot_html = (f'<a href="ig_test_screenshots/{r["screenshot"]}" target="_blank">📸</a>'
                     if r.get("screenshot") else "")
        rows += f"""
        <tr style="background:{color}">
          <td><code>{r['client_id']}</code></td>
          <td><b>@{r['username']}</b></td>
          <td style="font-size:1.3em;text-align:center">{icon}</td>
          <td><b>{st}</b></td>
          <td style="font-size:.85em;color:#555">{r.get('note','')}</td>
          <td style="text-align:center">{shot_html}</td>
        </tr>"""

    ts = datetime.now().strftime('%d/%m/%Y %H:%M')
    mins = total_elapsed / 60
    return f"""<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Instagram Credential Test — ContentFlow</title>
<style>
  body{{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin:0;padding:20px;background:#f5f5f5}}
  h1{{color:#262626;margin-bottom:4px}}
  .meta{{color:#8e8e8e;font-size:.9em;margin-bottom:20px}}
  .summary{{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:24px}}
  .card{{background:white;border-radius:10px;padding:16px 24px;box-shadow:0 1px 3px rgba(0,0,0,.12);min-width:110px;text-align:center}}
  .card .num{{font-size:2em;font-weight:700}}
  .card .lbl{{font-size:.8em;color:#8e8e8e;margin-top:2px}}
  table{{width:100%;border-collapse:collapse;background:white;border-radius:10px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.12)}}
  th{{background:#262626;color:white;padding:10px 14px;text-align:left;font-size:.85em;text-transform:uppercase;letter-spacing:.05em}}
  td{{padding:9px 14px;border-bottom:1px solid #f0f0f0;vertical-align:middle}}
  tr:last-child td{{border-bottom:none}}
  code{{background:#f0f0f0;padding:2px 5px;border-radius:4px;font-size:.85em}}
</style></head>
<body>
<h1>🔑 Instagram Credential Test</h1>
<p class="meta">Generado: {ts} &nbsp;·&nbsp; {len(results)} cuentas &nbsp;·&nbsp; {mins:.1f} min</p>
<div class="summary">
  <div class="card"><div class="num" style="color:#198754">{c.get(STATUS_OK,0)}</div><div class="lbl">✅ OK</div></div>
  <div class="card"><div class="num" style="color:#ffc107">{c.get(STATUS_2FA,0)}</div><div class="lbl">⚠️ Necesita 2FA</div></div>
  <div class="card"><div class="num" style="color:#dc3545">{c.get(STATUS_WRONG,0)}</div><div class="lbl">❌ Creds. incorrectas</div></div>
  <div class="card"><div class="num" style="color:#6f42c1">{c.get(STATUS_BLOCKED,0)}</div><div class="lbl">🚫 Bloqueada</div></div>
  <div class="card"><div class="num" style="color:#dc3545">{c.get(STATUS_ERROR,0)}</div><div class="lbl">🔴 Error</div></div>
  <div class="card"><div class="num" style="color:#262626">{len(results)}</div><div class="lbl">Total</div></div>
</div>
<table>
  <thead><tr><th>Cliente</th><th>Usuario</th><th></th><th>Estado</th><th>Nota</th><th>📸</th></tr></thead>
  <tbody>{rows}</tbody>
</table>
</body></html>"""


async def main():
    parser = argparse.ArgumentParser(description="Prueba masiva de credenciales Instagram")
    parser.add_argument("--client",   help="Probar solo un cliente (slug)")
    parser.add_argument("--limit",    type=int, default=0, help="Limitar a N clientes")
    parser.add_argument("--resume",   action="store_true", help="Saltar clientes ya probados")
    parser.add_argument("--headless", action="store_true", help="Modo headless")
    parser.add_argument("--delay",    type=float, default=3.0, help="Segundos entre pruebas (def: 3)")
    args = parser.parse_args()

    if not CREDS_FILE.exists():
        print(f"❌ No se encuentra {CREDS_FILE}")
        sys.exit(1)

    with open(CREDS_FILE, encoding='utf-8') as f:
        all_creds = json.load(f)

    ig_clients = {k: v for k, v in all_creds.items()
                  if v.get("platform", "").upper() == "IG"}

    if args.client:
        if args.client not in ig_clients:
            print(f"❌ Cliente '{args.client}' no encontrado o no es IG")
            sys.exit(1)
        ig_clients = {args.client: ig_clients[args.client]}

    previous = {}
    if args.resume and RESULTS_FILE.exists():
        with open(RESULTS_FILE, encoding='utf-8') as f:
            prev_list = json.load(f)
        previous = {r["client_id"]: r for r in prev_list}
        print(f"ℹ️  --resume: {len(previous)} ya probados")

    to_test = [(cid, creds) for cid, creds in sorted(ig_clients.items())
               if cid not in previous]
    if args.limit:
        to_test = to_test[:args.limit]

    print(f"\n📋 Cuentas IG: {len(ig_clients)} total · {len(to_test)} a probar · {len(previous)} ya hechas")
    print(f"   Modo: {'HEADLESS' if args.headless else 'VISIBLE'} · Delay: {args.delay}s\n")

    results   = list(previous.values())
    t_start   = time.time()

    for idx, (client_id, creds) in enumerate(to_test, 1):
        username = creds.get("username", "")
        password = creds.get("password", "")
        print(f"[{idx:02d}/{len(to_test):02d}] @{username:<30} ({client_id})", end="", flush=True)
        t0 = time.time()

        r = await test_one_account(username, password, client_id, headless=args.headless)
        elapsed = time.time() - t0

        icon = {"ok":"✅","needs_2fa":"⚠️ 2FA","wrong_creds":"❌","blocked":"🚫","error":"🔴"}.get(r["status"],"?")
        print(f"  {icon}  ({elapsed:.1f}s)  {r['note'][:60]}")

        results.append(r)
        with open(RESULTS_FILE, 'w', encoding='utf-8') as f:
            json.dump(results, f, ensure_ascii=False, indent=2)

        if idx < len(to_test):
            await asyncio.sleep(args.delay)

    total_elapsed = time.time() - t_start
    counter = Counter(r["status"] for r in results)

    print(f"\n{'═'*55}")
    print(f"  RESULTADOS ({len(results)} cuentas · {total_elapsed/60:.1f} min)")
    print(f"  ✅ OK              : {counter.get(STATUS_OK,0)}")
    print(f"  ⚠️  Necesita 2FA   : {counter.get(STATUS_2FA,0)}")
    print(f"  ❌ Creds incorrectas: {counter.get(STATUS_WRONG,0)}")
    print(f"  🚫 Bloqueada       : {counter.get(STATUS_BLOCKED,0)}")
    print(f"  🔴 Error técnico   : {counter.get(STATUS_ERROR,0)}")
    print(f"{'═'*55}")

    if counter.get(STATUS_2FA, 0):
        print("\n⚠️  CLIENTES QUE NECESITAN 2FA (ejecutar desde Mac de Sunamis):")
        for r in results:
            if r["status"] == STATUS_2FA:
                print(f"   • @{r['username']:<25}  {r['client_id']}")

    if counter.get(STATUS_WRONG, 0):
        print("\n❌ CREDENCIALES INCORRECTAS (actualizar en ContentFlow):")
        for r in results:
            if r["status"] == STATUS_WRONG:
                print(f"   • @{r['username']:<25}  {r['note'][:80]}")

    html = build_html_report(results, total_elapsed)
    with open(REPORT_FILE, 'w', encoding='utf-8') as f:
        f.write(html)

    print(f"\n📄 Resultados JSON : {RESULTS_FILE.name}")
    print(f"🌐 Informe HTML    : {REPORT_FILE.name}")
    print(f"📸 Screenshots     : {SCREENSHOTS_DIR.name}/\n")


if __name__ == "__main__":
    asyncio.run(main())

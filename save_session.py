#!/usr/bin/env python3
"""
save_session.py
───────────────
Guarda la sesión de Instagram de un cliente para que publisher_server.py
pueda publicar sin pasar por el formulario de login.

Uso:
    python save_session.py                         # te pregunta el cliente
    python save_session.py terafis-bcn             # cliente directo
    python save_session.py crespi-oliver-assessors-sl

Qué hace:
    1. Abre Chrome con Playwright (visible)
    2. Navega a instagram.com — si ya estás logeado, perfecto
    3. Si no, introduce usuario/contraseña y haz login manualmente
    4. Pulsa ENTER aquí cuando estés en el feed
    5. Guarda las cookies en sessions/{cliente}_IG.json

A partir de ese momento, publisher_server.py salta el login automáticamente.
"""

import asyncio, json, sys
from pathlib import Path

SESSIONS_DIR = Path(__file__).parent / "sessions"
SESSIONS_DIR.mkdir(exist_ok=True)

# Lee client_id del argumento o lo pide
if len(sys.argv) > 1:
    client_id = sys.argv[1].strip()
else:
    client_id = input("Client ID (ej: terafis-bcn, crespi-oliver-assessors-sl): ").strip()

if not client_id:
    print("❌ Client ID requerido")
    sys.exit(1)

out_path = SESSIONS_DIR / f"{client_id}_IG.json"


async def main():
    from playwright.async_api import async_playwright
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=False)
        ctx  = await browser.new_context(viewport={'width': 1280, 'height': 900})
        page = await ctx.new_page()

        print(f"\n🌐 Abriendo Instagram para '{client_id}'...")
        await page.goto('https://www.instagram.com/', wait_until='networkidle')

        print("\n👉 Haz login en Instagram si aún no lo has hecho.")
        print("   Cuando veas el feed (el inicio), vuelve aquí y pulsa ENTER.")
        input("\n   [ENTER cuando estés en el feed de Instagram] ")

        # Guardar cookies
        state = await ctx.storage_state()
        with open(out_path, 'w', encoding='utf-8') as f:
            json.dump(state, f)

        await browser.close()

    print(f"\n✅ Sesión guardada en: {out_path}")
    print(f"   ContentFlow publicará como '{client_id}' sin pedir login.")


asyncio.run(main())

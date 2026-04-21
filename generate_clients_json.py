#!/usr/bin/env python3
"""
generate_clients_json.py
────────────────────────
Lee todos los info.txt de la carpeta /Clientes y genera src/clients.json.

Uso:
    python3 generate_clients_json.py

Cuándo ejecutarlo:
    - Al añadir un cliente nuevo a la carpeta
    - Al cambiar datos en un info.txt existente
    - Una vez tras la instalación inicial

El resultado se importa estáticamente en App.tsx y puebla el desplegable.
"""

import os
import re
import json
import unicodedata
from pathlib import Path

# ── Rutas ──────────────────────────────────────────────────────────────────────
SCRIPT_DIR   = Path(__file__).parent
CLIENTES_DIR = SCRIPT_DIR.parent / "Clientes"
OUT_PATH     = SCRIPT_DIR / "src" / "clients.json"


def slugify(text: str) -> str:
    """Convierte un nombre de cliente en un ID URL-safe sin acentos."""
    text = unicodedata.normalize('NFKD', text)
    text = text.encode('ascii', 'ignore').decode('ascii')
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'\s+', '-', text.strip())
    text = re.sub(r'-+', '-', text)
    return text


def extract_field(content: str, key: str) -> str:
    """Extrae el valor de una línea 'Clave: valor' del info.txt."""
    match = re.search(rf'{re.escape(key)}[:\s]+(.+)', content)
    return match.group(1).strip() if match else ''


def parse_platform(raw: str) -> str:
    raw = raw.lower()
    if 'instagram' in raw or raw == 'ig':
        return 'IG'
    if 'linkedin' in raw or 'li' in raw:
        return 'LI'
    return raw.upper() or 'IG'


def parse_info(folder_path: Path) -> dict | None:
    info_path = folder_path / 'info.txt'
    if not info_path.exists():
        return None

    content = info_path.read_text(encoding='utf-8')

    # Nombre del cliente
    name_match = re.search(r'CLIENTE:\s*(.+)', content)
    name = name_match.group(1).strip() if name_match else folder_path.name

    # Notas (bloque multilínea)
    notes_match = re.search(
        r'NOTAS DEL EXCEL:\s*\n(.*?)(?:\n={5,}|\Z)', content, re.DOTALL
    )
    notes = notes_match.group(1).strip() if notes_match else ''

    return {
        'id':          slugify(name),
        'name':        name,
        'platform':    parse_platform(extract_field(content, 'Red Social')),
        'estado':      extract_field(content, 'Estado'),
        'stage':       extract_field(content, 'Stage'),
        'tecnico':     extract_field(content, 'Técnico'),
        'contact':     extract_field(content, 'Contacto'),
        'email':       extract_field(content, 'Email'),
        'profile_url': extract_field(content, 'Perfil social'),
        'folder':      folder_path.name,
        'notes':       notes,
    }


def main():
    if not CLIENTES_DIR.exists():
        print(f"❌ Carpeta no encontrada: {CLIENTES_DIR}")
        return

    clients = []
    errors  = []

    for folder in sorted(CLIENTES_DIR.iterdir()):
        if not folder.is_dir():
            continue
        data = parse_info(folder)
        if data:
            clients.append(data)
        else:
            errors.append(folder.name)

    # Verificar IDs únicos
    ids   = [c['id'] for c in clients]
    dupes = {i for i in ids if ids.count(i) > 1}
    if dupes:
        print(f"⚠️  IDs duplicados detectados: {dupes}")
        print("   Revisa los nombres de esas carpetas.")

    OUT_PATH.write_text(
        json.dumps(clients, ensure_ascii=False, indent=2),
        encoding='utf-8'
    )

    print(f"✅ {len(clients)} clientes → {OUT_PATH}")
    if errors:
        print(f"⚠️  Sin info.txt ({len(errors)} carpetas): {errors[:5]}{'...' if len(errors) > 5 else ''}")


if __name__ == '__main__':
    main()

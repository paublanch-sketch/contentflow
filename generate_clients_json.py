#!/usr/bin/env python3
"""
generate_clients_json.py
Lee info.txt + clients_credentials.xlsx y genera src/clients.json.
Se llama automaticamente desde publisher.py al añadir un cliente.
"""

import re
import json
import unicodedata
from pathlib import Path

SCRIPT_DIR    = Path(__file__).parent
CLIENTES_DIR  = SCRIPT_DIR.parent / "Clientes"
EXCEL_PATH    = SCRIPT_DIR.parent / "Publisher" / "clients_credentials.xlsx"
OUT_PATH      = SCRIPT_DIR / "src" / "clients.json"


def slugify(text):
    text = unicodedata.normalize('NFKD', text)
    text = text.encode('ascii', 'ignore').decode('ascii')
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'\s+', '-', text.strip())
    text = re.sub(r'-+', '-', text)
    return text


def extract_field(content, key):
    match = re.search(rf'{re.escape(key)}[:\s]+(.+)', content)
    return match.group(1).strip() if match else ''


def parse_platform(raw):
    raw = raw.lower()
    if 'instagram' in raw or raw == 'ig':
        return 'IG'
    if 'linkedin' in raw or raw == 'li':
        return 'LI'
    if 'facebook' in raw or raw == 'fb':
        return 'FB'
    return raw.upper() or 'IG'


def parse_info(folder_path):
    info_path = folder_path / 'info.txt'
    if not info_path.exists():
        return None
    content = info_path.read_text(encoding='utf-8')
    name_match = re.search(r'CLIENTE:\s*(.+)', content)
    name = name_match.group(1).strip() if name_match else folder_path.name
    notes_match = re.search(r'NOTAS DEL EXCEL:\s*\n(.*?)(?:\n={5,}|\Z)', content, re.DOTALL)
    notes = notes_match.group(1).strip() if notes_match else ''
    return {
        'id':          slugify(name),
        'name':        name,
        'platform':    parse_platform(extract_field(content, 'Red Social')),
        'estado':      extract_field(content, 'Estado'),
        'stage':       extract_field(content, 'Stage'),
        'tecnico':     extract_field(content, 'Tecnico'),
        'contact':     extract_field(content, 'Contacto'),
        'email':       extract_field(content, 'Email'),
        'profile_url': extract_field(content, 'Perfil social'),
        'folder':      folder_path.name,
        'notes':       notes,
    }


def load_from_excel():
    if not EXCEL_PATH.exists():
        return []
    try:
        import openpyxl
    except ImportError:
        print("  (openpyxl no instalado — saltando Excel)")
        return []

    wb = openpyxl.load_workbook(EXCEL_PATH, read_only=True, data_only=True)
    ws = wb.active
    rows = list(ws.iter_rows(values_only=True))
    if not rows:
        wb.close()
        return []

    headers = [str(h).lower().strip() if h else '' for h in rows[0]]

    def col(row, name):
        if name not in headers:
            return ''
        i = headers.index(name)
        val = row[i] if i < len(row) else None
        s = str(val).strip() if val is not None else ''
        return '' if s in ('None', 'nan', '') else s

    clients = []
    for row in rows[1:]:
        nombre = col(row, 'nombre_empresa')
        if not nombre:
            continue
        clients.append({
            'id':          slugify(nombre),
            'name':        nombre,
            'platform':    parse_platform(col(row, 'red_social')),
            'estado':      '',
            'stage':       '',
            'tecnico':     '',
            'contact':     '',
            'email':       col(row, 'usuario_general'),
            'profile_url': col(row, 'perfil_url'),
            'folder':      '',
            'notes':       col(row, 'notas'),
        })

    wb.close()
    return clients


def main():
    # 1. info.txt folders
    info_clients = []
    if CLIENTES_DIR.exists():
        for folder in sorted(CLIENTES_DIR.iterdir()):
            if not folder.is_dir():
                continue
            data = parse_info(folder)
            if data:
                info_clients.append(data)

    info_ids = {c['id'] for c in info_clients}
    print(f"  info.txt : {len(info_clients)} clientes")

    # 2. Excel
    excel_clients = load_from_excel()
    excel_new = [c for c in excel_clients if c['id'] not in info_ids]
    print(f"  Excel    : {len(excel_clients)} clientes ({len(excel_new)} nuevos sin info.txt)")

    # 3. Merge
    all_clients = info_clients + excel_new
    ids = [c['id'] for c in all_clients]
    dupes = {i for i in ids if ids.count(i) > 1}
    if dupes:
        print(f"  AVISO IDs duplicados: {dupes}")

    # 4. Save
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(all_clients, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f"  TOTAL    : {len(all_clients)} clientes -> {OUT_PATH.name}")


if __name__ == '__main__':
    print("Generando clients.json...")
    main()
    print("Listo.")

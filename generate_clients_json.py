#!/usr/bin/env python3
"""
generate_clients_json.py - Lee info.txt + Excel y genera src/clients.json.
Incluye credenciales de todos los clientes (IG, FB, LI) para mostrar en la web admin.
"""
import re, json, unicodedata
from pathlib import Path

SCRIPT_DIR   = Path(__file__).parent
CLIENTES_DIR = SCRIPT_DIR.parent / "Clientes"
EXCEL_PATH   = SCRIPT_DIR.parent / "Publisher" / "clients_credentials.xlsx"
OUT_PATH     = SCRIPT_DIR / "src" / "clients.json"


def slugify(text):
    text = unicodedata.normalize('NFKD', text)
    text = text.encode('ascii', 'ignore').decode('ascii')
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'\s+', '-', text.strip())
    return re.sub(r'-+', '-', text)


def xfield(content, key):
    m = re.search(rf'{re.escape(key)}[:\s]+(.+)', content)
    return m.group(1).strip() if m else ''


def platform(raw):
    raw = raw.lower()
    if 'instagram' in raw or raw == 'ig': return 'IG'
    if 'linkedin'  in raw or raw == 'li': return 'LI'
    if 'facebook'  in raw or raw == 'fb': return 'FB'
    return raw.upper() or 'IG'


def parse_info(folder_path):
    info_path = folder_path / 'info.txt'
    if not info_path.exists(): return None
    c = info_path.read_text(encoding='utf-8')
    nm = re.search(r'CLIENTE:\s*(.+)', c)
    name = nm.group(1).strip() if nm else folder_path.name
    nnm = re.search(r'NOTAS DEL EXCEL:\s*\n(.*?)(?:\n={5,}|\Z)', c, re.DOTALL)
    notes = nnm.group(1).strip() if nnm else ''
    return dict(
        id=slugify(name), name=name,
        platform=platform(xfield(c, 'Red Social')),
        estado=xfield(c,'Estado'), stage=xfield(c,'Stage'),
        tecnico=xfield(c,'Tecnico'), contact=xfield(c,'Contacto'),
        email=xfield(c,'Email'), profile_url=xfield(c,'Perfil social'),
        folder=folder_path.name, notes=notes,
        ig_username='', ig_password='',
        fb_username='', fb_password='',
        li_username='', li_password='',
    )


def load_excel():
    if not EXCEL_PATH.exists(): return [], {}
    try: import openpyxl
    except ImportError: print("  (sin openpyxl)"); return [], {}

    wb = openpyxl.load_workbook(EXCEL_PATH, read_only=True, data_only=True)
    ws = wb.active
    rows = list(ws.iter_rows(values_only=True))
    if not rows: wb.close(); return [], {}

    hdrs = [str(h).lower().strip().replace('\xe3\xb1','n') if h else '' for h in rows[0]]

    def col(row, *names):
        for name in names:
            # Try exact match and also without accent
            for h in [name, name.replace('ñ','n')]:
                if h in hdrs:
                    i = hdrs.index(h)
                    val = row[i] if i < len(row) else None
                    s = str(val).strip() if val is not None else ''
                    if s and s not in ('None','nan'): return s
        return ''

    clients, creds = [], {}
    for row in rows[1:]:
        nombre = col(row, 'nombre_empresa')
        if not nombre: continue

        red   = col(row, 'red_social')
        ig_u  = col(row, 'usuario_general','usuario_ins')
        ig_p  = col(row, 'contraseña_general','contrasena_general','contraseña_ins','contrasena_ins')
        fb_u  = col(row, 'usuario_fb')
        fb_p  = col(row, 'contraseña_fb','contrasena_fb')
        li_u  = col(row, 'usuario_link')
        li_p  = col(row, 'contraseña_link','contrasena_link')
        perfil= col(row, 'perfil_url')
        notas = col(row, 'notas')

        slug  = slugify(nombre)
        creds[slug] = dict(ig_username=ig_u, ig_password=ig_p,
                           fb_username=fb_u, fb_password=fb_p,
                           li_username=li_u, li_password=li_p)
        clients.append(dict(
            id=slug, name=nombre, platform=platform(red),
            estado='', stage='', tecnico='', contact='',
            email=ig_u, profile_url=perfil, folder='', notes=notas,
            ig_username=ig_u, ig_password=ig_p,
            fb_username=fb_u, fb_password=fb_p,
            li_username=li_u, li_password=li_p,
        ))

    wb.close()
    return clients, creds


def main():
    excel_clients, creds_map = load_excel()
    print(f"  Excel : {len(excel_clients)} clientes")

    info_clients = []
    if CLIENTES_DIR.exists():
        for folder in sorted(CLIENTES_DIR.iterdir()):
            if not folder.is_dir(): continue
            data = parse_info(folder)
            if data:
                cr = creds_map.get(data['id'], {})
                data.update(cr)
                info_clients.append(data)

    info_ids = {c['id'] for c in info_clients}
    print(f"  info.txt : {len(info_clients)} clientes")

    excel_new = [c for c in excel_clients if c['id'] not in info_ids]
    all_clients = info_clients + excel_new
    print(f"  TOTAL : {len(all_clients)} clientes")

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(all_clients, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f"  -> {OUT_PATH.name}")


if __name__ == '__main__':
    print("Generando clients.json...")
    main()
    print("Listo.")

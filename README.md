# ContentFlow · Kit Digital J2 · Akira Computer / Interactivos2025

Sistema de gestió i aprovació de posts de xarxes socials per a la justificació de la Fase 2 del Kit Digital.

---

## 🌐 URLs clau

| Recurs | URL |
|---|---|
| **App admin** | https://contentflow-liard-nine.vercel.app |
| **Portal client** | https://contentflow-liard-nine.vercel.app/p/[slug-client] |
| Supabase Dashboard | https://supabase.com/dashboard/project/afbussamfzqfvozrycsr |
| Supabase SQL Editor | https://supabase.com/dashboard/project/afbussamfzqfvozrycsr/sql |
| Repositori GitHub | https://github.com/paublanch-sketch/contentflow |
| Make.com Escenaris | https://eu1.make.com/1527215/scenarios |

**Exemples d'URL de portal client:**
- Entelsat → https://contentflow-liard-nine.vercel.app/p/entelsat-instalaciones-y-promociones-integrales-slu
- Natalia Gomà → https://contentflow-liard-nine.vercel.app/p/natalia-goma-argilaga

**Nota accés:** L'app admin no té login — accés per URL directa. El portal client és públic per URL (seguretat per obscuritat). La URL del portal apareix a la navbar admin amb el botó "🔗 Enllaç client".

---

## 🔄 Flux de treball complet

```
1. Pau demana posts per a un client a Claude
       ↓
2. Claude llegeix /Clientes/[NOM_CLIENT]/info.txt + sociales.txt
       ↓
3. Claude genera 12 posts únics (sense repetir temes del sociales.txt)
       ↓
4. Claude lliura fitxer SQL  →  Pau l'executa al Supabase SQL Editor
       ↓
5. Posts apareixen a l'app immediatament (status: 'review')
       ↓
6. Pau envia la URL del portal al client per WhatsApp / email
       ↓
7. Client obre la URL, veu els posts i fa clic a "Aprovar" o "Cambios"
       ↓
8. Pau veu els aprovats al panel admin i clica "Publicar a Metricool"
       ↓
9. Webhook Make.com rep les dades → publica a Metricool → xarxa social
```

---

## 📁 Estructura de carpetes

```
AutoRedesSociales/
├── FlowAPP/                        ← App React + scripts Python
│   ├── src/
│   │   ├── App.tsx                 ← App principal (admin + portal client)
│   │   ├── ApprovalWall.tsx        ← Mur d'aprovació
│   │   └── clients.json            ← Llista de clients (auto-generat)
│   ├── supabase_schema.sql         ← Schema BD (executar 1 cop)
│   ├── generate_clients_json.py    ← Regenera clients.json des d'info.txt
│   ├── instagram_publisher.py      ← Auto-publicació Instagram via Playwright
│   └── clients_credentials.json   ← Credencials (LOCAL, mai a GitHub!)
│
└── Clientes/                       ← Carpeta de clients
    └── [NOM CLIENT]/
        ├── info.txt                ← Dades del client (obligatori)
        ├── sociales.txt            ← Historial de posts (per no repetir)
        ├── seo.txt                 ← Keywords SEO (opcional)
        └── brief.txt               ← Brief de productes/serveis (opcional)
```

---

## 🗄️ Supabase

**Credencials de connexió:**
```
URL:  https://afbussamfzqfvozrycsr.supabase.co
KEY:  sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg
```

**Taula `posts` — camps:**
| Camp | Tipus | Descripció |
|---|---|---|
| id | TEXT | `[slug-client]-[1..12]` |
| client_id | TEXT | Slug del client |
| post_number | INT | 1 a 12 |
| platform | TEXT | `IG` o `LI` |
| headline_visual | TEXT | Idea de la imatge / disseny |
| visual_prompt | TEXT | Prompt per IA (Midjourney / DALL-E) |
| copy | TEXT | Text del post |
| hashtags | TEXT[] | Array de hashtags |
| status | TEXT | `review` → `approved` → `scheduling` → `scheduled` |
| feedback | TEXT | Comentari del client si demana canvis |
| image_url | TEXT | URL pública (Supabase Storage) |
| webhook_sent_at | TIMESTAMPTZ | Quan s'ha enviat a Metricool |

**Status flow:**
```
review  →  approved  →  scheduling  →  scheduled
  (client aprova)   (Pau clica publicar)  (enviat a Metricool ✓)
          ↘  changes  (client demana canvis)
```

---

## ➕ Afegir posts per a un client

### Pas 1 — Generar posts (Claude)
Demana a Claude: *"genera els 12 posts per a [NOM CLIENT]"*

Claude llegeix la carpeta i genera un fitxer `.sql`.

### Pas 2 — Executar SQL a Supabase
1. Obre https://supabase.com/dashboard/project/afbussamfzqfvozrycsr/sql
2. Pega el SQL generat
3. Clic a **Run**

### Pas 3 — Enviar URL al client
```
Hola [NOM],

Aquí tens els teus 12 posts per revisar i aprovar:
👉 https://contentflow-liard-nine.vercel.app/p/[slug-client]

Revisa'ls i marca cada un com "Aprovat" o "Canvis" directament a la web.
Gràcies!
```

---

## 📲 Auto-publicació Instagram (Playwright local)

```bash
# Publicar tots els aprovats d'un client
python3 instagram_publisher.py --client [slug-client]

# Publicar un post concret
python3 instagram_publisher.py --post-id [slug-client]-3

# Dry-run (simula sense publicar, fa screenshot)
python3 instagram_publisher.py --client [slug-client] --dry-run
```

**Requisits:**
```bash
pip install playwright supabase
playwright install chromium
```

⚠️ El script **sempre demana confirmació manual** ("SI") abans de publicar.

---

## 🔄 Regenerar clients.json

Quan s'afegeix un client o es canvia un info.txt:

```bash
cd FlowAPP
python3 generate_clients_json.py
git add src/clients.json
git commit -m "update clients"
git push
```

Vercel redesplega automàticament en 1-2 minuts.

---

## 🔔 Notificacions Make.com

Quan un client aprova o demana canvis en un post, Make.com envia un email a pau.blanch@interactivos.net.

| Escenari | URL webhook | Estat |
|---|---|---|
| ContentFlow Notificació Aprovació | https://hook.eu1.make.com/qlmec519xrgc86oslwykvgsblxfxqr4l | ✅ Actiu |
| Metricool Publisher | https://hook.eu1.make.com/owpgy88g47ibpstoqt8ktmsg9pek9cs9 | ✅ Actiu |

**Assumpte de l'email:** `ContentFlow · [tipus] · [client] · Post #[número]`

---

## 🎨 Interfície

- **Admin** (https://contentflow-liard-nine.vercel.app) → **Dark theme** (fons negre). Label: "Interactivos2025". Botó "🔗 Enllaç client" a la navbar per copiar l'URL del portal.
- **Portal client** (/p/[slug]) → Blanc/normal. Ideal per enviar al client per WhatsApp/email.

---

## 🔐 Seguretat

- `clients_credentials.json` → **mai a GitHub** (gitignored)
- Conté les credencials d'Instagram/LinkedIn de tots els clients
- Mantenir còpia de seguretat local
- Portal client: accés per URL (sense login). Acceptable per a aprovació de posts J2.

---

## 🛠️ Stack tècnic

| Capa | Tecnologia |
|---|---|
| Frontend | React + TypeScript + Tailwind (Vite) |
| Hosting | Vercel (auto-deploy des de GitHub `main`) |
| Base de dades | Supabase (PostgreSQL) |
| Imatges | Supabase Storage (`post-images` bucket, públic) |
| Auto-publicació | Playwright Python (local, 0€) |
| Scheduling | Make.com webhook → Metricool |

---

## ⚠️ Git push bloquejat — com solucionar-ho

Si `git push` falla per `index.lock`, executa des de la terminal:

```bash
cd ~/[ruta]/AutoRedesSociales/FlowAPP
rm .git/index.lock
git add src/App.tsx src/ApprovalWall.tsx
git commit -m "Dark theme admin, Interactivos2025, portal link, Make notify URL"
git push
```

Vercel redesplega automàticament en 1-2 minuts.

---

## 📋 Clients amb posts generats

- ✅ ENTELSAT INSTALACIONES Y PROMOCIONES INTEGRALES SLU → https://contentflow-liard-nine.vercel.app/p/entelsat-instalaciones-y-promociones-integrales-slu
- ✅ NATALIA GOMÁ ARGILAGA → https://contentflow-liard-nine.vercel.app/p/natalia-goma-argilaga
- ⏳ 96 clients pendents (veure PENDENTS_J2.md per prioritats)

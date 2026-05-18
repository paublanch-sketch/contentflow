#!/bin/bash
# IgTestSunamis.command
# Doble click para ejecutar — no escribir nada
# Prueba credenciales IG desde la IP de este Mac y guarda sesiones en Supabase

cd "$(dirname "$0")"

echo "🔑 IG Credential Test — Iniciando..."
echo ""

# Instalar requests si no está
pip3 install requests --quiet --break-system-packages 2>/dev/null || \
pip3 install requests --quiet 2>/dev/null || \
python3 -m pip install requests --quiet 2>/dev/null

python3 run_ig_test_local.py

echo ""
echo "✅ Finalizado. Puedes cerrar esta ventana."
read -p "Pulsa Enter para cerrar..."

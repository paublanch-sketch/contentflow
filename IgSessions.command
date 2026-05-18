#!/bin/bash
# IgSessions.command
# Doble click para ejecutar en Mac
# Lee sesiones de Instagram del perfil de Chrome y las guarda en Supabase

cd "$(dirname "$0")"

echo "================================================"
echo "  Instagram Session Extractor — Sunamis Mac"
echo "================================================"
echo ""
echo "⚠️  IMPORTANTE: Cierra Google Chrome completamente antes de continuar."
echo "   (Chrome tiene que estar cerrado para poder leer el perfil)"
echo ""
read -p "¿Chrome cerrado? Pulsa Enter para continuar..."
echo ""

echo "📦 Instalando dependencias..."
pip3 install playwright requests --quiet --break-system-packages 2>/dev/null || \
pip3 install playwright requests --quiet 2>/dev/null || \
python3 -m pip install playwright requests --quiet 2>/dev/null

echo ""
echo "🚀 Iniciando extracción de sesiones..."
echo ""

python3 ig_save_sessions.py

echo ""
echo "✅ Proceso finalizado. Revisa el archivo ig_sessions_*.csv para el resumen."
echo ""
read -p "Pulsa Enter para cerrar..."

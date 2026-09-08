#!/bin/bash

# Script de limpeza e verificação para GitHub Pages

echo "🧹 Limpando arquivos desnecessários..."

# Remover arquivos de lock antigos
rm -f package-lock.json yarn.lock pnpm-lock.yaml

# Remover node_modules
rm -rf node_modules

# Remover build antigo
rm -rf dist .vite

# Remover arquivos do Grok Build que possam ter sobrado
rm -rf .vercel screenshots terminals
rm -f startup.sh

echo "✅ Limpeza concluída!"
echo ""
echo "📦 Próximos passos:"
echo "1. npm install"
echo "2. npm run dev (para testar)"
echo "3. npm run build (para verificar build)"
echo ""
echo "📖 Leia SETUP.md para instruções completas de deploy no GitHub Pages"

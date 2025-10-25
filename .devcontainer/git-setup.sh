#!/bin/bash

# Script para verificar e configurar Git no DevContainer

echo "Verificando instalação do Git..."
git --version

echo ""
echo "Git está instalado e pronto para uso!"
echo ""

# Verificar se há configuração global
if git config --global user.name > /dev/null 2>&1; then
    echo "Configuração Git encontrada:"
    echo "  Nome: $(git config --global user.name)"
    echo "  Email: $(git config --global user.email)"
else
    echo "Nenhuma configuração Git encontrada."
    echo "Para configurar, execute:"
    echo "  git config --global user.name \"Seu Nome\""
    echo "  git config --global user.email \"seu@email.com\""
fi

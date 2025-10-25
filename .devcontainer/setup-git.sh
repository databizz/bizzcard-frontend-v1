#!/bin/bash
# Script de setup automático para Git e SSH no DevContainer
# Este script é executado automaticamente quando o container é criado

set -e

echo "🚀 Configurando Git e SSH no DevContainer..."

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Criar diretório .ssh se não existir
if [ ! -d "$HOME/.ssh" ]; then
    echo -e "${YELLOW}📁 Criando diretório .ssh...${NC}"
    mkdir -p "$HOME/.ssh"
    chmod 700 "$HOME/.ssh"
fi

# Configurar Git user e email se não estiverem configurados
if [ -z "$(git config --global user.name)" ]; then
    echo -e "${YELLOW}⚙️  Configurando Git user...${NC}"
    git config --global user.name "Eudes Cavalcanti"
    git config --global user.email "nome@empresa.com"
    echo -e "${GREEN}✅ Git configurado com sucesso!${NC}"
else
    echo -e "${GREEN}✅ Git já está configurado${NC}"
    echo "   Nome: $(git config --global user.name)"
    echo "   Email: $(git config --global user.email)"
fi

# Verificar se já existe chave SSH
if [ ! -f "$HOME/.ssh/id_ed25519" ]; then
    echo -e "${RED}❌ Chave SSH não encontrada!${NC}"
    echo ""
    echo -e "${YELLOW}Para configurar o SSH:${NC}"
    echo "1. Gere uma chave SSH:"
    echo "   ssh-keygen -t ed25519 -C 'nome@empresa.com'"
    echo ""
    echo "2. Inicie o SSH agent e adicione a chave:"
    echo "   eval \"\$(ssh-agent -s)\""
    echo "   ssh-add ~/.ssh/id_ed25519"
    echo ""
    echo "3. Copie a chave pública e adicione no GitHub:"
    echo "   cat ~/.ssh/id_ed25519.pub"
    echo "   Depois vá em: https://github.com/settings/keys"
    echo ""
    echo "4. Teste a conexão:"
    echo "   ssh -T git@github.com"
    echo ""
else
    echo -e "${GREEN}✅ Chave SSH encontrada${NC}"

    # Iniciar SSH agent se não estiver rodando
    if [ -z "$SSH_AUTH_SOCK" ]; then
        echo -e "${YELLOW}🔑 Iniciando SSH agent...${NC}"
        eval "$(ssh-agent -s)" > /dev/null
    fi

    # Adicionar chave ao agent se não estiver adicionada
    if ! ssh-add -l | grep -q "$(ssh-keygen -lf ~/.ssh/id_ed25519 2>/dev/null | awk '{print $2}')"; then
        echo -e "${YELLOW}🔐 Adicionando chave SSH ao agent...${NC}"
        ssh-add ~/.ssh/id_ed25519 2>/dev/null || echo -e "${YELLOW}⚠️  Nota: Chave pode precisar de senha${NC}"
    fi

    # Testar conexão com GitHub
    echo -e "${YELLOW}🔍 Testando conexão com GitHub...${NC}"
    if ssh -T git@github.com -o StrictHostKeyChecking=accept-new 2>&1 | grep -q "successfully authenticated"; then
        echo -e "${GREEN}✅ GitHub SSH funcionando!${NC}"
    else
        echo -e "${RED}❌ Não foi possível conectar ao GitHub${NC}"
        echo -e "${YELLOW}💡 Execute: ssh -T git@github.com${NC}"
    fi
fi

echo ""
echo -e "${GREEN}🎉 Setup concluído!${NC}"
echo ""

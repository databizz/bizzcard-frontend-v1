# DevContainer - Guia de Configuração

## 🎯 O que foi configurado

Este DevContainer está configurado para **persistir automaticamente** suas chaves SSH e configurações Git entre recriações do container.

### Funcionalidades

- ✅ **SSH persistente**: Chaves SSH são mantidas em um Docker Volume
- ✅ **Git pré-configurado**: User e email configurados automaticamente
- ✅ **SSH Agent automático**: Inicia e carrega chaves automaticamente
- ✅ **GitHub CLI**: Ferramenta `gh` instalada
- ✅ **Zsh + Oh My Zsh**: Terminal melhorado

---

## 🚀 Como Usar (Primeira Vez)

### 1. Rebuild do Container

```bash
# No VS Code, pressione:
Cmd + Shift + P  (ou F1)

# Selecione:
"Dev Containers: Rebuild Container"
```

### 2. Aguarde o Setup Automático

O script `.devcontainer/setup-git.sh` será executado automaticamente e:

- ✅ Configurará o Git com seu nome e email
- ⚠️ Informará se precisa criar chave SSH

### 3. Configurar SSH (Apenas na Primeira Vez)

Se você ainda não tem chave SSH, execute:

```bash
# 1. Gerar chave SSH
ssh-keygen -t ed25519 -C "nome@empresa.com"
# Pressione Enter 3x (usa padrões e sem senha)

# 2. Iniciar SSH agent e adicionar chave
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# 3. Copiar chave pública
cat ~/.ssh/id_ed25519.pub
# Copie o output completo

# 4. Adicionar no GitHub
# Vá em: https://github.com/settings/keys
# Clique em "New SSH key"
# Cole a chave e salve

# 5. Testar conexão
ssh -T git@github.com
# Deve mostrar: "Hi [seu-usuario]! You've successfully authenticated"
```

### 4. Fazer Push/Pull

```bash
# Verificar configuração
git remote -v

# Fazer push
git add .
git commit -m "sua mensagem"
git push
```

---

## 🔄 Como Funciona a Persistência

### Volume Docker

As chaves SSH ficam em um **Docker Volume** chamado `bizzsign-ssh-volume`:

```json
"mounts": [
  "source=bizzsign-ssh-volume,target=/home/node/.ssh,type=volume"
]
```

**Isso significa:**

- ✅ Chaves SSH sobrevivem a `Rebuild Container`
- ✅ Chaves SSH sobrevivem a stop/start do container
- ❌ Chaves SSH NÃO ficam no seu computador host (segurança)
- ❌ Se deletar o volume Docker, perde as chaves

### Git Config

A configuração Git está no script `setup-git.sh`:

```bash
git config --global user.name "Eudes Cavalcanti"
git config --global user.email "nome@empresa.com"
```

Para mudar, edite o arquivo `.devcontainer/setup-git.sh` e faça rebuild.

---

## 🛠️ Comandos Úteis

### Ver Status das Chaves SSH

```bash
# Verificar se chave existe
ls -la ~/.ssh/

# Ver chaves carregadas no agent
ssh-add -l

# Testar conexão GitHub
ssh -T git@github.com
```

### Gerenciar Volume SSH

```bash
# Ver volumes Docker
docker volume ls | grep bizzsign-ssh

# Inspecionar volume
docker volume inspect bizzsign-ssh-volume

# CUIDADO: Deletar volume (perde chaves!)
# docker volume rm bizzsign-ssh-volume
```

### Git Config

```bash
# Ver configuração atual
git config --global --list

# Mudar user/email manualmente (temporário)
git config --global user.name "Outro Nome"
git config --global user.email "outro@email.com"
```

---

## 🐛 Troubleshooting

### Problema: "Permission denied" ao executar eval "$(ssh-agent -s)"

**Causa:** Permissões incorretas no diretório `.ssh`

**Solução:** O container agora corrige automaticamente as permissões no `postCreateCommand`. Se ainda tiver problemas após rebuild:

```bash
sudo chown -R node:node ~/.ssh
sudo chmod 700 ~/.ssh
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### Problema: "Permission denied (publickey)"

**Causa:** SSH agent não carregou a chave

**Solução:**

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
ssh -T git@github.com
```

### Problema: "Could not read from remote repository"

**Causa:** Remote não está configurado como SSH

**Solução:**

```bash
# Ver remotes atuais
git remote -v

# Se estiver usando HTTPS, mudar para SSH
git remote set-url origin git@github.com:databizz/bizzsign-frontend-v1.git
```

### Problema: Perdeu as chaves SSH

**Causa:** Volume Docker foi deletado

**Solução:**
Siga novamente o passo 3 do "Como Usar (Primeira Vez)"

### Problema: Script setup não roda

**Causa:** Script não tem permissão de execução

**Solução:**

```bash
chmod +x .devcontainer/setup-git.sh
```

---

## 📝 Arquivos Importantes

```
.devcontainer/
├── Dockerfile              # Define imagem base com ferramentas
├── devcontainer.json       # Configuração do DevContainer
├── setup-git.sh           # Script de inicialização automática
└── README.md              # Este arquivo
```

---

## 🔒 Segurança

### Boas Práticas

✅ **Recomendado:**

- Usar SSH keys sem senha para desenvolvimento local
- Chaves ficam apenas no volume Docker (não no host)
- GitHub tem acesso via SSH keys (não senha)

⚠️ **Importante:**

- NÃO commite chaves SSH no repositório
- NÃO compartilhe suas chaves privadas
- Se perder acesso ao container, pode precisar criar novas chaves

### Onde Ficam os Dados

| Dado         | Localização                | Persiste?                     |
| ------------ | -------------------------- | ----------------------------- |
| Código       | `/workspace` (bind mount)  | ✅ Sim (seu computador)       |
| SSH Keys     | `/home/node/.ssh` (volume) | ✅ Sim (Docker volume)        |
| Git Config   | `/home/node/.gitconfig`    | ❌ Não (recriado pelo script) |
| node_modules | `/workspace/node_modules`  | ✅ Sim (seu computador)       |

---

## 💡 Dicas Avançadas

### Usar GitHub CLI (gh)

```bash
# Login no GitHub
gh auth login

# Criar repositório
gh repo create

# Ver issues
gh issue list

# Criar PR
gh pr create
```

### SSH Config Personalizado

Criar `~/.ssh/config`:

```bash
cat > ~/.ssh/config << 'EOF'
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes
EOF

chmod 600 ~/.ssh/config
```

---

## 🆘 Suporte

Se encontrar problemas:

1. Verifique os logs do script: `bash .devcontainer/setup-git.sh`
2. Consulte a seção Troubleshooting acima
3. Abra uma issue no repositório

---

**Configurado por:** Claude Code
**Última atualização:** Outubro 2025

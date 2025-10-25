# Guia: Configuração SSH para GitHub

Este guia mostra como configurar SSH para fazer push/pull no GitHub de forma segura.

## Pré-requisitos

O ambiente de desenvolvimento já vem com `openssh-client` e `git` instalados.

## Passo 1: Gerar Chave SSH

Execute o seguinte comando no terminal:

```bash
ssh-keygen -t ed25519 -C "seu.email@exemplo.com"
```

**Importante:**
- Substitua `seu.email@exemplo.com` pelo email da sua conta GitHub
- Quando perguntar onde salvar, pressione **Enter** (usa o local padrão: `~/.ssh/id_ed25519`)
- Quando pedir uma senha (passphrase), você pode:
  - Deixar em branco (apenas pressione Enter) para não ter senha
  - OU criar uma senha forte para mais segurança

### Alternativa (chave RSA mais antiga)

Se preferir usar RSA (compatível com sistemas mais antigos):

```bash
ssh-keygen -t rsa -b 4096 -C "seu.email@exemplo.com"
```

## Passo 2: Iniciar o SSH Agent

```bash
eval "$(ssh-agent -s)"
```

Você verá algo como: `Agent pid 12345`

## Passo 3: Adicionar sua chave ao SSH Agent

```bash
ssh-add ~/.ssh/id_ed25519
```

Se usou RSA, use:
```bash
ssh-add ~/.ssh/id_rsa
```

## Passo 4: Copiar a Chave Pública

Copie o conteúdo da sua chave pública:

```bash
cat ~/.ssh/id_ed25519.pub
```

Ou se usou RSA:
```bash
cat ~/.ssh/id_rsa.pub
```

Você verá algo como:
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJl3dIeudNqd0DPMRD6OIh65tjkxFNOtwGcWB2gCgPhk seu.email@exemplo.com
```

**Copie todo o conteúdo** (desde `ssh-ed25519` até o final)

## Passo 5: Adicionar a Chave no GitHub

1. Vá para GitHub: https://github.com/settings/keys
2. Clique em **"New SSH key"**
3. **Title:** Dê um nome descritivo (ex: "DevContainer - Projeto Email Signature")
4. **Key type:** Authentication Key
5. **Key:** Cole a chave pública que você copiou no Passo 4
6. Clique em **"Add SSH key"**
7. Confirme com sua senha do GitHub se solicitado

## Passo 6: Testar a Conexão

```bash
ssh -T git@github.com
```

Na primeira vez, você verá:
```
The authenticity of host 'github.com (IP)' can't be established.
ED25519 key fingerprint is SHA256:...
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

Digite `yes` e pressione Enter.

Se tudo estiver correto, você verá:
```
Hi seu-usuario! You've successfully authenticated, but GitHub does not provide shell access.
```

✅ **Sucesso!** Sua chave SSH está configurada corretamente!

## Passo 7: Criar Repositório no GitHub

### Opção A: Criar novo repositório vazio no GitHub

1. Vá para: https://github.com/new
2. **Repository name:** `email-signature-generator` (ou o nome que preferir)
3. **Description:** "Professional email signature generator with multiple templates"
4. Escolha **Public** ou **Private**
5. **NÃO** marque "Initialize with README" (já temos código local)
6. Clique em **"Create repository"**

### Opção B: Usar GitHub CLI (gh)

```bash
# Login no GitHub CLI (primeira vez)
gh auth login

# Criar repositório público
gh repo create email-signature-generator --public --source=. --remote=origin --push

# OU criar repositório privado
gh repo create email-signature-generator --private --source=. --remote=origin --push
```

## Passo 8: Adicionar Remote e Fazer Push

### Se criou pelo site (Opção A):

Depois de criar o repositório no GitHub, você verá a URL SSH do tipo:
```
git@github.com:seu-usuario/email-signature-generator.git
```

Execute:

```bash
# Adicionar remote (SUBSTITUA pelo seu usuário/repositório)
git remote add origin git@github.com:SEU-USUARIO/email-signature-generator.git

# Verificar que o remote foi adicionado
git remote -v

# Fazer push da branch main
git push -u origin main
```

### Se usou GitHub CLI (Opção B):

O push já foi feito automaticamente! 🎉

## Passo 9: Verificar no GitHub

Abra o navegador em:
```
https://github.com/SEU-USUARIO/email-signature-generator
```

Você deve ver todos os arquivos commitados! ✅

## Comandos Úteis para o Futuro

```bash
# Ver status do repositório
git status

# Adicionar arquivos modificados
git add .

# Fazer commit
git commit -m "feat: descrição da alteração"

# Fazer push
git push

# Fazer pull (baixar mudanças do GitHub)
git pull

# Ver histórico de commits
git log --oneline

# Criar nova branch
git checkout -b nome-da-branch

# Mudar de branch
git checkout main
```

## Solução de Problemas

### Erro: Permission denied (publickey)

```bash
# Verificar se o SSH agent está rodando
eval "$(ssh-agent -s)"

# Adicionar a chave novamente
ssh-add ~/.ssh/id_ed25519

# Testar conexão
ssh -T git@github.com
```

### Erro: Could not resolve hostname

Verifique sua conexão com a internet.

### Trocar de HTTPS para SSH

Se você já tem um remote configurado com HTTPS:

```bash
# Ver remotes atuais
git remote -v

# Trocar para SSH (SUBSTITUA pelo seu usuário)
git remote set-url origin git@github.com:SEU-USUARIO/email-signature-generator.git
```

## Segurança

✅ **Boas Práticas:**
- Nunca compartilhe sua chave **privada** (`id_ed25519` sem `.pub`)
- A chave **pública** (`id_ed25519.pub`) pode ser compartilhada
- Use senhas fortes na chave SSH
- Se perder acesso ao container, revogue a chave no GitHub

## Próximos Passos

Depois de configurar o SSH:

1. Desenvolva novas funcionalidades
2. Faça commits regulares
3. Faça push para manter o backup no GitHub
4. Convide colaboradores se necessário
5. Configure GitHub Actions para CI/CD (opcional)

## Links Úteis

- [GitHub SSH Documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

💡 **Dica:** Salve este guia para consultas futuras!

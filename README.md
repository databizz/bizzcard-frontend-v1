# Gen Sign Frontend V1

Projeto Next.js configurado com Docker (produção e desenvolvimento), TypeScript e Tailwind CSS.

## Primeiros Passos

### Opção 1: Usando DevContainer (Recomendado para Desenvolvimento)

1. Abra este projeto no VS Code
2. Pressione `Cmd + Shift + P` (ou `F1`) e selecione `Dev Containers: Reopen in Container`
3. Aguarde o container ser construído e as dependências instaladas
4. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

5. Abra [http://localhost:3000](http://localhost:3000) no navegador

### Opção 2: Usando Docker Compose (Produção)

```bash
# Build e executar em produção
docker-compose up app-prod

# Ou em modo detached
docker-compose up -d app-prod
```

Acesse [http://localhost:3000](http://localhost:3000)

### Opção 3: Usando Docker Diretamente (Produção)

```bash
# Build da imagem
docker build -t gen-sign-frontend:latest .

# Executar container
docker run -p 3000:3000 gen-sign-frontend:latest
```

### Opção 4: Localmente (sem Docker)

1. Instale as dependências:

```bash
npm install
```

2. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

3. Abra [http://localhost:3000](http://localhost:3000) no navegador

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

## Estrutura do Projeto

```
├── .devcontainer/
│   ├── Dockerfile         # Dockerfile de DESENVOLVIMENTO (com Git)
│   └── devcontainer.json  # Configuração do DevContainer
├── public/                # Arquivos estáticos
├── src/
│   ├── app/              # App Router do Next.js
│   │   ├── layout.tsx    # Layout raiz
│   │   ├── page.tsx      # Página inicial
│   │   └── globals.css   # Estilos globais
│   ├── components/       # Componentes React
│   └── lib/             # Utilitários e helpers
├── Dockerfile            # Dockerfile de PRODUÇÃO (otimizado, sem Git)
├── docker-compose.yml    # Orquestração Docker
├── .dockerignore         # Arquivos ignorados pelo Docker
├── package.json
└── tsconfig.json
```

## Tecnologias

- [Next.js 14](https://nextjs.org/)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ESLint](https://eslint.org/)

## Docker

Este projeto possui **dois Dockerfiles separados**:

### 1. Dockerfile (Raiz do Projeto) - PRODUÇÃO

- **Localização**: `/Dockerfile`
- **Propósito**: Build otimizado para produção
- **Características**:
  - Multi-stage build (reduz tamanho da imagem)
  - Usa `node:20-alpine` (imagem mínima)
  - **Não inclui Git** (desnecessário em produção)
  - Output standalone do Next.js
  - Usuário não-root para segurança
  - Apenas dependências de produção

### 2. Dockerfile (DevContainer) - DESENVOLVIMENTO

- **Localização**: `/.devcontainer/Dockerfile`
- **Propósito**: Ambiente completo de desenvolvimento
- **Características**:
  - Usa `node:20-bullseye` (imagem completa)
  - **Git instalado e configurado**
  - GitHub CLI (gh)
  - Zsh com Oh My Zsh
  - Ferramentas de desenvolvimento (vim, nano, curl, wget)
  - Suporte completo para versionamento de código

### Quando usar cada um?

| Situação | Dockerfile | Comando |
|----------|-----------|---------|
| **Desenvolvimento** | `.devcontainer/Dockerfile` | Abrir no VSCode DevContainer |
| **Produção** | `Dockerfile` (raiz) | `docker-compose up app-prod` |
| **Build produção** | `Dockerfile` (raiz) | `docker build -t app .` |

## DevContainer (Desenvolvimento)

Este projeto inclui configuração de DevContainer com:
- Node.js 20 (Debian Bullseye)
- **Git instalado e configurado** ✅
- **GitHub CLI (gh)** ✅
- Zsh com Oh My Zsh
- Extensões VS Code recomendadas:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - GitLens
- Port forwarding automático na porta 3000
- Auto-instalação de dependências npm

### Usando Git no DevContainer

O Git está **completamente funcional** dentro do container de desenvolvimento:

```bash
# Verificar versão do Git
git --version

# Configurar Git (primeira vez)
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"

# Inicializar repositório
git init

# Comandos Git normais
git add .
git commit -m "Initial commit"
git status
git push origin main

# Usar GitHub CLI
gh repo create
gh pr list
```

**Importante**: Git está disponível **APENAS no ambiente de desenvolvimento** (DevContainer). A imagem de produção não inclui Git para manter o tamanho otimizado.

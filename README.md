# BizzCard - Cartão Comercial Digital Profissional

<div align="center">

**Crie seu cartão comercial digital para usar em qualquer plataforma**

![BizzCard](https://img.shields.io/badge/BizzCard-Digital%20Business%20Card-FFC400?style=for-the-badge&logo=creditcard)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

📧 Email · 📱 Instagram · 💼 LinkedIn · 💬 WhatsApp · 📲 QR Code · 🌐 Website

</div>

---

## 🚀 Sobre o BizzCard

**BizzCard** é uma plataforma moderna para criação de cartões comerciais digitais profissionais que vão muito além de simples assinaturas de email. Crie um cartão versátil que funciona em:

- 📧 **Emails** - Gmail, Outlook, Apple Mail e mais
- 📱 **Redes Sociais** - Instagram, LinkedIn, Facebook
- 💬 **Mensageria** - WhatsApp, Telegram, Signal
- 🌐 **Websites** - Incorpore em seu site ou portfólio
- 📲 **QR Code** - Para cartões de visita físicos
- 💾 **vCard** - Formato padrão de contato digital

## ✨ Funcionalidades Principais

### 🎨 Design Profissional
- **6 Templates Exclusivos**: Modern, Classic, Minimal, Corporate, Creative e Elegant
- **Cores Customizáveis**: Use as cores da sua marca (Amarelo #FFC400 e Roxo #84087E por padrão)
- **Logo Personalizado**: Adicione o logo da sua empresa
- **Fonte Rubik**: Tipografia moderna e profissional do Google Fonts

### 📲 QR Code Integrado
- **Geração Automática**: Crie QR Codes personalizados para qualquer URL
- **Link Customizável**: Direcione para WhatsApp, site, LinkedIn ou qualquer destino
- **Tamanhos Variados**: Small (60px), Medium (80px) ou Large (100px)
- **Posicionamento Flexível**: Esquerda, Centro ou Direita
- **Alta Qualidade**: Level H com 30% de correção de erros

### 🌍 Multi-Plataforma & Multi-Idioma
- **WhatsApp Integration**: Link direto para conversas com número formatado
- **Redes Sociais**: Instagram e LinkedIn integrados
- **Responsivo**: Funciona perfeitamente em todos os dispositivos
- **HTML Email-Safe**: Compatível com todos os clientes de email
- **Internacionalização**: Português BR (padrão) e English completo

## 💼 Planos Disponíveis

### 🆓 FREE (Grátis para sempre)
- ✅ 1 template (Minimal)
- ✅ 1 rede social
- ✅ Cores padrão
- ✅ Pode copiar e usar
- ⚠️ Marca d'água BizzCard

### ⭐ PRO (R$ 9,90/mês)
- ✅ **6+ templates profissionais**
- ✅ **Múltiplas redes sociais**
- ✅ **Personalização de cores**
- ✅ **Logo customizado**
- ✅ **Geração de QR Code**
- ✅ **Campo WhatsApp dedicado**
- ✅ **Sem marca d'água**
- ✅ **Múltiplos formatos** (PNG, JPG, HTML)
- ✅ **vCard export** (em desenvolvimento)

## 🎯 Casos de Uso

### 👔 Profissionais Autônomos
Crie um cartão com QR Code que leva direto ao seu WhatsApp ou portfólio. Perfeito para advogados, consultores, designers e freelancers.

### 🏢 Empresas & Startups
Padronize os cartões de toda equipe com as cores e logo da empresa. Mantenha consistência visual em todas as plataformas de comunicação.

### 🤝 Networking Digital
Compartilhe seu cartão em eventos, redes sociais ou através de QR Code impresso em materiais físicos. Um único cartão para todos os canais.

### 🛍️ E-commerce & Varejo
Adicione QR Code em notas fiscais ou embalagens facilitando o contato dos clientes via WhatsApp ou redes sociais.

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Next.js** | 14 | Framework React com App Router |
| **TypeScript** | 5 | Type safety e DX |
| **Tailwind CSS** | 3 | Utility-first CSS |
| **Rubik Font** | - | Google Fonts (400, 500, 600, 700) |
| **qrcode.react** | - | Geração de QR Codes SVG |
| **React Context** | - | State management |
| **i18n Custom** | - | Sistema próprio sem deps externas |

## 🎨 Paleta de Cores

```css
/* Cores Principais */
--primary-yellow: #FFC400;   /* Pantone 7548 C */
--primary-purple: #84087E;   /* Pantone 2355 C */

/* Cores Secundárias */
--secondary-darkPurple: #6E5967;  /* Pantone 18-1708 TCX */
--secondary-gray: #D1D1D1;        /* Cool Gray 2 XGC */
```

## 📦 Estrutura do Projeto

```
/workspace
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Layout + Rubik font
│   │   ├── page.tsx                # Página principal
│   │   ├── providers.tsx           # Context providers
│   │   └── globals.css             # Estilos globais
│   ├── components/
│   │   ├── SignatureForm.tsx       # Formulário com QR Code
│   │   ├── SignaturePreview.tsx    # Preview + 6 templates
│   │   ├── SubscriptionBanner.tsx  # Banner de planos
│   │   └── SubscriptionMockControls.tsx
│   ├── contexts/
│   │   ├── LanguageContext.tsx     # Sistema i18n
│   │   └── SubscriptionContext.tsx # Planos FREE/PRO
│   ├── lib/
│   │   ├── i18n.ts                 # 530+ strings traduzidas
│   │   ├── generateUserId.ts       # ID único por usuário
│   │   └── generateRedirectLinks.ts # Analytics tracking
│   └── types/
│       └── signature.ts            # TypeScript interfaces
├── tailwind.config.ts              # Cores custom BizzCard
└── package.json
```

## 🚀 Como Usar

### Instalação Local

```bash
# Clone o repositório
git clone <repository-url>
cd bizzcard

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev

# Acesse
open http://localhost:3000
```

### DevContainer (Recomendado)

1. Abra o projeto no VS Code
2. Pressione `F1` → "Dev Containers: Reopen in Container"
3. Aguarde o build
4. Execute `npm run dev`

### Docker Compose

```bash
# Desenvolvimento
docker-compose up app-dev

# Produção
docker-compose up app-prod
```

## 📱 Templates Disponíveis

| Template | Plano | Descrição |
|----------|-------|-----------|
| **Minimal** | FREE | Simples e direto, perfeito para profissionais |
| **Modern** | PRO | Design limpo com borda colorida lateral |
| **Classic** | PRO | Tradicional e elegante, centralizado |
| **Corporate** | PRO | Profissional com header em gradiente |
| **Creative** | PRO | Ousado e diferenciado com bordas arredondadas |
| **Elegant** | PRO | Sofisticado com tipografia serif |

Todos os templates suportam:
- ✅ WhatsApp dedicado
- ✅ QR Code integrado
- ✅ Logo customizado
- ✅ Cores personalizadas
- ✅ Múltiplas redes sociais (PRO)

## 🌟 Diferenciais

✅ **Multi-Plataforma**: Um cartão para email, redes sociais, WhatsApp, websites
✅ **QR Code Nativo**: Perfeito para networking offline e materiais impressos
✅ **WhatsApp First**: Campo dedicado com link wa.me/ automático
✅ **100% Responsivo**: Funciona perfeitamente em qualquer dispositivo
✅ **Email-Safe HTML**: Testado em Gmail, Outlook, Apple Mail
✅ **Internacionalizado**: PT-BR e EN com 530+ strings
✅ **TypeScript**: Type-safe e fácil de manter
✅ **Modern Stack**: Next.js 14 + Tailwind CSS 3 + Rubik

## 📊 Roadmap

### ✅ Fase 1 - MVP (COMPLETO)
- ✅ 6 templates profissionais
- ✅ Sistema FREE/PRO
- ✅ QR Code generation
- ✅ WhatsApp integration
- ✅ Internacionalização PT-BR/EN

### 🚧 Fase 2 - Monetização (Em Progresso)
- [ ] Integração Stripe/Mercado Pago
- [ ] Backend com NextAuth.js
- [ ] PostgreSQL/Supabase
- [ ] Painel administrativo

### 📋 Fase 3 - Features PRO (Backlog)
- [ ] vCard download (.vcf)
- [ ] PNG/JPG export
- [ ] Analytics dashboard
- [ ] A/B testing de cartões
- [ ] Múltiplos cartões por usuário

### 💡 Fase 4 - Integrações (Ideias)
- [ ] Google Workspace sync
- [ ] Microsoft 365 integration
- [ ] HubSpot/Salesforce CRM
- [ ] API pública REST
- [ ] Zapier/Make webhooks

## 🧪 Como Testar

### Testar Plano FREE
1. Acesse `http://localhost:3000`
2. Clique em "Plano FREE" no banner
3. Observe as limitações:
   - Apenas template Minimal
   - Templates PRO bloqueados (🔒)
   - Cores desabilitadas
   - Logo desabilitado
   - QR Code bloqueado
   - Apenas 1 rede social
4. Preencha dados e copie o cartão
5. Cole no Gmail → **Marca d'água visível**

### Testar Plano PRO
1. No banner FREE, clique "Upgrade para PRO"
2. Veja recursos desbloqueados:
   - 6 templates disponíveis
   - Cores customizáveis
   - Logo habilitado
   - QR Code ativo
   - Múltiplas redes sociais
   - Campo WhatsApp
3. Copie o cartão → **Sem marca d'água**

### Controles Mock (Dev)
Use os controles no canto inferior direito para:
- Alternar entre FREE/PRO/Trial
- Simular expiração
- Testar fluxo completo

## 📜 Scripts NPM

```bash
npm run dev       # Servidor desenvolvimento (turbo)
npm run build     # Build produção otimizado
npm start         # Servidor produção
npm run lint      # ESLint check
```

## 🐳 Docker

### Dockerfile (Raiz) - PRODUÇÃO
- Multi-stage build otimizado
- Imagem mínima `node:20-alpine`
- Apenas deps de produção
- Non-root user

### .devcontainer/Dockerfile - DEV
- Imagem completa `node:20-bullseye`
- Git + GitHub CLI
- Zsh + Oh My Zsh
- Dev tools

## 🤝 Contribuindo

Contribuições são bem-vindas!

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFeature`)
3. Commit (`git commit -m 'Add: Nova feature'`)
4. Push (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 📞 Contato

- 💬 Issues: [GitHub Issues](https://github.com/seu-usuario/bizzcard/issues)
- 📧 Email: contato@bizzcard.app
- 🌐 Website: https://bizzcard.com

---

<div align="center">

**Feito com ❤️ usando Next.js, TypeScript e Tailwind CSS**

© 2025 BizzCard - Seu Cartão Comercial Digital Profissional

[Documentação](#) · [Roadmap](#-roadmap) · [Contribuir](#-contribuindo)

</div>

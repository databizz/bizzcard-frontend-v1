# GenSign - Gerador de Assinaturas de Email Profissionais

<div align="center">

**Crie assinaturas de email personalizadas e profissionais em minutos**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

</div>

---

## 🎯 O Que É?

**GenSign** é uma aplicação web SaaS que permite criar assinaturas de email profissionais e personalizadas para uso em Gmail, Outlook e outros clientes de email.

### Funcionalidades Principais

- ✉️ **Gerador visual** de assinaturas de email
- 🎨 **4+ templates profissionais** (Moderno, Clássico, Minimalista, Corporativo)
- 🏢 **Templates pré-configurados por indústria** (Advogado, Tech, Corporativo, etc.)
- 🎨 **Personalização completa** (cores, logo, redes sociais)
- 📊 **Click Analytics** (rastreamento de engajamento em links)
- 📋 **Copiar com um clique** direto para Gmail/Outlook
- 📱 **Responsivo** - funciona perfeitamente em mobile

---

## 💼 Modelo de Negócio - Planos

### 🆓 **PLANO FREE** (Gratuito para sempre)

**Objetivo:** Deixar o usuário experimentar e sentir necessidade do upgrade

**Inclui:**

- ✅ 1 template básico (Minimalista)
- ✅ Campos essenciais (nome, cargo, empresa, email, telefone)
- ✅ 1 rede social (Instagram OU LinkedIn)
- ✅ **Pode copiar e usar** no email
- ✅ Cores fixas (sem personalização)
- ⚠️ **Marca d'água visível** no rodapé da assinatura

**Limitações (gatilhos de conversão):**

- ❌ Marca d'água em todos os emails enviados
- ❌ Sem logo customizado
- ❌ Sem personalização de cores
- ❌ Sem múltiplas redes sociais
- ❌ Templates profissionais bloqueados

---

### ⭐ **PLANO PRO** (R$ 9,90/mês ou R$ 89/ano)

**Objetivo:** Profissionais e empresas que querem assinatura sem limitações

**Tudo do FREE + Recursos Premium:**

- ✅ **4+ templates profissionais** (Modern, Classic, Minimal, Corporate)
- ✅ **Templates por indústria** (Advogado, Tech, Corporativo, Saúde, etc.)
- ✅ **SEM marca d'água** - assinatura limpa e profissional
- ✅ **Personalização de cores** (primária e secundária)
- ✅ **Logo customizado** (upload ou URL)
- ✅ **Múltiplas redes sociais** (Instagram, LinkedIn, Twitter, etc.)
- ✅ **Click Analytics** (em desenvolvimento)
  - Dashboard com métricas de engajamento
  - Rastreamento de cliques em links
  - Qual rede social gera mais resultado
- ✅ **Múltiplas assinaturas** (formal, casual, vendas) - roadmap
- ✅ Suporte prioritário

**Público-alvo:**

- 👔 Profissionais liberais (advogados, consultores, contadores)
- 🚀 Startups e pequenas empresas
- 💼 Equipes comerciais e vendas
- 🎯 Qualquer profissional que valoriza branding pessoal

---

## 🚀 Estratégia de Conversão (FREE → PRO)

### Por que o plano FREE funciona:

1. **Usuário testa no email real**
   - Copia a assinatura e vê funcionando
   - Marca d'água aparece em todos os emails enviados
   - Cria "vergonha" profissional → upgrade

2. **Limitações visíveis e frustrantes**
   - Templates profissionais bloqueados com 🔒
   - Cores fixas (não combina com marca)
   - Sem logo da empresa
   - Apenas 1 rede social

3. **Preço baixo = baixa fricção**
   - R$ 9,90/mês = menos que um café por dia
   - R$ 89/ano = 25% de desconto
   - Valor percebido > custo

4. **Comparação constante**
   - Banner sempre mostrando recursos PRO bloqueados
   - CTAs estratégicos em toda a interface

---

## 🏗️ Arquitetura Técnica

### Frontend (Next.js 14)

```
src/
├── app/                      # App Router do Next.js
│   ├── layout.tsx            # Layout raiz
│   ├── page.tsx              # Página principal do gerador
│   ├── providers.tsx         # Context Providers
│   └── globals.css           # Estilos globais
├── components/               # Componentes React
│   ├── SignatureForm.tsx     # Formulário de edição
│   ├── SignaturePreview.tsx  # Preview em tempo real
│   ├── SubscriptionBanner.tsx # Banner de planos
│   ├── EmailInstructions.tsx # Instruções de uso
│   └── SubscriptionMockControls.tsx # Controles de teste
├── contexts/                 # React Contexts
│   └── SubscriptionContext.tsx # Gerenciamento de planos
├── lib/                      # Utilitários
│   ├── generateUserId.ts     # Gerar ID único do usuário
│   └── generateRedirectLinks.ts # Links de rastreamento
└── types/                    # TypeScript types
    ├── signature.ts          # Tipos de assinatura
    └── subscription.ts       # Tipos de planos
```

### Tecnologias Utilizadas

- **Next.js 14** - Framework React com SSR
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling utility-first
- **React Context** - State management
- **Local Storage** - Persistência de dados (mock)

---

## 📊 Roadmap - Próximas Funcionalidades

### Fase 1 - MVP (✅ COMPLETO)

- ✅ Sistema de planos FREE/PRO
- ✅ Limites e restrições por plano
- ✅ Marca d'água no plano FREE
- ✅ Templates bloqueados com UX clara
- ✅ 4 templates profissionais

### Fase 2 - Monetização (🚧 Em Planejamento)

- [ ] Integração de pagamento (Stripe/Mercado Pago)
- [ ] Backend com autenticação (NextAuth.js)
- [ ] Banco de dados (PostgreSQL/Supabase)
- [ ] Painel de administração

### Fase 3 - Analytics (📋 Backlog)

- [ ] API de rastreamento de cliques
- [ ] Dashboard com métricas
- [ ] Relatórios semanais/mensais
- [ ] A/B testing de assinaturas

### Fase 4 - Equipes (📋 Backlog)

- [ ] Plano Business (gestão de equipe)
- [ ] Gerenciamento centralizado
- [ ] Aprovação de assinaturas
- [ ] Branding corporativo

### Fase 5 - Integrações (💡 Ideias)

- [ ] Google Workspace integration
- [ ] Microsoft 365 integration
- [ ] CRM integrations (HubSpot, Salesforce)
- [ ] API pública

---

## 🚀 Como Executar

### Opção 1: Localmente (Desenvolvimento)

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev

# 3. Abrir no navegador
# http://localhost:3000
```

### Opção 2: DevContainer (Recomendado)

1. Abra o projeto no VS Code
2. Pressione `Cmd + Shift + P` (ou `F1`)
3. Selecione `Dev Containers: Reopen in Container`
4. Aguarde o build do container
5. Execute `npm run dev`
6. Acesse http://localhost:3000

### Opção 3: Docker Compose (Produção)

```bash
# Build e executar
docker-compose up app-prod

# Ou em background
docker-compose up -d app-prod
```

---

## 🧪 Como Testar os Planos

### 1. Testar Plano FREE

```bash
# Abrir http://localhost:3000
# 1. Clicar em "Plano FREE" no banner
# 2. Observar limitações:
#    - Apenas template Minimalista disponível
#    - Templates profissionais bloqueados (🔒)
#    - Cores desabilitadas (🔒)
#    - Logo desabilitado (🔒)
#    - Apenas 1 rede social
# 3. Preencher dados e copiar assinatura
# 4. Colar no Gmail e ver MARCA D'ÁGUA no rodapé
```

### 2. Testar Upgrade para PRO

```bash
# 1. No banner FREE, clicar "Upgrade para PRO"
# 2. Ver todos recursos desbloqueados:
#    - 4 templates disponíveis
#    - Personalização de cores ativa
#    - Logo habilitado
#    - Múltiplas redes sociais
# 3. Copiar assinatura → SEM marca d'água
```

### 3. Usar Controles Mock (Desenvolvimento)

No canto inferior direito da tela há controles para testar:

- Alternar entre planos (FREE/PRO/Trial)
- Simular expiração
- Testar fluxo completo

---

## 📜 Scripts Disponíveis

```bash
npm run dev       # Servidor de desenvolvimento
npm run build     # Build de produção
npm start         # Servidor de produção
npm run lint      # Executar linter
```

---

## 🐳 Docker

Este projeto possui **dois Dockerfiles separados**:

### 1. Dockerfile (Raiz) - PRODUÇÃO

- Build otimizado multi-stage
- Imagem mínima (`node:20-alpine`)
- Apenas dependências de produção
- Usuário não-root para segurança

### 2. .devcontainer/Dockerfile - DESENVOLVIMENTO

- Imagem completa (`node:20-bullseye`)
- Git + GitHub CLI instalados
- Zsh + Oh My Zsh
- Ferramentas de desenvolvimento

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📞 Contato & Suporte

- 💬 Issues: [GitHub Issues](https://github.com/seu-usuario/signature-pro/issues)
- 📧 Email: suporte@gensign.app
- 🌐 Website: https://gensign.com

---

## 💡 Por Que Este Produto Funciona?

### 1. **Dor Real**

Todo profissional precisa de assinatura de email, mas:

- Gmail/Outlook são confusos de configurar
- Manter consistência de marca é difícil
- Sem dados de engajamento

### 2. **Solução Simples**

- Interface visual intuitiva
- Copia com 1 clique
- Templates prontos

### 3. **Freemium que Converte**

- FREE frustra na hora certa (marca d'água)
- Upgrade de R$ 9,90 = impulso de compra
- Valor percebido >>> preço

### 4. **Mercado Grande**

- Milhões de profissionais no Brasil
- Crescimento de trabalho remoto
- Branding pessoal em alta

---

<div align="center">

**Feito com ❤️ usando Next.js, TypeScript e Tailwind CSS**

[Documentação](./docs) • [Roadmap](#-roadmap---próximas-funcionalidades) • [Contribuir](#-contribuindo)

</div>

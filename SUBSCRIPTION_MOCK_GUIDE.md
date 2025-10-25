# Guia: Sistema de Assinatura Mock

Este guia explica como funciona o sistema de assinatura simulado (mock) implementado no projeto.

## 🎯 Objetivo

Testar o comportamento do sistema antes de implementar um gateway de pagamento real. Permite validar:
- Bloqueio de funcionalidades quando a assinatura expira
- Fluxo de upgrade/renovação
- Período de teste gratuito
- Interface de usuário para diferentes estados de assinatura

## 📦 Componentes Criados

### 1. **Types** (`src/types/subscription.ts`)
Define os tipos TypeScript para:
- `SubscriptionStatus`: 'active' | 'expired' | 'trial' | 'none'
- `SubscriptionData`: Dados da assinatura (status, datas, plano)
- `SubscriptionLimits`: Permissões (o que o usuário pode fazer)

### 2. **Context** (`src/contexts/SubscriptionContext.tsx`)
Gerencia o estado global da assinatura:
- Armazena dados no `localStorage`
- Calcula dias restantes
- Define permissões baseado no status
- Funções para simular mudanças de estado

### 3. **SubscriptionBanner** (`src/components/SubscriptionBanner.tsx`)
Banner que muda conforme o status:
- **none**: Convite para assinar ou iniciar trial
- **trial**: Mostra dias restantes + botão para assinar
- **active**: Confirma assinatura ativa
- **expired**: Alerta de renovação necessária

### 4. **SubscriptionMockControls** (`src/components/SubscriptionMockControls.tsx`)
Painel flutuante de testes (canto inferior direito):
- Mostra status atual
- Botões para simular cenários:
  - Iniciar Trial (7 dias)
  - Ativar Plano Anual
  - Expirar Assinatura
  - Resetar (sem assinatura)

### 5. **SignaturePreview** (atualizado)
Bloqueia funcionalidades quando a assinatura está inativa:
- Botão "Copiar" desabilitado
- Preview com opacidade reduzida
- Mensagem de bloqueio

## 🔄 Estados de Assinatura

### 1. **none** (Sem assinatura)
```typescript
{
  status: 'none',
  expiryDate: null,
  trialEndsAt: null,
  plan: 'none'
}
```
**Permissões:**
- ❌ Não pode gerar assinaturas
- ❌ Não pode copiar assinaturas
- ❌ Não pode usar templates

### 2. **trial** (Período de Teste - 7 dias)
```typescript
{
  status: 'trial',
  expiryDate: null,
  trialEndsAt: '2025-11-01T00:00:00.000Z', // +7 dias
  plan: 'none'
}
```
**Permissões:**
- ✅ Pode gerar assinaturas (limite: 5)
- ✅ Pode copiar assinaturas
- ✅ Pode usar templates

### 3. **active** (Assinatura Ativa - 1 ano)
```typescript
{
  status: 'active',
  expiryDate: '2026-10-25T00:00:00.000Z', // +1 ano
  trialEndsAt: null,
  plan: 'annual'
}
```
**Permissões:**
- ✅ Pode gerar assinaturas (ilimitado)
- ✅ Pode copiar assinaturas
- ✅ Pode usar templates

### 4. **expired** (Assinatura Expirada)
```typescript
{
  status: 'expired',
  expiryDate: '2025-10-25T00:00:00.000Z', // passado
  trialEndsAt: null,
  plan: 'annual' // ou 'none'
}
```
**Permissões:**
- ❌ Não pode gerar assinaturas
- ❌ Não pode copiar assinaturas
- ❌ Não pode usar templates

## 🧪 Como Testar

### Passo 1: Iniciar a aplicação
```bash
npm run dev
```
Abra: http://localhost:3001

### Passo 2: Abrir o Painel de Controles
No canto inferior direito, clique em **"🧪 Controles de Teste"**

### Passo 3: Testar Cenários

#### Cenário 1: Usuário Novo (sem assinatura)
1. Clique em "🔄 Resetar (Sem Assinatura)"
2. Veja o banner convidando para assinar
3. Tente copiar assinatura → Deve mostrar alerta de bloqueio

#### Cenário 2: Trial Gratuito
1. Clique em "🎁 Iniciar Trial (7 dias)"
2. Veja o banner mostrando dias restantes
3. Teste copiar assinatura → Deve funcionar
4. Veja o status no painel: "trial"

#### Cenário 3: Assinatura Ativa
1. Clique em "✅ Ativar Plano Anual"
2. Veja o banner de confirmação (365 dias)
3. Teste todas as funcionalidades → Tudo liberado
4. Veja o status no painel: "active"

#### Cenário 4: Assinatura Expirada
1. Clique em "⚠️ Expirar Assinatura"
2. Veja o alerta vermelho de renovação
3. Tente copiar assinatura → Deve estar bloqueado
4. Veja o preview com opacidade reduzida

## 💾 Persistência

Os dados são salvos no `localStorage` do navegador:
- Chave: `subscription_mock`
- Persiste entre recarregamentos da página
- Limpar localStorage reseta para "none"

### Resetar manualmente:
```javascript
// No console do navegador:
localStorage.removeItem('subscription_mock');
window.location.reload();
```

## 🚀 Próximos Passos (Integração Real)

Quando for implementar pagamentos reais, você precisará:

### 1. Backend/API
- Criar endpoint para verificar status da assinatura
- Integrar com gateway de pagamento (Stripe, Mercado Pago, etc.)
- Webhook para receber confirmação de pagamento
- Banco de dados para armazenar assinaturas

### 2. Substituir Mock
Trocar as funções mock por chamadas de API:

```typescript
// ANTES (Mock):
const activateAnnualPlan = () => {
  setSubscription({
    status: 'active',
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    ...
  });
};

// DEPOIS (Real):
const activateAnnualPlan = async () => {
  const response = await fetch('/api/subscription/activate', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await response.json();
  setSubscription(data.subscription);
};
```

### 3. Adicionar Autenticação
- Login/Registro de usuários
- JWT ou sessões
- Proteger rotas

### 4. Gateway de Pagamento
Exemplos de integrações:

#### Stripe:
```typescript
import { loadStripe } from '@stripe/stripe-js';

const handleCheckout = async () => {
  const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
  });
  const { sessionId } = await response.json();
  await stripe.redirectToCheckout({ sessionId });
};
```

#### Mercado Pago:
```typescript
const handleCheckout = async () => {
  const response = await fetch('/api/create-preference', {
    method: 'POST',
    body: JSON.stringify({ plan: 'annual' })
  });
  const { init_point } = await response.json();
  window.location.href = init_point;
};
```

## 🗑️ Remover em Produção

Antes de lançar em produção, **remova**:

1. **SubscriptionMockControls**
```tsx
// Em src/app/page.tsx - REMOVER ESTA LINHA:
<SubscriptionMockControls />
```

2. **Botões de Mock** em `SubscriptionBanner.tsx`
Substituir por botões reais que redirecionam para checkout

3. **localStorage**
Substituir por dados vindos da API/banco de dados

## 📊 Estrutura de Dados Recomendada (Produção)

```typescript
// Tabela: subscriptions
{
  id: string;
  userId: string;
  status: 'active' | 'expired' | 'trial' | 'cancelled';
  plan: 'annual' | 'monthly';
  startDate: Date;
  expiryDate: Date;
  paymentId: string; // ID da transação no gateway
  amount: number;
  currency: string;
  autoRenew: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔐 Segurança

⚠️ **IMPORTANTE**: Nunca confie apenas no frontend!

Mesmo com verificação no frontend, SEMPRE valide no backend:
- Verificar status da assinatura em cada request
- Não permitir ações bloqueadas mesmo se o usuário burlar o JavaScript
- Usar middleware de autenticação nas rotas protegidas

## 📝 Valor da Assinatura

Defina o preço no seu sistema de pagamento e no frontend:

```typescript
// src/config/pricing.ts
export const PRICING = {
  annual: {
    amount: 99.90, // R$ 99,90/ano
    currency: 'BRL',
    interval: 'year',
    trialDays: 7,
  }
};
```

## 🎨 Customizar Mensagens

Edite os componentes para personalizar mensagens:
- `SubscriptionBanner.tsx`: Textos de CTA
- `SignaturePreview.tsx`: Mensagens de bloqueio
- `SubscriptionMockControls.tsx`: Remover em produção

---

**Status:** ✅ Sistema Mock Implementado e Funcionando!

**Ambiente:** http://localhost:3001

**Próximo:** Implementar gateway de pagamento real quando estiver pronto.

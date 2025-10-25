# Guia: Como Resolver o Bloqueio de Email do Gmail

## Problema
Seus emails estão sendo bloqueados pelo Gmail com o erro:
```
550 5.7.26 Your email has been blocked because the sender is unauthenticated
```

## Causa
O domínio `databizz.com.br` não tem registros SPF ou DKIM configurados no DNS.

## Solução

### 1. Configurar SPF (Sender Policy Framework)

Adicione um registro TXT no DNS do seu domínio:

**Tipo:** TXT
**Nome:** @ (ou databizz.com.br)
**Valor:** `v=spf1 include:_spf.google.com ~all`

Se você usa outro provedor de email (não Google Workspace), o valor pode ser diferente:
- **Office 365/Microsoft:** `v=spf1 include:spf.protection.outlook.com ~all`
- **Sendgrid:** `v=spf1 include:sendgrid.net ~all`
- **Mailgun:** `v=spf1 include:mailgun.org ~all`

### 2. Configurar DKIM (DomainKeys Identified Mail)

Se você usa **Google Workspace:**

1. Acesse o Admin Console do Google Workspace
2. Vá em Apps → Google Workspace → Gmail → Autenticar email
3. Clique em "Gerar novo registro"
4. Copie o registro TXT gerado
5. Adicione no DNS do seu domínio

**Tipo:** TXT
**Nome:** google._domainkey (ou o que o Google especificar)
**Valor:** (o valor longo gerado pelo Google)

### 3. Configurar DMARC (opcional, mas recomendado)

Adicione um registro TXT no DNS:

**Tipo:** TXT
**Nome:** _dmarc
**Valor:** `v=DMARC1; p=quarantine; rua=mailto:postmaster@databizz.com.br`

### 4. Onde Configurar o DNS

Você precisa acessar o painel de controle onde seu domínio está registrado:
- Registro.br (se o domínio foi registrado direto)
- Seu provedor de hospedagem (Hostgator, Locaweb, etc)
- Cloudflare (se você usa)
- Google Domains

### 5. Tempo de Propagação

Após adicionar os registros DNS, aguarde de 1 a 48 horas para propagação completa.

### 6. Verificar se Funcionou

Use estas ferramentas para testar:

- **MXToolbox:** https://mxtoolbox.com/spf.aspx
- **Google Admin Toolbox:** https://toolbox.googleapps.com/apps/checkmx/

Digite seu domínio `databizz.com.br` para verificar se SPF e DKIM estão configurados corretamente.

---

## IMPORTANTE

**Este problema NÃO é causado pela assinatura de email!** É uma configuração de infraestrutura do servidor de email que o administrador do domínio precisa resolver.

Se você não é o administrador do domínio databizz.com.br, entre em contato com:
- Seu departamento de TI
- Sua empresa de hospedagem
- Quem gerencia o email da empresa

## Referências

- [Guia oficial do Google sobre SPF](https://support.google.com/a/answer/33786)
- [Guia oficial do Google sobre DKIM](https://support.google.com/a/answer/174124)
- [Requisitos do Gmail para remetentes](https://support.google.com/mail/answer/81126)

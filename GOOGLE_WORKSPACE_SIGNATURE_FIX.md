# Como Resolver Assinatura no Google Workspace

## Problema
A assinatura aparece no Gmail pessoal mas não no Google Workspace.

## Solução Completa

### Passo 1: Configurar a Assinatura

1. Abra o Gmail do Workspace
2. Clique no ícone de **engrenagem** ⚙️ (canto superior direito)
3. Clique em **"Ver todas as configurações"**
4. Na aba **"Geral"**, role até a seção **"Assinatura"**
5. Clique em **"Criar nova"** ou selecione uma existente
6. Cole sua assinatura (use o botão "Texto Puro" se estiver tendo problemas)

### Passo 2: CONFIGURAR OS PADRÕES (ESSENCIAL!)

**Este é o passo que a maioria esquece!**

Depois de criar a assinatura, role um pouco mais para baixo até encontrar:

```
PADRÕES DE ASSINATURA
```

Configure:

- **Para novos e-mails:** [Selecione o nome da sua assinatura]
- **Em respostas/encaminhamentos:** [Selecione o nome da sua assinatura ou "Sem assinatura"]

### Passo 3: Verificar Múltiplos Endereços

Se você envia emails de múltiplos endereços:

1. Na mesma página de configurações, vá em **"Contas e importação"**
2. Na seção **"Enviar e-mail como"**, você verá todos os seus endereços
3. Para cada endereço, clique em **"editar informações"**
4. Certifique-se de que cada um tem a assinatura correta configurada

### Passo 4: Salvar e Recarregar

1. Role até o **final da página**
2. Clique em **"Salvar alterações"**
3. Aguarde a mensagem de confirmação
4. **Recarregue a página** (F5 ou Ctrl+R)
5. Teste criando um novo email

### Passo 5: Limpar Cache (se não funcionar)

1. Pressione **Ctrl+Shift+Del** (Windows) ou **Cmd+Shift+Del** (Mac)
2. Selecione:
   - ✅ Cookies e dados de sites
   - ✅ Imagens e arquivos em cache
3. Período: "Última hora"
4. Clique em "Limpar dados"
5. Reabra o Gmail

### Passo 6: Teste em Modo Anônimo

1. Abra uma **janela anônima** (Ctrl+Shift+N)
2. Entre no Gmail Workspace
3. Tente criar um novo email
4. Se funcionar aqui, o problema é cache/extensões do navegador

## Checklist de Verificação

- [ ] Assinatura criada na seção "Assinatura"
- [ ] **PADRÕES DE ASSINATURA configurados** (para novos emails)
- [ ] Salvou as alterações
- [ ] Recarregou a página
- [ ] Testou criar um NOVO email (não resposta)
- [ ] Verificou se está na conta correta (canto superior direito)

## Diferenças Gmail Pessoal vs Workspace

| Gmail Pessoal | Google Workspace |
|---------------|------------------|
| Aplica assinatura automaticamente | Precisa configurar os "Padrões" |
| Uma conta apenas | Múltiplas contas possíveis |
| Configuração mais simples | Mais opções de controle |

## Solução de Emergência

Se nada funcionar, use **texto puro** em vez de HTML:

1. No gerador, clique em **"Copiar TEXTO PURO"** (botão amarelo)
2. Cole no Gmail Workspace
3. Texto puro tem menos problemas de compatibilidade

## Ainda não funciona?

Verifique com o administrador do Workspace se há:
- Políticas de assinatura centralizada (admin pode forçar assinaturas)
- Restrições de formatação
- Configurações de segurança que bloqueiam HTML

Entre em contato com o suporte do Google Workspace se o problema persistir.

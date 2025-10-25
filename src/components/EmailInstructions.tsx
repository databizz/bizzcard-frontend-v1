'use client';

import { useState } from 'react';

interface EmailClient {
  id: string;
  name: string;
  icon: string;
  steps: string[];
}

export default function EmailInstructions() {
  const [activeClient, setActiveClient] = useState<string>('gmail');

  const emailClients: EmailClient[] = [
    {
      id: 'gmail',
      name: 'Gmail / Google Workspace',
      icon: '📧',
      steps: [
        'Clique no botão "Copiar Assinatura" acima',
        'Abra o Gmail e clique no ícone de engrenagem ⚙️ (canto superior direito)',
        'Clique em "Ver todas as configurações"',
        'Role até a seção "Assinatura"',
        'Clique dentro da caixa de texto e pressione Ctrl+V (ou Cmd+V no Mac)',
        '<strong>IMPORTANTE:</strong> Role mais abaixo até "Padrões de Assinatura" e selecione sua assinatura para "novos e-mails"',
        'Role até o final da página e clique em "Salvar alterações"',
      ],
    },
    {
      id: 'outlook-web',
      name: 'Outlook Web (Office 365)',
      icon: '🌐',
      steps: [
        'Clique no botão "Copiar Assinatura" acima',
        'Abra o Outlook Web e clique no ícone de engrenagem ⚙️',
        'Clique em "Ver todas as configurações do Outlook"',
        'Vá em "Email" → "Redação e resposta"',
        'Na seção "Assinatura de email", clique dentro da caixa',
        'Pressione Ctrl+V (ou Cmd+V no Mac) para colar',
        'Clique em "Salvar" no topo da página',
      ],
    },
    {
      id: 'outlook-desktop',
      name: 'Outlook Desktop (Windows)',
      icon: '💼',
      steps: [
        'Clique no botão "Copiar Assinatura" acima',
        'No Outlook, vá em "Arquivo" → "Opções"',
        'Clique em "Email" no menu lateral',
        'Clique no botão "Assinaturas..."',
        'Clique em "Novo" para criar uma assinatura ou selecione uma existente',
        'Clique dentro da caixa de edição e pressione Ctrl+V',
        'Configure quando usar a assinatura (novos emails, respostas, etc.)',
        'Clique em "OK" para salvar',
      ],
    },
    {
      id: 'apple-mail',
      name: 'Apple Mail (macOS)',
      icon: '🍎',
      steps: [
        'Clique no botão "Copiar Assinatura" acima',
        'Abra o Apple Mail',
        'Vá em "Mail" → "Preferências" (ou pressione Cmd+,)',
        'Clique na aba "Assinaturas"',
        'Clique no botão "+" para criar uma nova assinatura',
        'Dê um nome para a assinatura',
        'Clique no campo de edição à direita e pressione Cmd+V',
        'Feche a janela (as alterações são salvas automaticamente)',
      ],
    },
    {
      id: 'thunderbird',
      name: 'Thunderbird',
      icon: '🦅',
      steps: [
        'Clique no botão "Copiar Assinatura" acima',
        'Abra o Thunderbird',
        'Vá em "Ferramentas" → "Configurações de Conta" (ou "Editar" → "Configurações de Conta")',
        'Selecione a conta de email desejada',
        'Marque a opção "Anexar assinatura"',
        'Clique no botão "Escolher..." e selecione "Usar HTML"',
        'Cole a assinatura (Ctrl+V) na caixa de texto',
        'Clique em "OK" para salvar',
      ],
    },
    {
      id: 'yahoo',
      name: 'Yahoo Mail',
      icon: '🟣',
      steps: [
        'Clique no botão "Copiar Assinatura" acima',
        'Abra o Yahoo Mail',
        'Clique no ícone de engrenagem ⚙️ (canto superior direito)',
        'Clique em "Mais configurações"',
        'No menu lateral, clique em "Redação de e-mails"',
        'Role até a seção "Assinatura"',
        'Ative a opção "Assinatura"',
        'Clique na caixa de texto e pressione Ctrl+V (ou Cmd+V no Mac)',
        'As alterações são salvas automaticamente',
      ],
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <h3 className="text-white font-semibold text-lg flex items-center gap-2">
          💡 Como adicionar a assinatura no seu cliente de email
        </h3>
      </div>

      {/* Email Client Tabs */}
      <div className="border-b border-gray-200 bg-gray-50 overflow-x-auto">
        <div className="flex min-w-max">
          {emailClients.map((client) => (
            <button
              key={client.id}
              onClick={() => setActiveClient(client.id)}
              className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                activeClient === client.id
                  ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{client.icon}</span>
              {client.name}
            </button>
          ))}
        </div>
      </div>

      {/* Instructions Content */}
      <div className="p-6">
        {emailClients.map((client) => (
          <div
            key={client.id}
            className={activeClient === client.id ? 'block' : 'hidden'}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{client.icon}</span>
              <h4 className="text-lg font-semibold text-gray-800">{client.name}</h4>
            </div>
            <ol className="space-y-3">
              {client.steps.map((step, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {index + 1}
                  </span>
                  <span
                    className="flex-1 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: step }}
                  />
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      {/* Quick Tip */}
      <div className="bg-yellow-50 border-t border-yellow-200 px-6 py-4">
        <p className="text-sm text-yellow-800">
          <strong>💡 Dica:</strong> Se tiver dúvidas, procure por "como adicionar assinatura" nas
          configurações do seu cliente de email. A maioria tem uma opção de busca interna.
        </p>
      </div>
    </div>
  );
}

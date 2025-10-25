'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function RenovarContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('user');
  const reason = searchParams.get('reason');
  const attempted = searchParams.get('attempted');

  const getLinkTypeName = (type: string | null) => {
    switch (type) {
      case 'website':
        return 'site';
      case 'phone':
        return 'WhatsApp';
      case 'instagram':
        return 'Instagram';
      case 'linkedin':
        return 'LinkedIn';
      default:
        return 'link';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Card Principal */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header com Gradiente */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 p-8 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Assinatura Expirada
            </h1>
            <p className="text-red-100 text-lg">
              Renove agora para continuar usando seus links
            </p>
          </div>

          {/* Conteúdo */}
          <div className="p-8">
            {/* Mensagem do que foi tentado */}
            {attempted && (
              <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6">
                <p className="text-orange-800">
                  <strong>Você tentou acessar:</strong> {getLinkTypeName(attempted)}
                </p>
                <p className="text-orange-600 text-sm mt-1">
                  Este link está bloqueado porque sua assinatura expirou.
                </p>
              </div>
            )}

            {/* Por que renovar */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                O que acontece quando sua assinatura expira:
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <strong className="text-gray-800">Links param de funcionar</strong>
                    <p className="text-gray-600 text-sm">
                      Site, WhatsApp, Instagram e LinkedIn não redirecionam mais
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <strong className="text-gray-800">Perda de oportunidades</strong>
                    <p className="text-gray-600 text-sm">
                      Clientes não conseguem entrar em contato com você
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <strong className="text-gray-800">Imagem profissional comprometida</strong>
                    <p className="text-gray-600 text-sm">
                      Links quebrados passam impressão negativa
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Benefícios de renovar */}
            <div className="bg-green-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-green-900 mb-3">
                ✅ Renovando você garante:
              </h3>
              <ul className="space-y-2 text-green-800">
                <li>• Todos os links funcionando normalmente</li>
                <li>• Rastreamento de cliques e analytics</li>
                <li>• Assinaturas ilimitadas</li>
                <li>• Suporte prioritário</li>
                <li>• Atualizações automáticas</li>
              </ul>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  // Mock: Em produção, redirecionar para checkout real
                  alert('Em produção, isso redirecionaria para o checkout de pagamento.\n\nPor enquanto, use o painel de controles (🧪) para reativar a assinatura mock.');
                  window.location.href = '/?action=renew';
                }}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-bold text-lg shadow-lg"
              >
                💳 Renovar Agora - R$ 99,90/ano
              </button>

              <button
                onClick={() => window.location.href = '/'}
                className="px-8 py-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Voltar ao Início
              </button>
            </div>

            {/* Info do Usuário (apenas para debug) */}
            {userId && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-400 text-center">
                  ID do Usuário: {userId} • Motivo: {reason}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Garantia */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            🔒 Pagamento 100% seguro • ✅ Ativação imediata • 💯 Garantia de 30 dias
          </p>
        </div>
      </div>
    </main>
  );
}

export default function RenovarPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}>
      <RenovarContent />
    </Suspense>
  );
}

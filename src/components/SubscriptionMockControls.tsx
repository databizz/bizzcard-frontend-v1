'use client';

import { useState } from 'react';
import { useSubscription } from '@/contexts/SubscriptionContext';

export default function SubscriptionMockControls() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    subscription,
    limits,
    activateAnnualPlan,
    startTrial,
    expireSubscription,
    updateSubscription,
    daysRemaining,
  } = useSubscription();

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 px-4 py-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors text-sm font-medium z-50"
      >
        🧪 Controles de Teste
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-gray-300 rounded-lg shadow-2xl p-6 w-96 z-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <span>🧪</span>
          Painel de Controle (Mock)
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700 font-bold"
        >
          ✕
        </button>
      </div>

      {/* Status Atual */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-sm text-gray-700 mb-2">Status Atual:</h4>
        <div className="space-y-1 text-sm">
          <p>
            <strong>Status:</strong>{' '}
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                subscription.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : subscription.status === 'trial'
                  ? 'bg-blue-100 text-blue-800'
                  : subscription.status === 'expired'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {subscription.status}
            </span>
          </p>
          <p>
            <strong>Plano:</strong> {subscription.plan}
          </p>
          {daysRemaining !== null && (
            <p>
              <strong>Dias Restantes:</strong> {daysRemaining}
            </p>
          )}
        </div>
      </div>

      {/* Limites */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-sm text-gray-700 mb-2">Permissões:</h4>
        <div className="space-y-1 text-xs">
          <p>
            Gerar Assinatura:{' '}
            {limits.canGenerateSignature ? '✅ Sim' : '❌ Não'}
          </p>
          <p>
            Copiar Assinatura:{' '}
            {limits.canCopySignature ? '✅ Sim' : '❌ Não'}
          </p>
          <p>
            Usar Templates:{' '}
            {limits.canUseTemplates ? '✅ Sim' : '❌ Não'}
          </p>
          <p>
            Limite de Assinaturas:{' '}
            {limits.maxSignatures === null ? '♾️ Ilimitado' : limits.maxSignatures}
          </p>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="space-y-2">
        <h4 className="font-semibold text-sm text-gray-700 mb-2">Simular Cenários:</h4>

        <button
          onClick={startTrial}
          className="w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
        >
          🎁 Iniciar Trial (7 dias)
        </button>

        <button
          onClick={activateAnnualPlan}
          className="w-full px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
        >
          ✅ Ativar Plano Anual
        </button>

        <button
          onClick={expireSubscription}
          className="w-full px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
        >
          ⚠️ Expirar Assinatura
        </button>

        <button
          onClick={() => updateSubscription('none')}
          className="w-full px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm"
        >
          🔄 Resetar (Sem Assinatura)
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          💡 Este painel é apenas para testes. Remova em produção.
        </p>
      </div>
    </div>
  );
}

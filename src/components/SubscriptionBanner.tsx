'use client';

import { useSubscription } from '@/contexts/SubscriptionContext';
import { useEffect, useState } from 'react';

export default function SubscriptionBanner() {
  const { subscription, daysRemaining, activateFreePlan, activateProPlan, startTrial } = useSubscription();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Evita erro de hidratação renderizando apenas após o cliente estar pronto
  if (!isClient) {
    return null;
  }

  // Plano PRO ativo
  if (subscription.status === 'active' && subscription.plan === 'pro') {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⭐</span>
            <div>
              <p className="font-semibold text-green-900">Plano PRO Ativo</p>
              <p className="text-sm text-green-700">
                {daysRemaining ? `${daysRemaining} dias restantes` : 'Acesso ilimitado'}
              </p>
            </div>
          </div>
          <div className="text-sm font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">
            PRO
          </div>
        </div>
      </div>
    );
  }

  // Plano FREE ativo
  if (subscription.status === 'active' && subscription.plan === 'free') {
    return (
      <div className="bg-gradient-to-r from-gray-50 to-slate-50 border-2 border-gray-300 rounded-lg p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <p className="font-semibold text-gray-900">Plano FREE</p>
              <p className="text-sm text-gray-600 mt-1">
                Assinatura básica • 1 template • 1 rede social
              </p>
            </div>
          </div>
          <button
            onClick={activateProPlan}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-bold shadow-lg"
          >
            Upgrade para PRO - R$ 9,90/mês
          </button>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">🚀 Desbloqueie com PRO:</p>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div>✓ 4+ templates profissionais</div>
            <div>✓ Múltiplas redes sociais</div>
            <div>✓ Personalização de cores</div>
            <div>✓ Logo customizado</div>
            <div>✓ Sem marca d'água</div>
            <div>✓ Click Analytics</div>
          </div>
        </div>
      </div>
    );
  }

  // Trial ativo
  if (subscription.status === 'trial') {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎁</span>
            <div>
              <p className="font-semibold text-blue-900">Trial PRO - Grátis por {daysRemaining} dias</p>
              <p className="text-sm text-blue-700">
                Testando todos os recursos do plano PRO
              </p>
            </div>
          </div>
          <button
            onClick={activateProPlan}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Assinar PRO Agora
          </button>
        </div>
      </div>
    );
  }

  // Assinatura expirada
  if (subscription.status === 'expired') {
    return (
      <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚠️</span>
            <div>
              <p className="font-bold text-red-900 text-lg">Assinatura Expirada</p>
              <p className="text-sm text-red-700 mt-1">
                Escolha um plano para continuar usando o gerador
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={activateFreePlan}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Plano FREE
            </button>
            <button
              onClick={activateProPlan}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-bold shadow-lg"
            >
              Renovar PRO
            </button>
          </div>
        </div>
      </div>
    );
  }

  // status === 'none' (novo usuário)
  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-4xl">🚀</span>
          <div>
            <p className="font-bold text-purple-900 text-xl">Escolha seu Plano</p>
            <p className="text-sm text-purple-700 mt-1">
              Comece grátis ou experimente PRO por 7 dias
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={activateFreePlan}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-bold shadow-md border-2 border-gray-700"
          >
            <div className="text-left">
              <div className="text-sm">Plano FREE</div>
              <div className="text-xs opacity-90">Grátis para sempre</div>
            </div>
          </button>
          <button
            onClick={startTrial}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-bold shadow-lg"
          >
            <div className="text-left">
              <div className="text-sm">Trial PRO</div>
              <div className="text-xs opacity-90">7 dias grátis</div>
            </div>
          </button>
          <button
            onClick={activateProPlan}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-bold shadow-lg"
          >
            <div className="text-left">
              <div className="text-sm">Plano PRO</div>
              <div className="text-xs opacity-90">R$ 9,90/mês</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useSubscription } from '@/contexts/SubscriptionContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';

export default function SubscriptionBanner() {
  const { subscription, daysRemaining, activateFreePlan, activateProPlan, startTrial } = useSubscription();
  const { t } = useLanguage();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  // Plano PRO ativo
  if (subscription.status === 'active' && subscription.plan === 'pro') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-5 font-rubik">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⭐</span>
            <div>
              <p className="font-semibold text-green-900">{t('proActive')}</p>
              <p className="text-sm text-green-700">
                {daysRemaining ? `${daysRemaining} ${t('daysRemaining')}` : t('unlimitedAccess')}
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
      <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-5 font-rubik">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <p className="font-semibold text-gray-900">{t('freePlan')}</p>
              <p className="text-sm text-gray-600 mt-1">
                {t('basicCard')}
              </p>
            </div>
          </div>
          <button
            onClick={activateProPlan}
            className="px-6 py-3 bg-primary-yellow hover:bg-primary-yellow/90 text-primary-purple rounded-lg transition-colors font-bold"
          >
            {t('upgradeToProButton')}
          </button>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">🚀 {t('unlockWithPro')}</p>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div>✓ {t('professionalTemplates')}</div>
            <div>✓ {t('multipleSocials')}</div>
            <div>✓ {t('colorCustomization')}</div>
            <div>✓ {t('customLogo')}</div>
            <div>✓ {t('qrCodeGeneration')}</div>
            <div>✓ {t('noWatermark')}</div>
          </div>
        </div>
      </div>
    );
  }

  // Trial ativo
  if (subscription.status === 'trial') {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 font-rubik">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎁</span>
            <div>
              <p className="font-semibold text-blue-900">{t('trialPro').replace('7', daysRemaining?.toString() || '7')}</p>
              <p className="text-sm text-blue-700">
                {t('testingAllFeatures')}
              </p>
            </div>
          </div>
          <button
            onClick={activateProPlan}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            {t('activateProPlan')}
          </button>
        </div>
      </div>
    );
  }

  // Assinatura expirada
  if (subscription.status === 'expired') {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 font-rubik">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚠️</span>
            <div>
              <p className="font-bold text-red-900 text-lg">{t('subscriptionExpired')}</p>
              <p className="text-sm text-red-700 mt-1">
                {t('chooseToContine')}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={activateFreePlan}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              {t('freePlan')}
            </button>
            <button
              onClick={activateProPlan}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-bold"
            >
              {t('renewPro')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // status === 'none' (novo usuário)
  return (
    <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 font-rubik">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-4xl">🚀</span>
          <div>
            <p className="font-bold text-primary-purple text-xl">{t('choosePlan')}</p>
            <p className="text-sm text-gray-700 mt-1">
              {t('startFreeOrTrial')}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <button
            onClick={activateFreePlan}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-bold border-2 border-gray-700"
          >
            <div className="text-center">
              <div className="text-sm">{t('freePlan')}</div>
              <div className="text-xs opacity-90">{t('freeForeverPlan')}</div>
            </div>
          </button>
          <button
            onClick={startTrial}
            className="px-6 py-3 bg-primary-purple text-white rounded-lg hover:bg-purple-700 transition-colors font-bold"
          >
            <div className="text-center">
              <div className="text-sm">Trial PRO</div>
              <div className="text-xs opacity-90">{t('sevenDaysFree')}</div>
            </div>
          </button>
          <button
            onClick={activateProPlan}
            className="px-6 py-3 bg-primary-yellow text-primary-purple rounded-lg hover:bg-primary-yellow/90 transition-colors font-bold"
          >
            <div className="text-center">
              <div className="text-sm">Plano PRO</div>
              <div className="text-xs opacity-90">R$ 9,90{t('perMonth')}</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

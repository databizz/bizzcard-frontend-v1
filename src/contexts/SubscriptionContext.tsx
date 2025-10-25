'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { SubscriptionData, SubscriptionStatus, SubscriptionLimits } from '@/types/subscription';

interface SubscriptionContextType {
  subscription: SubscriptionData;
  limits: SubscriptionLimits;
  updateSubscription: (status: SubscriptionStatus) => void;
  activateFreePlan: () => void;
  activateProPlan: () => void;
  startTrial: () => void;
  expireSubscription: () => void;
  daysRemaining: number | null;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  // Estado inicial - usuário sem assinatura
  const [subscription, setSubscription] = useState<SubscriptionData>(() => {
    // Tenta carregar do localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('subscription_mock');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return {
      status: 'none' as SubscriptionStatus,
      expiryDate: null,
      trialEndsAt: null,
      plan: 'none' as const,
    };
  });

  // Salvar no localStorage quando mudar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('subscription_mock', JSON.stringify(subscription));
    }
  }, [subscription]);

  // Calcular dias restantes
  const daysRemaining = (): number | null => {
    const targetDate = subscription.status === 'trial'
      ? subscription.trialEndsAt
      : subscription.expiryDate;

    if (!targetDate) return null;

    const now = new Date();
    const expiry = new Date(targetDate);
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  };

  // Calcular limites baseado no plano
  const getLimits = (): SubscriptionLimits => {
    // Se está expirado ou sem plano, retorna limites zerados
    if (subscription.status === 'expired' || subscription.status === 'none') {
      return {
        canGenerateSignature: false,
        canCopySignature: false,
        canCustomizeColors: false,
        canUploadLogo: false,
        canUseMultipleSocials: false,
        hasWatermark: true,
        availableTemplates: [],
        maxSignatures: 0,
        maxSocialNetworks: 0,
      };
    }

    // Limites baseados no plano (free ou pro)
    switch (subscription.plan) {
      case 'pro':
        return {
          canGenerateSignature: true,
          canCopySignature: true,
          canCustomizeColors: true,
          canUploadLogo: true,
          canUseMultipleSocials: true,
          hasWatermark: false,
          availableTemplates: ['modern', 'classic', 'minimal', 'corporate'],
          maxSignatures: null, // ilimitado
          maxSocialNetworks: 10, // múltiplas redes sociais
        };

      case 'free':
        return {
          canGenerateSignature: true,
          canCopySignature: true, // FREE PODE COPIAR!
          canCustomizeColors: false, // cores fixas
          canUploadLogo: false, // sem logo
          canUseMultipleSocials: false,
          hasWatermark: true, // marca d'água visível
          availableTemplates: ['minimal'], // apenas 1 template
          maxSignatures: 1, // apenas 1 assinatura
          maxSocialNetworks: 1, // apenas 1 rede social
        };

      default:
        // Fallback para usuários sem plano definido
        return {
          canGenerateSignature: false,
          canCopySignature: false,
          canCustomizeColors: false,
          canUploadLogo: false,
          canUseMultipleSocials: false,
          hasWatermark: true,
          availableTemplates: [],
          maxSignatures: 0,
          maxSocialNetworks: 0,
        };
    }
  };

  // Ativar plano FREE (gratuito permanente)
  const activateFreePlan = () => {
    setSubscription({
      status: 'active',
      expiryDate: null, // FREE não expira
      trialEndsAt: null,
      plan: 'free',
    });
  };

  // Ativar plano PRO (pago)
  const activateProPlan = () => {
    const now = new Date();
    const expiryDate = new Date(now);
    expiryDate.setFullYear(expiryDate.getFullYear() + 1); // +1 ano

    setSubscription({
      status: 'active',
      expiryDate: expiryDate.toISOString(),
      trialEndsAt: null,
      plan: 'pro',
    });
  };

  // Iniciar trial do plano PRO (7 dias)
  const startTrial = () => {
    const now = new Date();
    const trialEnd = new Date(now);
    trialEnd.setDate(trialEnd.getDate() + 7); // +7 dias

    setSubscription({
      status: 'trial',
      expiryDate: null,
      trialEndsAt: trialEnd.toISOString(),
      plan: 'pro', // trial do plano PRO
    });
  };

  // Expirar assinatura (para testar)
  const expireSubscription = () => {
    setSubscription({
      status: 'expired',
      expiryDate: new Date().toISOString(),
      trialEndsAt: null,
      plan: subscription.plan,
    });
  };

  // Atualizar status manualmente (para testes)
  const updateSubscription = (status: SubscriptionStatus) => {
    setSubscription({ ...subscription, status });
  };

  const value: SubscriptionContextType = {
    subscription,
    limits: getLimits(),
    updateSubscription,
    activateFreePlan,
    activateProPlan,
    startTrial,
    expireSubscription,
    daysRemaining: daysRemaining(),
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}

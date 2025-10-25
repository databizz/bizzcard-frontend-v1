export type SubscriptionStatus = 'active' | 'expired' | 'trial' | 'none';
export type SubscriptionPlan = 'free' | 'pro' | 'none';

export interface SubscriptionData {
  status: SubscriptionStatus;
  expiryDate: string | null; // ISO date string
  trialEndsAt: string | null; // ISO date string
  plan: SubscriptionPlan;
}

export interface SubscriptionLimits {
  canGenerateSignature: boolean;
  canCopySignature: boolean;
  canCustomizeColors: boolean;
  canUploadLogo: boolean;
  canUseMultipleSocials: boolean;
  hasWatermark: boolean;
  availableTemplates: string[]; // IDs dos templates disponíveis
  maxSignatures: number | null; // null = unlimited
  maxSocialNetworks: number; // Quantidade máxima de redes sociais
}

'use client';

import { ReactNode } from 'react';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <SubscriptionProvider>
        {children}
      </SubscriptionProvider>
    </LanguageProvider>
  );
}

'use client';

import { ReactNode } from 'react';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { CardsProvider } from '@/contexts/CardsContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <SubscriptionProvider>
        <CardsProvider>
          {children}
        </CardsProvider>
      </SubscriptionProvider>
    </LanguageProvider>
  );
}

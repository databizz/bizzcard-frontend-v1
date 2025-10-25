'use client';

import { ReactNode } from 'react';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SubscriptionProvider>
      {children}
    </SubscriptionProvider>
  );
}

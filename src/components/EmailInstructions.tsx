'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface EmailClient {
  id: string;
  name: string;
  icon: string;
  steps: string[];
}

export default function EmailInstructions() {
  const { t } = useLanguage();
  const [activeClient, setActiveClient] = useState<string>('gmail');

  const emailClients: EmailClient[] = [
    {
      id: 'gmail',
      name: 'Gmail / Google Workspace',
      icon: '📧',
      steps: [
        t('gmailStep1'),
        t('gmailStep2'),
        t('gmailStep3'),
        t('gmailStep4'),
        t('gmailStep5'),
        t('gmailStep6'),
        t('gmailStep7'),
      ],
    },
    {
      id: 'outlook-web',
      name: 'Outlook Web (Office 365)',
      icon: '🌐',
      steps: [
        t('outlookWebStep1'),
        t('outlookWebStep2'),
        t('outlookWebStep3'),
        t('outlookWebStep4'),
        t('outlookWebStep5'),
        t('outlookWebStep6'),
        t('outlookWebStep7'),
      ],
    },
    {
      id: 'outlook-desktop',
      name: 'Outlook Desktop (Windows)',
      icon: '💼',
      steps: [
        t('outlookDesktopStep1'),
        t('outlookDesktopStep2'),
        t('outlookDesktopStep3'),
        t('outlookDesktopStep4'),
        t('outlookDesktopStep5'),
        t('outlookDesktopStep6'),
        t('outlookDesktopStep7'),
        t('outlookDesktopStep8'),
      ],
    },
    {
      id: 'apple-mail',
      name: 'Apple Mail (macOS)',
      icon: '🍎',
      steps: [
        t('appleMailStep1'),
        t('appleMailStep2'),
        t('appleMailStep3'),
        t('appleMailStep4'),
        t('appleMailStep5'),
        t('appleMailStep6'),
        t('appleMailStep7'),
        t('appleMailStep8'),
      ],
    },
    {
      id: 'thunderbird',
      name: 'Thunderbird',
      icon: '🦅',
      steps: [
        t('thunderbirdStep1'),
        t('thunderbirdStep2'),
        t('thunderbirdStep3'),
        t('thunderbirdStep4'),
        t('thunderbirdStep5'),
        t('thunderbirdStep6'),
        t('thunderbirdStep7'),
        t('thunderbirdStep8'),
      ],
    },
    {
      id: 'yahoo',
      name: 'Yahoo Mail',
      icon: '🟣',
      steps: [
        t('yahooStep1'),
        t('yahooStep2'),
        t('yahooStep3'),
        t('yahooStep4'),
        t('yahooStep5'),
        t('yahooStep6'),
        t('yahooStep7'),
        t('yahooStep8'),
        t('yahooStep9'),
      ],
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <h3 className="text-white font-semibold text-lg flex items-center gap-2">
          💡 {t('howToAddSignature')}
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
          <strong>💡 {t('tipLabel')}</strong> {t('emailInstructionsTip')}
        </p>
      </div>
    </div>
  );
}

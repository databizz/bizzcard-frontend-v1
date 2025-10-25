'use client';

import { useState } from 'react';
import SignatureForm from '@/components/SignatureForm';
import SignaturePreview from '@/components/SignaturePreview';
import EmailInstructions from '@/components/EmailInstructions';
import SubscriptionBanner from '@/components/SubscriptionBanner';
import SubscriptionMockControls from '@/components/SubscriptionMockControls';
import { SignatureData } from '@/types/signature';
import { useSubscription } from '@/contexts/SubscriptionContext';

export default function Home() {
  const { limits, subscription } = useSubscription();
  const [signatureData, setSignatureData] = useState<SignatureData>({
    name: 'Seu Nome',
    role: 'Seu Cargo',
    company: 'Sua Empresa',
    phone: '+55 (00) 00000-0000',
    email: 'seu.email@empresa.com.br',
    website: 'https://www.suaempresa.com.br',
    address: 'Cidade | Estado',
    socialMedia: {
      instagram: '',
      linkedin: '',
    },
    primaryColor: '#3B82F6',
    secondaryColor: '#1E40AF',
    template: 'modern',
  });

  const presetTemplates = [
    {
      name: 'Advogado / Advocacia',
      icon: '⚖️',
      data: {
        name: 'Seu Nome',
        role: 'Advogado',
        company: 'Nome do Escritório',
        phone: '+55 (00) 00000-0000',
        email: 'advogado@escritorio.com.br',
        website: 'https://www.escritorio.com.br',
        address: 'Cidade | Estado',
        socialMedia: { instagram: '', linkedin: '' },
        primaryColor: '#8B4513',
        secondaryColor: '#654321',
        template: 'modern' as const,
      },
    },
    {
      name: 'Empresarial / Corporativo',
      icon: '💼',
      data: {
        name: 'Seu Nome',
        role: 'Seu Cargo',
        company: 'Nome da Empresa',
        phone: '+55 (00) 00000-0000',
        email: 'nome@empresa.com.br',
        website: 'https://www.empresa.com.br',
        address: 'Cidade | Estado',
        socialMedia: { instagram: '', linkedin: '' },
        primaryColor: '#1E40AF',
        secondaryColor: '#1E3A8A',
        template: 'corporate' as const,
      },
    },
    {
      name: 'Tecnologia / Startups',
      icon: '🚀',
      data: {
        name: 'Seu Nome',
        role: 'Seu Cargo',
        company: 'Nome da Startup',
        phone: '+55 (00) 00000-0000',
        email: 'nome@startup.com',
        website: 'https://www.startup.com',
        address: 'Cidade | Estado',
        socialMedia: { instagram: '', linkedin: '' },
        primaryColor: '#7C3AED',
        secondaryColor: '#5B21B6',
        template: 'modern' as const,
      },
    },
    {
      name: 'Minimalista / Clean',
      icon: '✨',
      data: {
        name: 'Seu Nome',
        role: 'Seu Cargo',
        company: 'Sua Empresa',
        phone: '+55 (00) 00000-0000',
        email: 'seu.email@empresa.com',
        website: 'https://www.empresa.com',
        address: 'Cidade',
        socialMedia: {},
        primaryColor: '#000000',
        secondaryColor: '#333333',
        template: 'minimal' as const,
      },
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Gerador de Assinaturas de Email
          </h1>
          <p className="mt-2 text-gray-600">
            Crie assinaturas profissionais e personalizadas para seus emails
          </p>
        </div>
      </div>

      {/* Subscription Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <SubscriptionBanner />
      </div>

      {/* Preset Templates */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Templates Prontos</h2>
            {subscription.plan === 'free' && (
              <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                FREE: apenas Minimalista disponível
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {presetTemplates.map((preset, index) => {
              const isAvailable = limits.availableTemplates.includes(preset.data.template);
              const isLocked = !isAvailable;

              return (
                <button
                  key={index}
                  onClick={() => isAvailable && setSignatureData(preset.data)}
                  disabled={isLocked}
                  className={`p-4 border-2 rounded-lg text-left transition-all relative ${
                    isLocked
                      ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                      : 'border-gray-200 hover:border-blue-500 hover:shadow-md group'
                  }`}
                >
                  {isLocked && (
                    <div className="absolute top-2 right-2 text-2xl">🔒</div>
                  )}
                  <div className="text-3xl mb-2">{preset.icon}</div>
                  <div className={`font-semibold ${isLocked ? 'text-gray-500' : 'text-gray-800 group-hover:text-blue-600 transition-colors'}`}>
                    {preset.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {isLocked ? '🔒 Upgrade para PRO' : 'Clique para usar este estilo'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Column */}
          <div>
            <SignatureForm data={signatureData} onChange={setSignatureData} />
          </div>

          {/* Preview Column */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <SignaturePreview data={signatureData} />
          </div>
        </div>
      </div>

      {/* Email Instructions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmailInstructions />
      </div>

      {/* Quick Tips */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            📌 Dicas Importantes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div className="flex items-start gap-2">
              <span className="text-xl">⚙️</span>
              <div>
                <strong>Google Workspace:</strong> Não esqueça de configurar os "Padrões de Assinatura"
                para que a assinatura apareça automaticamente em novos emails.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xl">🎨</span>
              <div>
                <strong>Personalização:</strong> Use o seletor de cores para combinar com a
                identidade visual da sua empresa.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xl">📱</span>
              <div>
                <strong>Mobile:</strong> As assinaturas são responsivas e funcionam
                perfeitamente em dispositivos móveis.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xl">🔗</span>
              <div>
                <strong>Links:</strong> Use URLs públicas para logos (Imgur, Dropbox,
                ou seu próprio site).
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-gray-400">
            Gerador de Assinaturas de Email - Crie assinaturas profissionais em minutos
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Desenvolvido com Next.js e Tailwind CSS
          </p>
        </div>
      </footer>

      {/* Mock Controls - Remove em produção */}
      <SubscriptionMockControls />
    </main>
  );
}

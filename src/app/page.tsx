'use client';

import { useState, useEffect } from 'react';
import SignatureForm from '@/components/SignatureForm';
import SignaturePreview from '@/components/SignaturePreview';
import EmailInstructions from '@/components/EmailInstructions';
import SubscriptionBanner from '@/components/SubscriptionBanner';
import SubscriptionMockControls from '@/components/SubscriptionMockControls';
import { SignatureData } from '@/types/signature';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Home() {
  const { limits, subscription } = useSubscription();
  const { t, language, setLanguage } = useLanguage();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
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
    template: 'minimal', // Começa com minimal que está sempre disponível
  });

  const presetTemplates = [
    {
      name: t('lawyerLaw'),
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
        template: 'minimal' as const, // Mudado para minimal pois modern pode estar bloqueado
      },
    },
    {
      name: t('businessCorporate'),
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
      name: t('technologyStartups'),
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
        template: 'minimal' as const, // Mudado para minimal pois modern pode estar bloqueado
      },
    },
    {
      name: t('minimalistClean'),
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
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-xl shadow-lg">
                <span className="text-white text-xl font-bold">G</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                  GenSign
                </h1>
                <p className="text-xs text-gray-500">{t('professionalEmailSignatures')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  {t('freeForever')}
                </span>
                <span className="text-gray-300">•</span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                  </svg>
                  1000+ {t('users')}
                </span>
              </div>
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'pt-BR' ? 'en' : 'pt-BR')}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium text-gray-700"
                title={language === 'pt-BR' ? 'Switch to English' : 'Mudar para Português'}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span className="hidden sm:inline">{language === 'pt-BR' ? 'PT' : 'EN'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-3">
        <div className="text-center mb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('createYourPerfect')}
            <span className="block bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent mt-2 pb-1">
              {t('emailSignature')}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 mt-3">
            {t('heroDescription')}
          </p>
        </div>

        {/* Subscription Banner */}
        <SubscriptionBanner />
      </div>

      {/* Preset Templates */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{t('quickStartTemplates')}</h2>
              <p className="text-sm text-gray-600 mt-1">{t('templatesDescription')}</p>
            </div>
            {isClient && subscription.plan === 'free' && (
              <span className="text-xs bg-gradient-to-r from-gray-100 to-gray-50 text-gray-600 px-4 py-2 rounded-full border border-gray-200 font-medium">
                {t('freeMinimalOnly')}
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {presetTemplates.map((preset, index) => {
              const isAvailable = isClient ? limits.availableTemplates.includes(preset.data.template) : true;
              const isLocked = !isAvailable;

              return (
                <button
                  key={index}
                  onClick={() => isAvailable && setSignatureData(preset.data)}
                  disabled={isLocked}
                  className={`group relative p-6 rounded-2xl text-left transition-all duration-300 ${
                    isLocked
                      ? 'bg-gray-50 border-2 border-gray-200 opacity-60 cursor-not-allowed'
                      : 'bg-white border-2 border-gray-200 hover:border-indigo-400 hover:shadow-xl hover:scale-105 hover:-translate-y-1'
                  }`}
                >
                  {isClient && isLocked && (
                    <div className="absolute top-3 right-3 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  )}
                  <div className="text-4xl mb-3">{preset.icon}</div>
                  <div className={`font-bold text-base mb-2 ${isLocked ? 'text-gray-500' : 'text-gray-900 group-hover:text-indigo-600 transition-colors'}`}>
                    {preset.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {isClient && isLocked ? (
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                        </svg>
                        {t('proOnly')}
                      </span>
                    ) : (
                      t('clickToApply')
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <EmailInstructions />
      </div>

      {/* Quick Tips */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-gradient-to-br from-indigo-50 via-white to-cyan-50 border-2 border-indigo-100 rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {t('proTips')}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-white/60 backdrop-blur rounded-2xl border border-white/40">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <strong className="text-gray-900 font-semibold block mb-1">{t('gmailSetup')}</strong>
                <p className="text-sm text-gray-600">{t('gmailSetupDesc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur rounded-2xl border border-white/40">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <div>
                <strong className="text-gray-900 font-semibold block mb-1">{t('brandColors')}</strong>
                <p className="text-sm text-gray-600">{t('brandColorsDesc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur rounded-2xl border border-white/40">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <strong className="text-gray-900 font-semibold block mb-1">{t('mobileReady')}</strong>
                <p className="text-sm text-gray-600">{t('mobileReadyDesc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur rounded-2xl border border-white/40">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <div>
                <strong className="text-gray-900 font-semibold block mb-1">{t('logoHosting')}</strong>
                <p className="text-sm text-gray-600">{t('logoHostingDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-12 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-xl shadow-lg">
                <span className="text-white text-xl font-bold">G</span>
              </div>
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  GenSign
                </div>
                <p className="text-xs text-gray-400">{t('professionalEmailSignatures')}</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-indigo-400 transition-colors">{t('about')}</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">{t('features')}</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">{t('pricing')}</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">{t('contact')}</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 GenSign. {t('allRightsReserved')}
            </p>
            <p className="text-gray-500 text-xs mt-2">
              {t('builtWith')} ❤️ {t('using')}
            </p>
          </div>
        </div>
      </footer>

      {/* Mock Controls - Remove em produção */}
      <SubscriptionMockControls />
    </main>
  );
}

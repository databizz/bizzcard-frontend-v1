'use client';

import { useState } from 'react';
import SignatureForm from '@/components/SignatureForm';
import SignaturePreview from '@/components/SignaturePreview';
import SubscriptionBanner from '@/components/SubscriptionBanner';
import SubscriptionMockControls from '@/components/SubscriptionMockControls';
import { SignatureData, PlatformType } from '@/types/signature';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Home() {
  const { t, language, setLanguage } = useLanguage();

  const [signatureData, setSignatureData] = useState<SignatureData>({
    name: 'Seu Nome',
    role: 'Seu Cargo',
    company: 'Sua Empresa',
    phone: '+55 (00) 00000-0000',
    email: 'seu.email@empresa.com.br',
    website: 'https://www.suaempresa.com.br',
    address: 'Cidade | Estado',
    platform: 'email',
    socialMedia: {
      instagram: '',
      linkedin: '',
    },
    primaryColor: '#FFC400',
    secondaryColor: '#84087E',
    template: 'minimal',
  });

  const platformFeatures: Array<{
    id: PlatformType;
    icon: string;
    title: string;
    desc: string;
  }> = [
    {
      id: 'email',
      icon: '📧',
      title: t('emailSignature'),
      desc: t('emailSignatureDesc'),
    },
    {
      id: 'instagram',
      icon: '📱',
      title: t('instagramBio'),
      desc: t('instagramBioDesc'),
    },
    {
      id: 'linkedin',
      icon: '💼',
      title: t('linkedinProfile'),
      desc: t('linkedinProfileDesc'),
    },
    {
      id: 'whatsapp',
      icon: '💬',
      title: t('whatsappStatus'),
      desc: t('whatsappStatusDesc'),
    },
    {
      id: 'embed',
      icon: '🌐',
      title: t('embedWebsite'),
      desc: t('embedWebsiteDesc'),
    },
    {
      id: 'vcard',
      icon: '💾',
      title: t('vcardDownload'),
      desc: t('vcardDownloadDesc'),
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40 backdrop-blur-sm bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-7 h-7 bg-primary-purple rounded-lg">
                <span className="text-white text-base font-bold font-rubik">B</span>
              </div>
              <h1 className="text-lg font-semibold text-gray-900 font-rubik">
                {t('brandName')}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'pt-BR' ? 'en' : 'pt-BR')}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium text-gray-600 font-rubik"
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
      <div className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-rubik mb-6 leading-tight text-gray-900">
              {t('createYourPerfect')}
              <span className="block text-primary-purple mt-2">
                {t('digitalBusinessCard')}
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 font-rubik leading-relaxed">
              {t('heroDescription')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#customize"
                className="px-8 py-3 bg-primary-purple hover:bg-primary-purple/90 text-white font-semibold rounded-lg transition-colors font-rubik text-base"
              >
                {t('getStartedFree')}
              </a>
              <a
                href="#templates"
                className="px-8 py-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-lg border-2 border-gray-200 transition-colors font-rubik text-base"
              >
                {t('viewTemplates')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Platforms Section */}
      <div className="py-16 bg-gray-50" id="platforms">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-rubik">
              {t('selectPlatform')}
            </h3>
            <p className="text-lg text-gray-600 font-rubik">{t('platformsDescription')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformFeatures.map((feature) => (
              <button
                key={feature.id}
                onClick={() => {
                  setSignatureData({ ...signatureData, platform: feature.id });
                  // Scroll to customize section
                  document.getElementById('customize')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all border-2 text-left w-full ${
                  signatureData.platform === feature.id
                    ? 'border-primary-purple ring-2 ring-primary-purple ring-opacity-50'
                    : 'border-gray-100 hover:border-primary-yellow'
                }`}
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2 font-rubik">{feature.title}</h4>
                <p className="text-sm text-gray-600 font-rubik">{feature.desc}</p>
                {signatureData.platform === feature.id && (
                  <div className="mt-3 text-sm font-semibold text-primary-purple font-rubik">
                    ✓ {language === 'pt-BR' ? 'Selecionado' : 'Selected'}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Subscription Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SubscriptionBanner />
      </div>

      {/* Main Content - Form and Preview */}
      <div id="customize" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-3 font-rubik">
            {t('customize')}
          </h3>
          <p className="text-gray-600 font-rubik">{t('templatesDescription')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Column */}
          <div>
            <SignatureForm data={signatureData} onChange={setSignatureData} />
          </div>

          {/* Preview Column */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SignaturePreview data={signatureData} />
          </div>
        </div>
      </div>

      {/* Pro Tips */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-3 font-rubik">
              {t('proTips')}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-primary-yellow transition-colors">
              <div className="w-12 h-12 bg-primary-yellow rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <strong className="text-gray-900 font-bold block mb-2 font-rubik">{t('qrCodeTip')}</strong>
              <p className="text-sm text-gray-600 font-rubik">{t('qrCodeTipDesc')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-primary-purple transition-colors">
              <div className="w-12 h-12 bg-primary-purple rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <strong className="text-gray-900 font-bold block mb-2 font-rubik">{t('multiPlatformTip')}</strong>
              <p className="text-sm text-gray-600 font-rubik">{t('multiPlatformTipDesc')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-green-500 transition-colors">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <strong className="text-gray-900 font-bold block mb-2 font-rubik">{t('mobileReady')}</strong>
              <p className="text-sm text-gray-600 font-rubik">{t('mobileReadyDesc')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-500 transition-colors">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <strong className="text-gray-900 font-bold block mb-2 font-rubik">{t('brandColors')}</strong>
              <p className="text-sm text-gray-600 font-rubik">{t('brandColorsDesc')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-orange-500 transition-colors">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <strong className="text-gray-900 font-bold block mb-2 font-rubik">{t('logoHosting')}</strong>
              <p className="text-sm text-gray-600 font-rubik">{t('logoHostingDesc')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-primary-yellow transition-colors">
              <div className="w-12 h-12 bg-primary-yellow rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <strong className="text-gray-900 font-bold block mb-2 font-rubik">{t('whatsappIntegration')}</strong>
              <p className="text-sm text-gray-600 font-rubik">{t('whatsappIntegrationDesc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary-purple rounded-lg">
                <span className="text-white text-xl font-bold font-rubik">B</span>
              </div>
              <div>
                <div className="text-xl font-bold text-white font-rubik">
                  {t('brandName')}
                </div>
                <p className="text-xs text-gray-400 font-rubik">{t('tagline')}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors font-rubik">{t('about')}</a>
              <a href="#" className="hover:text-white transition-colors font-rubik">{t('features')}</a>
              <a href="#" className="hover:text-white transition-colors font-rubik">{t('pricing')}</a>
              <a href="#" className="hover:text-white transition-colors font-rubik">{t('contact')}</a>
              <a href="#" className="hover:text-white transition-colors font-rubik">{t('privacy')}</a>
              <a href="#" className="hover:text-white transition-colors font-rubik">{t('terms')}</a>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm font-rubik">
              © 2025 BizzCard. {t('allRightsReserved')}
            </p>
            <p className="text-gray-500 text-xs mt-2 font-rubik">
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

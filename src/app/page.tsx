'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useCards } from '@/contexts/CardsContext';
import Link from 'next/link';

export default function Home() {
  const { t, language, setLanguage } = useLanguage();
  const { cards } = useCards();

  const features = [
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      ),
      titlePt: 'Design Profissional',
      titleEn: 'Professional Design',
      descPt: 'Escolha entre 6 templates modernos e personalize cores',
      descEn: 'Choose from 6 modern templates and customize colors',
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
          <path d="M12 18h.01"/>
          <rect x="8" y="7" width="8" height="8" fill="currentColor" fillOpacity="0.2"/>
        </svg>
      ),
      titlePt: 'QR Code Integrado',
      titleEn: 'Integrated QR Code',
      descPt: 'Cada cartão tem seu QR Code único para compartilhar facilmente',
      descEn: 'Each card has its unique QR Code for easy sharing',
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      titlePt: 'Assinatura de Email',
      titleEn: 'Email Signature',
      descPt: 'Gere assinaturas HTML para Gmail, Outlook e Apple Mail',
      descEn: 'Generate HTML signatures for Gmail, Outlook and Apple Mail',
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
        </svg>
      ),
      titlePt: 'Redes Sociais',
      titleEn: 'Social Networks',
      descPt: 'Adicione links para Instagram, LinkedIn, Facebook e mais',
      descEn: 'Add links to Instagram, LinkedIn, Facebook and more',
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      ),
      titlePt: 'WhatsApp Direto',
      titleEn: 'Direct WhatsApp',
      descPt: 'Link direto para conversas no WhatsApp',
      descEn: 'Direct link to WhatsApp conversations',
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
      ),
      titlePt: 'Cartões Ilimitados',
      titleEn: 'Unlimited Cards',
      descPt: 'Crie quantos cartões precisar - pessoal, profissional, etc',
      descEn: 'Create as many cards as you need - personal, professional, etc',
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

              {cards.length > 0 && (
                <Link
                  href="/dashboard"
                  className="px-4 py-1.5 bg-primary-purple hover:bg-primary-purple/90 text-white font-medium rounded-lg transition-colors text-sm font-rubik"
                >
                  {language === 'pt-BR' ? 'Meus Cartões' : 'My Cards'}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-yellow/10 via-white to-primary-purple/10 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-rubik mb-6 leading-tight text-gray-900">
              {language === 'pt-BR' ? 'Crie Seu Cartão' : 'Create Your'}
              <span className="block text-primary-purple mt-2">
                {language === 'pt-BR' ? 'Virtual Digital' : 'Digital Card'}
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 font-rubik leading-relaxed">
              {language === 'pt-BR'
                ? 'Cartões virtuais profissionais com QR Code e assinatura de email. Compartilhe suas informações de forma moderna e eficiente.'
                : 'Professional digital cards with QR Code and email signature. Share your information in a modern and efficient way.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={cards.length > 0 ? '/dashboard' : '/card/create'}
                className="px-8 py-4 bg-primary-purple hover:bg-primary-purple/90 text-white font-semibold rounded-lg transition-colors font-rubik text-base shadow-lg shadow-primary-purple/20"
              >
                {cards.length > 0
                  ? (language === 'pt-BR' ? 'Ver Meus Cartões' : 'View My Cards')
                  : (language === 'pt-BR' ? 'Criar Meu Cartão Grátis' : 'Create My Free Card')}
              </Link>
              {cards.length > 0 && (
                <Link
                  href="/card/create"
                  className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-lg border-2 border-gray-200 transition-colors font-rubik text-base"
                >
                  {language === 'pt-BR' ? 'Criar Novo Cartão' : 'Create New Card'}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-rubik">
              {language === 'pt-BR' ? 'Tudo que você precisa' : 'Everything you need'}
            </h3>
            <p className="text-lg text-gray-600 font-rubik">
              {language === 'pt-BR'
                ? 'Recursos profissionais para seu cartão virtual'
                : 'Professional features for your digital card'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-primary-purple hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 mb-6 text-primary-purple group-hover:text-primary-yellow transition-colors flex items-center justify-center bg-primary-purple/5 rounded-xl group-hover:bg-primary-yellow/10">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 font-rubik">
                  {language === 'pt-BR' ? feature.titlePt : feature.titleEn}
                </h4>
                <p className="text-gray-600 font-rubik">
                  {language === 'pt-BR' ? feature.descPt : feature.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-rubik">
              {language === 'pt-BR' ? 'Como funciona' : 'How it works'}
            </h3>
            <p className="text-lg text-gray-600 font-rubik">
              {language === 'pt-BR'
                ? 'Simples e rápido em 3 passos'
                : 'Simple and fast in 3 steps'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-purple rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3 font-rubik">
                {language === 'pt-BR' ? 'Preencha seus dados' : 'Fill in your data'}
              </h4>
              <p className="text-gray-600 font-rubik">
                {language === 'pt-BR'
                  ? 'Adicione nome, cargo, empresa, contatos e redes sociais'
                  : 'Add name, position, company, contacts and social networks'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-yellow rounded-full flex items-center justify-center mx-auto mb-6 text-primary-purple text-2xl font-bold">
                2
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3 font-rubik">
                {language === 'pt-BR' ? 'Personalize o design' : 'Customize the design'}
              </h4>
              <p className="text-gray-600 font-rubik">
                {language === 'pt-BR'
                  ? 'Escolha template, cores e adicione seu logo'
                  : 'Choose template, colors and add your logo'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-purple rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3 font-rubik">
                {language === 'pt-BR' ? 'Compartilhe' : 'Share'}
              </h4>
              <p className="text-gray-600 font-rubik">
                {language === 'pt-BR'
                  ? 'Use o QR Code ou gere sua assinatura de email'
                  : 'Use the QR Code or generate your email signature'}
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/card/create"
              className="inline-block px-8 py-4 bg-primary-purple hover:bg-primary-purple/90 text-white font-semibold rounded-lg transition-colors font-rubik text-base shadow-lg shadow-primary-purple/20"
            >
              {language === 'pt-BR' ? 'Começar Agora' : 'Get Started'}
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-primary-purple to-primary-purple/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-rubik">
            {language === 'pt-BR'
              ? 'Pronto para criar seu cartão virtual?'
              : 'Ready to create your digital card?'}
          </h3>
          <p className="text-xl text-white/90 mb-8 font-rubik">
            {language === 'pt-BR'
              ? 'Junte-se a milhares de profissionais que já modernizaram sua forma de compartilhar contatos'
              : 'Join thousands of professionals who have modernized their way of sharing contacts'}
          </p>
          <Link
            href="/card/create"
            className="inline-block px-8 py-4 bg-white hover:bg-gray-100 text-primary-purple font-semibold rounded-lg transition-colors font-rubik text-base shadow-lg"
          >
            {language === 'pt-BR' ? 'Criar Cartão Grátis' : 'Create Free Card'}
          </Link>
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
                <p className="text-xs text-gray-400 font-rubik">
                  {language === 'pt-BR'
                    ? 'Cartões virtuais profissionais'
                    : 'Professional digital cards'}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <Link href="/#features" className="hover:text-white transition-colors font-rubik">
                {language === 'pt-BR' ? 'Recursos' : 'Features'}
              </Link>
              <Link href="/dashboard" className="hover:text-white transition-colors font-rubik">
                {language === 'pt-BR' ? 'Dashboard' : 'Dashboard'}
              </Link>
              <Link href="/card/create" className="hover:text-white transition-colors font-rubik">
                {language === 'pt-BR' ? 'Criar Cartão' : 'Create Card'}
              </Link>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm font-rubik">
              © 2025 <a href="https://databizz.com.br/" target="_blank" rel="noopener noreferrer" className="text-primary-yellow hover:text-primary-yellow/80 transition-colors">Databizz</a>. {t('allRightsReserved')}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

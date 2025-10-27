'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useCards } from '@/contexts/CardsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import CardForm from '@/components/CardForm';
import CardPreview from '@/components/CardPreview';
import { SignatureData } from '@/types/signature';
import Link from 'next/link';

export default function EditCard() {
  const router = useRouter();
  const params = useParams();
  const { getCard, updateCard } = useCards();
  const { t, language, setLanguage } = useLanguage();

  const [cardData, setCardData] = useState<SignatureData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cardId = params.id as string;
    const card = getCard(cardId);

    if (card) {
      setCardData({
        name: card.name,
        role: card.role,
        company: card.company,
        phone: card.phone,
        email: card.email,
        website: card.website,
        address: card.address,
        whatsapp: card.whatsapp,
        socialMedia: card.socialMedia,
        logo: card.logo,
        primaryColor: card.primaryColor,
        secondaryColor: card.secondaryColor,
        template: card.template,
        id: card.id,
      });
    }
    setLoading(false);
  }, [params.id, getCard]);

  const handleSave = () => {
    if (!cardData || !cardData.name || !cardData.email) {
      alert(language === 'pt-BR' ? 'Por favor, preencha nome e email' : 'Please fill in name and email');
      return;
    }

    updateCard(params.id as string, cardData);
    router.push(`/card/${params.id}`);
  };

  const handleCancel = () => {
    router.push(`/card/${params.id}`);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-rubik">
            {language === 'pt-BR' ? 'Carregando...' : 'Loading...'}
          </p>
        </div>
      </main>
    );
  }

  if (!cardData) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-rubik">
            {language === 'pt-BR' ? 'Cartão não encontrado' : 'Card not found'}
          </h2>
          <Link
            href="/dashboard"
            className="inline-block px-6 py-3 bg-primary-purple hover:bg-primary-purple/90 text-white font-semibold rounded-lg transition-colors font-rubik"
          >
            {language === 'pt-BR' ? 'Voltar ao Dashboard' : 'Back to Dashboard'}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40 backdrop-blur-sm bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-7 h-7 bg-primary-purple rounded-lg">
                <span className="text-white text-base font-bold font-rubik">B</span>
              </div>
              <h1 className="text-lg font-semibold text-gray-900 font-rubik">
                {t('brandName')}
              </h1>
            </Link>
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 font-rubik">
            {t('editCard')}
          </h2>
          <p className="text-gray-600 mt-2 font-rubik">
            {t('updateCardInfo')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Column */}
          <div>
            <CardForm data={cardData} onChange={setCardData} />

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-3 bg-primary-purple hover:bg-primary-purple/90 text-white font-semibold rounded-lg transition-colors font-rubik"
              >
                {t('saveChanges')}
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg border-2 border-gray-200 transition-colors font-rubik"
              >
                {t('cancel')}
              </button>
            </div>
          </div>

          {/* Preview Column */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              {/* Header com ícone */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary-purple rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-rubik">
                  {t('preview')}
                </h3>
              </div>

              {/* Preview do cartão */}
              <CardPreview
                card={{
                  ...cardData,
                  id: cardData.id || 'preview',
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                }}
                showQRCode={false}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

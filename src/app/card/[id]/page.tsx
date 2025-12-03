'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useCards } from '@/contexts/CardsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import CardPreview from '@/components/CardPreview';
import { Card } from '@/types/signature';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';

export default function ViewCard() {
  const params = useParams();
  const { getCard, exportCard } = useCards();
  const { t, language, setLanguage } = useLanguage();

  const [card, setCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);
  const [showQRModal, setShowQRModal] = useState(false);

  useEffect(() => {
    const cardId = params.id as string;
    const foundCard = getCard(cardId);

    if (foundCard) {
      setCard(foundCard);
    }
    setLoading(false);
  }, [params.id, getCard]);

  const cardUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/card/${params.id}`
    : '';

  const handleDownloadQR = () => {
    const svg = document.getElementById('qr-code-download');
    if (!svg) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = 512;
      canvas.height = 512;
      ctx?.drawImage(img, 0, 0, 512, 512);
      canvas.toBlob((blob) => {
        if (blob) {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `${card?.name.replace(/\s+/g, '-')}-qrcode.png`;
          link.click();
        }
      });
      URL.revokeObjectURL(url);
    };

    img.src = url;
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

  if (!card) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-rubik">
            {language === 'pt-BR' ? 'Cartão não encontrado' : 'Card not found'}
          </h2>
          <p className="text-gray-600 mb-6 font-rubik">
            {language === 'pt-BR'
              ? 'Este cartão não existe ou foi removido'
              : 'This card does not exist or has been removed'}
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-primary-purple hover:bg-primary-purple/90 text-white font-semibold rounded-lg transition-colors font-rubik"
          >
            {language === 'pt-BR' ? 'Ir para Home' : 'Go to Home'}
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
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-7 h-7 bg-primary-purple rounded-lg">
                <span className="text-white text-base font-bold font-rubik">B</span>
              </div>
              <h1 className="text-lg font-semibold text-gray-900 font-rubik">
                {t('brandName')}
              </h1>
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === 'pt-BR' ? 'en' : 'pt-BR')}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium text-gray-600 font-rubik"
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <CardPreview card={card} showQRCode={false} />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => setShowQRModal(true)}
            className="px-6 py-3 bg-primary-purple hover:bg-primary-purple/90 text-white font-semibold rounded-lg transition-colors font-rubik flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            {language === 'pt-BR' ? 'Ver QR Code' : 'View QR Code'}
          </button>

          <Link
            href={`/card/${card.id}/signature`}
            className="px-6 py-3 bg-primary-yellow hover:bg-primary-yellow/90 text-primary-purple font-semibold rounded-lg transition-colors font-rubik flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {language === 'pt-BR' ? 'Gerar Assinatura' : 'Generate Signature'}
          </Link>

          <button
            onClick={() => exportCard(card.id)}
            className="px-6 py-3 bg-green-50 hover:bg-green-100 text-green-700 font-semibold rounded-lg border-2 border-green-200 transition-colors font-rubik flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {language === 'pt-BR' ? 'Exportar' : 'Export'}
          </button>

          <Link
            href={`/card/edit/${card.id}`}
            className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg border-2 border-gray-200 transition-colors font-rubik flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            {language === 'pt-BR' ? 'Editar' : 'Edit'}
          </Link>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowQRModal(false)}
        >
          <div
            className="bg-white rounded-xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 font-rubik mb-2">
                {language === 'pt-BR' ? 'QR Code do Cartão' : 'Card QR Code'}
              </h3>
              <p className="text-gray-600 font-rubik">
                {language === 'pt-BR'
                  ? 'Escaneie para ver o cartão completo'
                  : 'Scan to view the full card'}
              </p>
            </div>

            <div className="flex justify-center mb-6 bg-white p-6 rounded-lg border-2 border-gray-200">
              <QRCodeSVG
                id="qr-code-download"
                value={cardUrl}
                size={256}
                level="H"
                includeMargin={true}
              />
            </div>

            <div className="space-y-3">
              <button
                onClick={handleDownloadQR}
                className="w-full px-6 py-3 bg-primary-purple hover:bg-primary-purple/90 text-white font-semibold rounded-lg transition-colors font-rubik flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {language === 'pt-BR' ? 'Baixar QR Code' : 'Download QR Code'}
              </button>

              <button
                onClick={() => setShowQRModal(false)}
                className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors font-rubik"
              >
                {language === 'pt-BR' ? 'Fechar' : 'Close'}
              </button>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 font-rubik text-center">
                {language === 'pt-BR'
                  ? 'Este QR Code pode ser impresso em materiais físicos ou compartilhado digitalmente'
                  : 'This QR Code can be printed on physical materials or shared digitally'}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

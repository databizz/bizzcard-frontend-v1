'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useCards } from '@/contexts/CardsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/types/signature';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';

export default function EmailSignature() {
  const params = useParams();
  const { getCard } = useCards();
  const { language, setLanguage } = useLanguage();

  const [card, setCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

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

  const generateSignatureHTML = (card: Card): string => {
    return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; line-height: 1.5; color: #333333; max-width: 600px;">
  <tr>
    <td style="padding: 20px 0; border-bottom: 2px solid ${card.primaryColor};">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          ${card.logo ? `
          <td style="padding-right: 20px; vertical-align: top;">
            <img src="${card.logo}" alt="${card.company}" width="80" height="80" style="display: block; border-radius: 8px;" />
          </td>
          ` : ''}
          <td style="vertical-align: top;">
            <div style="font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 4px;">
              ${card.name}
            </div>
            <div style="font-size: 14px; color: ${card.secondaryColor}; font-weight: 600; margin-bottom: 2px;">
              ${card.role}
            </div>
            ${card.company ? `
            <div style="font-size: 13px; color: #6b7280; margin-bottom: 12px;">
              ${card.company}
            </div>
            ` : ''}
            <div style="font-size: 13px; color: #4b5563; line-height: 1.8;">
              ${card.email ? `
              <div style="margin-bottom: 4px;">
                📧 <a href="mailto:${card.email}" style="color: ${card.secondaryColor}; text-decoration: none;">${card.email}</a>
              </div>
              ` : ''}
              ${card.phone ? `
              <div style="margin-bottom: 4px;">
                📞 <a href="tel:${card.phone}" style="color: ${card.secondaryColor}; text-decoration: none;">${card.phone}</a>
              </div>
              ` : ''}
              ${card.whatsapp ? `
              <div style="margin-bottom: 4px;">
                💬 <a href="https://wa.me/${card.whatsapp.replace(/\D/g, '')}" style="color: ${card.secondaryColor}; text-decoration: none;">WhatsApp</a>
              </div>
              ` : ''}
              ${card.website ? `
              <div style="margin-bottom: 4px;">
                🌐 <a href="${card.website}" style="color: ${card.secondaryColor}; text-decoration: none;">${card.website}</a>
              </div>
              ` : ''}
              ${card.address ? `
              <div style="margin-bottom: 4px;">
                📍 ${card.address}
              </div>
              ` : ''}
            </div>
            ${(card.socialMedia.instagram || card.socialMedia.linkedin || card.socialMedia.facebook || card.socialMedia.twitter) ? `
            <div style="margin-top: 12px;">
              ${card.socialMedia.instagram ? `<a href="${card.socialMedia.instagram}" style="color: ${card.secondaryColor}; text-decoration: none; font-size: 18px; margin-right: 8px;">📷</a>` : ''}
              ${card.socialMedia.linkedin ? `<a href="${card.socialMedia.linkedin}" style="color: ${card.secondaryColor}; text-decoration: none; font-size: 18px; margin-right: 8px;">💼</a>` : ''}
              ${card.socialMedia.facebook ? `<a href="${card.socialMedia.facebook}" style="color: ${card.secondaryColor}; text-decoration: none; font-size: 18px; margin-right: 8px;">📘</a>` : ''}
              ${card.socialMedia.twitter ? `<a href="${card.socialMedia.twitter}" style="color: ${card.secondaryColor}; text-decoration: none; font-size: 18px; margin-right: 8px;">🐦</a>` : ''}
            </div>
            ` : ''}
          </td>
          <td style="padding-left: 20px; vertical-align: middle; text-align: center;">
            <div style="margin-bottom: 8px;">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(cardUrl)}" alt="QR Code" width="120" height="120" style="display: block;" />
            </div>
            <div style="font-size: 10px; color: #9ca3af;">
              ${language === 'pt-BR' ? 'Escaneie para ver' : 'Scan to view'}<br/>${language === 'pt-BR' ? 'cartão completo' : 'full card'}
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding-top: 12px;">
      <div style="font-size: 10px; color: #9ca3af; text-align: center;">
        ${language === 'pt-BR' ? 'Criado com' : 'Created with'} <a href="${typeof window !== 'undefined' ? window.location.origin : ''}" style="color: ${card.primaryColor}; text-decoration: none; font-weight: 600;">BizzCard</a>
      </div>
    </td>
  </tr>
</table>
    `.trim();
  };

  const handleCopyHTML = () => {
    if (!card) return;

    const html = generateSignatureHTML(card);
    navigator.clipboard.writeText(html).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
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
            <Link href={`/card/${card.id}`} className="flex items-center gap-2">
              <div className="flex items-center justify-center w-7 h-7 bg-primary-purple rounded-lg">
                <span className="text-white text-base font-bold font-rubik">B</span>
              </div>
              <h1 className="text-lg font-semibold text-gray-900 font-rubik">
                BizzCard
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 font-rubik mb-2">
            {language === 'pt-BR' ? 'Assinatura de Email' : 'Email Signature'}
          </h2>
          <p className="text-gray-600 font-rubik">
            {language === 'pt-BR'
              ? 'Copie o código HTML e cole nas configurações de assinatura do seu email'
              : 'Copy the HTML code and paste it into your email signature settings'}
          </p>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
          <h3 className="text-lg font-bold text-gray-900 font-rubik mb-4">
            {language === 'pt-BR' ? 'Pré-visualização' : 'Preview'}
          </h3>
          <div
            dangerouslySetInnerHTML={{ __html: generateSignatureHTML(card) }}
          />
        </div>

        {/* Copy Button */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={handleCopyHTML}
            className="flex-1 px-6 py-3 bg-primary-purple hover:bg-primary-purple/90 text-white font-semibold rounded-lg transition-colors font-rubik flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {copied
              ? (language === 'pt-BR' ? 'Copiado!' : 'Copied!')
              : (language === 'pt-BR' ? 'Copiar HTML' : 'Copy HTML')}
          </button>

          <Link
            href={`/card/${card.id}`}
            className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg border-2 border-gray-200 transition-colors font-rubik"
          >
            {language === 'pt-BR' ? 'Voltar' : 'Back'}
          </Link>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-blue-900 font-rubik mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {language === 'pt-BR' ? 'Como adicionar no seu email' : 'How to add to your email'}
          </h3>

          <div className="space-y-6">
            {/* Gmail */}
            <div>
              <h4 className="font-bold text-blue-900 mb-2 font-rubik">Gmail</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800 font-rubik">
                <li>{language === 'pt-BR' ? 'Clique em "Copiar HTML" acima' : 'Click "Copy HTML" above'}</li>
                <li>{language === 'pt-BR' ? 'Abra as configurações do Gmail (⚙️ → Ver todas as configurações)' : 'Open Gmail settings (⚙️ → See all settings)'}</li>
                <li>{language === 'pt-BR' ? 'Role até "Assinatura"' : 'Scroll to "Signature"'}</li>
                <li>{language === 'pt-BR' ? 'Clique em "Criar nova" e cole o HTML (Ctrl/Cmd + V)' : 'Click "Create new" and paste the HTML (Ctrl/Cmd + V)'}</li>
                <li>{language === 'pt-BR' ? 'Role até o final e clique em "Salvar alterações"' : 'Scroll to the bottom and click "Save changes"'}</li>
              </ol>
            </div>

            {/* Outlook */}
            <div>
              <h4 className="font-bold text-blue-900 mb-2 font-rubik">Outlook (Web)</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800 font-rubik">
                <li>{language === 'pt-BR' ? 'Clique em "Copiar HTML" acima' : 'Click "Copy HTML" above'}</li>
                <li>{language === 'pt-BR' ? 'Abra as configurações do Outlook (⚙️ → Ver todas as configurações)' : 'Open Outlook settings (⚙️ → View all settings)'}</li>
                <li>{language === 'pt-BR' ? 'Vá em "Email → Redação e resposta"' : 'Go to "Mail → Compose and reply"'}</li>
                <li>{language === 'pt-BR' ? 'Cole o HTML na seção "Assinatura de email"' : 'Paste the HTML in the "Email signature" section'}</li>
                <li>{language === 'pt-BR' ? 'Clique em "Salvar"' : 'Click "Save"'}</li>
              </ol>
            </div>

            {/* Apple Mail */}
            <div>
              <h4 className="font-bold text-blue-900 mb-2 font-rubik">Apple Mail</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800 font-rubik">
                <li>{language === 'pt-BR' ? 'Clique em "Copiar HTML" acima' : 'Click "Copy HTML" above'}</li>
                <li>{language === 'pt-BR' ? 'Abra Mail → Preferências → Assinaturas' : 'Open Mail → Preferences → Signatures'}</li>
                <li>{language === 'pt-BR' ? 'Crie uma nova assinatura' : 'Create a new signature'}</li>
                <li>{language === 'pt-BR' ? 'Feche as preferências e vá para ~/Library/Mail/V*/MailData/Signatures/' : 'Close preferences and go to ~/Library/Mail/V*/MailData/Signatures/'}</li>
                <li>{language === 'pt-BR' ? 'Edite o arquivo .mailsignature correspondente e cole o HTML' : 'Edit the corresponding .mailsignature file and paste the HTML'}</li>
              </ol>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-100 rounded-lg">
            <p className="text-xs text-blue-800 font-rubik">
              <strong>{language === 'pt-BR' ? 'Dica:' : 'Tip:'}</strong>{' '}
              {language === 'pt-BR'
                ? 'O QR Code é gerado automaticamente e permite que as pessoas acessem seu cartão completo rapidamente'
                : 'The QR Code is generated automatically and allows people to access your full card quickly'}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

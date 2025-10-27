'use client';

import { useCards } from '@/contexts/CardsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';

export default function Dashboard() {
  const { cards, deleteCard } = useCards();
  const { t, language, setLanguage } = useLanguage();

  const handleDelete = (id: string) => {
    if (confirm(language === 'pt-BR' ? 'Tem certeza que deseja excluir este cartão?' : 'Are you sure you want to delete this card?')) {
      deleteCard(id);
    }
  };

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 font-rubik">
              {language === 'pt-BR' ? 'Meus Cartões' : 'My Cards'}
            </h2>
            <p className="text-gray-600 mt-2 font-rubik">
              {language === 'pt-BR'
                ? 'Gerencie todos os seus cartões virtuais'
                : 'Manage all your digital cards'}
            </p>
          </div>
          <Link
            href="/card/create"
            className="px-6 py-3 bg-primary-purple hover:bg-primary-purple/90 text-white font-semibold rounded-lg transition-colors font-rubik flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {language === 'pt-BR' ? 'Novo Cartão' : 'New Card'}
          </Link>
        </div>

        {/* Cards Grid */}
        {cards.length === 0 ? (
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 font-rubik">
              {language === 'pt-BR' ? 'Nenhum cartão ainda' : 'No cards yet'}
            </h3>
            <p className="text-gray-600 mb-6 font-rubik">
              {language === 'pt-BR'
                ? 'Crie seu primeiro cartão virtual para começar'
                : 'Create your first digital card to get started'}
            </p>
            <Link
              href="/card/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-purple hover:bg-primary-purple/90 text-white font-semibold rounded-lg transition-colors font-rubik"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {language === 'pt-BR' ? 'Criar Primeiro Cartão' : 'Create First Card'}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Card Preview Header */}
                <div
                  className="p-6 border-b border-gray-100"
                  style={{
                    background: `linear-gradient(135deg, ${card.primaryColor}15 0%, ${card.secondaryColor}15 100%)`
                  }}
                >
                  <div className="flex items-start gap-4">
                    {card.logo && (
                      <img
                        src={card.logo}
                        alt={card.company}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-900 font-rubik truncate">
                        {card.name}
                      </h3>
                      <p className="text-sm text-gray-600 font-rubik truncate">
                        {card.role}
                      </p>
                      <p className="text-xs text-gray-500 font-rubik truncate">
                        {card.company}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="font-rubik truncate">{card.email}</span>
                  </div>
                  {card.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="font-rubik truncate">{card.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="px-2 py-1 bg-gray-100 rounded font-rubik">
                      {card.template}
                    </span>
                    <span className="font-rubik">
                      {language === 'pt-BR' ? 'Criado em' : 'Created on'} {new Date(card.createdAt).toLocaleDateString(language)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
                  <Link
                    href={`/card/${card.id}`}
                    className="flex-1 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-200 transition-colors font-rubik text-center text-sm"
                  >
                    {language === 'pt-BR' ? 'Ver' : 'View'}
                  </Link>
                  <Link
                    href={`/card/edit/${card.id}`}
                    className="flex-1 px-4 py-2 bg-primary-purple hover:bg-primary-purple/90 text-white font-medium rounded-lg transition-colors font-rubik text-center text-sm"
                  >
                    {language === 'pt-BR' ? 'Editar' : 'Edit'}
                  </Link>
                  <button
                    onClick={() => handleDelete(card.id)}
                    className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-lg transition-colors text-sm"
                    title={language === 'pt-BR' ? 'Excluir' : 'Delete'}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

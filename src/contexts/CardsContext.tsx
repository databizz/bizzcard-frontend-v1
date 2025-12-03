'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Card } from '@/types/signature';

interface CardsContextType {
  cards: Card[];
  addCard: (card: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>) => Card;
  updateCard: (id: string, card: Partial<Card>) => void;
  deleteCard: (id: string) => void;
  getCard: (id: string) => Card | undefined;
  isLoading: boolean;
  exportCards: () => void;
  exportCard: (id: string) => void;
  importCards: (file: File) => Promise<{ success: boolean; message: string; cardsImported?: number }>;
}

const CardsContext = createContext<CardsContextType | undefined>(undefined);

export function CardsProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cards from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('bizzcard_cards');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCards(parsed);
      } catch (error) {
        console.error('Error loading cards:', error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save cards to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('bizzcard_cards', JSON.stringify(cards));
    }
  }, [cards, isLoading]);

  const addCard = (cardData: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>): Card => {
    const newCard: Card = {
      ...cardData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCards((prev) => [...prev, newCard]);
    return newCard;
  };

  const updateCard = (id: string, updates: Partial<Card>) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id
          ? { ...card, ...updates, updatedAt: new Date().toISOString() }
          : card
      )
    );
  };

  const deleteCard = (id: string) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const getCard = (id: string): Card | undefined => {
    return cards.find((card) => card.id === id);
  };

  const exportCards = () => {
    try {
      const dataStr = JSON.stringify(cards, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bizzcard-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting cards:', error);
    }
  };

  const exportCard = (id: string) => {
    try {
      const card = cards.find((c) => c.id === id);
      if (!card) {
        console.error('Card not found');
        return;
      }

      const dataStr = JSON.stringify([card], null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      // Create filename from card name, removing special characters
      const safeName = card.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      link.download = `bizzcard-${safeName}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting card:', error);
    }
  };

  const importCards = async (file: File): Promise<{ success: boolean; message: string; cardsImported?: number }> => {
    try {
      const text = await file.text();
      const importedCards = JSON.parse(text);

      // Validate that it's an array
      if (!Array.isArray(importedCards)) {
        return { success: false, message: 'Arquivo inválido: formato não reconhecido' };
      }

      // Validate each card has required fields
      const isValid = importedCards.every((card: any) =>
        card.id &&
        card.name &&
        card.email &&
        card.createdAt &&
        card.updatedAt
      );

      if (!isValid) {
        return { success: false, message: 'Arquivo inválido: cartões não contêm os campos obrigatórios' };
      }

      // Merge with existing cards (avoid duplicates by ID)
      setCards((prev) => {
        const existingIds = new Set(prev.map(card => card.id));
        const newCards = importedCards.filter((card: Card) => !existingIds.has(card.id));
        return [...prev, ...newCards];
      });

      return {
        success: true,
        message: `${importedCards.length} cartão(ões) importado(s) com sucesso!`,
        cardsImported: importedCards.length
      };
    } catch (error) {
      console.error('Error importing cards:', error);
      return { success: false, message: 'Erro ao importar arquivo. Verifique se o formato está correto.' };
    }
  };

  return (
    <CardsContext.Provider
      value={{
        cards,
        addCard,
        updateCard,
        deleteCard,
        getCard,
        isLoading,
        exportCards,
        exportCard,
        importCards,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
}

export function useCards() {
  const context = useContext(CardsContext);
  if (context === undefined) {
    throw new Error('useCards must be used within a CardsProvider');
  }
  return context;
}

// Generate a unique ID for cards
function generateId(): string {
  return `card_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

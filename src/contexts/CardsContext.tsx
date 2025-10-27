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

  return (
    <CardsContext.Provider
      value={{
        cards,
        addCard,
        updateCard,
        deleteCard,
        getCard,
        isLoading,
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
  return `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

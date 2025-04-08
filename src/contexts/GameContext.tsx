import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { Card, GameState } from '../types/game';
import { instrumentsByFamily } from '../data/familys';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface GameContextType extends GameState {
    handleFlip: (card: Card) => void;
    handleHideInstrumentModal: () => void;
    handleAudioEnded: () => void;
    initializeGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
    const [gameState, setGameState] = useState<GameState>({
        cards: [],
        selectedCards: [],
        matchedCards: [],
        showInstrumentModal: false,
        matchedInstrument: null,
    });

    const navigate = useNavigate();
    const isInitialized = useRef(false);
    const gameStateRef = useRef(gameState);

    // Update ref when state changes
    useEffect(() => {
        gameStateRef.current = gameState;
    }, [gameState]);

    const shuffleArray = useCallback(<T,>(array: T[]): T[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }, []);

    const initializeGame = useCallback(() => {
        const allCards: Card[] = [];
        let selectedFamilies: string[] = [];
        
        try {
            const storedFamilies = localStorage.getItem('selectedFamilies');
            if (storedFamilies) {
                selectedFamilies = JSON.parse(storedFamilies);
            }
        } catch (error) {
            console.error('Error loading families from localStorage:', error);
            selectedFamilies = [];
        }

        if (selectedFamilies.length === 0) {
            return;
        }

        selectedFamilies.forEach(family => {
            if (instrumentsByFamily[family]) {
                const cardsCopy = [...instrumentsByFamily[family]];
                const lastCardId = cardsCopy[cardsCopy.length - 1].id;
                const duplicatedCards = cardsCopy.map((card, index) => ({ ...card, id: index + lastCardId + 1 }));
                allCards.push(...cardsCopy, ...duplicatedCards);
            } else {
                toast.error(`Família ${family} não encontrada`);
            }
        });

        if (allCards.length === 0) {
            toast.error('Nenhuma família de instrumentos selecionada');
            return;
        }

        const shuffledCards = shuffleArray(allCards);
        setGameState(prev => ({ 
            ...prev, 
            cards: shuffledCards,
            selectedCards: [],
            matchedCards: [],
            showInstrumentModal: false,
            matchedInstrument: null
        }));
        isInitialized.current = true;
    }, [shuffleArray]);

    const handleFlip = useCallback((card: Card): void => {
        const { selectedCards, matchedCards } = gameStateRef.current;
        if (!selectedCards.includes(card) && selectedCards.length < 2 && !matchedCards.includes(card)) {
            setGameState(prev => ({ ...prev, selectedCards: [...selectedCards, card] }));
        }

        if (selectedCards.includes(card) || matchedCards.includes(card)) {
            setGameState(prev => ({ ...prev, selectedCards: [] }));
        }
    }, []);

    // Check for matches
    useEffect(() => {
        const { selectedCards, matchedCards } = gameStateRef.current;
        if (selectedCards.length === 2) {
            const [firstCard, secondCard] = selectedCards;
            if (firstCard.audio === secondCard.audio) {
                setGameState(prev => ({
                    ...prev,
                    matchedCards: [...matchedCards, firstCard, secondCard],
                    selectedCards: [],
                    matchedInstrument: firstCard,
                    showInstrumentModal: true,
                }));
            } else {
                // Se não houver match, espera 1 segundo e vira os cards de volta
                setTimeout(() => {
                    setGameState(prev => ({
                        ...prev,
                        selectedCards: [],
                    }));
                }, 1000);
            }
        }
    }, [gameState.selectedCards]);

    // Check for win condition
    useEffect(() => {
        const { matchedCards, cards } = gameStateRef.current;
        if (matchedCards.length === cards.length && cards.length > 0) {
            toast.success("PARABÉNS!! Você ganhou!");
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
        }
    }, [gameState.matchedCards.length, gameState.cards.length]);

    const handleHideInstrumentModal = useCallback(() => {
        setGameState(prev => ({ ...prev, showInstrumentModal: false }));
    }, []);

    const handleAudioEnded = useCallback(() => {
        const { selectedCards } = gameStateRef.current;
        if (selectedCards.length === 1) {
            return;
        }
        setGameState(prev => ({ ...prev, selectedCards: [] }));
    }, []);

    return (
        <GameContext.Provider
            value={{
                ...gameState,
                handleFlip,
                handleHideInstrumentModal,
                handleAudioEnded,
                initializeGame,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
} 
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Card, GameState } from '../types/game';
import { instrumentsByFamily } from '../data/familys';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface GameContextType extends GameState {
    handleFlip: (card: Card) => void;
    handleHideInstrumentModal: () => void;
    handleAudioEnded: () => void;
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

    function shuffleArray<T>(array: T[]): T[] {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    useEffect(() => {
        const allCards: Card[] = [];
        const selectedFamilies: string[] = JSON.parse(localStorage.getItem('selectedFamilies') ?? '[]');

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

        const shuffledCards = shuffleArray(allCards);
        setGameState(prev => ({ ...prev, cards: shuffledCards }));
    }, []);

    const handleFlip = (card: Card): void => {
        const { selectedCards, matchedCards } = gameState;
        if (!selectedCards.includes(card) && selectedCards.length < 2 && !matchedCards.includes(card)) {
            setGameState(prev => ({ ...prev, selectedCards: [...selectedCards, card] }));
        }

        if (selectedCards.includes(card) || matchedCards.includes(card)) {
            setGameState(prev => ({ ...prev, selectedCards: [] }));
        }
    };

    useEffect(() => {
        const { selectedCards, matchedCards, cards } = gameState;
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
            }
        }
    }, [gameState.selectedCards]);

    useEffect(() => {
        const { matchedCards, cards } = gameState;
        if (matchedCards.length === cards.length && cards.length > 0) {
            toast.success("PARABÉNS!! Você ganhou!");
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
    }, [gameState.matchedCards, gameState.cards, navigate]);

    const handleHideInstrumentModal = () => {
        setGameState(prev => ({ ...prev, showInstrumentModal: false }));
    };

    const handleAudioEnded = () => {
        const { selectedCards } = gameState;
        if (selectedCards.length === 1) {
            return;
        }
        setGameState(prev => ({ ...prev, selectedCards: [] }));
    };

    return (
        <GameContext.Provider
            value={{
                ...gameState,
                handleFlip,
                handleHideInstrumentModal,
                handleAudioEnded,
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
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { instrumentsByFamily } from "../data/familys";
import FlippableCard from "../components/FlippableCard";
import Header from "../components/header";

interface Card {
    id: number;
    name: string;
    audio: string;
}

export default function Game(): JSX.Element {
    const [cards, setCards] = useState<Card[]>([]);
    const [selectedCards, setSelectedCards] = useState<Card[]>([]);
    const [matchedCards, setMatchedCards] = useState<Card[]>([]);

    useEffect(() => {
        const allCards: Card[] = [];
        const selectedFamilies: string[] = JSON.parse(localStorage.getItem('selectedFamilies') || '[]');

        selectedFamilies.forEach(family => {
            if (instrumentsByFamily[family]) {
                const cardsCopy = [...instrumentsByFamily[family]];
                const lastCardId = cardsCopy[cardsCopy.length - 1].id;
                const duplicatedCards = cardsCopy.map((card, index) => ({ ...card, id: index + lastCardId + 1 }));
                allCards.push(...shuffleArray([...cardsCopy, ...duplicatedCards]));
            } else {
                toast.error(`Família ${family} não encontrada`)
            }
        });

        const shuffledAudio = shuffleArray(allCards.map(card => card.audio));
        const cardsWithAudio = allCards.map((card, index) => ({ ...card, audio: shuffledAudio[index] }));
        setCards(cardsWithAudio);
    }, []);

    const shuffleArray = (array: any[]): any[] => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handleFlip = (card: Card): void => {
        if (!selectedCards.includes(card) && selectedCards.length < 2 && !matchedCards.includes(card)) {
            setSelectedCards([...selectedCards, card]);
        }
    };

    useEffect(() => {
        if (selectedCards.length === 2) {
            const [firstCard, secondCard] = selectedCards;
            if (firstCard.audio === secondCard.audio) {
                setMatchedCards([...matchedCards, firstCard, secondCard]);
                setSelectedCards([]); // Reset selected cards
            } else {
                // If the two selected cards have different IDs, keep the second card flipped for 2 seconds
                const timeoutId = setTimeout(() => {
                    setSelectedCards(prevSelectedCards => prevSelectedCards.filter(card => card !== firstCard && card !== secondCard));
                }, 2000);
                return () => clearTimeout(timeoutId); // Cleanup function to clear timeout
            }
        }
    }, [selectedCards, matchedCards]); // Depend on selectedCards and matchedCards
    

    const cardListLength = (index: number): number => {
        return index + 1;
    };    

    return (
        <div className="h-full">
            <Header />
            <div className='pt-8 flex items-center justify-center pb-10'>
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.726)' }} className='grid grid-cols-6 w-4/6 items-center gap-3 justify-center px-auto rounded-lg border-2 border-white'>
                    {cards.sort((a, b) => a.id - b.id).map((card, index) => {
                        const isFlipped = selectedCards.includes(card) || matchedCards.includes(card);
                        const isDisabled = matchedCards.includes(card);
                        return (
                            <FlippableCard
                                key={index}
                                isFlipped={isFlipped}
                                onClick={() => handleFlip(card)}
                                content={cardListLength(index)}
                                audio={card.audio}
                                isDisabled={isDisabled}
                                id={card.id}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
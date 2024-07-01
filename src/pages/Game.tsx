/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { instrumentsByFamily } from "../data/familys";
import FlippableCard from "../components/FlippableCard";
import Header from "../components/header";
import { ShowInstrument } from "../components/showInstrument";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

export interface Card {
    id: number;
    name: string;
    audio: string;
    image: string;
}

export default function Game(): JSX.Element {
    const [cards, setCards] = useState<Card[]>([]);
    const [selectedCards, setSelectedCards] = useState<Card[]>([]);
    const [matchedCards, setMatchedCards] = useState<Card[]>([]);
    const [showInstrumentModal, setShowInstrumentModal] = useState(false);
    const [matchedInstrument, setMatchedInstrument] = useState<Card | null>(null);

    const navigate = useNavigate();

    function shuffleArray(array: any[]): any[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
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
                toast.error(`Família ${family} não encontrada`)
            }
        });

        const shuffledCards = shuffleArray(allCards);
        setCards(shuffledCards);
    }, []);

    const handleFlip = (card: Card): void => {
        if (!selectedCards.includes(card) && selectedCards.length < 2 && !matchedCards.includes(card)) {
            setSelectedCards([...selectedCards, card]);
        }

        if (selectedCards.includes(card) || matchedCards.includes(card)) {
            setSelectedCards([]);
        }
    };

    useEffect(() => {
        if (selectedCards.length === 2) {
            const [firstCard, secondCard] = selectedCards;
            if (firstCard.audio === secondCard.audio) {
                setMatchedCards([...matchedCards, firstCard, secondCard]);
                setSelectedCards([]);

                setMatchedInstrument(firstCard);
                setShowInstrumentModal(true);
            }
        }
    }, [selectedCards, matchedCards, cards.length, navigate]);

    const handleHideInstrumentModal = () => {
        setShowInstrumentModal(false);
    };

    const cardListLength = (index: number): number => {
        return index + 1;
    };

    useEffect(() => {
        // Verifica se todos os cards estão combinados
        if (matchedCards.length === cards.length && cards.length > 0) {
            toast.success("PARABÉNS!! Você ganhou!")
            setTimeout(() => {
                navigate('/')
            }, 3000);
        }
    }, [matchedCards, cards, navigate]);

    const handleAudioEnded = () => {
        if (selectedCards.length === 1) {
            return; // Don't flip the first card automatically if the second card is not selected yet
        }
        setSelectedCards([]);
    };

    return (
        <div className="h-full">
            <Header />
            <div className='pt-8 flex items-center justify-center pb-10'>
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }} className='grid grid-cols-6 w-4/6 items-center gap-3 justify-center px-auto rounded-lg border-2 border-white'>
                    {cards.map((card, index) => {
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
                                name={card.name}
                                imageName={card.image}
                                onAudioEnded={handleAudioEnded}
                            />

                        );
                    })}
                </div>
            </div>
            <ShowInstrument show={showInstrumentModal} onHide={handleHideInstrumentModal} instrument={matchedInstrument} />
            <Toaster richColors position="top-center" className="h-44" />
        </div>
    );
}
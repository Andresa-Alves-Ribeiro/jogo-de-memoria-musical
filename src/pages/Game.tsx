/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import FlippableCard from "../components/FlippableCard";
import { instrumentsByFamily } from "../data/familys";
import Header from "../components/header";

export default function Game() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [cards, setCards] = useState<{ id: number; name: string; audio: string }[]>([]);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    useEffect(() => {
        const allCards: { id: number; name: string; audio: string }[] = [];
        const selectedFamilies: string[] = JSON.parse(localStorage.getItem('selectedFamilies') || '[]');


        selectedFamilies.forEach(family => {
            if (instrumentsByFamily[family]) {
                const cardsCopy = [...instrumentsByFamily[family]];
                const lastCardId = cardsCopy[cardsCopy.length - 1].id;
                const duplicatedCards = cardsCopy.map((card, index) => ({ ...card, id: index + lastCardId + 1 }));
                allCards.push(...shuffleArray([...cardsCopy, ...duplicatedCards]));
            } else {
                console.log(`Família ${family} não encontrada`);
            }
        });

        const shuffledAudio = shuffleArray(allCards.map(card => card.audio));
        const cardsWithAudio = allCards.map((card, index) => ({ ...card, audio: shuffledAudio[index] }));
        setCards(cardsWithAudio);
    }, []);

    const shuffleArray = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const cardListLength = (index: number) => {
        return index + 1;
    };

    return (
        <div>
            <Header />

            <div className='background pt-20 h-full flex items-center justify-center'>
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.726)' }} className='grid grid-cols-4 h-5/6 w-1/2 items-center gap-3 justify-center px-auto rounded-lg border-2 border-white'>
                    {cards.sort((a, b) => a.id - b.id).map((card, index) => {
                        return (
                            <FlippableCard
                                key={index}
                                isFlipped={isFlipped}
                                onClick={handleFlip}
                                content={cardListLength(index)}
                                audio={card.audio}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
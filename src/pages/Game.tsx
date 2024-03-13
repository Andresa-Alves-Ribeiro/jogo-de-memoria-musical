/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import FlippableCard from "../components/FlippableCard";
import { instrumentsByFamily } from "../data/familys";

export default function Game() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [cards, setCards] = useState<{ id: number; name: string; audio: string }[]>([]);
    const selectedFamily: string | null = localStorage.getItem('selectedFamily');

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    useEffect(() => {
        if (selectedFamily !== null && instrumentsByFamily[selectedFamily]) {
            const cardsCopy = [...instrumentsByFamily[selectedFamily]];
            const lastCardId = cardsCopy[cardsCopy.length - 1].id;
            const duplicatedCards = cardsCopy.map((card, index) => ({ ...card, id: index + lastCardId + 1 }));
            const shuffledCards = shuffleArray([...cardsCopy, ...duplicatedCards]);
            const shuffledAudio = shuffleArray(shuffledCards.map(card => card.audio));
            const cardsWithAudio = shuffledCards.map((card, index) => ({ ...card, audio: shuffledAudio[index] }));
            setCards(cardsWithAudio);
        }
    }, []);

    const shuffleArray = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    return (
        <div className='background h-screen flex items-center justify-center'>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.726)' }} className='grid grid-cols-4 h-5/6 w-1/2 items-center justify-center px-auto rounded-lg border-2 border-white'>
                {cards.sort((a, b) => a.id - b.id).map((card, index) => {
                    return (
                        <FlippableCard
                            key={index}
                            isFlipped={isFlipped}
                            onClick={handleFlip}
                            content={card.id}
                            audio={card.audio}
                        />
                    );
                })}
            </div>
        </div>
    );
}
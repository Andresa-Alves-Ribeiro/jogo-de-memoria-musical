import { useState } from "react";
import FlippableCard from "../components/FlippableCard";
import { instrumentsByFamily } from "../data/familys";

export default function Game() {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const cards = instrumentsByFamily["CordasDeArco"];
    const multipleCards = cards.length * 2;

    return (
        <div className='background h-screen flex items-center justify-center'>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} className='grid grid-cols-4 h-5/6 w-1/2 items-center pl-32 rounded-lg'>
                {Array.from({ length: multipleCards }).map((_item, index) => {
                    const audioPath = cards[index % cards.length].audio;
                    return (
                        <FlippableCard
                            key={index}
                            isFlipped={isFlipped}
                            onClick={handleFlip}
                            content={cards[index % cards.length].id}
                            audio={audioPath}
                        />
                    );
                })}
            </div>
        </div>
    );
}

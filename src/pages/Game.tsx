import { useState } from "react";
import FlippableCard from "../components/FlippableCard";
import { cardsCordasDeArco } from "../data/familys";


export default function Game() {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className='background h-screen flex items-center justify-center'>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} className='grid grid-cols-4 h-5/6 w-1/2 items-center pl-32 rounded-lg'>
                {cardsCordasDeArco.map((item, index) => (
                    <FlippableCard
                        key={index}
                        isFlipped={isFlipped}
                        onClick={handleFlip}
                        content={item}
                    />

                ))}
            </div>
        </div>
    );
}

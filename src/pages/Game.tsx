import { useState } from "react";
import FlippableButton from "../components/FlippableButton";

export default function Game() {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className='background h-screen flex items-center justify-center'>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} className='grid grid-cols-4 h-5/6 w-1/2 items-center pl-32 rounded-lg'>
                <FlippableButton
                    isFlipped={isFlipped}
                    onClick={handleFlip}
                    content="1"
                />
                <FlippableButton
                    isFlipped={isFlipped}
                    onClick={handleFlip}
                    content="2"
                />
                <FlippableButton
                    isFlipped={isFlipped}
                    onClick={handleFlip}
                    content="3"
                />
                <FlippableButton
                    isFlipped={isFlipped}
                    onClick={handleFlip}
                    content="4"
                />
                <FlippableButton
                    isFlipped={isFlipped}
                    onClick={handleFlip}
                    content="5"
                />
                <FlippableButton
                    isFlipped={isFlipped}
                    onClick={handleFlip}
                    content="6"
                />
                <FlippableButton
                    isFlipped={isFlipped}
                    onClick={handleFlip}
                    content="7"
                />
                <FlippableButton
                    isFlipped={isFlipped}
                    onClick={handleFlip}
                    content="8"
                />
                <FlippableButton
                    isFlipped={isFlipped}
                    onClick={handleFlip}
                    content="9"
                />
                <FlippableButton
                    isFlipped={isFlipped}
                    onClick={handleFlip}
                    content="10"
                />
                <FlippableButton
                    isFlipped={isFlipped}
                    onClick={handleFlip}
                    content="11"
                />
                <FlippableButton
                    isFlipped={isFlipped}
                    onClick={handleFlip}
                    content="12"
                />
                <FlippableButton
                    isFlipped={isFlipped}
                    onClick={handleFlip}
                    content="13"
                />
                <FlippableButton
                    isFlipped={isFlipped}
                    onClick={handleFlip}
                    content="14"
                />
                <FlippableButton
                    isFlipped={isFlipped}
                    onClick={handleFlip}
                    content="15"
                />
                <FlippableButton
                    isFlipped={isFlipped}
                    onClick={handleFlip}
                    content="16"
                />
            </div>
        </div>
    );
}

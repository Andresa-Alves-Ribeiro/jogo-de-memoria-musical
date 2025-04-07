/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect } from "react";
import FlippableCard from "../components/FlippableCard";
import Header from "../components/header";
import { ShowInstrument } from "../components/showInstrument";
import { Toaster } from "sonner";
import { useGame } from "../contexts/GameContext";
import AnimatedBackground from "../components/AnimatedBackground";
import { useNavigate } from "react-router-dom";

export default function Game(): JSX.Element {
    const {
        cards,
        selectedCards,
        matchedCards,
        showInstrumentModal,
        matchedInstrument,
        handleFlip,
        handleHideInstrumentModal,
        handleAudioEnded
    } = useGame();
    
    const navigate = useNavigate();

    // Verificar se há cards disponíveis
    useEffect(() => {
        if (cards.length === 0) {
            // Se não houver cards, redirecionar para a página inicial
            navigate('/');
        }
    }, [cards, navigate]);

    const cardListLength = (index: number): number => {
        return index + 1;
    };

    return (
        <AnimatedBackground>
            <div className="h-full w-screen">
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
                                    onAudioEnded={handleAudioEnded}
                                />
                            );
                        })}
                    </div>
                </div>
                <ShowInstrument show={showInstrumentModal} onHide={handleHideInstrumentModal} instrument={matchedInstrument} />
                <Toaster richColors position="top-center" className="h-44" />
            </div>
        </AnimatedBackground>
    );
}
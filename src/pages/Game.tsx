/* eslint-disable @typescript-eslint/no-explicit-any */

import { FlippableCard } from "../components/FlippableCard";
import { ShowInstrument } from "../components/showInstrument";
import { Toaster } from "sonner";
import { useGame } from "../contexts/GameContext";
import { useGameStats } from "../contexts/GameStatsContext";
import { useGameSounds } from "../hooks/useGameSounds";
import { GameStats } from "../components/GameStats";
import { useState, useEffect, useRef } from "react";
import ConfirmModal from "@/components/confirmModal";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Pause, Play } from "@phosphor-icons/react";

export default function Game() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const {
        cards,
        selectedCards,
        matchedCards,
        showInstrumentModal,
        matchedInstrument,
        handleFlip,
        handleHideInstrumentModal,
        initializeGame
    } = useGame();

    const {
        isPlaying,
        startGame,
        pauseGame,
        incrementAttempts,
        updateScore,
    } = useGameStats();

    const { playVictorySound } = useGameSounds();
    const lastScoreUpdate = useRef(0);

    const cardListLength = (index: number): number => {
        return index + 1;
    };

    const handleSurrender = () => {
        setIsModalOpen(true);
    }

    const handleConfirmSurrender = () => {
        setIsModalOpen(false);
        localStorage.removeItem('selectedFamilies');
        navigate('/', { replace: true });
    }

    // Iniciar o jogo quando o componente montar
    useEffect(() => {
        initializeGame();
        startGame();
        return () => {
            pauseGame();
        };
    }, [initializeGame, startGame, pauseGame]);

    // Atualizar pontuação quando encontrar pares
    useEffect(() => {
        const pairsFound = matchedCards.length / 2;
        const totalPairs = cards.length / 2;

        // Só atualiza a pontuação se houver pares encontrados e se o número de pares mudou
        if (pairsFound > 0 && pairsFound !== lastScoreUpdate.current) {
            lastScoreUpdate.current = pairsFound;
            updateScore(pairsFound, totalPairs);
        }

        // Verificar vitória
        if (pairsFound === totalPairs && totalPairs > 0) {
            playVictorySound();
        }
    }, [matchedCards.length, cards.length, updateScore, playVictorySound]);

    // Incrementar tentativas quando selecionar cards
    useEffect(() => {
        if (selectedCards.length === 2) {
            incrementAttempts();
        }
    }, [incrementAttempts, selectedCards.length]);

    const handleTogglePause = () => {
        if (isPlaying) {
            pauseGame();
        } else {
            startGame();
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-start relative overflow-hidden py-6"
            style={{
                background: 'linear-gradient(to bottom, #323232 0%, #3F3F3F 50%, #1C1C1C 100%), linear-gradient(to top, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.25) 200%)',
                backgroundBlendMode: 'multiply',
            }}>
            {/* Efeito de grade de fundo */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(128,128,128,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(128,128,128,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>

            {/* Efeito de scanline */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.1)_0px,rgba(0,0,0,0.1)_2px,transparent_2px,transparent_4px)] opacity-50"></div>

            {/* Botão de desistir */}
            <div className="absolute top-4 left-4 z-20">
                <button
                    onClick={handleSurrender}
                    className="group relative flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-800/50"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-gray-600/20 blur-md rounded-full transition-all duration-300 group-hover:opacity-100 opacity-0"></div>
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-white font-bold">DESISTIR</p>
                </button>
            </div>

            {/* Botão de teste de áudio */}
            <div className="absolute top-4 right-4 z-20">
                <button
                    onClick={() => {
                        // Testar reprodução de áudio
                        const audio = new Audio(cards[0]?.audio);
                        audio.play()
                            .then(() => console.log('Áudio de teste reproduzido com sucesso'))
                            .catch(error => console.error('Erro ao reproduzir áudio de teste:', error));
                    }}
                    className="group relative flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-800/50"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-gray-600/20 blur-md rounded-full transition-all duration-300 group-hover:opacity-100 opacity-0"></div>
                        <span className="text-white text-2xl">🔊</span>
                    </div>
                    <p className="text-white font-bold">TESTAR ÁUDIO</p>
                </button>
            </div>

            {/* Header com contador e botão de pause */}
            <div className="w-max max-w-7xl px-2 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 flex items-center justify-end gap-6 border border-gray-700/50 shadow-lg">
                    <GameStats />
                    <button
                        onClick={handleTogglePause}
                        className="group relative flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-800/50"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-gray-600/20 blur-md rounded-full transition-all duration-300 group-hover:opacity-100 opacity-0"></div>
                            {isPlaying ? (
                                <Pause
                                    size={32}
                                    className="text-white transition-all duration-300 group-hover:text-gray-300 relative z-10"
                                />
                            ) : (
                                <Play
                                    size={32}
                                    className="text-white transition-all duration-300 group-hover:text-gray-300 relative z-10"
                                />
                            )}
                        </div>
                        <p className="text-white kode-mono-font text-lg font-bold tracking-wider transition-all duration-300 group-hover:text-gray-300">
                            {isPlaying ? 'PAUSAR' : 'CONTINUAR'}
                        </p>
                    </button>
                </div>
            </div>

            {/* Grid de cards */}
            <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                    {cards.map((card, index) => {
                        const isFlipped = selectedCards.includes(card) || matchedCards.includes(card);
                        const isDisabled = matchedCards.includes(card);
                        // Toca áudio do primeiro card; no segundo, só toca se for instrumento diferente (evita tocar 2x ao acertar o par)
                        const isFirstCard = selectedCards.length > 0 && selectedCards[0] === card;
                        const isSecondCardDifferent = selectedCards.length === 2 && selectedCards[0]?.audio !== card.audio;
                        const shouldPlayAudio = isFirstCard || isSecondCardDifferent;
                        return (
                            <FlippableCard
                                key={index}
                                content={cardListLength(index)}
                                isFlipped={isFlipped}
                                isDisabled={isDisabled}
                                isSelected={selectedCards.includes(card)}
                                shouldPlayAudio={shouldPlayAudio}
                                image={card.image}
                                name={card.name}
                                audio={card.audio}
                                onClick={() => handleFlip(card)}
                            />
                        );
                    })}
                </div>
            </div>

            <ShowInstrument
                show={showInstrumentModal}
                onHide={handleHideInstrumentModal}
                instrument={matchedInstrument}
            />

            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmSurrender}
                title="Desistir do Jogo"
                message="Tem certeza que deseja desistir do jogo? Todo o progresso será perdido."
            />
            <Toaster richColors position="top-center" className="h-44" />
        </div>
    );
}
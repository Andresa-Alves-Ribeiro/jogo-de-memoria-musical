import { FlippableCard } from "../components/FlippableCard";
import { ShowInstrument } from "../components/ShowInstrument";
import { useGame } from "../contexts/GameContext";
import { useGameStats } from "../contexts/GameStatsContext";
import { useGameSounds } from "../hooks/useGameSounds";
import { GameStats } from "../components/GameStats";
import { useState, useEffect, useRef } from "react";
import ConfirmModal from "@/components/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Pause, Play, CaretDown } from "@phosphor-icons/react";
import imageMenu from "../assets/images/image-menu.png";

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
        handleAudioEnded,
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
    const victorySoundPlayedRef = useRef(false);
    const testAudioRef = useRef<HTMLAudioElement | null>(null);

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

    useEffect(() => {
        victorySoundPlayedRef.current = false;
        initializeGame();
        startGame();
        return () => {
            pauseGame();
        };
    }, [initializeGame, startGame, pauseGame]);

    useEffect(() => {
        const pairsFound = matchedCards.length / 2;
        const totalPairs = cards.length / 2;

        if (pairsFound > 0 && pairsFound !== lastScoreUpdate.current) {
            lastScoreUpdate.current = pairsFound;
            updateScore(pairsFound, totalPairs);
        }

        if (pairsFound === totalPairs && totalPairs > 0 && !victorySoundPlayedRef.current) {
            victorySoundPlayedRef.current = true;
            playVictorySound();
        }
    }, [matchedCards.length, cards.length, updateScore, playVictorySound]);

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

    const handleTestAudio = () => {
        if (!cards[0]?.audio) return;

        const currentAudio = testAudioRef.current;
        if (currentAudio && !currentAudio.paused) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            return;
        }

        const audio = new Audio(cards[0].audio);
        testAudioRef.current = audio;
        audio.play()
            .then(() => console.log('Áudio de teste reproduzido com sucesso'))
            .catch(error => console.error('Erro ao reproduzir áudio de teste:', error));
    };

    return (
        <div className="w-full h-screen min-h-0 flex flex-col items-center overflow-y-auto overflow-x-hidden py-6 relative">
            {/* Fundo fixo para que a rolagem não deixe áreas em branco */}
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `url(${imageMenu})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'blur(12px)',
                    transform: 'scale(1.1)',
                }}
            />
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, rgba(50,50,50,0.7) 0%, rgba(63,63,63,0.7) 50%, rgba(28,28,28,0.7) 100%)',
                }}
            />
            <div className="fixed inset-0 z-[1] pointer-events-none bg-[linear-gradient(rgba(128,128,128,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(128,128,128,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
            <div className="fixed inset-0 z-[1] pointer-events-none bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.1)_0px,rgba(0,0,0,0.1)_2px,transparent_2px,transparent_4px)] opacity-50"></div>

            <p className="flex items-center justify-center gap-1.5 text-gray-400/80 text-xs kode-mono-font pt-1 pb-2 relative z-10 flex-shrink-0">
                <CaretDown className="w-3.5 h-3.5" weight="bold" />
                A página pode rolar para exibir todos os cartões
            </p>

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

            <div className="absolute top-4 right-4 z-20">
                <button
                    onClick={handleTestAudio}
                    className="group relative flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-800/50"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-gray-600/20 blur-md rounded-full transition-all duration-300 group-hover:opacity-100 opacity-0"></div>
                        <span className="text-white text-2xl">🔊</span>
                    </div>
                    <p className="text-white font-bold">TESTAR ÁUDIO</p>
                </button>
            </div>

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

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 flex-shrink-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                    {cards.map((card, index) => {
                        const isFlipped = selectedCards.includes(card) || matchedCards.includes(card);
                        const isDisabled = matchedCards.includes(card);
                        const isFirstCardOnly = selectedCards.length === 1 && selectedCards[0] === card;
                        const isSecondCardDifferent = selectedCards.length === 2 && selectedCards[1] === card && selectedCards[0]?.audio !== card.audio;
                        const shouldPlayAudio = isFirstCardOnly || isSecondCardDifferent;
                        return (
                            <FlippableCard
                                key={index}
                                content={cardListLength(index)}
                                isFlipped={isFlipped}
                                isDisabled={isDisabled}
                                isSelected={selectedCards.includes(card)}
                                shouldPlayAudio={shouldPlayAudio}
                                isPlaying={isPlaying}
                                showInstrumentModal={showInstrumentModal}
                                image={card.image}
                                name={card.name}
                                audio={card.audio}
                                onClick={() => handleFlip(card)}
                                onAudioEnded={handleAudioEnded}
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
        </div>
    );
}
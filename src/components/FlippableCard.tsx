/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useRef, useState } from 'react';
import '../App.css';

interface FlippableCardProps {
    id: number;
    isFlipped: boolean;
    onClick: () => void;
    content: number;
    audio: string;
    isDisabled: boolean;
    onAudioEnded: () => void;
    image?: string;
    name?: string;
}

export default function FlippableCard({
    id,
    isFlipped,
    onClick,
    content,
    audio,
    isDisabled,
    onAudioEnded,
    image,
    name
}: FlippableCardProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [glitchEffect, setGlitchEffect] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const isLastPair = useRef(false);
    const playPromiseRef = useRef<Promise<void> | null>(null);
    const glitchIntervalRef = useRef<number | null>(null);

    // Cleanup function for audio
    const cleanupAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        if (playPromiseRef.current) {
            playPromiseRef.current = null;
        }
    };

    // Função para ativar efeito de glitch
    const triggerGlitch = () => {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 200);
    };

    // Efeito de glitch aleatório
    useEffect(() => {
        if (isFlipped && !isDisabled) {
            glitchIntervalRef.current = window.setInterval(() => {
                if (Math.random() > 0.7) {
                    triggerGlitch();
                }
            }, 3000);
        }

        return () => {
            if (glitchIntervalRef.current) {
                clearInterval(glitchIntervalRef.current);
            }
        };
    }, [isFlipped, isDisabled]);

    useEffect(() => {
        return () => {
            cleanupAudio();
            if (glitchIntervalRef.current) {
                clearInterval(glitchIntervalRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const handleAudioEnded = () => {
            onAudioEnded();
            setIsPlaying(false);
        };

        if (audioRef.current) {
            audioRef.current.addEventListener('ended', handleAudioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', handleAudioEnded);
            };
        }
    }, [onAudioEnded]);

    useEffect(() => {
        if (!isFlipped) {
            setIsPlaying(false);
            cleanupAudio();
        }
    }, [isFlipped]);

    useEffect(() => {
        if (isPlaying && isFlipped && audioRef.current) {
            try {
                cleanupAudio();
                playPromiseRef.current = audioRef.current.play();
                if (playPromiseRef.current) {
                    playPromiseRef.current.catch(error => {
                        console.error('Erro ao reproduzir áudio:', error);
                        setIsPlaying(false);
                        playPromiseRef.current = null;
                    });
                }
            } catch (error) {
                console.error('Erro ao reproduzir áudio:', error);
                setIsPlaying(false);
                playPromiseRef.current = null;
            }
        } else if (!isPlaying && isFlipped) {
            cleanupAudio();
        }
    }, [isFlipped, isPlaying]);

    useEffect(() => {
        if (isFlipped) {
            const otherAudioElements = Array.from(document.querySelectorAll('.card audio')) as HTMLAudioElement[];
            otherAudioElements.forEach((element) => {
                if (element !== audioRef.current) {
                    element.pause();
                    element.currentTime = 0;
                }
            });
        }
    }, [isFlipped]);

    const handleCardClick = () => {
        if (isDisabled) return;
        
        if (isFlipped) {
            setIsPlaying(!isPlaying);
        } else {
            onClick();
            setIsPlaying(true);
            triggerGlitch();
        }
    };

    return (
        <button
            className={`
                card relative w-full h-full min-h-[200px] perspective-1000
                ${isFlipped && !isDisabled ? "flipped" : ""} 
                ${isPlaying && !isDisabled ? "playing" : ""} 
                ${isLastPair.current && !isDisabled ? "matched" : ""}
                ${isHovered && !isDisabled ? "hover:scale-105" : ""}
                ${glitchEffect && !isDisabled ? "glitch-effect" : ""}
                ${isDisabled ? "no-animation" : "transition-all duration-300 ease-in-out"}
                transform-gpu
                neon-border
            `}
            onClick={isDisabled ? undefined : handleCardClick}
            onMouseEnter={() => !isDisabled && setIsHovered(true)}
            onMouseLeave={() => !isDisabled && setIsHovered(false)}
            disabled={isDisabled}
        >
            {/* Efeito de brilho - apenas para cards não combinados */}
            {!isDisabled && (
                <div className={`
                    absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20
                    rounded-lg opacity-0 transition-opacity duration-300
                    ${isHovered ? "opacity-100" : ""}
                    ${isPlaying ? "animate-pulse" : ""}
                `} />
            )}

            {/* Efeito de partículas - apenas para cards não combinados */}
            {!isDisabled && (
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div 
                            key={i}
                            className={`
                                absolute w-1 h-1 bg-purple-500 rounded-full
                                ${isPlaying ? "animate-float" : ""}
                                ${isHovered ? "opacity-100" : "opacity-0"}
                                transition-opacity duration-300
                            `}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${Math.random() * 3 + 2}s`
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Grade de fundo - apenas para cards não combinados */}
            {!isDisabled && (
                <div className="absolute inset-0 grid-background rounded-lg opacity-50" />
            )}

            {/* Frente do card */}
            <div className={`
                absolute inset-0
                flex items-center justify-center
                bg-gradient-to-br from-purple-900 to-pink-900
                border-2 border-purple-500
                rounded-lg
                backface-hidden
                ${isFlipped ? "opacity-0" : "opacity-100"}
                ${isDisabled ? "" : "transition-opacity duration-300"}
            `}>
                <div className="text-6xl font-bold text-white">
                    {content}
                </div>
            </div>

            {/* Verso do card */}
            <div className={`
                absolute inset-0
                flex items-center justify-center
                ${isDisabled ? "bg-gray-800" : "bg-gradient-to-br from-purple-900 to-pink-900"}
                border-2 ${isDisabled ? "border-gray-500" : "border-purple-500"}
                rounded-lg
                backface-hidden
                ${isDisabled ? "" : "rotate-y-180"}
                ${isFlipped ? "opacity-100" : "opacity-0"}
                ${isDisabled ? "" : "transition-opacity duration-300"}
                ${isPlaying && !isDisabled ? "border-purple-400" : ""}
            `}>
                {isDisabled && image ? (
                    // Exibir a imagem do instrumento quando o card estiver combinado - sem animações
                    <div className="w-full h-full flex flex-col items-center justify-center p-2">
                        <img 
                            src={image} 
                            alt="Instrumento" 
                            className="w-full h-auto max-h-[80%] object-contain rounded-md"
                        />
                        <div className="text-white text-sm mt-2 font-bold text-center">
                            {name ?? content}
                        </div>
                    </div>
                ) : (
                    // Exibir o ícone de áudio quando não estiver combinado
                    <div className={`
                        text-6xl font-bold
                        ${isPlaying ? "text-purple-400 animate-audio-pulse" : "text-white"}
                        ${isDisabled ? "" : "transition-all duration-300"}
                        ${glitchEffect ? "glitch-text" : ""}
                    `}>
                        🔊
                    </div>
                )}
                
                {/* Ondas de áudio */}
                {isPlaying && !isDisabled && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div 
                                key={i}
                                className="absolute w-1 h-16 bg-purple-400 rounded-full mx-1"
                                style={{
                                    animation: `audio-wave ${1 + i * 0.2}s infinite alternate`,
                                    opacity: 0.7 - i * 0.1
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Efeito de scanline - apenas para cards não combinados */}
            {!isDisabled && (
                <div className={`
                    absolute inset-0
                    bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.1)_0px,rgba(0,0,0,0.1)_2px,transparent_2px,transparent_4px)]
                    rounded-lg
                    pointer-events-none
                    opacity-50
                    ${isPlaying ? "animate-scanline" : ""}
                `} />
            )}

            {/* Efeito de borda neon - apenas para cards não combinados */}
            {!isDisabled && (
                <div className={`
                    absolute -inset-1
                    rounded-lg
                    bg-gradient-to-r from-purple-500 to-pink-500
                    opacity-0
                    transition-opacity duration-300
                    ${isHovered ? "opacity-100" : ""}
                    ${isPlaying ? "animate-neon-pulse" : ""}
                    blur-sm
                    -z-10
                `} />
            )}

            <audio ref={audioRef} src={audio} preload="auto"></audio>
        </button>
    );
}
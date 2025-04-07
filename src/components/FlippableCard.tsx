/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useRef, useState } from 'react';
import '../App.css';

interface FlippableCardProps {
    content: string | number;
    isFlipped: boolean;
    isDisabled: boolean;
    image?: string;
    name?: string;
    onClick: () => void;
}

export const FlippableCard: React.FC<FlippableCardProps> = ({
    content,
    isFlipped,
    isDisabled,
    image,
    name,
    onClick
}) => {
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
            setIsPlaying(false);
        };

        if (audioRef.current) {
            audioRef.current.addEventListener('ended', handleAudioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', handleAudioEnded);
            };
        }
    }, []);

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

    const handleMouseEnter = () => {
        if (!isDisabled) {
            setIsHovered(true);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleClick = () => {
        if (!isDisabled) {
            onClick();
        }
    };

    return (
        <div
            className={`
                relative w-full h-48
                cursor-pointer
                perspective-1000
                ${isDisabled ? "cursor-default" : ""}
            `}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {/* Frente do card */}
            <div className={`
                absolute inset-0
                flex items-center justify-center
                bg-gradient-to-br from-gray-800 to-gray-900
                border-2 border-gray-600
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
                ${isDisabled ? "bg-gray-800" : "bg-gradient-to-br from-gray-800 to-gray-900"}
                border-2 ${isDisabled ? "border-gray-500" : "border-gray-600"}
                rounded-lg
                backface-hidden
                ${isDisabled ? "" : "rotate-y-180"}
                ${isFlipped ? "opacity-100" : "opacity-0"}
                ${isDisabled ? "" : "transition-opacity duration-300"}
            `}>
                {isDisabled && image ? (
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
                    <div className="text-6xl font-bold text-white">
                        🔊
                    </div>
                )}
            </div>

            {/* Efeito de borda - apenas para cards não combinados */}
            {!isDisabled && (
                <div className={`
                    absolute -inset-1
                    rounded-lg
                    bg-gradient-to-r from-gray-500 to-gray-600
                    opacity-0
                    transition-opacity duration-300
                    ${isHovered ? "opacity-100" : ""}
                    blur-sm
                    -z-10
                `} />
            )}
        </div>
    );
};
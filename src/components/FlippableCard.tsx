import { useEffect, useRef, useState } from 'react';
import '../App.css';

interface FlippableCardProps {
    content: string | number;
    isFlipped: boolean;
    isDisabled: boolean;
    isSelected?: boolean;
    shouldPlayAudio?: boolean; // Evita tocar o mesmo instrumento 2x ao acertar o par
    isPlaying?: boolean; // Bloqueia cliques quando o jogo está pausado
    showInstrumentModal?: boolean; // Usado para parar o áudio quando o modal é fechado
    image?: string;
    name?: string;
    audio?: string;
    onClick: () => void;
    onAudioEnded?: () => void; // Chamado quando o áudio termina (para virar cards de volta quando não há match)
}

export const FlippableCard: React.FC<FlippableCardProps> = ({
    content,
    isFlipped,
    isDisabled,
    isSelected = false,
    shouldPlayAudio = true,
    isPlaying = true,
    showInstrumentModal = false,
    image,
    name,
    audio,
    onClick,
    onAudioEnded
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [glitchEffect, setGlitchEffect] = useState(false);
    const glitchIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

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

    // Efeito para reproduzir áudio quando o card é virado
    // Ao clicar no segundo card: primeiro para (shouldPlayAudio=false), segundo toca até o fim
    // Ao clicar no segundo card novamente: desseleciona, card desvira e áudio para
    useEffect(() => {
        if (isFlipped && audio && !isDisabled && shouldPlayAudio) {
            // Parar qualquer áudio que esteja tocando
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }

            const audioEl = new Audio(audio);
            audioRef.current = audioEl;

            const handleEnded = () => {
                onAudioEnded?.();
            };
            const handleError = () => {
                onAudioEnded?.();
            };

            audioEl.addEventListener('ended', handleEnded);
            audioEl.addEventListener('error', handleError);

            audioEl.play()
                .then(() => console.log('Áudio reproduzido com sucesso'))
                .catch(() => {
                    handleError();
                });

            return () => {
                audioEl.removeEventListener('ended', handleEnded);
                audioEl.removeEventListener('error', handleError);
            };
        } else if ((!isFlipped || !shouldPlayAudio) && audioRef.current) {
            // Parar o áudio quando o card é desvirado OU quando outro card deve tocar (ex: segundo card clicado)
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, [isFlipped, audio, isDisabled, shouldPlayAudio, onAudioEnded]);

    // Parar o áudio quando o modal do instrumento for fechado
    useEffect(() => {
        if (!showInstrumentModal && isDisabled && audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, [showInstrumentModal, isDisabled]);

    // Limpar ao desmontar
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
            if (glitchIntervalRef.current) {
                clearInterval(glitchIntervalRef.current);
            }
        };
    }, []);

    const isClickable = !isDisabled && isPlaying;

    const handleMouseEnter = () => {
        if (isClickable) {
            setIsHovered(true);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleClick = () => {
        if (isClickable) {
            onClick();
        }
    };

    return (
        <div
            className={`
                relative w-full h-48
                perspective-1000
                ${isClickable ? "cursor-pointer" : "cursor-default"}
                ${glitchEffect ? "glitch-effect" : ""}
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
                ${isDisabled ? "bg-gradient-to-br from-green-600 to-green-700" :
                    isSelected ? "bg-gradient-to-br from-red-600 to-red-700" :
                        "bg-gradient-to-br from-gray-800 to-gray-900"}
                border-2 ${isDisabled ? "border-green-500" :
                    isSelected ? "border-red-500" :
                        "border-gray-600"}
                rounded-lg
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

            {/* Efeito de borda - apenas para cards clicáveis (não combinados e jogo em andamento) */}
            {isClickable && (
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
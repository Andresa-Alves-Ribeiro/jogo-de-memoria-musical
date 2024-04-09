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
    name: string;
    imageName: string;
    onAudioEnded: () => void;
}

export default function FlippableCard({
    id,
    isFlipped,
    onClick,
    content,
    audio,
    isDisabled,
    name,
    imageName,
    onAudioEnded 
}: FlippableCardProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const isLastPair = useRef(false);

    useEffect(() => {
        // Lidar com o término do áudio
        const handleAudioEnded = () => {
            onAudioEnded();
        };

        // Adicionando o evento 'ended' ao elemento de áudio para ouvir quando ele termina
        if (audioRef.current) {
            audioRef.current.addEventListener('ended', handleAudioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', handleAudioEnded);
            };
        }
    }, [onAudioEnded]);

    useEffect(() => {
        setIsPlaying(false);
    }, [isFlipped]);

    useEffect(() => {
        if (isPlaying && isFlipped) {
            audioRef.current?.pause();
        } else if (!isPlaying && isFlipped) {
            audioRef.current?.play();
        }
    }, [isFlipped, isPlaying]);

    const toggleAudio = () => {
        setIsPlaying(!isPlaying);
    }

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
    }, [id, isFlipped, onClick]);

    const handleCardClick = () => {
        // Se o card já estiver selecionado, para a reprodução do áudio
        if (isFlipped) {
            setIsPlaying(false);
            audioRef.current?.pause();
        }
        onClick();
        toggleAudio();
    };

    return (
        <button
            className={`card ${isFlipped ? "flipped" : "my-3"} ${isPlaying ? "playing" : ""} ${isLastPair.current ? "matched" : ""}`}
            onClick={!isDisabled ? handleCardClick : undefined}
            disabled={isDisabled}
        >
            <p className={`${isFlipped ? "back" : "front"} ${isDisabled ? "disabled" : ""} flex items-center justify-center text-zinc-100 text-7xl font-bold rounded-lg`}>
                {content}
            </p>
            <audio ref={audioRef} src={audio}></audio>
        </button>
    );
}
import React, { useEffect, useRef, useState } from 'react';
import '../App.css';

interface FlippableCardProps {
    id: number;
    isFlipped: boolean;
    onClick: () => void;
    content: number;
    audio: string;
    isDisabled: boolean;
}

export default function FlippableCard({
    id,
    isFlipped,
    onClick,
    content,
    audio,
    isDisabled
}: FlippableCardProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const isLastPair = useRef(false);
    const lastPairIds = useRef<number[]>([]);
    
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, []);

    useEffect(() => {
        setIsPlaying(false); // Reset isPlaying when card is flipped back
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

            if (lastPairIds.current.length === 2 && lastPairIds.current.indexOf(id) === -1) {
                setIsPlaying(false);
                audioRef.current?.pause();
                setTimeout(() => {
                    onClick();
                }, 10000); // Change delay to 10 seconds
            }
        }
    }, [id, isFlipped, onClick]);

    const handleCardClick = () => {
        onClick();
        toggleAudio();
    };

    return (
        <button
            className={`card ${isFlipped ? "flipped" : "my-3"} ${isPlaying ? "playing" : ""} ${isLastPair.current ? "matched" : ""}`}
            onClick={!isDisabled ? handleCardClick : undefined}
            disabled={isDisabled}
        >
            <p className={`${isFlipped ? "back" : "front"} flex items-center justify-center text-zinc-100 text-7xl font-bold rounded-lg`}>
                {content}
            </p>
            <audio ref={audioRef} src={audio}></audio>
        </button>
    );
}

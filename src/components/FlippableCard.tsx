import { useState, useRef } from 'react';
import '../App.css';
import sound from '../data/audios/cavaquinho.wav';

interface FlippableCardProps {
    isFlipped?: boolean;
    onClick?: () => void;
    content: number;
}

export default function FlippableCard({
    isFlipped = false,
    content,
}: FlippableCardProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio(sound));

    const toggleAudio = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.currentTime = 0;
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <button
            className={`card ${isFlipped ? "flipped" : ""}`}
            onClick={toggleAudio}
        >
            <p className={`${isFlipped ? "back" : "front"} flex items-center justify-center text-zinc-100 text-7xl font-bold rounded-lg`}>
                {content}
            </p>
        </button>
    );
}

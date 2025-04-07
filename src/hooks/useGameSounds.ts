import { useCallback } from 'react';

const sounds = {
    flip: new Audio('/sounds/flip.mp3'),
    match: new Audio('/sounds/match.mp3'),
    victory: new Audio('/sounds/victory.mp3'),
    button: new Audio('/sounds/button.mp3'),
    error: new Audio('/sounds/error.mp3')
};

export function useGameSounds() {
    const playSound = useCallback((soundName: keyof typeof sounds) => {
        const sound = sounds[soundName];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(error => {
                console.error('Error playing sound:', error);
            });
        }
    }, []);

    return {
        playFlipSound: () => playSound('flip'),
        playMatchSound: () => playSound('match'),
        playVictorySound: () => playSound('victory'),
        playButtonSound: () => playSound('button'),
        playErrorSound: () => playSound('error')
    };
} 
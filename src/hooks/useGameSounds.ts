import { useCallback } from 'react';
import victorySound from '../assets/audio/victory.wav';

const sounds = {
    victory: new Audio(victorySound)
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
        playVictorySound: () => playSound('victory')
    };
} 
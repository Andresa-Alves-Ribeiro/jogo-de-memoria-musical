import { useCallback, useRef } from 'react';

// Som estilo video game para hover nas opções (Web Audio API)
export function useMenuHoverSound() {
    const audioContextRef = useRef<AudioContext | null>(null);

    return useCallback(() => {
        try {
            if (!audioContextRef.current) {
                const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
                audioContextRef.current = new AudioContextClass();
            }
            const ctx = audioContextRef.current;
            if (ctx.state === 'suspended') ctx.resume();

            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(880, ctx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.05);
            gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.08);
        } catch (error) {
            console.warn('Falha ao reproduzir som de hover:', error);
        }
    }, []);
}

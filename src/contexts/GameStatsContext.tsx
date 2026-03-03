import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface GameStats {
    time: number;
    attempts: number;
    score: number;
    bestTime: number;
    bestScore: number;
    isPlaying: boolean;
}

interface GameStatsContextType extends GameStats {
    startGame: () => void;
    pauseGame: () => void;
    resetGame: () => void;
    incrementAttempts: () => void;
    updateScore: (pairsFound: number, totalPairs: number) => void;
}

const GameStatsContext = createContext<GameStatsContextType | undefined>(undefined);

export function GameStatsProvider({ children }: { children: React.ReactNode }) {
    const [stats, setStats] = useState<GameStats>({
        time: 0,
        attempts: 0,
        score: 0,
        bestTime: 0,
        bestScore: 0,
        isPlaying: false
    });

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (stats.isPlaying) {
            interval = setInterval(() => {
                setStats(prev => ({ ...prev, time: prev.time + 1 }));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [stats.isPlaying]);

    const startGame = useCallback(() => {
        setStats(prev => ({ ...prev, isPlaying: true }));
    }, []);

    const pauseGame = useCallback(() => {
        setStats(prev => ({ ...prev, isPlaying: false }));
    }, []);

    const resetGame = useCallback(() => {
        setStats({
            time: 0,
            attempts: 0,
            score: 0,
            bestTime: stats.bestTime,
            bestScore: stats.bestScore,
            isPlaying: false
        });
    }, [stats.bestTime, stats.bestScore]);

    const incrementAttempts = useCallback(() => {
        setStats(prev => ({ ...prev, attempts: prev.attempts + 1 }));
    }, []);

    const updateScore = useCallback((pairsFound: number, totalPairs: number) => {
        setStats(prev => {
            const completionRatio = pairsFound / totalPairs;
            const timePenalty = prev.time * 10;
            const excessAttempts = Math.max(0, prev.attempts - totalPairs);
            const attemptsPenalty = excessAttempts * 50;
            const maxPossible = Math.max(0, 1000 - timePenalty - attemptsPenalty);
            const newScore = Math.min(1000, Math.max(0, completionRatio * maxPossible));

            return {
                ...prev,
                score: newScore,
                bestScore: Math.max(prev.bestScore, newScore),
                bestTime: prev.bestTime === 0 ? prev.time : Math.min(prev.bestTime, prev.time)
            };
        });
    }, []);

    return (
        <GameStatsContext.Provider
            value={{
                ...stats,
                startGame,
                pauseGame,
                resetGame,
                incrementAttempts,
                updateScore
            }}
        >
            {children}
        </GameStatsContext.Provider>
    );
}

export function useGameStats() {
    const context = useContext(GameStatsContext);
    if (context === undefined) {
        throw new Error('useGameStats must be used within a GameStatsProvider');
    }
    return context;
} 
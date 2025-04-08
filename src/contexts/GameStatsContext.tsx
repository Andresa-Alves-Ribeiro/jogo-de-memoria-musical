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

    // Timer effect
    useEffect(() => {
        let interval: NodeJS.Timeout;
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
            const completionPercentage = (pairsFound / totalPairs) * 100;
            const timeBonus = Math.max(0, 1000 - prev.time * 10); // Bônus por tempo
            const attemptsPenalty = prev.attempts * 50; // Penalidade por tentativas
            const newScore = Math.max(0, completionPercentage * 10 + timeBonus - attemptsPenalty);

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
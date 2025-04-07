import { useGameStats } from '../contexts/GameStatsContext';

export function GameStats() {
    const { time, attempts, score, bestTime, bestScore, isPlaying } = useGameStats();

    const formatTime = (seconds: number) => {
        if (seconds === 0) return '--:--';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 text-white kode-mono-font">
            <div className="flex items-center justify-between gap-8">
                <div className="text-center">
                    <p className="text-sm text-gray-400">Tempo</p>
                    <p className="text-xl font-bold">{formatTime(time)}</p>
                    <p className="text-xs text-gray-400">Melhor: {formatTime(bestTime)}</p>
                </div>
                <div className="text-center">
                    <p className="text-sm text-gray-400">Tentativas</p>
                    <p className="text-xl font-bold">{attempts}</p>
                </div>
                <div className="text-center">
                    <p className="text-sm text-gray-400">Pontuação</p>
                    <p className="text-xl font-bold">{Math.round(score)}</p>
                    <p className="text-xs text-gray-400">Melhor: {Math.round(bestScore)}</p>
                </div>
                <div className="text-center">
                    <p className="text-sm text-gray-400">Status</p>
                    <p className={`text-xl font-bold ${isPlaying ? 'text-green-400' : 'text-red-400'}`}>
                        {isPlaying ? 'Jogando' : 'Pausado'}
                    </p>
                </div>
            </div>
        </div>
    );
} 
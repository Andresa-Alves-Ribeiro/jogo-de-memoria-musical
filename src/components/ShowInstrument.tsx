import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X } from '@phosphor-icons/react';
import { Card } from '../types/game';

interface ShowInstrumentProps {
    show: boolean;
    onHide: () => void;
    instrument: Card | null;
}

export function ShowInstrument({ show, onHide, instrument }: ShowInstrumentProps) {
    useEffect(() => {
        if (show && instrument) {
            confetti({
                particleCount: 80,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.7 },
            });
            confetti({
                particleCount: 80,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.7 },
            });
            confetti({
                particleCount: 100,
                spread: 100,
                origin: { y: 0.6, x: 0.5 },
            });
        }
    }, [show, instrument]);

    if (!show || !instrument) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/85 backdrop-blur-sm"
                onClick={onHide}
                aria-hidden="true"
            />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(128,128,128,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(128,128,128,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none" />

            <div
                className="relative bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
                role="dialog"
                aria-modal="true"
                aria-labelledby="instrument-modal-title"
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-600">
                    <h2 id="instrument-modal-title" className="text-zinc-200 title-font text-xl sm:text-2xl md:text-3xl">
                        {instrument.name}
                    </h2>
                    <button
                        onClick={onHide}
                        className="w-12 h-12 border-2 border-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 shrink-0"
                        aria-label="Fechar"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 flex items-center justify-center p-6 min-h-0">
                    <div className="w-full h-full flex items-center justify-center">
                        <img
                            src={instrument.image}
                            alt={`Foto do instrumento ${instrument.name}`}
                            className="max-w-full max-h-[60vh] w-auto h-auto object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
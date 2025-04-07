import { X } from "@phosphor-icons/react";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay com efeito de grade */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
            </div>

            {/* Modal */}
            <div className="relative bg-gradient-to-br from-[#000033] to-[#330033] border-2 border-[#FF00FF] rounded-lg p-6 w-[90%] max-w-md shadow-[0_0_20px_rgba(255,0,255,0.3)] animate-[glow_2s_infinite_alternate]">
                {/* Efeito de scanline */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.1)_0px,rgba(0,0,0,0.1)_2px,transparent_2px,transparent_4px)] opacity-50 rounded-lg"></div>

                {/* Grade de fundo */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 rounded-lg"></div>

                {/* Conteúdo */}
                <div className="relative z-10">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-[#FF00FF] kode-mono-font text-xl font-bold tracking-wider">{title}</h2>
                        <button
                            onClick={onClose}
                            className="w-12 h-12 border-2 border-[#FF00FF] text-[#FF00FF] rounded-full flex items-center justify-center hover:scale-110 hover:rotate-90 transition-all duration-300 shadow-[0_0_10px_rgba(255,0,255,0.3)]"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <p className="text-white/80 mb-6 kode-mono-font">{message}</p>

                    <div className="flex gap-4 justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 border-2 border-[#FF00FF] text-[#FF00FF] rounded hover:scale-105 transition-all duration-300 kode-mono-font shadow-[0_0_10px_rgba(255,0,255,0.3)]"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-6 py-2 bg-[#FF00FF] text-black rounded hover:scale-105 transition-all duration-300 kode-mono-font shadow-[0_0_15px_rgba(255,0,255,0.4)] relative overflow-hidden group"
                        >
                            <span className="relative z-10">Confirmar</span>
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 
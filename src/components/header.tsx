import { ArrowLeft } from "@phosphor-icons/react";
import { useState } from "react";
import ConfirmModal from "./confirm-modal";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleSurrender = () => {
        setIsModalOpen(true);
    }

    const handleConfirmSurrender = () => {
        setIsModalOpen(false);
        localStorage.removeItem('selectedFamilies');
        navigate('/', { replace: true });
    }

    return (
        <>
            <div className='bg-gradient-to-r from-zinc-950 via-purple-950 to-zinc-950 h-20 flex w-full relative overflow-hidden border-b border-purple-500/30'>
                {/* Efeito de grade de fundo */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>

                {/* Efeito de scanline */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.1)_0px,rgba(0,0,0,0.1)_2px,transparent_2px,transparent_4px)] opacity-50"></div>

                {/* Efeito de brilho lateral */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-purple-500/10 animate-pulse"></div>

                <button
                    onClick={handleSurrender}
                    className="group relative"
                >
                    <div className="flex gap-3 items-center">
                        <div className="relative">
                            {/* Efeito de borda neon */}
                            <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full transition-all duration-300 group-hover:opacity-100 opacity-0 group-hover:scale-110"></div>

                            {/* Efeito de partículas */}
                            <div className="absolute inset-0">
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute w-1 h-1 bg-purple-500 rounded-full animate-float"
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                            animationDelay: `${i * 0.5}s`,
                                            animationDuration: `${2 + Math.random() * 2}s`
                                        }}
                                    />
                                ))}
                            </div>

                            <ArrowLeft
                                size={45}
                                className="ml-8 mt-2 text-purple-400 transition-all duration-300 group-hover:text-purple-300 group-hover:scale-110 relative z-10"
                            />
                        </div>
                        <p className="text-purple-400 kode-mono-font mt-3 text-xl font-bold tracking-wider transition-all duration-300 group-hover:text-purple-300 group-hover:scale-105 relative">
                            <span className="relative">
                                DESISTIR
                                {/* Efeito de texto neon */}
                                <span className="absolute inset-0 blur-sm text-purple-500/50 transition-opacity duration-300 group-hover:opacity-100 opacity-0">DESISTIR</span>
                            </span>
                        </p>
                    </div>
                </button>

                {/* Efeito de borda inferior */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
            </div>

            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmSurrender}
                title="Desistir do Jogo"
                message="Tem certeza que deseja desistir do jogo? Todo o progresso será perdido."
            />
        </>
    );
}

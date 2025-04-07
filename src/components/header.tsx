import { ArrowLeft } from "@phosphor-icons/react";
import { useState } from "react";
import ConfirmModal from "./confirmModal";
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
            <div className='bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 h-20 flex w-full relative overflow-hidden border-b border-gray-600/30'>
                {/* Efeito de grade de fundo */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(128,128,128,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(128,128,128,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>

                {/* Efeito de scanline */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.1)_0px,rgba(0,0,0,0.1)_2px,transparent_2px,transparent_4px)] opacity-50"></div>

                {/* Efeito de brilho lateral */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 via-transparent to-gray-600/10"></div>

                <button
                    onClick={handleSurrender}
                    className="group relative"
                >
                    <div className="flex gap-3 items-center">
                        <div className="relative">
                            {/* Efeito de hover */}
                            <div className="absolute inset-0 bg-gray-600/20 blur-md rounded-full transition-all duration-300 group-hover:opacity-100 opacity-0"></div>

                            <ArrowLeft
                                size={45}
                                className="ml-8 mt-2 text-white transition-all duration-300 group-hover:text-gray-300 relative z-10"
                            />
                        </div>
                        <p className="text-white kode-mono-font mt-3 text-xl font-bold tracking-wider transition-all duration-300 group-hover:text-gray-300 relative">
                            <span className="relative">
                                DESISTIR
                                {/* Efeito de texto hover */}
                                <span className="absolute inset-0 blur-sm text-gray-400/50 transition-opacity duration-300 group-hover:opacity-100 opacity-0">DESISTIR</span>
                            </span>
                        </p>
                    </div>
                </button>

                {/* Efeito de borda inferior */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-600/50 to-transparent"></div>
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

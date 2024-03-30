import { ArrowLeft } from "@phosphor-icons/react";
import { useState } from "react";

export default function Header() {
    const [isHover, setIsHover] = useState(false);

    const goBack = () => {
        window.history.back();
    }

    return (
        <div className='bg-zinc-950 h-20 flex w-full'>
            <button
                onClick={goBack}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                {isHover ? (
                    <div className="flex gap-3">
                        <ArrowLeft
                            size={45}
                            color="#a3a3a3"
                            className="ml-8 mt-2 border-2 border-neutral-400 hover:border-white hover:text-white rounded-full p-2 backHover"
                        />
                        <p className="text-white kode-mono-font mt-3 text-xl">VOLTAR</p>
                    </div>
                ) : (
                    <ArrowLeft
                        size={45}
                        color="#a3a3a3"
                        className="ml-8 mt-2 border-2 border-neutral-400 hover:border-white hover:text-white rounded-full p-2 backHover"
                    />
                )}
            </button>
        </div>
    );
}

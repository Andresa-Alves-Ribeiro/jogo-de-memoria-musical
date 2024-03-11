import '../App.css';

interface FlippableButtonProps {
    isFlipped?: boolean;
    onClick?: () => void;
    content: string;
}

export default function FlippableButton({
    isFlipped = false,
    onClick,
    content
}: FlippableButtonProps) {
    return (
        <button
            className={`card ${isFlipped ? "flipped" : ""}`}
            onClick={onClick}
        >
            <p className="bg-transparent text-zinc-100 text-center text-7xl font-bold">
                {content}
            </p>
        </button>
    );
}

{/* 

            <button className="border border-slate-100 bg-indigo-900 h-32 w-32 flex items-center justify-center">
<p className="bg-transparent text-zinc-100 text-center text-7xl font-bold">1</p>
</button>
 */}
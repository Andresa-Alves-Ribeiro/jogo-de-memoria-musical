import React from 'react';
import { MusicNote } from "@phosphor-icons/react";
import './Loading.css';

interface LoadingProps {
    text?: string;
}

const Loading: React.FC<LoadingProps> = ({ text = "CARREGANDO..." }) => {
    return (
        <div className="loading-container">
            <div className="loading-content">
                <div className="loading-notes">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div 
                            key={index}
                            className="loading-note"
                            style={{
                                animationDelay: `${index * 0.2}s`
                            }}
                        >
                            <MusicNote 
                                size={32} 
                                weight="fill"
                                className="text-blue-500"
                            />
                        </div>
                    ))}
                </div>
                <h2 className="loading-text">{text}</h2>
            </div>
        </div>
    );
};

export default Loading; 
import { instrumentFamilies } from '../data/families';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChooseInstrument.css';
import { useMenuHoverSound } from '../hooks/useMenuHoverSound';

interface ChooseInstrumentProps {
    show: boolean;
    onHide: () => void;
    onFamilySelect: (selectedFamilies: string[]) => void;
}

export function ChooseInstrument({ show, onHide, onFamilySelect }: ChooseInstrumentProps) {
    const [selectedFamilies, setSelectedFamilies] = useState<string[]>([]);
    const navigate = useNavigate();
    const playMenuHoverSound = useMenuHoverSound();

    const handleFamilySelect = (family: string) => {
        const isFamilySelected = selectedFamilies.includes(family);

        if (isFamilySelected) {
            setSelectedFamilies(selectedFamilies.filter((selectedFamily) => selectedFamily !== family));
        } else {
            setSelectedFamilies([...selectedFamilies, family]);
        }
    };

    const handleStartGame = () => {
        if (selectedFamilies.length > 0) {
            try {
                localStorage.setItem('selectedFamilies', JSON.stringify(selectedFamilies));
                onFamilySelect(selectedFamilies);
                onHide();
                navigate("/game");
            } catch (error) {
                console.error('Error saving to localStorage:', error);
                onFamilySelect(selectedFamilies);
                onHide();
                navigate("/game");
            }
        }
    };

    if (!show) return null;

    return (
        <div className="game-select-overlay">
            <div className="game-select-container">
                <div className="game-select-header">
                    <h2 className="game-title float">ESCOLHA SUAS FAMÍLIAS</h2>
                    <button className="close-button" onClick={onHide} onMouseEnter={playMenuHoverSound} aria-label="Fechar"><span>×</span></button>
                </div>
                
                <div className="families-grid">
                    {instrumentFamilies.map((family) => (
                        <button 
                            key={family} 
                            className={`family-card ${selectedFamilies.includes(family) ? 'selected' : ''}`}
                            onClick={() => handleFamilySelect(family)}
                            onMouseEnter={playMenuHoverSound}
                            aria-pressed={selectedFamilies.includes(family)}
                        >
                            <div className="family-content">
                                <span className="family-name">{family}</span>
                                <div className="selection-indicator">
                                    {selectedFamilies.includes(family) && <span className="check-mark">✓</span>}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="game-select-footer">
                    <button className="game-button secondary" onClick={onHide} onMouseEnter={playMenuHoverSound}>
                        CANCELAR
                    </button>
                    <button 
                        className={`game-button primary ${selectedFamilies.length === 0 ? 'disabled' : ''}`}
                        onClick={handleStartGame}
                        onMouseEnter={playMenuHoverSound}
                        disabled={selectedFamilies.length === 0}
                    >
                        INICIAR JOGO
                    </button>
                </div>
            </div>
        </div>
    );
}
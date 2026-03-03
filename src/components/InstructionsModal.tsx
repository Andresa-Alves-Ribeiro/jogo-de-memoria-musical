import './InstructionsModal.css';

interface InstructionsModalProps {
    show: boolean;
    onHide: () => void;
}

export function InstructionsModal({ show, onHide }: InstructionsModalProps) {
    if (!show) return null;

    return (
        <div className="instructions-overlay">
            <div className="instructions-container">
                <div className="instructions-header">
                    <h2 className="instructions-title float">COMO JOGAR</h2>
                    <button 
                        className="instructions-close-button" 
                        onClick={onHide} 
                        aria-label="Fechar instruções"
                    >
                        <span>×</span>
                    </button>
                </div>

                <div className="instructions-content">
                    <div className="instruction-block">
                        <span className="instruction-number">1</span>
                        <div>
                            <h3 className="instruction-subtitle">ESCOLHA AS FAMÍLIAS</h3>
                            <p className="instruction-text">
                                Antes de iniciar, selecione uma ou mais famílias de instrumentos musicais 
                                (Cordas, Madeiras, Metais, Percussão). Essas famílias definirão quais 
                                instrumentos aparecerão nas cartas.
                            </p>
                        </div>
                    </div>

                    <div className="instruction-block">
                        <span className="instruction-number">2</span>
                        <div>
                            <h3 className="instruction-subtitle">ENCONTRE OS PARES</h3>
                            <p className="instruction-text">
                                Clique nas cartas para virá-las e revelar os instrumentos. O objetivo 
                                é encontrar todos os pares correspondentes. Cada carta possui um número 
                                para ajudar na identificação.
                            </p>
                        </div>
                    </div>

                    <div className="instruction-block">
                        <span className="instruction-number">3</span>
                        <div>
                            <h3 className="instruction-subtitle">USE SUA MEMÓRIA MUSICAL</h3>
                            <p className="instruction-text">
                                Ao virar uma carta, o som do instrumento será reproduzido! Use tanto 
                                a memória visual quanto auditiva para lembrar a posição de cada 
                                instrumento e formar os pares.
                            </p>
                        </div>
                    </div>

                    <div className="instruction-block">
                        <span className="instruction-number">4</span>
                        <div>
                            <h3 className="instruction-subtitle">VITÓRIA</h3>
                            <p className="instruction-text">
                                Complete o jogo encontrando todos os pares. Cuide do tempo e tente 
                                fazer o menor número de tentativas possível para uma melhor pontuação!
                            </p>
                        </div>
                    </div>

                    <div className="instructions-controls">
                        <div className="controls-row">
                            <span className="control-key">↑↓</span>
                            <span>Navegar no menu</span>
                        </div>
                        <div className="controls-row">
                            <span className="control-key">ENTER</span>
                            <span>Selecionar</span>
                        </div>
                        <div className="controls-row">
                            <span className="control-key">⏸</span>
                            <span>Pausar durante o jogo</span>
                        </div>
                    </div>
                </div>

                <div className="instructions-footer">
                    <button 
                        className="instructions-ok-button"
                        onClick={onHide}
                    >
                        ENTENDI!
                    </button>
                </div>
            </div>
        </div>
    );
}

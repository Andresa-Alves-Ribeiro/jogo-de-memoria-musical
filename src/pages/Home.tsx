import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { ChooseInstrument } from '../components/ChooseInstrument';
import { InstructionsModal } from '../components/InstructionsModal';
import AnimatedTitle from '../components/AnimatedTitle';
import imageMenu from '../assets/images/image-menu.png';
import { useMenuHoverSound } from '../hooks/useMenuHoverSound';

function Home() {
    const [modalShow, setModalShow] = useState(false);
    const [instructionsShow, setInstructionsShow] = useState(false);
    const [selectedOption, setSelectedOption] = useState(0);
    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);
    const playMenuHoverSound = useMenuHoverSound();

    const menuOptions = useMemo(() => [
        { text: "INICIAR JOGO", action: () => setModalShow(true) },
        { text: "INSTRUÇÕES", action: () => setInstructionsShow(true) },
        { text: "CRÉDITOS", isExternalLink: true, url: 'https://github.com/Andresa-Alves-Ribeiro' }
    ], []);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedOption(prev => (prev > 0 ? prev - 1 : menuOptions.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedOption(prev => (prev < menuOptions.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const option = menuOptions[selectedOption];
            if (option.isExternalLink) {
                window.open(option.url, '_blank');
            } else if (option.action) {
                option.action();
            }
        }
    }, [menuOptions, selectedOption]);

    useEffect(() => {
        if (menuRef.current) {
            menuRef.current.focus();
        }

        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Enter') {
                e.preventDefault();
                handleKeyDown(e as unknown as React.KeyboardEvent);
            }
        };

        window.addEventListener('keydown', handleGlobalKeyDown);

        return () => {
            window.removeEventListener('keydown', handleGlobalKeyDown);
        };
    }, [handleKeyDown]);

    const handleFamilySelect = (selectedFamilies: string[]) => {
        console.log('Famílias selecionadas:', selectedFamilies);
        setModalShow(false);
        navigate('/game');
    }

    return (
        <div 
            style={{ 
                width: '100%', 
                height: '100%', 
                position: 'relative',
                backgroundImage: `url(${imageMenu})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
            role="application"
            aria-label="Menu principal do jogo"
        >
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                width: '100%', 
                height: '100%' 
            }}>
                    <div className='menu-container'
                        tabIndex={0}
                        onKeyDown={handleKeyDown}
                        role="menu"
                        aria-label="Menu de opções"
                    >
                        <AnimatedTitle 
                            text="JOGO DA MEMÓRIA MUSICAL" 
                            className="game-title" 
                            data-text="JOGO DA MEMÓRIA MUSICAL"
                        />
                        
                        <div className="menu-description">
                            <p className="text-zinc-50">Encontre os pares de instrumentos musicais</p>
                            <p className="text-zinc-50">e teste seu conhecimento musical!</p>
                        </div>

                        <div 
                            ref={menuRef}
                            className='menu-options' 
                            tabIndex={0}
                            role="menu"
                            aria-label="Menu de opções"
                            style={{ outline: 'none' }}
                        >
                            {menuOptions.map((option, index) => (
                                option.isExternalLink ? (
                                    <a
                                        key={index}
                                        href={option.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`menu-button no-underline ${selectedOption === index ? 'selected' : ''}`}
                                        onMouseEnter={() => { setSelectedOption(index); playMenuHoverSound(); }}
                                        role="menuitem"
                                        aria-current={selectedOption === index ? "true" : undefined}
                                    >
                                        {option.text}
                                    </a>
                                ) : (
                                    <button
                                        key={index}
                                        className={`menu-button ${selectedOption === index ? 'selected' : ''}`}
                                        onClick={option.action}
                                        onMouseEnter={() => { setSelectedOption(index); playMenuHoverSound(); }}
                                        role="menuitem"
                                        aria-current={selectedOption === index ? "true" : undefined}
                                    >
                                        {option.text}
                                    </button>
                                )
                            ))}
                        </div>

                        <div className="menu-controls">
                            <p>↑↓ : Navegar</p>
                            <p>ENTER : Selecionar</p>
                        </div>
                    </div>
                </div>

            <ChooseInstrument
                show={modalShow}
                onHide={() => setModalShow(false)}
                onFamilySelect={handleFamilySelect}
            />

            <InstructionsModal
                show={instructionsShow}
                onHide={() => setInstructionsShow(false)}
            />
        </div>
    );
}

export default Home;

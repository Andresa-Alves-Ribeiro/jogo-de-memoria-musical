import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { ChooseInstrument } from '../components/chooseInstrument';
import AnimatedBackground from '../components/AnimatedBackground';
import AnimatedTitle from '../components/AnimatedTitle';

function Home() {
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate();

    // Verificar se já existem famílias selecionadas
    useEffect(() => {
        try {
            const storedFamilies = localStorage.getItem('selectedFamilies');
            if (storedFamilies) {
                const selectedFamilies = JSON.parse(storedFamilies);
                if (selectedFamilies.length > 0) {
                    // Se já existirem famílias selecionadas, navegar para o jogo
                    navigate('/game');
                }
            }
        } catch (error) {
            console.error('Error loading families from localStorage:', error);
        }
    }, [navigate]);

    const handleFamilySelect = (selectedFamilies: string[]) => {
        // Aqui você pode salvar as famílias selecionadas no contexto ou estado global
        console.log('Famílias selecionadas:', selectedFamilies);
        setModalShow(false);
        navigate('/game');
    }

    return (
        <AnimatedBackground>
            <div className='h-screen w-screen flex flex-col items-center justify-center'>
                <AnimatedTitle text="JOGO DA MEMÓRIA MUSICAL" className="neon-text mb-12" />

                <div className="mt-8 text-center text-zinc-100 text-xl font-['Kode_Mono']">
                    <p className="float" style={{ animationDelay: '0s' }}>Encontre os pares de instrumentos musicais</p>
                    <p className="float" style={{ animationDelay: '1s' }}>e teste seu conhecimento musical!</p>
                </div>

                <div className='flex items-center justify-center h-44 w-1/5 py-auto'>
                    <button
                        className='button'
                        onClick={() => setModalShow(true)}
                    >
                        START
                    </button>
                </div>

            </div>

            <ChooseInstrument
                show={modalShow}
                onHide={() => setModalShow(false)}
                onFamilySelect={handleFamilySelect}
            />
        </AnimatedBackground>
    );
}

export default Home;

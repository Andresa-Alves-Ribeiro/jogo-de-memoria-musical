import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../App.css';
import { ChooseInstrument } from '../components/chooseInstrument';

import Start from "../assets/start.png"
import StartHover from "../assets/start-hover.png"

function App() {
    const [hovered, setHovered] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const handleStartGame = () => {
        setHovered(!hovered);
    }

    return (
        <div className='background h-screen flex items-center justify-center'>
            <div className='flex items-center justify-center h-44 w-1/5 py-auto'>
                <button
                    onMouseEnter={handleStartGame}
                    onMouseLeave={handleStartGame}
                    className='button'
                    onClick={() => setModalShow(true)}
                >
                    {hovered ? (
                        <img src={StartHover} alt="Botão quando passar o mouse" />
                    ) : (
                        <img src={Start} alt="Botão original" />
                    )}
                </button>
            </div>

            <ChooseInstrument
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
}

export default App;

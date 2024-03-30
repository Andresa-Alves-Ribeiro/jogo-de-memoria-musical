import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { instrumentFamilies } from '../data/familys';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ShowInstrumentProps {
    show: boolean;
    onHide: () => void;
    onFamilySelect: (selectedFamilies: string[]) => void;
}

export function ShowInstrument({ show, onHide, onFamilySelect }: ShowInstrumentProps) {
    const [selectedFamilies, setSelectedFamilies] = useState<string[]>([]);

    const navigate = useNavigate();

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
            onFamilySelect(selectedFamilies);
            onHide();
            localStorage.setItem('selectedFamilies', JSON.stringify(selectedFamilies));
            navigate("/jogo-memoria-instrumentos");
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            variant="secondary"
            data-bs-theme="dark"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className='text-zinc-200 title-font text-3xl flex ml-auto'>
                    Escolha a família dos instrumentos
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className='grid grid-cols-3 mx-auto'>
                    {instrumentFamilies.map((family) => (
                        <div key={family} className="mb-3 text-zinc-100 text-md kode-mono-font">
                            <Form.Check
                                id={family}
                                label={family}
                                checked={selectedFamilies.includes(family)}
                                onChange={() => handleFamilySelect(family)}
                            />
                        </div>
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>FECHAR</Button>
                <Button variant="primary" onClick={handleStartGame}>START</Button>
            </Modal.Footer>
        </Modal>
    );
}
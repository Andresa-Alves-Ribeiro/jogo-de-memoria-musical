import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { instrumentFamilies } from '../data/familys';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ChooseInstrumentProps {
    show: boolean;
    onHide: () => void;
    onFamilySelect: (selectedFamilies: string[]) => void;
}

export function ChooseInstrument({ show, onHide, onFamilySelect }: ChooseInstrumentProps) {
    const [selectedFamily, setSelectedFamily] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleFamilySelect = (family: string) => {
        setSelectedFamily(family);
    };

    const handleStartGame = () => {
        if (selectedFamily) {
            onFamilySelect([selectedFamily]);
            onHide();
            localStorage.setItem('selectedFamily', selectedFamily);
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
                                checked={(selectedFamily !== null && selectedFamily.includes(family)) || false}
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
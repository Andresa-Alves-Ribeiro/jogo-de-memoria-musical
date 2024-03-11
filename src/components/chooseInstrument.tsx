import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { instrumentFamilies } from '../data/familys';

interface ChooseInstrumentProps {
    show: boolean;
    onHide: () => void;
}

export function ChooseInstrument({ show, onHide }: ChooseInstrumentProps) {
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
                    {instrumentFamilies.map((item) => (
                        <div key={item} className="mb-3 text-zinc-100 text-md kode-mono-font">
                            <Form.Check
                                id={item}
                                label={item}
                            />
                        </div>
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>FECHAR</Button>
                <Button variant="primary" href='/jogo-memoria-instrumentos'>START</Button>
            </Modal.Footer>
        </Modal>
    );
}

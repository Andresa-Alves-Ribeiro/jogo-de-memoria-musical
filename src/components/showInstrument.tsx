import Modal from 'react-bootstrap/Modal';
import { Card } from '../pages/Game';

interface ShowInstrumentProps {
    show: boolean;
    onHide: () => void;
    instrument: Card | null;
}

export function ShowInstrument({ show, onHide, instrument }: ShowInstrumentProps) {
    if (!instrument) {
        return null;
    }

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
                <Modal.Title className='text-zinc-200 title-font text-3xl flex ml-auto'>
                    {instrument.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={instrument.image} alt={`Foto do instrumento ${instrument.image}`} />
            </Modal.Body>
        </Modal>
    );
}
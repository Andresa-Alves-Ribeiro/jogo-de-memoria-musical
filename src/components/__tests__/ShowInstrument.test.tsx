import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { ShowInstrument } from '../ShowInstrument';

const mockInstrument = {
  id: 1,
  name: 'Violino',
  audio: '/test/violino.wav',
  image: '/test/violino.jpg',
};

const mockOnHide = vi.fn();

describe('ShowInstrument', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not render when show is false', () => {
    render(
      <ShowInstrument show={false} onHide={mockOnHide} instrument={mockInstrument} />
    );
    expect(screen.queryByText('Violino')).not.toBeInTheDocument();
  });

  it('should not render when instrument is null', () => {
    render(
      <ShowInstrument show={true} onHide={mockOnHide} instrument={null} />
    );
    expect(screen.queryByText('Violino')).not.toBeInTheDocument();
  });

  it('should render instrument name and image when shown', () => {
    render(
      <ShowInstrument show={true} onHide={mockOnHide} instrument={mockInstrument} />
    );
    expect(screen.getByText('Violino')).toBeInTheDocument();
    const img = screen.getByAltText('Foto do instrumento Violino');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test/violino.jpg');
  });

  it('should call onHide when close button is clicked', () => {
    render(
      <ShowInstrument show={true} onHide={mockOnHide} instrument={mockInstrument} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Fechar' }));
    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });

  it('should have dialog role for accessibility', () => {
    render(
      <ShowInstrument show={true} onHide={mockOnHide} instrument={mockInstrument} />
    );
    const dialogs = screen.getAllByRole('dialog');
    expect(dialogs.length).toBeGreaterThan(0);
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { InstructionsModal } from '../InstructionsModal';

const mockOnHide = vi.fn();

describe('InstructionsModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not render when show is false', () => {
    render(<InstructionsModal show={false} onHide={mockOnHide} />);
    expect(screen.queryByText('COMO JOGAR')).not.toBeInTheDocument();
  });

  it('should render when show is true', () => {
    render(<InstructionsModal show={true} onHide={mockOnHide} />);
    expect(screen.getByText('COMO JOGAR')).toBeInTheDocument();
  });

  it('should display all instruction steps', () => {
    render(<InstructionsModal show={true} onHide={mockOnHide} />);
    expect(screen.getByText('ESCOLHA AS FAMÍLIAS')).toBeInTheDocument();
    expect(screen.getByText('ENCONTRE OS PARES')).toBeInTheDocument();
    expect(screen.getByText('USE SUA MEMÓRIA MUSICAL')).toBeInTheDocument();
    expect(screen.getByText('VITÓRIA')).toBeInTheDocument();
  });

  it('should call onHide when close button is clicked', () => {
    render(<InstructionsModal show={true} onHide={mockOnHide} />);
    fireEvent.click(screen.getByRole('button', { name: 'Fechar instruções' }));
    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });

  it('should call onHide when ENTENDI button is clicked', () => {
    render(<InstructionsModal show={true} onHide={mockOnHide} />);
    fireEvent.click(screen.getByText('ENTENDI!'));
    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });
});

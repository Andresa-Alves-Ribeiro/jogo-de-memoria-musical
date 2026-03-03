import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ChooseInstrument } from '../ChooseInstrument';
import { vi } from 'vitest';

vi.mock('../../hooks/useMenuHoverSound', () => ({
  useMenuHoverSound: () => vi.fn(),
}));

const mockOnHide = vi.fn();
const mockOnFamilySelect = vi.fn();

const renderChooseInstrument = (show = true) => {
  return render(
    <BrowserRouter>
      <ChooseInstrument
        show={show}
        onHide={mockOnHide}
        onFamilySelect={mockOnFamilySelect}
      />
    </BrowserRouter>
  );
};

describe('ChooseInstrument', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should not render when show is false', () => {
    renderChooseInstrument(false);
    expect(screen.queryByText('ESCOLHA SUAS FAMÍLIAS')).not.toBeInTheDocument();
  });

  it('should render when show is true', () => {
    renderChooseInstrument(true);
    expect(screen.getByText('ESCOLHA SUAS FAMÍLIAS')).toBeInTheDocument();
  });

  it('should display all instrument families', () => {
    renderChooseInstrument(true);
    expect(screen.getByText('Cordas de arco')).toBeInTheDocument();
    expect(screen.getByText('Metais')).toBeInTheDocument();
    expect(screen.getByText('Madeiras')).toBeInTheDocument();
  });

  it('should call onHide when close button is clicked', () => {
    renderChooseInstrument(true);
    const closeButton = screen.getByRole('button', { name: 'Fechar' });
    fireEvent.click(closeButton);
    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });

  it('should call onHide when cancel button is clicked', () => {
    renderChooseInstrument(true);
    fireEvent.click(screen.getByText('CANCELAR'));
    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });

  it('should disable INICIAR JOGO when no family is selected', () => {
    renderChooseInstrument(true);
    const startButton = screen.getByText('INICIAR JOGO');
    expect(startButton).toBeDisabled();
  });

  it('should enable INICIAR JOGO and save to localStorage when family is selected', () => {
    renderChooseInstrument(true);
    fireEvent.click(screen.getByText('Metais'));
    const startButton = screen.getByText('INICIAR JOGO');
    expect(startButton).not.toBeDisabled();

    fireEvent.click(startButton);
    expect(localStorage.getItem('selectedFamilies')).toBe(JSON.stringify(['Metais']));
    expect(mockOnFamilySelect).toHaveBeenCalledWith(['Metais']);
    expect(mockOnHide).toHaveBeenCalled();
  });

  it('should toggle family selection on click', () => {
    renderChooseInstrument(true);
    const metaisButton = screen.getByRole('button', { name: /Metais/i });

    fireEvent.click(metaisButton);
    expect(metaisButton).toHaveClass('selected');

    fireEvent.click(metaisButton);
    expect(metaisButton).not.toHaveClass('selected');
  });

  it('should call onFamilySelect and onHide even when localStorage.setItem throws', () => {
    const originalSetItem = localStorage.setItem.bind(localStorage);
    localStorage.setItem = vi.fn(() => {
      throw new Error('QuotaExceeded');
    }) as typeof localStorage.setItem;

    renderChooseInstrument(true);
    fireEvent.click(screen.getByText('Metais'));
    fireEvent.click(screen.getByText('INICIAR JOGO'));

    expect(mockOnFamilySelect).toHaveBeenCalledWith(['Metais']);
    expect(mockOnHide).toHaveBeenCalled();

    localStorage.setItem = originalSetItem;
  });
});

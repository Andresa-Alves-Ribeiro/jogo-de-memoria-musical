import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';

vi.mock('../../hooks/useMenuHoverSound', () => ({
  useMenuHoverSound: () => vi.fn(),
}));

const renderHome = () => {
  return render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
};

describe('Home Page', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render the main title', () => {
    const { container } = renderHome();
    const heading = container.querySelector('h1');
    expect(heading?.textContent).toContain('JOGO');
    expect(heading?.textContent).toContain('MEMÓRIA');
  });

  it('should render menu description', () => {
    renderHome();
    expect(screen.getByText('Encontre os pares de instrumentos musicais')).toBeInTheDocument();
    expect(screen.getByText('e teste seu conhecimento musical!')).toBeInTheDocument();
  });

  it('should render menu options', () => {
    renderHome();
    expect(screen.getByText('INICIAR JOGO')).toBeInTheDocument();
    expect(screen.getByText('INSTRUÇÕES')).toBeInTheDocument();
    expect(screen.getByText('CRÉDITOS')).toBeInTheDocument();
  });

  it('should render keyboard controls hint', () => {
    renderHome();
    expect(screen.getByText('↑↓ : Navegar')).toBeInTheDocument();
    expect(screen.getByText('ENTER : Selecionar')).toBeInTheDocument();
  });

  it('should open ChooseInstrument modal when clicking INICIAR JOGO', async () => {
    renderHome();
    const iniciarButton = screen.getByText('INICIAR JOGO');
    fireEvent.click(iniciarButton);
    expect(screen.getByText('ESCOLHA SUAS FAMÍLIAS')).toBeInTheDocument();
  });

  it('should open InstructionsModal when clicking INSTRUÇÕES', async () => {
    renderHome();
    const instrucoesButton = screen.getByText('INSTRUÇÕES');
    fireEvent.click(instrucoesButton);
    expect(screen.getByText('COMO JOGAR')).toBeInTheDocument();
  });

  it('should have credits link with correct href', () => {
    const { container } = renderHome();
    const creditsLink = container.querySelector('a[href="https://github.com/Andresa-Alves-Ribeiro"]');
    expect(creditsLink).toBeInTheDocument();
    expect(creditsLink).toHaveAttribute('target', '_blank');
  });

  it('should have accessible menu structure', () => {
    renderHome();
    expect(screen.getByRole('application')).toBeInTheDocument();
    expect(screen.getAllByRole('menu').length).toBeGreaterThan(0);
  });

  it('should navigate with ArrowDown key', () => {
    renderHome();
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    const items = screen.getAllByRole('menuitem');
    expect(items[2]).toHaveAttribute('aria-current', 'true');
  });

  it('should navigate with ArrowUp key', () => {
    renderHome();
    fireEvent.keyDown(window, { key: 'ArrowUp' });
    const items = screen.getAllByRole('menuitem');
    expect(items[1]).toHaveAttribute('aria-current', 'true');
  });

  it('should open modal when pressing Enter on INICIAR JOGO', () => {
    renderHome();
    fireEvent.keyDown(window, { key: 'Enter' });
    expect(screen.getByText('ESCOLHA SUAS FAMÍLIAS')).toBeInTheDocument();
  });

  it('should open InstructionsModal when pressing Enter after navigating to INSTRUÇÕES', () => {
    renderHome();
    fireEvent.keyDown(window, { key: 'ArrowUp' });
    fireEvent.keyDown(window, { key: 'Enter' });
    expect(screen.getByText('COMO JOGAR')).toBeInTheDocument();
  });
});

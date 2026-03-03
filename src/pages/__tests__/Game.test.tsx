import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Game from '../Game';
import { GameProvider } from '../../contexts/GameContext';
import { GameStatsProvider } from '../../contexts/GameStatsContext';
import { AudioProvider } from '../../contexts/AudioContext';

const renderGame = () => {
  return render(
    <BrowserRouter>
      <AudioProvider>
        <GameProvider>
          <GameStatsProvider>
            <Game />
          </GameStatsProvider>
        </GameProvider>
      </AudioProvider>
    </BrowserRouter>
  );
};

describe('Game Component', () => {
  beforeEach(() => {
    localStorage.setItem('selectedFamilies', JSON.stringify(['Metais']));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should render the game board with cards', () => {
    renderGame();
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should render surrender button', () => {
    renderGame();
    expect(screen.getByText('DESISTIR')).toBeInTheDocument();
  });

  it('should render cards when families are selected', () => {
    renderGame();
    const interactiveElements = screen.getAllByRole('button');
    expect(interactiveElements.length).toBeGreaterThan(0);
  });

  it('should open surrender modal when clicking DESISTIR', () => {
    renderGame();
    fireEvent.click(screen.getByText('DESISTIR'));
    expect(screen.getByText('Desistir do Jogo')).toBeInTheDocument();
    expect(screen.getByText('Tem certeza que deseja desistir do jogo? Todo o progresso será perdido.')).toBeInTheDocument();
  });

  it('should show PAUSAR when game is playing', () => {
    renderGame();
    expect(screen.getByText('PAUSAR')).toBeInTheDocument();
  });

  it('should toggle between PAUSAR and CONTINUAR when clicking pause button', () => {
    renderGame();
    const pauseButton = screen.getByText('PAUSAR').closest('button');
    expect(pauseButton).toBeInTheDocument();

    fireEvent.click(pauseButton!);
    expect(screen.getByText('CONTINUAR')).toBeInTheDocument();

    fireEvent.click(screen.getByText('CONTINUAR').closest('button')!);
    expect(screen.getByText('PAUSAR')).toBeInTheDocument();
  });

  it('should render TESTAR ÁUDIO button', () => {
    renderGame();
    expect(screen.getByText('TESTAR ÁUDIO')).toBeInTheDocument();
  });

  it('should confirm surrender and navigate when clicking Confirmar in modal', () => {
    const { container } = renderGame();
    fireEvent.click(screen.getByText('DESISTIR'));
    fireEvent.click(screen.getByText('Confirmar'));
    expect(localStorage.getItem('selectedFamilies')).toBeNull();
  });
}); 
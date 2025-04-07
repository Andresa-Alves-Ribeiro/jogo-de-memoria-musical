import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Game from '../Game';
import { GameProvider } from '../../contexts/GameContext';

const renderGame = () => {
  return render(
    <BrowserRouter>
      <GameProvider>
        <Game />
      </GameProvider>
    </BrowserRouter>
  );
};

describe('Game Component', () => {
  it('should render the game board', () => {
    renderGame();
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('should render header', () => {
    renderGame();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should render cards when they are loaded', () => {
    // Mock do localStorage para simular cards carregados
    localStorage.setItem('selectedFamilies', JSON.stringify(['cordas']));
    
    renderGame();
    
    // Aguarda os cards serem renderizados
    const cards = screen.getAllByRole('button');
    expect(cards.length).toBeGreaterThan(0);
  });
}); 
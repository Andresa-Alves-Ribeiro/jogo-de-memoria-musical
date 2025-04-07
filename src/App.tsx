import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import { GameProvider } from './contexts/GameContext';

const App: React.FC = () => {

  return (
    <Router>
      <GameProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jogo-memoria-instrumentos" element={<Game />} />
        </Routes>
      </GameProvider>
    </Router>
  );
}

export default App;
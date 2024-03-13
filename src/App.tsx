import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jogo-memoria-instrumentos" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
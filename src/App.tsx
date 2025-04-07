import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy loading dos componentes
const Home = lazy(() => import('./pages/Home'));
const Game = lazy(() => import('./pages/Game'));

// Componente de loading
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <GameProvider>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jogo-memoria-instrumentos" element={<Game />} />
            </Routes>
          </Suspense>
        </GameProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
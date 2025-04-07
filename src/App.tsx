import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import ErrorBoundary from './components/ErrorBoundary';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lazy loading dos componentes
const Home = React.lazy(() => import('./pages/Home'));
const Game = React.lazy(() => import('./pages/Game'));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <GameProvider>
          <div className="w-screen h-screen overflow-hidden">
            <Suspense fallback={<div>Carregando...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<Game />} />
              </Routes>
            </Suspense>
            <ToastContainer />
          </div>
        </GameProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
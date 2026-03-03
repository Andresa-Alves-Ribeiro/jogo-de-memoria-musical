import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import { GameStatsProvider } from './contexts/GameStatsContext';
import { AudioProvider } from './contexts/AudioContext';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/Loading';
import { Toaster } from 'sonner';

const Home = React.lazy(() => import('./pages/Home'));
const Game = React.lazy(() => import('./pages/Game'));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AudioProvider>
          <GameProvider>
            <GameStatsProvider>
              <div style={{ width: '100%', height: '100%' }}>
                <Suspense fallback={<Loading />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route 
                      path="/game" 
                      element={
                        <ProtectedRoute>
                          <Game />
                        </ProtectedRoute>
                      } 
                    />
                  </Routes>
                </Suspense>
                <Toaster richColors position="top-center" />
              </div>
            </GameStatsProvider>
          </GameProvider>
        </AudioProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
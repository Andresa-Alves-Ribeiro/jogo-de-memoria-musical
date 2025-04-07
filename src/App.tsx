import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/Loading';

// Lazy loading dos componentes
const Home = React.lazy(() => import('./pages/Home'));
const Game = React.lazy(() => import('./pages/Game'));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <GameProvider>
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
            <ToastContainer />
          </div>
        </GameProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
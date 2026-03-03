import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

const MockGamePage = () => <div>Game Page</div>;

const renderWithRouter = (initialEntries = ['/game']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route
          path="/game"
          element={
            <ProtectedRoute>
              <MockGamePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>
  );
};

describe('ProtectedRoute', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should redirect to home when no families are selected', () => {
    renderWithRouter();
    expect(screen.getByText('Home Page')).toBeInTheDocument();
    expect(screen.queryByText('Game Page')).not.toBeInTheDocument();
  });

  it('should allow access when valid families are in localStorage', () => {
    localStorage.setItem('selectedFamilies', JSON.stringify(['Metais']));
    renderWithRouter();
    expect(screen.getByText('Game Page')).toBeInTheDocument();
    expect(screen.queryByText('Home Page')).not.toBeInTheDocument();
  });

  it('should redirect when families array is empty', () => {
    localStorage.setItem('selectedFamilies', JSON.stringify([]));
    renderWithRouter();
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('should redirect when localStorage has invalid JSON', () => {
    localStorage.setItem('selectedFamilies', 'invalid-json');
    renderWithRouter();
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('should redirect when parsed value is not an array', () => {
    localStorage.setItem('selectedFamilies', JSON.stringify('not-an-array'));
    renderWithRouter();
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
});

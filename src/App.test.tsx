import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';

vi.mock('./pages/Home', () => ({
  default: () => <div>Home Page</div>,
}));
vi.mock('./pages/Game', () => ({
  default: () => <div>Game Page</div>,
}));

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render Home at root path', async () => {
    window.location.pathname = '/';
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Home Page')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('should render Loading or content', async () => {
    render(<App />);
    await waitFor(() => {
      const home = screen.queryByText('Home Page');
      const game = screen.queryByText('Game Page');
      const loading = screen.queryByText('CARREGANDO...');
      expect(home || game || loading).toBeTruthy();
    }, { timeout: 3000 });
  });
});

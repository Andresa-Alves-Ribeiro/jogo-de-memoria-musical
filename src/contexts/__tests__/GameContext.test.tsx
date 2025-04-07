import { render, act, renderHook } from '@testing-library/react';
import { GameProvider, useGame } from '../GameContext';
import { instrumentsByFamily } from '../../data/familys';
import { vi } from 'vitest';

// Mock do react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

// Mock do sonner
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('GameContext', () => {
  beforeEach(() => {
    // Limpa o localStorage antes de cada teste
    localStorage.clear();
  });

  it('should initialize with empty state', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <GameProvider>{children}</GameProvider>
    );

    const { result } = renderHook(() => useGame(), { wrapper });

    expect(result.current.cards).toEqual([]);
    expect(result.current.selectedCards).toEqual([]);
    expect(result.current.matchedCards).toEqual([]);
    expect(result.current.showInstrumentModal).toBe(false);
    expect(result.current.matchedInstrument).toBeNull();
  });

  it('should load cards from localStorage', () => {
    const selectedFamilies = ['cordas'];
    localStorage.setItem('selectedFamilies', JSON.stringify(selectedFamilies));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <GameProvider>{children}</GameProvider>
    );

    const { result } = renderHook(() => useGame(), { wrapper });

    expect(result.current.cards.length).toBeGreaterThan(0);
  });

  it('should handle card flip correctly', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <GameProvider>{children}</GameProvider>
    );

    const { result } = renderHook(() => useGame(), { wrapper });

    const card = {
      id: 1,
      name: 'Test Card',
      audio: 'test-audio.mp3',
      image: 'test-image.jpg',
    };

    act(() => {
      result.current.handleFlip(card);
    });

    expect(result.current.selectedCards).toContainEqual(card);
  });
}); 
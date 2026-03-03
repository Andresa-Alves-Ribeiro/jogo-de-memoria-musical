import { act, renderHook, waitFor } from '@testing-library/react';
import { GameProvider, useGame } from '../GameContext';
import { vi } from 'vitest';

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

const mockToast = vi.hoisted(() => ({
  success: vi.fn(),
  error: vi.fn(),
}));
vi.mock('sonner', () => ({
  toast: mockToast,
}));

describe('GameContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
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

  it('should call initializeGame without throwing', () => {
    const selectedFamilies = ['Metais'];
    localStorage.setItem('selectedFamilies', JSON.stringify(selectedFamilies));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <GameProvider>{children}</GameProvider>
    );

    const { result } = renderHook(() => useGame(), { wrapper });

    expect(() => {
      act(() => {
        result.current.initializeGame();
      });
    }).not.toThrow();
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

  it('should show modal and add to matchedCards when two matching cards are flipped', async () => {
    localStorage.setItem('selectedFamilies', JSON.stringify(['Metais']));
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <GameProvider>{children}</GameProvider>
    );

    const { result } = renderHook(() => useGame(), { wrapper });

    act(() => {
      result.current.initializeGame();
    });

    const cards = result.current.cards;
    const card1 = cards.find((c) => c.name === 'Trompete');
    const card2 = cards.find((c) => c.name === 'Trompete' && c.id !== card1?.id);
    if (!card1 || !card2) throw new Error('Cards not found');

    act(() => {
      result.current.handleFlip(card1);
    });

    act(() => {
      result.current.handleFlip(card2);
    });

    await waitFor(() => {
      expect(result.current.showInstrumentModal).toBe(true);
      expect(result.current.matchedInstrument).toEqual(card1);
      expect(result.current.matchedCards).toContainEqual(card1);
      expect(result.current.matchedCards).toContainEqual(card2);
    });
  });

  it('should call handleHideInstrumentModal correctly', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <GameProvider>{children}</GameProvider>
    );

    const { result } = renderHook(() => useGame(), { wrapper });

    act(() => {
      result.current.handleHideInstrumentModal();
    });

    expect(result.current.showInstrumentModal).toBe(false);
  });

  it('should call handleAudioEnded and clear selectedCards when more than 1 card', async () => {
    localStorage.setItem('selectedFamilies', JSON.stringify(['Metais', 'Madeiras']));
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <GameProvider>{children}</GameProvider>
    );

    const { result } = renderHook(() => useGame(), { wrapper });

    act(() => {
      result.current.initializeGame();
    });

    const cards = result.current.cards;
    const card1 = cards.find((c) => c.name === 'Trompete');
    const card2 = cards.find((c) => c.name === 'Flauta Doce');
    expect(card1).toBeDefined();
    expect(card2).toBeDefined();
    expect(card1!.audio).not.toBe(card2!.audio);

    act(() => {
      result.current.handleFlip(card1!);
    });
    act(() => {
      result.current.handleFlip(card2!);
    });

    await waitFor(() => {
      expect(result.current.selectedCards.length).toBe(2);
    });

    act(() => {
      result.current.handleAudioEnded();
    });

    await waitFor(() => {
      expect(result.current.selectedCards).toEqual([]);
    });
  });

  it('should call toast.error when family is not found', () => {
    localStorage.setItem('selectedFamilies', JSON.stringify(['FamiliaInexistente']));
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <GameProvider>{children}</GameProvider>
    );

    const { result } = renderHook(() => useGame(), { wrapper });

    act(() => {
      result.current.initializeGame();
    });

    expect(mockToast.error).toHaveBeenCalledWith('Família FamiliaInexistente não encontrada');
  });
}); 
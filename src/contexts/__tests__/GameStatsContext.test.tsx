import { renderHook, act } from '@testing-library/react';
import { GameStatsProvider, useGameStats } from '../GameStatsContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <GameStatsProvider>{children}</GameStatsProvider>
);

describe('GameStatsContext', () => {
  it('should throw when useGameStats is used outside provider', () => {
    expect(() => renderHook(() => useGameStats(), { wrapper: ({ children }) => <>{children}</> }))
      .toThrow('useGameStats must be used within a GameStatsProvider');
  });

  it('should provide initial stats', () => {
    const { result } = renderHook(() => useGameStats(), { wrapper });
    expect(result.current.time).toBe(0);
    expect(result.current.attempts).toBe(0);
    expect(result.current.score).toBe(0);
    expect(result.current.isPlaying).toBe(false);
  });

  it('should start game', () => {
    const { result } = renderHook(() => useGameStats(), { wrapper });
    act(() => {
      result.current.startGame();
    });
    expect(result.current.isPlaying).toBe(true);
  });

  it('should pause game', () => {
    const { result } = renderHook(() => useGameStats(), { wrapper });
    act(() => {
      result.current.startGame();
    });
    act(() => {
      result.current.pauseGame();
    });
    expect(result.current.isPlaying).toBe(false);
  });

  it('should increment attempts', () => {
    const { result } = renderHook(() => useGameStats(), { wrapper });
    act(() => {
      result.current.incrementAttempts();
    });
    expect(result.current.attempts).toBe(1);
  });

  it('should update score', () => {
    const { result } = renderHook(() => useGameStats(), { wrapper });
    act(() => {
      result.current.updateScore(2, 4);
    });
    expect(result.current.score).toBeGreaterThan(0);
  });

  it('should reset game preserving best scores', () => {
    const { result } = renderHook(() => useGameStats(), { wrapper });
    act(() => {
      result.current.startGame();
      result.current.incrementAttempts();
      result.current.updateScore(1, 2);
    });
    const bestScore = result.current.bestScore;
    act(() => {
      result.current.resetGame();
    });
    expect(result.current.attempts).toBe(0);
    expect(result.current.score).toBe(0);
    expect(result.current.isPlaying).toBe(false);
    expect(result.current.bestScore).toBe(bestScore);
  });
});

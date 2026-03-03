import { renderHook, act } from '@testing-library/react';
import { useGameSounds } from '../useGameSounds';

describe('useGameSounds', () => {
  it('should return playVictorySound', () => {
    const { result } = renderHook(() => useGameSounds());
    expect(result.current).toHaveProperty('playVictorySound');
    expect(typeof result.current.playVictorySound).toBe('function');
  });

  it('should call playVictorySound without throwing', () => {
    const { result } = renderHook(() => useGameSounds());
    act(() => {
      result.current.playVictorySound();
    });
    // Audio is mocked, so we just verify no error
  });
});

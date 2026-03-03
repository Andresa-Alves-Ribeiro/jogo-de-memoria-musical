import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { AudioProvider, useAudio } from '../AudioContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AudioProvider>{children}</AudioProvider>
);

describe('AudioContext', () => {
  it('should throw when useAudio is used outside provider', () => {
    expect(() => renderHook(() => useAudio(), { wrapper: ({ children }) => <>{children}</> }))
      .toThrow('useAudio must be used within an AudioProvider');
  });

  it('should provide audio context within provider', () => {
    const { result } = renderHook(() => useAudio(), { wrapper });
    expect(result.current).toHaveProperty('playAudio');
    expect(result.current).toHaveProperty('stopAudio');
    expect(result.current).toHaveProperty('isPlaying');
    expect(typeof result.current.playAudio).toBe('function');
    expect(typeof result.current.stopAudio).toBe('function');
    expect(typeof result.current.isPlaying).toBe('boolean');
  });

  it('should start with isPlaying false', () => {
    const { result } = renderHook(() => useAudio(), { wrapper });
    expect(result.current.isPlaying).toBe(false);
  });

  it('should call playAudio without throwing', async () => {
    const { result } = renderHook(() => useAudio(), { wrapper });
    await act(async () => {
      await result.current.playAudio('/test/audio.mp3');
    });
    expect(result.current.isPlaying).toBe(true);
  });

  it('should call stopAudio without throwing', async () => {
    const { result } = renderHook(() => useAudio(), { wrapper });
    await act(async () => {
      await result.current.playAudio('/test/audio.mp3');
    });
    act(() => {
      result.current.stopAudio();
    });
    expect(result.current.isPlaying).toBe(false);
  });

  it('should not replay when same audio is already playing', async () => {
    const { result } = renderHook(() => useAudio(), { wrapper });
    await act(async () => {
      await result.current.playAudio('/same.mp3');
    });
    expect(result.current.isPlaying).toBe(true);
    await act(async () => {
      await result.current.playAudio('/same.mp3');
    });
    expect(result.current.isPlaying).toBe(true);
  });

  it('should handle play() error gracefully', async () => {
    const mockPlay = vi.fn().mockRejectedValueOnce(new Error('Play failed'));
    const FailingAudio = class {
      play = mockPlay;
      pause = vi.fn();
      currentTime = 0;
      load = vi.fn();
      addEventListener = vi.fn();
      removeEventListener = vi.fn();
      onended = null;
    };
    vi.stubGlobal('Audio', FailingAudio);

    const { result } = renderHook(() => useAudio(), { wrapper });
    await act(async () => {
      await result.current.playAudio('/failing.mp3');
    });
    expect(result.current.isPlaying).toBe(false);

    vi.unstubAllGlobals();
  });
});

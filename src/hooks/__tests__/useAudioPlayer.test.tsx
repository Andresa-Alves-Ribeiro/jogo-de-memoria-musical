import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useAudioPlayer } from '../useAudioPlayer';

describe('useAudioPlayer', () => {
  it('should return isPlaying, play and stop', () => {
    const { result } = renderHook(() => useAudioPlayer('/test/audio.mp3'));
    expect(result.current).toHaveProperty('isPlaying');
    expect(result.current).toHaveProperty('play');
    expect(result.current).toHaveProperty('stop');
    expect(typeof result.current.play).toBe('function');
    expect(typeof result.current.stop).toBe('function');
  });

  it('should start with isPlaying false', () => {
    const { result } = renderHook(() => useAudioPlayer('/test/audio.mp3'));
    expect(result.current.isPlaying).toBe(false);
  });

  it('should call play without throwing', async () => {
    const { result } = renderHook(() => useAudioPlayer('/test/audio.mp3'));
    act(() => {
      result.current.play();
    });
  });

  it('should call stop without throwing', () => {
    const { result } = renderHook(() => useAudioPlayer('/test/audio.mp3'));
    act(() => {
      result.current.stop();
    });
  });

  it('should handle play() error and set isPlaying to false', async () => {
    const mockPlay = vi.fn().mockRejectedValue(new Error('Play failed'));
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

    const { result } = renderHook(() => useAudioPlayer('/test/audio.mp3'));
    await act(async () => {
      result.current.play();
    });
    expect(result.current.isPlaying).toBe(false);

    vi.unstubAllGlobals();
  });
});

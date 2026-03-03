import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useAudio } from '../useAudio';

describe('useAudio', () => {
  it('should return play and pause functions', () => {
    const { result } = renderHook(() =>
      useAudio({ src: '/test/audio.mp3' })
    );
    expect(result.current).toHaveProperty('play');
    expect(result.current).toHaveProperty('pause');
    expect(typeof result.current.play).toBe('function');
    expect(typeof result.current.pause).toBe('function');
  });

  it('should call play without throwing', () => {
    const { result } = renderHook(() =>
      useAudio({ src: '/test/audio.mp3' })
    );
    act(() => {
      result.current.play();
    });
  });

  it('should call pause without throwing', () => {
    const { result } = renderHook(() =>
      useAudio({ src: '/test/audio.mp3' })
    );
    act(() => {
      result.current.pause();
    });
  });

  it('should register onEnded listener when callback provided', () => {
    const onEnded = vi.fn();
    const addEventListenerSpy = vi.fn();
    const CustomAudio = class {
      play = vi.fn().mockResolvedValue(undefined);
      pause = vi.fn();
      load = vi.fn();
      currentTime = 0;
      addEventListener = addEventListenerSpy;
      removeEventListener = vi.fn();
      onended = null;
    };
    vi.stubGlobal('Audio', CustomAudio);

    renderHook(() => useAudio({ src: '/test/audio.mp3', onEnded }));
    expect(addEventListenerSpy).toHaveBeenCalledWith('ended', onEnded);

    vi.unstubAllGlobals();
  });
});

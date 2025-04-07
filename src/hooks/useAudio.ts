import { useEffect, useRef } from 'react';

interface UseAudioProps {
  src: string;
  onEnded?: () => void;
}

export const useAudio = ({ src, onEnded }: UseAudioProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(src);
    
    if (onEnded) {
      audioRef.current.addEventListener('ended', onEnded);
    }

    return () => {
      if (audioRef.current && onEnded) {
        audioRef.current.removeEventListener('ended', onEnded);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [src, onEnded]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return { play, pause };
}; 
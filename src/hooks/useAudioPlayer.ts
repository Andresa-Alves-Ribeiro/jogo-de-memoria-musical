import { useState, useRef, useEffect } from 'react';

export const useAudioPlayer = (audioSrc: string | undefined) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioSrc) {
      const audio = new Audio(audioSrc);

      audio.addEventListener('ended', () => setIsPlaying(false));
      audio.addEventListener('error', (e) => {
        console.error('Erro ao carregar áudio:', e);
        setIsPlaying(false);
      });

      audioRef.current = audio;
      audio.load();

      return () => {
        audio.pause();
        audio.currentTime = 0;
        audio.removeEventListener('ended', () => setIsPlaying(false));
        audio.removeEventListener('error', () => setIsPlaying(false));
        audioRef.current = null;
      };
    }
  }, [audioSrc]);

  const play = () => {
    if (audioRef.current) {
      const allAudios = document.querySelectorAll('audio');
      allAudios.forEach(audio => {
        if (audio !== audioRef.current) {
          audio.pause();
          audio.currentTime = 0;
        }
      });

      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Áudio reproduzido com sucesso:', audioSrc);
            setIsPlaying(true);
          })
          .catch(error => {
            console.error('Erro ao reproduzir áudio:', error);
            setIsPlaying(false);
          });
      }
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return { isPlaying, play, stop };
}; 
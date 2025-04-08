import { useState, useRef, useEffect } from 'react';

export const useAudioPlayer = (audioSrc: string | undefined) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Inicializar o áudio quando o componente montar ou o src mudar
  useEffect(() => {
    if (audioSrc) {
      // Criar um novo elemento de áudio
      const audio = new Audio(audioSrc);
      
      // Configurar eventos
      audio.addEventListener('ended', () => setIsPlaying(false));
      audio.addEventListener('error', (e) => {
        console.error('Erro ao carregar áudio:', e);
        setIsPlaying(false);
      });
      
      // Armazenar a referência
      audioRef.current = audio;
      
      // Pré-carregar o áudio
      audio.load();
      
      // Limpar ao desmontar
      return () => {
        audio.pause();
        audio.currentTime = 0;
        audio.removeEventListener('ended', () => setIsPlaying(false));
        audio.removeEventListener('error', () => setIsPlaying(false));
        audioRef.current = null;
      };
    }
  }, [audioSrc]);

  // Função para tocar o áudio
  const play = () => {
    if (audioRef.current) {
      // Parar qualquer outro áudio que esteja tocando
      const allAudios = document.querySelectorAll('audio');
      allAudios.forEach(audio => {
        if (audio !== audioRef.current) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
      
      // Tocar o áudio atual
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

  // Função para parar o áudio
  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return { isPlaying, play, stop };
}; 
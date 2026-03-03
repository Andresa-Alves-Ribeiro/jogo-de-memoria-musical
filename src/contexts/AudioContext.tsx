import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

interface AudioContextType {
  playAudio: (audioSrc: string) => Promise<void>;
  stopAudio: () => void;
  isPlaying: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCache = useRef<Map<string, HTMLAudioElement>>(new Map());
  const currentAudioSrc = useRef<string | null>(null);

  const playAudio = useCallback(async (audioSrc: string) => {
    try {
      console.log('Tentando reproduzir áudio:', audioSrc);

      if (currentAudioSrc.current === audioSrc && isPlaying) {
        console.log('Áudio já está tocando');
        return;
      }

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      let audio = audioCache.current.get(audioSrc);

      if (!audio) {
        audio = new Audio(audioSrc);
        audioCache.current.set(audioSrc, audio);

        audio.onended = () => {
          setIsPlaying(false);
          currentAudioSrc.current = null;
        };
      }

      audioRef.current = audio;
      currentAudioSrc.current = audioSrc;

      await audio.play();
      console.log('Áudio reproduzido com sucesso');
      setIsPlaying(true);
      
    } catch (error) {
      console.error('Erro ao reproduzir áudio:', error);
      setIsPlaying(false);
      currentAudioSrc.current = null;
    }
  }, [isPlaying]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      currentAudioSrc.current = null;
    }
  }, []);

  return (
    <AudioContext.Provider value={{ playAudio, stopAudio, isPlaying }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}; 
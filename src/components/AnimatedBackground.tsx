import React, { useEffect, useState } from 'react';
import { 
  MusicNote, 
  MusicNotes, 
  MusicNoteSimple, 
  MusicNotesSimple
} from "@phosphor-icons/react";

interface AnimatedBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

interface Note {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  noteType: string;
  color: string;
  rotation: number;
  rotationSpeed: number;
  pulseSpeed: number;
  pulseSize: number;
  pulseDirection: number;
  glowIntensity: number;
  glowDirection: number;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ className = '', children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Função para inicializar as notas
  const initNotes = () => {
    const newNotes: Note[] = [];
    const numberOfNotes = 50;
    const noteTypes = [
      'MusicNote', 
      'MusicNotes', 
      'MusicNoteSimple', 
      'MusicNotesSimple'
    ];
    const colors = [
      '#FF00FF', // Magenta neon
      '#00FF00', // Verde neon
      '#00FFFF', // Ciano neon
      '#FF0000', // Vermelho neon
      '#0000FF', // Azul neon
      '#FFFF00', // Amarelo neon
    ];

    for (let i = 0; i < numberOfNotes; i++) {
      newNotes.push({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 20 + 20,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        noteType: noteTypes[Math.floor(Math.random() * noteTypes.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        pulseSpeed: Math.random() * 0.05 + 0.02,
        pulseSize: 1,
        pulseDirection: 1,
        glowIntensity: Math.random() * 0.5 + 0.5,
        glowDirection: 1,
      });
    }

    setNotes(newNotes);
  };

  // Função para atualizar as notas
  const updateNotes = () => {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        // Atualizar posição
        let newX = note.x + note.speedX;
        let newY = note.y + note.speedY;
        let newRotation = note.rotation + note.rotationSpeed;

        // Efeito de pulsar
        let newPulseSize = note.pulseSize;
        let newPulseDirection = note.pulseDirection;
        if (note.pulseDirection === 1) {
          newPulseSize += note.pulseSpeed;
          if (newPulseSize >= 1.2) newPulseDirection = -1;
        } else {
          newPulseSize -= note.pulseSpeed;
          if (newPulseSize <= 0.8) newPulseDirection = 1;
        }

        // Efeito de brilho
        let newGlowIntensity = note.glowIntensity;
        let newGlowDirection = note.glowDirection;
        if (note.glowDirection === 1) {
          newGlowIntensity += 0.02;
          if (newGlowIntensity >= 1) newGlowDirection = -1;
        } else {
          newGlowIntensity -= 0.02;
          if (newGlowIntensity <= 0.5) newGlowDirection = 1;
        }

        // Verificar limites
        if (newX < -note.size) newX = dimensions.width + note.size;
        if (newX > dimensions.width + note.size) newX = -note.size;
        if (newY < -note.size) newY = dimensions.height + note.size;
        if (newY > dimensions.height + note.size) newY = -note.size;

        return {
          ...note,
          x: newX,
          y: newY,
          rotation: newRotation,
          pulseSize: newPulseSize,
          pulseDirection: newPulseDirection,
          glowIntensity: newGlowIntensity,
          glowDirection: newGlowDirection,
        };
      });
    });
  };

  // Função para renderizar um ícone de nota
  const renderNoteIcon = (note: Note) => {
    const containerStyle = {
      position: 'absolute' as const,
      left: `${note.x}px`,
      top: `${note.y}px`,
      transform: `rotate(${note.rotation}deg) scale(${note.pulseSize})`,
      zIndex: 1,
      width: `${note.size}px`,
      height: `${note.size}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const iconStyle = {
      color: note.color,
      filter: `drop-shadow(0 0 ${10 * note.glowIntensity}px ${note.color})`,
      opacity: 0.8,
    };

    const iconProps = {
      size: note.size,
      weight: "fill",
      style: iconStyle,
    };

    switch (note.noteType) {
      case 'MusicNote':
        return <div style={containerStyle}><MusicNote {...iconProps} /></div>;
      case 'MusicNotes':
        return <div style={containerStyle}><MusicNotes {...iconProps} /></div>;
      case 'MusicNoteSimple':
        return <div style={containerStyle}><MusicNoteSimple {...iconProps} /></div>;
      case 'MusicNotesSimple':
        return <div style={containerStyle}><MusicNotesSimple {...iconProps} /></div>;
      default:
        return <div style={containerStyle}><MusicNote {...iconProps} /></div>;
    }
  };

  // Efeito para inicializar as dimensões e as notas
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Efeito para inicializar as notas quando as dimensões mudarem
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      initNotes();
    }
  }, [dimensions]);

  // Efeito para animar as notas
  useEffect(() => {
    if (notes.length === 0) return;

    const animationInterval = setInterval(() => {
      updateNotes();
    }, 16); // Aproximadamente 60 FPS

    return () => {
      clearInterval(animationInterval);
    };
  }, [notes]);

  return (
    <div className="relative w-screen h-full overflow-hidden">
      {/* Fundo gradiente */}
      <div 
        className="absolute top-0 left-0 w-full h-full" 
        style={{ 
          background: 'linear-gradient(to bottom right, #000033, #330033)',
          zIndex: 0 
        }}
      />

      {/* Grade de fundo */}
      <div 
        className="absolute top-0 left-0 w-full h-full" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(100, 100, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 100, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          zIndex: 1 
        }}
      />

      {/* Efeito scanline */}
      <div 
        className="absolute top-0 left-0 w-full h-full" 
        style={{ 
          background: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0px, rgba(0, 0, 0, 0.1) 2px, transparent 2px, transparent 4px)',
          zIndex: 2 
        }}
      />

      {/* Notas musicais */}
      <div className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 3 }}>
        {notes.map(note => renderNoteIcon(note))}
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground; 
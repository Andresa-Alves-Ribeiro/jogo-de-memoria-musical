import React, { useEffect, useState } from 'react';
import {
  MusicNote,
  MusicNotes,
  MusicNoteSimple,
  MusicNotesSimple,
  IconWeight
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

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const updatePulseEffect = (note: Note) => {
    let newPulseSize = note.pulseSize;
    let newPulseDirection = note.pulseDirection;
    
    if (note.pulseDirection === 1) {
      newPulseSize += note.pulseSpeed;
      if (newPulseSize >= 1.2) newPulseDirection = -1;
    } else {
      newPulseSize -= note.pulseSpeed;
      if (newPulseSize <= 0.8) newPulseDirection = 1;
    }
    
    return { newPulseSize, newPulseDirection };
  };

  const updateGlowEffect = (note: Note) => {
    let newGlowIntensity = note.glowIntensity;
    let newGlowDirection = note.glowDirection;
    
    if (note.glowDirection === 1) {
      newGlowIntensity += 0.02;
      if (newGlowIntensity >= 1) newGlowDirection = -1;
    } else {
      newGlowIntensity -= 0.02;
      if (newGlowIntensity <= 0.5) newGlowDirection = 1;
    }
    
    return { newGlowIntensity, newGlowDirection };
  };

  const updateNotes = React.useCallback(() => {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        let newX = note.x + note.speedX;
        let newY = note.y + note.speedY;
        const newRotation = note.rotation + note.rotationSpeed;

        const { newPulseSize, newPulseDirection } = updatePulseEffect(note);
        const { newGlowIntensity, newGlowDirection } = updateGlowEffect(note);

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
  }, [dimensions]);

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

  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
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
          '#FF00FF',
          '#00FF00',
          '#00FFFF',
          '#FF0000',
          '#0000FF',
          '#FFFF00',
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
      
      initNotes();
    }
  }, [dimensions]);

  useEffect(() => {
    if (notes.length === 0) return;

    const animationInterval = setInterval(updateNotes, 16);

    return () => {
      clearInterval(animationInterval);
    };
  }, [notes, updateNotes]);

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
      weight: "fill" as IconWeight,
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

  return (
    <div className="relative w-screen h-full overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: 'linear-gradient(to bottom, #323232 0%, #3F3F3F 50%, #1C1C1C 100%), linear-gradient(to top, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.25) 200%)',
          backgroundBlendMode: 'multiply',
          zIndex: 0
        }}
      />

      <div className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 3 }}>
        {notes.map(note => renderNoteIcon(note))}
      </div>

      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground; 
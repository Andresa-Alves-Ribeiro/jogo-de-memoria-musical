import React, { useEffect, useState, useRef } from 'react';
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

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ className = '', children }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const notesRef = useRef<Note[]>([]);
  const isInitializedRef = useRef(false);
  const isMountedRef = useRef(false);

  // Initialize notes
  const initializeNotes = () => {
    if (isInitializedRef.current) return;
    
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

    notesRef.current = newNotes;
    isInitializedRef.current = true;
  };

  // Update dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (!isMountedRef.current) return;
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

  // Initialize notes when dimensions change
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0 && !isInitializedRef.current) {
      initializeNotes();
    }
  }, [dimensions.width, dimensions.height]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isInitializedRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (!isMountedRef.current) return;

      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      lastTime = currentTime - (deltaTime % frameInterval);

      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw notes
      const updatedNotes = notesRef.current.map(note => {
        // Update position
        let newX = note.x + note.speedX;
        let newY = note.y + note.speedY;
        const newRotation = note.rotation + note.rotationSpeed;

        // Update pulse
        let newPulseSize = note.pulseSize;
        let newPulseDirection = note.pulseDirection;
        if (note.pulseDirection === 1) {
          newPulseSize += note.pulseSpeed;
          if (newPulseSize >= 1.2) newPulseDirection = -1;
        } else {
          newPulseSize -= note.pulseSpeed;
          if (newPulseSize <= 0.8) newPulseDirection = 1;
        }

        // Update glow
        let newGlowIntensity = note.glowIntensity;
        let newGlowDirection = note.glowDirection;
        if (note.glowDirection === 1) {
          newGlowIntensity += 0.02;
          if (newGlowIntensity >= 1) newGlowDirection = -1;
        } else {
          newGlowIntensity -= 0.02;
          if (newGlowIntensity <= 0.5) newGlowDirection = 1;
        }

        // Check boundaries
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

      notesRef.current = updatedNotes;

      // Draw notes
      updatedNotes.forEach(note => {
        ctx.save();
        ctx.translate(note.x, note.y);
        ctx.rotate((note.rotation * Math.PI) / 180);
        ctx.scale(note.pulseSize, note.pulseSize);
        
        // Draw glow
        ctx.shadowColor = note.color;
        ctx.shadowBlur = 10 * note.glowIntensity;
        
        // Draw note
        ctx.fillStyle = note.color;
        ctx.globalAlpha = 0.8;
        
        // Simple note shape
        ctx.beginPath();
        ctx.arc(0, 0, note.size / 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Set canvas size
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions.width, dimensions.height]);

  // Handle mounting/unmounting
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      overflow: 'hidden'
    }}>
      {/* Fundo gradiente */}
      <div 
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom right, #000033, #330033)'
        }}
      />

      {/* Grade de fundo */}
      <div 
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'linear-gradient(rgba(100, 100, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 100, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      {/* Efeito scanline */}
      <div 
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0px, rgba(0, 0, 0, 0.1) 2px, transparent 2px, transparent 4px)'
        }}
      />

      {/* Canvas for notes */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      />

      {/* Conteúdo */}
      <div style={{ 
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground; 
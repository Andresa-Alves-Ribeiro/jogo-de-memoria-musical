import React, { useEffect, useRef } from 'react';

interface AnimatedTitleProps {
  text: string;
  className?: string;
  dataText?: string;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ text, className = '', dataText }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    
    // Adicionar efeito de glitch e arco-íris
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        title.classList.add('glitch');
        setTimeout(() => {
          title.classList.remove('glitch');
        }, 200);
      }
    }, 100);
    
    return () => clearInterval(glitchInterval);
  }, []);
  
  // Dividir o texto em letras para aplicar cores diferentes
  const letters = text.split('').map((letter, index) => {
    const hue = (index * 360 / text.length) % 360;
    const color = `hsl(${hue}, 100%, 70%)`;
    const animationDelay = `${index * 0.1}s`;
    
    return (
      <span
        key={index}
        className="inline-block hover:scale-125 transition-transform"
        style={{
          color: '#FF00FF',
          textShadow: `
            0 0 5px #FF00FF,
            0 0 10px #FF00FF,
            0 0 20px #FF00FF,
            0 0 30px #FF00FF
          `,
          animationDelay
        }}
      >
        {letter === ' ' ? '\u00A0' : letter}
      </span>
    );
  });
  
  return (
    <h1 
      ref={titleRef}
      className={`text-6xl md:text-8xl font-bold text-center mb-8 font-['Protest_Revolution'] ${className}`}
      style={{
        WebkitTextStroke: '2px rgba(0,0,0,0.3)',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
      }}
    >
      {letters}
    </h1>
  );
};

export default AnimatedTitle; 
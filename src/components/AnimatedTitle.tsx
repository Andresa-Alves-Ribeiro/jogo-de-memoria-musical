import React, { useRef } from 'react';

interface AnimatedTitleProps {
  text: string;
  className?: string;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ text, className = '' }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);


  // Dividir o texto em letras para aplicar cores diferentes
  const letters = text.split('').map((letter, index) => {
    const animationDelay = `${index * 0.1}s`;

    return (
      <span
        key={index}
        className="inline-block hover:scale-125 transition-transform"
        style={{
          color: '#fff',
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
    >
      {letters}
    </h1>
  );
};

export default AnimatedTitle; 
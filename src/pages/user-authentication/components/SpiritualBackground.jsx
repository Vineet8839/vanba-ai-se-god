import React, { useEffect, useState } from 'react';

const SpiritualBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate floating particles for spiritual ambiance
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 20; i++) {
        newParticles?.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          opacity: Math.random() * 0.5 + 0.1,
          duration: Math.random() * 20 + 10
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5"></div>
      {/* Sacred Geometry Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="sacred-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
              <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
              <path d="M50,15 L65,35 L85,35 L73,50 L85,65 L65,65 L50,85 L35,65 L15,65 L27,50 L15,35 L35,35 Z" 
                    fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sacred-pattern)" className="text-primary"/>
        </svg>
      </div>
      {/* Floating Particles */}
      {particles?.map((particle) => (
        <div
          key={particle?.id}
          className="absolute rounded-full bg-accent/20 animate-float"
          style={{
            left: `${particle?.x}%`,
            top: `${particle?.y}%`,
            width: `${particle?.size}px`,
            height: `${particle?.size}px`,
            opacity: particle?.opacity,
            animationDuration: `${particle?.duration}s`,
            animationDelay: `${particle?.id * 0.5}s`
          }}
        />
      ))}
      {/* Subtle Light Rays */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-accent/10 to-transparent transform rotate-12 opacity-30"></div>
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent transform -rotate-12 opacity-20"></div>
      {/* Central Glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-breathe"></div>
    </div>
  );
};

export default SpiritualBackground;
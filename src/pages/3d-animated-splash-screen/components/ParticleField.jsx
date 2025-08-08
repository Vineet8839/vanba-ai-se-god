import React, { useEffect, useRef, useState } from 'react';

const ParticleField = ({ particleCount = 50, isActive = true }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef?.current?.push({
          x: Math.random() * canvas?.width,
          y: Math.random() * canvas?.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          life: Math.random() * 100 + 50
        });
      }
    };

    initParticles();

    const animate = () => {
      if (!isActive) return;

      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);

      particlesRef?.current?.forEach((particle, index) => {
        // Update position
        particle.x += particle?.vx;
        particle.y += particle?.vy;
        particle.life -= 0.5;

        // Wrap around edges
        if (particle?.x < 0) particle.x = canvas?.width;
        if (particle?.x > canvas?.width) particle.x = 0;
        if (particle?.y < 0) particle.y = canvas?.height;
        if (particle?.y > canvas?.height) particle.y = 0;

        // Fade out as life decreases
        const lifeRatio = particle?.life / 100;
        particle.opacity = lifeRatio * 0.5;

        // Reset particle if life is over
        if (particle?.life <= 0) {
          particle.x = Math.random() * canvas?.width;
          particle.y = Math.random() * canvas?.height;
          particle.life = Math.random() * 100 + 50;
          particle.opacity = Math.random() * 0.5 + 0.2;
        }

        // Draw particle
        ctx?.save();
        ctx.globalAlpha = particle?.opacity;
        ctx.fillStyle = 'rgba(107, 140, 174, 1)';
        ctx?.beginPath();
        ctx?.arc(particle?.x, particle?.y, particle?.size, 0, Math.PI * 2);
        ctx?.fill();
        ctx?.restore();
      });

      // Draw connections between nearby particles
      particlesRef?.current?.forEach((particle1, i) => {
        particlesRef?.current?.slice(i + 1)?.forEach(particle2 => {
          const dx = particle1?.x - particle2?.x;
          const dy = particle1?.y - particle2?.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx?.save();
            ctx.globalAlpha = (100 - distance) / 100 * 0.1;
            ctx.strokeStyle = 'rgba(139, 115, 85, 1)';
            ctx.lineWidth = 1;
            ctx?.beginPath();
            ctx?.moveTo(particle1?.x, particle1?.y);
            ctx?.lineTo(particle2?.x, particle2?.y);
            ctx?.stroke();
            ctx?.restore();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef?.current) {
        cancelAnimationFrame(animationRef?.current);
      }
    };
  }, [particleCount, isActive]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default ParticleField;
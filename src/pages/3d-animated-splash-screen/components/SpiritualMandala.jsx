import React, { useEffect, useRef, useState } from 'react';

const SpiritualMandala = ({ isAnimating = true, size = 200 }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    const centerX = canvas?.width / 2;
    const centerY = canvas?.height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    const drawMandala = (rotationAngle) => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);
      ctx?.save();
      ctx?.translate(centerX, centerY);
      ctx?.rotate(rotationAngle);

      // Outer ring with spiritual symbols
      ctx.strokeStyle = 'rgba(139, 115, 85, 0.8)';
      ctx.lineWidth = 3;
      ctx?.beginPath();
      ctx?.arc(0, 0, radius, 0, Math.PI * 2);
      ctx?.stroke();

      // Inner geometric patterns
      const layers = 6;
      for (let layer = 0; layer < layers; layer++) {
        const layerRadius = radius * (0.2 + (layer * 0.13));
        const points = 8 + layer * 2;
        
        ctx.strokeStyle = `rgba(107, 140, 174, ${0.3 + layer * 0.1})`;
        ctx.lineWidth = 2 - layer * 0.2;
        
        ctx?.beginPath();
        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2;
          const x = Math.cos(angle) * layerRadius;
          const y = Math.sin(angle) * layerRadius;
          
          if (i === 0) {
            ctx?.moveTo(x, y);
          } else {
            ctx?.lineTo(x, y);
          }
        }
        ctx?.stroke();

        // Connecting lines to center
        if (layer % 2 === 0) {
          for (let i = 0; i < points; i += 2) {
            const angle = (i / points) * Math.PI * 2;
            const x = Math.cos(angle) * layerRadius;
            const y = Math.sin(angle) * layerRadius;
            
            ctx?.beginPath();
            ctx?.moveTo(0, 0);
            ctx?.lineTo(x, y);
            ctx?.stroke();
          }
        }
      }

      // Central sacred symbol (Om-like)
      ctx.fillStyle = 'rgba(139, 115, 85, 0.9)';
      ctx?.beginPath();
      ctx?.arc(0, 0, 15, 0, Math.PI * 2);
      ctx?.fill();

      ctx.fillStyle = 'rgba(253, 252, 250, 1)';
      ctx?.beginPath();
      ctx?.arc(0, 0, 8, 0, Math.PI * 2);
      ctx?.fill();

      ctx?.restore();
    };

    const animate = () => {
      if (isAnimating) {
        setRotation(prev => prev + 0.005);
        drawMandala(rotation);
        animationRef.current = requestAnimationFrame(animate);
      } else {
        drawMandala(0);
      }
    };

    animate();

    return () => {
      if (animationRef?.current) {
        cancelAnimationFrame(animationRef?.current);
      }
    };
  }, [isAnimating, rotation, size]);

  return (
    <div className="relative flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="drop-shadow-lg"
        style={{ filter: 'drop-shadow(0 4px 8px rgba(139, 115, 85, 0.2))' }}
      />
      
      {/* Ambient glow effect */}
      <div 
        className="absolute inset-0 rounded-full opacity-30 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(107, 140, 174, 0.3) 0%, transparent 70%)',
          width: size * 1.2,
          height: size * 1.2,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
    </div>
  );
};

export default SpiritualMandala;
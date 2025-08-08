import React, { useEffect, useRef } from 'react';

const SacredGeometry = ({ 
  isAnimating = true, 
  geometryType = 'flowerOfLife',
  size = 300,
  opacity = 0.3 
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    const centerX = canvas?.width / 2;
    const centerY = canvas?.height / 2;
    let animationTime = 0;

    const drawFlowerOfLife = (time) => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);
      ctx?.save();
      ctx?.translate(centerX, centerY);
      
      const radius = 40;
      const circles = [
        { x: 0, y: 0 },
        { x: radius * Math.cos(0), y: radius * Math.sin(0) },
        { x: radius * Math.cos(Math.PI / 3), y: radius * Math.sin(Math.PI / 3) },
        { x: radius * Math.cos(2 * Math.PI / 3), y: radius * Math.sin(2 * Math.PI / 3) },
        { x: radius * Math.cos(Math.PI), y: radius * Math.sin(Math.PI) },
        { x: radius * Math.cos(4 * Math.PI / 3), y: radius * Math.sin(4 * Math.PI / 3) },
        { x: radius * Math.cos(5 * Math.PI / 3), y: radius * Math.sin(5 * Math.PI / 3) }
      ];

      circles?.forEach((circle, index) => {
        const animationDelay = index * 0.2;
        const circleOpacity = Math.sin(time * 0.01 + animationDelay) * 0.3 + 0.4;
        
        ctx.globalAlpha = circleOpacity * opacity;
        ctx.strokeStyle = 'rgba(139, 115, 85, 1)';
        ctx.lineWidth = 2;
        ctx?.beginPath();
        ctx?.arc(circle?.x, circle?.y, radius, 0, Math.PI * 2);
        ctx?.stroke();
      });

      ctx?.restore();
    };

    const drawMeridian = (time) => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);
      ctx?.save();
      ctx?.translate(centerX, centerY);
      
      const lines = 12;
      const maxRadius = size / 3;
      
      for (let i = 0; i < lines; i++) {
        const angle = (i / lines) * Math.PI * 2;
        const waveOffset = Math.sin(time * 0.005 + i * 0.5) * 10;
        const lineOpacity = (Math.sin(time * 0.008 + i * 0.3) + 1) * 0.2 + 0.1;
        
        ctx.globalAlpha = lineOpacity * opacity;
        ctx.strokeStyle = 'rgba(107, 140, 174, 1)';
        ctx.lineWidth = 1.5;
        
        ctx?.beginPath();
        ctx?.moveTo(0, 0);
        ctx?.lineTo(
          Math.cos(angle) * (maxRadius + waveOffset),
          Math.sin(angle) * (maxRadius + waveOffset)
        );
        ctx?.stroke();
      }

      ctx?.restore();
    };

    const animate = () => {
      if (isAnimating) {
        animationTime += 1;
        
        if (geometryType === 'flowerOfLife') {
          drawFlowerOfLife(animationTime);
        } else if (geometryType === 'meridian') {
          drawMeridian(animationTime);
        }
        
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationRef?.current) {
        cancelAnimationFrame(animationRef?.current);
      }
    };
  }, [isAnimating, geometryType, size, opacity]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="opacity-60"
        style={{ filter: 'blur(0.5px)' }}
      />
    </div>
  );
};

export default SacredGeometry;
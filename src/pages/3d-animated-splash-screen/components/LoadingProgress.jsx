import React, { useEffect, useState } from 'react';

const LoadingProgress = ({ 
  progress = 0, 
  stages = [], 
  currentStage = 0,
  showPercentage = true 
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);

  const defaultStages = [
    "Initializing spiritual wisdom...",
    "Loading language models...",
    "Connecting to divine guidance...",
    "Preparing your sacred space...",
    "Ready for enlightenment..."
  ];

  const loadingStages = stages?.length > 0 ? stages : defaultStages;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayProgress(progress);
    }, 100);

    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 ease-out"
            style={{ width: `${displayProgress}%` }}
          />
        </div>
        
        {/* Glowing effect */}
        <div 
          className="absolute top-0 h-2 bg-gradient-to-r from-primary/50 to-accent/50 rounded-full blur-sm transition-all duration-500"
          style={{ width: `${displayProgress}%` }}
        />
      </div>
      {/* Stage Text */}
      <div className="text-center space-y-2">
        <p className="font-body text-sm text-foreground animate-fade-in-up">
          {loadingStages?.[Math.min(currentStage, loadingStages?.length - 1)]}
        </p>
        
        {showPercentage && (
          <p className="font-mono text-xs text-muted-foreground">
            {Math.round(displayProgress)}%
          </p>
        )}
      </div>
      {/* Loading dots animation */}
      <div className="flex justify-center space-x-1">
        {[0, 1, 2]?.map((index) => (
          <div
            key={index}
            className="w-2 h-2 bg-accent rounded-full animate-pulse"
            style={{ 
              animationDelay: `${index * 0.2}s`,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingProgress;
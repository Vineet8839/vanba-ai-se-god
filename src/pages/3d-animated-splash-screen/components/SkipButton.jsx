import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SkipButton = ({ 
  onSkip = () => {}, 
  showAfter = 2000, 
  autoSkipAfter = 8000,
  isVisible = true 
}) => {
  const [canSkip, setCanSkip] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    // Show skip button after specified time
    const showTimer = setTimeout(() => {
      setCanSkip(true);
    }, showAfter);

    // Auto skip after specified time
    const autoSkipTimer = setTimeout(() => {
      onSkip();
    }, autoSkipAfter);

    // Countdown timer
    const startTime = Date.now();
    const countdownInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, Math.ceil((autoSkipAfter - elapsed) / 1000));
      setTimeRemaining(remaining);
      
      if (remaining <= 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(autoSkipTimer);
      clearInterval(countdownInterval);
    };
  }, [showAfter, autoSkipAfter, onSkip]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end space-y-2">
      {/* Skip Button */}
      {canSkip && (
        <button
          onClick={onSkip}
          className="flex items-center space-x-2 px-4 py-2 bg-background/80 backdrop-blur-sm border border-border rounded-full text-foreground hover:bg-muted transition-all duration-300 hover-lift focus-contemplative animate-fade-in-up"
        >
          <span className="font-body text-sm">Skip</span>
          <Icon name="ChevronRight" size={16} />
        </button>
      )}

      {/* Auto-skip countdown */}
      {timeRemaining > 0 && (
        <div className="flex items-center space-x-2 px-3 py-1 bg-muted/60 backdrop-blur-sm rounded-full animate-fade-in-up">
          <Icon name="Clock" size={14} className="text-muted-foreground" />
          <span className="font-mono text-xs text-muted-foreground">
            Auto-continue in {timeRemaining}s
          </span>
        </div>
      )}

      {/* Touch hint for mobile */}
      <div className="sm:hidden animate-fade-in-up animate-delay-400">
        <div className="flex items-center space-x-2 px-3 py-1 bg-accent/10 backdrop-blur-sm rounded-full">
          <Icon name="Hand" size={14} className="text-accent" />
          <span className="font-caption text-xs text-accent">
            Tap anywhere to continue
          </span>
        </div>
      </div>
    </div>
  );
};

export default SkipButton;
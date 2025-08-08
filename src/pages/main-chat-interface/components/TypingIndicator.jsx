import React from 'react';

const TypingIndicator = ({ isVisible = false }) => {
  if (!isVisible) return null;

  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[80%]">
        {/* Avatar */}
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary">
              <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
              <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.6"/>
            </svg>
          </div>
          <span className="font-caption text-xs text-muted-foreground">VANBA AI</span>
        </div>

        {/* Typing Bubble */}
        <div className="bg-card text-card-foreground border border-border rounded-sacred p-4 shadow-contemplative">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="font-caption text-sm text-muted-foreground">
              Seeking wisdom from ancient texts...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
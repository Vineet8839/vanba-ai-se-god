import React from 'react';

const AuthContainer = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Main Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Glass Morphism Card */}
        <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-contemplative-lg p-8 glass-morphism">
          {children}
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-2 border-accent/30 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-4 -right-4 w-6 h-6 border-2 border-primary/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 -left-8 w-4 h-4 bg-accent/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/4 -right-6 w-3 h-3 bg-primary/20 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
      </div>
      {/* Bottom Branding */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="font-caption text-xs text-muted-foreground">
          Powered by VANBA • Spiritual Guidance AI
        </p>
        <p className="font-caption text-xs text-muted-foreground/60 mt-1">
          © {new Date()?.getFullYear()} All rights reserved
        </p>
      </div>
    </div>
  );
};

export default AuthContainer;
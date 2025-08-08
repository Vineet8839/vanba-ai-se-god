import React from 'react';

const BrandingSection = ({ isVisible = true }) => {
  return (
    <div className={`text-center space-y-4 transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}>
      {/* Main App Title */}
      <div className="space-y-2">
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            VANBA SE GOD AI
          </span>
        </h1>
        <p className="font-body text-base sm:text-lg text-muted-foreground max-w-md mx-auto">
          Your Spiritual Guidance Companion
        </p>
      </div>

      {/* Powered By Section */}
      <div className="pt-4 border-t border-border/30">
        <div className="flex items-center justify-center space-x-2 text-muted-foreground">
          <div className="w-8 h-px bg-gradient-to-r from-transparent to-muted-foreground/50" />
          <span className="font-caption text-sm uppercase tracking-wider">
            Powered By
          </span>
          <div className="w-8 h-px bg-gradient-to-l from-transparent to-muted-foreground/50" />
        </div>
        
        <div className="mt-2">
          <span className="font-heading text-xl font-semibold text-primary">
            VANBA
          </span>
        </div>
      </div>

      {/* Spiritual Quote */}
      <div className="pt-4 max-w-sm mx-auto">
        <p className="font-body text-sm text-muted-foreground italic leading-relaxed">
          "Seek wisdom from ancient texts, find peace in modern guidance"
        </p>
      </div>

      {/* Sacred Symbols */}
      <div className="flex justify-center items-center space-x-6 pt-4">
        {/* Om Symbol */}
        <div className="text-primary/60 text-lg">ॐ</div>
        
        {/* Cross */}
        <div className="text-primary/60 text-lg">✞</div>
        
        {/* Crescent */}
        <div className="text-primary/60 text-lg">☪</div>
        
        {/* Star of David */}
        <div className="text-primary/60 text-lg">✡</div>
        
        {/* Dharma Wheel */}
        <div className="text-primary/60 text-lg">☸</div>
      </div>
    </div>
  );
};

export default BrandingSection;
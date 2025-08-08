import React from 'react';
import Icon from '../../../components/AppIcon';

const LanguagePreview = ({ 
  language = null, 
  isVisible = false, 
  onClose = () => {} 
}) => {
  if (!isVisible || !language) return null;

  const getDirectionClass = () => {
    return language?.direction === 'rtl' ? 'text-right' : 'text-left';
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-card border border-border rounded-sacred shadow-contemplative-lg glass-morphism">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Language Preview
            </h2>
            <p className="font-caption text-sm text-muted-foreground">
              {language?.name} ({language?.nativeName})
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors focus-contemplative"
          >
            <Icon name="X" size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Language Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <h3 className="font-heading font-medium text-foreground mb-1">
                  Language Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Region:</span>
                    <span className="text-foreground">{language?.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Script:</span>
                    <span className="text-foreground">{language?.script || 'Latin'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Direction:</span>
                    <span className="text-foreground">
                      {language?.direction === 'rtl' ? 'Right to Left' : 'Left to Right'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="font-heading font-medium text-foreground mb-1">
                  Features
                </h3>
                <div className="flex flex-wrap gap-2">
                  {language?.features?.map((feature, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 rounded-full bg-secondary/20 text-secondary-foreground font-caption text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sample Spiritual Guidance */}
          <div className="space-y-4">
            <h3 className="font-heading font-medium text-foreground">
              Sample Spiritual Guidance
            </h3>
            
            <div className={`
              p-4 rounded-sacred bg-muted/30 border border-border/50
              ${getDirectionClass()}
            `}>
              <div className="mb-3">
                <p className="font-caption text-xs text-muted-foreground mb-1">
                  Question in {language?.name}:
                </p>
                <p className={`
                  font-body text-sm text-foreground
                  ${language?.direction === 'rtl' ? 'font-medium' : ''}
                `}>
                  {language?.sampleQuestion || "How can I find inner peace?"}
                </p>
              </div>
              
              <div>
                <p className="font-caption text-xs text-muted-foreground mb-1">
                  AI Response in {language?.name}:
                </p>
                <p className={`
                  font-body text-sm text-foreground leading-relaxed
                  ${language?.direction === 'rtl' ? 'font-medium' : ''}
                `}>
                  {language?.sampleText || "Peace comes from within. Find it through meditation and self-reflection."}
                </p>
              </div>
            </div>
          </div>

          {/* Scripture Example */}
          {language?.scriptureExample && (
            <div className="space-y-2">
              <h3 className="font-heading font-medium text-foreground">
                Scripture Reference Example
              </h3>
              <div className={`
                p-4 rounded-sacred bg-accent/5 border border-accent/20
                ${getDirectionClass()}
              `}>
                <p className={`
                  font-body text-sm text-foreground italic
                  ${language?.direction === 'rtl' ? 'font-medium' : ''}
                `}>
                  {language?.scriptureExample}
                </p>
                <p className="font-caption text-xs text-muted-foreground mt-2">
                  - Ancient Wisdom Translation
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-sacred border border-border text-foreground hover:bg-muted transition-colors font-body text-sm"
          >
            Close Preview
          </button>
          <button
            onClick={() => {
              // This would trigger language selection
              onClose();
            }}
            className="px-4 py-2 rounded-sacred bg-accent text-accent-foreground hover:bg-accent/90 transition-colors font-body text-sm"
          >
            Select This Language
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguagePreview;
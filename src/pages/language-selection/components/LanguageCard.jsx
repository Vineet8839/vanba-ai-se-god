import React from 'react';
import Icon from '../../../components/AppIcon';

const LanguageCard = ({ 
  language, 
  isSelected = false, 
  onSelect = () => {},
  showPreview = false 
}) => {
  const handleSelect = () => {
    onSelect(language?.code);
  };

  const getDirectionClass = () => {
    return language?.direction === 'rtl' ? 'text-right' : 'text-left';
  };

  return (
    <div 
      className={`
        relative p-4 rounded-sacred border-2 transition-all duration-300 cursor-pointer hover-lift
        ${isSelected 
          ? 'border-accent bg-accent/10 shadow-contemplative' 
          : 'border-border bg-card hover:border-accent/50'
        }
      `}
      onClick={handleSelect}
    >
      {/* Selection Indicator */}
      <div className="absolute top-3 right-3">
        <div className={`
          w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
          ${isSelected 
            ? 'border-accent bg-accent' :'border-muted-foreground/30'
          }
        `}>
          {isSelected && (
            <Icon name="Check" size={12} className="text-accent-foreground" />
          )}
        </div>
      </div>
      {/* Language Info */}
      <div className="pr-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="font-heading text-sm font-medium text-primary">
                {language?.code?.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-foreground truncate">
              {language?.name}
            </h3>
            <p className="font-caption text-sm text-muted-foreground">
              {language?.region}
            </p>
          </div>
        </div>

        {/* Native Name Display */}
        <div className={`mb-3 ${getDirectionClass()}`}>
          <p className={`
            font-body text-lg text-foreground
            ${language?.direction === 'rtl' ? 'font-medium' : ''}
          `}>
            {language?.nativeName}
          </p>
          {language?.script && (
            <p className="font-caption text-xs text-muted-foreground mt-1">
              {language?.script} script
            </p>
          )}
        </div>

        {/* Sample Text Preview */}
        {showPreview && language?.sampleText && (
          <div className={`
            p-3 rounded-sacred bg-muted/50 border border-border/50
            ${getDirectionClass()}
          `}>
            <p className="font-caption text-xs text-muted-foreground mb-1">
              Sample guidance:
            </p>
            <p className={`
              font-body text-sm text-foreground leading-relaxed
              ${language?.direction === 'rtl' ? 'font-medium' : ''}
            `}>
              "{language?.sampleText}"
            </p>
          </div>
        )}

        {/* Language Features */}
        <div className="flex flex-wrap gap-2 mt-3">
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
  );
};

export default LanguageCard;
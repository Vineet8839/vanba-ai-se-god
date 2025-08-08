import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SelectedLanguagesBar = ({ 
  selectedLanguages = [], 
  allLanguages = [],
  onRemoveLanguage = () => {},
  onClearAll = () => {},
  onConfirm = () => {},
  maxSelections = 3 
}) => {
  if (selectedLanguages?.length === 0) return null;

  const getLanguageByCode = (code) => {
    return allLanguages?.find(lang => lang?.code === code);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-contemplative-lg glass-morphism z-50">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-between">
          {/* Selected Languages */}
          <div className="flex-1 mr-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Languages" size={18} className="text-accent" />
              <h3 className="font-heading font-medium text-foreground">
                Selected Languages ({selectedLanguages?.length}/{maxSelections})
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {selectedLanguages?.map((langCode) => {
                const language = getLanguageByCode(langCode);
                if (!language) return null;
                
                return (
                  <div 
                    key={langCode}
                    className="flex items-center space-x-2 px-3 py-2 rounded-full bg-accent/10 border border-accent/20"
                  >
                    <span className="font-body text-sm text-foreground">
                      {language?.name}
                    </span>
                    <span className="font-caption text-xs text-muted-foreground">
                      ({language?.nativeName})
                    </span>
                    <button
                      onClick={() => onRemoveLanguage(langCode)}
                      className="p-1 rounded-full hover:bg-accent/20 transition-colors"
                    >
                      <Icon name="X" size={14} className="text-muted-foreground hover:text-foreground" />
                    </button>
                  </div>
                );
              })}
            </div>

            {selectedLanguages?.length >= maxSelections && (
              <p className="font-caption text-xs text-warning mt-2">
                Maximum {maxSelections} languages can be selected
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onClearAll}
              iconName="Trash2"
              iconPosition="left"
            >
              Clear All
            </Button>
            
            <Button
              variant="default"
              size="sm"
              onClick={onConfirm}
              iconName="Check"
              iconPosition="left"
              disabled={selectedLanguages?.length === 0}
            >
              Confirm Selection
            </Button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-3">
          <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent transition-all duration-300"
              style={{ width: `${(selectedLanguages?.length / maxSelections) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedLanguagesBar;
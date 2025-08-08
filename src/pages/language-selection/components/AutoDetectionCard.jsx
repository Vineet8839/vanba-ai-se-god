import React from 'react';
import Icon from '../../../components/AppIcon';

const AutoDetectionCard = ({ 
  detectedLanguages = [], 
  onSelectDetected = () => {},
  isDetecting = false 
}) => {
  if (!detectedLanguages?.length && !isDetecting) return null;

  return (
    <div className="mb-8 p-6 rounded-sacred bg-accent/5 border border-accent/20 glass-morphism">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
            {isDetecting ? (
              <div className="animate-spin">
                <Icon name="Loader2" size={20} className="text-accent" />
              </div>
            ) : (
              <Icon name="Zap" size={20} className="text-accent" />
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-heading font-semibold text-foreground">
              Auto-Detection
            </h3>
            {isDetecting && (
              <span className="px-2 py-1 rounded-full bg-accent/20 text-accent font-caption text-xs">
                Analyzing...
              </span>
            )}
          </div>

          {isDetecting ? (
            <p className="font-body text-sm text-muted-foreground">
              Analyzing your language preferences based on your device settings and previous interactions...
            </p>
          ) : (
            <>
              <p className="font-body text-sm text-muted-foreground mb-4">
                We detected these languages based on your device settings and location. 
                Select one to get started quickly.
              </p>

              <div className="space-y-3">
                {detectedLanguages?.map((detection, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 rounded-sacred bg-card border border-border hover:border-accent/50 transition-all cursor-pointer hover-lift"
                    onClick={() => onSelectDetected(detection?.language)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-heading text-xs font-medium text-primary">
                          {detection?.language?.code?.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-body font-medium text-foreground">
                          {detection?.language?.name}
                        </p>
                        <p className="font-caption text-xs text-muted-foreground">
                          {detection?.language?.nativeName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {/* Confidence Score */}
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-accent transition-all duration-500"
                            style={{ width: `${detection?.confidence * 100}%` }}
                          />
                        </div>
                        <span className="font-mono text-xs text-muted-foreground">
                          {Math.round(detection?.confidence * 100)}%
                        </span>
                      </div>

                      {/* Detection Source */}
                      <div className="flex items-center space-x-1">
                        <Icon 
                          name={detection?.source === 'device' ? 'Smartphone' : 'MapPin'} 
                          size={14} 
                          className="text-muted-foreground" 
                        />
                        <span className="font-caption text-xs text-muted-foreground">
                          {detection?.source === 'device' ? 'Device' : 'Location'}
                        </span>
                      </div>

                      <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 rounded-sacred bg-muted/30 border border-border/50">
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={16} className="text-accent mt-0.5" />
                  <div>
                    <p className="font-caption text-xs text-muted-foreground">
                      Auto-detection is based on your device language settings and location. 
                      You can always change your language preference later in settings.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AutoDetectionCard;
import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractionFlow = ({ 
  currentStep = 1,
  onStepComplete = () => {},
  userInput = '',
  selectedLanguage = 'en',
  onLanguageSelect = () => {},
  isProcessing = false
}) => {
  const [flowData, setFlowData] = useState({
    problem: '',
    language: 'en',
    context: '',
    guidance: ''
  });

  const steps = [
    {
      id: 1,
      title: 'Share Your Concern',
      description: 'Tell me about what\'s troubling you or what guidance you seek',
      icon: 'MessageCircle',
      status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'active' : 'pending'
    },
    {
      id: 2,
      title: 'Choose Language',
      description: 'Select your preferred language for spiritual guidance',
      icon: 'Globe',
      status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'active' : 'pending'
    },
    {
      id: 3,
      title: 'Receive Wisdom',
      description: 'Get contextual guidance from ancient scriptures',
      icon: 'BookOpen',
      status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'active' : 'pending'
    },
    {
      id: 4,
      title: 'Actionable Guidance',
      description: 'Practical steps and advice for your situation',
      icon: 'Target',
      status: currentStep >= 4 ? 'completed' : 'pending'
    }
  ];

  const languageOptions = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' }
  ];

  useEffect(() => {
    setFlowData(prev => ({
      ...prev,
      problem: userInput,
      language: selectedLanguage
    }));
  }, [userInput, selectedLanguage]);

  const getStepIcon = (step) => {
    if (step?.status === 'completed') return 'CheckCircle';
    if (step?.status === 'active') return step?.icon;
    return step?.icon;
  };

  const getStepColor = (step) => {
    if (step?.status === 'completed') return 'text-success';
    if (step?.status === 'active') return 'text-accent';
    return 'text-muted-foreground';
  };

  const getStepBgColor = (step) => {
    if (step?.status === 'completed') return 'bg-success/10';
    if (step?.status === 'active') return 'bg-accent/10';
    return 'bg-muted/30';
  };

  const handleLanguageSelection = (languageCode) => {
    onLanguageSelect(languageCode);
    onStepComplete(2, { language: languageCode });
  };

  if (currentStep === 2) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
            <Icon name="Globe" size={32} className="text-accent" />
          </div>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-2">
            Choose Your Preferred Language
          </h2>
          <p className="font-body text-muted-foreground">
            Select the language in which you'd like to receive spiritual guidance
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {languageOptions?.map((lang) => (
            <button
              key={lang?.code}
              onClick={() => handleLanguageSelection(lang?.code)}
              className={`
                p-4 rounded-sacred border-2 transition-all hover-lift
                ${selectedLanguage === lang?.code 
                  ? 'border-accent bg-accent/10 text-accent' :'border-border bg-card hover:border-accent/50'
                }
              `}
            >
              <div className="text-center">
                <div className="font-body font-medium text-sm mb-1">
                  {lang?.name}
                </div>
                <div className="font-caption text-xs text-muted-foreground">
                  {lang?.nativeName}
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button
            onClick={() => onStepComplete(2, { language: selectedLanguage })}
            disabled={!selectedLanguage}
            iconName="ArrowRight"
            iconPosition="right"
          >
            Continue with {languageOptions?.find(l => l?.code === selectedLanguage)?.name || 'Selected Language'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps?.map((step, index) => (
            <React.Fragment key={step?.id}>
              <div className="flex flex-col items-center text-center max-w-[200px]">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all
                  ${getStepBgColor(step)}
                `}>
                  <Icon 
                    name={getStepIcon(step)} 
                    size={24} 
                    className={getStepColor(step)} 
                  />
                </div>
                <h3 className={`font-heading text-sm font-medium mb-1 ${getStepColor(step)}`}>
                  {step?.title}
                </h3>
                <p className="font-caption text-xs text-muted-foreground leading-tight">
                  {step?.description}
                </p>
              </div>
              
              {index < steps?.length - 1 && (
                <div className={`
                  flex-1 h-0.5 mx-4 transition-colors
                  ${currentStep > step?.id ? 'bg-success' : 'bg-border'}
                `} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* Current Step Content */}
      {currentStep === 3 && isProcessing && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center animate-breathe">
            <Icon name="BookOpen" size={32} className="text-accent" />
          </div>
          <h3 className="font-heading text-lg font-medium text-foreground mb-2">
            Seeking Ancient Wisdom
          </h3>
          <p className="font-body text-muted-foreground mb-4">
            Consulting sacred texts and spiritual teachings for your guidance...
          </p>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}
      {currentStep === 4 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <h3 className="font-heading text-lg font-medium text-foreground mb-2">
            Guidance Complete
          </h3>
          <p className="font-body text-muted-foreground">
            Your spiritual guidance has been provided with practical steps for implementation
          </p>
        </div>
      )}
    </div>
  );
};

export default InteractionFlow;
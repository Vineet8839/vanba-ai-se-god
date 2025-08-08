import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpiritualMandala from './components/SpiritualMandala';
import ParticleField from './components/ParticleField';
import LoadingProgress from './components/LoadingProgress';
import BrandingSection from './components/BrandingSection';
import SkipButton from './components/SkipButton';
import SacredGeometry from './components/SacredGeometry';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const loadingStages = [
    "Awakening spiritual consciousness...",
    "Loading ancient wisdom databases...",
    "Initializing multilingual support...",
    "Connecting to divine guidance network...",
    "Preparing your sacred journey..."
  ];

  useEffect(() => {
    // Show content after initial delay
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5;
        
        // Update stage based on progress
        const stageIndex = Math.floor((newProgress / 100) * loadingStages?.length);
        setCurrentStage(Math.min(stageIndex, loadingStages?.length - 1));
        
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setIsLoading(false);
          
          // Auto-navigate after loading completes
          setTimeout(() => {
            handleContinue();
          }, 1500);
          
          return 100;
        }
        
        return newProgress;
      });
    }, 200);

    return () => {
      clearTimeout(contentTimer);
      clearInterval(progressInterval);
    };
  }, []);

  const handleContinue = () => {
    // Check if user is authenticated (mock check)
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (isAuthenticated) {
      navigate('/main-chat-interface');
    } else {
      navigate('/user-authentication');
    }
  };

  const handleSkip = () => {
    setIsLoading(false);
    handleContinue();
  };

  // Handle touch/click anywhere to continue
  const handleScreenTouch = () => {
    if (!isLoading && loadingProgress >= 100) {
      handleContinue();
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-background via-card to-muted relative overflow-hidden cursor-pointer"
      onClick={handleScreenTouch}
      onTouchStart={handleScreenTouch}
    >
      {/* Background Particle Field */}
      <ParticleField particleCount={30} isActive={showContent} />
      
      {/* Sacred Geometry Background */}
      <SacredGeometry 
        isAnimating={showContent}
        geometryType="flowerOfLife"
        size={400}
        opacity={0.1}
      />
      
      {/* Secondary Geometry Layer */}
      <SacredGeometry 
        isAnimating={showContent}
        geometryType="meridian"
        size={600}
        opacity={0.05}
      />

      {/* Skip Button */}
      <SkipButton 
        onSkip={handleSkip}
        showAfter={2000}
        autoSkipAfter={12000}
        isVisible={showContent}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg mx-auto text-center space-y-8">
          
          {/* Spiritual Mandala */}
          <div className={`transition-all duration-1000 ${
            showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <SpiritualMandala 
              isAnimating={showContent} 
              size={window.innerWidth < 640 ? 180 : 220}
            />
          </div>

          {/* Branding Section */}
          <BrandingSection isVisible={showContent} />

          {/* Loading Section */}
          {isLoading && (
            <div className={`transition-all duration-1000 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <LoadingProgress
                progress={loadingProgress}
                stages={loadingStages}
                currentStage={currentStage}
                showPercentage={true}
              />
            </div>
          )}

          {/* Continue Hint */}
          {!isLoading && loadingProgress >= 100 && (
            <div className="animate-fade-in-up animate-delay-600">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                  <div className="w-6 h-6 rounded-full bg-primary animate-breathe" />
                </div>
                <p className="font-body text-sm text-muted-foreground">
                  Touch anywhere to begin your spiritual journey
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Decorative Elements */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className={`flex items-center space-x-2 transition-all duration-1000 ${
            showContent ? 'opacity-60' : 'opacity-0'
          }`}>
            <div className="w-2 h-2 rounded-full bg-primary/40" />
            <div className="w-16 h-px bg-gradient-to-r from-primary/40 to-transparent" />
            <div className="w-2 h-2 rounded-full bg-accent/40" />
            <div className="w-16 h-px bg-gradient-to-l from-accent/40 to-transparent" />
            <div className="w-2 h-2 rounded-full bg-secondary/40" />
          </div>
        </div>
      </div>

      {/* Ambient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-background/20 pointer-events-none" />
    </div>
  );
};

export default SplashScreen;
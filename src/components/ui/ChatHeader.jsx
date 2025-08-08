import React, { useState } from 'react';
import Icon from '../AppIcon';
import LanguageSelector from './LanguageSelector';
import UserMenu from './UserMenu';

const ChatHeader = ({ 
  isVoiceActive = false, 
  currentLanguage = 'en',
  onLanguageChange = () => {},
  user = null 
}) => {
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLanguageSelect = (language) => {
    onLanguageChange(language);
    setIsLanguageSelectorOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-background/95 backdrop-blur-sacred border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-sacred bg-primary/10 clip-circle">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="text-primary"
            >
              <path 
                d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" 
                fill="currentColor"
              />
              <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.6"/>
            </svg>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-heading font-semibold text-lg text-foreground">
              VANBA SE GOD AI
            </h1>
            <p className="font-caption text-xs text-muted-foreground">
              Spiritual Guidance Assistant
            </p>
          </div>
        </div>

        {/* Center - Voice Indicator (when active) */}
        {isVoiceActive && (
          <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-accent/10 glass-morphism">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-accent rounded-full animate-voice-pulse"></div>
              <div className="w-2 h-2 bg-accent rounded-full animate-voice-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-accent rounded-full animate-voice-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="font-caption text-sm text-accent-foreground">
              Listening...
            </span>
          </div>
        )}

        {/* Right Section - Controls */}
        <div className="flex items-center space-x-2">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageSelectorOpen(!isLanguageSelectorOpen)}
              className="flex items-center space-x-2 px-3 py-2 rounded-sacred bg-card hover:bg-muted transition-contemplative hover-lift focus-contemplative"
            >
              <Icon name="Globe" size={18} className="text-muted-foreground" />
              <span className="hidden sm:inline font-caption text-sm text-foreground">
                {currentLanguage?.toUpperCase()}
              </span>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`text-muted-foreground transition-transform ${isLanguageSelectorOpen ? 'rotate-180' : ''}`} 
              />
            </button>
            
            {isLanguageSelectorOpen && (
              <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageSelect={handleLanguageSelect}
                onClose={() => setIsLanguageSelectorOpen(false)}
              />
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-contemplative hover-lift focus-contemplative"
            >
              {user?.avatar ? (
                <img 
                  src={user?.avatar} 
                  alt={user?.name || 'User'} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <Icon name="User" size={20} />
              )}
            </button>

            {isUserMenuOpen && (
              <UserMenu
                user={user}
                onClose={() => setIsUserMenuOpen(false)}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
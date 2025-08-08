import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const LanguageSelector = ({ 
  currentLanguage = 'en', 
  onLanguageSelect = () => {}, 
  onClose = () => {} 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  const languages = [
    // Major World Languages
    { code: 'en', name: 'English', nativeName: 'English', region: 'Global' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', region: 'Global' },
    { code: 'fr', name: 'French', nativeName: 'Français', region: 'Global' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', region: 'Europe' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', region: 'Europe' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', region: 'Global' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', region: 'Europe/Asia' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', region: 'Asia' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', region: 'Asia' },
    { code: 'ko', name: 'Korean', nativeName: '한국어', region: 'Asia' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', region: 'Middle East' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', region: 'South Asia' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', region: 'South Asia' },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو', region: 'South Asia' },
    { code: 'fa', name: 'Persian', nativeName: 'فارسی', region: 'Middle East' },
    { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', region: 'Europe/Asia' },
    { code: 'he', name: 'Hebrew', nativeName: 'עברית', region: 'Middle East' },
    { code: 'th', name: 'Thai', nativeName: 'ไทย', region: 'Southeast Asia' },
    { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', region: 'Southeast Asia' },
    { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', region: 'Southeast Asia' },
    { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', region: 'Southeast Asia' },
    { code: 'tl', name: 'Filipino', nativeName: 'Filipino', region: 'Southeast Asia' },
    { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', region: 'Africa' },
    { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', region: 'Africa' },
    { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', region: 'Africa' },
    { code: 'ig', name: 'Igbo', nativeName: 'Igbo', region: 'Africa' },
    { code: 'ha', name: 'Hausa', nativeName: 'Hausa', region: 'Africa' },
  ];

  const filteredLanguages = languages?.filter(lang =>
    lang?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    lang?.nativeName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    lang?.code?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const groupedLanguages = filteredLanguages?.reduce((groups, lang) => {
    const region = lang?.region;
    if (!groups?.[region]) {
      groups[region] = [];
    }
    groups?.[region]?.push(lang);
    return groups;
  }, {});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleLanguageClick = (languageCode) => {
    onLanguageSelect(languageCode);
  };

  return (
    <div 
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-80 max-h-96 bg-popover border border-border rounded-sacred shadow-contemplative-lg glass-morphism z-200 overflow-hidden"
    >
      {/* Search Header */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            type="text"
            placeholder="Search languages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-sacred text-sm font-body focus-contemplative"
          />
        </div>
      </div>
      {/* Language List */}
      <div className="max-h-80 overflow-y-auto">
        {Object.entries(groupedLanguages)?.map(([region, langs]) => (
          <div key={region} className="py-2">
            <div className="px-4 py-2 text-xs font-caption font-medium text-muted-foreground uppercase tracking-wide bg-muted/50">
              {region}
            </div>
            {langs?.map((lang) => (
              <button
                key={lang?.code}
                onClick={() => handleLanguageClick(lang?.code)}
                className={`w-full px-4 py-3 text-left hover:bg-muted transition-contemplative flex items-center justify-between group ${
                  currentLanguage === lang?.code ? 'bg-accent/10 text-accent' : 'text-foreground'
                }`}
              >
                <div className="flex flex-col">
                  <span className="font-body text-sm font-medium">
                    {lang?.name}
                  </span>
                  <span className="font-caption text-xs text-muted-foreground">
                    {lang?.nativeName}
                  </span>
                </div>
                {currentLanguage === lang?.code && (
                  <Icon name="Check" size={16} className="text-accent" />
                )}
              </button>
            ))}
          </div>
        ))}
        
        {filteredLanguages?.length === 0 && (
          <div className="px-4 py-8 text-center text-muted-foreground">
            <Icon name="Search" size={24} className="mx-auto mb-2 opacity-50" />
            <p className="font-body text-sm">No languages found</p>
            <p className="font-caption text-xs">Try a different search term</p>
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-3 border-t border-border bg-muted/30">
        <p className="font-caption text-xs text-muted-foreground text-center">
          Language changes apply immediately to your spiritual guidance experience
        </p>
      </div>
    </div>
  );
};

export default LanguageSelector;
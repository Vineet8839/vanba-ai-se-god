import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const LanguageSettings = ({ 
  currentSettings = {
    primaryLanguage: 'hi',
    secondaryLanguage: 'en',
    autoDetect: true,
    voiceLanguage: 'hi'
  },
  onSettingsChange = () => {}
}) => {
  const [settings, setSettings] = useState(currentSettings);
  const [isExpanded, setIsExpanded] = useState(false);
  const [previewText, setPreviewText] = useState('');

  const languages = [
    { value: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
    { value: 'en', label: 'English', nativeName: 'English' },
    { value: 'mr', label: 'Marathi', nativeName: 'मराठी' },
    { value: 'ta', label: 'Tamil', nativeName: 'தமிழ்' },
    { value: 'te', label: 'Telugu', nativeName: 'తెలుగు' },
    { value: 'bn', label: 'Bengali', nativeName: 'বাংলা' },
    { value: 'gu', label: 'Gujarati', nativeName: 'ગુજરાતી' },
    { value: 'pa', label: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
    { value: 'ur', label: 'Urdu', nativeName: 'اردو' },
    { value: 'ar', label: 'Arabic', nativeName: 'العربية' },
    { value: 'es', label: 'Spanish', nativeName: 'Español' },
    { value: 'fr', label: 'French', nativeName: 'Français' },
    { value: 'zh', label: 'Chinese', nativeName: '中文' }
  ];

  const sampleTexts = {
    hi: "भगवान आपको शांति और समृद्धि प्रदान करें। आपके जीवन में खुशियों की बारिश हो।",
    en: "May the divine bless you with peace and prosperity. May your life be filled with joy and wisdom.",
    mr: "भगवान तुम्हाला शांती आणि समृद्धी देवो. तुमच्या जीवनात आनंदाचा पाऊस पडो.",
    ta: "இறைவன் உங்களுக்கு அமைதியும் செழிப்பும் அளிக்கட்டும். உங்கள் வாழ்க்கை மகிழ்ச்சியால் நிரம்பட்டும்.",
    te: "భగవంతుడు మీకు శాంతి మరియు సమృద్ధిని ప్రసాదించుగాక. మీ జీవితం ఆనందంతో నిండిపోవాలి.",
    bn: "ভগবান আপনাকে শান্তি ও সমৃদ্ধি দান করুন। আপনার জীবন আনন্দে ভরে উঠুক।",
    gu: "ભગવાન તમને શાંતિ અને સમૃદ્ધિ આપે. તમારું જીવન આનંદથી ભરપૂર થાય.",
    pa: "ਰੱਬ ਤੁਹਾਨੂੰ ਸ਼ਾਂਤੀ ਅਤੇ ਖੁਸ਼ਹਾਲੀ ਦੇਵੇ। ਤੁਹਾਡਾ ਜੀਵਨ ਖੁਸ਼ੀਆਂ ਨਾਲ ਭਰ ਜਾਵੇ।",
    ur: "اللہ آپ کو امن اور خوشحالی عطا فرمائے۔ آپ کی زندگی خوشیوں سے بھر جائے۔",
    ar: "بارك الله لك بالسلام والازدهار. ليمتلئ حياتك بالفرح والحكمة.",
    es: "Que lo divino te bendiga con paz y prosperidad. Que tu vida se llene de alegría y sabiduría.",
    fr: "Que le divin vous bénisse de paix et de prospérité. Que votre vie soit remplie de joie et de sagesse.",
    zh: "愿神圣的力量赐予您平安与繁荣。愿您的生活充满喜悦与智慧。"
  };

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const handlePreview = (languageCode) => {
    setPreviewText(sampleTexts?.[languageCode] || sampleTexts?.en);
  };

  const handleSaveSettings = () => {
    // Save to localStorage and backend
    localStorage.setItem('languageSettings', JSON.stringify(settings));
    onSettingsChange(settings);
  };

  return (
    <div className="bg-card border border-border rounded-sacred overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted transition-contemplative"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Globe" size={20} className="text-primary" />
          <div className="text-left">
            <h3 className="font-heading font-semibold text-foreground">
              Language Settings
            </h3>
            <p className="font-caption text-sm text-muted-foreground">
              Customize your spiritual guidance language preferences
            </p>
          </div>
        </div>
        <Icon 
          name="ChevronDown" 
          size={20} 
          className={`text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
        />
      </button>
      {/* Content */}
      {isExpanded && (
        <div className="px-6 pb-6 space-y-6">
          {/* Primary Language */}
          <div>
            <Select
              label="Primary Language"
              description="Main language for spiritual guidance responses"
              options={languages}
              value={settings?.primaryLanguage}
              onChange={(value) => handleSettingChange('primaryLanguage', value)}
              className="mb-2"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePreview(settings?.primaryLanguage)}
              iconName="Play"
              iconPosition="left"
              iconSize={14}
            >
              Preview Sample Text
            </Button>
          </div>

          {/* Secondary Language */}
          <div>
            <Select
              label="Secondary Language"
              description="Fallback language when primary is unavailable"
              options={languages}
              value={settings?.secondaryLanguage}
              onChange={(value) => handleSettingChange('secondaryLanguage', value)}
            />
          </div>

          {/* Voice Language */}
          <div>
            <Select
              label="Voice Input Language"
              description="Language for voice recognition and speech output"
              options={languages}
              value={settings?.voiceLanguage}
              onChange={(value) => handleSettingChange('voiceLanguage', value)}
            />
          </div>

          {/* Auto-detect Toggle */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-sacred">
            <div>
              <h4 className="font-body font-medium text-foreground">
                Auto-detect Language
              </h4>
              <p className="font-caption text-sm text-muted-foreground">
                Automatically detect input language and respond accordingly
              </p>
            </div>
            <button
              onClick={() => handleSettingChange('autoDetect', !settings?.autoDetect)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings?.autoDetect ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings?.autoDetect ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Preview Text */}
          {previewText && (
            <div className="p-4 bg-accent/10 border border-accent/20 rounded-sacred">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-body font-medium text-foreground">
                  Preview Text
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPreviewText('')}
                  iconName="X"
                  iconSize={14}
                />
              </div>
              <p className="font-body text-foreground leading-relaxed">
                {previewText}
              </p>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end pt-4 border-t border-border">
            <Button
              variant="default"
              onClick={handleSaveSettings}
              iconName="Save"
              iconPosition="left"
              iconSize={16}
            >
              Save Language Settings
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSettings;
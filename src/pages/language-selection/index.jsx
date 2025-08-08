import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

import LanguageGroup from './components/LanguageGroup';
import LanguageSearchBar from './components/LanguageSearchBar';
import LanguagePreview from './components/LanguagePreview';
import AutoDetectionCard from './components/AutoDetectionCard';
import SelectedLanguagesBar from './components/SelectedLanguagesBar';

const LanguageSelection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [previewLanguage, setPreviewLanguage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isDetecting, setIsDetecting] = useState(true);
  const [detectedLanguages, setDetectedLanguages] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Mock language data with comprehensive details
  const allLanguages = [
    // Indian Languages
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिन्दी',
      region: 'Indian Languages',
      script: 'Devanagari',
      direction: 'ltr',
      features: ['Voice Support', 'Scripture Integration'],
      sampleText: `आंतरिक शांति ध्यान और आत्म-चिंतन से आती है। भगवद्गीता में कहा गया है कि मन को नियंत्रित करना ही सच्ची शांति का मार्ग है।`,
      sampleQuestion: 'मुझे आंतरिक शांति कैसे मिल सकती है?',
      scriptureExample: 'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय। - भगवद्गीता 2.48'
    },
    {
      code: 'mr',
      name: 'Marathi',
      nativeName: 'मराठी',
      region: 'Indian Languages',
      script: 'Devanagari',
      direction: 'ltr',
      features: ['Voice Support', 'Regional Wisdom'],
      sampleText: `आंतरिक शांती ध्यान आणि आत्म-चिंतनातून मिळते। संत तुकारामांनी सांगितले आहे की भक्ती आणि प्रेमाने जीवन जगावे।`,
      sampleQuestion: 'मला आंतरिक शांती कशी मिळेल?',
      scriptureExample: 'सर्व धर्मान् परित्यज्य मामेकं शरणं व्रज। - गीता'
    },
    {
      code: 'ta',
      name: 'Tamil',
      nativeName: 'தமிழ்',
      region: 'Indian Languages',
      script: 'Tamil',
      direction: 'ltr',
      features: ['Voice Support', 'Ancient Wisdom'],
      sampleText: `உள் அமைதி தியானம் மற்றும் சுய சிந்தனையிலிருந்து வருகிறது. திருக்குறளில் கூறப்பட்டுள்ளபடி, மனதை கட்டுப்படுத்துவதே உண்மையான அமைதி.`,
      sampleQuestion: 'எனக்கு உள் அமைதி எப்படி கிடைக்கும்?',
      scriptureExample: 'அறம் செய விரும்பு - திருக்குறள்'
    },
    {
      code: 'te',
      name: 'Telugu',
      nativeName: 'తెలుగు',
      region: 'Indian Languages',
      script: 'Telugu',
      direction: 'ltr',
      features: ['Voice Support', 'Devotional Texts'],
      sampleText: `అంతర్గత శాంతి ధ్యానం మరియు ఆత్మ చింతన ద్వారా వస్తుంది. భగవద్గీతలో చెప్పినట్లుగా, మనసును నియంత్రించడమే నిజమైన శాంతికి మార్గం.`,
      sampleQuestion: 'నాకు అంతర్గత శాంతి ఎలా లభిస్తుంది?',
      scriptureExample: 'కర్మణ్యేవాధికారస్తే మా ఫలేషు కదాచన - గీత'
    },
    {
      code: 'bn',
      name: 'Bengali',
      nativeName: 'বাংলা',
      region: 'Indian Languages',
      script: 'Bengali',
      direction: 'ltr',
      features: ['Voice Support', 'Spiritual Poetry'],
      sampleText: `অন্তর্গত শান্তি ধ্যান এবং আত্ম-চিন্তা থেকে আসে। রবীন্দ্রনাথ ঠাকুর বলেছেন যে প্রেম এবং ভক্তিই জীবনের সত্যিকারের পথ।`,
      sampleQuestion: 'আমি কীভাবে অন্তর্গত শান্তি পেতে পারি?',
      scriptureExample: 'যেখানে দেখি সেখানেই তোমায় - রবীন্দ্রনাথ'
    },
    {
      code: 'gu',
      name: 'Gujarati',
      nativeName: 'ગુજરાતી',
      region: 'Indian Languages',
      script: 'Gujarati',
      direction: 'ltr',
      features: ['Voice Support', 'Jain Philosophy'],
      sampleText: `આંતરિક શાંતિ ધ્યાન અને આત્મ-ચિંતનથી આવે છે. ગાંધીજીએ કહ્યું છે કે સત્ય અને અહિંસા જ જીવનનો સાચો માર્ગ છે.`,
      sampleQuestion: 'મને આંતરિક શાંતિ કેવી રીતે મળી શકે?',
      scriptureExample: 'સત્યમેવ જયતે - ઉપનિષદ'
    },
    {
      code: 'pa',
      name: 'Punjabi',
      nativeName: 'ਪੰਜਾਬੀ',
      region: 'Indian Languages',
      script: 'Gurmukhi',
      direction: 'ltr',
      features: ['Voice Support', 'Sikh Teachings'],
      sampleText: `ਅੰਦਰੂਨੀ ਸ਼ਾਂਤੀ ਧਿਆਨ ਅਤੇ ਆਤਮ-ਚਿੰਤਨ ਤੋਂ ਆਉਂਦੀ ਹੈ। ਗੁਰੂ ਨਾਨਕ ਜੀ ਨੇ ਕਿਹਾ ਹੈ ਕਿ ਨਾਮ ਜਪਣਾ ਅਤੇ ਸੇਵਾ ਕਰਨਾ ਹੀ ਸੱਚਾ ਮਾਰਗ ਹੈ।`,
      sampleQuestion: 'ਮੈਨੂੰ ਅੰਦਰੂਨੀ ਸ਼ਾਂਤੀ ਕਿਵੇਂ ਮਿਲ ਸਕਦੀ ਹੈ?',
      scriptureExample: 'ਇਕ ਓਅੰਕਾਰ ਸਤਿ ਨਾਮੁ - ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ'
    },
    {
      code: 'ur',
      name: 'Urdu',
      nativeName: 'اردو',
      region: 'Indian Languages',
      script: 'Arabic',
      direction: 'rtl',
      features: ['Voice Support', 'Islamic Wisdom'],
      sampleText: `باطنی سکون مراقبہ اور خود احتسابی سے آتا ہے۔ قرآن مجید میں فرمایا گیا ہے کہ اللہ کی یاد میں دلوں کو سکون ملتا ہے۔`,
      sampleQuestion: 'مجھے باطنی سکون کیسے مل سکتا ہے؟',
      scriptureExample: 'الا بذکر اللہ تطمئن القلوب - قرآن مجید'
    },

    // Global Languages
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      region: 'Global Languages',
      script: 'Latin',
      direction: 'ltr',
      features: ['Voice Support', 'Universal Access', 'All Scriptures'],
      sampleText: `Inner peace comes from within through meditation and self-reflection. As the Bhagavad Gita teaches, controlling the mind is the path to true tranquility and spiritual growth.`,
      sampleQuestion: 'How can I find inner peace in my daily life?',
      scriptureExample: 'Be still and know that I am God. - Psalm 46:10'
    },
    {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      region: 'Global Languages',
      script: 'Arabic',
      direction: 'rtl',
      features: ['Voice Support', 'Quranic Wisdom', 'Islamic Guidance'],
      sampleText: `السلام الداخلي يأتي من التأمل والتفكر في خلق الله. كما قال الله تعالى في القرآن الكريم، في ذكر الله تطمئن القلوب.`,
      sampleQuestion: 'كيف يمكنني أن أجد السلام الداخلي؟',
      scriptureExample: 'ألا بذكر الله تطمئن القلوب - القرآن الكريم'
    },
    {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      region: 'Global Languages',
      script: 'Latin',
      direction: 'ltr',
      features: ['Voice Support', 'Christian Wisdom'],
      sampleText: `La paz interior viene de la meditación y la reflexión personal. Como enseña la Biblia, en la quietud y la confianza encontramos nuestra fortaleza espiritual.`,
      sampleQuestion: '¿Cómo puedo encontrar la paz interior?',
      scriptureExample: 'Estad quietos y conoced que yo soy Dios. - Salmo 46:10'
    },
    {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      region: 'Global Languages',
      script: 'Latin',
      direction: 'ltr',
      features: ['Voice Support', 'Philosophical Wisdom'],
      sampleText: `La paix intérieure vient de la méditation et de la réflexion sur soi. Comme l'enseigne la sagesse ancienne, c'est dans le silence que nous trouvons la vérité.`,
      sampleQuestion: 'Comment puis-je trouver la paix intérieure?',
      scriptureExample: 'Soyez tranquilles et sachez que je suis Dieu. - Psaume 46:10'
    },
    {
      code: 'zh',
      name: 'Chinese',
      nativeName: '中文',
      region: 'Global Languages',
      script: 'Chinese',
      direction: 'ltr',
      features: ['Voice Support', 'Buddhist Wisdom', 'Taoist Philosophy'],
      sampleText: `内心的平静来自冥想和自我反思。正如佛教教导的那样，通过正念和慈悲，我们可以找到真正的宁静和智慧。`,
      sampleQuestion: '我如何找到内心的平静？',
      scriptureExample: '心静自然凉 - 佛教智慧'
    },
    {
      code: 'ja',
      name: 'Japanese',
      nativeName: '日本語',
      region: 'Global Languages',
      script: 'Japanese',
      direction: 'ltr',
      features: ['Voice Support', 'Zen Philosophy'],
      sampleText: `内なる平和は瞑想と自己反省から生まれます。禅の教えにあるように、心を静めることで真の智慧を見つけることができます。`,
      sampleQuestion: '内なる平和をどのように見つけることができますか？',
      scriptureExample: '心頭滅却すれば火もまた涼し - 禅の教え'
    }
  ];

  // Auto-detection simulation
  useEffect(() => {
    const detectLanguages = async () => {
      setIsDetecting(true);
      
      // Simulate detection delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock detection based on browser language and location
      const browserLang = navigator.language?.split('-')?.[0];
      const mockDetections = [
        {
          language: allLanguages?.find(lang => lang?.code === browserLang) || allLanguages?.find(lang => lang?.code === 'en'),
          confidence: 0.95,
          source: 'device'
        },
        {
          language: allLanguages?.find(lang => lang?.code === 'hi'),
          confidence: 0.75,
          source: 'location'
        }
      ]?.filter(detection => detection?.language);

      setDetectedLanguages(mockDetections);
      setIsDetecting(false);
    };

    detectLanguages();
  }, []);

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
      setSelectedLanguages([savedLanguage]);
    }
  }, []);

  // Filter languages based on search
  const filteredLanguages = allLanguages?.filter(lang =>
    lang?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    lang?.nativeName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    lang?.code?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    lang?.region?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  // Group filtered languages
  const groupedLanguages = filteredLanguages?.reduce((groups, lang) => {
    const region = lang?.region;
    if (!groups?.[region]) {
      groups[region] = [];
    }
    groups?.[region]?.push(lang);
    return groups;
  }, {});

  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguages(prev => {
      if (prev?.includes(languageCode)) {
        return prev?.filter(code => code !== languageCode);
      } else if (prev?.length < 3) {
        return [...prev, languageCode];
      }
      return prev;
    });
  };

  const handleRemoveLanguage = (languageCode) => {
    setSelectedLanguages(prev => prev?.filter(code => code !== languageCode));
  };

  const handleClearAll = () => {
    setSelectedLanguages([]);
  };

  const handlePreviewLanguage = (language) => {
    setPreviewLanguage(language);
    setShowPreview(true);
  };

  const handleSelectDetected = (language) => {
    setSelectedLanguages([language?.code]);
  };

  const handleConfirmSelection = () => {
    if (selectedLanguages?.length > 0) {
      // Save primary language preference
      localStorage.setItem('selectedLanguage', selectedLanguages?.[0]);
      localStorage.setItem('selectedLanguages', JSON.stringify(selectedLanguages));
      
      // Navigate to main chat interface
      navigate('/main-chat-interface');
    }
  };

  const handleBack = () => {
    navigate('/user-authentication');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                iconName="ArrowLeft"
              />
              <div>
                <h1 className="font-heading text-2xl font-semibold text-foreground">
                  Choose Your Language
                </h1>
                <p className="font-body text-sm text-muted-foreground">
                  Select your preferred language for spiritual guidance
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-sacred bg-card border border-border">
                <Icon name="Globe" size={18} className="text-accent" />
                <span className="font-caption text-sm text-foreground">
                  {allLanguages?.length} Languages Available
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 pb-32">
        {/* Auto Detection */}
        <AutoDetectionCard
          detectedLanguages={detectedLanguages}
          onSelectDetected={handleSelectDetected}
          isDetecting={isDetecting}
        />

        {/* Search Bar */}
        <LanguageSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClearSearch={() => setSearchTerm('')}
          placeholder="Search by language name, script, or region..."
        />

        {/* Language Groups */}
        <div className="space-y-8">
          {Object.entries(groupedLanguages)?.map(([region, languages]) => (
            <LanguageGroup
              key={region}
              title={region}
              languages={languages}
              selectedLanguages={selectedLanguages}
              onLanguageSelect={handleLanguageSelect}
              showPreview={false}
              isCollapsible={languages?.length > 6}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredLanguages?.length === 0 && searchTerm && (
          <div className="text-center py-16">
            <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="font-heading text-xl font-medium text-foreground mb-2">
              No languages found
            </h3>
            <p className="font-body text-muted-foreground mb-6">
              Try searching with different terms or browse all available languages
            </p>
            <Button
              variant="outline"
              onClick={() => setSearchTerm('')}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Clear Search
            </Button>
          </div>
        )}

        {/* Guidance Section */}
        <div className="mt-16 p-6 rounded-sacred bg-accent/5 border border-accent/20 glass-morphism">
          <div className="text-center">
            <Icon name="Heart" size={32} className="mx-auto mb-4 text-accent" />
            <h2 className="font-heading text-xl font-semibold text-foreground mb-2">
              Spiritual Guidance in Your Language
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              VANBA SE GOD AI provides personalized spiritual guidance drawing from ancient wisdom 
              across multiple religious traditions. Choose your preferred language to receive 
              guidance that resonates with your cultural and spiritual background.
            </p>
          </div>
        </div>
      </main>
      {/* Selected Languages Bar */}
      <SelectedLanguagesBar
        selectedLanguages={selectedLanguages}
        allLanguages={allLanguages}
        onRemoveLanguage={handleRemoveLanguage}
        onClearAll={handleClearAll}
        onConfirm={handleConfirmSelection}
        maxSelections={3}
      />
      {/* Language Preview Modal */}
      <LanguagePreview
        language={previewLanguage}
        isVisible={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </div>
  );
};

export default LanguageSelection;
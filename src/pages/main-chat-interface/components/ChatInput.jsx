import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, MicOff, Loader2 } from 'lucide-react';
import VoiceInputIndicator from '../../../components/ui/VoiceInputIndicator';

const ChatInput = ({ 
  onSendMessage = () => {},
  onVoiceInput = () => {},
  isLoading = false,
  currentLanguage = 'en',
  onLanguageChange = () => {},
  placeholder = "Ask for spiritual guidance..."
}) => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if Speech Recognition is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setSpeechSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US'; // Could be dynamic based on user preference

      recognitionRef.current.onresult = (event) => {
        const transcript = event?.results?.[0]?.[0]?.transcript;
        setMessage(prev => prev + transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef?.current) {
        recognitionRef?.current?.stop();
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !isLoading) {
      onSendMessage('user', message?.trim());
      setMessage('');
      if (textareaRef?.current) {
        textareaRef?.current?.focus();
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleListening = () => {
    if (!speechSupported || !recognitionRef?.current) return;

    if (isListening) {
      recognitionRef?.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef?.current?.start();
      setIsListening(true);
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef?.current?.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        {/* Voice Input Button */}
        {speechSupported && (
          <motion.button
            type="button"
            onClick={toggleListening}
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-full transition-all ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 text-white' :'bg-white/10 hover:bg-white/20 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isListening ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </motion.button>
        )}

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e?.target?.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={isLoading}
            rows={1}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ minHeight: '48px' }}
          />

          {/* Voice Input Indicator */}
          {isListening && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl backdrop-blur-sm">
              <VoiceInputIndicator />
            </div>
          )}
        </div>

        {/* Send Button */}
        <motion.button
          type="submit"
          disabled={isLoading || !message?.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full hover:from-yellow-500 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-purple-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </motion.button>
      </form>
      {/* Helpful Tips */}
      <div className="mt-2 text-xs text-blue-300 text-center">
        {speechSupported ? (
          <>Press <kbd className="px-1 py-0.5 bg-white/10 rounded">Enter</kbd> to send, <kbd className="px-1 py-0.5 bg-white/10 rounded">Shift+Enter</kbd> for new line, or use voice input</>
        ) : (
          <>Press <kbd className="px-1 py-0.5 bg-white/10 rounded">Enter</kbd> to send, <kbd className="px-1 py-0.5 bg-white/10 rounded">Shift+Enter</kbd> for new line</>
        )}
      </div>
    </motion.div>
  );
};

export default ChatInput;
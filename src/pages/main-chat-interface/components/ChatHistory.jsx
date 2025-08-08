import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

const ChatHistory = ({ 
  messages = [],
  isLoading = false,
  onPlayAudio = () => {},
  onExpandScripture = () => {},
  currentLanguage = 'en'
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const filteredMessages = messages?.filter(message =>
    message?.content?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    (message?.scriptures && message?.scriptures?.some(scripture =>
      scripture?.source?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      scripture?.verse_text?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    ))
  );

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear all chat history? This action cannot be undone.')) {
      // Clear chat logic would be implemented here
      console.log('Clearing chat history...');
    }
  };

  const scrollToTop = () => {
    chatContainerRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header Actions */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-background/50">
        <div className="flex items-center space-x-2">
          <h2 className="font-heading font-medium text-foreground">Spiritual Guidance</h2>
          <div className="px-2 py-1 bg-accent/10 rounded-full">
            <span className="font-caption text-xs text-accent">
              {messages?.length} messages
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            iconName="Search"
          >
            Search
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            iconName="ArrowUp"
          >
            Top
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearChat}
            iconName="Trash2"
          >
            Clear
          </Button>
        </div>
      </div>
      {/* Search Bar */}
      {isSearchVisible && (
        <div className="p-4 border-b border-border bg-muted/30">
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search messages, scriptures, or guidance..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-sacred text-sm font-body focus-contemplative"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="font-caption text-xs text-muted-foreground mt-2">
              Found {filteredMessages?.length} result{filteredMessages?.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      )}
      {/* Messages Container */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ paddingBottom: '120px' }}
      >
        {/* Welcome Message */}
        {messages?.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-primary">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
                <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.6"/>
              </svg>
            </div>
            <h3 className="font-heading text-lg font-medium text-foreground mb-2">
              Welcome to VANBA SE GOD AI
            </h3>
            <p className="font-body text-muted-foreground max-w-md mx-auto leading-relaxed">
              I'm here to provide spiritual guidance and wisdom from ancient texts. 
              Share your concerns, questions, or seek guidance for life's challenges.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {[
                "How can I find my life purpose?",
                "What does the Bhagavad Gita teach about karma?",
                "Help me overcome fear and anxiety",
                "Guide me in making difficult decisions"
              ]?.map((example, index) => (
                <div key={index} className="px-3 py-2 bg-muted rounded-sacred">
                  <span className="font-caption text-sm text-muted-foreground">
                    "{example}"
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {filteredMessages?.map((message) => (
          <ChatMessage
            key={message?.id}
            message={message}
            isUser={message?.isUser}
            onPlayAudio={onPlayAudio}
            onExpandScripture={onExpandScripture}
            currentLanguage={currentLanguage}
          />
        ))}

        {/* Typing Indicator */}
        <TypingIndicator isVisible={isLoading} />

        {/* Scroll Anchor */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatHistory;
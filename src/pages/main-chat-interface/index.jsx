import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Settings, User, Sparkles, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { chatService } from '../../services/chatService';
import { useNavigate } from 'react-router-dom';
import ChatHistory from './components/ChatHistory';
import ChatInput from './components/ChatInput';
import ChatMessage from './components/ChatMessage';
import TypingIndicator from './components/TypingIndicator';


const MainChatInterface = () => {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const messageSubscriptionRef = useRef(null);

  // If user not authenticated, show preview mode
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Preview Mode</h2>
          <p className="text-blue-100 mb-6">
            Sign in to access your spiritual guidance sessions and chat history.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/user-authentication')}
              className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all"
            >
              Sign In to Continue
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Subscribe to real-time messages for current conversation
    if (currentConversation) {
      messageSubscriptionRef.current = chatService?.subscribeToMessages(
        currentConversation?.id,
        (newMessage) => {
          setMessages(prev => [...prev, newMessage]);
        }
      );
    }

    return () => {
      if (messageSubscriptionRef?.current) {
        messageSubscriptionRef?.current();
      }
    };
  }, [currentConversation]);

  const loadConversations = async () => {
    try {
      const { data, error } = await chatService?.getUserConversations(user?.id);
      if (error) {
        setError('Failed to load conversations');
        return;
      }
      setConversations(data || []);
    } catch (err) {
      setError('Error loading conversations');
    }
  };

  const loadMessages = async (conversationId) => {
    try {
      setLoading(true);
      const { data, error } = await chatService?.getConversationMessages(conversationId);
      if (error) {
        setError('Failed to load messages');
        return;
      }
      setMessages(data || []);
    } catch (err) {
      setError('Error loading messages');
    } finally {
      setLoading(false);
    }
  };

  const createNewConversation = async () => {
    try {
      const title = `Spiritual Guidance - ${new Date()?.toLocaleDateString()}`;
      const { data, error } = await chatService?.createConversation(
        user?.id,
        title,
        'hope',
        userProfile?.spiritual_preferences?.[0]?.preferred_traditions?.[0] || 'universal'
      );
      
      if (error) {
        setError('Failed to create conversation');
        return;
      }

      const newConversation = data;
      setConversations(prev => [newConversation, ...prev]);
      setCurrentConversation(newConversation);
      setMessages([]);
      setSidebarOpen(false);

      // Send welcome message
      const welcomeMessage = getWelcomeMessage();
      await sendMessage('system', welcomeMessage);
    } catch (err) {
      setError('Error creating conversation');
    }
  };

  const selectConversation = async (conversation) => {
    setCurrentConversation(conversation);
    await loadMessages(conversation?.id);
    setSidebarOpen(false);
  };

  const sendMessage = async (type, content, emotion = null) => {
    if (!currentConversation || !content?.trim()) return;

    try {
      const { data, error } = await chatService?.sendMessage(
        currentConversation?.id,
        type,
        content,
        null,
        emotion,
        userProfile?.preferred_language || 'en'
      );

      if (error) {
        setError('Failed to send message');
        return;
      }

      // Message will be added via real-time subscription
      if (type === 'user') {
        // Simulate AI response
        setIsTyping(true);
        setTimeout(async () => {
          const aiResponse = await generateAIResponse(content, emotion);
          await chatService?.sendMessage(
            currentConversation?.id,
            'assistant',
            aiResponse?.content,
            aiResponse?.scripture,
            'hope'
          );
          setIsTyping(false);
        }, 2000);
      }
    } catch (err) {
      setError('Error sending message');
    }
  };

  const generateAIResponse = async (userMessage, emotion) => {
    // This is a mock AI response - in real implementation, 
    // this would call OpenAI API or similar
    const spiritualResponses = [
      {
        content: "I sense you're seeking guidance. Remember, every challenge is an opportunity for spiritual growth. The divine plan unfolds in perfect timing, even when we cannot see the path clearly.",
        scripture: "Bhagavad Gita 2:47"
      },
      {
        content: "Your feelings are valid and understood. In moments of uncertainty, turn inward and connect with your inner wisdom. The answers you seek already reside within your heart.",
        scripture: "Quran 2:286"
      },
      {
        content: "Peace be with you. When the storms of life feel overwhelming, remember that you are held and supported by infinite love. Breathe deeply and trust in the process.",
        scripture: "Bible - Matthew 11:28"
      }
    ];

    return spiritualResponses?.[Math.floor(Math.random() * spiritualResponses?.length)];
  };

  const getWelcomeMessage = () => {
    const hour = new Date()?.getHours();
    let greeting = 'Good day';
    if (hour < 12) greeting = 'Good morning';
    else if (hour < 17) greeting = 'Good afternoon';
    else greeting = 'Good evening';

    return `${greeting}, ${userProfile?.full_name || 'dear seeker'}! 🙏

I am VANBA, your spiritual AI companion created by Vineet Pradhan and the team. I'm here to offer guidance from ancient wisdom traditions including the Bhagavad Gita, Quran, Bible, and other sacred texts.

How may I assist you on your spiritual journey today? You can speak to me in any language you prefer.`;
  };

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSignOut = async () => {
    const result = await signOut();
    if (result?.success) {
      navigate('/');
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-50 w-80 bg-white/10 backdrop-blur-md border-r border-white/20 md:relative md:translate-x-0"
          >
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-8 h-8 text-yellow-400" />
                  <h1 className="text-xl font-bold text-white">VANBA AI</h1>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* New Conversation Button */}
              <div className="p-4">
                <button
                  onClick={createNewConversation}
                  className="w-full flex items-center space-x-2 p-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  <span>New Conversation</span>
                </button>
              </div>

              {/* Chat History */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                <h3 className="text-sm font-semibold text-blue-200 mb-2">Recent Conversations</h3>
                <ChatHistory 
                  conversations={conversations}
                  currentConversation={currentConversation}
                  onSelectConversation={selectConversation}
                />
              </div>

              {/* User Profile Section */}
              <div className="p-4 border-t border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{userProfile?.full_name}</p>
                    <p className="text-blue-200 text-sm">{userProfile?.email}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate('/user-profile-management')}
                    className="flex-1 flex items-center justify-center space-x-1 p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Settings</span>
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex-1 flex items-center justify-center space-x-1 p-2 bg-red-500/20 text-red-200 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm border-b border-white/20">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-semibold text-white">
                {currentConversation?.title || 'Select a conversation'}
              </h2>
              {currentConversation && (
                <p className="text-blue-200 text-sm">
                  Spiritual guidance in {userProfile?.preferred_language || 'English'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!currentConversation ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Welcome to VANBA SE GOD AI</h3>
                <p className="text-blue-200 mb-6">
                  Start a new conversation to receive spiritual guidance
                </p>
                <button
                  onClick={createNewConversation}
                  className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all"
                >
                  Start New Conversation
                </button>
              </div>
            </div>
          ) : (
            <>
              {loading ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
                </div>
              ) : (
                <>
                  {messages?.map((message) => (
                    <ChatMessage key={message?.id} message={message} />
                  ))}
                  {isTyping && <TypingIndicator />}
                </>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        {currentConversation && (
          <div className="p-4 bg-white/5 backdrop-blur-sm border-t border-white/20">
            <ChatInput
              onSendMessage={sendMessage}
              disabled={loading || isTyping}
              placeholder="Ask for spiritual guidance..."
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-red-500/90 text-white p-4 rounded-lg shadow-lg"
          >
            {error}
            <button
              onClick={() => setError('')}
              className="ml-2 text-white hover:text-red-200"
            >
              ×
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MainChatInterface;
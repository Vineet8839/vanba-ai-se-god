import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, User, Copy } from 'lucide-react';

const ChatMessage = ({ message }) => {
  const isUser = message?.message_type === 'user';
  const isSystem = message?.message_type === 'system';

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text)?.then(() => {
      // Could add a toast notification here
    });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}
    >
      <div className={`flex max-w-xs lg:max-w-md ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-gradient-to-br from-blue-400 to-purple-500' 
            : isSystem
            ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :'bg-gradient-to-br from-yellow-400 to-orange-500'
        }`}>
          {isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Sparkles className="w-4 h-4 text-white" />
          )}
        </div>

        {/* Message Content */}
        <div className={`flex-1 ${isUser ? 'mr-2' : 'ml-2'}`}>
          <div
            className={`rounded-2xl p-4 ${
              isUser
                ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                : isSystem
                ? 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 text-yellow-100' :'bg-white/10 backdrop-blur-sm text-white border border-white/20'
            }`}
          >
            {/* Message Text */}
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {message?.content}
            </div>

            {/* Scripture Reference */}
            {message?.scripture_reference && !isUser && (
              <div className="mt-3 pt-3 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-blue-200 font-medium">
                    📖 {message?.scripture_reference}
                  </p>
                  <button
                    onClick={() => copyToClipboard(message?.scripture_reference)}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                    title="Copy reference"
                  >
                    <Copy className="w-3 h-3 text-blue-300" />
                  </button>
                </div>
              </div>
            )}

            {/* Emotion Badge */}
            {message?.emotion_detected && (
              <div className="mt-2 flex justify-end">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  isUser 
                    ? 'bg-white/20 text-blue-100' :'bg-yellow-400/20 text-yellow-200 border border-yellow-400/30'
                }`}>
                  {message?.emotion_detected}
                </span>
              </div>
            )}
          </div>

          {/* Timestamp */}
          <div className={`mt-1 text-xs text-blue-300 ${isUser ? 'text-right' : 'text-left'}`}>
            {formatTime(message?.created_at)}
          </div>

          {/* Actions */}
          {!isUser && (
            <div className="mt-2 flex space-x-2">
              <button
                onClick={() => copyToClipboard(message?.content)}
                className="text-xs text-blue-300 hover:text-white transition-colors flex items-center space-x-1"
              >
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
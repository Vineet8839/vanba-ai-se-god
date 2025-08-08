import React from 'react';
import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';

const VoiceInputIndicator = () => {
  return (
    <div className="flex items-center space-x-3">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        className="p-2 bg-red-500 rounded-full"
      >
        <Mic className="w-4 h-4 text-white" />
      </motion.div>
      <div className="flex items-center space-x-1">
        {[0, 1, 2]?.map((i) => (
          <motion.div
            key={i}
            animate={{ height: [4, 12, 4] }}
            transition={{ 
              duration: 0.8, 
              repeat: Infinity, 
              delay: i * 0.2,
              ease: "easeInOut"
            }}
            className="w-1 bg-red-400 rounded-full"
            style={{ minHeight: '4px' }}
          />
        ))}
      </div>
      <p className="text-white text-sm font-medium">Listening...</p>
    </div>
  );
};

export default VoiceInputIndicator;
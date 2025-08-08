import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Heart, Sparkles } from 'lucide-react';

const SpiritualPreferences = ({ userProfile, onSave, loading }) => {
  const spiritualPrefs = userProfile?.spiritual_preferences?.[0] || {};
  
  const [formData, setFormData] = useState({
    preferred_traditions: spiritualPrefs?.preferred_traditions || ['universal'],
    meditation_practice: spiritualPrefs?.meditation_practice || false,
    prayer_practice: spiritualPrefs?.prayer_practice || false,
    study_practice: spiritualPrefs?.study_practice || false,
    guidance_frequency: spiritualPrefs?.guidance_frequency || 'as_needed'
  });

  const traditionOptions = [
    { value: 'hinduism', label: 'Hinduism', icon: '🕉️' },
    { value: 'islam', label: 'Islam', icon: '☪️' },
    { value: 'christianity', label: 'Christianity', icon: '✝️' },
    { value: 'buddhism', label: 'Buddhism', icon: '☸️' },
    { value: 'sikhism', label: 'Sikhism', icon: '☬' },
    { value: 'jainism', label: 'Jainism', icon: '🙏' },
    { value: 'judaism', label: 'Judaism', icon: '✡️' },
    { value: 'universal', label: 'Universal Wisdom', icon: '🌟' },
    { value: 'all_traditions', label: 'All Traditions', icon: '🌍' }
  ];

  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'as_needed', label: 'As Needed' },
    { value: 'rarely', label: 'Rarely' }
  ];

  const handleTraditionChange = (tradition) => {
    setFormData(prev => ({
      ...prev,
      preferred_traditions: prev?.preferred_traditions?.includes(tradition)
        ? prev?.preferred_traditions?.filter(t => t !== tradition)
        : [...prev?.preferred_traditions, tradition]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Sparkles className="w-6 h-6 text-yellow-400" />
        <h2 className="text-xl font-semibold text-white">Spiritual Preferences</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Spiritual Traditions */}
        <div>
          <label className="block text-sm font-medium text-blue-100 mb-3">
            Preferred Spiritual Traditions
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {traditionOptions?.map((tradition) => (
              <motion.label
                key={tradition?.value}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  formData?.preferred_traditions?.includes(tradition?.value)
                    ? 'bg-yellow-400/20 border-yellow-400/50 text-yellow-100' :'bg-white/5 border-white/20 text-white hover:bg-white/10'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData?.preferred_traditions?.includes(tradition?.value)}
                  onChange={() => handleTraditionChange(tradition?.value)}
                  className="sr-only"
                />
                <span className="text-lg">{tradition?.icon}</span>
                <span className="text-sm font-medium">{tradition?.label}</span>
              </motion.label>
            ))}
          </div>
        </div>

        {/* Spiritual Practices */}
        <div>
          <label className="block text-sm font-medium text-blue-100 mb-3">
            Your Spiritual Practices
          </label>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors cursor-pointer">
              <input
                type="checkbox"
                name="meditation_practice"
                checked={formData?.meditation_practice}
                onChange={handleInputChange}
                className="w-5 h-5 text-yellow-400 bg-transparent border-2 border-white/30 rounded focus:ring-yellow-400 focus:ring-2"
              />
              <span className="text-lg">🧘</span>
              <span className="text-white">I practice meditation</span>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors cursor-pointer">
              <input
                type="checkbox"
                name="prayer_practice"
                checked={formData?.prayer_practice}
                onChange={handleInputChange}
                className="w-5 h-5 text-yellow-400 bg-transparent border-2 border-white/30 rounded focus:ring-yellow-400 focus:ring-2"
              />
              <span className="text-lg">🙏</span>
              <span className="text-white">I practice prayer</span>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors cursor-pointer">
              <input
                type="checkbox"
                name="study_practice"
                checked={formData?.study_practice}
                onChange={handleInputChange}
                className="w-5 h-5 text-yellow-400 bg-transparent border-2 border-white/30 rounded focus:ring-yellow-400 focus:ring-2"
              />
              <span className="text-lg">📖</span>
              <span className="text-white">I study spiritual texts</span>
            </label>
          </div>
        </div>

        {/* Guidance Frequency */}
        <div>
          <label className="block text-sm font-medium text-blue-100 mb-3">
            How often do you seek spiritual guidance?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {frequencyOptions?.map((option) => (
              <motion.label
                key={option?.value}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all ${
                  formData?.guidance_frequency === option?.value
                    ? 'bg-yellow-400/20 border-yellow-400/50 text-yellow-100' :'bg-white/5 border-white/20 text-white hover:bg-white/10'
                }`}
              >
                <input
                  type="radio"
                  name="guidance_frequency"
                  value={option?.value}
                  checked={formData?.guidance_frequency === option?.value}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <span className="text-sm font-medium">{option?.label}</span>
              </motion.label>
            ))}
          </div>
        </div>

        {/* Current Selection Summary */}
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-3 flex items-center space-x-2">
            <Heart className="w-5 h-5 text-yellow-400" />
            <span>Your Spiritual Profile</span>
          </h3>
          <div className="space-y-2 text-sm">
            <p className="text-blue-200">
              <span className="font-medium">Traditions:</span> {' '}
              <span className="text-white">
                {formData?.preferred_traditions?.map(t => 
                  traditionOptions?.find(opt => opt?.value === t)?.label
                )?.join(', ')}
              </span>
            </p>
            <p className="text-blue-200">
              <span className="font-medium">Practices:</span> {' '}
              <span className="text-white">
                {[
                  formData?.meditation_practice && 'Meditation',
                  formData?.prayer_practice && 'Prayer',
                  formData?.study_practice && 'Study'
                ]?.filter(Boolean)?.join(', ') || 'None selected'}
              </span>
            </p>
            <p className="text-blue-200">
              <span className="font-medium">Guidance Frequency:</span> {' '}
              <span className="text-white capitalize">
                {formData?.guidance_frequency?.replace('_', ' ')}
              </span>
            </p>
          </div>
        </div>

        {/* Save Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg hover:from-yellow-500 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-purple-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span>Save Preferences</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SpiritualPreferences;
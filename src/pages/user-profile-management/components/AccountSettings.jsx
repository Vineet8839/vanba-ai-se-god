import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Mail, Shield } from 'lucide-react';

const AccountSettings = ({ userProfile, onSave, loading }) => {
  const [formData, setFormData] = useState({
    full_name: userProfile?.full_name || '',
    email: userProfile?.email || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
        <User className="w-6 h-6 text-yellow-400" />
        <h2 className="text-xl font-semibold text-white">Account Information</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-blue-100 mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
            <input
              type="text"
              name="full_name"
              value={formData?.full_name}
              onChange={handleInputChange}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              placeholder="Enter your full name"
              disabled={loading}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-blue-100 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData?.email}
              onChange={handleInputChange}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all opacity-50 cursor-not-allowed"
              placeholder="Enter your email"
              disabled
            />
          </div>
          <p className="mt-1 text-xs text-blue-300">
            Email cannot be changed. Contact support if needed.
          </p>
        </div>

        {/* Role Display */}
        <div>
          <label className="block text-sm font-medium text-blue-100 mb-2">
            Account Role
          </label>
          <div className="relative">
            <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
            <input
              type="text"
              value={userProfile?.role || 'user'}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white capitalize opacity-50 cursor-not-allowed"
              disabled
            />
          </div>
        </div>

        {/* Account Stats */}
        <div className="bg-white/5 rounded-lg p-4 space-y-3">
          <h3 className="text-lg font-medium text-white mb-3">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-blue-200">Member Since</p>
              <p className="text-white font-medium">
                {new Date(userProfile?.created_at)?.toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-blue-200">Last Updated</p>
              <p className="text-white font-medium">
                {new Date(userProfile?.updated_at)?.toLocaleDateString()}
              </p>
            </div>
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
              <span>Save Changes</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AccountSettings;
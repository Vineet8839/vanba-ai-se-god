import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Settings, BarChart3, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ProfileHeader from './components/ProfileHeader';
import AccountSettings from './components/AccountSettings';
import LanguageSettings from './components/LanguageSettings';
import SpiritualPreferences from './components/SpiritualPreferences';
import UsageStatistics from './components/UsageStatistics';
import ChatHistory from './components/ChatHistory';
import Icon from '../../components/AppIcon';


const UserProfileManagement = () => {
  const { user, userProfile, updateProfile, updateSpiritualPreferences, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Redirect if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-center border border-white/20">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Authentication Required</h2>
          <p className="text-blue-100 mb-6 text-sm sm:text-base">
            Please sign in to access your profile settings.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/user-authentication')}
              className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all text-base sm:text-lg"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all text-base sm:text-lg"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'account', name: 'Account', icon: User },
    { id: 'language', name: 'Language', icon: Settings },
    { id: 'spiritual', name: 'Spiritual', icon: Settings },
    { id: 'statistics', name: 'Statistics', icon: BarChart3 },
    { id: 'history', name: 'Chat History', icon: MessageSquare }
  ];

  const handleSaveProfile = async (updates) => {
    setIsSaving(true);
    try {
      const result = await updateProfile(updates);
      if (result?.success) {
        setSuccessMessage('Profile updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      // Error handling is done in AuthContext
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveSpiritualPreferences = async (preferences) => {
    setIsSaving(true);
    try {
      const result = await updateSpiritualPreferences(preferences);
      if (result?.success) {
        setSuccessMessage('Spiritual preferences updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      // Error handling is done in AuthContext
    } finally {
      setIsSaving(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <AccountSettings
            userProfile={userProfile}
            onSave={handleSaveProfile}
            loading={isSaving}
          />
        );
      case 'language':
        return (
          <LanguageSettings
            userProfile={userProfile}
            onSave={handleSaveProfile}
            loading={isSaving}
          />
        );
      case 'spiritual':
        return (
          <SpiritualPreferences
            userProfile={userProfile}
            onSave={handleSaveSpiritualPreferences}
            loading={isSaving}
          />
        );
      case 'statistics':
        return <UsageStatistics userId={user?.id} />;
      case 'history':
        return <ChatHistory userId={user?.id} />;
      default:
        return null;
    }
  };

  if (loading || !userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => navigate('/main-chat-interface')}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Profile Settings</h1>
              <p className="text-blue-200 text-sm sm:text-base">Manage your spiritual AI companion preferences</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-100 text-sm sm:text-base"
          >
            {successMessage}
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-8">
          {/* Profile Header */}
          <div className="md:col-span-4 mb-4 sm:mb-0">
            <ProfileHeader userProfile={userProfile} />
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1 mb-4 md:mb-0">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20">
              <nav className="space-y-2">
                {tabs?.map((tab) => {
                  const Icon = tab?.icon;
                  return (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`w-full flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg text-left transition-colors text-sm sm:text-base ${
                        activeTab === tab?.id
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :'text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{tab?.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileManagement;
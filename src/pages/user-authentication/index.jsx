import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import AuthContainer from './components/AuthContainer';
import SpiritualBackground from './components/SpiritualBackground';

const UserAuthentication = () => {
  const { signIn, signUp, signInWithOAuth, error, clearError, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (authError) setAuthError('');
    if (error) clearError();
  };

  const validateForm = () => {
    if (!formData?.email || !formData?.password) {
      setAuthError('Please fill in all required fields');
      return false;
    }

    if (!isLogin) {
      if (!formData?.fullName) {
        setAuthError('Full name is required for signup');
        return false;
      }
      if (formData?.password !== formData?.confirmPassword) {
        setAuthError('Passwords do not match');
        return false;
      }
      if (formData?.password?.length < 6) {
        setAuthError('Password must be at least 6 characters long');
        return false;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex?.test(formData?.email)) {
      setAuthError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setAuthError('');

    if (!validateForm()) return;

    try {
      let result;
      if (isLogin) {
        result = await signIn(formData?.email, formData?.password);
      } else {
        result = await signUp(formData?.email, formData?.password, formData?.fullName);
      }

      if (result?.success) {
        if (isLogin) {
          navigate('/main-chat-interface');
        } else {
          // Show success message for signup
          setAuthError('');
          alert('Account created successfully! Please check your email to verify your account.');
        }
      } else {
        setAuthError(result?.error || 'Authentication failed');
      }
    } catch (err) {
      setAuthError('Something went wrong. Please try again.');
    }
  };

  const handleOAuthSignIn = async (provider) => {
    setAuthError('');
    
    try {
      let result = await signInWithOAuth(provider);
      if (!result?.success) {
        setAuthError(result?.error || `${provider} signin failed`);
      }
      // OAuth will redirect, no need to navigate manually
    } catch (err) {
      setAuthError(`Failed to sign in with ${provider}`);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      fullName: '',
      confirmPassword: ''
    });
    setAuthError('');
    if (error) clearError();
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 px-2 sm:px-4 py-6">
      <SpiritualBackground />
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <AuthContainer>
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4"
            >
              <Sparkles className="w-8 h-8 text-black" />
            </motion.div>
            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">VANBA SE GOD AI</h1>
            <p className="text-black text-sm sm:text-base">
              {isLogin ? 'Welcome back, seeker of wisdom' : 'Begin your spiritual journey'}
            </p>
          </div>

          <AuthForm
            isLogin={isLogin}
            formData={formData}
            loading={loading}
            error={authError || error}
            showPassword={showPassword}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onTogglePassword={() => setShowPassword(!showPassword)}
            onToggleAuthMode={toggleAuthMode}
            onOAuthSignIn={handleOAuthSignIn}
            labelClassName="text-black"
            inputClassName="text-black"
            buttonClassName="text-black"
          />

          {/* Creator Attribution */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-center text-black text-xs sm:text-sm"
          >
            <p>Created by <span className="font-semibold text-black">Vineet Pradhan</span></p>
            <p className="mt-1">
              Team: <span className="text-black">Aryan, Bhavik, Niraj, Abhishek</span>
            </p>
          </motion.div>
        </AuthContainer>
      </div>
    </div>
  );
  };
  
  export default UserAuthentication;
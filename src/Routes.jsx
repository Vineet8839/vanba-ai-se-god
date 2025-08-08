import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LanguageSelection from './pages/language-selection';
import AdminAnalyticsDashboard from './pages/admin-analytics-dashboard';
import MainChatInterface from './pages/main-chat-interface';
import UserProfileManagement from './pages/user-profile-management';
import SplashScreen from './pages/3d-animated-splash-screen';
import UserAuthentication from './pages/user-authentication';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/language-selection" element={<LanguageSelection />} />
        <Route path="/admin-analytics-dashboard" element={<AdminAnalyticsDashboard />} />
        <Route path="/main-chat-interface" element={<MainChatInterface />} />
        <Route path="/user-profile-management" element={<UserProfileManagement />} />
        <Route path="/3d-animated-splash-screen" element={<SplashScreen />} />
        <Route path="/user-authentication" element={<UserAuthentication />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

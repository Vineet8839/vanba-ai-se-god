import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import KPICard from './components/KPICard';
import EmotionTrendsChart from './components/EmotionTrendsChart';
import LanguageUsageChart from './components/LanguageUsageChart';
import TopicsRankingList from './components/TopicsRankingList';
import GeographicUsageMap from './components/GeographicUsageMap';
import RealTimeMetrics from './components/RealTimeMetrics';
import AdminControls from './components/AdminControls';

const AdminAnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDateRange, setSelectedDateRange] = useState('7d');

  useEffect(() => {
    // Simulate loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Update current time
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(timeInterval);
    };
  }, []);

  const navigationRoutes = [
    { path: '/3d-animated-splash-screen', label: 'Splash Screen', icon: 'Sparkles' },
    { path: '/user-authentication', label: 'Authentication', icon: 'Lock' },
    { path: '/main-chat-interface', label: 'Chat Interface', icon: 'MessageCircle' },
    { path: '/language-selection', label: 'Language Selection', icon: 'Globe' },
    { path: '/user-profile-management', label: 'Profile Management', icon: 'User' },
    { path: '/admin-analytics-dashboard', label: 'Analytics Dashboard', icon: 'BarChart3', active: true }
  ];

  const dateRanges = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ];

  const kpiData = [
    {
      title: 'Daily Active Users',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'Users',
      description: 'Users active in the last 24 hours',
      loading: isLoading
    },
    {
      title: 'Total Conversations',
      value: '18,456',
      change: '+8.2%',
      changeType: 'positive',
      icon: 'MessageSquare',
      description: 'Spiritual guidance sessions completed',
      loading: isLoading
    },
    {
      title: 'Scripture Citations',
      value: '45,123',
      change: '+15.7%',
      changeType: 'positive',
      icon: 'BookOpen',
      description: 'Religious texts referenced in responses',
      loading: isLoading
    },
    {
      title: 'Average Response Time',
      value: '2.3s',
      change: '-5.1%',
      changeType: 'positive',
      icon: 'Clock',
      description: 'AI response latency improvement',
      loading: isLoading
    },
    {
      title: 'User Satisfaction',
      value: '4.7/5',
      change: '+3.2%',
      changeType: 'positive',
      icon: 'Star',
      description: 'Average rating from user feedback',
      loading: isLoading
    },
    {
      title: 'Active Languages',
      value: '23',
      change: '+2',
      changeType: 'positive',
      icon: 'Globe',
      description: 'Languages currently supported',
      loading: isLoading
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin">
            <Icon name="Loader2" size={48} className="text-primary" />
          </div>
          <p className="font-body text-lg text-muted-foreground">
            Loading Analytics Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border glass-morphism z-50">
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-sacred bg-primary/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
                <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.6"/>
              </svg>
            </div>
            <div>
              <h1 className="font-heading font-semibold text-sm text-foreground">
                VANBA SE GOD AI
              </h1>
              <p className="font-caption text-xs text-muted-foreground">
                Admin Dashboard
              </p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {navigationRoutes?.map((route) => (
              <button
                key={route?.path}
                onClick={() => navigate(route?.path)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-sacred transition-contemplative text-left ${
                  route?.active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={route?.icon} size={18} />
                <span className="font-body text-sm">
                  {route?.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
          <div className="text-center">
            <p className="font-caption text-xs text-muted-foreground">
              © {new Date()?.getFullYear()} VANBA SE GOD AI
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              Admin Panel v2.1.0
            </p>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="ml-64 min-h-screen">
        {/* Header */}
        <header className="bg-card border-b border-border p-6 glass-morphism">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="font-heading text-2xl font-semibold text-foreground mb-2">
                Analytics Dashboard
              </h1>
              <p className="font-body text-sm text-muted-foreground">
                Comprehensive insights into spiritual guidance platform performance and user engagement
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Date Range Selector */}
              <div className="flex items-center space-x-1 bg-muted rounded-sacred p-1">
                {dateRanges?.map((range) => (
                  <button
                    key={range?.value}
                    onClick={() => setSelectedDateRange(range?.value)}
                    className={`px-3 py-1 rounded-sacred text-xs font-medium transition-contemplative ${
                      selectedDateRange === range?.value
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {range?.label}
                  </button>
                ))}
              </div>
              
              {/* Current Time */}
              <div className="flex items-center space-x-2 px-3 py-2 bg-background border border-border rounded-sacred">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="font-mono text-sm text-foreground">
                  {currentTime?.toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </span>
              </div>
              
              {/* Export Button */}
              <Button variant="outline" iconName="Download">
                Export Report
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 space-y-8">
          {/* KPI Cards Grid */}
          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
              Key Performance Indicators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kpiData?.map((kpi, index) => (
                <KPICard 
                  key={index} 
                  title={kpi.title}
                  value={kpi.value}
                  change={kpi.change}
                  changeType={kpi.changeType}
                  icon={kpi.icon}
                  description={kpi.description}
                  loading={kpi.loading}
                />
              ))}
            </div>
          </section>

          {/* Charts Section */}
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <EmotionTrendsChart />
            <LanguageUsageChart />
          </section>

          {/* Topics and Geography Section */}
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <TopicsRankingList />
            <GeographicUsageMap />
          </section>

          {/* Real-time Metrics */}
          <section>
            <RealTimeMetrics />
          </section>

          {/* Administrative Controls */}
          <section>
            <AdminControls />
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminAnalyticsDashboard;
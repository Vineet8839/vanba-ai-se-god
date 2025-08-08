import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Button from '../../../components/ui/Button';


const UsageStatistics = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const monthlyData = [
    { name: 'Jan', sessions: 12, duration: 180 },
    { name: 'Feb', sessions: 19, duration: 285 },
    { name: 'Mar', sessions: 15, duration: 225 },
    { name: 'Apr', sessions: 22, duration: 330 },
    { name: 'May', sessions: 18, duration: 270 },
    { name: 'Jun', sessions: 25, duration: 375 },
    { name: 'Jul', sessions: 20, duration: 300 },
    { name: 'Aug', sessions: 28, duration: 420 }
  ];

  const emotionData = [
    { name: 'Anxiety', value: 35, color: '#B8956A' },
    { name: 'Sadness', value: 25, color: '#A67B6B' },
    { name: 'Curiosity', value: 20, color: '#6B8CAE' },
    { name: 'Fear', value: 12, color: '#A67B6B' },
    { name: 'Joy', value: 8, color: '#7A9471' }
  ];

  const scriptureData = [
    { name: 'Bhagavad Gita', sessions: 45, percentage: 35 },
    { name: 'Quran', sessions: 32, percentage: 25 },
    { name: 'Bible', sessions: 26, percentage: 20 },
    { name: 'Guru Granth Sahib', sessions: 16, percentage: 12 },
    { name: 'Dhammapada', sessions: 10, percentage: 8 }
  ];

  const languageData = [
    { name: 'Hindi', value: 45, color: '#8B7355' },
    { name: 'English', value: 30, color: '#6B8CAE' },
    { name: 'Urdu', value: 15, color: '#A0956B' },
    { name: 'Punjabi', value: 10, color: '#7A9471' }
  ];

  const growthInsights = [
    {
      icon: 'TrendingUp',
      title: 'Spiritual Growth',
      value: '78%',
      description: 'Improvement in emotional well-being',
      trend: 'up'
    },
    {
      icon: 'Clock',
      title: 'Average Session',
      value: '15 min',
      description: 'Time spent per guidance session',
      trend: 'stable'
    },
    {
      icon: 'Calendar',
      title: 'Consistency',
      value: '5 days/week',
      description: 'Regular spiritual practice',
      trend: 'up'
    },
    {
      icon: 'Heart',
      title: 'Satisfaction',
      value: '4.8/5',
      description: 'Average guidance rating',
      trend: 'up'
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-sacred overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted transition-contemplative"
      >
        <div className="flex items-center space-x-3">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <div className="text-left">
            <h3 className="font-heading font-semibold text-foreground">
              Usage Statistics
            </h3>
            <p className="font-caption text-sm text-muted-foreground">
              Track your spiritual journey progress and insights
            </p>
          </div>
        </div>
        <Icon 
          name="ChevronDown" 
          size={20} 
          className={`text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
        />
      </button>
      {/* Content */}
      {isExpanded && (
        <div className="px-6 pb-6 space-y-6">
          {/* Growth Insights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {growthInsights?.map((insight, index) => (
              <div key={index} className="p-4 bg-muted/30 rounded-sacred">
                <div className="flex items-center justify-between mb-2">
                  <Icon name={insight?.icon} size={20} className="text-primary" />
                  <Icon 
                    name={getTrendIcon(insight?.trend)} 
                    size={16} 
                    className={getTrendColor(insight?.trend)} 
                  />
                </div>
                <div className="text-2xl font-heading font-semibold text-foreground mb-1">
                  {insight?.value}
                </div>
                <div className="font-body font-medium text-foreground text-sm mb-1">
                  {insight?.title}
                </div>
                <div className="font-caption text-xs text-muted-foreground">
                  {insight?.description}
                </div>
              </div>
            ))}
          </div>

          {/* Session Activity Chart */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-body font-medium text-foreground">
                Session Activity
              </h4>
              <div className="flex space-x-2">
                {['week', 'month', 'year']?.map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-1 rounded-sacred text-sm font-caption transition-colors ${
                      selectedPeriod === period
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {period?.charAt(0)?.toUpperCase() + period?.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full h-64 bg-muted/20 rounded-sacred p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="name" 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="sessions" 
                    fill="var(--color-primary)" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Emotion Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-body font-medium text-foreground mb-4">
                Emotions Addressed
              </h4>
              <div className="w-full h-64 bg-muted/20 rounded-sacred p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={emotionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                      labelLine={false}
                    >
                      {emotionData?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry?.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h4 className="font-body font-medium text-foreground mb-4">
                Language Usage
              </h4>
              <div className="w-full h-64 bg-muted/20 rounded-sacred p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={languageData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                      labelLine={false}
                    >
                      {languageData?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry?.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Scripture Usage */}
          <div>
            <h4 className="font-body font-medium text-foreground mb-4">
              Scripture References
            </h4>
            <div className="space-y-3">
              {scriptureData?.map((scripture, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-sacred">
                  <div className="flex items-center space-x-3">
                    <Icon name="Book" size={16} className="text-primary" />
                    <span className="font-body text-foreground">{scripture?.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-muted rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${scripture?.percentage}%` }}
                      />
                    </div>
                    <span className="font-caption text-sm text-muted-foreground w-12 text-right">
                      {scripture?.sessions}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Statistics */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-body font-medium text-foreground">
                  Export Statistics
                </h4>
                <p className="font-caption text-sm text-muted-foreground">
                  Download your spiritual journey data
                </p>
              </div>
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                iconSize={16}
              >
                Export Data
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsageStatistics;
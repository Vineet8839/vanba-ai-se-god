import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LanguageUsageChart = () => {
  const [viewType, setViewType] = useState('pie');

  const languageData = [
    { language: 'Hindi', code: 'hi', users: 2847, percentage: 32.5, color: '#8B7355' },
    { language: 'English', code: 'en', users: 2156, percentage: 24.6, color: '#6B8CAE' },
    { language: 'Marathi', code: 'mr', users: 1234, percentage: 14.1, color: '#A0956B' },
    { language: 'Tamil', code: 'ta', users: 987, percentage: 11.3, color: '#A67B6B' },
    { language: 'Telugu', code: 'te', users: 654, percentage: 7.5, color: '#7A9471' },
    { language: 'Bengali', code: 'bn', users: 432, percentage: 4.9, color: '#B8956A' },
    { language: 'Gujarati', code: 'gu', users: 298, percentage: 3.4, color: '#6B8CAE' },
    { language: 'Punjabi', code: 'pa', users: 156, percentage: 1.8, color: '#A67B6B' }
  ];

  const totalUsers = languageData?.reduce((sum, lang) => sum + lang?.users, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-sacred p-3 shadow-contemplative glass-morphism">
          <div className="flex items-center space-x-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: data?.color }}
            />
            <span className="font-body text-sm font-medium text-foreground">
              {data?.language}
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between space-x-4">
              <span className="font-caption text-xs text-muted-foreground">Users:</span>
              <span className="font-mono text-xs font-medium text-foreground">
                {data?.users?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between space-x-4">
              <span className="font-caption text-xs text-muted-foreground">Percentage:</span>
              <span className="font-mono text-xs font-medium text-foreground">
                {data?.percentage}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap gap-2 justify-center mt-4">
        {payload?.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2 px-2 py-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry?.color }}
            />
            <span className="font-caption text-xs text-foreground">
              {entry?.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-sacred p-6 glass-morphism">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
            Language Usage Distribution
          </h3>
          <p className="font-body text-sm text-muted-foreground">
            User preferences across supported languages
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-muted rounded-sacred p-1">
            <button
              onClick={() => setViewType('pie')}
              className={`flex items-center space-x-1 px-3 py-1 rounded-sacred text-xs font-medium transition-contemplative ${
                viewType === 'pie' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="PieChart" size={14} />
              <span>Pie</span>
            </button>
            <button
              onClick={() => setViewType('bar')}
              className={`flex items-center space-x-1 px-3 py-1 rounded-sacred text-xs font-medium transition-contemplative ${
                viewType === 'bar' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="BarChart3" size={14} />
              <span>Bar</span>
            </button>
          </div>
          
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
        </div>
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted/30 rounded-sacred p-3">
          <div className="text-center">
            <p className="font-mono text-lg font-semibold text-foreground">
              {totalUsers?.toLocaleString()}
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              Total Users
            </p>
          </div>
        </div>
        <div className="bg-muted/30 rounded-sacred p-3">
          <div className="text-center">
            <p className="font-mono text-lg font-semibold text-foreground">
              {languageData?.length}
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              Active Languages
            </p>
          </div>
        </div>
        <div className="bg-muted/30 rounded-sacred p-3">
          <div className="text-center">
            <p className="font-mono text-lg font-semibold text-foreground">
              {languageData?.[0]?.language}
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              Most Popular
            </p>
          </div>
        </div>
        <div className="bg-muted/30 rounded-sacred p-3">
          <div className="text-center">
            <p className="font-mono text-lg font-semibold text-foreground">
              {(languageData?.[0]?.percentage + languageData?.[1]?.percentage)?.toFixed(1)}%
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              Top 2 Languages
            </p>
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {viewType === 'pie' ? (
            <PieChart>
              <Pie
                data={languageData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={40}
                paddingAngle={2}
                dataKey="users"
                nameKey="language"
              >
                {languageData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          ) : (
            <BarChart data={languageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 115, 85, 0.1)" />
              <XAxis 
                dataKey="code" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="users" radius={[4, 4, 0, 0]}>
                {languageData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LanguageUsageChart;
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Button from '../../../components/ui/Button';

const EmotionTrendsChart = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedEmotions, setSelectedEmotions] = useState(['anxiety', 'depression', 'stress', 'confusion']);

  const emotionData = [
    { date: '2025-08-01', anxiety: 45, depression: 32, stress: 67, confusion: 28, anger: 15, sadness: 38 },
    { date: '2025-08-02', anxiety: 52, depression: 28, stress: 71, confusion: 34, anger: 18, sadness: 42 },
    { date: '2025-08-03', anxiety: 48, depression: 35, stress: 63, confusion: 31, anger: 12, sadness: 35 },
    { date: '2025-08-04', anxiety: 41, depression: 29, stress: 58, confusion: 26, anger: 20, sadness: 40 },
    { date: '2025-08-05', anxiety: 55, depression: 38, stress: 74, confusion: 42, anger: 16, sadness: 45 },
    { date: '2025-08-06', anxiety: 49, depression: 31, stress: 69, confusion: 38, anger: 14, sadness: 41 },
    { date: '2025-08-07', anxiety: 46, depression: 33, stress: 65, confusion: 35, anger: 17, sadness: 39 },
    { date: '2025-08-08', anxiety: 43, depression: 30, stress: 61, confusion: 32, anger: 13, sadness: 37 }
  ];

  const emotions = [
    { key: 'anxiety', label: 'Anxiety', color: '#A67B6B' },
    { key: 'depression', label: 'Depression', color: '#8B7355' },
    { key: 'stress', label: 'Stress', color: '#6B8CAE' },
    { key: 'confusion', label: 'Confusion', color: '#A0956B' },
    { key: 'anger', label: 'Anger', color: '#B8956A' },
    { key: 'sadness', label: 'Sadness', color: '#7A9471' }
  ];

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  const toggleEmotion = (emotionKey) => {
    setSelectedEmotions(prev => 
      prev?.includes(emotionKey) 
        ? prev?.filter(e => e !== emotionKey)
        : [...prev, emotionKey]
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-sacred p-3 shadow-contemplative glass-morphism">
          <p className="font-body text-sm font-medium text-foreground mb-2">
            {new Date(label)?.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
          {payload?.map((entry) => (
            <div key={entry?.dataKey} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry?.color }}
                />
                <span className="font-caption text-xs text-foreground">
                  {entry?.name}
                </span>
              </div>
              <span className="font-mono text-xs font-medium text-foreground">
                {entry?.value} queries
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-sacred p-6 glass-morphism">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
            Emotion Trends Analysis
          </h3>
          <p className="font-body text-sm text-muted-foreground">
            Track emotional patterns in spiritual guidance requests
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-muted rounded-sacred p-1">
            {timeRanges?.map((range) => (
              <button
                key={range?.value}
                onClick={() => setTimeRange(range?.value)}
                className={`px-3 py-1 rounded-sacred text-xs font-medium transition-contemplative ${
                  timeRange === range?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {range?.label}
              </button>
            ))}
          </div>
          
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
        </div>
      </div>
      {/* Emotion Legend */}
      <div className="flex flex-wrap gap-3 mb-6">
        {emotions?.map((emotion) => (
          <button
            key={emotion?.key}
            onClick={() => toggleEmotion(emotion?.key)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-sacred border transition-contemplative ${
              selectedEmotions?.includes(emotion?.key)
                ? 'border-primary bg-primary/10 text-primary' :'border-border bg-background text-muted-foreground hover:text-foreground'
            }`}
          >
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: emotion?.color }}
            />
            <span className="font-caption text-xs font-medium">
              {emotion?.label}
            </span>
          </button>
        ))}
      </div>
      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={emotionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 115, 85, 0.1)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => new Date(value)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            {emotions?.filter(emotion => selectedEmotions?.includes(emotion?.key))?.map((emotion) => (
                <Line
                  key={emotion?.key}
                  type="monotone"
                  dataKey={emotion?.key}
                  stroke={emotion?.color}
                  strokeWidth={2}
                  dot={{ fill: emotion?.color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: emotion?.color, strokeWidth: 2 }}
                  name={emotion?.label}
                />
              ))
            }
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmotionTrendsChart;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TopicsRankingList = () => {
  const [timeFilter, setTimeFilter] = useState('week');
  const [selectedTopic, setSelectedTopic] = useState(null);

  const topicsData = [
    {
      id: 1,
      topic: 'Career Guidance',
      queries: 1247,
      change: '+12.5%',
      changeType: 'positive',
      scriptures: ['Bhagavad Gita 2.47', 'Quran 94:5-6', 'Proverbs 16:3'],
      avgResponseTime: '2.3s',
      satisfaction: 4.6,
      category: 'Professional Life'
    },
    {
      id: 2,
      topic: 'Relationship Issues',
      queries: 1089,
      change: '+8.2%',
      changeType: 'positive',
      scriptures: ['Bhagavad Gita 12.13', 'Matthew 7:12', 'Quran 49:10'],
      avgResponseTime: '2.8s',
      satisfaction: 4.4,
      category: 'Personal Life'
    },
    {
      id: 3,
      topic: 'Anxiety & Stress',
      queries: 967,
      change: '-3.1%',
      changeType: 'negative',
      scriptures: ['Philippians 4:6-7', 'Bhagavad Gita 6.35', 'Quran 13:28'],
      avgResponseTime: '1.9s',
      satisfaction: 4.7,
      category: 'Mental Health'
    },
    {
      id: 4,
      topic: 'Life Purpose',
      queries: 834,
      change: '+15.7%',
      changeType: 'positive',
      scriptures: ['Bhagavad Gita 18.46', 'Ecclesiastes 3:1', 'Quran 51:56'],
      avgResponseTime: '3.1s',
      satisfaction: 4.8,
      category: 'Spiritual Growth'
    },
    {
      id: 5,
      topic: 'Family Conflicts',
      queries: 723,
      change: '+5.4%',
      changeType: 'positive',
      scriptures: ['Ephesians 6:1-4', 'Bhagavad Gita 7.11', 'Quran 17:23'],
      avgResponseTime: '2.5s',
      satisfaction: 4.3,
      category: 'Family'
    },
    {
      id: 6,
      topic: 'Financial Worries',
      queries: 656,
      change: '+2.8%',
      changeType: 'positive',
      scriptures: ['Matthew 6:26', 'Bhagavad Gita 9.22', 'Quran 65:3'],
      avgResponseTime: '2.1s',
      satisfaction: 4.2,
      category: 'Material Concerns'
    },
    {
      id: 7,
      topic: 'Depression',
      queries: 589,
      change: '-7.2%',
      changeType: 'negative',
      scriptures: ['Psalm 34:18', 'Bhagavad Gita 2.14', 'Quran 94:5-6'],
      avgResponseTime: '2.7s',
      satisfaction: 4.5,
      category: 'Mental Health'
    },
    {
      id: 8,
      topic: 'Spiritual Growth',
      queries: 512,
      change: '+18.3%',
      changeType: 'positive',
      scriptures: ['Bhagavad Gita 4.7-8', 'John 14:6', 'Quran 2:152'],
      avgResponseTime: '3.4s',
      satisfaction: 4.9,
      category: 'Spiritual Growth'
    }
  ];

  const timeFilters = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  const getChangeColor = (changeType) => {
    return changeType === 'positive' ? 'text-success' : 'text-error';
  };

  const getChangeIcon = (changeType) => {
    return changeType === 'positive' ? 'TrendingUp' : 'TrendingDown';
  };

  const getRankIcon = (index) => {
    if (index === 0) return { icon: 'Crown', color: 'text-warning' };
    if (index === 1) return { icon: 'Medal', color: 'text-muted-foreground' };
    if (index === 2) return { icon: 'Award', color: 'text-accent' };
    return { icon: 'Hash', color: 'text-muted-foreground' };
  };

  const getSatisfactionStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        className={i < Math.floor(rating) ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <div className="bg-card border border-border rounded-sacred p-6 glass-morphism">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
            Most Requested Topics
          </h3>
          <p className="font-body text-sm text-muted-foreground">
            Ranking of spiritual guidance categories by user queries
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-muted rounded-sacred p-1">
            {timeFilters?.map((filter) => (
              <button
                key={filter?.value}
                onClick={() => setTimeFilter(filter?.value)}
                className={`px-3 py-1 rounded-sacred text-xs font-medium transition-contemplative ${
                  timeFilter === filter?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {filter?.label}
              </button>
            ))}
          </div>
          
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
        </div>
      </div>
      {/* Topics List */}
      <div className="space-y-3">
        {topicsData?.map((topic, index) => {
          const rankIcon = getRankIcon(index);
          const isSelected = selectedTopic === topic?.id;
          
          return (
            <div key={topic?.id} className="group">
              <button
                onClick={() => setSelectedTopic(isSelected ? null : topic?.id)}
                className="w-full p-4 bg-background border border-border rounded-sacred hover:bg-muted/50 transition-contemplative text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Rank */}
                    <div className="flex items-center justify-center w-8 h-8 rounded-sacred bg-muted">
                      <Icon 
                        name={rankIcon?.icon} 
                        size={16} 
                        className={rankIcon?.color}
                      />
                    </div>
                    
                    {/* Topic Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h4 className="font-body text-sm font-medium text-foreground">
                          {topic?.topic}
                        </h4>
                        <span className="px-2 py-1 bg-accent/10 text-accent rounded-sacred text-xs font-caption">
                          {topic?.category}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span className="font-mono">
                          {topic?.queries?.toLocaleString()} queries
                        </span>
                        <div className="flex items-center space-x-1">
                          {getSatisfactionStars(topic?.satisfaction)}
                          <span className="font-mono ml-1">
                            {topic?.satisfaction}
                          </span>
                        </div>
                        <span className="font-mono">
                          {topic?.avgResponseTime} avg
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Change & Expand */}
                  <div className="flex items-center space-x-3">
                    <div className={`flex items-center space-x-1 ${getChangeColor(topic?.changeType)}`}>
                      <Icon name={getChangeIcon(topic?.changeType)} size={14} />
                      <span className="font-mono text-xs font-medium">
                        {topic?.change}
                      </span>
                    </div>
                    <Icon 
                      name={isSelected ? "ChevronUp" : "ChevronDown"} 
                      size={16} 
                      className="text-muted-foreground group-hover:text-foreground transition-colors"
                    />
                  </div>
                </div>
              </button>
              {/* Expanded Details */}
              {isSelected && (
                <div className="mt-3 p-4 bg-muted/30 border border-border rounded-sacred animate-fade-in-up">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-body text-sm font-medium text-foreground mb-2">
                        Common Scripture References
                      </h5>
                      <div className="space-y-2">
                        {topic?.scriptures?.map((scripture, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <Icon name="BookOpen" size={14} className="text-primary" />
                            <span className="font-caption text-xs text-foreground">
                              {scripture}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-body text-sm font-medium text-foreground mb-2">
                        Performance Metrics
                      </h5>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-caption text-xs text-muted-foreground">
                            Average Response Time:
                          </span>
                          <span className="font-mono text-xs text-foreground">
                            {topic?.avgResponseTime}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-caption text-xs text-muted-foreground">
                            User Satisfaction:
                          </span>
                          <span className="font-mono text-xs text-foreground">
                            {topic?.satisfaction}/5.0
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-caption text-xs text-muted-foreground">
                            Growth Rate:
                          </span>
                          <span className={`font-mono text-xs ${getChangeColor(topic?.changeType)}`}>
                            {topic?.change}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopicsRankingList;
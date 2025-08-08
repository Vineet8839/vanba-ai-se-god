import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ 
  title, 
  value, 
  change, 
  changeType = 'positive', 
  icon, 
  description,
  loading = false 
}) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-sacred p-6 glass-morphism">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 bg-muted rounded-full"></div>
            <div className="w-16 h-4 bg-muted rounded"></div>
          </div>
          <div className="w-24 h-8 bg-muted rounded mb-2"></div>
          <div className="w-32 h-4 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-sacred p-6 glass-morphism hover-lift transition-contemplative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-sacred bg-primary/10">
          <Icon name={icon} size={24} className="text-primary" />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={16} />
            <span className="font-mono text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="font-heading text-2xl font-semibold text-foreground">
          {value}
        </h3>
        <p className="font-body text-sm text-muted-foreground">
          {title}
        </p>
        {description && (
          <p className="font-caption text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default KPICard;
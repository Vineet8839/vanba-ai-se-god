import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RealTimeMetrics = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [metrics, setMetrics] = useState({
    activeSessions: 247,
    avgResponseTime: 2.3,
    queriesPerMinute: 18,
    systemHealth: 98.7,
    activeLanguages: 12,
    peakHour: '14:00-15:00'
  });

  // Simulate real-time updates
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const metricsInterval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        activeSessions: prev?.activeSessions + Math.floor(Math.random() * 10 - 5),
        avgResponseTime: Math.max(1.0, prev?.avgResponseTime + (Math.random() * 0.4 - 0.2)),
        queriesPerMinute: Math.max(0, prev?.queriesPerMinute + Math.floor(Math.random() * 6 - 3)),
        systemHealth: Math.max(95, Math.min(100, prev?.systemHealth + (Math.random() * 2 - 1)))
      }));
    }, 3000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(metricsInterval);
    };
  }, []);

  const getHealthColor = (health) => {
    if (health >= 98) return 'text-success';
    if (health >= 95) return 'text-warning';
    return 'text-error';
  };

  const getHealthIcon = (health) => {
    if (health >= 98) return 'CheckCircle';
    if (health >= 95) return 'AlertTriangle';
    return 'XCircle';
  };

  const realtimeData = [
    {
      label: 'Active Sessions',
      value: metrics?.activeSessions,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      suffix: '',
      description: 'Users currently online'
    },
    {
      label: 'Avg Response Time',
      value: metrics?.avgResponseTime?.toFixed(1),
      icon: 'Clock',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      suffix: 's',
      description: 'AI response latency'
    },
    {
      label: 'Queries/Minute',
      value: metrics?.queriesPerMinute,
      icon: 'MessageSquare',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      suffix: '',
      description: 'Current query rate'
    },
    {
      label: 'System Health',
      value: metrics?.systemHealth?.toFixed(1),
      icon: getHealthIcon(metrics?.systemHealth),
      color: getHealthColor(metrics?.systemHealth),
      bgColor: `${getHealthColor(metrics?.systemHealth)?.replace('text-', 'bg-')}/10`,
      suffix: '%',
      description: 'Overall system status'
    },
    {
      label: 'Active Languages',
      value: metrics?.activeLanguages,
      icon: 'Globe',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      suffix: '',
      description: 'Languages in use now'
    },
    {
      label: 'Peak Hour',
      value: metrics?.peakHour,
      icon: 'BarChart3',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted/10',
      suffix: '',
      description: 'Highest activity period'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-sacred p-6 glass-morphism">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
            Real-Time System Metrics
          </h3>
          <p className="font-body text-sm text-muted-foreground">
            Live monitoring of platform performance and user activity
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 rounded-sacred">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="font-caption text-xs text-success font-medium">
              Live
            </span>
          </div>
          <div className="font-mono text-sm text-muted-foreground">
            {currentTime?.toLocaleTimeString('en-US', { 
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>
        </div>
      </div>
      {/* Real-time Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {realtimeData?.map((metric, index) => (
          <div
            key={index}
            className="bg-background border border-border rounded-sacred p-4 hover-lift transition-contemplative"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`flex items-center justify-center w-10 h-10 rounded-sacred ${metric?.bgColor}`}>
                <Icon name={metric?.icon} size={20} className={metric?.color} />
              </div>
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-baseline space-x-1">
                <span className="font-mono text-xl font-semibold text-foreground">
                  {metric?.value}
                </span>
                {metric?.suffix && (
                  <span className="font-mono text-sm text-muted-foreground">
                    {metric?.suffix}
                  </span>
                )}
              </div>
              <p className="font-body text-sm text-foreground">
                {metric?.label}
              </p>
              <p className="font-caption text-xs text-muted-foreground">
                {metric?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Activity Timeline */}
      <div className="border-t border-border pt-6">
        <h4 className="font-heading text-sm font-medium text-foreground mb-4">
          Recent Activity Stream
        </h4>
        
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {[
            {
              time: new Date(Date.now() - 30000),
              event: 'New user session started',
              details: 'User from India, Hindi language preference',
              type: 'user',
              icon: 'UserPlus'
            },
            {
              time: new Date(Date.now() - 65000),
              event: 'High query volume detected',
              details: 'Career guidance topic trending (+25%)',
              type: 'trend',
              icon: 'TrendingUp'
            },
            {
              time: new Date(Date.now() - 120000),
              event: 'System optimization completed',
              details: 'Response time improved by 0.3s',
              type: 'system',
              icon: 'Settings'
            },
            {
              time: new Date(Date.now() - 180000),
              event: 'Language support activated',
              details: 'Bengali language processing enabled',
              type: 'feature',
              icon: 'Globe'
            },
            {
              time: new Date(Date.now() - 240000),
              event: 'Peak usage threshold reached',
              details: '300+ concurrent users online',
              type: 'alert',
              icon: 'AlertCircle'
            }
          ]?.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted/20 rounded-sacred">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 flex-shrink-0">
                <Icon name={activity?.icon} size={14} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-body text-sm text-foreground">
                    {activity?.event}
                  </p>
                  <span className="font-mono text-xs text-muted-foreground">
                    {activity?.time?.toLocaleTimeString('en-US', { 
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <p className="font-caption text-xs text-muted-foreground">
                  {activity?.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealTimeMetrics;
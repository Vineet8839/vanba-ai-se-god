import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GeographicUsageMap = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [viewMode, setViewMode] = useState('users');

  const regionData = [
    {
      id: 'india',
      name: 'India',
      users: 6847,
      sessions: 12456,
      languages: ['Hindi', 'Marathi', 'Tamil', 'Telugu', 'Bengali'],
      topLanguage: 'Hindi',
      coordinates: { lat: 20.5937, lng: 78.9629 },
      growth: '+15.2%',
      color: '#8B7355'
    },
    {
      id: 'usa',
      name: 'United States',
      users: 2134,
      sessions: 4567,
      languages: ['English', 'Spanish'],
      topLanguage: 'English',
      coordinates: { lat: 39.8283, lng: -98.5795 },
      growth: '+8.7%',
      color: '#6B8CAE'
    },
    {
      id: 'uk',
      name: 'United Kingdom',
      users: 1456,
      sessions: 2890,
      languages: ['English'],
      topLanguage: 'English',
      coordinates: { lat: 55.3781, lng: -3.4360 },
      growth: '+12.3%',
      color: '#A0956B'
    },
    {
      id: 'canada',
      name: 'Canada',
      users: 987,
      sessions: 1876,
      languages: ['English', 'French'],
      topLanguage: 'English',
      coordinates: { lat: 56.1304, lng: -106.3468 },
      growth: '+6.4%',
      color: '#A67B6B'
    },
    {
      id: 'australia',
      name: 'Australia',
      users: 743,
      sessions: 1432,
      languages: ['English'],
      topLanguage: 'English',
      coordinates: { lat: -25.2744, lng: 133.7751 },
      growth: '+9.1%',
      color: '#7A9471'
    },
    {
      id: 'uae',
      name: 'United Arab Emirates',
      users: 654,
      sessions: 1234,
      languages: ['Arabic', 'English', 'Hindi'],
      topLanguage: 'Arabic',
      coordinates: { lat: 23.4241, lng: 53.8478 },
      growth: '+18.5%',
      color: '#B8956A'
    }
  ];

  const totalUsers = regionData?.reduce((sum, region) => sum + region?.users, 0);
  const totalSessions = regionData?.reduce((sum, region) => sum + region?.sessions, 0);

  const getMetricValue = (region) => {
    return viewMode === 'users' ? region?.users : region?.sessions;
  };

  const getMetricLabel = () => {
    return viewMode === 'users' ? 'Users' : 'Sessions';
  };

  return (
    <div className="bg-card border border-border rounded-sacred p-6 glass-morphism">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
            Global Usage Distribution
          </h3>
          <p className="font-body text-sm text-muted-foreground">
            Geographic reach and language preferences worldwide
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-muted rounded-sacred p-1">
            <button
              onClick={() => setViewMode('users')}
              className={`px-3 py-1 rounded-sacred text-xs font-medium transition-contemplative ${
                viewMode === 'users' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setViewMode('sessions')}
              className={`px-3 py-1 rounded-sacred text-xs font-medium transition-contemplative ${
                viewMode === 'sessions' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sessions
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
              {totalSessions?.toLocaleString()}
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              Total Sessions
            </p>
          </div>
        </div>
        <div className="bg-muted/30 rounded-sacred p-3">
          <div className="text-center">
            <p className="font-mono text-lg font-semibold text-foreground">
              {regionData?.length}
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              Active Countries
            </p>
          </div>
        </div>
        <div className="bg-muted/30 rounded-sacred p-3">
          <div className="text-center">
            <p className="font-mono text-lg font-semibold text-foreground">
              {regionData?.[0]?.name}
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              Top Region
            </p>
          </div>
        </div>
      </div>
      {/* Map Placeholder with Interactive Regions */}
      <div className="relative bg-muted/20 rounded-sacred p-8 mb-6 min-h-[400px] flex items-center justify-center">
        <iframe
          width="100%"
          height="400"
          loading="lazy"
          title="Global Usage Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=20.5937,78.9629&z=2&output=embed"
          className="rounded-sacred border-0"
        />
        
        {/* Overlay with region markers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full">
            {regionData?.map((region, index) => (
              <div
                key={region?.id}
                className="absolute pointer-events-auto"
                style={{
                  left: `${20 + (index % 3) * 25}%`,
                  top: `${20 + Math.floor(index / 3) * 30}%`
                }}
              >
                <button
                  onClick={() => setSelectedRegion(selectedRegion === region?.id ? null : region?.id)}
                  className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-background shadow-contemplative hover-lift transition-contemplative"
                  style={{ backgroundColor: region?.color }}
                >
                  <span className="font-mono text-xs font-bold text-white">
                    {index + 1}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Region Details List */}
      <div className="space-y-3">
        {regionData?.map((region, index) => {
          const isSelected = selectedRegion === region?.id;
          const percentage = ((getMetricValue(region) / (viewMode === 'users' ? totalUsers : totalSessions)) * 100)?.toFixed(1);
          
          return (
            <div key={region?.id} className="group">
              <button
                onClick={() => setSelectedRegion(isSelected ? null : region?.id)}
                className="w-full p-4 bg-background border border-border rounded-sacred hover:bg-muted/50 transition-contemplative text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Region Indicator */}
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: region?.color }}
                      />
                      <div className="flex items-center justify-center w-6 h-6 rounded-sacred bg-muted text-xs font-mono font-bold">
                        {index + 1}
                      </div>
                    </div>
                    
                    {/* Region Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h4 className="font-body text-sm font-medium text-foreground">
                          {region?.name}
                        </h4>
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-sacred text-xs font-caption">
                          {region?.topLanguage}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span className="font-mono">
                          {getMetricValue(region)?.toLocaleString()} {getMetricLabel()?.toLowerCase()}
                        </span>
                        <span className="font-mono">
                          {percentage}% of total
                        </span>
                        <span className="font-mono text-success">
                          {region?.growth}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expand Icon */}
                  <Icon 
                    name={isSelected ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    className="text-muted-foreground group-hover:text-foreground transition-colors"
                  />
                </div>
              </button>
              {/* Expanded Details */}
              {isSelected && (
                <div className="mt-3 p-4 bg-muted/30 border border-border rounded-sacred animate-fade-in-up">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-body text-sm font-medium text-foreground mb-2">
                        Supported Languages
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {region?.languages?.map((language, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-1 rounded-sacred text-xs font-caption ${
                              language === region?.topLanguage
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-body text-sm font-medium text-foreground mb-2">
                        Usage Statistics
                      </h5>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-caption text-xs text-muted-foreground">
                            Active Users:
                          </span>
                          <span className="font-mono text-xs text-foreground">
                            {region?.users?.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-caption text-xs text-muted-foreground">
                            Total Sessions:
                          </span>
                          <span className="font-mono text-xs text-foreground">
                            {region?.sessions?.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-caption text-xs text-muted-foreground">
                            Growth Rate:
                          </span>
                          <span className="font-mono text-xs text-success">
                            {region?.growth}
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

export default GeographicUsageMap;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ChatHistory = ({ 
  onExportHistory = () => {}
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  const chatHistory = [
    {
      id: 1,
      date: "2025-01-08",
      time: "09:30 AM",
      topic: "Career Guidance",
      emotion: "Anxiety",
      scripture: "Bhagavad Gita",
      preview: "Seeking guidance about job change and financial security...",
      duration: "12 minutes",
      language: "Hindi"
    },
    {
      id: 2,
      date: "2025-01-07",
      time: "07:15 PM",
      topic: "Relationship Issues",
      emotion: "Sadness",
      scripture: "Bible",
      preview: "Having conflicts with family members, need wisdom...",
      duration: "18 minutes",
      language: "English"
    },
    {
      id: 3,
      date: "2025-01-06",
      time: "06:00 AM",
      topic: "Spiritual Growth",
      emotion: "Curiosity",
      scripture: "Quran",
      preview: "Understanding the purpose of life and spiritual practices...",
      duration: "25 minutes",
      language: "Urdu"
    },
    {
      id: 4,
      date: "2025-01-05",
      time: "08:45 PM",
      topic: "Health Concerns",
      emotion: "Fear",
      scripture: "Guru Granth Sahib",
      preview: "Dealing with health anxiety and finding inner peace...",
      duration: "15 minutes",
      language: "Punjabi"
    },
    {
      id: 5,
      date: "2025-01-04",
      time: "02:30 PM",
      topic: "Financial Stress",
      emotion: "Worry",
      scripture: "Dhammapada",
      preview: "Managing financial difficulties with mindfulness...",
      duration: "20 minutes",
      language: "Hindi"
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Conversations' },
    { value: 'anxiety', label: 'Anxiety' },
    { value: 'sadness', label: 'Sadness' },
    { value: 'fear', label: 'Fear' },
    { value: 'worry', label: 'Worry' },
    { value: 'curiosity', label: 'Curiosity' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'Last 3 Months' }
  ];

  const exportFormats = [
    { value: 'pdf', label: 'PDF Document', icon: 'FileText' },
    { value: 'json', label: 'JSON Data', icon: 'Code' },
    { value: 'txt', label: 'Text File', icon: 'File' }
  ];

  const filteredHistory = chatHistory?.filter(chat => {
    const matchesSearch = chat?.topic?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         chat?.preview?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesFilter = filterBy === 'all' || chat?.emotion?.toLowerCase() === filterBy;
    return matchesSearch && matchesFilter;
  });

  const getEmotionColor = (emotion) => {
    const colors = {
      'Anxiety': 'text-warning',
      'Sadness': 'text-error',
      'Fear': 'text-destructive',
      'Worry': 'text-warning',
      'Curiosity': 'text-accent'
    };
    return colors?.[emotion] || 'text-muted-foreground';
  };

  const handleExport = (format) => {
    onExportHistory(format, filteredHistory);
  };

  return (
    <div className="bg-card border border-border rounded-sacred overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted transition-contemplative"
      >
        <div className="flex items-center space-x-3">
          <Icon name="MessageCircle" size={20} className="text-primary" />
          <div className="text-left">
            <h3 className="font-heading font-semibold text-foreground">
              Chat History
            </h3>
            <p className="font-caption text-sm text-muted-foreground">
              Access and manage your spiritual guidance conversations
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-caption">
            {chatHistory?.length} sessions
          </span>
          <Icon 
            name="ChevronDown" 
            size={20} 
            className={`text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
          />
        </div>
      </button>
      {/* Content */}
      {isExpanded && (
        <div className="px-6 pb-6 space-y-6">
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="search"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
            <Select
              placeholder="Filter by emotion"
              options={filterOptions}
              value={filterBy}
              onChange={setFilterBy}
            />
            <Select
              placeholder="Date range"
              options={dateRangeOptions}
              value={dateRange}
              onChange={setDateRange}
            />
          </div>

          {/* Chat List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredHistory?.map((chat) => (
              <div
                key={chat?.id}
                className="p-4 border border-border rounded-sacred hover:bg-muted/30 transition-contemplative cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-body font-medium text-foreground">
                        {chat?.topic}
                      </h4>
                      <span className={`text-xs font-caption px-2 py-1 rounded-full bg-muted ${getEmotionColor(chat?.emotion)}`}>
                        {chat?.emotion}
                      </span>
                    </div>
                    <p className="font-caption text-sm text-muted-foreground mb-2">
                      {chat?.preview}
                    </p>
                    <div className="flex items-center space-x-4 text-xs font-caption text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Icon name="Calendar" size={12} />
                        <span>{chat?.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{chat?.time}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Timer" size={12} />
                        <span>{chat?.duration}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Book" size={12} />
                        <span>{chat?.scripture}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Globe" size={12} />
                        <span>{chat?.language}</span>
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ExternalLink"
                    iconSize={14}
                  />
                </div>
              </div>
            ))}
          </div>

          {filteredHistory?.length === 0 && (
            <div className="text-center py-8">
              <Icon name="MessageCircle" size={48} className="mx-auto text-muted-foreground/50 mb-4" />
              <h4 className="font-body font-medium text-foreground mb-2">
                No conversations found
              </h4>
              <p className="font-caption text-sm text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}

          {/* Export Options */}
          <div className="pt-4 border-t border-border">
            <h4 className="font-body font-medium text-foreground mb-3">
              Export Chat History
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {exportFormats?.map((format) => (
                <Button
                  key={format?.value}
                  variant="outline"
                  onClick={() => handleExport(format?.value)}
                  iconName={format?.icon}
                  iconPosition="left"
                  iconSize={16}
                  className="justify-start"
                >
                  {format?.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
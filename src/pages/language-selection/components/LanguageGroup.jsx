import React, { useState } from 'react';
import LanguageCard from './LanguageCard';
import Icon from '../../../components/AppIcon';


const LanguageGroup = ({ 
  title, 
  languages = [], 
  selectedLanguages = [], 
  onLanguageSelect = () => {},
  showPreview = false,
  isCollapsible = false 
}) => {
  const [isExpanded, setIsExpanded] = React.useState(true);

  const toggleExpanded = () => {
    if (isCollapsible) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="mb-8">
      {/* Group Header */}
      <div 
        className={`
          flex items-center justify-between mb-4 pb-2 border-b border-border
          ${isCollapsible ? 'cursor-pointer' : ''}
        `}
        onClick={toggleExpanded}
      >
        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            {title}
          </h2>
          <p className="font-caption text-sm text-muted-foreground">
            {languages?.length} language{languages?.length !== 1 ? 's' : ''} available
          </p>
        </div>
        {isCollapsible && (
          <div className={`
            transform transition-transform duration-200
            ${isExpanded ? 'rotate-180' : 'rotate-0'}
          `}>
            <Icon name="ChevronDown" size={20} className="text-muted-foreground" />
          </div>
        )}
      </div>
      {/* Languages Grid */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in-up">
          {languages?.map((language) => (
            <LanguageCard
              key={language?.code}
              language={language}
              isSelected={selectedLanguages?.includes(language?.code)}
              onSelect={onLanguageSelect}
              showPreview={showPreview}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageGroup;
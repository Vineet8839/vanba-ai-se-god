import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const LanguageSearchBar = ({ 
  searchTerm = '', 
  onSearchChange = () => {},
  onClearSearch = () => {},
  placeholder = "Search languages..." 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    onSearchChange(e?.target?.value);
  };

  const handleClearSearch = () => {
    onSearchChange('');
    onClearSearch();
  };

  return (
    <div className="relative mb-6">
      <div className={`
        relative transition-all duration-200
        ${isFocused ? 'transform scale-[1.02]' : ''}
      `}>
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          <Icon 
            name="Search" 
            size={20} 
            className={`
              transition-colors duration-200
              ${isFocused ? 'text-accent' : 'text-muted-foreground'}
            `} 
          />
        </div>

        {/* Search Input */}
        <Input
          type="search"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="pl-12 pr-12 py-4 text-lg bg-card border-2 border-border rounded-sacred focus:border-accent focus:ring-0 transition-all duration-200"
        />

        {/* Clear Button */}
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors duration-200"
          >
            <Icon name="X" size={18} className="text-muted-foreground hover:text-foreground" />
          </button>
        )}
      </div>
      {/* Search Suggestions */}
      {searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-sacred shadow-contemplative-lg glass-morphism z-50">
          <div className="p-3">
            <p className="font-caption text-xs text-muted-foreground mb-2">
              Search suggestions:
            </p>
            <div className="flex flex-wrap gap-2">
              {['Hindi', 'English', 'Arabic', 'Spanish', 'Chinese']?.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => onSearchChange(suggestion)}
                  className="px-3 py-1 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors font-caption text-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSearchBar;
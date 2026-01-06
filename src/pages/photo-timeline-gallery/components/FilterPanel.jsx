import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ onFilterChange, onViewModeChange, currentFilters, viewMode }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState(currentFilters || {});

  const filterCategories = [
    {
      id: 'events',
      label: 'Events',
      icon: 'Calendar',
      options: [
        { value: 'anniversary', label: 'Anniversary', count: 12 },
        { value: 'vacation', label: 'Vacation', count: 28 },
        { value: 'date-night', label: 'Date Night', count: 45 },
        { value: 'everyday', label: 'Everyday', count: 156 },
        { value: 'special-occasion', label: 'Special Occasion', count: 23 }
      ]
    },
    {
      id: 'mood',
      label: 'Mood',
      icon: 'Heart',
      options: [
        { value: 'romantic', label: 'Romantic', count: 67 },
        { value: 'playful', label: 'Playful', count: 89 },
        { value: 'intimate', label: 'Intimate', count: 34 },
        { value: 'adventurous', label: 'Adventurous', count: 52 },
        { value: 'cozy', label: 'Cozy', count: 78 }
      ]
    },
    {
      id: 'location',
      label: 'Location',
      icon: 'MapPin',
      options: [
        { value: 'home', label: 'Home', count: 124 },
        { value: 'restaurant', label: 'Restaurant', count: 43 },
        { value: 'park', label: 'Park', count: 31 },
        { value: 'beach', label: 'Beach', count: 18 },
        { value: 'travel', label: 'Travel', count: 56 }
      ]
    },
    {
      id: 'people',
      label: 'People',
      icon: 'Users',
      options: [
        { value: 'couple', label: 'Just Us', count: 198 },
        { value: 'friends', label: 'With Friends', count: 67 },
        { value: 'family', label: 'With Family', count: 45 },
        { value: 'pets', label: 'With Pets', count: 23 }
      ]
    }
  ];

  const sortOptions = [
    { value: 'date-desc', label: 'Newest First', icon: 'ArrowDown' },
    { value: 'date-asc', label: 'Oldest First', icon: 'ArrowUp' },
    { value: 'reactions', label: 'Most Loved', icon: 'Heart' },
    { value: 'random', label: 'Surprise Me', icon: 'Shuffle' }
  ];

  const handleFilterToggle = (category, value) => {
    const newFilters = { ...activeFilters };
    
    if (!newFilters?.[category]) {
      newFilters[category] = [];
    }
    
    if (newFilters?.[category]?.includes(value)) {
      newFilters[category] = newFilters?.[category]?.filter(v => v !== value);
      if (newFilters?.[category]?.length === 0) {
        delete newFilters?.[category];
      }
    } else {
      newFilters?.[category]?.push(value);
    }
    
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    onFilterChange({});
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters)?.reduce((total, filters) => total + filters?.length, 0);
  };

  return (
    <div className="mb-6">
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2 px-4 py-2 bg-card/50 hover:bg-primary/10 border border-border/20 rounded-xl transition-all duration-300"
        >
          <Icon name="Filter" size={16} className="text-muted-foreground" />
          <span className="font-body text-sm font-medium text-foreground">
            Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
          </span>
          <Icon 
            name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
            size={16} 
            className="text-muted-foreground" 
          />
        </button>

        <div className="flex items-center space-x-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-card/50 border border-border/20 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === 'grid' ?'bg-primary/20 text-primary' :'hover:bg-muted/20 text-muted-foreground'
              }`}
              title="Grid View"
            >
              <Icon name="Grid3X3" size={16} />
            </button>
            <button
              onClick={() => onViewModeChange('masonry')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === 'masonry' ?'bg-primary/20 text-primary' :'hover:bg-muted/20 text-muted-foreground'
              }`}
              title="Masonry View"
            >
              <Icon name="LayoutGrid" size={16} />
            </button>
          </div>

          {/* Clear Filters */}
          {getActiveFilterCount() > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      {/* Expanded Filter Panel */}
      {isExpanded && (
        <div className="glass-card rounded-2xl border border-border/20 p-6 space-y-6">
          {/* Sort Options */}
          <div>
            <h3 className="font-body text-sm font-semibold text-foreground mb-3 flex items-center space-x-2">
              <Icon name="ArrowUpDown" size={16} className="text-primary" />
              <span>Sort By</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {sortOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => onFilterChange({ ...activeFilters, sort: option?.value })}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-300
                    ${activeFilters?.sort === option?.value
                      ? 'bg-primary/20 border-primary/50 text-primary' :'bg-card/50 border-border/20 hover:border-primary/30 text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <Icon name={option?.icon} size={14} />
                  <span className="font-body text-sm">{option?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filter Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filterCategories?.map((category) => (
              <div key={category?.id}>
                <h3 className="font-body text-sm font-semibold text-foreground mb-3 flex items-center space-x-2">
                  <Icon name={category?.icon} size={16} className="text-primary" />
                  <span>{category?.label}</span>
                </h3>
                <div className="space-y-2">
                  {category?.options?.map((option) => {
                    const isActive = activeFilters?.[category?.id]?.includes(option?.value);
                    return (
                      <button
                        key={option?.value}
                        onClick={() => handleFilterToggle(category?.id, option?.value)}
                        className={`
                          w-full flex items-center justify-between px-3 py-2 rounded-lg border transition-all duration-300
                          ${isActive
                            ? 'bg-primary/20 border-primary/50 text-primary' :'bg-card/30 border-border/20 hover:border-primary/30 text-muted-foreground hover:text-foreground'
                          }
                        `}
                      >
                        <span className="font-body text-sm">{option?.label}</span>
                        <span className="font-caption text-xs bg-muted/30 px-2 py-1 rounded-full">
                          {option?.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Active Filters Summary */}
          {getActiveFilterCount() > 0 && (
            <div className="pt-4 border-t border-border/20">
              <h4 className="font-body text-sm font-semibold text-foreground mb-3">Active Filters</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(activeFilters)?.map(([category, values]) => 
                  values?.map((value) => {
                    const categoryData = filterCategories?.find(c => c?.id === category);
                    const optionData = categoryData?.options?.find(o => o?.value === value);
                    
                    return (
                      <div
                        key={`${category}-${value}`}
                        className="flex items-center space-x-2 px-3 py-1 bg-primary/10 border border-primary/30 rounded-full"
                      >
                        <Icon name={categoryData?.icon || 'Tag'} size={12} className="text-primary" />
                        <span className="font-caption text-xs text-primary">
                          {optionData?.label || value}
                        </span>
                        <button
                          onClick={() => handleFilterToggle(category, value)}
                          className="text-primary hover:text-primary/80 transition-colors duration-300"
                        >
                          <Icon name="X" size={12} />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
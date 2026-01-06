import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LetterToolbar = ({ 
  searchQuery, 
  onSearchChange, 
  viewMode, 
  onViewModeChange, 
  onNewLetter,
  selectedCount,
  onBulkAction,
  onToggleSidebar 
}) => {
  const [showBulkActions, setShowBulkActions] = useState(false);

  const bulkActions = [
    { id: 'move', label: 'Move to Collection', icon: 'FolderOpen' },
    { id: 'delete', label: 'Delete Selected', icon: 'Trash2' },
    { id: 'export', label: 'Export as PDF', icon: 'Download' },
    { id: 'share', label: 'Share Letters', icon: 'Share2' }
  ];

  const handleBulkAction = (actionId) => {
    onBulkAction(actionId);
    setShowBulkActions(false);
  };

  return (
    <div className="glass-card border-b border-border/20 p-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-muted/20 transition-colors duration-300"
          >
            <Icon name="Menu" size={20} className="text-muted-foreground" />
          </button>

          {/* Search */}
          <div className="relative flex-1 lg:w-80">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="search"
              placeholder="Search your love letters..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pl-10 pr-4"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-muted/20 transition-colors duration-300"
              >
                <Icon name="X" size={14} className="text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-between lg:justify-end space-x-3">
          {/* Bulk Actions */}
          {selectedCount > 0 && (
            <div className="flex items-center space-x-2">
              <span className="font-body text-sm text-muted-foreground">
                {selectedCount} selected
              </span>
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="MoreHorizontal"
                  onClick={() => setShowBulkActions(!showBulkActions)}
                >
                  Actions
                </Button>
                
                {showBulkActions && (
                  <div className="absolute right-0 top-full mt-2 w-48 glass-card rounded-xl shadow-medium border border-border/20 py-2 z-50">
                    {bulkActions?.map((action) => (
                      <button
                        key={action?.id}
                        onClick={() => handleBulkAction(action?.id)}
                        className={`
                          w-full flex items-center space-x-3 px-4 py-2 text-sm font-body
                          transition-all duration-300
                          ${action?.id === 'delete' 
                            ? 'text-error hover:text-error/80 hover:bg-error/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/10'
                          }
                        `}
                      >
                        <Icon name={action?.icon} size={16} />
                        <span>{action?.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* View Mode Toggle */}
          <div className="flex items-center bg-muted/20 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`
                p-2 rounded-lg transition-all duration-300
                ${viewMode === 'grid' ?'bg-primary text-primary-foreground shadow-gentle' :'text-muted-foreground hover:text-foreground hover:bg-muted/20'
                }
              `}
              title="Grid View"
            >
              <Icon name="Grid3X3" size={16} />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`
                p-2 rounded-lg transition-all duration-300
                ${viewMode === 'list' ?'bg-primary text-primary-foreground shadow-gentle' :'text-muted-foreground hover:text-foreground hover:bg-muted/20'
                }
              `}
              title="List View"
            >
              <Icon name="List" size={16} />
            </button>
          </div>

          {/* New Letter Button */}
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={onNewLetter}
            className="shadow-soft hover:shadow-medium"
          >
            <span className="hidden sm:inline">New Letter</span>
            <span className="sm:hidden">New</span>
          </Button>
        </div>
      </div>
      {/* Active Filters */}
      {searchQuery && (
        <div className="mt-4 flex items-center space-x-2">
          <span className="font-caption text-xs text-muted-foreground">Active filters:</span>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-primary/20 text-primary-foreground px-2 py-1 rounded-lg text-xs font-medium">
              <Icon name="Search" size={12} />
              <span>"{searchQuery}"</span>
              <button
                onClick={() => onSearchChange('')}
                className="ml-1 hover:bg-primary/30 rounded-full p-0.5 transition-colors duration-300"
              >
                <Icon name="X" size={10} />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Bulk Actions Backdrop */}
      {showBulkActions && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowBulkActions(false)}
        />
      )}
    </div>
  );
};

export default LetterToolbar;
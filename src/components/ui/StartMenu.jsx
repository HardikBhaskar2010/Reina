import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const StartMenu = ({ isOpen, onClose, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredApps, setFilteredApps] = useState([]);

  const applications = [
    {
      id: 'love-letters',
      label: 'Love Letters Manager',
      path: '/love-letters-manager',
      icon: 'Heart',
      description: 'Write and organize your romantic correspondence',
      category: 'Communication'
    },
    {
      id: 'photo-timeline',
      label: 'Photo Timeline Gallery',
      path: '/photo-timeline-gallery',
      icon: 'Camera',
      description: 'Browse your visual memories chronologically',
      category: 'Media'
    },
    {
      id: 'voice-notes',
      label: 'Voice Notes Studio',
      path: '/voice-notes-studio',
      icon: 'Mic',
      description: 'Record and organize audio messages',
      category: 'Media'
    },
    {
      id: 'calendar',
      label: 'Shared Calendar Planner',
      path: '/shared-calendar-planner',
      icon: 'Calendar',
      description: 'Plan your future together',
      category: 'Planning'
    },
    {
      id: 'secret-box',
      label: 'Secret Box Vault',
      path: '/secret-box-vault',
      icon: 'Lock',
      description: 'Access your most private memories',
      category: 'Security'
    }
  ];

  const quickActions = [
    { label: 'Settings', icon: 'Settings', action: 'settings' },
    { label: 'Help', icon: 'HelpCircle', action: 'help' },
    { label: 'Power', icon: 'Power', action: 'power' }
  ];

  useEffect(() => {
    if (searchQuery?.trim()) {
      const filtered = applications?.filter(app =>
        app?.label?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        app?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        app?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      setFilteredApps(filtered);
    } else {
      setFilteredApps(applications);
    }
  }, [searchQuery]);

  const handleAppClick = (app) => {
    onNavigate(app?.path);
    onClose();
  };

  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-90 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Start Menu */}
      <div className="fixed bottom-16 left-4 z-100 w-80 sm:w-96 glass-card rounded-2xl shadow-floating border border-border/30 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-border/20 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-soft">
              <Icon name="Heart" size={20} className="text-primary-foreground animate-heart-pulse" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground">Pink OS Love</h3>
              <p className="font-caption text-xs text-muted-foreground">Your intimate digital space</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border/20">
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 bg-input/50 border border-border/30 rounded-lg font-body text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
            />
          </div>
        </div>

        {/* Applications Grid */}
        <div className="p-4 max-h-80 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            {filteredApps?.map((app) => (
              <button
                key={app?.id}
                onClick={() => handleAppClick(app)}
                className="group p-4 rounded-xl bg-card/50 hover:bg-primary/10 border border-border/20 hover:border-primary/30 transition-all duration-300 hover:shadow-gentle hover:scale-105"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                    <Icon 
                      name={app?.icon} 
                      size={24} 
                      className="text-primary group-hover:text-accent transition-colors duration-300" 
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="font-body text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {app?.label}
                    </h4>
                    <p className="font-caption text-xs text-muted-foreground mt-1 line-clamp-2">
                      {app?.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filteredApps?.length === 0 && searchQuery && (
            <div className="text-center py-8">
              <Icon name="Search" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="font-body text-sm text-muted-foreground">No applications found</p>
              <p className="font-caption text-xs text-muted-foreground mt-1">Try a different search term</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-border/20 bg-muted/5">
          <div className="flex justify-between">
            {quickActions?.map((action) => (
              <button
                key={action?.action}
                onClick={() => handleQuickAction(action?.action)}
                className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-muted/20 transition-all duration-300 group"
                title={action?.label}
              >
                <Icon 
                  name={action?.icon} 
                  size={18} 
                  className="text-muted-foreground group-hover:text-foreground transition-colors duration-300" 
                />
                <span className="font-caption text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {action?.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StartMenu;
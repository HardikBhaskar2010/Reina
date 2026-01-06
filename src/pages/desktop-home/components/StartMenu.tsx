import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const StartMenu = ({ isOpen, onClose, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const applications = [
    {
      id: 'love-letters',
      label: 'Love Letters Manager',
      path: '/love-letters-manager',
      icon: 'Heart',
      description: 'Write and organize your romantic correspondence',
      category: 'romance',
      color: 'from-pink-400 to-rose-400'
    },
    {
      id: 'photo-timeline',
      label: 'Photo Timeline Gallery',
      path: '/photo-timeline-gallery', 
      icon: 'Camera',
      description: 'Browse your visual memories chronologically',
      category: 'memories',
      color: 'from-purple-400 to-pink-400'
    },
    {
      id: 'voice-notes',
      label: 'Voice Notes Studio',
      path: '/voice-notes-studio',
      icon: 'Mic',
      description: 'Record and organize audio messages',
      category: 'romance',
      color: 'from-blue-400 to-purple-400'
    },
    {
      id: 'calendar',
      label: 'Shared Calendar Planner',
      path: '/shared-calendar-planner',
      icon: 'Calendar',
      description: 'Plan your future together',
      category: 'planning',
      color: 'from-green-400 to-blue-400'
    },
    {
      id: 'secret-box',
      label: 'Secret Box Vault',
      path: '/secret-box-vault',
      icon: 'Lock',
      description: 'Access your most private memories',
      category: 'memories',
      color: 'from-yellow-400 to-orange-400'
    }
  ];

  const categories = [
    { id: 'all', name: 'All', icon: 'Grid3X3' },
    { id: 'romance', name: 'Romance', icon: 'Heart' },
    { id: 'memories', name: 'Memories', icon: 'Camera' },
    { id: 'planning', name: 'Planning', icon: 'Calendar' }
  ];

  const filteredApps = applications?.filter(app => {
    const matchesSearch = app?.label?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         app?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesCategory = activeCategory === 'all' || app?.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAppClick = (app) => {
    onNavigate(app?.path);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setActiveCategory('all');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-90"
        onClick={onClose}
      />
      
      {/* Mobile Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-95 bg-white rounded-t-3xl shadow-floating border-t border-pink-200/30 max-h-[80vh] overflow-hidden animate-slide-up">
        
        {/* Handle Bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-12 h-1 bg-muted-foreground/30 rounded-full"></div>
        </div>
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-pink-200/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Icon name="Heart" size={20} className="text-white animate-pulse" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground">Love Apps</h2>
                <p className="font-caption text-xs text-muted-foreground">Your romantic digital collection</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-muted/20 transition-colors duration-300"
            >
              <Icon name="X" size={16} className="text-muted-foreground" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search your love apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full pl-10 pr-4 py-3 bg-muted/10 border border-pink-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-300 font-body text-sm"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="px-6 py-4 border-b border-pink-200/30">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {categories?.map((category) => (
              <button
                key={category?.id}
                onClick={() => setActiveCategory(category?.id)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 flex-shrink-0
                  ${activeCategory === category?.id 
                    ? 'bg-primary text-primary-foreground shadow-soft' 
                    : 'bg-muted/10 text-muted-foreground hover:bg-muted/20'
                  }
                `}
              >
                <Icon name={category?.icon} size={14} />
                <span className="font-body text-sm font-medium">{category?.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Apps Grid */}
        <div className="flex-1 p-6 overflow-y-auto scrollbar-hide">
          {filteredApps?.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {filteredApps?.map((app) => (
                <button
                  key={app?.id}
                  onClick={() => handleAppClick(app)}
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-white/60 hover:bg-primary/5 border border-pink-200/30 transition-all duration-300 group text-left"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${app?.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-soft`}>
                    <Icon name={app?.icon} size={24} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-body text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-1">
                      {app?.label}
                    </h4>
                    <p className="font-caption text-sm text-muted-foreground leading-relaxed">
                      {app?.description}
                    </p>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-primary transition-colors duration-300 flex-shrink-0" />
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="font-body text-lg font-semibold text-foreground mb-2">No apps found</h3>
              <p className="font-caption text-sm text-muted-foreground">
                Try adjusting your search or category filter
              </p>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="p-6 pt-4 border-t border-pink-200/30 bg-gradient-to-t from-pink-50/50 to-transparent">
          <div className="flex items-center justify-between">
            <button className="flex items-center space-x-2 p-3 rounded-2xl hover:bg-muted/20 transition-all duration-300 group">
              <Icon name="Settings" size={18} className="text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
              <span className="font-body text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">Settings</span>
            </button>
            
            <button className="flex items-center space-x-2 p-3 rounded-2xl hover:bg-error/10 text-muted-foreground hover:text-error transition-all duration-300">
              <Icon name="User" size={18} />
              <span className="font-body text-sm font-medium">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartMenu;
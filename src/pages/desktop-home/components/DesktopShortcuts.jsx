import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DesktopShortcuts = ({ onNavigate }) => {
  const [shortcuts] = useState([
    {
      id: 'love-letters',
      label: 'Love Letters',
      path: '/love-letters-manager',
      icon: 'Heart',
      color: 'from-pink-400 to-rose-400',
      description: 'Write romantic letters'
    },
    {
      id: 'photo-timeline',
      label: 'Photo Timeline', 
      path: '/photo-timeline-gallery',
      icon: 'Camera',
      color: 'from-purple-400 to-pink-400',
      description: 'Browse memories'
    },
    {
      id: 'voice-notes',
      label: 'Voice Notes',
      path: '/voice-notes-studio', 
      icon: 'Mic',
      color: 'from-blue-400 to-purple-400',
      description: 'Record messages'
    },
    {
      id: 'calendar',
      label: 'Calendar',
      path: '/shared-calendar-planner',
      icon: 'Calendar',
      color: 'from-green-400 to-blue-400',
      description: 'Plan together'
    },
    {
      id: 'secret-box',
      label: 'Secret Box',
      path: '/secret-box-vault',
      icon: 'Lock', 
      color: 'from-yellow-400 to-orange-400',
      description: 'Private memories'
    }
  ]);

  const handleAppTap = (shortcut) => {
    // Add haptic feedback simulation
    if (navigator?.vibrate) {
      navigator.vibrate(50);
    }
    onNavigate(shortcut?.path);
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="font-heading text-lg font-bold text-foreground mb-2">
          Your Love Apps
        </h3>
        <p className="text-sm text-muted-foreground">
          Tap to open your romantic applications
        </p>
      </div>
      
      {/* Mobile Grid Layout */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {shortcuts?.map((shortcut) => (
          <button
            key={shortcut?.id}
            onClick={() => handleAppTap(shortcut)}
            className="group relative bg-white/60 backdrop-blur-sm rounded-2xl shadow-soft border border-pink-200/30 p-4 hover:shadow-medium hover:scale-105 transition-all duration-300 active:scale-95"
          >
            {/* App Icon */}
            <div className={`
              w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${shortcut?.color} 
              rounded-2xl flex items-center justify-center shadow-soft
              group-hover:shadow-medium transition-all duration-300
            `}>
              <Icon 
                name={shortcut?.icon} 
                size={24} 
                className="text-white drop-shadow-sm" 
              />
            </div>
            
            {/* App Label */}
            <div className="text-center">
              <h4 className="font-body text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                {shortcut?.label}
              </h4>
              <p className="font-caption text-xs text-muted-foreground leading-tight">
                {shortcut?.description}
              </p>
            </div>

            {/* Interaction Indicator */}
            <div className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full opacity-0 group-active:opacity-100 transition-opacity duration-200" />
          </button>
        ))}
      </div>

      {/* Quick Actions Row */}
      <div className="mt-6 bg-white/40 backdrop-blur-sm rounded-xl p-3 border border-pink-200/30">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-white/50 transition-colors duration-300">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-300 to-rose-300 rounded-lg flex items-center justify-center">
              <span className="text-sm">📝</span>
            </div>
            <span className="text-xs font-medium text-muted-foreground">Quick Note</span>
          </button>
          
          <button className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-white/50 transition-colors duration-300">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-300 to-pink-300 rounded-lg flex items-center justify-center">
              <span className="text-sm">📷</span>
            </div>
            <span className="text-xs font-medium text-muted-foreground">Capture</span>
          </button>
          
          <button className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-white/50 transition-colors duration-300">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-300 to-purple-300 rounded-lg flex items-center justify-center">
              <span className="text-sm">🎵</span>
            </div>
            <span className="text-xs font-medium text-muted-foreground">Music</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesktopShortcuts;
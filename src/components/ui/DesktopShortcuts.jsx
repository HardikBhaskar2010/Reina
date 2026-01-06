import React, { useState } from 'react';
import Icon from '../AppIcon';

const DesktopShortcuts = ({ onNavigate }) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [shortcuts, setShortcuts] = useState([
    {
      id: 'love-letters',
      label: 'Love Letters',
      path: '/love-letters-manager',
      icon: 'Heart',
      position: { x: 50, y: 100 },
      color: 'from-pink-400 to-rose-400'
    },
    {
      id: 'photo-timeline',
      label: 'Photo Timeline',
      path: '/photo-timeline-gallery',
      icon: 'Camera',
      position: { x: 200, y: 100 },
      color: 'from-purple-400 to-pink-400'
    },
    {
      id: 'voice-notes',
      label: 'Voice Notes',
      path: '/voice-notes-studio',
      icon: 'Mic',
      position: { x: 350, y: 100 },
      color: 'from-blue-400 to-purple-400'
    },
    {
      id: 'calendar',
      label: 'Calendar',
      path: '/shared-calendar-planner',
      icon: 'Calendar',
      position: { x: 50, y: 250 },
      color: 'from-green-400 to-blue-400'
    },
    {
      id: 'secret-box',
      label: 'Secret Box',
      path: '/secret-box-vault',
      icon: 'Lock',
      position: { x: 200, y: 250 },
      color: 'from-yellow-400 to-orange-400'
    }
  ]);

  const handleDoubleClick = (shortcut) => {
    onNavigate(shortcut?.path);
  };

  const handleDragStart = (e, shortcut) => {
    setDraggedItem(shortcut);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    if (!draggedItem) return;

    const rect = e?.currentTarget?.getBoundingClientRect();
    const x = e?.clientX - rect?.left - 40; // Center the icon
    const y = e?.clientY - rect?.top - 40;

    setShortcuts(prev => prev?.map(shortcut => 
      shortcut?.id === draggedItem?.id 
        ? { ...shortcut, position: { x: Math.max(0, x), y: Math.max(0, y) } }
        : shortcut
    ));
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
  };

  return (
    <div 
      className="absolute inset-0 w-full h-full"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {shortcuts?.map((shortcut) => (
        <div
          key={shortcut?.id}
          className="absolute cursor-pointer select-none group"
          style={{
            left: `${shortcut?.position?.x}px`,
            top: `${shortcut?.position?.y}px`,
          }}
          draggable
          onDragStart={(e) => handleDragStart(e, shortcut)}
          onDragEnd={handleDragEnd}
          onDoubleClick={() => handleDoubleClick(shortcut)}
        >
          <div className="flex flex-col items-center space-y-2 p-2 rounded-xl hover:bg-white/10 transition-all duration-300 group-hover:scale-105">
            {/* Icon Container */}
            <div className={`
              w-16 h-16 bg-gradient-to-br ${shortcut?.color} rounded-2xl 
              flex items-center justify-center shadow-soft
              group-hover:shadow-medium transition-all duration-300
              border border-white/20 group-hover:border-white/40
            `}>
              <Icon 
                name={shortcut?.icon} 
                size={28} 
                className="text-white drop-shadow-sm" 
              />
            </div>
            
            {/* Label */}
            <div className="text-center">
              <span className="font-body text-sm font-medium text-white drop-shadow-md px-2 py-1 rounded-lg bg-black/20 backdrop-blur-sm">
                {shortcut?.label}
              </span>
            </div>
          </div>

          {/* Drag Indicator */}
          {draggedItem?.id === shortcut?.id && (
            <div className="absolute inset-0 border-2 border-dashed border-white/50 rounded-xl pointer-events-none" />
          )}
        </div>
      ))}
      {/* Grid Helper (visible during drag) */}
      {draggedItem && (
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DesktopShortcuts;
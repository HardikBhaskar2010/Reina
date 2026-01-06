import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const DesktopWidgets = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather] = useState({
    temp: 72,
    condition: 'Sunny',
    icon: 'Sun'
  });
  const [anniversaryCountdown, setAnniversaryCountdown] = useState({
    days: 15,
    hours: 8,
    minutes: 42
  });
  const [musicPlayer, setMusicPlayer] = useState({
    isPlaying: false,
    currentSong: 'Our Song',
    artist: 'Love Playlist',
    progress: 45
  });
  const [moodTracker, setMoodTracker] = useState({
    currentMood: 'happy',
    partnerMood: 'excited'
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Update countdown (simplified)
      setAnniversaryCountdown(prev => ({
        ...prev,
        minutes: prev?.minutes > 0 ? prev?.minutes - 1 : 59
      }));
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const toggleMusic = () => {
    setMusicPlayer(prev => ({ ...prev, isPlaying: !prev?.isPlaying }));
  };

  const moodEmojis = {
    happy: '😊',
    excited: '🥰',
    calm: '😌',
    romantic: '💕',
    playful: '😄'
  };

  const widgets = [
    {
      id: 'clock',
      title: 'Love Time',
      position: { x: 50, y: 50 },
      size: 'medium',
      content: (
        <div className="text-center">
          <div className="font-mono text-2xl font-bold text-foreground mb-1">
            {currentTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="font-caption text-sm text-muted-foreground">
            {currentTime?.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
          </div>
        </div>
      )
    },
    {
      id: 'weather',
      title: 'Weather',
      position: { x: 300, y: 50 },
      size: 'small',
      content: (
        <div className="flex items-center space-x-3">
          <Icon name={weather?.icon} size={24} className="text-accent" />
          <div>
            <div className="font-body text-lg font-semibold text-foreground">{weather?.temp}°</div>
            <div className="font-caption text-xs text-muted-foreground">{weather?.condition}</div>
          </div>
        </div>
      )
    },
    {
      id: 'countdown',
      title: 'Anniversary Countdown',
      position: { x: 500, y: 50 },
      size: 'large',
      content: (
        <div className="text-center">
          <div className="flex justify-center items-center space-x-4 mb-2">
            <div className="text-center">
              <div className="font-mono text-xl font-bold text-primary">{anniversaryCountdown?.days}</div>
              <div className="font-caption text-xs text-muted-foreground">Days</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-xl font-bold text-primary">{anniversaryCountdown?.hours}</div>
              <div className="font-caption text-xs text-muted-foreground">Hours</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-xl font-bold text-primary">{anniversaryCountdown?.minutes}</div>
              <div className="font-caption text-xs text-muted-foreground">Minutes</div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <Icon name="Heart" size={16} className="text-accent animate-heart-pulse" />
            <span className="font-body text-sm text-muted-foreground">Until our special day</span>
          </div>
        </div>
      )
    },
    {
      id: 'music',
      title: 'Love Tunes',
      position: { x: 50, y: 200 },
      size: 'large',
      content: (
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1">
              <div className="font-body text-sm font-medium text-foreground truncate">{musicPlayer?.currentSong}</div>
              <div className="font-caption text-xs text-muted-foreground truncate">{musicPlayer?.artist}</div>
            </div>
            <button
              onClick={toggleMusic}
              className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors duration-300"
            >
              <Icon 
                name={musicPlayer?.isPlaying ? 'Pause' : 'Play'} 
                size={14} 
                className="text-primary-foreground" 
              />
            </button>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-1">
            <div 
              className="bg-primary h-1 rounded-full transition-all duration-300"
              style={{ width: `${musicPlayer?.progress}%` }}
            />
          </div>
        </div>
      )
    },
    {
      id: 'mood',
      title: 'Mood Sync',
      position: { x: 400, y: 200 },
      size: 'medium',
      content: (
        <div className="flex items-center justify-around">
          <div className="text-center">
            <div className="text-2xl mb-1">{moodEmojis?.[moodTracker?.currentMood]}</div>
            <div className="font-caption text-xs text-muted-foreground">You</div>
          </div>
          <div className="flex items-center">
            <Icon name="Heart" size={16} className="text-accent animate-heart-pulse" />
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">{moodEmojis?.[moodTracker?.partnerMood]}</div>
            <div className="font-caption text-xs text-muted-foreground">Partner</div>
          </div>
        </div>
      )
    }
  ];

  const getWidgetSize = (size) => {
    switch (size) {
      case 'small': return 'w-32 h-20';
      case 'medium': return 'w-48 h-24';
      case 'large': return 'w-64 h-32';
      default: return 'w-48 h-24';
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {widgets?.map((widget) => (
        <div
          key={widget?.id}
          className={`
            absolute pointer-events-auto
            ${getWidgetSize(widget?.size)}
            glass-card rounded-2xl shadow-soft border border-border/20
            p-4 hover:shadow-medium transition-all duration-300
            hover:scale-105 cursor-move
          `}
          style={{
            left: `${widget?.position?.x}px`,
            top: `${widget?.position?.y}px`,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-body text-xs font-medium text-muted-foreground">
              {widget?.title}
            </h3>
            <button className="p-1 rounded-lg hover:bg-muted/20 transition-colors duration-300">
              <Icon name="MoreHorizontal" size={12} className="text-muted-foreground" />
            </button>
          </div>
          <div className="flex-1">
            {widget?.content}
          </div>
        </div>
      ))}
      {/* Floating Hearts Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)]?.map((_, i) => (
          <div
            key={i}
            className={`absolute text-primary/20 animate-float-${['slow', 'medium', 'fast']?.[i % 3]}`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            <Icon name="Heart" size={16 + i * 2} />
          </div>
        ))}
      </div>
      {/* Sakura Petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)]?.map((_, i) => (
          <div
            key={`petal-${i}`}
            className={`absolute text-accent/10 animate-float-${['medium', 'slow', 'fast']?.[i]}`}
            style={{
              right: `${10 + i * 20}%`,
              top: `${20 + i * 15}%`,
              animationDelay: `${i * 1.2}s`
            }}
          >
            <Icon name="Flower" size={12 + i * 3} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopWidgets;
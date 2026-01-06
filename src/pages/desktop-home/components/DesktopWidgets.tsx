import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

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

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="font-heading text-lg font-bold text-foreground mb-2">
          Your Love Dashboard
        </h3>
        <p className="text-sm text-muted-foreground">
          Stay connected with what matters most
        </p>
      </div>

      {/* Mobile-First Widget Grid */}
      <div className="space-y-4">
        
        {/* Time & Weather Widget */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-soft border border-pink-200/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-mono text-2xl font-bold text-foreground mb-1">
                {currentTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="font-caption text-sm text-muted-foreground">
                {currentTime?.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name={weather?.icon} size={28} className="text-accent" />
              <div className="text-right">
                <div className="font-body text-xl font-semibold text-foreground">{weather?.temp}°</div>
                <div className="font-caption text-xs text-muted-foreground">{weather?.condition}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Anniversary Countdown Widget */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm rounded-2xl shadow-soft border border-pink-200/30 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-body text-sm font-semibold text-foreground flex items-center">
              <Icon name="Heart" size={16} className="text-accent mr-2 animate-pulse" />
              Anniversary Countdown
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="font-mono text-xl font-bold text-primary">{anniversaryCountdown?.days}</div>
              <div className="font-caption text-xs text-muted-foreground">Days</div>
            </div>
            <div>
              <div className="font-mono text-xl font-bold text-primary">{anniversaryCountdown?.hours}</div>
              <div className="font-caption text-xs text-muted-foreground">Hours</div>
            </div>
            <div>
              <div className="font-mono text-xl font-bold text-primary">{anniversaryCountdown?.minutes}</div>
              <div className="font-caption text-xs text-muted-foreground">Minutes</div>
            </div>
          </div>
          <div className="mt-3 text-center">
            <span className="font-body text-sm text-muted-foreground">Until our special day</span>
          </div>
        </div>

        {/* Music Player Widget */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-soft border border-pink-200/30 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1 min-w-0">
              <div className="font-body text-sm font-medium text-foreground truncate">{musicPlayer?.currentSong}</div>
              <div className="font-caption text-xs text-muted-foreground truncate">{musicPlayer?.artist}</div>
            </div>
            <button
              onClick={toggleMusic}
              className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors duration-300 ml-3"
            >
              <Icon 
                name={musicPlayer?.isPlaying ? 'Pause' : 'Play'} 
                size={16} 
                className="text-primary-foreground" 
              />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-muted/30 rounded-full h-1">
            <div 
              className="bg-primary h-1 rounded-full transition-all duration-300"
              style={{ width: `${musicPlayer?.progress}%` }}
            />
          </div>
        </div>

        {/* Mood Tracker Widget */}
        <div className="bg-gradient-to-r from-secondary/10 to-primary/10 backdrop-blur-sm rounded-2xl shadow-soft border border-pink-200/30 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-body text-sm font-semibold text-foreground">Mood Sync</h3>
          </div>
          
          <div className="flex items-center justify-around">
            <div className="text-center flex-1">
              <div className="text-3xl mb-2">{moodEmojis?.[moodTracker?.currentMood]}</div>
              <div className="font-caption text-xs text-muted-foreground">You</div>
            </div>
            
            <div className="flex items-center px-4">
              <Icon name="Heart" size={20} className="text-accent animate-pulse" />
            </div>
            
            <div className="text-center flex-1">
              <div className="text-3xl mb-2">{moodEmojis?.[moodTracker?.partnerMood]}</div>
              <div className="font-caption text-xs text-muted-foreground">Partner</div>
            </div>
          </div>
        </div>

        {/* Quick Love Notes */}
        <div className="bg-gradient-to-br from-yellow-50 to-pink-50 rounded-2xl shadow-soft border border-pink-200/30 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-body text-sm font-semibold text-foreground flex items-center">
              <Icon name="StickyNote" size={16} className="text-accent mr-2" />
              Love Notes
            </h3>
            <button className="text-primary text-xs font-medium">Add +</button>
          </div>
          
          <div className="space-y-2">
            <div className="bg-pink-100/50 rounded-lg p-3">
              <p className="font-body text-xs text-foreground leading-relaxed">
                "Don't forget our dinner date tonight! 💕"
              </p>
            </div>
            <div className="bg-yellow-100/50 rounded-lg p-3">
              <p className="font-body text-xs text-foreground leading-relaxed">
                "I love you more each day ❤️"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopWidgets;
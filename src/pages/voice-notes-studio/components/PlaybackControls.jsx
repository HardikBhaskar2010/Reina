import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PlaybackControls = ({ 
  isPlaying, 
  onPlay, 
  onPause, 
  onStop,
  onSeek,
  currentTime,
  duration,
  volume,
  onVolumeChange,
  playbackSpeed,
  onSpeedChange,
  isLooping,
  onToggleLoop,
  currentNote
}) => {
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  const handleSeekClick = (e) => {
    const progressBar = e?.currentTarget;
    const rect = progressBar?.getBoundingClientRect();
    const clickX = e?.clientX - rect?.left;
    const percentage = clickX / rect?.width;
    const newTime = percentage * duration;
    onSeek(newTime);
  };

  const getVolumeIcon = () => {
    if (volume === 0) return 'VolumeX';
    if (volume < 0.5) return 'Volume1';
    return 'Volume2';
  };

  return (
    <div className="glass-card rounded-2xl p-6 shadow-soft border border-border/20">
      {/* Current Track Info */}
      {currentNote && (
        <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-border/20">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
            <Icon name="Mic" size={20} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-body text-sm font-medium text-foreground truncate">
              {currentNote?.title}
            </h3>
            <p className="font-caption text-xs text-muted-foreground">
              {formatTime(duration)} • {currentNote?.date ? new Date(currentNote.date)?.toLocaleDateString() : 'Today'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {currentNote?.mood && (
              <div className="flex items-center space-x-1">
                <Icon name="Heart" size={14} className="text-accent" />
                <span className="font-caption text-xs text-muted-foreground capitalize">
                  {currentNote?.mood}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Progress Bar */}
      <div className="mb-6">
        <div 
          className="w-full h-2 bg-muted/30 rounded-full cursor-pointer relative group"
          onClick={handleSeekClick}
        >
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300"
            style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
          />
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ left: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`, marginLeft: '-8px' }}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="font-mono text-xs text-muted-foreground">
            {formatTime(currentTime)}
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {formatTime(duration)}
          </span>
        </div>
      </div>
      {/* Main Controls */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        {/* Previous/Rewind */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onSeek(Math.max(0, currentTime - 10))}
          disabled={!currentNote}
          title="Rewind 10 seconds"
        >
          <Icon name="RotateCcw" size={18} />
        </Button>

        {/* Play/Pause */}
        <button
          onClick={isPlaying ? onPause : onPlay}
          disabled={!currentNote}
          className={`
            w-14 h-14 rounded-full flex items-center justify-center
            transition-all duration-300 hover:scale-105 shadow-medium
            ${isPlaying 
              ? 'bg-accent hover:bg-accent/80' :'bg-primary hover:bg-primary/80'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          <Icon 
            name={isPlaying ? "Pause" : "Play"} 
            size={24} 
            className="text-white" 
          />
        </button>

        {/* Stop */}
        <Button
          variant="outline"
          size="icon"
          onClick={onStop}
          disabled={!currentNote}
          title="Stop playback"
        >
          <Icon name="Square" size={18} />
        </Button>

        {/* Forward */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onSeek(Math.min(duration, currentTime + 10))}
          disabled={!currentNote}
          title="Forward 10 seconds"
        >
          <Icon name="RotateCw" size={18} />
        </Button>
      </div>
      {/* Secondary Controls */}
      <div className="flex items-center justify-between">
        {/* Volume Control */}
        <div className="flex items-center space-x-2 relative">
          <button
            onClick={() => setShowVolumeSlider(!showVolumeSlider)}
            className="p-2 rounded-lg hover:bg-muted/20 transition-colors duration-300"
            title="Volume control"
          >
            <Icon name={getVolumeIcon()} size={16} className="text-muted-foreground" />
          </button>
          
          {showVolumeSlider && (
            <div className="absolute bottom-full left-0 mb-2 p-3 glass-card rounded-lg shadow-medium border border-border/20">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => onVolumeChange(parseFloat(e?.target?.value))}
                className="w-20 h-2 bg-muted/30 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Loop Toggle */}
        <button
          onClick={onToggleLoop}
          className={`
            p-2 rounded-lg transition-colors duration-300
            ${isLooping 
              ? 'bg-primary/20 text-primary' :'hover:bg-muted/20 text-muted-foreground'
            }
          `}
          title="Toggle loop"
        >
          <Icon name="Repeat" size={16} />
        </button>

        {/* Speed Control */}
        <div className="relative">
          <button
            onClick={() => setShowSpeedMenu(!showSpeedMenu)}
            className="flex items-center space-x-1 p-2 rounded-lg hover:bg-muted/20 transition-colors duration-300"
            title="Playback speed"
          >
            <Icon name="Gauge" size={16} className="text-muted-foreground" />
            <span className="font-caption text-xs text-muted-foreground">
              {playbackSpeed}x
            </span>
          </button>
          
          {showSpeedMenu && (
            <div className="absolute bottom-full right-0 mb-2 p-2 glass-card rounded-lg shadow-medium border border-border/20">
              <div className="space-y-1">
                {speedOptions?.map(speed => (
                  <button
                    key={speed}
                    onClick={() => {
                      onSpeedChange(speed);
                      setShowSpeedMenu(false);
                    }}
                    className={`
                      w-full px-3 py-1 text-left rounded-lg font-caption text-xs
                      transition-colors duration-300
                      ${speed === playbackSpeed 
                        ? 'bg-primary/20 text-primary' :'hover:bg-muted/20 text-muted-foreground'
                      }
                    `}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Share */}
        <Button
          variant="outline"
          size="sm"
          disabled={!currentNote}
          iconName="Share2"
          title="Share voice note"
        >
          Share
        </Button>
      </div>
      {/* Transcription Toggle */}
      {currentNote?.hasTranscription && (
        <div className="mt-4 pt-4 border-t border-border/20">
          <Button
            variant="ghost"
            size="sm"
            iconName="FileText"
            iconPosition="left"
            className="w-full"
          >
            Show Transcription
          </Button>
        </div>
      )}
      {/* Click outside handlers */}
      {(showVolumeSlider || showSpeedMenu) && (
        <div 
          className="fixed inset-0 z-10"
          onClick={() => {
            setShowVolumeSlider(false);
            setShowSpeedMenu(false);
          }}
        />
      )}
    </div>
  );
};

export default PlaybackControls;
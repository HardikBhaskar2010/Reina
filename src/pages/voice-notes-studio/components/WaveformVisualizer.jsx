import React, { useRef, useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';

const WaveformVisualizer = ({ 
  audioData, 
  isPlaying, 
  currentTime, 
  duration, 
  onSeek,
  isRecording,
  liveAudioData 
}) => {
  const canvasRef = useRef(null);
  const [hoveredTime, setHoveredTime] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    const { width, height } = canvas;
    
    // Clear canvas
    ctx?.clearRect(0, 0, width, height);
    
    // Create gradient
    const gradient = ctx?.createLinearGradient(0, 0, 0, height);
    gradient?.addColorStop(0, 'rgba(255, 209, 232, 0.8)'); // primary
    gradient?.addColorStop(0.5, 'rgba(255, 209, 232, 0.4)');
    gradient?.addColorStop(1, 'rgba(255, 209, 232, 0.1)');

    const playedGradient = ctx?.createLinearGradient(0, 0, 0, height);
    playedGradient?.addColorStop(0, 'rgba(255, 215, 0, 0.9)'); // accent
    playedGradient?.addColorStop(0.5, 'rgba(255, 215, 0, 0.6)');
    playedGradient?.addColorStop(1, 'rgba(255, 215, 0, 0.2)');

    if (isRecording && liveAudioData) {
      // Draw live recording waveform
      drawLiveWaveform(ctx, liveAudioData, width, height, gradient);
    } else if (audioData && audioData?.length > 0) {
      // Draw static waveform
      drawStaticWaveform(ctx, audioData, width, height, gradient, playedGradient, currentTime, duration);
    } else {
      // Draw placeholder waveform
      drawPlaceholderWaveform(ctx, width, height, gradient);
    }

    // Draw bookmarks
    drawBookmarks(ctx, bookmarks, width, height, duration);
    
    // Draw progress indicator
    if (duration > 0) {
      drawProgressIndicator(ctx, currentTime, duration, width, height);
    }

  }, [audioData, isPlaying, currentTime, duration, isRecording, liveAudioData, bookmarks]);

  const drawLiveWaveform = (ctx, data, width, height, gradient) => {
    const barWidth = width / data?.length;
    const centerY = height / 2;

    ctx.fillStyle = gradient;
    
    for (let i = 0; i < data?.length; i++) {
      const barHeight = (data?.[i] * height * 0.8);
      const x = i * barWidth;
      
      // Draw bar from center
      ctx?.fillRect(x, centerY - barHeight / 2, barWidth - 1, barHeight);
    }
  };

  const drawStaticWaveform = (ctx, data, width, height, gradient, playedGradient, currentTime, duration) => {
    const barWidth = width / data?.length;
    const centerY = height / 2;
    const playedWidth = (currentTime / duration) * width;

    for (let i = 0; i < data?.length; i++) {
      const barHeight = Math.max(2, data?.[i] * height * 0.8);
      const x = i * barWidth;
      
      // Choose gradient based on playback position
      ctx.fillStyle = x < playedWidth ? playedGradient : gradient;
      
      // Draw bar from center
      ctx?.fillRect(x, centerY - barHeight / 2, barWidth - 1, barHeight);
    }
  };

  const drawPlaceholderWaveform = (ctx, width, height, gradient) => {
    const bars = 100;
    const barWidth = width / bars;
    const centerY = height / 2;

    ctx.fillStyle = gradient;
    
    for (let i = 0; i < bars; i++) {
      const barHeight = Math.random() * height * 0.3 + 10;
      const x = i * barWidth;
      
      ctx?.fillRect(x, centerY - barHeight / 2, barWidth - 1, barHeight);
    }
  };

  const drawBookmarks = (ctx, bookmarks, width, height, duration) => {
    if (duration === 0) return;
    
    bookmarks?.forEach(bookmark => {
      const x = (bookmark?.time / duration) * width;
      
      // Draw bookmark line
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.8)';
      ctx.lineWidth = 2;
      ctx?.beginPath();
      ctx?.moveTo(x, 0);
      ctx?.lineTo(x, height);
      ctx?.stroke();
      
      // Draw bookmark icon
      ctx.fillStyle = 'rgba(255, 215, 0, 1)';
      ctx?.beginPath();
      ctx?.arc(x, 10, 4, 0, 2 * Math.PI);
      ctx?.fill();
    });
  };

  const drawProgressIndicator = (ctx, currentTime, duration, width, height) => {
    const x = (currentTime / duration) * width;
    
    // Draw progress line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 2;
    ctx?.beginPath();
    ctx?.moveTo(x, 0);
    ctx?.lineTo(x, height);
    ctx?.stroke();
    
    // Draw progress dot
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx?.beginPath();
    ctx?.arc(x, height / 2, 6, 0, 2 * Math.PI);
    ctx?.fill();
    
    // Add glow effect
    ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
    ctx.shadowBlur = 10;
    ctx?.beginPath();
    ctx?.arc(x, height / 2, 4, 0, 2 * Math.PI);
    ctx?.fill();
    ctx.shadowBlur = 0;
  };

  const handleCanvasClick = (e) => {
    if (!duration || isRecording) return;
    
    const canvas = canvasRef?.current;
    const rect = canvas?.getBoundingClientRect();
    const x = e?.clientX - rect?.left;
    const clickTime = (x / canvas?.width) * duration;
    
    onSeek(clickTime);
  };

  const handleCanvasMouseMove = (e) => {
    if (!duration) return;
    
    const canvas = canvasRef?.current;
    const rect = canvas?.getBoundingClientRect();
    const x = e?.clientX - rect?.left;
    const hoverTime = (x / canvas?.width) * duration;
    
    setHoveredTime(hoverTime);
  };

  const handleCanvasMouseLeave = () => {
    setHoveredTime(null);
  };

  const addBookmark = () => {
    if (!duration || currentTime === 0) return;
    
    const newBookmark = {
      id: Date.now(),
      time: currentTime,
      label: `Bookmark ${bookmarks?.length + 1}`
    };
    
    setBookmarks(prev => [...prev, newBookmark]?.sort((a, b) => a?.time - b?.time));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="glass-card rounded-2xl p-6 shadow-soft border border-border/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-lg font-semibold text-foreground">
          {isRecording ? 'Recording Waveform' : 'Audio Waveform'}
        </h3>
        
        {!isRecording && duration > 0 && (
          <button
            onClick={addBookmark}
            className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors duration-300"
            title="Add bookmark at current position"
          >
            <Icon name="Bookmark" size={14} className="text-accent" />
            <span className="font-caption text-xs text-accent-foreground">Bookmark</span>
          </button>
        )}
      </div>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={800}
          height={120}
          className="w-full h-30 cursor-pointer rounded-lg"
          onClick={handleCanvasClick}
          onMouseMove={handleCanvasMouseMove}
          onMouseLeave={handleCanvasMouseLeave}
          style={{ maxHeight: '120px' }}
        />
        
        {/* Hover Time Indicator */}
        {hoveredTime !== null && (
          <div 
            className="absolute top-0 bg-black/80 text-white px-2 py-1 rounded text-xs pointer-events-none transform -translate-x-1/2"
            style={{ left: `${(hoveredTime / duration) * 100}%` }}
          >
            {formatTime(hoveredTime)}
          </div>
        )}
      </div>
      {/* Time Display */}
      <div className="flex items-center justify-between mt-4 text-sm">
        <span className="font-mono text-muted-foreground">
          {formatTime(currentTime)}
        </span>
        
        {isRecording && (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-error rounded-full animate-pulse" />
            <span className="font-caption text-xs text-error">Live Recording</span>
          </div>
        )}
        
        <span className="font-mono text-muted-foreground">
          {formatTime(duration)}
        </span>
      </div>
      {/* Bookmarks List */}
      {bookmarks?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border/20">
          <h4 className="font-body text-sm font-medium text-foreground mb-2">Bookmarks</h4>
          <div className="flex flex-wrap gap-2">
            {bookmarks?.map(bookmark => (
              <button
                key={bookmark?.id}
                onClick={() => onSeek(bookmark?.time)}
                className="flex items-center space-x-1 px-2 py-1 bg-accent/10 hover:bg-accent/20 rounded-lg transition-colors duration-300"
              >
                <Icon name="Bookmark" size={12} className="text-accent" />
                <span className="font-caption text-xs text-accent-foreground">
                  {formatTime(bookmark?.time)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WaveformVisualizer;
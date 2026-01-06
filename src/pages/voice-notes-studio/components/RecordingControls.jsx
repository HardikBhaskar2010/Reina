import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecordingControls = ({ 
  isRecording, 
  onStartRecording, 
  onStopRecording, 
  onPauseRecording,
  isPaused,
  recordingTime,
  audioLevel 
}) => {
  const [permission, setPermission] = useState('prompt');
  const animationRef = useRef();

  useEffect(() => {
    // Check microphone permission
    navigator.permissions?.query({ name: 'microphone' })?.then(result => setPermission(result?.state))?.catch(() => setPermission('granted')); // Fallback for unsupported browsers
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getRecordButtonClass = () => {
    if (isRecording && !isPaused) {
      return 'bg-error hover:bg-error/80 animate-pulse';
    }
    if (isPaused) {
      return 'bg-warning hover:bg-warning/80';
    }
    return 'bg-primary hover:bg-primary/80';
  };

  const getRecordIcon = () => {
    if (isRecording && !isPaused) return 'Square';
    if (isPaused) return 'Play';
    return 'Mic';
  };

  return (
    <div className="glass-card rounded-2xl p-6 shadow-soft border border-border/20">
      <div className="flex flex-col items-center space-y-6">
        {/* Permission Status */}
        {permission === 'denied' && (
          <div className="w-full p-3 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <span className="font-body text-sm text-error">
                Microphone access denied. Please enable in browser settings.
              </span>
            </div>
          </div>
        )}

        {/* Audio Level Meter */}
        {isRecording && !isPaused && (
          <div className="w-full max-w-xs">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Volume2" size={16} className="text-muted-foreground" />
              <span className="font-caption text-xs text-muted-foreground">Audio Level</span>
            </div>
            <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-success to-warning transition-all duration-100"
                style={{ width: `${Math.min(audioLevel * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Recording Timer */}
        {(isRecording || isPaused) && (
          <div className="text-center">
            <div className="font-mono text-2xl font-bold text-foreground mb-1">
              {formatTime(recordingTime)}
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isRecording && !isPaused ? 'bg-error animate-pulse' : 'bg-muted-foreground'}`} />
              <span className="font-caption text-xs text-muted-foreground">
                {isPaused ? 'Paused' : isRecording ? 'Recording' : 'Ready'}
              </span>
            </div>
          </div>
        )}

        {/* Main Record Button */}
        <div className="relative">
          <button
            onClick={isRecording ? (isPaused ? onStartRecording : onStopRecording) : onStartRecording}
            disabled={permission === 'denied'}
            className={`
              w-20 h-20 rounded-full flex items-center justify-center
              transition-all duration-300 hover:scale-105 shadow-medium
              disabled:opacity-50 disabled:cursor-not-allowed
              ${getRecordButtonClass()}
            `}
          >
            <Icon 
              name={getRecordIcon()} 
              size={32} 
              className="text-white" 
            />
          </button>
          
          {/* Pulse Ring Animation */}
          {isRecording && !isPaused && (
            <div className="absolute inset-0 rounded-full border-4 border-error/30 animate-ping" />
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex items-center space-x-4">
          {isRecording && (
            <Button
              variant="outline"
              size="sm"
              onClick={onPauseRecording}
              iconName={isPaused ? "Play" : "Pause"}
              iconPosition="left"
            >
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
          )}
          
          {(isRecording || isPaused) && (
            <Button
              variant="destructive"
              size="sm"
              onClick={onStopRecording}
              iconName="Square"
              iconPosition="left"
            >
              Stop
            </Button>
          )}
        </div>

        {/* Recording Tips */}
        {!isRecording && !isPaused && (
          <div className="text-center max-w-sm">
            <p className="font-body text-sm text-muted-foreground mb-2">
              Ready to record your voice note
            </p>
            <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Mic" size={12} />
                <span>Clear audio</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Heart" size={12} />
                <span>Speak from heart</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordingControls;
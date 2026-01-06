import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TranscriptionOverlay = ({ 
  transcription, 
  currentTime, 
  duration,
  isVisible,
  onToggleVisibility,
  onEditTranscription,
  isEditable = true
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(transcription || '');
  const [highlightedWord, setHighlightedWord] = useState(null);
  const [fontSize, setFontSize] = useState('text-sm');
  const scrollRef = useRef(null);

  // Mock word-level timestamps for demonstration
  const words = transcription ? transcription?.split(' ')?.map((word, index) => ({
    word,
    startTime: (duration / transcription?.split(' ')?.length) * index,
    endTime: (duration / transcription?.split(' ')?.length) * (index + 1)
  })) : [];

  useEffect(() => {
    // Find current word based on playback time
    const currentWord = words?.find(w => 
      currentTime >= w?.startTime && currentTime < w?.endTime
    );
    
    if (currentWord) {
      setHighlightedWord(words?.indexOf(currentWord));
      
      // Auto-scroll to current word
      if (scrollRef?.current) {
        const wordElement = scrollRef?.current?.querySelector(`[data-word-index="${words?.indexOf(currentWord)}"]`);
        if (wordElement) {
          wordElement?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          });
        }
      }
    }
  }, [currentTime, words]);

  const handleSaveEdit = () => {
    onEditTranscription(editedText);
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    setEditedText(transcription || '');
    setEditMode(false);
  };

  const handleWordClick = (wordIndex) => {
    if (words?.[wordIndex]) {
      // Seek to word timestamp
      const wordTime = words?.[wordIndex]?.startTime;
      // This would trigger seek in parent component
      console.log('Seek to:', wordTime);
    }
  };

  const fontSizeOptions = [
    { value: 'text-xs', label: 'Small' },
    { value: 'text-sm', label: 'Medium' },
    { value: 'text-base', label: 'Large' },
    { value: 'text-lg', label: 'Extra Large' }
  ];

  if (!isVisible) {
    return (
      <button
        onClick={onToggleVisibility}
        className="fixed bottom-20 right-6 z-40 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-floating hover:shadow-strong transition-all duration-300 hover:scale-110"
        title="Show transcription"
      >
        <Icon name="FileText" size={20} className="text-white" />
      </button>
    );
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-40 max-w-4xl mx-auto">
      <div className="glass-card rounded-2xl shadow-floating border border-border/30 max-h-80 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/20">
          <div className="flex items-center space-x-3">
            <Icon name="FileText" size={20} className="text-primary" />
            <h3 className="font-body text-sm font-medium text-foreground">
              Live Transcription
            </h3>
            {transcription && (
              <span className="font-caption text-xs text-muted-foreground">
                {transcription?.split(' ')?.length} words
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Font Size Control */}
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e?.target?.value)}
              className="px-2 py-1 bg-input border border-border/30 rounded-lg font-caption text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {fontSizeOptions?.map(option => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>

            {/* Edit Button */}
            {isEditable && !editMode && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditMode(true)}
                iconName="Edit3"
                title="Edit transcription"
              />
            )}

            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleVisibility}
              iconName="X"
              title="Hide transcription"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {!transcription ? (
            <div className="flex flex-col items-center justify-center h-32 text-center p-6">
              <Icon name="Mic" size={32} className="text-muted-foreground mb-2" />
              <p className="font-body text-sm text-muted-foreground">
                No transcription available
              </p>
              <p className="font-caption text-xs text-muted-foreground mt-1">
                Transcription will appear here during playback
              </p>
            </div>
          ) : editMode ? (
            <div className="p-4">
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e?.target?.value)}
                className="w-full h-32 p-3 bg-input border border-border/30 rounded-lg font-body text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                placeholder="Edit transcription..."
              />
              <div className="flex items-center justify-end space-x-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveEdit}
                >
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div 
              ref={scrollRef}
              className="p-4 overflow-y-auto max-h-48"
            >
              <div className={`${fontSize} leading-relaxed`}>
                {words?.map((wordObj, index) => (
                  <span
                    key={index}
                    data-word-index={index}
                    onClick={() => handleWordClick(index)}
                    className={`
                      inline-block mr-1 mb-1 px-1 py-0.5 rounded cursor-pointer
                      transition-all duration-300
                      ${index === highlightedWord
                        ? 'bg-accent text-accent-foreground shadow-gentle'
                        : 'hover:bg-primary/10 text-foreground'
                      }
                    `}
                    title={`Click to seek to ${Math.floor(wordObj?.startTime)}s`}
                  >
                    {wordObj?.word}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {transcription && !editMode && (
          <div className="flex items-center justify-between p-4 border-t border-border/20 bg-muted/5">
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span>Click words to jump to timestamp</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span>Currently playing</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                title="Export transcription"
              >
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Copy"
                title="Copy to clipboard"
                onClick={() => {
                  navigator.clipboard?.writeText(transcription);
                }}
              >
                Copy
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscriptionOverlay;
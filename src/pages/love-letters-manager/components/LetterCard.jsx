import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LetterCard = ({ 
  letter, 
  viewMode, 
  isSelected, 
  onSelect, 
  onOpen, 
  onPreview 
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getLetterTypeIcon = (type) => {
    switch (type) {
      case 'handwritten': return 'PenTool';
      case 'audio': return 'Mic';
      case 'scanned': return 'Scan';
      case 'template': return 'FileText';
      default: return 'Heart';
    }
  };

  const getLetterTypeColor = (type) => {
    switch (type) {
      case 'handwritten': return 'text-accent';
      case 'audio': return 'text-success';
      case 'scanned': return 'text-warning';
      case 'template': return 'text-secondary';
      default: return 'text-primary';
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleMouseEnter = () => {
    setShowPreview(true);
    onPreview && onPreview(letter);
  };

  const handleMouseLeave = () => {
    setShowPreview(false);
  };

  const handleDoubleClick = () => {
    onOpen(letter);
  };

  // open on single click as well (checkbox click stops propagation)
  const handleClick = (e) => {
    // ignore clicks from the selection checkbox/button (they already stopPropagation)
    onOpen && onOpen(letter);
  };
  
  const handleSelectClick = (e) => {
    e?.stopPropagation();
    onSelect(letter?.id);
  };

  if (viewMode === 'list') {
    return (
      <div
        className={`
          group relative flex items-center p-4 rounded-xl border transition-all duration-300
          cursor-pointer hover:scale-[1.02] hover:shadow-gentle
          ${isSelected 
            ? 'bg-primary/10 border-primary/30 shadow-gentle' 
            : 'bg-card/50 border-border/20 hover:border-primary/20'
          }
        `}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Selection Checkbox */}
        <div className="flex-shrink-0 mr-4">
          <button
            onClick={handleSelectClick}
            className={`
              w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300
              ${isSelected 
                ? 'bg-primary border-primary' :'border-border hover:border-primary/50'
              }
            `}
          >
            {isSelected && <Icon name="Check" size={12} className="text-white" />}
          </button>
        </div>
        {/* Letter Preview */}
        <div className="flex-shrink-0 mr-4">
          <div className="relative w-12 h-16 rounded-lg overflow-hidden shadow-soft">
            {!imageError && letter?.preview ? (
              <Image
                src={letter?.preview}
                alt={`Preview of ${letter?.title}`}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Icon 
                  name={getLetterTypeIcon(letter?.type)} 
                  size={16} 
                  className={getLetterTypeColor(letter?.type)} 
                />
              </div>
            )}
            
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
            
            {/* Ribbon Corner */}
            <div className="absolute top-0 right-0 w-3 h-3 bg-accent transform rotate-45 translate-x-1 -translate-y-1" />
          </div>
        </div>
        {/* Letter Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-body text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-300">
                {letter?.title}
              </h3>
              <p className="font-caption text-xs text-muted-foreground mt-1">
                From {letter?.sender} • {formatDate(letter?.date)}
              </p>
              {letter?.excerpt && (
                <p className="font-body text-xs text-muted-foreground mt-2 line-clamp-2">
                  {letter?.excerpt}
                </p>
              )}
            </div>
            
            {/* Tags and Actions */}
            <div className="flex items-center space-x-2 ml-4">
              {letter?.hasVoiceNote && (
                <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center">
                  <Icon name="Mic" size={12} className="text-success" />
                </div>
              )}
              {letter?.isSecret && (
                <div className="w-6 h-6 bg-error/20 rounded-full flex items-center justify-center">
                  <Icon name="Lock" size={12} className="text-error" />
                </div>
              )}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="p-1 rounded-lg hover:bg-muted/20 transition-colors duration-300">
                  <Icon name="MoreHorizontal" size={14} className="text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Preview Bubble */}
        {showPreview && letter?.excerpt && (
          <div className="absolute left-full top-0 ml-4 w-64 glass-card rounded-xl shadow-floating border border-border/30 p-4 z-50 pointer-events-none">
            <div className="absolute left-0 top-4 w-0 h-0 border-t-4 border-b-4 border-r-8 border-transparent border-r-card -translate-x-2" />
            <h4 className="font-body text-sm font-semibold text-foreground mb-2">{letter?.title}</h4>
            <p className="font-body text-xs text-muted-foreground line-clamp-4">{letter?.excerpt}</p>
          </div>
        )}
      </div>
    );
  }

  // Grid View
  return (
    <div
      className={`
        group relative rounded-xl border transition-all duration-300 overflow-hidden
        cursor-pointer hover:scale-105 hover:shadow-medium
        ${isSelected 
          ? 'bg-primary/10 border-primary/30 shadow-gentle' 
          : 'bg-card/50 border-border/20 hover:border-primary/20'
        }
      `}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-3 left-3 z-10">
        <button
          onClick={handleSelectClick}
          className={`
            w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300
            ${isSelected 
              ? 'bg-primary border-primary' :'border-white/50 hover:border-primary/50 bg-black/20 backdrop-blur-sm'
            }
          `}
        >
          {isSelected && <Icon name="Check" size={12} className="text-white" />}
        </button>
      </div>
      {/* Letter Preview */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {!imageError && letter?.preview ? (
          <Image
            src={letter?.preview}
            alt={`Preview of ${letter?.title}`}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Icon 
              name={getLetterTypeIcon(letter?.type)} 
              size={32} 
              className={getLetterTypeColor(letter?.type)} 
            />
          </div>
        )}
        
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
        
        {/* Ribbon Corner */}
        <div className="absolute top-0 right-0 w-6 h-6 bg-accent transform rotate-45 translate-x-3 -translate-y-3" />
        
        {/* Voice Note Indicator */}
        {letter?.hasVoiceNote && (
          <div className="absolute bottom-3 left-3 w-8 h-8 bg-success/80 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Icon name="Mic" size={14} className="text-white" />
          </div>
        )}
        
        {/* Secret Indicator */}
        {letter?.isSecret && (
          <div className="absolute bottom-3 right-3 w-8 h-8 bg-error/80 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Icon name="Lock" size={14} className="text-white" />
          </div>
        )}
      </div>
      {/* Letter Info */}
      <div className="p-4">
        <h3 className="font-body text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-300">
          {letter?.title}
        </h3>
        <p className="font-caption text-xs text-muted-foreground mt-1">
          From {letter?.sender}
        </p>
        <p className="font-caption text-xs text-muted-foreground">
          {formatDate(letter?.date)}
        </p>
        {letter?.excerpt && (
          <p className="font-body text-xs text-muted-foreground mt-2 line-clamp-2">
            {letter?.excerpt}
          </p>
        )}
      </div>
      {/* Preview Bubble */}
      {showPreview && letter?.excerpt && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 glass-card rounded-xl shadow-floating border border-border/30 p-4 z-50 pointer-events-none">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-card" />
          <h4 className="font-body text-sm font-semibold text-foreground mb-2">{letter?.title}</h4>
          <p className="font-body text-xs text-muted-foreground line-clamp-4">{letter?.excerpt}</p>
        </div>
      )}
    </div>
  );
};

export default LetterCard;
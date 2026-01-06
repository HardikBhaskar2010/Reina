import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SlideshowModal = ({ isOpen, photos, currentIndex, onClose, onIndexChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState('next');
  const intervalRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const slideshowSettings = {
    interval: 3000, // 3 seconds per slide
    transitionDuration: 800 // 0.8 seconds transition
  };

  useEffect(() => {
    if (isPlaying && photos?.length > 1) {
      intervalRef.current = setInterval(() => {
        handleNext();
      }, slideshowSettings?.interval);
    } else {
      clearInterval(intervalRef?.current);
    }

    return () => clearInterval(intervalRef?.current);
  }, [isPlaying, currentIndex, photos?.length]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return;
      
      switch (e?.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case ' ':
          e?.preventDefault();
          togglePlayPause();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, currentIndex]);

  const handleNext = () => {
    if (photos?.length === 0) return;
    setTransitionDirection('next');
    const nextIndex = (currentIndex + 1) % photos?.length;
    onIndexChange(nextIndex);
  };

  const handlePrevious = () => {
    if (photos?.length === 0) return;
    setTransitionDirection('prev');
    const prevIndex = currentIndex === 0 ? photos?.length - 1 : currentIndex - 1;
    onIndexChange(prevIndex);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef?.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  if (!isOpen || photos?.length === 0) return null;

  const currentPhoto = photos?.[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-100 bg-black/95 backdrop-blur-sm"
      onMouseMove={handleMouseMove}
    >
      {/* Background Music Visualization */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        {[...Array(20)]?.map((_, i) => (
          <div
            key={i}
            className="absolute w-1 bg-gradient-to-t from-primary/20 to-accent/20 animate-pulse"
            style={{
              left: `${5 + i * 4.5}%`,
              height: `${Math.random() * 30 + 10}%`,
              bottom: '10%',
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${1 + Math.random()}s`
            }}
          />
        ))}
      </div>
      {/* Main Photo Display */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative max-w-7xl max-h-full mx-4">
          <div className="relative overflow-hidden rounded-2xl shadow-floating">
            <Image
              src={currentPhoto?.url}
              alt={currentPhoto?.caption || `Photo ${currentIndex + 1}`}
              className={`
                max-w-full max-h-[80vh] object-contain transition-all duration-800
                ${transitionDirection === 'next' ? 'animate-slide-in-right' : 'animate-slide-in-left'}
              `}
            />
            
            {/* Photo Overlay Info */}
            <div className={`
              absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6
              transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}
            `}>
              {currentPhoto?.caption && (
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  {currentPhoto?.caption}
                </h3>
              )}
              <div className="flex items-center justify-between text-white/80">
                <div className="flex items-center space-x-4">
                  <span className="font-body text-sm">
                    {new Date(currentPhoto.date)?.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  {currentPhoto?.location && (
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={14} />
                      <span className="font-body text-sm">{currentPhoto?.location}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {currentPhoto?.tags?.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-white/20 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          className={`
            absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 
            rounded-full flex items-center justify-center transition-all duration-300
            ${showControls ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <Icon name="ChevronLeft" size={24} className="text-white" />
        </button>
        
        <button
          onClick={handleNext}
          className={`
            absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 
            rounded-full flex items-center justify-center transition-all duration-300
            ${showControls ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <Icon name="ChevronRight" size={24} className="text-white" />
        </button>
      </div>
      {/* Top Controls */}
      <div className={`
        absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/50 to-transparent
        transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}
      `}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="font-heading text-xl font-bold text-white">
              Memory Slideshow
            </h2>
            <span className="font-body text-white/80">
              {currentIndex + 1} of {photos?.length}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Music Controls */}
            <div className="flex items-center space-x-2 bg-black/30 rounded-lg px-3 py-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-white/80 hover:text-white transition-colors duration-300"
              >
                <Icon name={isMuted ? 'VolumeX' : 'Volume2'} size={16} />
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseInt(e?.target?.value))}
                className="w-16 h-1 bg-white/20 rounded-lg appearance-none slider"
              />
            </div>
            
            <button
              onClick={onClose}
              className="w-10 h-10 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all duration-300"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>
      </div>
      {/* Bottom Controls */}
      <div className={`
        absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent
        transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}
      `}>
        <div className="flex items-center justify-center space-x-6">
          {/* Playback Controls */}
          <button
            onClick={handlePrevious}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300"
          >
            <Icon name="SkipBack" size={16} />
          </button>
          
          <button
            onClick={togglePlayPause}
            className="w-14 h-14 bg-gradient-to-br from-primary to-accent hover:from-primary/80 hover:to-accent/80 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-soft"
          >
            <Icon name={isPlaying ? 'Pause' : 'Play'} size={20} />
          </button>
          
          <button
            onClick={handleNext}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300"
          >
            <Icon name="SkipForward" size={16} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-white/60 text-sm mb-2">
            <span>Auto-advance: {isPlaying ? 'On' : 'Off'}</span>
            <span>{formatTime(Math.floor(currentIndex * slideshowSettings?.interval / 1000))} / {formatTime(Math.floor(photos?.length * slideshowSettings?.interval / 1000))}</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-1">
            <div 
              className="bg-gradient-to-r from-primary to-accent h-1 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / photos?.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="mt-4 flex justify-center">
          <div className="flex space-x-2 max-w-md overflow-x-auto scrollbar-hide">
            {photos?.slice(Math.max(0, currentIndex - 5), currentIndex + 6)?.map((photo, index) => {
              const actualIndex = Math.max(0, currentIndex - 5) + index;
              return (
                <button
                  key={photo?.id}
                  onClick={() => onIndexChange(actualIndex)}
                  className={`
                    flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300
                    ${actualIndex === currentIndex 
                      ? 'border-primary shadow-soft scale-110' 
                      : 'border-white/30 hover:border-white/50'
                    }
                  `}
                >
                  <Image
                    src={photo?.url}
                    alt={`Thumbnail ${actualIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideshowModal;
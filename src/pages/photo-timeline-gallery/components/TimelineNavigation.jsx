import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const TimelineNavigation = ({ dates, selectedDate, onDateSelect, photos }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const timelineRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e?.pageX - timelineRef?.current?.offsetLeft);
    setScrollLeft(timelineRef?.current?.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e?.preventDefault();
    const x = e?.pageX - timelineRef?.current?.offsetLeft;
    const walk = (x - startX) * 2;
    timelineRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getPhotoCountForDate = (date) => {
    return photos?.filter(photo => photo?.date === date)?.length;
  };

  const formatDateDisplay = (dateStr) => {
    const date = new Date(dateStr);
    return {
      month: date?.toLocaleDateString('en-US', { month: 'short' }),
      day: date?.getDate(),
      year: date?.getFullYear()
    };
  };

  useEffect(() => {
    const timeline = timelineRef?.current;
    if (timeline) {
      timeline?.addEventListener('mousemove', handleMouseMove);
      timeline?.addEventListener('mouseup', handleMouseUp);
      timeline?.addEventListener('mouseleave', handleMouseUp);

      return () => {
        timeline?.removeEventListener('mousemove', handleMouseMove);
        timeline?.removeEventListener('mouseup', handleMouseUp);
        timeline?.removeEventListener('mouseleave', handleMouseUp);
      };
    }
  }, [isDragging, startX, scrollLeft]);

  return (
    <div className="relative mb-8">
      {/* Timeline Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-2xl font-bold text-foreground flex items-center space-x-2">
          <Icon name="Calendar" size={24} className="text-primary" />
          <span>Memory Timeline</span>
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => timelineRef?.current?.scrollBy({ left: -200, behavior: 'smooth' })}
            className="p-2 rounded-lg bg-card/50 hover:bg-primary/10 border border-border/20 transition-all duration-300"
          >
            <Icon name="ChevronLeft" size={16} className="text-muted-foreground" />
          </button>
          <button
            onClick={() => timelineRef?.current?.scrollBy({ left: 200, behavior: 'smooth' })}
            className="p-2 rounded-lg bg-card/50 hover:bg-primary/10 border border-border/20 transition-all duration-300"
          >
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
      {/* Timeline Container */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/30 via-accent/50 to-primary/30 transform -translate-y-1/2 z-10" />
        
        {/* Timeline Dates */}
        <div
          ref={timelineRef}
          className={`flex space-x-6 overflow-x-auto scrollbar-hide py-4 px-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={handleMouseDown}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {dates?.map((date, index) => {
            const dateInfo = formatDateDisplay(date);
            const photoCount = getPhotoCountForDate(date);
            const isSelected = selectedDate === date;
            
            return (
              <div
                key={date}
                className="flex-shrink-0 relative"
                onClick={() => onDateSelect(date)}
              >
                {/* Date Token */}
                <div className={`
                  relative w-16 h-16 rounded-full border-4 cursor-pointer transition-all duration-300 z-20
                  ${isSelected 
                    ? 'bg-gradient-to-br from-primary to-accent border-white shadow-soft scale-110' 
                    : 'bg-card border-border/30 hover:border-primary/50 hover:scale-105'
                  }
                  ${photoCount > 0 ? 'shadow-gentle' : ''}
                `}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`font-mono text-xs font-bold ${isSelected ? 'text-white' : 'text-foreground'}`}>
                      {dateInfo?.month}
                    </span>
                    <span className={`font-mono text-lg font-bold leading-none ${isSelected ? 'text-white' : 'text-foreground'}`}>
                      {dateInfo?.day}
                    </span>
                  </div>
                  
                  {/* Photo Count Badge */}
                  {photoCount > 0 && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center border-2 border-white shadow-soft">
                      <span className="text-xs font-bold text-accent-foreground">
                        {photoCount > 99 ? '99+' : photoCount}
                      </span>
                    </div>
                  )}
                  
                  {/* Glow Effect for Selected */}
                  {isSelected && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 animate-pulse" />
                  )}
                </div>
                {/* Year Label */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span className="font-caption text-xs text-muted-foreground">
                    {dateInfo?.year}
                  </span>
                </div>
                {/* Connection Line to Timeline */}
                <div className={`
                  absolute top-1/2 left-1/2 w-0.5 h-4 transform -translate-x-1/2 -translate-y-1/2 z-10
                  ${isSelected ? 'bg-primary' : 'bg-border/50'}
                `} />
              </div>
            );
          })}
        </div>

        {/* Timeline Gradient Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none z-30" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-30" />
      </div>
      {/* Quick Jump Buttons */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => onDateSelect(dates?.[0])}
          className="px-3 py-1 rounded-full bg-muted/20 hover:bg-primary/10 text-xs font-medium text-muted-foreground hover:text-primary transition-all duration-300"
        >
          First
        </button>
        <button
          onClick={() => onDateSelect(dates?.[Math.floor(dates?.length / 2)])}
          className="px-3 py-1 rounded-full bg-muted/20 hover:bg-primary/10 text-xs font-medium text-muted-foreground hover:text-primary transition-all duration-300"
        >
          Middle
        </button>
        <button
          onClick={() => onDateSelect(dates?.[dates?.length - 1])}
          className="px-3 py-1 rounded-full bg-muted/20 hover:bg-primary/10 text-xs font-medium text-muted-foreground hover:text-primary transition-all duration-300"
        >
          Latest
        </button>
      </div>
    </div>
  );
};

export default TimelineNavigation;
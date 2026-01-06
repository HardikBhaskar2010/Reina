import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CalendarGrid = ({ currentDate, events, onDateClick, onEventClick }) => {
  const [hoveredDate, setHoveredDate] = useState(null);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)?.getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)?.getDay();
  };

  const getDaysArray = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days?.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(day);
    }

    return days;
  };

  const getEventsForDate = (day) => {
    if (!day) return [];
    const dateStr = `${currentDate?.getFullYear()}-${String(currentDate?.getMonth() + 1)?.padStart(2, '0')}-${String(day)?.padStart(2, '0')}`;
    return events?.filter(event => event?.date === dateStr);
  };

  const isToday = (day) => {
    if (!day) return false;
    const today = new Date();
    return (day === today?.getDate() &&
    currentDate?.getMonth() === today?.getMonth() && currentDate?.getFullYear() === today?.getFullYear());
  };

  const isSpecialDate = (day) => {
    const dayEvents = getEventsForDate(day);
    return dayEvents?.some(event => event?.type === 'anniversary' || event?.type === 'milestone');
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const days = getDaysArray();

  return (
    <div className="glass-card rounded-2xl p-6 shadow-soft border border-border/20">
      {/* Calendar Header */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays?.map((day) => (
          <div key={day} className="text-center py-2">
            <span className="font-body text-sm font-medium text-muted-foreground">
              {day}
            </span>
          </div>
        ))}
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days?.map((day, index) => {
          const dayEvents = getEventsForDate(day);
          const hasEvents = dayEvents?.length > 0;
          const isSpecial = isSpecialDate(day);
          const isTodayDate = isToday(day);

          return (
            <div
              key={index}
              className={`
                relative aspect-square flex flex-col items-center justify-center rounded-xl
                transition-all duration-300 cursor-pointer group
                ${day ? 'hover:bg-primary/10 hover:scale-105' : ''}
                ${isTodayDate ? 'bg-primary/20 border-2 border-primary/50' : ''}
                ${isSpecial ? 'bg-gradient-to-br from-accent/20 to-primary/20' : ''}
                ${hoveredDate === `${day}-${index}` ? 'shadow-gentle' : ''}
              `}
              onClick={() => day && onDateClick(day)}
              onMouseEnter={() => setHoveredDate(`${day}-${index}`)}
              onMouseLeave={() => setHoveredDate(null)}
            >
              {day && (
                <>
                  {/* Date Number */}
                  <span className={`
                    font-body text-sm font-medium mb-1
                    ${isTodayDate ? 'text-primary font-bold' : 'text-foreground'}
                    ${isSpecial ? 'text-accent font-bold' : ''}
                  `}>
                    {day}
                  </span>

                  {/* Event Indicators */}
                  {hasEvents && (
                    <div className="flex items-center space-x-1">
                      {dayEvents?.slice(0, 3)?.map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className={`
                            w-2 h-2 rounded-full
                            ${event?.type === 'anniversary' ? 'bg-accent animate-pulse' : ''}
                            ${event?.type === 'milestone' ? 'bg-success' : ''}
                            ${event?.type === 'date' ? 'bg-primary' : ''}
                            ${event?.type === 'reminder' ? 'bg-warning' : ''}
                          `}
                          title={event?.title}
                        />
                      ))}
                      {dayEvents?.length > 3 && (
                        <span className="text-xs text-muted-foreground">+{dayEvents?.length - 3}</span>
                      )}
                    </div>
                  )}

                  {/* Special Date Icons */}
                  {isSpecial && (
                    <div className="absolute -top-1 -right-1">
                      <Icon 
                        name="Heart" 
                        size={12} 
                        className="text-accent animate-heart-pulse" 
                      />
                    </div>
                  )}

                  {/* Hover Preview */}
                  {hoveredDate === `${day}-${index}` && hasEvents && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-20 w-48 glass-card rounded-lg p-3 shadow-medium border border-border/30">
                      <div className="space-y-2">
                        {dayEvents?.slice(0, 2)?.map((event, eventIndex) => (
                          <div key={eventIndex} className="flex items-center space-x-2">
                            <Icon 
                              name={
                                event?.type === 'anniversary' ? 'Heart' :
                                event?.type === 'milestone' ? 'Star' :
                                event?.type === 'date' ? 'Calendar' : 'Bell'
                              } 
                              size={12} 
                              className="text-primary flex-shrink-0" 
                            />
                            <span className="font-body text-xs text-foreground truncate">
                              {event?.title}
                            </span>
                          </div>
                        ))}
                        {dayEvents?.length > 2 && (
                          <p className="font-caption text-xs text-muted-foreground text-center">
                            +{dayEvents?.length - 2} more events
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
      {/* Quick Add Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => onDateClick(new Date()?.getDate())}
          className="flex items-center space-x-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 rounded-xl transition-all duration-300 group"
        >
          <Icon name="Plus" size={16} className="text-primary group-hover:scale-110 transition-transform duration-300" />
          <span className="font-body text-sm font-medium text-primary">Quick Add Event</span>
        </button>
      </div>
    </div>
  );
};

export default CalendarGrid;
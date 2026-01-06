import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventSidebar = ({ events, milestones, onEventEdit, onEventDelete }) => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingEvents = events?.filter(event => new Date(event.date) >= new Date())?.sort((a, b) => new Date(a.date) - new Date(b.date))?.slice(0, 5);

  const upcomingMilestones = milestones?.filter(milestone => new Date(milestone.date) >= new Date())?.sort((a, b) => new Date(a.date) - new Date(b.date))?.slice(0, 3);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date?.getFullYear() !== new Date()?.getFullYear() ? 'numeric' : undefined
    });
  };

  const getDaysUntil = (dateStr) => {
    const today = new Date();
    const eventDate = new Date(dateStr);
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `${diffDays} days`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks`;
    return `${Math.ceil(diffDays / 30)} months`;
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'anniversary': return 'Heart';
      case 'milestone': return 'Star';
      case 'date': return 'Calendar';
      case 'reminder': return 'Bell';
      default: return 'Calendar';
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'anniversary': return 'text-accent';
      case 'milestone': return 'text-success';
      case 'date': return 'text-primary';
      case 'reminder': return 'text-warning';
      default: return 'text-primary';
    }
  };

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', icon: 'Calendar' },
    { id: 'milestones', label: 'Milestones', icon: 'Star' },
    { id: 'reminders', label: 'Reminders', icon: 'Bell' }
  ];

  return (
    <div className="w-80 glass-card rounded-2xl shadow-soft border border-border/20 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border/20 bg-gradient-to-r from-primary/5 to-accent/5">
        <h2 className="font-heading text-xl font-bold text-foreground mb-2">
          Love Calendar
        </h2>
        <p className="font-body text-sm text-muted-foreground">
          Your shared romantic timeline
        </p>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-border/20">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`
              flex-1 flex items-center justify-center space-x-2 py-3 px-2
              font-body text-sm font-medium transition-all duration-300
              ${activeTab === tab?.id 
                ? 'text-primary bg-primary/10 border-b-2 border-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/5'
              }
            `}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {activeTab === 'upcoming' && (
          <div className="space-y-4">
            {upcomingEvents?.length > 0 ? (
              upcomingEvents?.map((event) => (
                <div
                  key={event?.id}
                  className="group p-4 rounded-xl bg-card/50 hover:bg-primary/5 border border-border/20 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center
                        ${event?.type === 'anniversary' ? 'bg-accent/20' : ''}
                        ${event?.type === 'milestone' ? 'bg-success/20' : ''}
                        ${event?.type === 'date' ? 'bg-primary/20' : ''}
                        ${event?.type === 'reminder' ? 'bg-warning/20' : ''}
                      `}>
                        <Icon 
                          name={getEventIcon(event?.type)} 
                          size={16} 
                          className={getEventColor(event?.type)} 
                        />
                      </div>
                      <div>
                        <h3 className="font-body text-sm font-semibold text-foreground">
                          {event?.title}
                        </h3>
                        <p className="font-caption text-xs text-muted-foreground">
                          {formatDate(event?.date)} • {getDaysUntil(event?.date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => onEventEdit(event)}
                        className="p-1 rounded-lg hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300"
                      >
                        <Icon name="Edit2" size={12} />
                      </button>
                      <button
                        onClick={() => onEventDelete(event?.id)}
                        className="p-1 rounded-lg hover:bg-error/20 text-muted-foreground hover:text-error transition-all duration-300"
                      >
                        <Icon name="Trash2" size={12} />
                      </button>
                    </div>
                  </div>
                  
                  {event?.description && (
                    <p className="font-body text-xs text-muted-foreground mb-2 line-clamp-2">
                      {event?.description}
                    </p>
                  )}

                  {/* RSVP Status */}
                  {event?.rsvp && (
                    <div className="flex items-center space-x-4 mt-3">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${event?.rsvp?.partner1 ? 'bg-success' : 'bg-muted'}`} />
                        <span className="font-caption text-xs text-muted-foreground">You</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${event?.rsvp?.partner2 ? 'bg-success' : 'bg-muted'}`} />
                        <span className="font-caption text-xs text-muted-foreground">Partner</span>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Icon name="Calendar" size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="font-body text-sm text-muted-foreground">No upcoming events</p>
                <p className="font-caption text-xs text-muted-foreground mt-1">Plan something special together</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'milestones' && (
          <div className="space-y-4">
            {upcomingMilestones?.length > 0 ? (
              upcomingMilestones?.map((milestone) => (
                <div
                  key={milestone?.id}
                  className="p-4 rounded-xl bg-gradient-to-r from-success/10 to-primary/10 border border-success/20"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                      <Icon name="Star" size={16} className="text-success" />
                    </div>
                    <div>
                      <h3 className="font-body text-sm font-semibold text-foreground">
                        {milestone?.title}
                      </h3>
                      <p className="font-caption text-xs text-muted-foreground">
                        {formatDate(milestone?.date)} • {getDaysUntil(milestone?.date)}
                      </p>
                    </div>
                  </div>
                  
                  {milestone?.progress !== undefined && (
                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-caption text-xs text-muted-foreground">Progress</span>
                        <span className="font-caption text-xs font-medium text-success">{milestone?.progress}%</span>
                      </div>
                      <div className="w-full bg-muted/30 rounded-full h-2">
                        <div 
                          className="bg-success h-2 rounded-full transition-all duration-300"
                          style={{ width: `${milestone?.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Icon name="Star" size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="font-body text-sm text-muted-foreground">No upcoming milestones</p>
                <p className="font-caption text-xs text-muted-foreground mt-1">Set relationship goals together</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reminders' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name="Bell" size={16} className="text-warning" />
                <span className="font-body text-sm font-medium text-foreground">Anniversary Reminder</span>
              </div>
              <p className="font-caption text-xs text-muted-foreground">
                Your 2-year anniversary is in 15 days! Start planning something special.
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name="Heart" size={16} className="text-primary" />
                <span className="font-body text-sm font-medium text-foreground">Date Night</span>
              </div>
              <p className="font-caption text-xs text-muted-foreground">
                It's been a while since your last date night. How about this weekend?
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Quick Actions */}
      <div className="p-4 border-t border-border/20 bg-muted/5">
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            className="text-xs"
          >
            Add Event
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Star"
            iconPosition="left"
            className="text-xs"
          >
            Set Milestone
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventSidebar;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CalendarGrid from './components/CalendarGrid';
import EventSidebar from './components/EventSidebar';
import DateIdeaCards from './components/DateIdeaCards';
import EventModal from './components/EventModal';
import MilestoneTracker from './components/MilestoneTracker';

const SharedCalendarPlanner = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeView, setActiveView] = useState('calendar');
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock data for events and milestones
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Anniversary Dinner",
      description: "Celebrating our 2-year anniversary at our favorite restaurant",
      date: "2025-01-15",
      time: "19:00",
      type: "anniversary",
      location: "Romantic Bistro Downtown",
      rsvp: { partner1: true, partner2: true },
      reminder: "1day",
      priority: "high"
    },
    {
      id: 2,
      title: "Movie Night",
      description: "Cozy movie marathon with homemade popcorn",
      date: "2025-01-08",
      time: "20:00",
      type: "date",
      location: "Home",
      rsvp: { partner1: true, partner2: false },
      reminder: "1hour",
      priority: "medium"
    },
    {
      id: 3,
      title: "Weekend Getaway",
      description: "Romantic cabin retreat in the mountains",
      date: "2025-01-20",
      type: "travel",
      location: "Mountain Cabin Resort",
      rsvp: { partner1: true, partner2: true },
      reminder: "1week",
      priority: "high"
    },
    {
      id: 4,
      title: "Cooking Class",
      description: "Learn to make pasta together",
      date: "2025-01-12",
      time: "18:30",
      type: "date",
      location: "Culinary Institute",
      rsvp: { partner1: false, partner2: true },
      reminder: "1day",
      priority: "medium"
    }
  ]);

  const [milestones, setMilestones] = useState([
    {
      id: 1,
      title: "Save for Dream Vacation",
      description: "Planning our romantic getaway to Paris",
      date: "2025-12-15",
      progress: 65,
      category: "travel"
    },
    {
      id: 2,
      title: "Move in Together",
      description: "Finding our first shared home",
      date: "2025-06-01",
      progress: 40,
      category: "relationship"
    }
  ]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const views = [
    { id: 'calendar', label: 'Calendar', icon: 'Calendar' },
    { id: 'ideas', label: 'Date Ideas', icon: 'Heart' },
    { id: 'milestones', label: 'Milestones', icon: 'Star' }
  ];

  const navigateToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const navigateToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const navigateToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    setIsEventModalOpen(true);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleEventSave = (eventData) => {
    if (selectedEvent) {
      // Update existing event
      setEvents(prev => prev?.map(event => 
        event?.id === eventData?.id ? eventData : event
      ));
    } else {
      // Add new event
      setEvents(prev => [...prev, eventData]);
    }
    setSelectedEvent(null);
    setSelectedDate(null);
  };

  const handleEventEdit = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleEventDelete = (eventId) => {
    setEvents(prev => prev?.filter(event => event?.id !== eventId));
  };

  const handleSelectIdea = (idea) => {
    // Open event modal with pre-filled data from idea
    setSelectedEvent({
      title: idea?.title,
      description: idea?.description,
      type: 'date',
      location: '',
      rsvp: { partner1: false, partner2: false }
    });
    setIsEventModalOpen(true);
  };

  const handleAddToCalendar = (idea) => {
    // Quick add to calendar
    const newEvent = {
      id: Date.now(),
      title: idea?.title,
      description: idea?.description,
      date: new Date()?.toISOString()?.split('T')?.[0],
      type: 'date',
      location: '',
      rsvp: { partner1: false, partner2: false },
      reminder: '1day',
      priority: 'medium',
      createdAt: new Date()?.toISOString(),
      updatedAt: new Date()?.toISOString()
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const handleUpdateProgress = (milestoneId) => {
    console.log(`Update progress for milestone ${milestoneId}`);
  };

  const handleAddMilestone = () => {
    console.log('Add new milestone');
  };

  const closeEventModal = () => {
    setIsEventModalOpen(false);
    setSelectedEvent(null);
    setSelectedDate(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
                  Shared Calendar Planner
                </h1>
                <p className="font-body text-muted-foreground">
                  Plan romantic moments and track your journey together
                </p>
              </div>
              
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors duration-300"
              >
                <Icon name="Menu" size={20} />
              </button>
            </div>

            {/* View Navigation */}
            <div className="flex flex-wrap gap-2">
              {views?.map((view) => (
                <button
                  key={view?.id}
                  onClick={() => setActiveView(view?.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-xl font-body text-sm font-medium
                    transition-all duration-300 hover:scale-105
                    ${activeView === view?.id
                      ? 'bg-primary text-primary-foreground shadow-gentle'
                      : 'bg-card/50 text-muted-foreground hover:text-foreground hover:bg-primary/10 border border-border/20'
                    }
                  `}
                >
                  <Icon name={view?.icon} size={16} />
                  <span>{view?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Calendar View */}
          {activeView === 'calendar' && (
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Main Calendar */}
              <div className="xl:col-span-3">
                <div className="glass-card rounded-2xl p-6 shadow-soft border border-border/20 mb-6">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <h2 className="font-heading text-2xl font-bold text-foreground">
                        {monthNames?.[currentDate?.getMonth()]} {currentDate?.getFullYear()}
                      </h2>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={navigateToToday}
                      >
                        Today
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={navigateToPreviousMonth}
                      >
                        <Icon name="ChevronLeft" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={navigateToNextMonth}
                      >
                        <Icon name="ChevronRight" size={16} />
                      </Button>
                    </div>
                  </div>

                  <CalendarGrid
                    currentDate={currentDate}
                    events={events}
                    onDateClick={handleDateClick}
                    onEventClick={handleEventClick}
                  />
                </div>
              </div>

              {/* Sidebar */}
              <div className={`xl:col-span-1 ${isMobileMenuOpen ? 'block' : 'hidden xl:block'}`}>
                <EventSidebar
                  events={events}
                  milestones={milestones}
                  onEventEdit={handleEventEdit}
                  onEventDelete={handleEventDelete}
                />
              </div>
            </div>
          )}

          {/* Date Ideas View */}
          {activeView === 'ideas' && (
            <DateIdeaCards
              onSelectIdea={handleSelectIdea}
              onAddToCalendar={handleAddToCalendar}
            />
          )}

          {/* Milestones View */}
          {activeView === 'milestones' && (
            <MilestoneTracker
              milestones={milestones}
              onUpdateProgress={handleUpdateProgress}
              onAddMilestone={handleAddMilestone}
            />
          )}
        </div>

        {/* Event Modal */}
        <EventModal
          isOpen={isEventModalOpen}
          onClose={closeEventModal}
          onSave={handleEventSave}
          event={selectedEvent}
          selectedDate={selectedDate}
        />

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            variant="default"
            size="icon"
            className="w-14 h-14 rounded-full shadow-floating hover:shadow-strong transition-all duration-300 hover:scale-110"
            onClick={() => setIsEventModalOpen(true)}
          >
            <Icon name="Plus" size={24} />
          </Button>
        </div>

        {/* Background Decorations */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          {/* Floating Hearts */}
          {[...Array(8)]?.map((_, i) => (
            <div
              key={`heart-${i}`}
              className={`absolute text-primary/10 animate-float-${['slow', 'medium', 'fast']?.[i % 3]}`}
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i * 15) % 60}%`,
                animationDelay: `${i * 0.8}s`
              }}
            >
              <Icon name="Heart" size={16 + (i % 3) * 4} />
            </div>
          ))}

          {/* Sakura Petals */}
          {[...Array(5)]?.map((_, i) => (
            <div
              key={`petal-${i}`}
              className={`absolute text-accent/8 animate-float-${['medium', 'slow', 'fast']?.[i % 3]}`}
              style={{
                right: `${5 + i * 18}%`,
                top: `${15 + (i * 20) % 70}%`,
                animationDelay: `${i * 1.5}s`
              }}
            >
              <Icon name="Flower" size={12 + (i % 2) * 6} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SharedCalendarPlanner;
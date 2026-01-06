import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import TimelineNavigation from './components/TimelineNavigation';
import PhotoGrid from './components/PhotoGrid';
import SlideshowModal from './components/SlideshowModal';
import PhotoEditModal from './components/PhotoEditModal';
import FilterPanel from './components/FilterPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PageTransition from '../../components/PageTransition';

const PhotoTimelineGallery: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('2024-12-25');
  const [photos, setPhotos] = useState([]);
  const [dates, setDates] = useState([]);
  const [isSlideshowOpen, setIsSlideshowOpen] = useState(false);
  const [currentSlideshowIndex, setCurrentSlideshowIndex] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [filters, setFilters] = useState({});
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(true);

  // Mock photo data
  const mockPhotos = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&h=600&fit=crop',
      date: '2024-12-25',
      caption: 'Christmas morning together 🎄',
      location: 'Our cozy home',
      tags: ['holiday', 'cozy', 'morning'],
      reactions: 15,
      stickers: []
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800&h=600&fit=crop',
      date: '2024-12-25',
      caption: 'Perfect Christmas dinner',
      location: 'Dining room',
      tags: ['food', 'celebration', 'together'],
      reactions: 8,
      stickers: []
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop',
      date: '2024-12-20',
      caption: 'Winter walk in the park',
      location: 'Central Park',
      tags: ['outdoor', 'winter', 'romantic'],
      reactions: 22,
      stickers: []
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1518621012118-1d30fb9b2189?w=800&h=600&fit=crop',
      date: '2024-12-20',
      caption: 'Hot cocoa date ☕',
      location: 'Favorite café',
      tags: ['date', 'cozy', 'drinks'],
      reactions: 12,
      stickers: []
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop',
      date: '2024-12-15',
      caption: 'Cooking together',
      location: 'Kitchen',
      tags: ['cooking', 'together', 'fun'],
      reactions: 18,
      stickers: []
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop',
      date: '2024-12-15',
      caption: 'Movie night setup',
      location: 'Living room',
      tags: ['movie', 'cozy', 'night'],
      reactions: 9,
      stickers: []
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=800&h=600&fit=crop',
      date: '2024-12-10',
      caption: 'Sunset at the beach',
      location: 'Malibu Beach',
      tags: ['sunset', 'beach', 'romantic'],
      reactions: 35,
      stickers: []
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800&h=600&fit=crop',
      date: '2024-12-10',
      caption: 'Beach picnic',
      location: 'Malibu Beach',
      tags: ['picnic', 'beach', 'food'],
      reactions: 14,
      stickers: []
    },
    {
      id: 9,
      url: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&h=600&fit=crop',
      date: '2024-12-05',
      caption: 'First snow of the season',
      location: 'Backyard',
      tags: ['snow', 'winter', 'first'],
      reactions: 27,
      stickers: []
    },
    {
      id: 10,
      url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop',
      date: '2024-12-05',
      caption: 'Building a snowman together',
      location: 'Backyard',
      tags: ['snow', 'fun', 'playful'],
      reactions: 31,
      stickers: []
    },
    {
      id: 11,
      url: 'https://images.unsplash.com/photo-1518621012118-1d30fb9b2189?w=800&h=600&fit=crop',
      date: '2024-12-01',
      caption: 'December 1st - Holiday season begins!',
      location: 'Downtown',
      tags: ['holiday', 'decorations', 'festive'],
      reactions: 19,
      stickers: []
    },
    {
      id: 12,
      url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop',
      date: '2024-12-01',
      caption: 'Holiday shopping together',
      location: 'Shopping mall',
      tags: ['shopping', 'holiday', 'together'],
      reactions: 11,
      stickers: []
    }
  ];

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setPhotos(mockPhotos);
      const uniqueDates = [...new Set(mockPhotos.map(photo => photo.date))]?.sort((a, b) => new Date(b) - new Date(a));
      setDates(uniqueDates);
      setSelectedDate(uniqueDates?.[0]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handlePhotoClick = (photo) => {
    const photoIndex = photos?.findIndex(p => p?.id === photo?.id);
    setCurrentSlideshowIndex(photoIndex);
    setIsSlideshowOpen(true);
  };

  const handlePhotoEdit = (photo) => {
    setEditingPhoto(photo);
    setIsEditModalOpen(true);
  };

  const handlePhotoSave = (editedPhoto) => {
    setPhotos(prev => prev?.map(photo => 
      photo?.id === editedPhoto?.id ? editedPhoto : photo
    ));
  };

  const handleAddSticker = (photo) => {
    console.log('Adding sticker to photo:', photo?.id);
    // This would typically open a sticker selection modal
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Apply filters to photos here
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const startSlideshow = () => {
    const filteredPhotos = photos?.filter(photo => photo?.date === selectedDate);
    if (filteredPhotos?.length > 0) {
      setCurrentSlideshowIndex(0);
      setIsSlideshowOpen(true);
    }
  };

  const exportPhotos = () => {
    console.log('Exporting photos for date:', selectedDate);
    // Implementation for photo export
  };

  if (isLoading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Icon name="Camera" size={32} className="text-white" />
            </div>
            <h2 className="font-heading text-xl font-bold text-foreground mb-2">Loading Your Memories</h2>
            <p className="font-body text-muted-foreground">Preparing your beautiful photo timeline...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(8)]?.map((_, i) => (
          <div
            key={i}
            className={`absolute text-primary/10 animate-float-${['slow', 'medium', 'fast']?.[i % 3]}`}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`
            }}
          >
            <Icon name="Camera" size={24 + i * 2} />
          </div>
        ))}
      </div>
      <main className="relative z-10 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Photo Timeline Gallery
                </h1>
                <p className="font-body text-muted-foreground">
                  Browse and experience your visual memories through time
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={exportPhotos}
                  iconName="Download"
                  iconPosition="left"
                >
                  Export
                </Button>
                <Button
                  variant="default"
                  onClick={startSlideshow}
                  iconName="Play"
                  iconPosition="left"
                >
                  Slideshow
                </Button>
              </div>
            </div>
          </div>

          {/* Timeline Navigation */}
          <TimelineNavigation
            dates={dates}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            photos={photos}
          />

          {/* Filter Panel */}
          <FilterPanel
            onFilterChange={handleFilterChange}
            onViewModeChange={handleViewModeChange}
            currentFilters={filters}
            viewMode={viewMode}
          />

          {/* Photo Grid */}
          <PhotoGrid
            photos={photos}
            selectedDate={selectedDate}
            onPhotoClick={handlePhotoClick}
            onPhotoEdit={handlePhotoEdit}
            onAddSticker={handleAddSticker}
          />

          {/* Quick Actions Floating Button */}
          <div className="fixed bottom-6 right-6 z-50">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => navigate('/desktop-home')}
                className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-floating hover:shadow-strong transition-all duration-300 hover:scale-110 group"
                title="Back to Desktop"
              >
                <Icon name="Home" size={20} className="text-white group-hover:animate-bounce-gentle" />
              </button>
              
              <button
                onClick={startSlideshow}
                className="w-12 h-12 bg-card/80 backdrop-blur-sm border border-border/20 rounded-full flex items-center justify-center shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-110 group"
                title="Start Slideshow"
              >
                <Icon name="Play" size={20} className="text-primary group-hover:animate-bounce-gentle" />
              </button>
            </div>
          </div>
        </div>
      </main>
      {/* Slideshow Modal */}
      <SlideshowModal
        isOpen={isSlideshowOpen}
        photos={photos?.filter(photo => photo?.date === selectedDate)}
        currentIndex={currentSlideshowIndex}
        onClose={() => setIsSlideshowOpen(false)}
        onIndexChange={setCurrentSlideshowIndex}
      />
      {/* Photo Edit Modal */}
      <PhotoEditModal
        isOpen={isEditModalOpen}
        photo={editingPhoto}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingPhoto(null);
        }}
        onSave={handlePhotoSave}
      />
    </div>
    </PageTransition>
  );
};

export default PhotoTimelineGallery;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import CollectionSidebar from './components/CollectionSidebar';
import LetterToolbar from './components/LetterToolbar';
import LetterCard from './components/LetterCard';
import LetterModal from './components/LetterModal';
import EmptyState from './components/EmptyState';
import Icon from '../../components/AppIcon';


const LoveLettersManager = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeCollection, setActiveCollection] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredLetters, setFilteredLetters] = useState([]);

  // Mock data for collections
  const collections = [
    { id: 'all', name: 'All Letters', type: 'all', count: 24 },
    { id: 'handwritten', name: 'Handwritten', type: 'handwritten', count: 8 },
    { id: 'audio', name: 'Audio Letters', type: 'audio', count: 5 },
    { id: 'scanned', name: 'Scanned', type: 'scanned', count: 6 },
    { id: 'templates', name: 'Templates', type: 'templates', count: 3 },
    { id: 'secret', name: 'Secret Box', type: 'secret', count: 2 }
  ];

  // Mock data for letters
  const mockLetters = [
    {
      id: 1,
      title: "My Dearest Love",
      sender: "Hardik",
      date: "2025-01-15",
      type: "handwritten",
      preview: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=400&fit=crop",
      excerpt: `My darling,\n\nEvery morning I wake up thinking about you, and every night I fall asleep with your name on my lips. You have become the rhythm of my heartbeat, the melody of my soul.\n\nI remember the first time we met at that little café downtown. You were reading a book about astronomy, and when you looked up and smiled at me, I swear I saw all the stars in your eyes.\n\nYour laugh is my favorite sound in the world. It's like music that makes everything else fade away. When you're happy, I'm happy. When you're sad, my heart breaks a little too.\n\nI love how you scrunch your nose when you're concentrating, how you always steal the covers at night, and how you make the most amazing pancakes on Sunday mornings.\n\nYou are my yesterday, my today, and all of my tomorrows.`,
      hasVoiceNote: true,
      isSecret: false,
      signature: "Forever yours, Cookie ❤️",
      pages: [
        `My darling,\n\nEvery morning I wake up thinking about you, and every night I fall asleep with your name on my lips. You have become the rhythm of my heartbeat, the melody of my soul.\n\nI remember the first time we met at that little café downtown. You were reading a book about astronomy, and when you looked up and smiled at me, I swear I saw all the stars in your eyes.`,
        `Your laugh is my favorite sound in the world. It's like music that makes everything else fade away. When you're happy, I'm happy. When you're sad, my heart breaks a little too.\n\nI love how you scrunch your nose when you're concentrating, how you always steal the covers at night, and how you make the most amazing pancakes on Sunday mornings.`,
        `You are my yesterday, my today, and all of my tomorrows.\n\nI can't wait to spend the rest of my life making memories with you, traveling the world together, and growing old by your side.\n\nThank you for being my person, my safe haven, my greatest adventure.`
      ]
    },
    {
      id: 2,
      title: "Pre-Wedding Anniversary",
      sender: "Hardik",
      date: "2025-01-10",
      type: "template",
      preview: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
      excerpt: `Oops, That Day.. Ya As I Said, This is Going to be 14th May...`,
      hasVoiceNote: false,
      isSecret: false,
      signature: "All my love, Bunny 💕"
    },
    {
      id: 3,
      title: "Voice Message - Missing You",
      sender: "Hardik",
      date: "2025-01-08",
      type: "audio",
      preview: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=400&fit=crop",
      excerpt: "Audio recording: 'Hey baby, I know you're at work but I just wanted to tell you how much I miss you. I was making coffee this morning and remembered how you always make it perfectly...'",
      hasVoiceNote: true,
      isSecret: false,
      signature: "XOXO, Sarah"
    },
    {
      id: 4,
      title: "Our Secret Dreams",
      sender: "Hardik",
      date: "2025-01-05",
      type: "handwritten",
      preview: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=400&fit=crop",
      excerpt: `This letter contains our most intimate dreams and plans for the future. The house by the lake, our three children (two girls and a boy), the garden we'll plant together, and all the adventures we'll have.\n\nI dream of growing old with you, of watching sunsets from our porch, of celebrating our 50th anniversary surrounded by our family.`,
      hasVoiceNote: true,
      isSecret: true,
      signature: "Forever dreaming with you, Michael"
    },
    {
      id: 5,
      title: "Thank You Note",
      sender: "Hardik",
      date: "2025-01-03",
      type: "scanned",
      preview: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=300&h=400&fit=crop",
      excerpt: `Thank you for taking care of me when I was sick last week. You brought me soup, made sure I took my medicine, and stayed up all night just to make sure I was okay.\n\nThat's when I knew for certain that you're the one I want to spend my life with. Not just for the good times, but for all of it.`,
      hasVoiceNote: false,
      isSecret: false,
      signature: "Gratefully yours, Sarah"
    },
    {
      id: 6,
      title: "Morning Thoughts",
      sender: "Hardik",
      date: "2025-01-01",
      type: "handwritten",
      preview: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      excerpt: `Good morning, beautiful. I'm writing this while you're still sleeping next to me. The morning light is hitting your face just right, and you look like an angel.\n\nI love these quiet moments before the world wakes up. It's just us, and everything feels perfect.`,
      hasVoiceNote: false,
      isSecret: false,
      signature: "Your morning person, Michael ☀️"
    }
  ];

  // Filter letters based on active collection and search query
  useEffect(() => {
    let filtered = mockLetters;

    // Filter by collection
    if (activeCollection !== 'all') {
      if (activeCollection === 'secret') {
        filtered = filtered?.filter(letter => letter?.isSecret);
      } else {
        filtered = filtered?.filter(letter => letter?.type === activeCollection);
      }
    }

    // Filter by search query
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(letter =>
        letter?.title?.toLowerCase()?.includes(query) ||
        letter?.sender?.toLowerCase()?.includes(query) ||
        letter?.excerpt?.toLowerCase()?.includes(query)
      );
    }

    setFilteredLetters(filtered);
  }, [activeCollection, searchQuery]);

  const handleCollectionChange = (collectionId) => {
    setActiveCollection(collectionId);
    setSelectedLetters([]);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleLetterSelect = (letterId) => {
    setSelectedLetters(prev => {
      if (prev?.includes(letterId)) {
        return prev?.filter(id => id !== letterId);
      } else {
        return [...prev, letterId];
      }
    });
  };

  const handleLetterOpen = (letter) => {
    setSelectedLetter(letter);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedLetter(null);
  };

  const handleNewLetter = () => {
    // Navigate to letter creation or show creation modal
    console.log('Creating new letter...');
  };

  const handleBulkAction = (actionId) => {
    console.log(`Bulk action: ${actionId} on letters:`, selectedLetters);
    setSelectedLetters([]);
  };

  const handleLetterPreview = (letter) => {
    // Handle preview logic if needed
    console.log('Previewing letter:', letter?.title);
  };

  const handleNextLetter = () => {
    if (!selectedLetter) return;
    const currentIndex = filteredLetters?.findIndex(letter => letter?.id === selectedLetter?.id);
    if (currentIndex < filteredLetters?.length - 1) {
      setSelectedLetter(filteredLetters?.[currentIndex + 1]);
    }
  };

  const handlePreviousLetter = () => {
    if (!selectedLetter) return;
    const currentIndex = filteredLetters?.findIndex(letter => letter?.id === selectedLetter?.id);
    if (currentIndex > 0) {
      setSelectedLetter(filteredLetters?.[currentIndex - 1]);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 flex h-screen">
        {/* Sidebar */}
        <CollectionSidebar
          collections={collections}
          activeCollection={activeCollection}
          onCollectionChange={handleCollectionChange}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Toolbar */}
          <LetterToolbar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            onNewLetter={handleNewLetter}
            selectedCount={selectedLetters?.length}
            onBulkAction={handleBulkAction}
            onToggleSidebar={toggleSidebar}
          />

          {/* Letters Grid/List */}
          <div className="flex-1 overflow-y-auto p-6">
            {filteredLetters?.length === 0 ? (
              <EmptyState
                searchQuery={searchQuery}
                activeCollection={activeCollection}
                onNewLetter={handleNewLetter}
                onClearSearch={handleClearSearch}
              />
            ) : (
              <div className={`
                ${viewMode === 'grid' ?'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' :'space-y-4'
                }
              `}>
                {filteredLetters?.map((letter) => (
                  <LetterCard
                    key={letter?.id}
                    letter={letter}
                    viewMode={viewMode}
                    isSelected={selectedLetters?.includes(letter?.id)}
                    onSelect={handleLetterSelect}
                    onOpen={handleLetterOpen}
                    onPreview={handleLetterPreview}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Letter Modal */}
      <LetterModal
        letter={selectedLetter}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onNext={selectedLetter && filteredLetters?.findIndex(l => l?.id === selectedLetter?.id) < filteredLetters?.length - 1 ? handleNextLetter : null}
        onPrevious={selectedLetter && filteredLetters?.findIndex(l => l?.id === selectedLetter?.id) > 0 ? handlePreviousLetter : null}
      />
      {/* Floating Hearts Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(8)]?.map((_, i) => (
          <div
            key={i}
            className={`absolute text-primary/5 animate-float-${['slow', 'medium', 'fast']?.[i % 3]}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`
            }}
          >
            <Icon name="Heart" size={16 + Math.random() * 16} />
          </div>
        ))}
      </div>
      {/* Sakura Petals */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(5)]?.map((_, i) => (
          <div
            key={`petal-${i}`}
            className={`absolute text-accent/5 animate-float-${['medium', 'slow', 'fast']?.[i % 3]}`}
            style={{
              right: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 3}s`
            }}
          >
            <Icon name="Flower" size={12 + Math.random() * 8} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoveLettersManager;
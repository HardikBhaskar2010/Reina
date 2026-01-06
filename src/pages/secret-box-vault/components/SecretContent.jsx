import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SecretContent = ({ onLock }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [surpriseMode, setSurpriseMode] = useState(false);
  const [autoLockTimer, setAutoLockTimer] = useState(300); // 5 minutes
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  // Mock secret content data
  const secretContent = [
    {
      id: 1,
      type: 'letter',
      title: 'Our First Kiss Memory',
      content: `My dearest love,\n\nI still remember that magical moment under the cherry blossoms when you first kissed me. The world seemed to stop, and all I could feel was the warmth of your lips and the beating of my heart.\n\nThat moment changed everything for me. I knew then that I wanted to spend forever creating beautiful memories with you.\n\nForever yours,\nWith all my love ❤️`,
      date: '2024-02-14',
      category: 'romantic',
      isSecret: true,
      thumbnail: 'https://images.unsplash.com/photo-1518621012420-8ab10d9f7e0b?w=400&h=300&fit=crop',
      tags: ['first kiss', 'cherry blossoms', 'romantic']
    },
    {
      id: 2,
      type: 'photo',
      title: 'Private Moments Collection',
      content: 'Our most intimate and precious photographs together',
      date: '2024-03-20',
      category: 'photos',
      isSecret: true,
      thumbnail: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop',
      tags: ['intimate', 'private', 'memories']
    },
    {
      id: 3,
      type: 'voice',
      title: 'Midnight Confessions',
      content: 'Late night voice messages sharing our deepest thoughts and dreams',
      date: '2024-04-10',
      category: 'audio',
      isSecret: true,
      duration: '12:34',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      tags: ['confessions', 'dreams', 'midnight']
    },
    {
      id: 4,
      type: 'letter',
      title: 'Future Plans & Dreams',
      content: `My beloved,\n\nI've been thinking about our future together, and my heart fills with so much joy and excitement. I dream of the house we'll build, the adventures we'll share, and the family we might create.\n\nEvery day with you feels like a gift, and I can't wait to unwrap all the beautiful moments that await us.\n\nWith endless love and dreams,\nYour devoted partner 💕`,
      date: '2024-05-15',
      category: 'dreams',
      isSecret: true,
      thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
      tags: ['future', 'dreams', 'plans']
    },
    {
      id: 5,
      type: 'document',
      title: 'Love Contract & Promises',
      content: 'Our sacred promises and commitments to each other, sealed with love',
      date: '2024-06-01',
      category: 'promises',
      isSecret: true,
      thumbnail: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      tags: ['promises', 'contract', 'commitment']
    },
    {
      id: 6,
      type: 'photo',
      title: 'Secret Adventure Photos',
      content: 'Photos from our secret getaway that no one else knows about',
      date: '2024-07-22',
      category: 'adventure',
      isSecret: true,
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      tags: ['adventure', 'getaway', 'secret']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Secrets', icon: 'Heart', count: secretContent?.length },
    { id: 'romantic', label: 'Romantic', icon: 'Heart', count: secretContent?.filter(item => item?.category === 'romantic')?.length },
    { id: 'photos', label: 'Private Photos', icon: 'Camera', count: secretContent?.filter(item => item?.category === 'photos')?.length },
    { id: 'audio', label: 'Voice Secrets', icon: 'Mic', count: secretContent?.filter(item => item?.category === 'audio')?.length },
    { id: 'dreams', label: 'Dreams', icon: 'Star', count: secretContent?.filter(item => item?.category === 'dreams')?.length },
    { id: 'promises', label: 'Promises', icon: 'Shield', count: secretContent?.filter(item => item?.category === 'promises')?.length },
    { id: 'adventure', label: 'Adventures', icon: 'Map', count: secretContent?.filter(item => item?.category === 'adventure')?.length }
  ];

  // Auto-lock timer
  useEffect(() => {
    const timer = setInterval(() => {
      setAutoLockTimer(prev => {
        if (prev <= 1) {
          onLock();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onLock]);

  // Easter egg detection
  useEffect(() => {
    if (searchQuery?.toLowerCase() === 'forever yours') {
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 3000);
    }
  }, [searchQuery]);

  const filteredContent = secretContent?.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item?.category === selectedCategory;
    const matchesSearch = item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         item?.content?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         item?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'letter': return 'FileText';
      case 'photo': return 'Image';
      case 'voice': return 'Mic';
      case 'document': return 'File';
      default: return 'Heart';
    }
  };

  const formatAutoLockTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds?.toString()?.padStart(2, '0')}`;
  };

  const handleItemClick = (item) => {
    if (surpriseMode) {
      // Add surprise reveal animation
      setSelectedItem(item);
    } else {
      setSelectedItem(item);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Security Indicators */}
      <div className="sticky top-0 z-40 glass-card border-b border-border/20 shadow-soft">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-yellow-400 rounded-full flex items-center justify-center shadow-soft">
                <Icon name="Lock" size={16} className="text-white" />
              </div>
              <div>
                <h1 className="font-heading text-xl font-bold text-foreground">Secret Vault</h1>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="font-caption text-xs text-success">Encrypted & Secure</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Auto-lock Timer */}
            <div className="flex items-center space-x-2 px-3 py-1 bg-warning/10 rounded-lg">
              <Icon name="Timer" size={14} className="text-warning" />
              <span className="font-mono text-sm text-warning-foreground">
                {formatAutoLockTime(autoLockTimer)}
              </span>
            </div>

            {/* Surprise Mode Toggle */}
            <button
              onClick={() => setSurpriseMode(!surpriseMode)}
              className={`
                p-2 rounded-lg transition-all duration-300
                ${surpriseMode 
                  ? 'bg-accent/20 text-accent' :'bg-muted/10 text-muted-foreground hover:bg-muted/20'
                }
              `}
              title="Surprise Mode"
            >
              <Icon name="Eye" size={16} />
            </button>

            {/* Lock Button */}
            <Button
              onClick={onLock}
              variant="outline"
              iconName="Lock"
              iconPosition="left"
              className="text-sm"
            >
              Lock Vault
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="px-4 pb-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Search your secrets... (try 'forever yours')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full"
              />
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`
                  p-2 rounded-lg transition-all duration-300
                  ${viewMode === 'grid' ?'bg-primary/20 text-primary' :'bg-muted/10 text-muted-foreground hover:bg-muted/20'
                  }
                `}
              >
                <Icon name="Grid3X3" size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`
                  p-2 rounded-lg transition-all duration-300
                  ${viewMode === 'list' ?'bg-primary/20 text-primary' :'bg-muted/10 text-muted-foreground hover:bg-muted/20'
                  }
                `}
              >
                <Icon name="List" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        {/* Sidebar Categories */}
        <div className="w-64 glass-card border-r border-border/20 min-h-screen p-4">
          <h2 className="font-body text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
            Categories
          </h2>
          <div className="space-y-1">
            {categories?.map((category) => (
              <button
                key={category?.id}
                onClick={() => setSelectedCategory(category?.id)}
                className={`
                  w-full flex items-center justify-between p-3 rounded-xl font-body text-sm
                  transition-all duration-300 group
                  ${selectedCategory === category?.id
                    ? 'bg-primary/20 text-primary-foreground shadow-gentle'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/10'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={category?.icon} 
                    size={16} 
                    className={selectedCategory === category?.id ? 'text-primary' : 'group-hover:text-primary'} 
                  />
                  <span>{category?.label}</span>
                </div>
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${selectedCategory === category?.id
                    ? 'bg-primary/30 text-primary-foreground'
                    : 'bg-muted/20 text-muted-foreground'
                  }
                `}>
                  {category?.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Content Grid/List */}
          <div className={`
            ${viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' :'space-y-4'
            }
          `}>
            <AnimatePresence>
              {filteredContent?.map((item, index) => (
                <motion.div
                  key={item?.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="glass-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105 border-2 border-accent/20 hover:border-accent/40">
                    {/* Thumbnail */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item?.thumbnail}
                        alt={item?.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      
                      {/* Type Badge */}
                      <div className="absolute top-3 left-3">
                        <div className="flex items-center space-x-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg">
                          <Icon name={getTypeIcon(item?.type)} size={12} className="text-white" />
                          <span className="font-caption text-xs text-white capitalize">{item?.type}</span>
                        </div>
                      </div>

                      {/* Secret Badge */}
                      <div className="absolute top-3 right-3">
                        <div className="w-8 h-8 bg-accent/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Icon name="Lock" size={12} className="text-white" />
                        </div>
                      </div>

                      {/* Surprise Mode Overlay */}
                      {surpriseMode && (
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
                          <div className="text-center">
                            <Icon name="Eye" size={32} className="text-white mb-2 mx-auto" />
                            <p className="font-body text-sm text-white">Click to reveal</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-body text-lg font-semibold text-foreground mb-2 line-clamp-1">
                        {surpriseMode ? '••••••••••••' : item?.title}
                      </h3>
                      <p className="font-caption text-sm text-muted-foreground mb-3 line-clamp-2">
                        {surpriseMode ? 'Hidden content - click to reveal your secret' : item?.content}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="font-caption text-xs text-muted-foreground">
                          {new Date(item.date)?.toLocaleDateString()}
                        </span>
                        {item?.duration && (
                          <span className="font-mono text-xs text-primary">
                            {item?.duration}
                          </span>
                        )}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {item?.tags?.slice(0, 3)?.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-primary/10 text-primary rounded-lg font-caption text-xs"
                          >
                            {surpriseMode ? '•••' : tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredContent?.length === 0 && (
            <div className="text-center py-16">
              <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="font-body text-lg font-semibold text-foreground mb-2">No secrets found</h3>
              <p className="font-caption text-muted-foreground">
                Try adjusting your search or category filter
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Easter Egg Modal */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            className="fixed inset-0 z-100 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-card rounded-3xl p-8 shadow-floating border border-accent/30 text-center"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
            >
              <div className="text-6xl mb-4">💕</div>
              <h3 className="font-heading text-2xl font-bold text-accent mb-2">Easter Egg Found!</h3>
              <p className="font-body text-muted-foreground">
                You discovered our secret phrase! Your love is truly forever.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-100 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedItem(null)}
            />
            <motion.div
              className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="glass-card rounded-3xl shadow-floating border border-border/30 overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={selectedItem?.thumbnail}
                    alt={selectedItem?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors duration-300"
                  >
                    <Icon name="X" size={20} />
                  </button>
                </div>
                <div className="p-6">
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                    {selectedItem?.title}
                  </h2>
                  <div className="prose prose-pink max-w-none">
                    <p className="font-body text-foreground whitespace-pre-line leading-relaxed">
                      {selectedItem?.content}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/20">
                    <span className="font-caption text-sm text-muted-foreground">
                      {new Date(selectedItem.date)?.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Icon name="Shield" size={14} className="text-success" />
                      <span className="font-caption text-xs text-success">Encrypted</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SecretContent;
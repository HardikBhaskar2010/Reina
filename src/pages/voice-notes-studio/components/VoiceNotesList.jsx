import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const VoiceNotesList = ({ 
  voiceNotes, 
  currentNote, 
  onSelectNote, 
  onDeleteNote,
  onRenameNote,
  onCreatePlaylist 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);

  const filteredNotes = voiceNotes?.filter(note => {
      const matchesSearch = note?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                           note?.transcription?.toLowerCase()?.includes(searchQuery?.toLowerCase());
      
      const matchesFilter = filterBy === 'all' || 
                           (filterBy === 'favorites' && note?.isFavorite) ||
                           (filterBy === 'recent' && isRecent(note?.date));
      
      return matchesSearch && matchesFilter;
    })?.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'title':
          return a?.title?.localeCompare(b?.title);
        case 'duration':
          return b?.duration - a?.duration;
        default:
          return 0;
      }
    });

  const isRecent = (date) => {
    const noteDate = new Date(date);
    const weekAgo = new Date();
    weekAgo?.setDate(weekAgo?.getDate() - 7);
    return noteDate > weekAgo;
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const formatDate = (date) => {
    const noteDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday?.setDate(yesterday?.getDate() - 1);

    if (noteDate?.toDateString() === today?.toDateString()) {
      return 'Today';
    } else if (noteDate?.toDateString() === yesterday?.toDateString()) {
      return 'Yesterday';
    } else {
      return noteDate?.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const toggleNoteSelection = (noteId) => {
    setSelectedNotes(prev => 
      prev?.includes(noteId) 
        ? prev?.filter(id => id !== noteId)
        : [...prev, noteId]
    );
  };

  const handleBulkAction = (action) => {
    switch (action) {
      case 'delete':
        selectedNotes?.forEach(noteId => onDeleteNote(noteId));
        setSelectedNotes([]);
        break;
      case 'playlist':
        setShowPlaylistModal(true);
        break;
      default:
        break;
    }
  };

  const getMoodIcon = (mood) => {
    const moodIcons = {
      happy: 'Smile',
      romantic: 'Heart',
      sad: 'Frown',
      excited: 'Zap',
      calm: 'Moon',
      playful: 'Laugh'
    };
    return moodIcons?.[mood] || 'Heart';
  };

  const getMoodColor = (mood) => {
    const moodColors = {
      happy: 'text-yellow-500',
      romantic: 'text-pink-500',
      sad: 'text-blue-500',
      excited: 'text-orange-500',
      calm: 'text-purple-500',
      playful: 'text-green-500'
    };
    return moodColors?.[mood] || 'text-primary';
  };

  return (
    <div className="glass-card rounded-2xl shadow-soft border border-border/20 h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Voice Notes
          </h2>
          <div className="flex items-center space-x-2">
            <span className="font-caption text-sm text-muted-foreground">
              {filteredNotes?.length} notes
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4">
          <Input
            type="search"
            placeholder="Search notes or transcriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Filters and Sort */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e?.target?.value)}
              className="px-3 py-1 bg-input border border-border/30 rounded-lg font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">All Notes</option>
              <option value="favorites">Favorites</option>
              <option value="recent">Recent</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="px-3 py-1 bg-input border border-border/30 rounded-lg font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="duration">Sort by Duration</option>
            </select>
          </div>

          {selectedNotes?.length > 0 && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('playlist')}
                iconName="Plus"
              >
                Playlist
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleBulkAction('delete')}
                iconName="Trash2"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Notes List */}
      <div className="flex-1 overflow-y-auto p-2">
        {filteredNotes?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <Icon name="Mic" size={48} className="text-muted-foreground mb-4" />
            <h3 className="font-body text-lg font-medium text-foreground mb-2">
              {searchQuery ? 'No matching notes' : 'No voice notes yet'}
            </h3>
            <p className="font-caption text-sm text-muted-foreground max-w-sm">
              {searchQuery 
                ? 'Try adjusting your search terms or filters' :'Start recording your first voice note to see it here'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredNotes?.map((note) => (
              <div
                key={note?.id}
                className={`
                  p-4 rounded-xl border transition-all duration-300 cursor-pointer
                  ${currentNote?.id === note?.id
                    ? 'bg-primary/10 border-primary/30 shadow-gentle'
                    : 'bg-card/50 border-border/20 hover:bg-primary/5 hover:border-primary/20'
                  }
                `}
                onClick={() => onSelectNote(note)}
              >
                <div className="flex items-start space-x-3">
                  {/* Selection Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedNotes?.includes(note?.id)}
                    onChange={(e) => {
                      e?.stopPropagation();
                      toggleNoteSelection(note?.id);
                    }}
                    className="mt-1 w-4 h-4 text-primary bg-input border-border/30 rounded focus:ring-primary/50"
                  />

                  {/* Note Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-body text-sm font-medium text-foreground truncate">
                          {note?.title}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="font-caption text-xs text-muted-foreground">
                            {formatDate(note?.date)}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground">
                            {formatDuration(note?.duration)}
                          </span>
                          {note?.mood && (
                            <Icon 
                              name={getMoodIcon(note?.mood)} 
                              size={12} 
                              className={getMoodColor(note?.mood)} 
                            />
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1 ml-2">
                        {note?.isFavorite && (
                          <Icon name="Heart" size={14} className="text-accent" />
                        )}
                        {note?.hasTranscription && (
                          <Icon name="FileText" size={14} className="text-primary" />
                        )}
                      </div>
                    </div>

                    {/* Transcription Preview */}
                    {note?.transcription && (
                      <p className="font-caption text-xs text-muted-foreground line-clamp-2 mt-2">
                        {note?.transcription}
                      </p>
                    )}

                    {/* Waveform Preview */}
                    <div className="flex items-center space-x-1 mt-2">
                      {[...Array(20)]?.map((_, i) => (
                        <div
                          key={i}
                          className="w-1 bg-primary/30 rounded-full"
                          style={{ 
                            height: `${Math.random() * 12 + 4}px`,
                            opacity: currentNote?.id === note?.id ? 1 : 0.6
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={(e) => {
                        e?.stopPropagation();
                        onSelectNote(note);
                      }}
                      className="p-1 rounded-lg hover:bg-primary/20 transition-colors duration-300"
                      title="Play note"
                    >
                      <Icon name="Play" size={14} className="text-primary" />
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e?.stopPropagation();
                        // Toggle favorite
                      }}
                      className="p-1 rounded-lg hover:bg-accent/20 transition-colors duration-300"
                      title="Toggle favorite"
                    >
                      <Icon 
                        name={note?.isFavorite ? "Heart" : "HeartOff"} 
                        size={14} 
                        className={note?.isFavorite ? "text-accent" : "text-muted-foreground"} 
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Playlist Creation Modal */}
      {showPlaylistModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="glass-card rounded-2xl p-6 w-full max-w-md mx-4 shadow-floating border border-border/30">
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
              Create Playlist
            </h3>
            <Input
              label="Playlist Name"
              placeholder="Enter playlist name..."
              className="mb-4"
            />
            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowPlaylistModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Create playlist logic
                  setShowPlaylistModal(false);
                  setSelectedNotes([]);
                }}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceNotesList;
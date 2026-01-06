import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PhotoGrid = ({ photos, selectedDate, onPhotoClick, onPhotoEdit, onAddSticker }) => {
  const [hoveredPhoto, setHoveredPhoto] = useState(null);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'masonry'
  const gridRef = useRef(null);

  const filteredPhotos = photos?.filter(photo => photo?.date === selectedDate);

  const handlePhotoSelect = (photoId, event) => {
    event?.stopPropagation();
    setSelectedPhotos(prev => 
      prev?.includes(photoId) 
        ? prev?.filter(id => id !== photoId)
        : [...prev, photoId]
    );
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for photos:`, selectedPhotos);
    setSelectedPhotos([]);
  };

  const getGridColumns = () => {
    if (viewMode === 'masonry') return 'columns-2 md:columns-3 lg:columns-4';
    return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';
  };

  const formatPhotoDate = (dateStr) => {
    return new Date(dateStr)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (filteredPhotos?.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Camera" size={32} className="text-primary" />
        </div>
        <h3 className="font-heading text-xl font-bold text-foreground mb-2">No Photos Yet</h3>
        <p className="font-body text-muted-foreground mb-6">
          Start capturing beautiful memories together on this date
        </p>
        <button className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium hover:shadow-soft transition-all duration-300">
          <Icon name="Plus" size={16} className="inline mr-2" />
          Add First Photo
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Gallery Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="font-heading text-xl font-bold text-foreground">
            {formatPhotoDate(selectedDate)} • {filteredPhotos?.length} photos
          </h3>
          {selectedPhotos?.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="font-body text-sm text-muted-foreground">
                {selectedPhotos?.length} selected
              </span>
              <button
                onClick={() => handleBulkAction('download')}
                className="p-1 rounded-lg hover:bg-primary/10 text-primary transition-colors duration-300"
                title="Download Selected"
              >
                <Icon name="Download" size={16} />
              </button>
              <button
                onClick={() => handleBulkAction('share')}
                className="p-1 rounded-lg hover:bg-primary/10 text-primary transition-colors duration-300"
                title="Share Selected"
              >
                <Icon name="Share2" size={16} />
              </button>
              <button
                onClick={() => setSelectedPhotos([])}
                className="p-1 rounded-lg hover:bg-error/10 text-error transition-colors duration-300"
                title="Clear Selection"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          )}
        </div>

        {/* View Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all duration-300 ${
              viewMode === 'grid' ?'bg-primary/20 text-primary' :'hover:bg-muted/20 text-muted-foreground'
            }`}
            title="Grid View"
          >
            <Icon name="Grid3X3" size={16} />
          </button>
          <button
            onClick={() => setViewMode('masonry')}
            className={`p-2 rounded-lg transition-all duration-300 ${
              viewMode === 'masonry' ?'bg-primary/20 text-primary' :'hover:bg-muted/20 text-muted-foreground'
            }`}
            title="Masonry View"
          >
            <Icon name="LayoutGrid" size={16} />
          </button>
        </div>
      </div>
      {/* Photo Grid */}
      <div
        ref={gridRef}
        className={`
          ${viewMode === 'grid' ? `grid ${getGridColumns()} gap-4` : `${getGridColumns()} gap-4`}
        `}
      >
        {filteredPhotos?.map((photo) => (
          <div
            key={photo?.id}
            className={`
              relative group cursor-pointer transition-all duration-300 hover:scale-105
              ${viewMode === 'masonry' ? 'break-inside-avoid mb-4' : 'aspect-square'}
              ${selectedPhotos?.includes(photo?.id) ? 'ring-2 ring-primary ring-offset-2' : ''}
            `}
            onMouseEnter={() => setHoveredPhoto(photo?.id)}
            onMouseLeave={() => setHoveredPhoto(null)}
            onClick={() => onPhotoClick(photo)}
          >
            {/* Photo Container with Stitch Border */}
            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-gentle group-hover:shadow-soft transition-all duration-300 border-4 border-white/50">
              <Image
                src={photo?.url}
                alt={photo?.caption || `Photo from ${photo?.date}`}
                className="w-full h-full object-cover"
              />
              
              {/* Stitch Border Effect */}
              <div className="absolute inset-0 border-2 border-dashed border-white/30 rounded-lg m-1 pointer-events-none" />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Selection Checkbox */}
              <div className="absolute top-2 left-2 z-20">
                <button
                  onClick={(e) => handlePhotoSelect(photo?.id, e)}
                  className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                    ${selectedPhotos?.includes(photo?.id)
                      ? 'bg-primary border-primary' :'bg-white/20 border-white/50 hover:bg-white/30'
                    }
                  `}
                >
                  {selectedPhotos?.includes(photo?.id) && (
                    <Icon name="Check" size={12} className="text-white" />
                  )}
                </button>
              </div>

              {/* Photo Actions */}
              {hoveredPhoto === photo?.id && (
                <div className="absolute top-2 right-2 flex space-x-1 z-20">
                  <button
                    onClick={(e) => {
                      e?.stopPropagation();
                      onAddSticker(photo);
                    }}
                    className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                    title="Add Sticker"
                  >
                    <Icon name="Smile" size={14} className="text-white" />
                  </button>
                  <button
                    onClick={(e) => {
                      e?.stopPropagation();
                      onPhotoEdit(photo);
                    }}
                    className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                    title="Edit Photo"
                  >
                    <Icon name="Edit3" size={14} className="text-white" />
                  </button>
                </div>
              )}

              {/* Photo Info */}
              {hoveredPhoto === photo?.id && (
                <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2">
                    {photo?.caption && (
                      <p className="font-body text-sm text-white mb-1 line-clamp-2">
                        {photo?.caption}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-white/80">
                      <span>{photo?.location || 'Unknown location'}</span>
                      <div className="flex items-center space-x-2">
                        {photo?.tags?.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-white/20 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Heart Reaction Count */}
              {photo?.reactions && photo?.reactions > 0 && (
                <div className="absolute bottom-2 right-2 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 z-20">
                  <Icon name="Heart" size={12} className="text-accent" />
                  <span className="text-xs text-white font-medium">{photo?.reactions}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Load More Button */}
      {filteredPhotos?.length >= 20 && (
        <div className="text-center pt-8">
          <button className="px-6 py-3 bg-gradient-to-r from-primary/20 to-accent/20 hover:from-primary/30 hover:to-accent/30 text-foreground rounded-xl font-medium transition-all duration-300 border border-border/20">
            <Icon name="MoreHorizontal" size={16} className="inline mr-2" />
            Load More Photos
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotoGrid;
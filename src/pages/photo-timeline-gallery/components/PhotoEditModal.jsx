import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PhotoEditModal = ({ isOpen, photo, onClose, onSave }) => {
  const [editedPhoto, setEditedPhoto] = useState(photo || {});
  const [activeTab, setActiveTab] = useState('filters');
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawColor, setDrawColor] = useState('#FF69B4');
  const [brushSize, setBrushSize] = useState(3);
  const canvasRef = useRef(null);
  const [textOverlays, setTextOverlays] = useState([]);
  const [selectedSticker, setSelectedSticker] = useState(null);

  const filters = [
    { name: 'Original', value: 'none', style: {} },
    { name: 'Romantic', value: 'romantic', style: { filter: 'sepia(0.3) saturate(1.2) hue-rotate(-10deg)' } },
    { name: 'Dreamy', value: 'dreamy', style: { filter: 'blur(0.5px) brightness(1.1) contrast(0.9)' } },
    { name: 'Vintage', value: 'vintage', style: { filter: 'sepia(0.5) contrast(1.2) brightness(0.9)' } },
    { name: 'Soft Pink', value: 'soft-pink', style: { filter: 'hue-rotate(300deg) saturate(1.3) brightness(1.1)' } },
    { name: 'Golden Hour', value: 'golden', style: { filter: 'sepia(0.2) saturate(1.4) brightness(1.1) hue-rotate(15deg)' } }
  ];

  const stickers = [
    { id: 1, emoji: '💕', name: 'Heart Eyes' },
    { id: 2, emoji: '🌸', name: 'Cherry Blossom' },
    { id: 3, emoji: '✨', name: 'Sparkles' },
    { id: 4, emoji: '💖', name: 'Sparkling Heart' },
    { id: 5, emoji: '🦋', name: 'Butterfly' },
    { id: 6, emoji: '🌹', name: 'Rose' },
    { id: 7, emoji: '💫', name: 'Dizzy Star' },
    { id: 8, emoji: '🎀', name: 'Ribbon' }
  ];

  const handleFilterChange = (filter) => {
    setEditedPhoto(prev => ({
      ...prev,
      filter: filter?.value,
      filterStyle: filter?.style
    }));
  };

  const handleTextAdd = () => {
    const newText = {
      id: Date.now(),
      text: 'Add your text',
      x: 50,
      y: 50,
      fontSize: 24,
      color: '#FFFFFF',
      fontFamily: 'Poppins'
    };
    setTextOverlays(prev => [...prev, newText]);
  };

  const handleTextUpdate = (id, updates) => {
    setTextOverlays(prev => prev?.map(text => 
      text?.id === id ? { ...text, ...updates } : text
    ));
  };

  const handleStickerAdd = (sticker) => {
    const newSticker = {
      id: Date.now(),
      emoji: sticker?.emoji,
      x: Math.random() * 200 + 50,
      y: Math.random() * 200 + 50,
      size: 40
    };
    setEditedPhoto(prev => ({
      ...prev,
      stickers: [...(prev?.stickers || []), newSticker]
    }));
  };

  const handleSave = () => {
    const finalPhoto = {
      ...editedPhoto,
      textOverlays,
      lastModified: new Date()?.toISOString()
    };
    onSave(finalPhoto);
    onClose();
  };

  const tabs = [
    { id: 'filters', label: 'Filters', icon: 'Palette' },
    { id: 'adjust', label: 'Adjust', icon: 'Sliders' },
    { id: 'text', label: 'Text', icon: 'Type' },
    { id: 'stickers', label: 'Stickers', icon: 'Smile' },
    { id: 'draw', label: 'Draw', icon: 'Brush' }
  ];

  if (!isOpen || !photo) return null;

  return (
    <div className="fixed inset-0 z-100 bg-black/90 backdrop-blur-sm">
      <div className="flex h-full">
        {/* Main Edit Area */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="relative max-w-4xl max-h-full">
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-floating">
              <Image
                src={photo?.url}
                alt={photo?.caption || 'Photo to edit'}
                className="max-w-full max-h-[70vh] object-contain"
                style={editedPhoto?.filterStyle || {}}
              />
              
              {/* Text Overlays */}
              {textOverlays?.map((text) => (
                <div
                  key={text?.id}
                  className="absolute cursor-move"
                  style={{
                    left: `${text?.x}px`,
                    top: `${text?.y}px`,
                    fontSize: `${text?.fontSize}px`,
                    color: text?.color,
                    fontFamily: text?.fontFamily,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                  }}
                  onClick={() => setSelectedSticker(text?.id)}
                >
                  {text?.text}
                </div>
              ))}
              
              {/* Sticker Overlays */}
              {editedPhoto?.stickers?.map((sticker) => (
                <div
                  key={sticker?.id}
                  className="absolute cursor-move"
                  style={{
                    left: `${sticker?.x}px`,
                    top: `${sticker?.y}px`,
                    fontSize: `${sticker?.size}px`
                  }}
                >
                  {sticker?.emoji}
                </div>
              ))}
              
              {/* Drawing Canvas */}
              {activeTab === 'draw' && (
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full cursor-crosshair"
                  onMouseDown={() => setIsDrawing(true)}
                  onMouseUp={() => setIsDrawing(false)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Edit Panel */}
        <div className="w-80 bg-card/95 backdrop-blur-sm border-l border-border/20 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-border/20">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold text-foreground">Edit Photo</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted/20 text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border/20">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`
                  flex-1 flex flex-col items-center space-y-1 py-3 px-2 text-xs font-medium transition-all duration-300
                  ${activeTab === tab?.id 
                    ? 'text-primary bg-primary/10 border-b-2 border-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/10'
                  }
                `}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'filters' && (
              <div className="space-y-4">
                <h3 className="font-body text-sm font-semibold text-foreground mb-3">Choose Filter</h3>
                <div className="grid grid-cols-2 gap-3">
                  {filters?.map((filter) => (
                    <button
                      key={filter?.value}
                      onClick={() => handleFilterChange(filter)}
                      className={`
                        relative p-2 rounded-lg border-2 transition-all duration-300
                        ${editedPhoto?.filter === filter?.value 
                          ? 'border-primary bg-primary/10' :'border-border/20 hover:border-primary/50'
                        }
                      `}
                    >
                      <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-2 overflow-hidden">
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{ 
                            backgroundImage: `url(${photo?.url})`,
                            ...filter?.style
                          }}
                        />
                      </div>
                      <span className="font-caption text-xs text-foreground">{filter?.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'adjust' && (
              <div className="space-y-6">
                <h3 className="font-body text-sm font-semibold text-foreground mb-3">Adjustments</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="font-caption text-xs text-muted-foreground mb-2 block">Brightness</label>
                    <input
                      type="range"
                      min="0.5"
                      max="1.5"
                      step="0.1"
                      defaultValue="1"
                      className="w-full h-2 bg-muted/30 rounded-lg appearance-none slider"
                    />
                  </div>
                  
                  <div>
                    <label className="font-caption text-xs text-muted-foreground mb-2 block">Contrast</label>
                    <input
                      type="range"
                      min="0.5"
                      max="1.5"
                      step="0.1"
                      defaultValue="1"
                      className="w-full h-2 bg-muted/30 rounded-lg appearance-none slider"
                    />
                  </div>
                  
                  <div>
                    <label className="font-caption text-xs text-muted-foreground mb-2 block">Saturation</label>
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.1"
                      defaultValue="1"
                      className="w-full h-2 bg-muted/30 rounded-lg appearance-none slider"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'text' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-body text-sm font-semibold text-foreground">Text Overlays</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleTextAdd}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Add Text
                  </Button>
                </div>
                
                {textOverlays?.map((text) => (
                  <div key={text?.id} className="p-3 bg-muted/10 rounded-lg space-y-3">
                    <input
                      type="text"
                      value={text?.text}
                      onChange={(e) => handleTextUpdate(text?.id, { text: e?.target?.value })}
                      className="w-full px-3 py-2 bg-input border border-border/30 rounded-lg font-body text-sm"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-caption text-xs text-muted-foreground mb-1 block">Size</label>
                        <input
                          type="range"
                          min="12"
                          max="48"
                          value={text?.fontSize}
                          onChange={(e) => handleTextUpdate(text?.id, { fontSize: parseInt(e?.target?.value) })}
                          className="w-full h-1 bg-muted/30 rounded-lg appearance-none slider"
                        />
                      </div>
                      <div>
                        <label className="font-caption text-xs text-muted-foreground mb-1 block">Color</label>
                        <input
                          type="color"
                          value={text?.color}
                          onChange={(e) => handleTextUpdate(text?.id, { color: e?.target?.value })}
                          className="w-full h-8 rounded-lg border border-border/30"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'stickers' && (
              <div className="space-y-4">
                <h3 className="font-body text-sm font-semibold text-foreground mb-3">Add Stickers</h3>
                <div className="grid grid-cols-4 gap-3">
                  {stickers?.map((sticker) => (
                    <button
                      key={sticker?.id}
                      onClick={() => handleStickerAdd(sticker)}
                      className="aspect-square bg-muted/10 hover:bg-primary/10 rounded-lg flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110"
                      title={sticker?.name}
                    >
                      {sticker?.emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'draw' && (
              <div className="space-y-4">
                <h3 className="font-body text-sm font-semibold text-foreground mb-3">Drawing Tools</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="font-caption text-xs text-muted-foreground mb-2 block">Brush Color</label>
                    <div className="flex space-x-2">
                      {['#FF69B4', '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']?.map((color) => (
                        <button
                          key={color}
                          onClick={() => setDrawColor(color)}
                          className={`w-8 h-8 rounded-full border-2 ${drawColor === color ? 'border-foreground' : 'border-border/30'}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="font-caption text-xs text-muted-foreground mb-2 block">Brush Size: {brushSize}px</label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={brushSize}
                      onChange={(e) => setBrushSize(parseInt(e?.target?.value))}
                      className="w-full h-2 bg-muted/30 rounded-lg appearance-none slider"
                    />
                  </div>
                  
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Clear Drawing
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-border/20 space-y-3">
            <Button
              variant="default"
              fullWidth
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
            >
              Save Changes
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoEditModal;
import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LetterModal = ({ letter, isOpen, onClose, onNext, onPrevious }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showVoiceNote, setShowVoiceNote] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handlePageTurn = (direction) => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    setTimeout(() => {
      if (direction === 'next' && currentPage < (letter?.pages?.length || 1)) {
        setCurrentPage(prev => prev + 1);
      } else if (direction === 'prev' && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      }
      setIsFlipping(false);
    }, 300);
  };

  const handleVoiceToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString([], { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!isOpen || !letter) return null;

  const currentPageContent = letter.pages?.[currentPage - 1] || letter.content;
  const totalPages = letter.pages?.length || 1;

  return (
    <div className="fixed inset-0 z-100 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl h-full max-h-[90vh] glass-card rounded-2xl shadow-floating border border-border/30 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-soft">
              <Icon name="Heart" size={20} className="text-white animate-heart-pulse" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground">{letter.title}</h2>
              <p className="font-body text-sm text-muted-foreground">
                From {letter.sender} • {formatDate(letter.date)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Voice Note Toggle */}
            {letter.hasVoiceNote && (
              <Button
                variant={showVoiceNote ? "default" : "outline"}
                size="sm"
                iconName="Mic"
                onClick={() => setShowVoiceNote(!showVoiceNote)}
              >
                Voice Note
              </Button>
            )}
            
            {/* Navigation */}
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              onClick={onPrevious}
              disabled={!onPrevious}
            />
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              onClick={onNext}
              disabled={!onNext}
            />
            
            {/* Close */}
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClose}
            />
          </div>
        </div>

        {/* Voice Note Panel */}
        {showVoiceNote && letter.hasVoiceNote && (
          <div className="p-4 border-b border-border/20 bg-success/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleVoiceToggle}
                  className="w-10 h-10 bg-success rounded-full flex items-center justify-center hover:bg-success/80 transition-colors duration-300"
                >
                  <Icon 
                    name={isPlaying ? 'Pause' : 'Play'} 
                    size={16} 
                    className="text-white" 
                  />
                </button>
                <div>
                  <p className="font-body text-sm font-medium text-foreground">Voice Annotation</p>
                  <p className="font-caption text-xs text-muted-foreground">2:34 duration</p>
                </div>
              </div>
              
              {/* Waveform Visualization */}
              <div className="flex items-center space-x-1">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className={`
                      w-1 bg-success rounded-full transition-all duration-300
                      ${isPlaying ? 'animate-pulse' : ''}
                    `}
                    style={{
                      height: `${Math.random() * 20 + 8}px`,
                      opacity: isPlaying && i < 8 ? 1 : 0.3
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Letter Content */}
        <div className="flex-1 relative overflow-hidden">
          {/* Paper Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-card to-card/80" />
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
          
          {/* Page Content */}
          <div className={`
            relative h-full p-8 lg:p-12 overflow-y-auto
            transition-all duration-300 ease-in-out
            ${isFlipping ? 'transform scale-95 opacity-50' : 'transform scale-100 opacity-100'}
          `}>
            <div className="max-w-2xl mx-auto">
              {/* Letter Content */}
              <div className="prose prose-pink max-w-none">
                <div className="font-handwriting text-lg leading-relaxed text-foreground whitespace-pre-wrap">
                  {currentPageContent}
                </div>
              </div>
              
              {/* Signature */}
              {currentPage === totalPages && letter.signature && (
                <div className="mt-12 text-right">
                  <div className="font-handwriting text-xl text-primary">
                    {letter.signature}
                  </div>
                  <div className="mt-2 flex justify-end">
                    <Icon name="Heart" size={16} className="text-accent animate-heart-pulse" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border/20 bg-gradient-to-r from-primary/5 to-accent/5">
          {/* Page Navigation */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handlePageTurn('prev')}
              disabled={currentPage === 1 || isFlipping}
              className="p-2 rounded-lg hover:bg-muted/20 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="ChevronLeft" size={16} className="text-muted-foreground" />
            </button>
            
            <div className="font-body text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            
            <button
              onClick={() => handlePageTurn('next')}
              disabled={currentPage === totalPages || isFlipping}
              className="p-2 rounded-lg hover:bg-muted/20 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download">
              Export PDF
            </Button>
            <Button variant="outline" size="sm" iconName="Share2">
              Share
            </Button>
            <Button variant="outline" size="sm" iconName="Printer">
              Print
            </Button>
          </div>
        </div>

        {/* Floating Hearts Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`absolute text-primary/10 animate-float-${['slow', 'medium', 'fast'][i % 3]}`}
              style={{
                left: `${10 + i * 20}%`,
                top: `${20 + i * 15}%`,
                animationDelay: `${i * 2}s`
              }}
            >
              <Icon name="Heart" size={8 + i * 2} />
            </div>
          ))}
        </div>
      </div>

      {/* Backdrop */}
      <div 
        className="absolute inset-0 -z-10"
        onClick={onClose}
      />
    </div>
  );
};

export default LetterModal;
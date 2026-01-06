import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ 
  type = 'default', 
  searchQuery, 
  activeCollection, 
  onNewLetter, 
  onClearSearch 
}) => {
  const getEmptyStateContent = () => {
    if (searchQuery) {
      return {
        icon: 'Search',
        title: 'No letters found',
        description: `We couldn't find any letters matching "${searchQuery}". Try adjusting your search terms or browse all letters.`,
        action: {
          label: 'Clear Search',
          onClick: onClearSearch,
          variant: 'outline'
        }
      };
    }

    switch (activeCollection) {
      case 'handwritten':
        return {
          icon: 'PenTool',
          title: 'No handwritten letters yet',
          description: 'Start writing your first handwritten love letter. Express your feelings with the personal touch of handwriting.',
          action: {
            label: 'Write Handwritten Letter',
            onClick: onNewLetter,
            variant: 'default'
          }
        };
      
      case 'audio':
        return {
          icon: 'Mic',
          title: 'No audio letters recorded',
          description: 'Record your first voice message. Sometimes hearing your voice means more than written words.',
          action: {
            label: 'Record Audio Letter',
            onClick: onNewLetter,
            variant: 'default'
          }
        };
      
      case 'scanned':
        return {
          icon: 'Scan',
          title: 'No scanned letters uploaded',
          description: 'Upload photos of physical letters, cards, or notes to preserve them digitally.',
          action: {
            label: 'Upload Scanned Letter',
            onClick: onNewLetter,
            variant: 'default'
          }
        };
      
      case 'templates':
        return {
          icon: 'FileText',
          title: 'No template letters created',
          description: 'Create letters using our beautiful templates. Perfect for special occasions and regular expressions of love.',
          action: {
            label: 'Browse Templates',
            onClick: onNewLetter,
            variant: 'default'
          }
        };
      
      case 'secret':
        return {
          icon: 'Lock',
          title: 'Your secret box is empty',
          description: 'Store your most private and intimate letters in the secret box. These letters are extra protected and hidden.',
          action: {
            label: 'Add Secret Letter',
            onClick: onNewLetter,
            variant: 'default'
          }
        };
      
      default:
        return {
          icon: 'Heart',
          title: 'Start your love letter collection',
          description: 'Begin documenting your romantic journey. Write, record, or upload your first love letter to create lasting memories.',
          action: {
            label: 'Create First Letter',
            onClick: onNewLetter,
            variant: 'default'
          }
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        {/* Illustration */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center shadow-soft">
            <Icon 
              name={content?.icon} 
              size={32} 
              className="text-primary" 
            />
          </div>
          
          {/* Floating Hearts */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)]?.map((_, i) => (
              <div
                key={i}
                className={`absolute text-primary/20 animate-float-${['slow', 'medium', 'fast']?.[i % 3]}`}
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${10 + i * 20}%`,
                  animationDelay: `${i * 0.8}s`
                }}
              >
                <Icon name="Heart" size={12 + i * 2} />
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className="font-heading text-xl font-bold text-foreground">
            {content?.title}
          </h3>
          
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            {content?.description}
          </p>
          
          {/* Action Button */}
          {content?.action && (
            <div className="pt-4">
              <Button
                variant={content?.action?.variant}
                onClick={content?.action?.onClick}
                iconName="Plus"
                iconPosition="left"
                className="shadow-soft hover:shadow-medium"
              >
                {content?.action?.label}
              </Button>
            </div>
          )}
        </div>

        {/* Additional Tips */}
        {!searchQuery && (
          <div className="mt-8 p-4 glass-card rounded-xl border border-border/20">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Lightbulb" size={16} className="text-accent" />
              </div>
              <div className="text-left">
                <h4 className="font-body text-sm font-semibold text-foreground mb-1">
                  Pro Tip
                </h4>
                <p className="font-caption text-xs text-muted-foreground">
                  {activeCollection === 'secret' ?'Secret letters require additional authentication to access. Perfect for your most intimate thoughts.' :'You can drag and drop letters between collections to organize them better.'
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent rounded-full animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
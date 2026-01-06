import React from 'react';
import Icon from '../../../components/AppIcon';

const CollectionSidebar = ({ 
  collections, 
  activeCollection, 
  onCollectionChange, 
  isCollapsed, 
  onToggleCollapse 
}) => {
  const getCollectionIcon = (type) => {
    switch (type) {
      case 'all': return 'Heart';
      case 'handwritten': return 'PenTool';
      case 'audio': return 'Mic';
      case 'scanned': return 'Scan';
      case 'templates': return 'FileText';
      case 'secret': return 'Lock';
      default: return 'Folder';
    }
  };

  const getCollectionColor = (type) => {
    switch (type) {
      case 'all': return 'text-primary';
      case 'handwritten': return 'text-accent';
      case 'audio': return 'text-success';
      case 'scanned': return 'text-warning';
      case 'templates': return 'text-secondary';
      case 'secret': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggleCollapse}
        />
      )}
      {/* Sidebar */}
      <div className={`
        fixed lg:relative top-0 left-0 h-full z-50 lg:z-auto
        w-80 lg:w-64 glass-card border-r border-border/20
        transform transition-transform duration-300 ease-in-out
        ${isCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
        lg:transform-none
      `}>
        {/* Header */}
        <div className="p-6 border-b border-border/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-soft">
                <Icon name="Heart" size={20} className="text-white animate-heart-pulse" />
              </div>
              <div>
                <h2 className="font-heading text-lg font-bold text-foreground">Collections</h2>
                <p className="font-caption text-xs text-muted-foreground">Organize your letters</p>
              </div>
            </div>
            <button
              onClick={onToggleCollapse}
              className="lg:hidden p-2 rounded-lg hover:bg-muted/20 transition-colors duration-300"
            >
              <Icon name="X" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Collections List */}
        <div className="p-4 space-y-2 overflow-y-auto flex-1">
          {collections?.map((collection) => (
            <button
              key={collection?.id}
              onClick={() => onCollectionChange(collection?.id)}
              className={`
                w-full flex items-center justify-between p-3 rounded-xl
                font-body text-sm font-medium transition-all duration-300
                group hover:scale-105
                ${activeCollection === collection?.id
                  ? 'bg-primary/20 text-primary-foreground shadow-gentle border border-primary/30'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/10'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <div className={`
                  w-8 h-8 rounded-lg flex items-center justify-center
                  ${activeCollection === collection?.id 
                    ? 'bg-primary/30' :'bg-muted/20 group-hover:bg-muted/30'
                  }
                  transition-all duration-300
                `}>
                  <Icon 
                    name={getCollectionIcon(collection?.type)} 
                    size={16} 
                    className={`
                      ${activeCollection === collection?.id 
                        ? 'text-primary' 
                        : getCollectionColor(collection?.type)
                      }
                      group-hover:animate-bounce-gentle
                    `}
                  />
                </div>
                <span className="truncate">{collection?.name}</span>
              </div>
              
              {/* Item Count */}
              <div className={`
                px-2 py-1 rounded-full text-xs font-medium
                ${activeCollection === collection?.id
                  ? 'bg-primary/30 text-primary-foreground'
                  : 'bg-muted/30 text-muted-foreground'
                }
                transition-all duration-300
              `}>
                {collection?.count}
              </div>
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-border/20">
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-3 p-3 rounded-xl text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-all duration-300 group">
              <Icon name="Plus" size={16} className="group-hover:animate-bounce-gentle" />
              <span>New Collection</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 rounded-xl text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-all duration-300 group">
              <Icon name="Settings" size={16} className="group-hover:animate-bounce-gentle" />
              <span>Manage Collections</span>
            </button>
          </div>
        </div>

        {/* Floating Hearts */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)]?.map((_, i) => (
            <div
              key={i}
              className={`absolute text-primary/10 animate-float-${['slow', 'medium', 'fast']?.[i % 3]}`}
              style={{
                left: `${20 + i * 25}%`,
                top: `${30 + i * 20}%`,
                animationDelay: `${i * 1.5}s`
              }}
            >
              <Icon name="Heart" size={12 + i * 2} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CollectionSidebar;
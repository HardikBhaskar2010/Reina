import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AudioEffectsPanel = ({ 
  isVisible,
  onToggleVisibility,
  effects,
  onEffectChange,
  onApplyEffects,
  onResetEffects,
  isProcessing
}) => {
  const [activeTab, setActiveTab] = useState('enhance');

  const enhanceEffects = [
    {
      id: 'noiseReduction',
      name: 'Noise Reduction',
      icon: 'Volume1',
      value: effects?.noiseReduction || 0,
      min: 0,
      max: 100,
      unit: '%',
      description: 'Reduce background noise'
    },
    {
      id: 'volumeBoost',
      name: 'Volume Boost',
      icon: 'Volume2',
      value: effects?.volumeBoost || 0,
      min: -20,
      max: 20,
      unit: 'dB',
      description: 'Adjust overall volume'
    },
    {
      id: 'clarity',
      name: 'Voice Clarity',
      icon: 'Mic',
      value: effects?.clarity || 0,
      min: 0,
      max: 100,
      unit: '%',
      description: 'Enhance voice clarity'
    }
  ];

  const creativeEffects = [
    {
      id: 'reverb',
      name: 'Reverb',
      icon: 'Radio',
      value: effects?.reverb || 0,
      min: 0,
      max: 100,
      unit: '%',
      description: 'Add room ambience'
    },
    {
      id: 'echo',
      name: 'Echo',
      icon: 'Repeat',
      value: effects?.echo || 0,
      min: 0,
      max: 100,
      unit: '%',
      description: 'Add echo effect'
    },
    {
      id: 'pitch',
      name: 'Pitch Shift',
      icon: 'TrendingUp',
      value: effects?.pitch || 0,
      min: -12,
      max: 12,
      unit: 'st',
      description: 'Change voice pitch'
    }
  ];

  const filterEffects = [
    {
      id: 'lowPass',
      name: 'Low Pass',
      icon: 'TrendingDown',
      value: effects?.lowPass || 20000,
      min: 100,
      max: 20000,
      unit: 'Hz',
      description: 'Filter high frequencies'
    },
    {
      id: 'highPass',
      name: 'High Pass',
      icon: 'TrendingUp',
      value: effects?.highPass || 20,
      min: 20,
      max: 2000,
      unit: 'Hz',
      description: 'Filter low frequencies'
    },
    {
      id: 'bandPass',
      name: 'Band Pass',
      icon: 'BarChart3',
      value: effects?.bandPass || 1000,
      min: 100,
      max: 10000,
      unit: 'Hz',
      description: 'Focus on specific frequency range'
    }
  ];

  const presets = [
    {
      name: 'Voice Enhancement',
      icon: 'Mic',
      effects: {
        noiseReduction: 60,
        volumeBoost: 3,
        clarity: 80,
        highPass: 80
      }
    },
    {
      name: 'Romantic Ambience',
      icon: 'Heart',
      effects: {
        reverb: 30,
        volumeBoost: 2,
        clarity: 40,
        lowPass: 8000
      }
    },
    {
      name: 'Crystal Clear',
      icon: 'Zap',
      effects: {
        noiseReduction: 80,
        clarity: 100,
        volumeBoost: 5,
        highPass: 100,
        lowPass: 15000
      }
    },
    {
      name: 'Warm & Cozy',
      icon: 'Sun',
      effects: {
        reverb: 20,
        volumeBoost: 1,
        lowPass: 6000,
        clarity: 60
      }
    }
  ];

  const tabs = [
    { id: 'enhance', name: 'Enhance', icon: 'Sparkles' },
    { id: 'creative', name: 'Creative', icon: 'Palette' },
    { id: 'filters', name: 'Filters', icon: 'Sliders' },
    { id: 'presets', name: 'Presets', icon: 'Star' }
  ];

  const getCurrentEffects = () => {
    switch (activeTab) {
      case 'enhance': return enhanceEffects;
      case 'creative': return creativeEffects;
      case 'filters': return filterEffects;
      default: return enhanceEffects;
    }
  };

  const handleSliderChange = (effectId, value) => {
    onEffectChange(effectId, value);
  };

  const applyPreset = (preset) => {
    Object.entries(preset?.effects)?.forEach(([effectId, value]) => {
      onEffectChange(effectId, value);
    });
  };

  const hasActiveEffects = () => {
    return Object.values(effects)?.some(value => value !== 0 && value !== 20 && value !== 20000);
  };

  if (!isVisible) {
    return (
      <button
        onClick={onToggleVisibility}
        className={`
          fixed top-1/2 right-4 transform -translate-y-1/2 z-30
          w-12 h-12 rounded-full flex items-center justify-center
          shadow-floating hover:shadow-strong transition-all duration-300 hover:scale-110
          ${hasActiveEffects() ? 'bg-accent' : 'bg-primary'}
        `}
        title="Audio Effects"
      >
        <Icon name="Sliders" size={20} className="text-white" />
        {hasActiveEffects() && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-warning rounded-full animate-pulse" />
        )}
      </button>
    );
  }

  return (
    <div className="fixed top-4 right-4 bottom-4 w-80 z-30">
      <div className="glass-card rounded-2xl shadow-floating border border-border/30 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/20">
          <div className="flex items-center space-x-2">
            <Icon name="Sliders" size={20} className="text-primary" />
            <h3 className="font-body text-sm font-medium text-foreground">
              Audio Effects
            </h3>
            {hasActiveEffects() && (
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleVisibility}
            iconName="X"
            title="Close effects panel"
          />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border/20">
          {tabs?.map(tab => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`
                flex-1 flex items-center justify-center space-x-1 py-3 px-2
                font-caption text-xs transition-colors duration-300
                ${activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/5'
                }
              `}
            >
              <Icon name={tab?.icon} size={14} />
              <span className="hidden sm:inline">{tab?.name}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'presets' ? (
            <div className="space-y-3">
              {presets?.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => applyPreset(preset)}
                  className="w-full p-3 rounded-xl bg-card/50 hover:bg-primary/10 border border-border/20 hover:border-primary/30 transition-all duration-300 text-left group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                      <Icon name={preset?.icon} size={18} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-body text-sm font-medium text-foreground">
                        {preset?.name}
                      </h4>
                      <p className="font-caption text-xs text-muted-foreground">
                        {Object.keys(preset?.effects)?.length} effects
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {getCurrentEffects()?.map(effect => (
                <div key={effect?.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name={effect?.icon} size={16} className="text-primary" />
                      <span className="font-body text-sm font-medium text-foreground">
                        {effect?.name}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      {effect?.value}{effect?.unit}
                    </span>
                  </div>
                  
                  <input
                    type="range"
                    min={effect?.min}
                    max={effect?.max}
                    value={effect?.value}
                    onChange={(e) => handleSliderChange(effect?.id, parseFloat(e?.target?.value))}
                    className="w-full h-2 bg-muted/30 rounded-lg appearance-none cursor-pointer slider"
                  />
                  
                  <p className="font-caption text-xs text-muted-foreground">
                    {effect?.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/20 bg-muted/5">
          <div className="flex items-center justify-between space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onResetEffects}
              disabled={!hasActiveEffects()}
              iconName="RotateCcw"
            >
              Reset
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={isProcessing}
                iconName="Eye"
              >
                Preview
              </Button>
              
              <Button
                size="sm"
                onClick={onApplyEffects}
                disabled={isProcessing || !hasActiveEffects()}
                loading={isProcessing}
                iconName="Check"
              >
                Apply
              </Button>
            </div>
          </div>
          
          {isProcessing && (
            <div className="mt-3">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Loader2" size={14} className="text-primary animate-spin" />
                <span className="font-caption text-xs text-muted-foreground">
                  Processing audio effects...
                </span>
              </div>
              <div className="w-full h-1 bg-muted/30 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '60%' }} />
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default AudioEffectsPanel;
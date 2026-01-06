import React, { useState } from 'react';
import Header from '../components/ui/Header';
import Button from '../components/ui/Button';
import { useToast } from '../components/ui/Toast';
import { LoadingSpinner, CardSkeleton, ListSkeleton, GridSkeleton } from '../components/ui/LoadingSkeleton';
import Icon from '../components/AppIcon';

const FeatureDemo = () => {
  const { toast } = useToast();
  const [showSkeletons, setShowSkeletons] = useState(false);

  const demoToasts = () => {
    toast.success('This is a success message! 🎉');
    setTimeout(() => toast.error('This is an error message! ❌'), 500);
    setTimeout(() => toast.warning('This is a warning message! ⚠️'), 1000);
    setTimeout(() => toast.info('This is an info message! ℹ️'), 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              ✨ Feature Showcase
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore all the amazing UI/UX enhancements we've added to Love OS
            </p>
          </div>

          {/* Toast Notifications Demo */}
          <section className="mb-12">
            <div className="glass-card rounded-2xl p-8 shadow-soft border border-border/20">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Icon name="Bell" size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    Toast Notifications
                  </h2>
                  <p className="font-body text-sm text-muted-foreground">
                    Beautiful feedback messages for user actions
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button 
                  variant="default" 
                  onClick={() => toast.success('Success! Everything worked perfectly! 🎉')}
                  iconName="CheckCircle"
                  iconPosition="left"
                  data-testid="demo-success-toast"
                >
                  Success Toast
                </Button>
                <Button 
                  variant="danger" 
                  onClick={() => toast.error('Error! Something went wrong! ❌')}
                  iconName="XCircle"
                  iconPosition="left"
                  data-testid="demo-error-toast"
                >
                  Error Toast
                </Button>
                <Button 
                  variant="warning" 
                  onClick={() => toast.warning('Warning! Please be careful! ⚠️')}
                  iconName="AlertCircle"
                  iconPosition="left"
                  data-testid="demo-warning-toast"
                >
                  Warning Toast
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => toast.info('Info! Here\'s some helpful information! ℹ️')}
                  iconName="Info"
                  iconPosition="left"
                  data-testid="demo-info-toast"
                >
                  Info Toast
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-border/20">
                <Button 
                  variant="secondary" 
                  onClick={demoToasts}
                  iconName="Zap"
                  iconPosition="left"
                  fullWidth
                  data-testid="demo-all-toasts"
                >
                  Show All Toast Types (Sequential)
                </Button>
              </div>
            </div>
          </section>

          {/* Theme Toggle Demo */}
          <section className="mb-12">
            <div className="glass-card rounded-2xl p-8 shadow-soft border border-border/20">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Icon name="Palette" size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    Dark/Light Mode
                  </h2>
                  <p className="font-body text-sm text-muted-foreground">
                    Toggle the theme using the button in the header (next to notifications)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-background rounded-xl border border-border">
                  <h3 className="font-body text-lg font-semibold text-foreground mb-3">
                    Light Mode Features
                  </h3>
                  <ul className="space-y-2 font-body text-sm text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <Icon name="Check" size={16} className="text-success" />
                      <span>Soft pink palette</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Icon name="Check" size={16} className="text-success" />
                      <span>Gentle shadows</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Icon name="Check" size={16} className="text-success" />
                      <span>High contrast text</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-background rounded-xl border border-border">
                  <h3 className="font-body text-lg font-semibold text-foreground mb-3">
                    Dark Mode Features
                  </h3>
                  <ul className="space-y-2 font-body text-sm text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <Icon name="Check" size={16} className="text-success" />
                      <span>Deep purple palette</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Icon name="Check" size={16} className="text-success" />
                      <span>Reduced eye strain</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Icon name="Check" size={16} className="text-success" />
                      <span>Persistent preference</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Loading States Demo */}
          <section className="mb-12">
            <div className="glass-card rounded-2xl p-8 shadow-soft border border-border/20">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Icon name="Loader" size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    Loading States & Skeletons
                  </h2>
                  <p className="font-body text-sm text-muted-foreground">
                    Professional loading indicators for better UX
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <Button 
                  variant="default" 
                  onClick={() => setShowSkeletons(!showSkeletons)}
                  iconName={showSkeletons ? 'EyeOff' : 'Eye'}
                  iconPosition="left"
                  data-testid="toggle-skeletons-button"
                >
                  {showSkeletons ? 'Hide' : 'Show'} Skeleton Loaders
                </Button>
              </div>

              {showSkeletons && (
                <div className="space-y-8">
                  {/* Spinner Examples */}
                  <div>
                    <h3 className="font-body text-lg font-semibold text-foreground mb-4">
                      Loading Spinners
                    </h3>
                    <div className="flex items-center justify-around p-6 bg-background rounded-xl">
                      <div className="text-center">
                        <LoadingSpinner size="sm" />
                        <p className="font-caption text-xs text-muted-foreground mt-2">Small</p>
                      </div>
                      <div className="text-center">
                        <LoadingSpinner size="md" />
                        <p className="font-caption text-xs text-muted-foreground mt-2">Medium</p>
                      </div>
                      <div className="text-center">
                        <LoadingSpinner size="lg" />
                        <p className="font-caption text-xs text-muted-foreground mt-2">Large</p>
                      </div>
                      <div className="text-center">
                        <LoadingSpinner size="xl" />
                        <p className="font-caption text-xs text-muted-foreground mt-2">Extra Large</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Skeleton */}
                  <div>
                    <h3 className="font-body text-lg font-semibold text-foreground mb-4">
                      Card Skeleton
                    </h3>
                    <CardSkeleton />
                  </div>

                  {/* List Skeleton */}
                  <div>
                    <h3 className="font-body text-lg font-semibold text-foreground mb-4">
                      List Skeleton
                    </h3>
                    <ListSkeleton count={3} />
                  </div>

                  {/* Grid Skeleton */}
                  <div>
                    <h3 className="font-body text-lg font-semibold text-foreground mb-4">
                      Grid Skeleton
                    </h3>
                    <GridSkeleton count={3} columns={3} />
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Accessibility Demo */}
          <section className="mb-12">
            <div className="glass-card rounded-2xl p-8 shadow-soft border border-border/20">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Icon name="Shield" size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    Accessibility & Testing
                  </h2>
                  <p className="font-body text-sm text-muted-foreground">
                    All interactive elements have data-testid attributes
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                  <Icon name="Check" size={20} className="text-success mb-2" />
                  <h3 className="font-body text-sm font-semibold text-foreground mb-1">
                    ARIA Labels
                  </h3>
                  <p className="font-caption text-xs text-muted-foreground">
                    Screen reader friendly
                  </p>
                </div>

                <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                  <Icon name="Check" size={20} className="text-success mb-2" />
                  <h3 className="font-body text-sm font-semibold text-foreground mb-1">
                    Keyboard Navigation
                  </h3>
                  <p className="font-caption text-xs text-muted-foreground">
                    Full keyboard support
                  </p>
                </div>

                <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                  <Icon name="Check" size={20} className="text-success mb-2" />
                  <h3 className="font-body text-sm font-semibold text-foreground mb-1">
                    Test IDs
                  </h3>
                  <p className="font-caption text-xs text-muted-foreground">
                    E2E testing ready
                  </p>
                </div>

                <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                  <Icon name="Check" size={20} className="text-success mb-2" />
                  <h3 className="font-body text-sm font-semibold text-foreground mb-1">
                    Color Contrast
                  </h3>
                  <p className="font-caption text-xs text-muted-foreground">
                    WCAG compliant
                  </p>
                </div>

                <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                  <Icon name="Check" size={20} className="text-success mb-2" />
                  <h3 className="font-body text-sm font-semibold text-foreground mb-1">
                    Focus Indicators
                  </h3>
                  <p className="font-caption text-xs text-muted-foreground">
                    Clear focus states
                  </p>
                </div>

                <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                  <Icon name="Check" size={20} className="text-success mb-2" />
                  <h3 className="font-body text-sm font-semibold text-foreground mb-1">
                    Responsive
                  </h3>
                  <p className="font-caption text-xs text-muted-foreground">
                    Mobile-first design
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Button Variants Demo */}
          <section className="mb-12">
            <div className="glass-card rounded-2xl p-8 shadow-soft border border-border/20">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Icon name="MousePointer" size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    Button Variants
                  </h2>
                  <p className="font-body text-sm text-muted-foreground">
                    Comprehensive button component with multiple styles
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-body text-sm font-semibold text-foreground mb-3">
                    Variants
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="default">Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="success">Success</Button>
                    <Button variant="warning">Warning</Button>
                    <Button variant="danger">Danger</Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-body text-sm font-semibold text-foreground mb-3">
                    Sizes
                  </h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="xs">Extra Small</Button>
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="xl">Extra Large</Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-body text-sm font-semibold text-foreground mb-3">
                    With Icons
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <Button iconName="Heart" iconPosition="left">With Icon Left</Button>
                    <Button iconName="Star" iconPosition="right">With Icon Right</Button>
                    <Button variant="outline" iconName="Download" iconPosition="left">Download</Button>
                    <Button size="icon" variant="secondary">
                      <Icon name="Settings" size={16} />
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-body text-sm font-semibold text-foreground mb-3">
                    States
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <Button loading>Loading</Button>
                    <Button disabled>Disabled</Button>
                    <Button variant="outline" loading>Loading Outline</Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Back to Home */}
          <div className="text-center">
            <Button 
              variant="default" 
              size="lg"
              onClick={() => window.location.href = '/desktop-home'}
              iconName="Home"
              iconPosition="left"
            >
              Back to Desktop Home
            </Button>
          </div>
        </div>
      </main>

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {[...Array(6)].map((_, i) => (
          <div
            key={`heart-${i}`}
            className={`absolute text-primary/10 animate-float-${['slow', 'medium', 'fast'][i % 3]}`}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i * 15) % 60}%`,
              animationDelay: `${i * 0.8}s`
            }}
          >
            <Icon name="Heart" size={16 + (i % 3) * 4} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureDemo;

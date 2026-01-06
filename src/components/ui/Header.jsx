import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { ThemeToggle } from './ThemeToggle';

const Header = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Love Letters',
      path: '/love-letters-manager',
      icon: 'Heart',
      tooltip: 'Manage your romantic correspondence'
    },
    {
      label: 'Photo Timeline',
      path: '/photo-timeline-gallery',
      icon: 'Camera',
      tooltip: 'Browse your visual memories'
    },
    {
      label: 'Voice Notes',
      path: '/voice-notes-studio',
      icon: 'Mic',
      tooltip: 'Record and organize audio messages'
    },
    {
      label: 'Calendar',
      path: '/shared-calendar-planner',
      icon: 'Calendar',
      tooltip: 'Plan your future together'
    }
  ];

  const secondaryItems = [
    {
      label: 'Secret Box',
      path: '/secret-box-vault',
      icon: 'Lock',
      tooltip: 'Access your private vault'
    }
  ];

  const isActive = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const handleProfileClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleDesktopHome = () => {
    window.location.href = '/desktop-home';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/20">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleDesktopHome}
            className="flex items-center space-x-2 group transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-soft group-hover:shadow-medium transition-all duration-300">
                <Icon name="Heart" size={20} className="text-primary-foreground group-hover:animate-heart-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-heading text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                Pink OS Love
              </h1>
            </div>
          </button>
        </div>

        {/* Primary Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`
                relative flex items-center space-x-2 px-4 py-2 rounded-xl font-body text-sm font-medium
                transition-all duration-300 group
                ${isActive(item?.path)
                  ? 'bg-primary/20 text-primary-foreground shadow-gentle'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/10'
                }
              `}
              title={item?.tooltip}
            >
              <Icon 
                name={item?.icon} 
                size={16} 
                className={`transition-all duration-300 ${
                  isActive(item?.path) ? 'text-primary' : 'group-hover:text-primary'
                }`}
              />
              <span className="whitespace-nowrap">{item?.label}</span>
              {isActive(item?.path) && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
              )}
            </button>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Secret Box Quick Access */}
          <button
            onClick={() => handleNavigation('/secret-box-vault')}
            className={`
              hidden md:flex items-center space-x-2 px-3 py-2 rounded-lg font-body text-sm
              transition-all duration-300 group
              ${isActive('/secret-box-vault')
                ? 'bg-accent/20 text-accent-foreground' :'text-muted-foreground hover:text-accent hover:bg-accent/10'
              }
            `}
            title="Access Secret Box Vault"
            data-testid="secret-box-nav-button"
          >
            <Icon name="Lock" size={16} className="group-hover:animate-bounce-gentle" />
            <span className="hidden xl:inline">Secret Box</span>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <button 
            className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-all duration-300 group"
            data-testid="notifications-button"
          >
            <Icon name="Bell" size={18} className="group-hover:animate-bounce-gentle" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          </button>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={handleProfileClick}
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-muted/10 transition-all duration-300 group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-gentle group-hover:shadow-soft transition-all duration-300">
                <Icon name="User" size={16} className="text-primary-foreground" />
              </div>
              <Icon name="ChevronDown" size={14} className={`text-muted-foreground transition-transform duration-300 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 glass-card rounded-xl shadow-medium border border-border/20 py-2 z-60">
                <div className="px-4 py-2 border-b border-border/20">
                  <p className="font-body text-sm font-medium text-foreground">My Love Account</p>
                  <p className="font-caption text-xs text-muted-foreground">couple@pinkosl.ove</p>
                </div>
                <div className="py-1">
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-all duration-300">
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-all duration-300">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help & Support</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-all duration-300">
                    <Icon name="Shield" size={16} />
                    <span>Privacy</span>
                  </button>
                  <div className="border-t border-border/20 mt-1 pt-1">
                    <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm font-body text-error hover:text-error/80 hover:bg-error/10 transition-all duration-300">
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-all duration-300">
            <Icon name="Menu" size={20} />
          </button>
        </div>
      </div>
      {/* Mobile Navigation Overlay */}
      <div className="lg:hidden absolute top-full left-0 right-0 glass-card border-t border-border/20 shadow-medium">
        <nav className="p-4 space-y-2">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-body text-sm font-medium
                transition-all duration-300
                ${isActive(item?.path)
                  ? 'bg-primary/20 text-primary-foreground shadow-gentle'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/10'
                }
              `}
            >
              <Icon name={item?.icon} size={18} className={isActive(item?.path) ? 'text-primary' : ''} />
              <span>{item?.label}</span>
            </button>
          ))}
          {secondaryItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-body text-sm font-medium
                transition-all duration-300
                ${isActive(item?.path)
                  ? 'bg-accent/20 text-accent-foreground shadow-gentle'
                  : 'text-muted-foreground hover:text-accent hover:bg-accent/10'
                }
              `}
            >
              <Icon name={item?.icon} size={18} className={isActive(item?.path) ? 'text-accent' : ''} />
              <span>{item?.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
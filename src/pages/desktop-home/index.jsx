import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DesktopWallpaper from './components/DesktopWallpaper';
import DesktopShortcuts from './components/DesktopShortcuts';
import DesktopWidgets from './components/DesktopWidgets';
import StartMenu from './components/StartMenu';
import SystemTray from './components/SystemTray';

const DesktopHome = () => {
  const navigate = useNavigate();
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  // New: time and battery state
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );
  const [batteryLevel, setBatteryLevel] = useState(null); // percent 0-100
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    // Auto-hide welcome message after 5 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // update clock every second (keeps minutes accurate)
    const tick = () => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Battery API: navigator.getBattery()
    let batteryRef = null;
    let mounted = true;

    const handleBatteryUpdate = (batt) => {
      if (!mounted) return;
      setBatteryLevel(Math.round(batt.level * 100));
      setIsCharging(!!batt.charging);
    };

    if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
      navigator.getBattery().then((batt) => {
        batteryRef = batt;
        handleBatteryUpdate(batt);
        // add listeners
        batt.addEventListener('levelchange', () => handleBatteryUpdate(batt));
        batt.addEventListener('chargingchange', () => handleBatteryUpdate(batt));
      }).catch(() => {
        // silently ignore if permission/other error
      });
    } else {
      // Battery API not supported — leave batteryLevel null as fallback
    }

    return () => {
      mounted = false;
      if (batteryRef) {
        try {
          batteryRef.removeEventListener('levelchange', () => handleBatteryUpdate(batteryRef));
          batteryRef.removeEventListener('chargingchange', () => handleBatteryUpdate(batteryRef));
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleStartMenuToggle = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  const handleDesktopClick = () => {
    if (isStartMenuOpen) {
      setIsStartMenuOpen(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 overflow-x-hidden relative"
      onClick={handleDesktopClick}
    >
      {/* Mobile Status Bar */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-md border-b border-pink-200/30 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <span className="text-xs text-white">💕</span>
            </div>
            <span className="font-heading text-sm font-bold text-foreground">Love OS</span>
          </div>
          
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              {/* Battery indicator using real device battery when available */}
              <div className="w-12 h-4 border border-current rounded-sm overflow-hidden bg-white/10">
                <div
                  className={`h-full transition-all duration-300 ${batteryLevel !== null ? (batteryLevel > 20 ? 'bg-green-500' : 'bg-red-400') : 'bg-gray-300/40'}`}
                  style={{ width: `${batteryLevel ?? 0}%` }}
                  aria-hidden="true"
                />
              </div>
              <span>{batteryLevel !== null ? `${batteryLevel}%` : '—'}</span>
              {isCharging && <span className="ml-1 text-[11px] text-primary">⚡</span>}
            </div>

            {/* Time from device clock */}
            <span>{time}</span>
          </div>
        </div>
      </div>
      {/* Desktop Wallpaper */}
      <DesktopWallpaper />
      {/* Main Content Area */}
      <div className="relative z-10 min-h-screen pb-20">
        {/* Welcome Message */}
        {showWelcome && (
          <div className="fixed top-20 left-4 right-4 z-40 animate-fade-in">
            <div className="glass-card rounded-2xl shadow-floating border border-pink-200/30 p-4 text-center max-w-sm mx-auto">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl animate-pulse">💖</span>
              </div>
              <h2 className="font-heading text-lg font-bold text-foreground mb-2">
                Welcome to Love OS
              </h2>
              <p className="font-body text-sm text-muted-foreground">
                Your intimate digital space for precious memories
              </p>
              <button 
                onClick={() => setShowWelcome(false)}
                className="mt-3 px-4 py-2 bg-primary/20 rounded-full text-xs text-primary font-medium"
                data-testid="welcome-dismiss-button"
              >
                Let's start 💕
              </button>
            </div>
          </div>
        )}

        {/* App Shortcuts Grid */}
        <div className="px-4 pt-6">
          <DesktopShortcuts onNavigate={handleNavigation} />
        </div>

        {/* Widgets Section */}
        <div className="px-4 mt-8">
          <DesktopWidgets />
        </div>
      </div>
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-white/95 to-white/90 backdrop-blur-md border-t border-pink-200/30" data-testid="mobile-bottom-nav">
        <div className="flex items-center justify-around py-3 px-4">
          <button className="flex flex-col items-center space-y-1 p-2 rounded-xl hover:bg-primary/10 transition-all duration-300" data-testid="nav-home-button">
            <div className="w-6 h-6 text-muted-foreground">🏠</div>
            <span className="text-xs text-muted-foreground font-medium">Home</span>
          </button>
          
          <button 
            onClick={handleStartMenuToggle}
            className="flex flex-col items-center space-y-1 p-2 rounded-xl hover:bg-primary/10 transition-all duration-300"
            data-testid="nav-apps-button"
          >
            <div className="w-6 h-6 text-primary">💝</div>
            <span className="text-xs text-primary font-medium">Apps</span>
          </button>
          
          <button className="flex flex-col items-center space-y-1 p-2 rounded-xl hover:bg-primary/10 transition-all duration-300" data-testid="nav-messages-button">
            <div className="w-6 h-6 text-muted-foreground">💌</div>
            <span className="text-xs text-muted-foreground font-medium">Messages</span>
          </button>
          
          <button className="flex flex-col items-center space-y-1 p-2 rounded-xl hover:bg-primary/10 transition-all duration-300" data-testid="nav-settings-button">
            <div className="w-6 h-6 text-muted-foreground">⚙️</div>
            <span className="text-xs text-muted-foreground font-medium">Settings</span>
          </button>
        </div>
        
        {/* iPhone-style Home Indicator */}
        <div className="flex justify-center pb-2">
          <div className="w-32 h-1 bg-black/20 rounded-full"></div>
        </div>
      </div>

      {/* Made By Section (fixed above bottom nav) */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-pink-200/30 shadow-sm">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-sm">💖</span>
          </div>
          <div className="text-left">
            <div className="text-xs font-medium text-foreground">Made with 💖 by Your Cookie</div>
            <div className="text-[11px] text-muted-foreground">Designed with care — your memories matter</div>
          </div>
          <a
            href="#"
            onClick={(e) => e.stopPropagation()}
            className="ml-3 text-[11px] text-primary font-semibold hover:underline"
            aria-label="Made by link"
          >
            Learn more
          </a>
        </div>
      </div>

      {/* Start Menu Overlay */}
      <StartMenu 
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onNavigate={handleNavigation}
      />
      {/* Hidden System Tray for Notifications */}
      <SystemTray onStartMenuToggle={handleStartMenuToggle} />
    </div>
  );
};

export default DesktopHome;
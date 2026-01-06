import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const SystemTray = ({ onStartMenuToggle }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'love', message: 'New love letter received', time: '2 min ago' },
    { id: 2, type: 'reminder', message: 'Anniversary in 3 days', time: '1 hour ago' }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [systemStats, setSystemStats] = useState({
    battery: 85,
    wifi: 'strong',
    volume: 70
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date?.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString([], { 
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const clearNotification = (id) => {
    setNotifications(prev => prev?.filter(notif => notif?.id !== id));
  };

  const getWifiIcon = () => {
    switch (systemStats?.wifi) {
      case 'strong': return 'Wifi';
      case 'weak': return 'WifiOff';
      default: return 'Wifi';
    }
  };

  const getBatteryIcon = () => {
    if (systemStats?.battery > 75) return 'Battery';
    if (systemStats?.battery > 50) return 'Battery';
    if (systemStats?.battery > 25) return 'Battery';
    return 'BatteryLow';
  };

  return (
    <>
      {/* System Tray */}
      <div className="fixed bottom-0 right-0 z-80 p-4">
        <div className="glass-card rounded-2xl shadow-floating border border-border/30 p-3">
          <div className="flex items-center space-x-4">
            {/* System Status Icons */}
            <div className="flex items-center space-x-2">
              {/* WiFi */}
              <button className="p-1 rounded-lg hover:bg-white/10 transition-all duration-300 group">
                <Icon 
                  name={getWifiIcon()} 
                  size={16} 
                  className="text-success group-hover:text-success/80" 
                />
              </button>

              {/* Volume */}
              <button className="p-1 rounded-lg hover:bg-white/10 transition-all duration-300 group">
                <Icon 
                  name="Volume2" 
                  size={16} 
                  className="text-muted-foreground group-hover:text-foreground" 
                />
              </button>

              {/* Battery */}
              <button className="p-1 rounded-lg hover:bg-white/10 transition-all duration-300 group">
                <Icon 
                  name={getBatteryIcon()} 
                  size={16} 
                  className={`${systemStats?.battery > 25 ? 'text-success' : 'text-warning'} group-hover:opacity-80`}
                />
              </button>
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-border/30" />

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={handleNotificationClick}
                className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300 group relative"
              >
                <Icon 
                  name="Bell" 
                  size={16} 
                  className="text-muted-foreground group-hover:text-foreground" 
                />
                {notifications?.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-accent-foreground">
                      {notifications?.length}
                    </span>
                  </div>
                )}
              </button>

              {/* Notifications Panel */}
              {showNotifications && (
                <div className="absolute bottom-full right-0 mb-2 w-80 glass-card rounded-xl shadow-floating border border-border/30 overflow-hidden">
                  <div className="p-4 border-b border-border/20">
                    <h3 className="font-body text-sm font-semibold text-foreground">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications?.length > 0 ? (
                      notifications?.map((notif) => (
                        <div key={notif?.id} className="p-4 border-b border-border/10 hover:bg-muted/5 transition-colors duration-300">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                                <Icon 
                                  name={notif?.type === 'love' ? 'Heart' : 'Calendar'} 
                                  size={14} 
                                  className="text-white" 
                                />
                              </div>
                              <div className="flex-1">
                                <p className="font-body text-sm text-foreground">{notif?.message}</p>
                                <p className="font-caption text-xs text-muted-foreground mt-1">{notif?.time}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => clearNotification(notif?.id)}
                              className="p-1 rounded-lg hover:bg-error/10 text-muted-foreground hover:text-error transition-all duration-300"
                            >
                              <Icon name="X" size={12} />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <Icon name="Bell" size={32} className="text-muted-foreground mx-auto mb-2" />
                        <p className="font-body text-sm text-muted-foreground">No new notifications</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-border/30" />

            {/* Date & Time */}
            <button className="text-right hover:bg-white/10 rounded-lg p-2 transition-all duration-300 group">
              <div className="font-mono text-sm font-medium text-foreground group-hover:text-primary">
                {formatTime(currentTime)}
              </div>
              <div className="font-caption text-xs text-muted-foreground group-hover:text-primary/80">
                {formatDate(currentTime)}
              </div>
            </button>
          </div>
        </div>
      </div>
      {/* Start Menu Button */}
      <div className="fixed bottom-4 left-4 z-80">
        <button
          onClick={onStartMenuToggle}
          className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-floating hover:shadow-strong transition-all duration-300 hover:scale-110 group border-2 border-white/20 hover:border-white/40"
        >
          <Icon 
            name="Heart" 
            size={20} 
            className="text-white group-hover:animate-heart-pulse" 
          />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
        </button>
      </div>
      {/* Notification Backdrop */}
      {showNotifications && (
        <div 
          className="fixed inset-0 z-70"
          onClick={() => setShowNotifications(false)}
        />
      )}
    </>
  );
};

export default SystemTray;
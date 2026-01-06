import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SystemTray = ({ onStartMenuToggle }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'love', message: 'New love letter received from your sweetheart', time: '2 min ago' },
    { id: 2, type: 'reminder', message: 'Anniversary celebration in 3 days', time: '1 hour ago' },
    { id: 3, type: 'photo', message: 'New photos added to timeline', time: '3 hours ago' }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [systemStats] = useState({
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

  // Mobile Notification Panel
  if (showNotifications) {
    return (
      <>
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-90"
          onClick={() => setShowNotifications(false)}
        />
        
        <div className="fixed top-16 left-4 right-4 z-95 bg-white/95 backdrop-blur-xl rounded-2xl shadow-floating border border-pink-200/30 max-h-96 overflow-hidden">
          <div className="p-4 border-b border-pink-200/30">
            <div className="flex items-center justify-between">
              <h3 className="font-body text-lg font-semibold text-foreground">Love Notifications</h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="p-2 rounded-full hover:bg-muted/20 transition-colors duration-300"
              >
                <Icon name="X" size={14} className="text-muted-foreground" />
              </button>
            </div>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {notifications?.length > 0 ? (
              notifications?.map((notif) => (
                <div key={notif?.id} className="p-4 border-b border-pink-200/20 hover:bg-pink-50/30 transition-colors duration-300">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon 
                        name={notif?.type === 'love' ? 'Heart' : notif?.type === 'reminder' ? 'Calendar' : 'Camera'} 
                        size={16} 
                        className="text-white" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm text-foreground leading-relaxed pr-2">
                        {notif?.message}
                      </p>
                      <p className="font-caption text-xs text-muted-foreground mt-1">
                        {notif?.time}
                      </p>
                    </div>
                    <button
                      onClick={() => clearNotification(notif?.id)}
                      className="p-1 rounded-lg hover:bg-error/10 text-muted-foreground hover:text-error transition-all duration-300 flex-shrink-0"
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
      </>
    );
  }

  // Mobile Notification Bell (only visible when there are notifications)
  return notifications?.length > 0 ? (
    <button
      onClick={handleNotificationClick}
      className="fixed top-4 right-4 z-40 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-soft border border-pink-200/30 flex items-center justify-center hover:scale-105 transition-all duration-300"
    >
      <Icon name="Bell" size={16} className="text-primary" />
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
        <span className="text-xs font-bold text-accent-foreground">
          {notifications?.length}
        </span>
      </div>
    </button>
  ) : null;
};

export default SystemTray;
import React from 'react';

const DesktopWallpaper = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Mobile-First Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50" />
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-100/30 via-transparent to-purple-100/30 animate-pulse" 
           style={{ animationDuration: '4s' }} />
      
      {/* Floating Hearts - Reduced for Mobile */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)]?.map((_, i) => (
          <div
            key={`heart-${i}`}
            className="absolute animate-float opacity-20"
            style={{
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 3) * 30}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${8 + (i % 3) * 2}s`
            }}
          >
            <span className="text-pink-400 text-lg">💕</span>
          </div>
        ))}
        
        {/* Sparkles */}
        {[...Array(6)]?.map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute animate-twinkle"
            style={{
              right: `${5 + i * 18}%`,
              top: `${20 + (i % 2) * 35}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${3 + (i % 2)}s`
            }}
          >
            <span className="text-yellow-300 text-sm">✨</span>
          </div>
        ))}
      </div>

      {/* Subtle Light Effects */}
      <div className="absolute inset-0">
        {[...Array(3)]?.map((_, i) => (
          <div
            key={`light-${i}`}
            className="absolute rounded-full bg-gradient-radial from-pink-200/20 to-transparent blur-xl animate-pulse"
            style={{
              left: `${20 + i * 30}%`,
              top: `${25 + i * 25}%`,
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              animationDelay: `${i * 3}s`,
              animationDuration: '6s'
            }}
          />
        ))}
      </div>

      {/* Soft Pattern Overlay for Texture */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            radial-gradient(circle at 2px 2px, rgba(255,192,203,0.3) 1px, transparent 0)
          `,
          backgroundSize: '30px 30px'
        }}
      />

      {/* Bottom Fade for Better Content Readability */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/10 to-transparent" />
    </div>
  );
};

export default DesktopWallpaper;
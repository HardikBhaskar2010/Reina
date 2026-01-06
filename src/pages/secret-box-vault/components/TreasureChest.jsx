import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TreasureChest = ({ isLocked, onUnlock, isUnlocking }) => {
  const [glowIntensity, setGlowIntensity] = useState(0.3);
  const [floatingHearts, setFloatingHearts] = useState([]);

  useEffect(() => {
    const glowTimer = setInterval(() => {
      setGlowIntensity(prev => 0.2 + Math.sin(Date.now() / 1000) * 0.2);
    }, 100);

    return () => clearInterval(glowTimer);
  }, []);

  useEffect(() => {
    if (!isLocked) {
      // Generate floating hearts on unlock
      const hearts = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: i * 0.1,
        size: 16 + Math.random() * 8
      }));
      setFloatingHearts(hearts);
    }
  }, [isLocked]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[500px] p-8">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div 
          className="absolute inset-0 bg-gradient-radial from-accent/20 via-primary/10 to-transparent"
          style={{ 
            opacity: glowIntensity,
            background: `radial-gradient(circle at 50% 50%, rgba(255, 215, 0, ${glowIntensity}) 0%, rgba(255, 209, 232, 0.1) 50%, transparent 100%)`
          }}
        />
        
        {/* Floating Sparkles */}
        {[...Array(8)]?.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent rounded-full"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
          />
        ))}
      </div>
      {/* Main Treasure Chest */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative">
          {/* Chest Base */}
          <motion.div
            className={`
              w-64 h-40 rounded-2xl border-4 border-accent/50 relative overflow-hidden
              ${isLocked 
                ? 'bg-gradient-to-br from-amber-100 to-amber-200' :'bg-gradient-to-br from-accent/20 to-primary/30'
              }
            `}
            animate={isUnlocking ? { 
              rotateY: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            } : {}}
            transition={{ duration: 0.6 }}
            style={{
              boxShadow: `0 20px 40px rgba(255, 215, 0, ${glowIntensity}), inset 0 2px 10px rgba(255, 255, 255, 0.3)`
            }}
          >
            {/* Chest Decorative Elements */}
            <div className="absolute inset-2 border-2 border-accent/30 rounded-xl" />
            <div className="absolute top-4 left-4 w-4 h-4 bg-accent rounded-full opacity-60" />
            <div className="absolute top-4 right-4 w-4 h-4 bg-accent rounded-full opacity-60" />
            <div className="absolute bottom-4 left-4 w-4 h-4 bg-accent rounded-full opacity-60" />
            <div className="absolute bottom-4 right-4 w-4 h-4 bg-accent rounded-full opacity-60" />
            
            {/* Center Ornament */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <Icon name="Heart" size={24} className="text-white" />
              </div>
            </div>
          </motion.div>

          {/* Chest Lid */}
          <motion.div
            className={`
              absolute -top-6 left-0 w-64 h-16 rounded-t-2xl border-4 border-accent/50 origin-bottom
              ${isLocked 
                ? 'bg-gradient-to-br from-amber-200 to-amber-300' :'bg-gradient-to-br from-accent/30 to-primary/40'
              }
            `}
            animate={isLocked ? { rotateX: 0 } : { rotateX: -120 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{
              boxShadow: `0 -10px 20px rgba(255, 215, 0, ${glowIntensity * 0.8}), inset 0 2px 10px rgba(255, 255, 255, 0.3)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Lid Decorations */}
            <div className="absolute inset-2 border-2 border-accent/30 rounded-t-xl" />
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-yellow-400 rounded-full flex items-center justify-center">
                <Icon name="Crown" size={16} className="text-white" />
              </div>
            </div>
          </motion.div>

          {/* Lock Mechanism */}
          <AnimatePresence>
            {isLocked && (
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                initial={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0, rotateZ: 360 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <div className="w-12 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex flex-col items-center justify-center shadow-lg">
                  <div className="w-8 h-8 border-4 border-gray-700 rounded-full mb-1" />
                  <div className="w-2 h-4 bg-gray-700 rounded-full" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unlock Key Animation */}
          <AnimatePresence>
            {isUnlocking && (
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
                initial={{ x: -100, opacity: 0, rotateZ: -45 }}
                animate={{ x: 0, opacity: 1, rotateZ: 0 }}
                exit={{ x: 100, opacity: 0, rotateZ: 45 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                <div className="w-16 h-6 bg-gradient-to-r from-accent to-yellow-400 rounded-full flex items-center justify-end pr-2 shadow-lg">
                  <div className="w-4 h-4 bg-white rounded-sm" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Hearts on Unlock */}
        <AnimatePresence>
          {!isLocked && floatingHearts?.map((heart) => (
            <motion.div
              key={heart?.id}
              className="absolute text-accent pointer-events-none"
              style={{
                left: `${heart?.x}%`,
                top: `${heart?.y}%`,
              }}
              initial={{ scale: 0, opacity: 0, y: 0 }}
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: [-50, -100, -150],
                rotateZ: [0, 360]
              }}
              transition={{
                duration: 3,
                delay: heart?.delay,
                ease: "easeOut"
              }}
            >
              <Icon name="Heart" size={heart?.size} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {/* Unlock Button */}
      <motion.div
        className="mt-12 z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <motion.button
          onClick={onUnlock}
          disabled={isUnlocking || !isLocked}
          className={`
            px-8 py-4 rounded-2xl font-body font-semibold text-lg
            ${isLocked 
              ? 'bg-gradient-to-r from-accent to-yellow-400 text-white shadow-lg hover:shadow-xl' 
              : 'bg-success/20 text-success-foreground cursor-not-allowed'
            }
            transition-all duration-300 disabled:opacity-50
          `}
          whileHover={isLocked ? { scale: 1.05, y: -2 } : {}}
          whileTap={isLocked ? { scale: 0.98 } : {}}
        >
          <div className="flex items-center space-x-3">
            <Icon 
              name={isLocked ? "Key" : "Check"} 
              size={20} 
              className={isUnlocking ? "animate-spin" : ""} 
            />
            <span>
              {isUnlocking ? "Unlocking..." : isLocked ? "Unlock Secret Box" : "Unlocked"}
            </span>
          </div>
        </motion.button>
      </motion.div>
      {/* Status Text */}
      <motion.p
        className="mt-4 font-body text-sm text-muted-foreground text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {isLocked 
          ? "Enter your secret to access your most precious memories" :"Your secret treasures await within this sacred space"
        }
      </motion.p>
    </div>
  );
};

export default TreasureChest;
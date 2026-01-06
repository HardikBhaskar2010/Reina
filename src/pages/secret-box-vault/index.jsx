import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/ui/Header';
import TreasureChest from './components/TreasureChest';
import AuthenticationModal from './components/AuthenticationModal';
import SecretContent from './components/SecretContent';
import Icon from '../../components/AppIcon';


const SecretBoxVault = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [unlockAnimation, setUnlockAnimation] = useState(false);

  // Auto-lock after inactivity
  useEffect(() => {
    let inactivityTimer;
    
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      if (!isLocked) {
        inactivityTimer = setTimeout(() => {
          handleLock();
        }, 300000); // 5 minutes
      }
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events?.forEach(event => {
      document.addEventListener(event, resetTimer, true);
    });

    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      events?.forEach(event => {
        document.removeEventListener(event, resetTimer, true);
      });
    };
  }, [isLocked]);

  const handleUnlockRequest = () => {
    setShowAuthModal(true);
  };

  const handleAuthenticate = () => {
    setIsAuthenticating(true);
    setShowAuthModal(false);
    setIsUnlocking(true);

    // Simulate authentication process
    setTimeout(() => {
      setIsAuthenticating(false);
      setUnlockAnimation(true);
      
      // Play unlock animation
      setTimeout(() => {
        setIsLocked(false);
        setIsUnlocking(false);
        setUnlockAnimation(false);
        
        // Trigger confetti effect
        createConfetti();
      }, 2000);
    }, 1500);
  };

  const handleLock = () => {
    setIsLocked(true);
    setShowAuthModal(false);
    setIsUnlocking(false);
    setIsAuthenticating(false);
    setUnlockAnimation(false);
  };

  const createConfetti = () => {
    // Create confetti elements
    const colors = ['#FFD1E8', '#FFC0CB', '#FFD700', '#98D8C8', '#F7A4A4'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors?.[Math.floor(Math.random() * colors?.length)];
      confetti.style.borderRadius = '50%';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '1000';
      confetti.style.animation = `confetti-fall ${2 + Math.random() * 3}s linear forwards`;
      
      document.body?.appendChild(confetti);
      
      setTimeout(() => {
        confetti?.remove();
      }, 5000);
    }
  };

  // Add confetti animation styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes confetti-fall {
        0% {
          transform: translateY(-100vh) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
    `;
    document.head?.appendChild(style);
    
    return () => {
      document.head?.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 relative overflow-hidden">
      <Header />
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Hearts */}
        {[...Array(6)]?.map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-primary/10"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          >
            <div className="text-2xl">💕</div>
          </motion.div>
        ))}

        {/* Sakura Petals */}
        {[...Array(4)]?.map((_, i) => (
          <motion.div
            key={`petal-${i}`}
            className="absolute text-accent/10"
            style={{
              right: `${5 + i * 20}%`,
              top: `${15 + i * 20}%`,
            }}
            animate={{
              y: [-15, 25, -15],
              x: [-10, 10, -10],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 5 + i * 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4
            }}
          >
            <div className="text-xl">🌸</div>
          </motion.div>
        ))}

        {/* Sparkle Effects */}
        {[...Array(12)]?.map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-1 h-1 bg-accent rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
      {/* Main Content */}
      <div className="relative z-10 pt-20">
        <AnimatePresence mode="wait">
          {isLocked ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="container mx-auto px-4"
            >
              {/* Header Section */}
              <div className="text-center mb-8">
                <motion.h1
                  className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Secret Box Vault
                </motion.h1>
                <motion.p
                  className="font-body text-lg text-muted-foreground max-w-2xl mx-auto"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Your most precious and intimate memories are safely protected within this enchanted treasure chest. 
                  Only you hold the key to unlock these sacred secrets.
                </motion.p>
              </div>

              {/* Treasure Chest */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <TreasureChest
                  isLocked={isLocked}
                  onUnlock={handleUnlockRequest}
                  isUnlocking={isUnlocking || unlockAnimation}
                />
              </motion.div>

              {/* Security Features */}
              <motion.div
                className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {[
                  {
                    icon: 'Shield',
                    title: 'End-to-End Encryption',
                    description: 'Your secrets are protected with military-grade encryption'
                  },
                  {
                    icon: 'Eye',
                    title: 'Biometric Security',
                    description: 'Advanced authentication keeps your vault secure'
                  },
                  {
                    icon: 'Timer',
                    title: 'Auto-Lock Protection',
                    description: 'Automatically locks after periods of inactivity'
                  }
                ]?.map((feature, index) => (
                  <motion.div
                    key={feature?.title}
                    className="glass-card rounded-2xl p-6 text-center shadow-soft hover:shadow-medium transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name={feature?.icon} size={24} className="text-primary" />
                    </div>
                    <h3 className="font-body text-lg font-semibold text-foreground mb-2">
                      {feature?.title}
                    </h3>
                    <p className="font-caption text-sm text-muted-foreground">
                      {feature?.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <SecretContent onLock={handleLock} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Authentication Modal */}
      <AuthenticationModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthenticate={handleAuthenticate}
        isAuthenticating={isAuthenticating}
      />
      {/* Unlock Success Overlay */}
      <AnimatePresence>
        {unlockAnimation && (
          <motion.div
            className="fixed inset-0 z-90 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-8xl mb-4">🎉</div>
              <h2 className="font-heading text-3xl font-bold text-accent mb-2">
                Vault Unlocked!
              </h2>
              <p className="font-body text-lg text-muted-foreground">
                Welcome to your secret sanctuary
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SecretBoxVault;
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Heart {
  id: number;
  left: number;
  delay: number;
  duration: number;
  emoji: string;
}

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Generate 8 floating hearts
    const heartEmojis = ['💕', '💖', '💗', '💝', '💓', '💞', '💘', '❤️'];
    const newHearts: Heart[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 90 + 5, // 5% to 95%
      delay: Math.random() * 2,
      duration: 8 + Math.random() * 4, // 8-12 seconds
      emoji: heartEmojis[i % heartEmojis.length],
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-3xl opacity-30"
            style={{ left: `${heart.left}%` }}
            initial={{ y: '110vh', opacity: 0, rotate: 0 }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.3, 0.3, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {heart.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingHearts;

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Satunnaiset elementit, joita voi tippua
const EMOJIS = ["🍌", "🎵", "🐒", "🎼", "🎹", "🥁", "🎸", "🎤", "🎶", "🍌", "🍌", "🍌", "🍌"];

interface Particle {
  id: number;
  emoji: string;
  x: number;
  delay: number;
  duration: number;
  drift: number;
}

/* eslint-disable react-refresh/only-export-components */
export const useMolyRain = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const triggerRain = useCallback(() => {
    const newParticles = Array.from({ length: 15 }).map(() => ({
      id: Math.random(),
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)], // Arvotaan emoji
      x: Math.random() * 100, // Satunnainen aloituskohta (0-100vw)
      delay: Math.random() * 0.5, // Satunnainen viive
      duration: 2 + Math.random() * 2, // Satunnainen putoamisnopeus
      drift: (Math.random() - 0.2) * 200, // Satunnainen sivuttaisliike
    }));

    setParticles((prev) => [...prev, ...newParticles]);

    // Siivotaan elementit pois ruudulta hetken kuluttua
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find(np => np.id === p.id)));
    }, 5000);
  }, []);

  return { particles, triggerRain };
};

export const MolyRainDisplay = ({ particles }: { particles: Particle[] }) => (
  <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
    <AnimatePresence>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -50, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ 
            y: "110vh", 
            x: `${p.x + (p.drift / 10)}vw`, 
            rotate: 360 * (p.duration > 3 ? 1 : -1) // Pyörii satunnaiseen suuntaan
          }}
          transition={{ 
            duration: p.duration, 
            delay: p.delay, 
            ease: "linear" 
          }}
          className="absolute text-4xl md:text-5xl"
        >
          {p.emoji}
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);
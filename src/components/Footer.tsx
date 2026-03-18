import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-background py-16 border-t-4 border-primary/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-heading text-4xl text-slate-900 mb-4 tracking-tight text-shadow-fun">
            🐒 Mölyapinat 🐒
          </p>
          <p className="font-body text-slate-600 text-lg mb-10">
            © 2026 Mölyapinat. Kaikki oikeudet pidätetään. <br />
            Lastenmusiikkia suurella sydämellä ja kovalla metelillä! 🍌
          </p>
          
          <div className="flex justify-center gap-8 items-center mb-10 text-4xl group/emojis">
            {[ "🍌", "🎵", "🐒", "🎶", "🍌" ].map((emoji, idx) => (
              <motion.span
                key={idx}
                className="cursor-default"
                animate={{ 
                  y: [0, -12, 0],
                  scale: [1, 1.25, 1],
                  rotate: [0, 15, -15, 0]
                }}
                whileHover={{ 
                  scale: 1.5,
                  rotate: [0, -20, 20, 0],
                  transition: { duration: 0.3 } 
                }}
                transition={{ 
                  duration: 3 + idx * 0.2, 
                  repeat: Infinity, 
                  ease: "easeInOut"
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>

          <div className="mt-12 text-slate-400 font-body text-sm uppercase tracking-widest font-bold">
            Sivumaakarit 2026
          </div>
        </motion.div>
      </div>

      {/* Takaisin ylös -painike */}
      <BackToTop />
    </footer>
  );
};

const BackToTop = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`back-to-top rounded-2xl ${scrolled ? 'glass-bg' : 'wood-texture'} hover:scale-110 active:scale-95`}
        >
          🔝
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default Footer;


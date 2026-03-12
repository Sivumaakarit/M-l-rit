import { motion } from "framer-motion";
import { useState } from "react";
import logoImage from "@/assets/logo.webp";

const FloatingElements = () => {
  const elements = [
    { emoji: "🍌", left: "5%", top: "20%", delay: 0 },
    { emoji: "🎵", left: "90%", top: "15%", delay: 1 },
    { emoji: "🍌", left: "85%", top: "60%", delay: 2 },
    { emoji: "🎶", left: "10%", top: "70%", delay: 1.5 },
    { emoji: "🍌", left: "50%", top: "10%", delay: 0.5 },
    { emoji: "🎵", left: "20%", top: "40%", delay: 2.5 },
    { emoji: "🍌", left: "75%", top: "35%", delay: 3 },
    { emoji: "🎶", left: "40%", top: "75%", delay: 1.8 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl md:text-6xl opacity-30 select-none will-change-transform"
          style={{ left: element.left, top: element.top }}
          initial={{ y: 0, rotate: 0 }}
          animate={{
            y: [-25, 25, -25],
            rotate: [-15, 15, -15],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut",
          }}
        >
          {element.emoji}
        </motion.div>
      ))}
    </div>
  );
};

const HeroSection = () => {
  const [monkeyPos, setMonkeyPos] = useState({ x: 0, y: 0, rotate: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    const side = Math.random() > 0.5 ? 1 : -1;
    const xMove = side === 1 
      ? (15 + Math.random() * 5)
      : (18 + Math.random() * 6) * -1;
    
    setMonkeyPos({
      x: xMove,
      y: -45 - Math.random() * 15,
      rotate: (15 + Math.random() * 15) * side,
    });
    setIsHovered(true);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] pt-24 md:pt-32 pb-48 bg-gradient-forest overflow-x-hidden flex items-center justify-center"
    >
      <FloatingElements />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="hidden md:flex justify-center mb-8">
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img 
                src={logoImage} 
                alt="Mölyapinat logo" 
                className="h-20 md:h-48 w-auto drop-shadow-2xl" 
                fetchPriority="high"
              />
            </motion.div>
          </div>

          <h1 className="font-heading text-[10vw] min-[375px]:text-5xl md:text-6xl lg:text-7xl text-wood-dark mb-6 drop-shadow-sm flex items-center justify-center gap-4 flex-wrap">
            <span className="text-shadow-fun text-center px-4">Tervetuloa Mölymetsään!</span>
            
            <span 
              className="relative inline-block cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.span
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl md:text-6xl pointer-events-none"
                initial={{ opacity: 0, scale: 0 }}
                animate={isHovered ? { 
                  opacity: 1, 
                  scale: 1,
                  x: monkeyPos.x, 
                  y: monkeyPos.y, 
                  rotate: monkeyPos.rotate 
                } : { 
                  opacity: 0, 
                  scale: 0, 
                  x: 0, 
                  y: 0, 
                  rotate: 0 
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                🐒
              </motion.span>

              <motion.span
                className="relative z-20 inline-block text-4xl md:text-8xl"
                style={{ transformOrigin: "bottom center" }}
                animate={isHovered ? { scale: 1.25, rotate: -3 } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                🌲
                {!isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2, duration: 1 }}
                  className="absolute -right-36 -top-10 whitespace-nowrap hidden lg:block"
                >
                  <div className="flex flex-col items-start">
                    <span className="font-heading text-xl text-forest-green animate-bounce text-shadow-fun">
                      Kuka kurkkaa?
                    </span>
                    <svg width="60" height="40" viewBox="0 0 60 40" fill="none" className="-rotate-12 mt-2">
                      <path 
                        d="M50 10 Q30 10 10 30 M10 30 L25 30 M10 30 L10 15" 
                        stroke="currentColor" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                    </svg>
                  </div>
                </motion.div>
                )}
              </motion.span>
            </span>
          </h1>

          <p className="font-body text-xl md:text-2xl text-wood-dark max-w-2xl mx-auto font-bold leading-relaxed">
            Mölyapinat on energinen lastenmusiikkibändi, joka saa koko perheen liikkeelle. Keikoillamme yhdistyvät iloiset laulut, vauhdikas vuorovaikutus sekä ripaus teatteria! 🍌
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="lauta-bg p-4 md:p-6 shadow-2xl">
            <div className="aspect-video rounded-xl overflow-hidden shadow-inner bg-black/10">
              <iframe
                src="https://www.youtube.com/embed/-zA1vEvMvxA"
                title="Mölyapinat - Banaanitanssi"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
            </div>
            <p className="text-center mt-6 font-heading text-2xl md:text-3xl text-bright-orange text-shadow-fun">
              🍌 Katso video ja harjoittele Banaanitanssi 🍌
            </p>
          </div>
        </motion.div>
      </div>

{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <div className="absolute bottom-0 left-0 w-full wave-divider" style={{ '--wave-color': 'hsl(var(--background))' } as any}></div>
    </section>
  );
};

export default HeroSection;
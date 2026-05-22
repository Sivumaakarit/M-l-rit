import { motion } from "framer-motion";
import { useState } from "react";
const logoImage = "/logo.webp";

const SpotifyIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.508 17.304c-.216.354-.672.468-1.026.252-2.862-1.746-6.462-2.142-10.704-1.176-.408.096-.816-.162-.912-.57-.096-.408.162-.816.57-.912 4.644-1.062 8.622-.612 11.82 1.338.354.216.468.672.252 1.026zm1.47-3.258c-.276.45-.858.594-1.308.318-3.276-2.016-8.274-2.598-12.144-1.422-.51.156-1.044-.144-1.194-.654-.15-.51.144-1.044.654-1.194 4.41-1.338 9.924-.702 13.686 1.614.45.276.594.858.318 1.308zm.138-3.39c-3.93-2.334-10.422-2.55-14.19-1.41-.606.186-1.248-.168-1.434-.774-.186-.606.168-1.248.774-1.434 4.332-1.314 11.49-1.062 16.038 1.638.546.33.726 1.044.396 1.59-.33.546-1.044.726-1.59.396z" />
  </svg>
);


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
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ contain: 'strict' }}>
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl md:text-6xl opacity-30 select-none will-change-transform"
          style={{ left: element.left, top: element.top }}
          initial={{ y: 0, rotate: 0 }}
          animate={{
            y: ["-1.5rem", "1.5rem", "-1.5rem"],
            rotate: [-15, 15, -15],
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
  const [showVideo, setShowVideo] = useState(false);

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

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      id="alkuun"
      className="relative min-h-[90vh] pt-24 md:pt-32 pb-24 md:pb-48 bg-gradient-forest flex items-center justify-center"
    >
      <FloatingElements />

      <div className="container mx-auto px-4 relative z-[45]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 relative z-[45]"
        >
          <div className="relative flex flex-col items-center justify-center mb-8 z-[45] max-w-4xl mx-auto w-full">
            {/* Logo - TÄYDELLISESTI KESKITETTY */}
            <motion.div
              animate={{ rotate: [0, -4, 4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="will-change-transform hidden md:flex justify-center"
            >
              <img
                src="/logo.webp"
                alt="Mölyapinat-yhtyeen virallinen logo, jossa on iloinen apinahahmo"
                className="h-28 md:h-48 w-auto drop-shadow-2xl"
                fetchPriority="high"
                loading="eager"
                width="400"
                height="400"
              />
            </motion.div>

            {/* Hanging Spotify Sign - Asetetaan absoluuttisesti sivuun tietokoneella (ei siirrä logoa!), ja pinoontuu mobiilissa logon alle */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center mt-1 md:mt-0 md:absolute md:-top-11 md:left-16 lg:left-10 xl:left-6 z-[45]"
            >

              {/* Puinen Kyltti */}
              <motion.a
                href="#uusi-julkaisu"
                onClick={(e) => scrollToSection(e, "#uusi-julkaisu")}
                initial={{ rotate: -2, y: 0 }}
                animate={{ 
                  rotate: [-3.5, 3.5, -3.5],
                  y: [0, -6, 0]
                }}
                transition={{
                  rotate: { repeat: Infinity, duration: 5, ease: "easeInOut" },
                  y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" }
                }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                className="wood-clean px-4 py-2.5 md:px-5 md:py-3.5 rounded-2xl shadow-xl border-3 border-wood-dark flex items-center gap-3 cursor-pointer relative group max-w-[280px] min-[375px]:max-w-[320px] md:max-w-xs w-auto hover:bg-banana/10 transition-colors overflow-hidden"
              >
                {/* Premium Shimmer Light Kiiltoefekti */}
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] animate-shimmer pointer-events-none z-20" />
                {/* Vihreä Spotify-kuvake hohteella */}
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-neon-green/40 blur-md rounded-full animate-ping scale-125" />
                  <div className="bg-neon-green text-slate-900 p-2 rounded-full border-2 border-wood-dark relative z-10 group-hover:scale-110 transition-transform">
                    <SpotifyIcon className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>

                {/* Tekstit - Max 2 riviä */}
                <div className="text-left">
                  <h3 className="font-heading text-sm md:text-base text-wood-dark leading-tight">
                    Uusi sinkku julkaistu! 💿
                  </h3>
                  <p className="font-body text-[10px] md:text-xs text-forest-green font-bold flex items-center gap-1 mt-0.5">
                    Paina tästä ja lue lisää 🍌
                  </p>
                </div>
              </motion.a>
            </motion.div>
          </div>

          <h1 className="font-heading text-[10vw] min-[375px]:text-5xl md:text-6xl lg:text-7xl text-wood-dark mb-6 drop-shadow-sm flex items-center justify-center gap-4 flex-wrap">
            <span className="sr-only">Mölyapinat - Suomen paras lastenmusiikkibändi keikalle ja tapahtumiin.</span>
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
                  className="absolute -right-36 -top-14 whitespace-nowrap hidden lg:block"
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
            Mölyapinat on energinen lastenmusiikkibändi, joka tarjoaa osallistavia esityksiä, tarttuvaa musiikkia ja teatraalisia seikkailuja koko perheelle ympäri Suomen. 🍌
          </p>
        </motion.div>



        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="lauta-bg p-4 md:p-6 shadow-2xl">

            <div className="aspect-video rounded-xl overflow-hidden shadow-inner bg-black/10 relative group">
              {!showVideo ? (
                <button 
                  onClick={() => setShowVideo(true)}
                  className="w-full h-full relative flex items-center justify-center overflow-hidden transition-transform duration-500 hover:scale-[1.02]"
                  aria-label="Pelaa Banaanitanssi video"
                >
                  <img 
                    src="https://img.youtube.com/vi/-zA1vEvMvxA/hqdefault.jpg" 
                    alt="Mölyapinat banaanitanssi musiikkivideo esikatselu" 
                    className="w-full h-full object-cover"
                    width="480"
                    height="360"
                    loading="eager"
                    fetchPriority="high"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute w-20 h-20 md:w-24 md:h-24 bg-bright-orange rounded-full flex items-center justify-center shadow-2xl border-4 border-white transform transition-transform group-hover:scale-110">
                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2" />
                  </div>
                </button>
              ) : (
                <iframe
                  src="https://www.youtube-nocookie.com/embed/-zA1vEvMvxA?autoplay=1"
                  title="Mölyapinat - Banaanitanssi"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}
            </div>
            <p className="text-center mt-6 font-heading text-2xl md:text-3xl text-bright-orange [text-shadow:1px_1px_0_#000,-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000]">
              🍌 Katso video ja harjoittele Banaanitanssi 🍌
            </p>
          </div>
        </motion.div>
      </div>

{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <div className="absolute bottom-0 left-0 w-full wave-divider h-10 md:h-[100px]" style={{ '--wave-color': 'hsl(var(--background))' } as any}></div>
    </section>
  );
};

export default HeroSection;
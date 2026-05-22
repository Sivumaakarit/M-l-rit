import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Music2, Share2, Facebook, Instagram, PlayCircle } from "lucide-react";

const TikTokIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.33-.85.51-1.44 1.42-1.55 2.42-.14 1.01.23 2.1 1.01 2.8.81.75 2.01.93 3 .53.86-.31 1.52-1.07 1.71-1.97.12-.44.12-.9.12-1.35l.02-16.05Z" />
  </svg>
);

const SpotifyIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.508 17.304c-.216.354-.672.468-1.026.252-2.862-1.746-6.462-2.142-10.704-1.176-.408.096-.816-.162-.912-.57-.096-.408.162-.816.57-.912 4.644-1.062 8.622-.612 11.82 1.338.354.216.468.672.252 1.026zm1.47-3.258c-.276.45-.858.594-1.308.318-3.276-2.016-8.274-2.598-12.144-1.422-.51.156-1.044-.144-1.194-.654-.15-.51.144-1.044.654-1.194 4.41-1.338 9.924-.702 13.686 1.614.45.276.594.858.318 1.308zm.138-3.39c-3.93-2.334-10.422-2.55-14.19-1.41-.606.186-1.248-.168-1.434-.774-.186-.606.168-1.248.774-1.434 4.332-1.314 11.49-1.062 16.038 1.638.546.33.726 1.044.396 1.59-.33.546-1.044.726-1.59.396z" />
  </svg>
);

const AppleMusicIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="5.5" fill="#fc3c44" />
    <g transform="translate(2.5, 2.5) scale(0.79)">
      <path d="M19.002 4.908c-.015-.02-.03-.042-.047-.061a5.025 5.025 0 0 0-3.69-1.574c-.456 0-.895.068-1.32.193L9.627 4.93C8.666 5.21 8 6.096 8 7.098v7.887a3.488 3.488 0 0 0-2.5-.985c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5c1.802 0 3.284-1.365 3.473-3.111l.027-10.228 9-2.25v5.52a3.488 3.488 0 0 0-2.5-.985c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5c1.802 0 3.284-1.365 3.473-3.111l.029-7.986c0-.498-.31-.937-.773-1.047z" fill="#ffffff" />
    </g>
  </svg>
);

const DeezerIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M.693 10.024c.381 0 .693-1.256.693-2.807 0-1.55-.312-2.807-.693-2.807C.312 4.41 0 5.666 0 7.217s.312 2.808.693 2.808ZM21.038 1.56c-.364 0-.684.805-.91 2.096C19.765 1.446 19.184 0 18.526 0c-.78 0-1.464 2.036-1.784 5-.312-2.158-.788-3.536-1.325-3.536-.745 0-1.386 2.704-1.62 6.472-.442-1.932-1.083-3.145-1.793-3.145s-1.35 1.213-1.793 3.145c-.242-3.76-.874-6.463-1.628-6.463-.537 0-1.013 1.378-1.325 3.535C6.938 2.036 6.262 0 5.474 0c-.658 0-1.247 1.447-1.602 3.665-.217-1.291-.546-2.105-.91-2.105-.675 0-1.221 2.807-1.221 6.272 0 3.466.546 6.273 1.221 6.273.277 0 .537-.476.736-1.273.32 2.928.996 4.938 1.776 4.938.606 0 1.143-1.204 1.507-3.11.251 3.622.875 6.195 1.602 6.195.46 0 .875-1.023 1.187-2.677C10.142 21.6 11 24 12.004 24c1.005 0 1.863-2.4 2.235-5.822.312 1.654.727 2.677 1.186 2.677.728 0 1.352-2.573 1.603-6.195.364 1.906.9 3.11 1.507 3.11.78 0 1.455-2.01 1.775-4.938.208.797.46 1.273.737 1.273.675 0 1.22-2.807 1.22-6.273-.008-3.457-.553-6.272-1.23-6.272ZM23.307 10.024c.381 0 .693-1.256.693-2.807 0-1.55-.312-2.807-.693-2.807-.381 0-.693 1.256-.693 2.807s.312 2.808.693 2.808Z" fill="#a238ff" />
  </svg>
);

const TidalIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M6 8l3 3-3 3-3-3zm6 0l3 3-3 3-3-3zm6 0l3 3-3 3-3-3zm-6 6l3 3-3 3-3-3z" fill="#000000" />
  </svg>
);

const YoutubeMusicIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" fill="none">
    <circle cx="12" cy="12" r="12" fill="#ff0000" />
    <circle cx="12" cy="12" r="7.5" stroke="#ffffff" strokeWidth="1.8" fill="none" />
    <path d="M10.2 8.8L15.4 12L10.2 15.2V8.8Z" fill="#ffffff" />
  </svg>
);

const MusicSection = () => {
  const [showSpotify, setShowSpotify] = useState(false);

  return (
    <section id="musiikki" className="pt-12 md:pt-24 pb-24 md:pb-48 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block wood-clean rounded-3xl px-10 py-5 shadow-xl mb-6">
            <h2 className="font-heading text-3xl md:text-5xl text-wood-dark text-shadow-fun">
              🐒 Kuuntele Mölyapinoiden musiikkia 🐒
            </h2>
          </div>
          <p className="font-body text-xl text-wood-dark max-w-xl mx-auto font-bold">
            Löydät meidät kaikista suosituimmista <span className="text-forest-green">suoratoistopalveluista!</span>
          </p>
        </motion.div>

        {/* UUTISOSIO / UUSIN JULKAISU - SPOTLIGHT-KORTTI */}
        <motion.div
          id="uusi-julkaisu"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -8, scale: 1.01 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          onClick={() => {
            setShowSpotify(true);
            const element = document.getElementById("musiikki-soitin");
            if (element) {
              const headerOffset = 100;
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.scrollY - headerOffset;
              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
              });
            }
          }}
          className="lauta-clean p-6 md:p-8 max-w-4xl mx-auto mb-16 cursor-pointer relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-2xl border-4 border-wood-dark/20 transition-all duration-300 hover:shadow-bright-orange/10"
        >
          {/* Pyörivä vinyyli / Spinning Banana Vinyl */}
          <div className="relative w-28 h-28 md:w-32 md:h-32 flex-shrink-0 mx-auto md:mx-0">
            <motion.div
              animate={{
                rotate: 360
              }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 12
              }}
              className="w-full h-full bg-slate-900 rounded-full border-4 border-wood-dark shadow-xl flex items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-2 border border-white/5 rounded-full" />
              <div className="absolute inset-4 border border-white/5 rounded-full" />
              <div className="absolute inset-6 border border-white/5 rounded-full" />
              <div className="absolute inset-8 border border-white/5 rounded-full" />
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full border-2 border-wood-dark flex items-center justify-center">
                <span className="text-xl md:text-2xl select-none">
                  🍌
                </span>
              </div>
            </motion.div>
            <div className="absolute top-1 right-1 text-2xl filter drop-shadow">
              ⚡
            </div>
          </div>

          {/* Tekstisisältö oikealla */}
          <div className="flex-grow text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-bright-orange text-white font-heading text-xs px-3 py-1 rounded-full uppercase tracking-wider animate-pulse border-2 border-wood-dark shadow mb-3">
              Uutuus! 💿
            </div>
            <h3 className="font-heading text-2xl md:text-3xl text-wood-dark leading-tight mb-2">
              Mölyapinat - Kolme banaania kulhossa! 🎶
            </h3>
            <p className="font-body text-base text-wood-dark/80 font-bold max-w-xl leading-relaxed">
              Mölymetsän keinuvin uusi hitti on nyt julkaistu! Mutta mihin kummaan ne banaanit katoavat?
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSpotify(true);
                  const element = document.getElementById("musiikki-soitin");
                  if (element) {
                    const headerOffset = 100;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth"
                    });
                  }
                }}
                className="bg-neon-green text-slate-900 font-heading px-6 py-2.5 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2 text-sm font-bold border-2 border-wood-dark"
              >
                <PlayCircle className="w-5 h-5" />
                Kuuntele alta 🎵
              </button>
              <motion.a
                href="https://open.spotify.com/album/2ktaRAxxPhajYRs0QdOdpd?si=szE5A6JuSs2l0Q7xcGtU-g"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.05 }}
                className="bg-white text-wood-dark border-2 border-neon-green font-heading px-6 py-2 rounded-full shadow-lg hover:border-bright-orange transition-all flex items-center gap-2 text-sm font-bold"
              >
                <SpotifyIcon />
                Kuuntele Spotifyssa 🎧
              </motion.a>
            </div>
          </div>
        </motion.div>

        <div id="musiikki-soitin" className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lauta-clean p-6 shadow-2xl"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-inner border-4 border-wood-dark/10 min-h-[400px] flex items-center justify-center relative">
              {!showSpotify ? (
                <div
                  className="w-full h-full absolute inset-0 bg-slate-900 group cursor-pointer flex flex-col items-center justify-center p-8 text-center transition-all hover:bg-slate-800"
                  onClick={() => setShowSpotify(true)}
                >
                  <div className="bg-neon-green/20 p-6 rounded-full mb-6 group-hover:scale-110 transition-transform">
                    <SpotifyIcon />
                  </div>
                  <h3 className="font-heading text-2xl text-white mb-2">Mölyapinat Spotifyssa</h3>
                  <p className="font-body text-white/60 mb-8 max-w-xs">Lataa soitin ja hyppää Mölymetsän banaanitanssiin! 🍌</p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 bg-neon-green text-slate-900 font-heading text-xl px-8 py-3 rounded-full shadow-xl"
                  >
                    <PlayCircle className="w-6 h-6" />
                    Avaa soitin
                  </motion.button>

                  <p className="absolute bottom-4 left-0 right-0 text-[10px] text-white/30 px-6 italic">
                    Klikkaamalla lataat Spotifyn sisältöä ja evästeitä.
                  </p>
                </div>
              ) : (
                <iframe
                  src="https://open.spotify.com/embed/artist/5VWE6cH7u5YksJLpJfBgEm"
                  title="Mölyapinat Spotify-soitin"
                  width="100%"
                  height="400"
                  frameBorder="0"
                  allowTransparency={true}
                  allow="encrypted-media"
                  className="w-full"
                />
              )}
            </div>

            {/* Banaanikori muille suoratoistopalveluille */}
            <div className="mt-5 pt-4 border-t-2 border-wood-dark/10 flex flex-col items-center text-center">
              <span className="font-body text-[11px] md:text-xs text-wood-dark/60 font-bold mb-2.5 flex items-center gap-1.5 justify-center">
                🍌 Kuunteletko mieluummin muualla?
              </span>
              <motion.a
                href="https://snd.click/kolme-banaania-kulhossa"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3.5 bg-wood-light/20 hover:bg-banana/25 px-4 py-2.5 rounded-xl border border-wood-dark/15 transition-all duration-300 shadow-md group w-full max-w-sm"
              >
                <div className="flex items-center gap-3">
                  <AppleMusicIcon className="w-5 h-5 filter drop-shadow-sm hover:scale-115 transition-transform" />
                  <DeezerIcon className="w-5 h-5 filter drop-shadow-sm hover:scale-115 transition-transform" />
                  <YoutubeMusicIcon className="w-5 h-5 filter drop-shadow-sm hover:scale-115 transition-transform" />
                  <TidalIcon className="w-6 h-6 filter drop-shadow-sm hover:scale-115 transition-transform" />
                </div>
                <span className="text-wood-dark/40 font-heading text-xs">|</span>
                <span className="font-heading text-xs text-wood-dark group-hover:text-bright-orange transition-colors">
                  Paina tästä muihin palveluihin 🎶
                </span>
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="font-heading text-3xl text-wood-dark mb-6 text-center md:text-left">
              Seuraa apinalaumaa! 🍌
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              <motion.a
                href="https://youtu.be/QZPYsE5D0qo?si=4nvqeYMgZ3nEV16m"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center gap-3 p-2 md:p-3 bg-white rounded-2xl shadow-lg border-2 border-red-500 hover:border-bright-orange transition-all group"
              >
                <div className="bg-red-500 text-white p-2 rounded-xl shadow-md group-hover:rotate-12 transition-transform">
                  <Music2 className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div>
                  <span className="font-heading text-base md:text-lg text-wood-dark block leading-tight">YouTube</span>
                  <span className="font-body text-forest-green font-bold text-[10px] md:text-xs">Katso videot!</span>
                </div>
              </motion.a>

              <motion.a
                href="https://open.spotify.com/artist/5VWE6cH7u5YksJLpJfBgEm"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center gap-3 p-2 md:p-3 bg-white rounded-2xl shadow-lg border-2 border-neon-green hover:border-bright-orange transition-all group"
              >
                <div className="bg-neon-green text-white p-2 rounded-xl shadow-md group-hover:rotate-12 transition-transform">
                  <SpotifyIcon />
                </div>
                <div>
                  <span className="font-heading text-base md:text-lg text-wood-dark block leading-tight">Spotify</span>
                  <span className="font-body text-forest-green font-bold text-[10px] md:text-xs">Mölyä korviin!</span>
                </div>
              </motion.a>

              <motion.a
                href="https://facebook.com/molyapinat"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center gap-3 p-2 md:p-3 bg-white rounded-2xl shadow-lg border-2 border-blue-600 hover:border-bright-orange transition-all group"
              >
                <div className="bg-blue-600 text-white p-2 rounded-xl shadow-md group-hover:rotate-12 transition-transform">
                  <Facebook className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div>
                  <span className="font-heading text-base md:text-lg text-wood-dark block leading-tight">Facebook</span>
                  <span className="font-body text-forest-green font-bold text-[10px] md:text-xs">Meikkikset somessa!</span>
                </div>
              </motion.a>

              <motion.a
                href="https://instagram.com/molyapinat"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center gap-3 p-2 md:p-3 bg-white rounded-2xl shadow-lg border-2 border-pink-500 hover:border-bright-orange transition-all group"
              >
                <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white p-2 rounded-xl shadow-md group-hover:rotate-12 transition-transform">
                  <Instagram className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div>
                  <span className="font-heading text-base md:text-lg text-wood-dark block leading-tight">Instagram</span>
                  <span className="font-body text-forest-green font-bold text-[10px] md:text-xs">Kuvia ja tunnelmia!</span>
                </div>
              </motion.a>

              <motion.a
                href="https://www.tiktok.com/@molyapinat"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center gap-3 p-2 md:p-3 bg-white rounded-2xl shadow-lg border-2 border-primary hover:border-bright-orange transition-all group"
              >
                <div className="bg-primary text-primary-foreground p-2 rounded-xl shadow-md group-hover:rotate-12 transition-transform">
                  <TikTokIcon />
                </div>
                <div>
                  <span className="font-heading text-base md:text-lg text-wood-dark block leading-tight">TikTok</span>
                  <span className="font-body text-forest-green font-bold text-[10px] md:text-xs">Banaanitanssit!</span>
                </div>
              </motion.a>

              <motion.button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Mölyapinat',
                      text: 'Tule mukaan Mölymetsän seikkailuihin!',
                      url: window.location.href,
                    }).catch(() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Linkki kopioitu leikepöydälle!');
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Linkki kopioitu leikepöydälle!');
                  }
                }}
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center gap-3 p-2 md:p-3 bg-sand/30 rounded-2xl shadow-lg border-2 border-dashed border-wood-dark/20 hover:border-bright-orange transition-all group w-full text-left"
              >
                <div className="bg-bright-orange text-white p-2 rounded-xl shadow-md group-hover:rotate-12 transition-transform">
                  <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div>
                  <span className="font-heading text-base md:text-lg text-wood-dark block leading-tight">Jaapas!</span>
                  <span className="font-body text-forest-green font-bold text-[10px] md:text-xs">Kerro kaverille! 🐵</span>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <div className="absolute bottom-0 left-0 w-full wave-divider h-10 md:h-[100px]" style={{ '--wave-color': 'hsl(var(--background))' } as any}></div>
    </section>
  );
};

export default MusicSection;
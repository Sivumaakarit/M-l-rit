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

const MusicSection = () => {
  const [showSpotify, setShowSpotify] = useState(false);

  return (
    <section id="music" className="py-24 pb-48 bg-secondary relative overflow-hidden">
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
              🐒 Kuuntele Mölyä 🐒
            </h2>
          </div>
          <p className="font-body text-xl text-wood-dark max-w-xl mx-auto font-bold">
            Löydät meidät kaikista suosituimmista <span className="text-forest-green">suoratoistopalveluista!</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
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
                  <h4 className="font-heading text-2xl text-white mb-2">Mölyapinat Spotifyssa</h4>
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
                  <span className="font-body text-forest-green font-bold text-[10px] md:text-xs">Meikkis somessa!</span>
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
      <div className="absolute bottom-0 left-0 w-full wave-divider" style={{ '--wave-color': 'hsl(var(--background))' } as any}></div>
    </section>
  );
};

export default MusicSection;
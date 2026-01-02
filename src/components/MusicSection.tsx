import { motion } from "framer-motion";
import { Youtube, Instagram, Facebook } from "lucide-react";

// --- CUSTOM TIKTOK-IKONI ---
const TikTokIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 1 0 7.75 6.82V9.12a8.16 8.16 0 0 0 4.93 2.15V7.79a4.77 4.77 0 0 1-3.45-1.1z" />
  </svg>
);

// --- CUSTOM SPOTIFY-IKONI ---
const SpotifyIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.502 17.302c-.218.358-.684.474-1.038.255-2.852-1.743-6.443-2.134-10.672-1.168-.411.095-.82-.162-.914-.573-.095-.411.162-.82.573-.914 4.63-1.059 8.598-.614 11.798 1.344.354.218.47.684.253 1.056zm1.47-3.253c-.276.448-.862.593-1.309.317-3.264-2.007-8.24-2.589-12.098-1.417-.506.154-1.04-.136-1.194-.643-.154-.506.136-1.04.643-1.194 4.41-1.338 9.894-.691 13.642 1.616.447.276.592.862.316 1.321zm.126-3.402C15.087 8.236 8.442 8.016 4.606 9.182c-.615.187-1.263-.163-1.45-.778-.187-.615.163-1.263.778-1.45 4.408-1.338 11.734-1.082 16.31 1.635.553.328.738 1.04.41 1.593-.328.553-1.04.738-1.593.41z"/>
  </svg>
);

const MusicSection = () => {
  const socialLinks = [
    { name: "Spotify", icon: SpotifyIcon, url: "https://open.spotify.com/artist/5VWE6cH7u5YksJLpJfBgEm", color: "bg-[#1DB954]" },
    { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/molyapinat/", color: "bg-[#1877F2]" },
    { name: "Instagram", icon: Instagram, url: "https://instagram.com/molyapinat", color: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]" },
    { name: "TikTok", icon: TikTokIcon, url: "https://tiktok.com/@molyapinat", color: "bg-black" },
    { name: "YouTube", icon: Youtube, url: "https://youtube.com/@molyapinat", color: "bg-[#FF0000]" },
  ];

  return (
    <section id="music" className="pt-24 pb-0 bg-secondary overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block wood-texture rounded-3xl px-8 py-4 shadow-lg mb-4">
            <h2 className="font-heading text-3xl md:text-4xl text-wood-dark">
              🎵 Musiikkia korville 🎵
            </h2>
          </div>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            Kuuntele Mölyapinoiden uusimmat biisit ja seuraa kanavilla!
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-8">
          <motion.div className="bg-card rounded-3xl p-4 shadow-xl">
             <h3 className="font-heading text-2xl text-center text-foreground mb-4">🏴‍☠️ Merirosvot 🏴‍☠️</h3>
             <iframe src="https://open.spotify.com/embed/track/6Hvh5yfRseTfJE88S2f0kU?utm_source=generator" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" className="rounded-xl" />
          </motion.div>

          <motion.div className="bg-card rounded-3xl p-4 shadow-xl mb-12">
             <h3 className="font-heading text-2xl text-center text-foreground mb-4">☕ Mukana tee ☕</h3>
             <iframe src="https://open.spotify.com/embed/track/2H2zbhXQSm2SdSXXM14nfs?utm_source=generator" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" className="rounded-xl" />
          </motion.div>

          {/* Some-napit mobiiliskaalauksella */}
          <div className="flex justify-center gap-3 md:gap-6 flex-wrap pt-4 pb-20">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                /* MUUTOS: p-3 mobiilissa, p-5 tietokoneella */
                className={`${link.color} text-white rounded-full p-3 md:p-5 shadow-lg transition-all`}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* MUUTOS: w-6 h-6 mobiilissa, w-8 h-8 tietokoneella */}
                <link.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                <span className="sr-only">{link.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* --- Aalto palautettu paikalleen --- */}
      <div className="mt-0 leading-[0]">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            className="fill-sand"
          />
        </svg>
      </div>
    </section>
  );
};

export default MusicSection;
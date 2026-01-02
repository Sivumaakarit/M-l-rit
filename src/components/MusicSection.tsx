import { motion } from "framer-motion";
import { Youtube, Instagram, Music } from "lucide-react";

const MusicSection = () => {
  const socialLinks = [
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/@molyapinat",
      color: "bg-destructive",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/molyapinat",
      color: "bg-gradient-to-br from-primary via-bright-orange to-destructive",
    },
    {
      name: "TikTok",
      icon: Music,
      url: "https://tiktok.com/@molyapinat",
      color: "bg-foreground",
    },
  ];

  return (
    <section id="music" className="pt-0 pb-0 bg-secondary">
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
            Kuuntele Mölyapinoiden uusimmat biisit!
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Spotify Embed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl p-4 shadow-xl mb-12"
          >
            <h3 className="font-heading text-2xl text-center text-foreground mb-4">
              🏴‍☠️ Merirosvot - Uusi single! 🏴‍☠️
            </h3>
            <div className="rounded-2xl overflow-hidden">
              <iframe
                src="https://open.spotify.com/embed/track/6Hvh5yfRseTfJE88S2f0kU?utm_source=generator"
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl"
              />
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="font-heading text-2xl text-foreground mb-6">
              Seuraa meitä! 📱
            </h3>
            <div className="flex justify-center gap-6 flex-wrap">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${link.color} text-primary-foreground rounded-full p-5 shadow-lg hover:shadow-xl transition-all`}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <link.icon size={32} />
                  <span className="sr-only">{link.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="mt-16">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 50C480 40 600 50 720 60C840 70 960 80 1080 80C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-sand"
          />
        </svg>
      </div>
    </section>
  );
};

export default MusicSection;

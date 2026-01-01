import { motion } from "framer-motion";

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
          className="absolute text-3xl md:text-5xl opacity-60"
          style={{ left: element.left, top: element.top }}
          initial={{ y: 0, rotate: 0 }}
          animate={{
            y: [-20, 20, -20],
            rotate: [-10, 10, -10],
          }}
          transition={{
            duration: 6,
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

interface HeroSectionProps {}

const HeroSection = ({}: HeroSectionProps) => {
  return (
    <section
      id="hero"
      style={{ scrollMarginTop: "60px" }}
      className="relative min-h-screen pt-24 pb-12 bg-gradient-forest overflow-hidden"
    >
      <FloatingElements />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-[hsl(30_35%_25%)] mb-4 drop-shadow-lg">
            Tervetuloa Mölymetsään! 🌲
          </h1>
          <p className="font-body text-xl md:text-2xl text-[hsl(30_35%_30%)] max-w-2xl mx-auto font-semibold">
            Täällä apinalaumassa pidetään hauskaa ja tanssitaan yhdessä!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-wood-dark/10 p-2">
            <div className="aspect-video rounded-2xl overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/-zA1vEvMvxA"
                title="Mölyapinat - Banaanitanssi"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
          <p className="text-center mt-4 font-heading text-2xl text-bright-orange">
            🍌 Banaanitanssi 🍌
          </p>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
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

export default HeroSection;

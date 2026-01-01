import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-wood-dark py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-heading text-2xl text-primary mb-2">
            🐒 Mölyapinat 🐒
          </p>
          <p className="font-body text-wood-light text-sm">
            © 2026 Mölyapinat. Kaikki oikeudet pidätetään.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <span className="text-2xl animate-bounce-gentle">🍌</span>
            <span className="text-2xl animate-bounce-gentle" style={{ animationDelay: "0.2s" }}>🎵</span>
            <span className="text-2xl animate-bounce-gentle" style={{ animationDelay: "0.4s" }}>🐒</span>
            <span className="text-2xl animate-bounce-gentle" style={{ animationDelay: "0.6s" }}>🎶</span>
            <span className="text-2xl animate-bounce-gentle" style={{ animationDelay: "0.8s" }}>🍌</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImage from "@/assets/logo.png";
import hamburgerIcon from "@/assets/Hampurilainen.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // VARMISTA NÄMÄ: href-arvon on oltava täsmälleen sama kuin osion id (esim. <section id="members">)
  const navItems = [
    { label: "Alkuun", href: "#hero" },
    { label: "Bändi", href: "#members" }, // Jos ei toimi, kokeile muuttaa tämä muotoon "#band"
    { label: "Musiikki", href: "#music" },
    { label: "Keikat", href: "#tour" },
    { label: "Yhteystiedot", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="wood-texture shadow-lg relative">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <motion.a
              href="#hero"
              className="font-heading text-3xl md:text-4xl lg:text-5xl text-wood-dark hover:scale-105 transition-transform whitespace-nowrap flex items-center gap-2"
              whileHover={{ rotate: [-2, 2, -2, 0] }}
              transition={{ duration: 0.4 }}
              onClick={() => setIsOpen(false)}
            >
              <img src={logoImage} alt="Mölyapinat logo" className="h-8 md:h-10 lg:h-12 w-auto" />
              <span className="relative top-1">Mölyapinat</span>
            </motion.a>

            {/* Desktop-valikko */}
            <ul className="hidden md:flex items-center gap-4 lg:gap-6 flex-shrink-0">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-body font-semibold text-wood-dark hover:text-bright-orange transition-colors text-base lg:text-lg whitespace-nowrap"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* MOBIILIPAINIKE: Ikonia suurennettu (w-16 h-16) */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center p-1 hover:scale-110 transition-transform focus:outline-none"
              aria-label={isOpen ? "Sulje valikko" : "Avaa valikko"}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.span 
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    className="text-5xl text-wood-dark p-2" // Suurennettu rasti
                  >
                    ✖️
                  </motion.span>
                ) : (
                  <motion.img 
                    key="hamburger"
                    src={hamburgerIcon} 
                    alt="Valikko" 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    /* Suurennettu banaani-burgeri */
                    className="w-11 h-11 object-contain" 
                  />
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobiilivalikko */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden wood-texture border-t border-wood-dark/10 overflow-hidden"
            >
              <ul className="flex flex-col p-4">
                {navItems.map((item) => (
                  <motion.li 
                    key={item.label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                  >
                    <a
                      href={item.href}
                      className="block py-4 px-4 font-body font-bold text-wood-dark hover:bg-bright-orange/10 rounded-xl transition-colors text-2xl" // Suurennettu myös linkkitekstiä
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
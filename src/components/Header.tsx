import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImage from "@/assets/logo.webp";
import hamburgerIcon from "@/assets/Hampurilainen.webp";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Alkuun", href: "#hero" },
    { label: "Bändi", href: "#members" },
    { label: "Musiikki", href: "#music" },
    { label: "Keikat", href: "#tour" },
    { label: "Yhteystiedot", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 pt-4">
      <nav className={`mx-auto max-w-7xl rounded-[2rem] transition-all duration-300 ${isOpen ? 'glass-bg border-2 border-slate-900/10 shadow-xl' : scrolled ? 'glass-bg' : 'wood-texture'} shadow-xl`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <motion.a
              href="#hero"
              className="font-heading text-2xl md:text-3xl text-slate-900 hover:scale-105 transition-transform flex items-center gap-3 group flex-shrink-0"
              whileHover={{ rotate: [-1, 1, -1, 0] }}
              onClick={() => setIsOpen(false)}
            >
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-primary blur-md opacity-0 group-hover:opacity-40 transition-opacity" />
                <img 
                  src={logoImage} 
                  alt="Mölyapinat logo" 
                  className="relative h-10 md:h-12 w-auto object-contain flex-shrink-0" 
                  fetchPriority="high"
                />
              </div>
              <span className="tracking-tight text-shadow-fun whitespace-nowrap">Mölyapinat</span>
            </motion.a>

            {/* Desktop-valikko */}
            <ul className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-body font-bold text-slate-700 hover:text-secondary transition-all text-lg relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-1 bg-primary transition-all group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>

            {/* MOBIILIPAINIKE */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-900/5 border-2 border-slate-900/10 hover:bg-slate-900/10 transition-all focus:outline-none"
              aria-label={isOpen ? "Sulje valikko" : "Avaa valikko"}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.span 
                    key="close"
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    className="text-2xl text-slate-900"
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
                    className="w-8 h-8 object-contain" 
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
              className="md:hidden border-t-2 border-slate-900/10 overflow-hidden"
            >
              <ul className="flex flex-col p-6 space-y-2">
                {navItems.map((item, idx) => (
                  <motion.li 
                    key={item.label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <a
                      href={item.href}
                      className="block py-4 px-6 font-heading text-2xl text-slate-900 hover:bg-primary/20 rounded-2xl transition-all"
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

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
const logoImage = "/logo.webp";
import hamburgerIcon from "@/assets/Hampurilainen.webp";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Control background change (glass effect)
      setScrolled(currentScrollY > 20);
      // Control visibility (hide on scroll down, show on up)
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
        document.body.style.overflow = "unset";
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, lastScrollY]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
  }, [isOpen]);

  const navItems = [
    { label: "Alkuun", href: "#hero" },
    { label: "Bändi", href: "#members" },
    { label: "Musiikki", href: "#music" },
    { label: "Keikat", href: "#tour" },
    { label: "Yhteystiedot", href: "#contact" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    // Pieni viive varmistaa, että mobiilivalikon sulkeutumisanimaatio ei sotke laskentaa
    setTimeout(() => {
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 50);
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-2 md:pt-4"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -120 }}
      transition={{ duration: 1.0, ease: "easeInOut" }}
    >
      <nav className={`mx-auto max-w-7xl rounded-2xl md:rounded-[2rem] transition-all duration-500 ease-in-out ${
        isOpen || scrolled 
          ? 'glass-bg border-2 border-slate-900/10 shadow-xl' 
          : 'wood-texture border-[3px] border-wood-dark shadow-[4px_4px_0px_hsl(var(--wood-dark))]'
      }`}>
        <div className="container mx-auto px-4 py-2 md:px-6 md:py-4">
          <div className="flex items-center justify-between gap-4">
            <motion.a
              href="#hero"
              className="font-heading text-2xl md:text-3xl text-slate-900 hover:scale-105 transition-transform flex items-center gap-3 group flex-shrink-0"
              whileHover={{ rotate: [-1, 1, -1, 0] }}
              onClick={(e) => scrollToSection(e, "#hero")}
            >
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-primary blur-md opacity-0 group-hover:opacity-40 transition-opacity" />
                <img 
                  src={logoImage} 
                  alt="Mölyapinat logo" 
                  className="relative h-8 md:h-12 w-auto object-contain flex-shrink-0" 
                  width="54"
                  height="56"
                  fetchPriority="high"
                />
              </div>
              <span className="tracking-tight text-shadow-fun whitespace-nowrap text-3xl">Mölyapinat</span>
            </motion.a>

            {/* Desktop-valikko */}
            <ul className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-body font-bold text-slate-700 hover:text-secondary transition-all text-lg relative group"
                    onClick={(e) => scrollToSection(e, item.href)}
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
              className="md:hidden flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-slate-900/5 border-2 border-slate-900/10 hover:bg-slate-900/10 transition-all focus:outline-none"
              aria-label={isOpen ? "Sulje valikko" : "Avaa valikko"}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.span 
                    key="close"
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    className="text-3xl text-slate-900"
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
                    className="w-8 h-8 md:w-12 md:h-12 object-contain" 
                    width="48"
                    height="48"
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
                      onClick={(e) => scrollToSection(e, item.href)}
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
    </motion.header>
  );
};

export default Header;

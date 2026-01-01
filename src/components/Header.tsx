import { motion } from "framer-motion";
import logoImage from "@/assets/logo.png";

const Header = () => {
  const navItems = [
    { label: "Koti", href: "#hero" },
    { label: "Bändi", href: "#members" },
    { label: "Musiikki", href: "#music" },
    { label: "Keikat", href: "#tour" },
    { label: "Yhteystiedot", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="wood-texture shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <motion.a
              href="#hero"
              className="font-heading text-3xl md:text-4xl lg:text-5xl text-wood-dark hover:scale-105 transition-transform whitespace-nowrap flex items-center gap-2"
              whileHover={{ rotate: [-2, 2, -2, 0] }}
              transition={{ duration: 0.4 }}
            >
              <img src={logoImage} alt="Mölyapinat logo" className="h-8 md:h-10 lg:h-12 w-auto" />
              <span className="relative top-1">Mölyapinat</span>
            </motion.a>

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

            {/* Mobile menu button */}
            <button className="md:hidden text-wood-dark text-2xl">
              🍌
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

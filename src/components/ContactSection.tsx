import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Send, User, Mail, MessageSquare, ChevronDown, Download, X } from "lucide-react";
import { toast } from "sonner";
import { useMolyRain, MolyRainDisplay } from "./MolyRain";
import { Checkbox } from "@/components/ui/checkbox";
import { PrivacyPolicyModal } from "./PrivacyPolicyModal";
import { useLocation } from "react-router-dom";

interface PromoItem {
  title: string;
  description: string;
  fileName: string;
  filePath: string;
  downloadLabel?: string;
  secondaryDownload?: {
    filePath: string;
    fileName: string;
    label: string;
  };
  svgPath?: string;
  svgFileName?: string;
  previewPath?: string;
  specs: string;
  thumbnail: string;
  isWoodPlank?: boolean;
  isTextLogo?: boolean;
  isApinaLogo?: boolean;
  isTransparentLogo?: boolean;
}

const promoItems: PromoItem[] = [
  {
    title: "Mölyapinat Promokuva 1 🐒",
    description: "Painolaatuinen kuva keikkajulisteisiin ja markkinointiin.",
    fileName: "molyapinat2kp18.jpg",
    filePath: "/molyapinat2kp18.jpg",
    previewPath: "/molyapinat-promo-preview.webp",
    specs: "JPG • 3.5 MB • Painolaatu",
    thumbnail: "/molyapinat-promo-thumb.webp",
    downloadLabel: "Lataa HQ",
    isWoodPlank: false,
    isTextLogo: false,
    isApinaLogo: false
  },
  {
    title: "Mölyapinat Promokuva 2 🐒",
    description: "Optimoitu WebP-promokuva keikkamarkkinointiin ja julisteisiin.",
    fileName: "molyapinat-promo2.webp",
    filePath: "/molyapinat-promo2.webp",
    previewPath: "/molyapinat-promo2.webp",
    specs: "WEBP • 161 KB • Web-optimoitu",
    thumbnail: "/molyapinat-promo2-thumb.webp",
    downloadLabel: "Lataa WebP",
    isWoodPlank: false,
    isTextLogo: false,
    isApinaLogo: false
  },
  {
    title: "Mölyapinat Promokuva 3 🐒",
    description: "Painolaatuinen kuva keikkajulisteisiin ja laadukkaaseen markkinointiin.",
    fileName: "molyapinat-promo3.png",
    filePath: "/molyapinat-promo3.png",
    previewPath: "/molyapinat-promo3.webp",
    specs: "PNG (8.4 MB HQ) • WEBP (425 KB)",
    thumbnail: "/molyapinat-promo3-thumb.webp",
    downloadLabel: "Lataa HQ",
    secondaryDownload: {
      filePath: "/molyapinat-promo3.webp",
      fileName: "molyapinat-promo3.webp",
      label: "Lataa WebP"
    },
    isWoodPlank: false,
    isTextLogo: false,
    isApinaLogo: false
  },
  {
    title: "Mölyapinat Tekstilogo",
    description: "Tekstilogo varjoilla ja läpinäkyvällä taustalla.",
    fileName: "molyapinat-tekstilogo.png",
    filePath: "/molyapinat-tekstilogo.png",
    previewPath: "/molyapinat-tekstilogo.webp",
    specs: "PNG • 3000x720 px • Läpinäkyvä",
    thumbnail: "/molyapinat-tekstilogo.webp",
    isWoodPlank: false,
    isTextLogo: false,
    isTransparentLogo: true
  },
  {
    title: "Mölyapinat Apinalogo 🐒",
    description: "Aurinkolasillinen apinalogo (päänkuva) ilman taustaa.",
    fileName: "molyapinat-apinalogo.png",
    filePath: "/logo.png",
    svgPath: "/molyapinat-apinalogo.svg",
    svgFileName: "molyapinat-apinalogo.svg",
    previewPath: "/logo.webp",
    specs: "PNG (742 KB) • SVG (Vektori) • Läpinäkyvä",
    thumbnail: "/logo.webp",
    isWoodPlank: false,
    isTextLogo: false,
    isApinaLogo: true
  },
  {
    title: "Mölyapinat Lankkulogo",
    description: "Yläpalkin tyylinen puulankkulogo läpinäkyvällä taustalla.",
    fileName: "molyapinat-lankkulogo.png",
    filePath: "/molyapinat-lankkulogo.png",
    svgPath: "/molyapinat-lankkulogo.svg",
    svgFileName: "molyapinat-lankkulogo.svg",
    previewPath: "/molyapinat-lankkulogo.webp",
    specs: "PNG (2650x800) • SVG (Vektori) • Läpinäkyvä",
    thumbnail: "/molyapinat-lankkulogo.webp",
    isWoodPlank: false,
    isTextLogo: false,
    isTransparentLogo: true
  }
];

const ContactSection = () => {
  const { particles, triggerRain } = useMolyRain();
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);

  const { hash } = useLocation();

  useEffect(() => {
    if (hash === "#jarjestajille") {
      setIsPromoOpen(true);
    }
  }, [hash]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Täytä kaikki kentät!");
      return;
    }

    if (!acceptedPrivacy) {
      toast.error("Sinun täytyy hyväksyä tietosuojaseloste lähettääksesi viestin! 🔒");
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/xeerkkak", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Kiitos viestistäsi! 🍌 Palaamme asiaan pian!");
        setFormData({ name: "", email: "", message: "" });
        setAcceptedPrivacy(false);
      } else {
        toast.error("Hups! Jotain meni vikaan. Yritä myöhemmin uudelleen.");
      }
    } catch (error) {
      toast.error("Lähetys epäonnistui. Tarkista verkkoyhteys.");
    }
  };

  return (
    <section id="yhteystiedot" className="pt-12 md:pt-24 pb-24 md:pb-48 bg-background relative overflow-hidden">
      <MolyRainDisplay particles={particles} />

      <div className="container mx-auto px-4">
        {/* MÖLY-MEDIAKIT ALASVETO JÄRJESTÄJILLE */}
        <div id="jarjestajille" className="max-w-2xl mx-auto mb-16 scroll-margin-top-[120px]">
          <motion.button
            onClick={() => setIsPromoOpen(!isPromoOpen)}
            className="w-full wood-clean rounded-3xl p-5 md:p-7 flex items-center justify-between hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer group"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center gap-4 text-left">
              <span className="text-3xl md:text-4xl group-hover:animate-wiggle">📸</span>
              <div>
                <h3 className="font-heading text-xl md:text-3xl text-wood-dark leading-snug">
                  Promokuvat & Möly-Mediakit
                </h3>
                <p className="font-body text-xs md:text-base text-wood-dark/70 font-bold mt-1">
                  Lataa painokelpoiset promokuvat, bändilogot ja materiaalit keikkajärjestäjille.
                </p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isPromoOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-wood-dark p-1 shrink-0 ml-4"
            >
              <ChevronDown className="w-8 h-8 stroke-[3]" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isPromoOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="bg-white/90 backdrop-blur-md rounded-3xl border-3 border-wood-dark p-5 md:p-8 shadow-xl space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    {promoItems.map((item, index) => (
                      <div
                        key={item.fileName}
                        className="flex flex-col md:flex-row items-center gap-5 p-4 bg-background/50 border-2 border-wood-dark/15 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                      >
                        {/* Esikatselukuva */}
                        {item.isTransparentLogo || item.isApinaLogo ? (
                          <div 
                            onClick={() => setActiveLightboxImg(item.previewPath || item.filePath)}
                            className="w-28 h-28 md:w-32 md:h-32 rounded-xl border-2 border-wood-dark/15 overflow-hidden flex-shrink-0 flex items-center justify-center relative cursor-zoom-in group p-2"
                            style={{ 
                              backgroundImage: 'conic-gradient(#e5e7eb 25%, transparent 25% 50%, #e5e7eb 50% 75%, transparent 75%)', 
                              backgroundSize: '16px 16px', 
                              backgroundColor: '#ffffff' 
                            }}
                          >
                            <img 
                              src={item.thumbnail} 
                              alt={item.title} 
                              className="w-full h-auto max-h-full object-contain transition-transform duration-300 group-hover:scale-105 select-none" 
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                              <span className="text-white text-xs font-bold font-body px-2.5 py-1 bg-black/40 rounded-full backdrop-blur-xs">Esikatsele</span>
                            </div>
                          </div>
                        ) : (
                          <div 
                            onClick={() => setActiveLightboxImg(item.previewPath || item.filePath)}
                            className="w-28 h-28 md:w-32 md:h-32 rounded-xl border-2 border-wood-dark/15 overflow-hidden bg-slate-100 flex-shrink-0 flex items-center justify-center relative cursor-zoom-in group"
                          >
                            <img 
                              src={item.thumbnail} 
                              alt={item.title} 
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                              <span className="text-white text-xs font-bold font-body px-2.5 py-1 bg-black/40 rounded-full backdrop-blur-xs">Esikatsele</span>
                            </div>
                          </div>
                        )}

                        {/* Tiedot */}
                        <div className="flex-1 text-center md:text-left space-y-1.5">
                          <h4 className="font-heading text-lg md:text-xl text-wood-dark leading-tight">{item.title}</h4>
                          <p className="font-body text-xs md:text-sm text-wood-dark/85 leading-relaxed">{item.description}</p>
                          <span className="inline-block bg-mint text-forest font-body font-extrabold text-[10px] md:text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-forest/10 shadow-xs">
                            {item.specs}
                          </span>
                        </div>

                        {/* Lataustoiminnot */}
                        <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto shrink-0">
                          <a
                            href={item.filePath}
                            download={item.fileName}
                            className="flex items-center justify-center gap-2 bg-bright-orange text-white hover:brightness-105 active:scale-95 font-body font-bold text-xs md:text-sm px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
                          >
                            <Download className="w-4 h-4 stroke-[2.5]" />
                            {item.svgPath ? "Lataa PNG" : item.downloadLabel || "Lataa HQ"}
                          </a>
                          {item.svgPath && (
                            <a
                              href={item.svgPath}
                              download={item.svgFileName || "logo.svg"}
                              className="flex items-center justify-center gap-2 bg-forest-green text-white hover:brightness-105 active:scale-95 font-body font-bold text-xs md:text-sm px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
                            >
                              <Download className="w-4 h-4 stroke-[2.5]" />
                              Lataa SVG
                            </a>
                          )}
                          {item.secondaryDownload && (
                            <a
                              href={item.secondaryDownload.filePath}
                              download={item.secondaryDownload.fileName}
                              className="flex items-center justify-center gap-2 bg-forest-green text-white hover:brightness-105 active:scale-95 font-body font-bold text-xs md:text-sm px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
                            >
                              <Download className="w-4 h-4 stroke-[2.5]" />
                              {item.secondaryDownload.label}
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center pt-4 border-t-2 border-dashed border-wood-dark/10">
                    <span className="font-body text-sm md:text-base text-wood-dark/60 font-bold italic">
                      Tulossa lisää promokuvia ja materiaaleja pian! 🍌
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <motion.div
            onClick={triggerRain}
            whileHover={{
              rotate: [0, -2, 2, -1, 1, 0],
              transition: { duration: 1.2, ease: "easeInOut" }
            }}
            whileTap={{ scale: 0.95 }}
            style={{ transformOrigin: "top center" }}
            className="inline-block wood-clean rounded-3xl px-10 py-5 shadow-xl mb-6 overflow-hidden cursor-pointer active:brightness-95 transition-all"
          >
            <h2 className="font-heading text-3xl md:text-5xl text-wood-dark text-shadow-fun">
              🐒 Tilaa Mölyapinat keikalle! 🐒
            </h2>
          </motion.div>
          <p className="font-body text-xl md:text-2xl text-wood-dark max-w-4xl mx-auto font-bold mb-4">
            Haluatko meidät esiintymään? Laita viestiä alle tai sähköpostilla: <br className="md:hidden" />
            <a 
              href="mailto:jullenmusiikki@gmail.com" 
              className="text-forest-green hover:text-bright-orange transition-colors underline decoration-2 underline-offset-4"
            >
              jullenmusiikki@gmail.com
            </a>
          </p>
        </motion.div>

        {/* LIGHTBOX MODAL */}
        <AnimatePresence>
          {activeLightboxImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLightboxImg(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-3xl border-4 border-wood-dark bg-white shadow-2xl flex flex-col items-center justify-center"
              >
                <img 
                  src={activeLightboxImg} 
                  alt="Esikatselu" 
                  className="max-w-full max-h-[80vh] object-contain rounded-2xl" 
                />
                
                {/* Sulkemispainike */}
                <button
                  onClick={() => setActiveLightboxImg(null)}
                  className="absolute top-4 right-4 w-12 h-12 rounded-full bg-bright-orange hover:bg-bright-orange/90 text-white flex items-center justify-center border-3 border-wood-dark transition-all cursor-pointer shadow-xl active:scale-95 hover:scale-105 group"
                  aria-label="Sulje esikatselu"
                >
                  <X className="w-6 h-6 stroke-[3] transition-transform group-hover:rotate-90 duration-300" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="lauta-clean p-2 md:p-12 shadow-2xl space-y-6 md:space-y-8"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-2 py-4 md:p-6 shadow-inner space-y-6 border-2 md:border-4 border-wood-dark/10">
              <div>
                <label className="font-heading text-xl text-wood-dark flex items-center gap-3 mb-3">
                  <User className="w-6 h-6 text-bright-orange" />
                  Nimi
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-white border-2 md:border-4 border-wood-light/50 rounded-2xl px-3 py-2 md:px-5 md:py-4 font-body text-base md:text-lg focus:border-primary focus:bg-primary/5 focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all shadow-sm"
                  placeholder="Kirjoita nimesi"
                />
              </div>

              <div>
                <label className="font-heading text-xl text-wood-dark flex items-center gap-3 mb-3">
                  <Mail className="w-6 h-6 text-neon-green" />
                  Sähköposti
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-white border-2 md:border-4 border-wood-light/50 rounded-2xl px-3 py-2 md:px-5 md:py-4 font-body text-base md:text-lg focus:border-primary focus:bg-primary/5 focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all shadow-sm"
                  placeholder="sinun@email.fi"
                />
              </div>

              <div>
                <label className="font-heading text-xl text-wood-dark flex items-center gap-3 mb-3">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  Viesti
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={12}
                  className="w-full bg-white border-2 md:border-4 border-wood-light/50 rounded-2xl px-3 py-2 md:px-5 md:py-4 font-body text-base md:text-lg focus:border-primary focus:bg-primary/5 focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all shadow-sm resize-none"
                  placeholder="Kerro meille miten voimme auttaa!"
                />
              </div>
            </div>

            {/* Tietosuojan hyväksyntä valintaruudulla */}
            <div className="flex items-start gap-3 p-4 bg-white/70 backdrop-blur-sm rounded-2xl border-2 border-wood-dark/10 shadow-sm">
              <Checkbox 
                id="privacy-accept" 
                checked={acceptedPrivacy}
                onCheckedChange={(checked) => setAcceptedPrivacy(checked === true)}
                className="w-6 h-6 rounded-lg border-2 border-wood-dark data-[state=checked]:bg-bright-orange data-[state=checked]:border-wood-dark mt-1 shrink-0 transition-transform active:scale-90"
              />
              <label 
                htmlFor="privacy-accept"
                className="font-body text-sm md:text-base text-wood-dark leading-relaxed cursor-pointer select-none"
              >
                Hyväksyn, että Mölyapinat käsittelee tietojani keikkakyselyn hoitamiseksi{" "}
                <button
                  type="button"
                  onClick={() => setIsPrivacyOpen(true)}
                  className="text-forest-green hover:text-bright-orange transition-colors font-bold underline decoration-2 underline-offset-2"
                >
                  tietosuojaselosteen
                </button>{" "}
                mukaisesti. 🐒
              </label>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-bright-orange text-white font-heading text-2xl py-5 rounded-2xl shadow-xl flex items-center justify-center gap-4 hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-8 h-8" />
              Lähetä viesti 🍌
            </motion.button>
          </form>
        </motion.div>
      </div>

      <PrivacyPolicyModal isOpen={isPrivacyOpen} onOpenChange={setIsPrivacyOpen} />
    </section>
  );
};

export default ContactSection;
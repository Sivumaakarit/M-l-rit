import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Send, User, Mail, MessageSquare, ChevronDown, Download, X } from "lucide-react";
import { toast } from "sonner";
import { useMolyRain, MolyRainDisplay } from "./MolyRain";
import { Checkbox } from "@/components/ui/checkbox";
import { PrivacyPolicyModal } from "./PrivacyPolicyModal";
import { useLocation } from "react-router-dom";

const promoItems = [
  {
    title: "Mölyapinat Promokuva 🐒",
    description: "Painolaatuinen kuva keikkajulisteisiin ja markkinointiin.",
    fileName: "molyapinat2kp18.jpg",
    filePath: "/molyapinat2kp18.jpg",
    previewPath: "/molyapinat-promo-preview.webp",
    specs: "JPG • 3.5 MB • Korkearesoluutio",
    thumbnail: "/molyapinat-promo-thumb.webp",
    isWoodPlank: false,
    isTextLogo: false,
    isApinaLogo: false
  },
  {
    title: "Mölyapinat Tekstilogo",
    description: "Tekstilogo varjoilla ja läpinäkyvällä taustalla.",
    fileName: "molyapinat-tekstilogo.png",
    filePath: "generate-text",
    specs: "PNG • 3000x720 px • Läpinäkyvä",
    thumbnail: "generate-text",
    isWoodPlank: false,
    isTextLogo: true,
    isApinaLogo: false
  },
  {
    title: "Mölyapinat Apinalogo 🐒",
    description: "Aurinkolasillinen apinalogo (päänkuva) ilman taustaa.",
    fileName: "molyapinat-apinalogo.png",
    filePath: "/logo.png",
    previewPath: "/logo.webp",
    specs: "PNG • 742 KB • Läpinäkyvä",
    thumbnail: "/logo.webp",
    isWoodPlank: false,
    isTextLogo: false,
    isApinaLogo: true
  },
  {
    title: "Mölyapinat Lankkulogo",
    description: "Yläpalkin tyylinen puulankkulogo läpinäkyvällä taustalla.",
    fileName: "molyapinat-lankkulogo.png",
    filePath: "generate-wood-full",
    specs: "PNG • 2650x800 px • Läpinäkyvä",
    thumbnail: "generate-wood",
    isWoodPlank: true,
    plankType: "full",
    isApinaLogo: false
  }
];

const ContactSection = () => {
  const { particles, triggerRain } = useMolyRain();
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);
  const [woodPlankSrc, setWoodPlankSrc] = useState<string | null>(null);
  const [textLogoSrc, setTextLogoSrc] = useState<string | null>(null);

  const { hash } = useLocation();

  useEffect(() => {
    if (hash === "#jarjestajille") {
      setIsPromoOpen(true);
    }
  }, [hash]);

  useEffect(() => {
    const generateAssets = async () => {
      // Wait for fonts to load so "Luckiest Guy" renders perfectly in canvas
      if (typeof document !== "undefined" && document.fonts) {
        try {
          await document.fonts.ready;
        } catch (e) {
          console.warn("Font loading wait failed:", e);
        }
      }
      
      const textCanvas = generateTextLogoCanvas();
      setTextLogoSrc(textCanvas.toDataURL("image/png"));

      const woodCanvas = await generateWoodPlankLogoCanvas();
      setWoodPlankSrc(woodCanvas.toDataURL("image/png"));
    };

    generateAssets();
  }, []);



  const generateTextLogoCanvas = (): HTMLCanvasElement => {
    const canvas = document.createElement("canvas");
    canvas.width = 3000;
    canvas.height = 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return canvas;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = 'bold 380px "Luckiest Guy", cursive, sans-serif'; // Even bolder and larger!
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const textX = canvas.width / 2;
    const textY = canvas.height / 2;

    // Draw shadow like text-shadow-fun (rgba(74, 53, 37, 0.3) matching hsla(var(--wood-dark) / 0.3))
    ctx.fillStyle = "rgba(74, 53, 37, 0.3)";
    ctx.fillText("Mölyapinat", textX + 12, textY + 12);

    // Draw solid text color like yläpalkki (slate-900)
    ctx.fillStyle = "#0f172a";
    ctx.fillText("Mölyapinat", textX, textY);

    return canvas;
  };

  const generateWoodPlankLogoCanvas = (): Promise<HTMLCanvasElement> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      canvas.width = 2650;
      canvas.height = 800;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(canvas);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw shadow (perfectly centered Y-shaved canvas margins, slimmer bottom edge)
      ctx.fillStyle = "rgba(74, 53, 37, 0.35)";
      ctx.beginPath();
      if ('roundRect' in ctx) {
        (ctx as any).roundRect(58, 88, canvas.width - 86, 522, 120);
      } else {
        ctx.rect(58, 88, canvas.width - 86, 522);
      }
      ctx.fill();

      // Wood texture gradient - beautiful premium light cream/beige wood matching .wood-clean (slimmer Y-span 80-610)
      const woodGrad = ctx.createLinearGradient(0, 80, 0, 610);
      woodGrad.addColorStop(0, "#f4ede2");       // slightly lighter: premium delicate warm cream
      woodGrad.addColorStop(0.15, "#f7f0e9");    // balanced lighter top highlight
      woodGrad.addColorStop(0.16, "#f2eae0");    // soft plank edge
      woodGrad.addColorStop(0.2, "#eddccb");     // hsl(35 30% 88%)
      woodGrad.addColorStop(0.5, "#f9f6f1");     // soft warm lighter highlight
      woodGrad.addColorStop(0.8, "#f1e5d7");     // natural grain
      woodGrad.addColorStop(0.84, "#eddccb");    // soft plank edge
      woodGrad.addColorStop(1, "#eedfcb");       // warm backing

      ctx.fillStyle = woodGrad;
      ctx.strokeStyle = "#4A3525";
      ctx.lineWidth = 30;

      ctx.beginPath();
      if ('roundRect' in ctx) {
        (ctx as any).roundRect(50, 80, canvas.width - 86, 530, 120);
      } else {
        ctx.rect(50, 80, canvas.width - 86, 530);
      }
      ctx.fill();
      ctx.stroke();

      // Draw horizontal planks line (replicates multiple planks with soft, elegant dark lines, Y-spaced for 530px height)
      ctx.strokeStyle = "rgba(74, 53, 37, 0.08)";
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(50, 225);
      ctx.lineTo(canvas.width - 36, 225);
      ctx.moveTo(50, 370);
      ctx.lineTo(canvas.width - 36, 370);
      ctx.moveTo(50, 515);
      ctx.lineTo(canvas.width - 36, 515);
      ctx.stroke();

      // Soft wood grain accents (rich variation without looking dark, Y-spaced for 530px height)
      ctx.strokeStyle = "rgba(74, 53, 37, 0.04)";
      ctx.lineWidth = 12;
      ctx.beginPath();
      ctx.moveTo(50, 150);
      ctx.lineTo(canvas.width - 36, 150);
      ctx.moveTo(50, 295);
      ctx.lineTo(canvas.width - 36, 295);
      ctx.moveTo(50, 445);
      ctx.lineTo(canvas.width - 36, 445);
      ctx.moveTo(50, 575);
      ctx.lineTo(canvas.width - 36, 575);
      ctx.stroke();

      // Additional thin soft grain accents
      ctx.strokeStyle = "rgba(74, 53, 37, 0.02)";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(50, 250);
      ctx.lineTo(canvas.width - 36, 250);
      ctx.moveTo(50, 480);
      ctx.lineTo(canvas.width - 36, 480);
      ctx.stroke();

      const logoImg = new Image();
      logoImg.crossOrigin = "anonymous";
      logoImg.src = "/logo.webp";

      logoImg.onload = () => {
        const imgSize = 420; // Just a little bit larger!
        const imgX = 110; // shifted left for tighter fit
        const imgY = 130; // shifted up visually to align perfectly with text (due to transparent asset padding)
        ctx.drawImage(logoImg, imgX, imgY, imgSize, imgSize);

        ctx.font = 'bold 345px "Luckiest Guy", cursive, sans-serif'; // Grew text size slightly more as requested
        ctx.textBaseline = "middle"; // perfectly center text vertically
        const textX = imgX + imgSize + 45; // shifted slightly left towards the logo
        const textY = 386; // shifted slightly down for beautiful vertical parity

        // Text Shadow
        ctx.fillStyle = "rgba(74, 53, 37, 0.3)";
        ctx.fillText("Mölyapinat", textX + 15, textY + 15);

        // Text Fill - using slate-900 to match the exact header brand look
        ctx.fillStyle = "#0f172a";
        ctx.fillText("Mölyapinat", textX, textY);

        resolve(canvas);
      };

      logoImg.onerror = () => {
        ctx.font = 'bold 345px "Luckiest Guy", sans-serif';
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        const textX = canvas.width / 2;
        const textY = 386;
        
        ctx.fillStyle = "rgba(74, 53, 37, 0.3)";
        ctx.fillText("Mölyapinat", textX + 15, textY + 15);
        
        ctx.fillStyle = "#0f172a";
        ctx.fillText("Mölyapinat", textX, textY);

        resolve(canvas);
      };
    });
  };

  const downloadTextLogo = () => {
    const canvas = generateTextLogoCanvas();
    const link = document.createElement("a");
    link.download = "molyapinat-tekstilogo.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    toast.success("Tekstilogo ladattu jättikoossa! 🍌");
  };

  const downloadWoodPlankLogo = async (type?: string) => {
    const canvas = await generateWoodPlankLogoCanvas();
    const link = document.createElement("a");
    link.download = "molyapinat-lankkulogo.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    toast.success("Lankkulogo ladattu jättikoossa! 🍌");
  };

  const previewTextLogo = () => {
    const canvas = generateTextLogoCanvas();
    setActiveLightboxImg(canvas.toDataURL("image/png"));
  };

  const previewWoodPlankLogo = async () => {
    const canvas = await generateWoodPlankLogoCanvas();
    setActiveLightboxImg(canvas.toDataURL("image/png"));
  };

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
    <section id="yhteystiedot" className="pt-12 md:pt-24 pb-24 md:pb-48 bg-secondary relative overflow-hidden">
      <MolyRainDisplay particles={particles} />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
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
          <p className="font-body text-xl md:text-2xl text-wood-dark max-w-4xl mx-auto font-bold mb-8">
            Haluatko meidät esiintymään? Laita viestiä alle tai sähköpostilla: <br className="md:hidden" />
            <a 
              href="mailto:jullenmusiikki@gmail.com" 
              className="text-forest-green hover:text-bright-orange transition-colors underline decoration-2 underline-offset-4"
            >
              jullenmusiikki@gmail.com
            </a>
          </p>
        </motion.div>

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
                        {item.isWoodPlank ? (
                          <div 
                            onClick={previewWoodPlankLogo}
                            className="w-28 h-28 md:w-32 md:h-32 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center relative p-1.5 border-2 border-wood-dark/15 cursor-zoom-in group select-none"
                            style={{ 
                              backgroundImage: 'conic-gradient(#e5e7eb 25%, transparent 25% 50%, #e5e7eb 50% 75%, transparent 75%)', 
                              backgroundSize: '16px 16px', 
                              backgroundColor: '#ffffff' 
                            }}
                          >
                            {woodPlankSrc ? (
                              <img 
                                src={woodPlankSrc} 
                                alt={item.title} 
                                className="w-full h-auto max-h-full object-contain transition-transform duration-300 group-hover:scale-105" 
                              />
                            ) : (
                              <div className="animate-pulse bg-slate-200 w-full h-full rounded-lg" />
                            )}
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                              <span className="text-white text-xs font-bold font-body px-2.5 py-1 bg-black/40 rounded-full backdrop-blur-xs">Esikatsele</span>
                            </div>
                          </div>
                        ) : item.isTextLogo ? (
                          <div 
                            onClick={previewTextLogo}
                            className="w-28 h-28 md:w-32 md:h-32 rounded-xl border-2 border-wood-dark/15 overflow-hidden flex-shrink-0 flex items-center justify-center relative cursor-zoom-in group p-1.5"
                            style={{ 
                              backgroundImage: 'conic-gradient(#e5e7eb 25%, transparent 25% 50%, #e5e7eb 50% 75%, transparent 75%)', 
                              backgroundSize: '16px 16px', 
                              backgroundColor: '#ffffff' 
                            }}
                          >
                            {textLogoSrc ? (
                              <img 
                                src={textLogoSrc} 
                                alt={item.title} 
                                className="w-full h-auto max-h-full object-contain transition-transform duration-300 group-hover:scale-[1.42] scale-[1.32]" 
                              />
                            ) : (
                              <div className="animate-pulse bg-slate-200 w-full h-full rounded-lg" />
                            )}
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                              <span className="text-white text-xs font-bold font-body px-2.5 py-1 bg-black/40 rounded-full backdrop-blur-xs">Esikatsele</span>
                            </div>
                          </div>
                        ) : item.isApinaLogo ? (
                          <div 
                            onClick={() => setActiveLightboxImg(item.previewPath || item.filePath)}
                            className="w-28 h-28 md:w-32 md:h-32 rounded-xl border-2 border-wood-dark/15 overflow-hidden flex-shrink-0 flex items-center justify-center relative cursor-zoom-in group p-3"
                            style={{ 
                              backgroundImage: 'conic-gradient(#e5e7eb 25%, transparent 25% 50%, #e5e7eb 50% 75%, transparent 75%)', 
                              backgroundSize: '16px 16px', 
                              backgroundColor: '#ffffff' 
                            }}
                          >
                            <img 
                              src={item.thumbnail} 
                              alt={item.title} 
                              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 select-none" 
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
                        <div className="flex flex-col gap-2.5 w-full md:w-auto">
                          {item.isWoodPlank ? (
                            <button
                              onClick={() => downloadWoodPlankLogo(item.plankType)}
                              className="flex items-center justify-center gap-2 bg-bright-orange text-white hover:brightness-105 active:scale-95 font-body font-bold text-sm px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer"
                            >
                              <Download className="w-4 h-4 stroke-[2.5]" />
                              Lataa lankku
                            </button>
                          ) : item.isTextLogo ? (
                            <button
                              onClick={downloadTextLogo}
                              className="flex items-center justify-center gap-2 bg-bright-orange text-white hover:brightness-105 active:scale-95 font-body font-bold text-sm px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer"
                            >
                              <Download className="w-4 h-4 stroke-[2.5]" />
                              Lataa logo
                            </button>
                          ) : (
                            <a
                              href={item.filePath}
                              download={item.fileName}
                              className="flex items-center justify-center gap-2 bg-bright-orange text-white hover:brightness-105 active:scale-95 font-body font-bold text-sm px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer"
                            >
                              <Download className="w-4 h-4 stroke-[2.5]" />
                              Lataa HQ
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
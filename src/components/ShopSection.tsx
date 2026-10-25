import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, Sparkles, ShieldCheck, Truck, Leaf, Check, X, 
  CreditCard, Smartphone, CheckCircle2, ArrowRight, Loader2, Lock,
  Ruler, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Info, Shirt, Sparkle, Plus, Minus, Trash2, ZoomIn
} from "lucide-react";
import { toast } from "sonner";

const SIZES = [
  { size: "XS", age: "4–5 v", height: "104–110 cm", widthCm: 41, lengthCm: 52, syncVariantId: 5567606606 },
  { size: "S", age: "6–8 v", height: "116–128 cm", widthCm: 43, lengthCm: 56, syncVariantId: 5567606607 },
  { size: "M", age: "9–10 v", height: "134–140 cm", widthCm: 46, lengthCm: 60, syncVariantId: 5567606608 },
  { size: "L", age: "11–12 v", height: "146–152 cm", widthCm: 48, lengthCm: 64, syncVariantId: 5567606609 },
  { size: "XL", age: "13–14 v", height: "158–164 cm", widthCm: 51, lengthCm: 67, syncVariantId: 5567606610 },
];

export const PRODUCT_IMAGES = [
  {
    src: "/molyapinat-virallinen-tpaita.webp",
    alt: "Mölyapinat lasten virallinen valkoinen T-paita bändilogolla pojan päällä",
    caption: "Mölyapinat lasten T-paita • Valkoinen",
  },
  {
    src: "/molyapinat-virallinen-tpaita2.webp",
    alt: "Mölyapinat lasten virallinen valkoinen T-paita tytön päällä",
    caption: "Iloinen apinalauma • Tyttömalli",
  },
  {
    src: "/molyapinat-virallinen-tpaita3.webp",
    alt: "Mölyapinat lasten T-paita viikattuna, lähikuva apinalogosta ja tekstistä",
    caption: "Viikattu paita • Lähikuva laadukkaasta printistä",
  },
  {
    src: "/molyapinat-virallinen-tpaita4.webp",
    alt: "Mölyapinat lasten virallinen valkoinen T-paita kokovartalokuva sivulta",
    caption: "Istuvuus ja mitoitus • Kokovartalo",
  },
];

export interface CartItem {
  size: string;
  age: string;
  height: string;
  quantity: number;
  unitPrice: number;
  syncVariantId: number;
}

export const ShopSection = () => {
  const [selectedSize, setSelectedSize] = useState<string>("S");
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [hasNavigatedImages, setHasNavigatedImages] = useState<boolean>(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState<"sizes" | "specs" | null>(null);

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setHasNavigatedImages(true);
    setActiveImageIndex((prev) => (prev === 0 ? PRODUCT_IMAGES.length - 1 : prev - 1));
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setHasNavigatedImages(true);
    setActiveImageIndex((prev) => (prev === PRODUCT_IMAGES.length - 1 ? 0 : prev + 1));
  };

  const handleSelectImage = (idx: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (idx !== 0) {
      setHasNavigatedImages(true);
    }
    setActiveImageIndex(idx);
  };

  // Näppäimistöohjaus suurennetulle kuvalle (Lightbox) ja taustan vierityksen esto
  useEffect(() => {
    if (!isLightboxOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        setHasNavigatedImages(true);
        setActiveImageIndex((prev) => (prev === 0 ? PRODUCT_IMAGES.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setHasNavigatedImages(true);
        setActiveImageIndex((prev) => (prev === PRODUCT_IMAGES.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isLightboxOpen]);
  
  // Ostoskori (Möly-Kori) tila
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartNotification, setCartNotification] = useState<{ size: string } | null>(null);

  const [isStripeModalOpen, setIsStripeModalOpen] = useState(false);
  const [stripeStep, setStripeStep] = useState<"checkout" | "processing" | "success">("checkout");

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("modal-open-change", {
        detail: { open: isCartOpen || isStripeModalOpen }
      })
    );
    if (isCartOpen || isStripeModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isCartOpen, isStripeModalOpen]);

  // Asiakastiedot toimitusta varten (Printful- ja Stripe-standardi)
  const [customerName, setCustomerName] = useState<string>("Matti Meikäläinen");
  const [customerEmail, setCustomerEmail] = useState<string>("asiakas@esimerkki.fi");
  const [customerPhone, setCustomerPhone] = useState<string>("040 123 4567");
  const [customerAddress, setCustomerAddress] = useState<string>("Kallionkatu 5 A 12");
  const [customerZip, setCustomerZip] = useState<string>("00530");
  const [customerCity, setCustomerCity] = useState<string>("Helsinki");

  // Täysautomaattinen Webhook -simulaatiotila (Tapa B)
  const [webhookStep, setWebhookStep] = useState<number>(0);
  const [showWebhookLog, setShowWebhookLog] = useState<boolean>(false);

  const price = "24,90 €";
  const activeVariant = SIZES.find((s) => s.size === selectedSize) || SIZES[1];

  // Jos ympäristömuuttujissa on oikea Stripe-linkki, ohjataan suoraan sinne
  const stripePaymentLink = import.meta.env.VITE_STRIPE_PAYMENT_LINK || "";

  // Ostoskorin toiminnot
  const handleAddToCart = (sizeToOrder: string) => {
    const variant = SIZES.find((s) => s.size === sizeToOrder) || SIZES[1];
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.size === sizeToOrder);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [
        ...prev,
        {
          size: variant.size,
          age: variant.age,
          height: variant.height,
          quantity: 1,
          unitPrice: 24.90,
          syncVariantId: variant.syncVariantId,
        },
      ];
    });
    setIsCartOpen(true);
    setCartNotification({ size: variant.size });
    setTimeout(() => {
      setCartNotification(null);
    }, 2000);
  };

  const handleUpdateQuantity = (sizeToChange: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.size === sizeToChange) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (sizeToRemove: string) => {
    setCartItems((prev) => prev.filter((item) => item.size !== sizeToRemove));
    toast.info("Tuote poistettu ostoskorista.");
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartAmount = cartItems.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
  const totalCartFormatted = totalCartAmount.toFixed(2).replace(".", ",") + " €";

  // Tuotteet kassa- ja simulaatiotilaa varten (korin sisältö tai valittu koko)
  const effectiveItems: CartItem[] = cartItems.length > 0 
    ? cartItems 
    : [
        {
          size: selectedSize,
          age: activeVariant.age,
          height: activeVariant.height,
          quantity: 1,
          unitPrice: 24.90,
          syncVariantId: activeVariant.syncVariantId,
        }
      ];
  const effectiveTotalAmount = effectiveItems.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
  const effectiveTotalFormatted = effectiveTotalAmount.toFixed(2).replace(".", ",") + " €";

  const handleCheckoutFromCart = () => {
    if (cartItems.length === 0) {
      toast.error("Ostoskorisi on tyhjä!");
      return;
    }
    setIsCartOpen(false);

    // Ohjataan aina suoraan viralliseen live Stripe -kassaan
    if (stripePaymentLink) {
      try {
        const url = new URL(stripePaymentLink);
        // Koostetaan korin sisältö selkeästi viitteeseen: esim. "1xS_2xM"
        const sizesSummary = cartItems.map((i) => `${i.quantity}x${i.size}`).join("_");
        url.searchParams.set("client_reference_id", `Molyapinat-${sizesSummary}`);
        window.open(url.toString(), "_blank", "noopener,noreferrer");
        return;
      } catch {
        window.open(stripePaymentLink, "_blank", "noopener,noreferrer");
        return;
      }
    }

    toast.error("Stripe-maksulinkkiä ei ole määritetty!");
  };

  const handleSimulateStripePayment = () => {
    setStripeStep("processing");
    setWebhookStep(1); // 1: Stripe vastaanottaa maksun

    setTimeout(() => {
      setWebhookStep(2); // 2: Stripe laukaisee Webhookin /api/stripe-webhook
    }, 700);

    setTimeout(() => {
      setWebhookStep(3); // 3: Poimitaan osoite & koko -> kutsutaan Printful API:a
    }, 1400);

    setTimeout(() => {
      setWebhookStep(4); // 4: Printful kuittaa tilauksen vastaanotetuksi
    }, 2100);

    setTimeout(() => {
      setStripeStep("success");
      toast.success("Maksu vahvistettu ja tilaus siirretty Printfulille automaattisesti! 🍌🚀");
    }, 2800);
  };

  return (
    <section id="kauppa" className="pt-12 md:pt-24 pb-24 md:pb-48 bg-secondary relative overflow-hidden">
      {/* Taustakoristeet */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
        <div className="absolute -top-10 -right-10 w-96 h-96 rounded-full bg-bright-orange blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-96 h-96 rounded-full bg-banana blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Otsikkoalue */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="inline-block wood-clean rounded-full px-6 py-4 md:px-12 md:py-6 shadow-2xl border-4 border-wood-dark relative overflow-hidden mb-5 max-w-[95vw]">
            <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl text-wood-dark text-shadow-fun flex items-center justify-center gap-2 md:gap-4 flex-wrap">
              <ShoppingBag className="w-6 h-6 md:w-9 md:h-9 text-bright-orange" />
              🐒 Möly-Kauppa 🍌
              <Sparkles className="w-6 h-6 md:w-9 md:h-9 text-banana" />
            </h2>
            <motion.div
              className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              animate={{ left: "200%" }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 1 }}
            />
          </div>
          <p className="font-body text-lg md:text-2xl text-wood-dark/85 max-w-2xl mx-auto font-bold">
            Pue päälle virallinen bändipaita ja liity apinalaumaan! 👕
          </p>
          <p className="font-body text-sm md:text-base text-wood-dark/80 font-semibold max-w-xl mx-auto mt-2 tracking-wide">
            Laadukkaat puuvillapaidat – ilmainen toimitus sisältyy hintaan!
          </p>
        </motion.div>

        {/* Tuote-Hero Kortti */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/95 backdrop-blur-md rounded-3xl border-3 md:border-4 border-wood-dark p-5 sm:p-7 md:p-10 shadow-2xl overflow-hidden relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
              
              {/* Vasen sarake: Tuotekuva, kuvateksti ja sen alla Haitari (Accordion) */}
              <div className="space-y-4">
                {/* Tuotekuvakaruselli */}
                <div className="space-y-3">
                  <div 
                    onClick={() => setIsLightboxOpen(true)}
                    className="relative group aspect-square rounded-2xl overflow-hidden border-2 md:border-3 border-wood-dark/15 shadow-md bg-secondary/20 flex items-center justify-center p-3 select-none cursor-zoom-in"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setIsLightboxOpen(true);
                      }
                    }}
                    aria-label="Klikkaa kuvaa suurentaaksesi sen koko ruutuun"
                  >
                    {/* Karusellikuva pehmeällä animaatiolla */}
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={PRODUCT_IMAGES[activeImageIndex].src}
                        src={PRODUCT_IMAGES[activeImageIndex].src}
                        alt={PRODUCT_IMAGES[activeImageIndex].alt}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.25 }}
                        className="w-full h-full object-contain pointer-events-none transition-transform duration-300 group-hover:scale-103"
                        width={800}
                        height={800}
                      />
                    </AnimatePresence>

                    {/* UUTUUS-leima (Vain ensimmäisessä kuvassa ennen kuin asiakas vaihtaa kuvaa) */}
                    {!hasNavigatedImages && activeImageIndex === 0 && (
                      <div className="absolute top-3 left-3 bg-bright-orange text-white font-heading text-xs md:text-sm px-3.5 py-1 rounded-full shadow-md border border-white/30 flex items-center gap-1.5 animate-bounce-gentle z-10 pointer-events-none">
                        <Sparkles className="w-3.5 h-3.5" />
                        UUTUUS!
                      </div>
                    )}

                    {/* Kuvanumeroindikaattori */}
                    <div className="absolute top-3 right-3 bg-wood-dark/75 backdrop-blur-xs text-white text-[11px] font-heading px-2.5 py-1 rounded-full shadow-xs z-10 pointer-events-none">
                      {activeImageIndex + 1} / {PRODUCT_IMAGES.length}
                    </div>

                    {/* Hover-vihje suurennukseen */}
                    <div className="absolute bottom-3 right-3 bg-white/95 text-wood-dark px-2.5 py-1 rounded-xl shadow-md border border-wood-dark/15 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center gap-1.5 text-[11px] font-heading pointer-events-none">
                      <ZoomIn className="w-3.5 h-3.5 text-forest-green" />
                      <span>Klikkaa suuremmaksi</span>
                    </div>

                    {/* Karusellin navigointipainikkeet (Edellinen / Seuraava) */}
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      aria-label="Edellinen tuotekuva"
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-wood-dark shadow-lg border border-wood-dark/15 flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95 z-20 focus:outline-none focus:ring-2 focus:ring-bright-orange"
                    >
                      <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      aria-label="Seuraava tuotekuva"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-wood-dark shadow-lg border border-wood-dark/15 flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95 z-20 focus:outline-none focus:ring-2 focus:ring-bright-orange"
                    >
                      <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Pikkukuvat (Thumbnails) ja dynaaminen seliteksti */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-1">
                    {/* Pikkukuvat */}
                    <div className="flex items-center gap-2">
                      {PRODUCT_IMAGES.map((img, idx) => (
                        <button
                          key={img.src}
                          type="button"
                          onClick={(e) => handleSelectImage(idx, e)}
                          aria-label={`Näytä kuva ${idx + 1}: ${img.caption}`}
                          className={`w-12 h-12 rounded-xl overflow-hidden border-2 p-0.5 transition-all cursor-pointer bg-white shadow-2xs ${
                            activeImageIndex === idx 
                              ? "border-forest-green scale-105 shadow-sm ring-2 ring-forest-green/20" 
                              : "border-wood-dark/20 hover:border-bright-orange/60 opacity-70 hover:opacity-100"
                          }`}
                        >
                          <img 
                            src={img.src} 
                            alt="" 
                            className="w-full h-full object-contain rounded-lg" 
                            loading="lazy"
                            width={48}
                            height={48}
                          />
                        </button>
                      ))}
                    </div>

                    {/* Aktiivisen kuvan dynaaminen otsikko */}
                    <div className="flex items-center gap-1.5 text-center sm:text-right">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-forest-green shrink-0" />
                      <span className="font-body text-xs text-wood-dark/85 font-bold">
                        {PRODUCT_IMAGES[activeImageIndex].caption}
                      </span>
                    </div>
                  </div>
                </div>

                {/* HAITARI KUVAN ALAPUOLELLA (Oletuksena molemmat piilossa) */}
                <div className="pt-1 space-y-2">
                  
                  {/* Haitari 1: Mittataulukko */}
                  <div className="border border-wood-dark/15 rounded-2xl overflow-hidden bg-white/70 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setOpenAccordion(openAccordion === "sizes" ? null : "sizes")}
                      className="w-full flex items-center justify-between p-3 sm:p-3.5 text-left font-heading text-xs sm:text-sm text-wood-dark hover:bg-sand/30 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2 text-forest-green">
                        <Ruler className="w-4 h-4" />
                        <span>Mittataulukko (cm)</span>
                      </span>
                      {openAccordion === "sizes" ? (
                        <ChevronUp className="w-4 h-4 text-wood-dark/60" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-wood-dark/60" />
                      )}
                    </button>

                    <AnimatePresence>
                      {openAccordion === "sizes" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden border-t border-wood-dark/10 bg-white"
                        >
                          <div className="p-3 sm:p-4">
                            <p className="font-body text-[11px] text-wood-dark/70 mb-2 italic">
                              *Leveys mitattu kainalosta kainaloon, pituus olalta helmaan.
                            </p>
                            <div className="overflow-x-auto">
                              <table className="w-full text-left font-body text-xs border-collapse">
                                <thead>
                                  <tr className="border-b border-wood-dark/15 text-wood-dark font-bold">
                                    <th className="py-1 px-1.5">Koko</th>
                                    <th className="py-1 px-1.5">Ikä</th>
                                    <th className="py-1 px-1.5">Pituus</th>
                                    <th className="py-1 px-1.5 text-center">Leveys</th>
                                    <th className="py-1 px-1.5 text-center">Pituus</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-wood-dark/5">
                                  {SIZES.map((s) => (
                                    <tr 
                                      key={s.size} 
                                      className={`cursor-pointer transition-colors ${selectedSize === s.size ? "bg-mint/40 font-bold" : "hover:bg-sand/30"}`}
                                      onClick={() => setSelectedSize(s.size)}
                                    >
                                      <td className="py-1.5 px-1.5 font-heading text-forest-green">{s.size}</td>
                                      <td className="py-1.5 px-1.5 text-wood-dark/80">{s.age}</td>
                                      <td className="py-1.5 px-1.5 text-wood-dark/80">{s.height}</td>
                                      <td className="py-1.5 px-1.5 text-center font-semibold">{s.widthCm} cm</td>
                                      <td className="py-1.5 px-1.5 text-center font-semibold">{s.lengthCm} cm</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Haitari 2: Tuotekuvaus & Materiaali */}
                  <div className="border border-wood-dark/15 rounded-2xl overflow-hidden bg-white/70 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setOpenAccordion(openAccordion === "specs" ? null : "specs")}
                      className="w-full flex items-center justify-between p-3 sm:p-3.5 text-left font-heading text-xs sm:text-sm text-wood-dark hover:bg-sand/30 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2 text-forest-green">
                        <Shirt className="w-4 h-4" />
                        <span>Tuotekuvaus & Materiaali</span>
                      </span>
                      {openAccordion === "specs" ? (
                        <ChevronUp className="w-4 h-4 text-wood-dark/60" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-wood-dark/60" />
                      )}
                    </button>

                    <AnimatePresence>
                      {openAccordion === "specs" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden border-t border-wood-dark/10 bg-sand/30"
                        >
                          <div className="p-3.5 space-y-2.5 text-xs font-body text-wood-dark/85">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              <div>
                                <p className="font-bold text-wood-dark">👕 Paitamalli & Kangas:</p>
                                <p className="text-wood-dark/75">
                                  Gildan 5000B Heavy Cotton Youth. 100 % pehmeää esipestyä puuvillaa (170–180 g/m²).
                                </p>
                              </div>
                              <div>
                                <p className="font-bold text-wood-dark">🌿 Turvallisuus & Iho:</p>
                                <p className="text-wood-dark/75">
                                  OEKO-TEX® Standard 100 -sertifioitu (tutkitusti haitta-aineeton ja turvallinen lapsille).
                                </p>
                              </div>
                              <div>
                                <p className="font-bold text-wood-dark">✨ Mukavuus & Viimeistely:</p>
                                <p className="text-wood-dark/75">
                                  Pyöreä ribbineuloskaulus, teipatut niska- ja olkasaumat sekä repäistävä kokolappu.
                                </p>
                              </div>
                              <div>
                                <p className="font-bold text-wood-dark">📦 Valmistus & Toimitus:</p>
                                <p className="text-wood-dark/75">
                                  Painettu ja toimitettu EU:ssa (Riika, Latvia) seurantakoodilla (Posti).
                                </p>
                              </div>
                              <div>
                                <p className="font-bold text-wood-dark">🔄 Vaihdot & Palautukset:</p>
                                <p className="text-wood-dark/75">
                                  Tuotteet valmistetaan mittatilaustyönä. Koon vaihto tai palautus 14 vrk yhteydenotolla (asiakas vastaa palautuksen postikuluista Keravalle). Virheelliset tuotteet korvataan aina uudella veloituksetta.
                                </p>
                              </div>
                            </div>
                            <div className="pt-2 border-t border-wood-dark/10 text-[11px] text-wood-dark/65 italic">
                              Pesuohje: Konepesu 30–40 °C nurinpäin samanväristen kanssa. Ei rumpukuivausta printin suojaamiseksi.
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Oikea sarake: Tuotetiedot, kokovalinta, Lisää ostoskoriin -painike ja Maksutavat */}
              <div className="space-y-5">
                <div>
                  <span className="inline-block bg-mint text-forest font-body font-black text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-forest/15 shadow-xs mb-2">
                    Virallinen Bändipaita
                  </span>
                  <h3 className="font-heading text-2xl md:text-3xl text-wood-dark leading-tight">
                    Mölyapinat Lasten T-Paita
                  </h3>
                  <div className="flex items-baseline flex-wrap gap-2.5 mt-2">
                    <span className="font-heading text-3xl md:text-4xl text-bright-orange">
                      {price}
                    </span>
                    <span className="font-body text-xs md:text-sm text-forest-green font-bold bg-mint/60 px-3 py-1 rounded-full border border-forest/10">
                      Sisältää toimituskulut ja ALV:n 📦
                    </span>
                  </div>
                </div>

                {/* Koko-pillerit & Senttikoot */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="font-body font-bold text-sm text-wood-dark">
                      Valitse koko:
                    </label>
                    <span className="text-xs font-body text-wood-dark/70">
                      (Tarkat mitat mittataulukossa)
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {SIZES.map((item) => {
                      const isSelected = selectedSize === item.size;
                      return (
                        <button
                          key={item.size}
                          type="button"
                          onClick={() => setSelectedSize(item.size)}
                          className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl border-2 transition-all cursor-pointer ${
                            isSelected
                              ? "bg-forest-green text-white border-forest-green shadow-md scale-105"
                              : "bg-white text-wood-dark border-wood-dark/15 hover:border-bright-orange/50 hover:bg-sand/50"
                          }`}
                        >
                          <span className="font-heading text-sm md:text-base">{item.size}</span>
                          <span className={`text-[10px] font-body ${isSelected ? "text-white/80" : "text-wood-dark/60"}`}>
                            {item.age}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Valitun koon tarkat senttimitat */}
                  <div className="bg-sand/50 border border-wood-dark/15 rounded-xl p-2.5 flex items-center justify-between text-xs font-body">
                    <span className="text-wood-dark/85">
                      Valittu koko: <strong className="text-forest-green font-bold">{selectedSize} ({activeVariant.age}, {activeVariant.height})</strong>
                    </span>
                    <span className="text-wood-dark font-bold bg-white px-2 py-0.5 rounded-lg border border-wood-dark/10 shadow-2xs">
                      L: {activeVariant.widthCm} cm • P: {activeVariant.lengthCm} cm
                    </span>
                  </div>
                </div>

                {/* TOIMINTAPAINIKE: LISÄÄ OSTOSKORIIN */}
                <div className="pt-2 space-y-3">
                  <motion.button
                    type="button"
                    onClick={() => handleAddToCart(selectedSize)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-forest-green hover:brightness-110 text-white p-3.5 sm:p-4 rounded-2xl shadow-xl flex items-center justify-between gap-3 transition-all cursor-pointer group border-2 border-forest-green/20"
                  >
                    <div className="flex items-center gap-3 text-left min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <ShoppingBag className="w-5 h-5 text-white stroke-[2.5]" />
                      </div>
                      <div className="font-heading text-base sm:text-lg md:text-xl leading-tight tracking-wide text-white">
                        Lisää ostoskoriin
                      </div>
                    </div>
                    <div className="bg-white text-forest-green px-3.5 py-1.5 sm:py-2 rounded-xl font-heading text-base sm:text-lg md:text-xl shrink-0 shadow-md">
                      {price}
                    </div>
                  </motion.button>

                  {/* MAKSUTAVAT SUUREMPINA JA SSL-SUOJAUS TIIVIINÄ */}
                  <div className="bg-slate-50/95 border-2 border-slate-200/80 rounded-2xl p-3.5 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-body font-bold text-slate-700">
                        Tuetut maksutavat:
                      </span>
                      <span className="font-sans font-black text-xs text-[#635BFF] bg-[#635BFF]/10 px-2 py-0.5 rounded border border-[#635BFF]/20">
                        stripe
                      </span>
                    </div>

                    {/* 4 päämaksutapaa: Vipps MobilePay, Apple Pay, Visa, Mastercard */}
                    <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                      {/* MobilePay (uusi Vipps-ilme: aito pyöristetty neliö) */}
                      <div className="bg-white border-2 border-slate-200 hover:border-[#4957FF]/40 rounded-xl py-2 px-1 flex flex-col items-center justify-center gap-1 shadow-2xs min-h-[56px] transition-all">
                        <img 
                          src="/vipps-mobilepay.png" 
                          alt="MobilePay" 
                          className="w-7 h-7 object-contain shrink-0" 
                        />
                        <span className="text-[#4957FF] font-bold font-sans text-[10px] sm:text-[11px] leading-none tracking-tight text-center">
                          MobilePay
                        </span>
                      </div>

                      {/* Apple Pay */}
                      <div className="bg-white border-2 border-slate-200 hover:border-slate-300 rounded-xl py-2 px-1 flex flex-col items-center justify-center gap-1 shadow-2xs min-h-[56px] transition-all">
                        <span className="text-slate-900 font-bold font-sans text-xs sm:text-sm flex items-center leading-none">
                          <span className="text-base sm:text-lg leading-none"></span>Pay
                        </span>
                        <span className="text-slate-400 font-sans text-[9px] leading-none">
                          Apple Pay
                        </span>
                      </div>

                      {/* Visa */}
                      <div className="bg-white border-2 border-slate-200 hover:border-[#1A1F71]/40 rounded-xl py-2 px-1 flex flex-col items-center justify-center gap-1 shadow-2xs min-h-[56px] transition-all">
                        <span className="text-[#1A1F71] font-black font-sans italic text-xs sm:text-sm tracking-widest leading-none pt-0.5">
                          VISA
                        </span>
                        <span className="text-slate-400 font-sans text-[9px] leading-none">
                          Korttimaksu
                        </span>
                      </div>

                      {/* Mastercard */}
                      <div className="bg-white border-2 border-slate-200 hover:border-[#EB001B]/40 rounded-xl py-2 px-1 flex flex-col items-center justify-center gap-1 shadow-2xs min-h-[56px] transition-all">
                        <div className="flex -space-x-1.5 items-center justify-center shrink-0">
                          <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B]" />
                          <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] opacity-90" />
                        </div>
                        <span className="text-slate-700 font-bold font-sans text-[10px] sm:text-[11px] leading-none tracking-tight text-center">
                          Mastercard
                        </span>
                      </div>
                    </div>

                    {/* Pieni, rauhoittava luottamusrivi */}
                    <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] font-body text-slate-500 border-t border-slate-200/80">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>256-bittinen SSL-salattu Stripe-maksu • PCI DSS Level 1 -suojaus</span>
                    </div>
                  </div>

                  {/* Tilaus- ja palautusehdot (Tilaustyö & koon valinta) */}
                  <div className="bg-sand/60 border border-wood-dark/15 rounded-2xl p-3.5 text-xs text-wood-dark/85 space-y-1.5 leading-relaxed">
                    <div className="flex items-center gap-1.5 font-heading text-xs text-wood-dark">
                      <Info className="w-3.5 h-3.5 text-bright-orange shrink-0" />
                      <span>Tilaus- ja palautusehdot</span>
                    </div>
                    <p className="text-[11px] text-wood-dark/80">
                      Jokainen Mölyapinat-bändipaita painetaan tuoreeltaan vasta tilauksesta turhan tekstiilihävikin välttämiseksi. Pyydämme tarkistamaan koon huolella yllä olevasta kokotaulukosta.
                    </p>
                    <div className="text-[11px] text-wood-dark/75 pt-1.5 border-t border-wood-dark/10 space-y-1">
                      <p>
                        • <strong>Viallinen tuote:</strong> Korvataan aina 100 % veloituksetta uudella ehjällä.
                      </p>
                      <p>
                        • <strong>Koon vaihto tai palautus:</strong> 14 vrk yhteydenotto osoitteeseen{" "}
                        <a 
                          href="mailto:jullenmusiikki@gmail.com" 
                          className="font-bold text-forest-green underline hover:text-bright-orange transition-colors"
                        >
                          jullenmusiikki@gmail.com
                        </a>
                        . Asiakas vastaa palautuksen postikuluista (kotimaan toimitus Keravalle).
                      </p>
                    </div>
                  </div>


                </div>
              </div>
            </div>

            {/* Alaosan luottamuslaatikot */}
            <div className="mt-8 pt-6 border-t-2 border-dashed border-wood-dark/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center p-3 rounded-xl bg-background/60">
                <ShieldCheck className="w-6 h-6 text-[#635BFF] mb-1" />
                <span className="font-heading text-xs text-wood-dark">Stripe Checkout</span>
                <span className="font-body text-[11px] text-wood-dark/70">Pankkitasoinen suojattu maksunvälitys</span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-xl bg-background/60">
                <Truck className="w-6 h-6 text-bright-orange mb-1" />
                <span className="font-heading text-xs text-wood-dark">Ilmainen toimitus</span>
                <span className="font-body text-[11px] text-wood-dark/70">Toimituskulut ja ALV sisältyvät hintaan</span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-xl bg-background/60">
                <Sparkles className="w-6 h-6 text-banana mb-1" />
                <span className="font-heading text-xs text-wood-dark">Vastuullinen EU-tuotanto</span>
                <span className="font-body text-[11px] text-wood-dark/70">Painetaan vasta tilauksesta EU:ssa</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* KELLUVA OSTOSKORIPAINIKE (Aina kun korissa on vähintään 1 tuote) */}
      <AnimatePresence>
        {totalCartCount > 0 && !isCartOpen && (
          <motion.button
            type="button"
            initial={{ scale: 0, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 30 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-6 right-6 z-40 bg-bright-orange hover:bg-bright-orange/95 text-white font-heading px-5 py-3.5 rounded-full shadow-2xl border-2 border-white flex items-center gap-3 cursor-pointer"
            aria-label="Avaa ostoskori"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-white" />
              <span className="absolute -top-2.5 -right-2.5 bg-forest-green text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black border border-white shadow-xs">
                {totalCartCount}
              </span>
            </div>
            <span className="text-sm tracking-wide">Ostoskori</span>
            <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-xs font-bold">
              {totalCartFormatted}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* OSTOSKORI SLIDE-OVER DRAWER (MÖLY-KORI) */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[70] overflow-hidden">
            {/* Tummennus ja sulku taustaa klikkaamalla */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 26, stiffness: 260 }}
                className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-wood-dark/10"
              >
                {/* Yläpalkki */}
                <div className="p-4 sm:p-5 border-b border-wood-dark/10 flex items-center justify-between bg-sand/30">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-forest-green/10 flex items-center justify-center text-forest-green">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg sm:text-xl text-wood-dark leading-tight">
                        Möly-Ostoskori 🍌
                      </h3>
                      <p className="font-body text-xs text-wood-dark/70">
                        {totalCartCount} {totalCartCount === 1 ? "tuote" : "tuotetta"} valittuna
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="w-8 h-8 rounded-full bg-sand/60 hover:bg-sand text-wood-dark flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Sulje ostoskori"
                  >
                    <X className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

                {/* Korin tuoterivit */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-16 space-y-3">
                      <div className="w-16 h-16 rounded-full bg-sand flex items-center justify-center mx-auto text-wood-dark/40">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                      <h4 className="font-heading text-base text-wood-dark">Ostoskorisi on tyhjä</h4>
                      <p className="font-body text-xs text-wood-dark/70 max-w-xs mx-auto">
                        Valitse alta koko ja lisää virallinen lasten bändipaita mukaan apinalaumaan!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div
                          key={item.size}
                          className="flex items-center gap-3 p-3 rounded-2xl border border-wood-dark/10 bg-sand/20 shadow-2xs"
                        >
                          <img
                            src="/molyapinat-virallinen-tpaita.webp"
                            alt="T-paita"
                            className="w-16 h-16 rounded-xl object-contain bg-white border border-wood-dark/10 p-1 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-heading text-xs sm:text-sm text-wood-dark truncate">
                              Mölyapinat lasten T-paita
                            </h4>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="bg-forest-green text-white font-heading text-[11px] px-2 py-0.5 rounded-md">
                                Koko {item.size}
                              </span>
                              <span className="text-[11px] font-body text-wood-dark/70">
                                ({item.age})
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              {/* Määränsäätimet */}
                              <div className="flex items-center gap-2 bg-white border border-wood-dark/15 rounded-lg px-2 py-0.5 shadow-2xs">
                                <button
                                  type="button"
                                  onClick={() => handleUpdateQuantity(item.size, -1)}
                                  className="text-wood-dark/70 hover:text-wood-dark font-bold cursor-pointer"
                                  aria-label="Vähennä"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="font-heading text-xs px-1 text-wood-dark min-w-[16px] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateQuantity(item.size, 1)}
                                  className="text-wood-dark/70 hover:text-wood-dark font-bold cursor-pointer"
                                  aria-label="Lisää"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Hinta ja poisto */}
                              <div className="flex items-center gap-2">
                                <span className="font-heading text-xs sm:text-sm text-bright-orange font-bold">
                                  {(item.quantity * item.unitPrice).toFixed(2).replace(".", ",")} €
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveFromCart(item.size)}
                                  className="text-wood-dark/40 hover:text-red-600 transition-colors cursor-pointer p-1"
                                  aria-label="Poista tuote"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Korin alaosa & Siirry kassalle */}
                {cartItems.length > 0 && (
                  <div className="p-4 sm:p-5 border-t border-wood-dark/10 bg-white space-y-3">
                    <div className="space-y-1.5 text-xs font-body text-wood-dark/80">
                      <div className="flex justify-between">
                        <span>Välisumma</span>
                        <span className="font-bold">{totalCartFormatted}</span>
                      </div>
                      <div className="flex justify-between text-forest-green font-medium">
                        <span>Toimituskulut (Posti)</span>
                        <span className="font-bold">Sisältyy hintaan (0,00 €)</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-wood-dark/10 text-base font-heading text-wood-dark">
                        <span>Yhteensä (sis. ALV)</span>
                        <span className="text-bright-orange text-xl">{totalCartFormatted}</span>
                      </div>
                    </div>

                    <motion.button
                      type="button"
                      onClick={handleCheckoutFromCart}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-[#635BFF] hover:bg-[#5349EE] text-white py-3.5 sm:py-4 px-5 rounded-2xl font-heading text-base sm:text-lg flex items-center justify-between shadow-xl cursor-pointer transition-all border border-white/20"
                    >
                      <div className="flex items-center gap-2">
                        <Lock className="w-5 h-5" />
                        <span>Siirry kassalle</span>
                      </div>
                      <span className="bg-white text-[#635BFF] px-3 py-1 rounded-xl font-heading text-base shadow-xs">
                        {totalCartFormatted}
                      </span>
                    </motion.button>

                    <div className="text-center pt-0.5">
                      <button
                        type="button"
                        onClick={() => setIsCartOpen(false)}
                        className="text-xs font-body text-wood-dark/60 hover:text-wood-dark underline transition-colors cursor-pointer"
                      >
                        ← Jatka tuotteiden selailua
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* SUURENNETTU KUVA (POP-UP / LIGHTBOX) */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-hidden select-none"
            role="dialog"
            aria-modal="true"
            aria-label="Suurennettu tuotekuva"
          >
            {/* Sulkemispainike oikeassa yläkulmassa */}
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer z-[110] border border-white/20 focus:outline-none"
              aria-label="Sulje suurennettu kuva"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>

            {/* Kuvanumeroindikaattori ylävasemmalla */}
            <div className="absolute top-5 left-5 text-white/80 font-heading text-xs sm:text-sm px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-xs z-[110]">
              {activeImageIndex + 1} / {PRODUCT_IMAGES.length}
            </div>

            {/* Navigointinuoli: Edellinen kuva */}
            <button
              type="button"
              onClick={handlePrevImage}
              aria-label="Edellinen kuva"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer z-[110] border border-white/20 hover:scale-110 active:scale-95 focus:outline-none"
            >
              <ChevronLeft className="w-8 h-8 stroke-[2.5]" />
            </button>

            {/* Navigointinuoli: Seuraava kuva */}
            <button
              type="button"
              onClick={handleNextImage}
              aria-label="Seuraava kuva"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer z-[110] border border-white/20 hover:scale-110 active:scale-95 focus:outline-none"
            >
              <ChevronRight className="w-8 h-8 stroke-[2.5]" />
            </button>

            {/* Pääkuva ja tekstit keskellä */}
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="relative max-w-4xl w-full flex flex-col items-center justify-center my-auto px-4"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={PRODUCT_IMAGES[activeImageIndex].src}
                  src={PRODUCT_IMAGES[activeImageIndex].src}
                  alt={PRODUCT_IMAGES[activeImageIndex].alt}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.2 }}
                  className="max-h-[62vh] sm:max-h-[72vh] max-w-full object-contain rounded-2xl drop-shadow-2xl"
                />
              </AnimatePresence>

              {/* Kuvateksti ja pikkukuvat Lightboxin alareunassa */}
              <div className="mt-4 text-center space-y-2.5">
                <p className="font-heading text-sm sm:text-base text-white tracking-wide">
                  {PRODUCT_IMAGES[activeImageIndex].caption}
                </p>

                <div className="flex items-center justify-center gap-2">
                  {PRODUCT_IMAGES.map((img, idx) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={(e) => handleSelectImage(idx, e)}
                      className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 p-0.5 transition-all cursor-pointer bg-white/10 ${
                        activeImageIndex === idx 
                          ? "border-bright-orange scale-105 shadow-lg ring-2 ring-bright-orange/40" 
                          : "border-white/30 hover:border-white/70 opacity-60 hover:opacity-100"
                      }`}
                      aria-label={`Siirry kuvaan ${idx + 1}`}
                    >
                      <img src={img.src} alt="" className="w-full h-full object-contain rounded-lg" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VIRALLINEN STRIPE CHECKOUT -SIMULAATTORI / NÄKYMÄ */}
      <AnimatePresence>
        {isStripeModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsStripeModalOpen(false)}
            className="fixed inset-0 z-[80] flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-slate-200"
            >
              {/* Yläpalkki: checkout.stripe.com -osoitepalkki (Tuo 100% luotettavuuden) */}
              <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs font-mono text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
                  </div>
                  <span className="text-slate-400">|</span>
                  <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-md border border-slate-200 shadow-xs text-slate-700">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    <span className="font-sans font-medium text-[11px]">https://checkout.stripe.com/pay/molyapinat</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsStripeModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                  aria-label="Sulje"
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              {stripeStep === "checkout" && (
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                  
                  {/* Vasen puoli: Stripen tuote- ja tilausyhteenveto */}
                  <div className="p-6 md:p-10 bg-slate-50/70 space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="font-sans font-black text-[#635BFF] text-2xl tracking-tight">stripe</span>
                        <span className="text-slate-300 text-lg">|</span>
                        <span className="font-sans font-semibold text-slate-700 text-xs sm:text-sm">Mölyapinat Virallinen Kauppa</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-200/60">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>SSL-suojattu</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">Maksettava summa</p>
                      <h3 className="font-sans font-bold text-4xl text-slate-900 tracking-tight">{effectiveTotalFormatted}</h3>
                    </div>

                    <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                      {effectiveItems.map((item) => (
                        <div key={item.size} className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
                          <img
                            src="/molyapinat-virallinen-tpaita.webp"
                            alt="T-paita"
                            className="w-14 h-14 rounded-xl border border-slate-100 bg-slate-50 object-contain p-1 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-sans font-bold text-xs sm:text-sm text-slate-900 truncate">
                              Mölyapinat virallinen T-paita
                            </h4>
                            <p className="font-sans text-xs text-slate-500 mt-0.5">
                              Koko: <strong className="text-slate-800">{item.size} ({item.age})</strong> • {item.quantity} kpl
                            </p>
                            <p className="font-sans text-xs text-emerald-600 font-semibold mt-0.5">
                              {(item.quantity * item.unitPrice).toFixed(2).replace(".", ",")} € • Ilmainen toimitus
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 space-y-1.5 font-sans">
                      <div className="flex justify-between">
                        <span>Välisumma</span>
                        <span>{effectiveTotalFormatted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Toimitus</span>
                        <span className="text-emerald-600 font-bold">Maksuton (0,00 €)</span>
                      </div>
                      <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-200 text-sm">
                        <span>Yhteensä</span>
                        <span>{effectiveTotalFormatted}</span>
                      </div>
                    </div>
                  </div>

                  {/* Oikea puoli: Stripen viralliset maksukentät */}
                  <div className="p-6 md:p-10 space-y-6">
                    {/* Pikamaksut (MobilePay & Apple Pay) */}
                    <div className="space-y-2.5">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">
                        Pikamaksu
                      </p>

                      {/* MobilePay-painike Stripen tyylillä */}
                      <button
                        type="button"
                        onClick={handleSimulateStripePayment}
                        className="w-full bg-[#5A78FF] hover:bg-[#4866ea] text-white py-3.5 px-4 rounded-xl font-sans font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                      >
                        <Smartphone className="w-5 h-5" />
                        Maksa MobilePaylla
                      </button>

                      {/* Apple Pay -painike Stripen tyylillä */}
                      <button
                        type="button"
                        onClick={handleSimulateStripePayment}
                        className="w-full bg-black hover:bg-neutral-800 text-white py-3.5 px-4 rounded-xl font-sans font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                      >
                        <span className="text-lg"></span>
                        <span>Pay</span>
                      </button>
                    </div>

                    <div className="relative flex py-1 items-center">
                      <div className="flex-grow border-t border-slate-200" />
                      <span className="flex-shrink mx-3 text-slate-400 text-xs font-sans">tai korttimaksu</span>
                      <div className="flex-grow border-t border-slate-200" />
                    </div>

                    {/* Stripen viralliset kentät: Yhteystiedot + Toimitusosoite + Maksutiedot */}
                    <div className="space-y-4 font-sans text-xs">
                      
                      {/* 1. Yhteystiedot */}
                      <div className="space-y-2">
                        <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                          1. Yhteystiedot
                        </span>
                        <div>
                          <label className="text-slate-600 block mb-1 font-medium">Sähköposti (kuitti ja seurantakoodi)</label>
                          <input
                            type="email"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg p-2 text-slate-800 focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] outline-none"
                            placeholder="esimerkki@sahkoposti.fi"
                          />
                        </div>
                        <div>
                          <label className="text-slate-600 block mb-1 font-medium">Puhelinnumero (tekstiviesti-saapumisilmoitus)</label>
                          <input
                            type="tel"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg p-2 text-slate-800 focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] outline-none"
                            placeholder="+358 40 123 4567"
                          />
                        </div>
                      </div>

                      {/* 2. Toimitusosoite (Printful-standardi) */}
                      <div className="space-y-2 pt-1 border-t border-slate-200">
                        <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block pt-1">
                          2. Toimitusosoite (Printful-toimitus)
                        </span>
                        <div>
                          <label className="text-slate-600 block mb-1 font-medium">Vastaanottajan koko nimi</label>
                          <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg p-2 text-slate-800 focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] outline-none"
                            placeholder="Etunimi ja Sukunimi"
                          />
                        </div>
                        <div>
                          <label className="text-slate-600 block mb-1 font-medium">Katuosoite ja asunnon nro</label>
                          <input
                            type="text"
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg p-2 text-slate-800 focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] outline-none"
                            placeholder="Esim. Kallionkatu 5 A 12"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-slate-600 block mb-1 font-medium">Postinumero</label>
                            <input
                              type="text"
                              value={customerZip}
                              onChange={(e) => setCustomerZip(e.target.value)}
                              className="w-full border border-slate-300 rounded-lg p-2 text-slate-800 focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] outline-none"
                              placeholder="00530"
                            />
                          </div>
                          <div>
                            <label className="text-slate-600 block mb-1 font-medium">Postitoimipaikka</label>
                            <input
                              type="text"
                              value={customerCity}
                              onChange={(e) => setCustomerCity(e.target.value)}
                              className="w-full border border-slate-300 rounded-lg p-2 text-slate-800 focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] outline-none"
                              placeholder="Helsinki"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-slate-600 block mb-1 font-medium">Maa</label>
                          <div className="w-full border border-slate-200 bg-slate-50 rounded-lg p-2 text-slate-700 font-medium">
                            🇫🇮 Suomi (Finland)
                          </div>
                        </div>
                      </div>

                      {/* 3. Korttitiedot */}
                      <div className="space-y-2 pt-1 border-t border-slate-200">
                        <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block pt-1">
                          3. Maksutapa
                        </span>
                        <div className="border border-slate-300 rounded-lg p-2.5 flex items-center justify-between bg-white text-slate-700 shadow-2xs">
                          <span className="font-mono">4242 •••• •••• 4242</span>
                          <span className="text-slate-400 font-mono">12/28 • CVC</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleSimulateStripePayment}
                        className="w-full bg-[#635BFF] hover:bg-[#5349EE] text-white py-3.5 px-4 rounded-xl font-sans font-bold text-sm shadow-md transition-all cursor-pointer mt-3 flex items-center justify-center gap-2"
                      >
                        <Lock className="w-4 h-4" />
                        Maksa {effectiveTotalFormatted}
                      </button>
                    </div>

                    <div className="pt-2 text-center">
                      <p className="text-[11px] text-slate-400 font-sans flex items-center justify-center gap-1">
                        <Lock className="w-3 h-3 text-slate-400" />
                        Suojattu ja salattu 256-bittisellä SSL-yhteydellä • Stripe Payments
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* LATAUSVAIHE: TÄYSAUTOMAATTINEN WEBHOOK-PUTKI (TAPA B) */}
              {stripeStep === "processing" && (
                <div className="p-8 md:p-12 text-center space-y-6 max-w-xl mx-auto">
                  <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs font-bold font-sans">
                    <span className="bg-[#635BFF] text-white px-3 py-1.5 rounded-lg shadow-sm">
                      1. Stripe Maksu
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="bg-banana text-wood-dark px-3 py-1.5 rounded-lg shadow-sm border border-wood-dark/20 font-mono">
                      2. /api/stripe-webhook
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="bg-bright-orange text-white px-3 py-1.5 rounded-lg shadow-sm">
                      3. Printful Tehtaalle
                    </span>
                  </div>

                  <div>
                    <h4 className="font-sans font-bold text-xl md:text-2xl text-slate-900">
                      Automatisoitu Webhook-tilausputki käynnissä...
                    </h4>
                    <p className="font-sans text-xs md:text-sm text-slate-500 mt-1">
                      Siirretään tilaustiedot sekunneissa suoraan Stripen kassan kautta tuotantoon.
                    </p>
                  </div>

                  {/* Vaiheittainen Webhook-loki */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left font-sans text-xs space-y-3 shadow-inner">
                    <div className={`flex items-center gap-3 transition-opacity ${webhookStep >= 1 ? "opacity-100" : "opacity-40"}`}>
                      {webhookStep > 1 ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <Loader2 className="w-4 h-4 text-[#635BFF] animate-spin shrink-0" />
                      )}
                      <span className={webhookStep >= 1 ? "font-bold text-slate-800" : "text-slate-500"}>
                        1. Stripe: Maksu {effectiveTotalFormatted} veloitettu onnistuneesti (checkout.session.completed)
                      </span>
                    </div>

                    <div className={`flex items-center gap-3 transition-opacity ${webhookStep >= 2 ? "opacity-100" : "opacity-40"}`}>
                      {webhookStep > 2 ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : webhookStep === 2 ? (
                        <Loader2 className="w-4 h-4 text-[#635BFF] animate-spin shrink-0" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-slate-300 inline-block shrink-0" />
                      )}
                      <span className={webhookStep >= 2 ? "font-bold text-slate-800" : "text-slate-500"}>
                        2. Webhook: Stripe laukaisi taustakutsun endpointtiin /api/stripe-webhook
                      </span>
                    </div>

                    <div className={`flex items-center gap-3 transition-opacity ${webhookStep >= 3 ? "opacity-100" : "opacity-40"}`}>
                      {webhookStep > 3 ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : webhookStep === 3 ? (
                        <Loader2 className="w-4 h-4 text-[#635BFF] animate-spin shrink-0" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-slate-300 inline-block shrink-0" />
                      )}
                      <span className={webhookStep >= 3 ? "font-bold text-slate-800" : "text-slate-500"}>
                        3. Käsittely: Poimittu vastaanottaja ({customerName}), osoite ja tuotteet: {effectiveItems.map((i) => `${i.quantity}x Koko ${i.size}`).join(", ")}
                      </span>
                    </div>

                    <div className={`flex items-center gap-3 transition-opacity ${webhookStep >= 4 ? "opacity-100" : "opacity-40"}`}>
                      {webhookStep >= 4 ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-slate-300 inline-block shrink-0" />
                      )}
                      <span className={webhookStep >= 4 ? "font-bold text-emerald-700" : "text-slate-500"}>
                        4. Printful API: Tilaus ({effectiveItems.reduce((acc, i) => acc + i.quantity, 0)} kpl) vahvistettu tehtaalle (Riika, Latvia) 🚀
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* PALUU ONNISTUNEESTA STRIPE-MAKSUSTA */}
              {stripeStep === "success" && (
                <div className="p-6 md:p-10 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-400 shadow-md">
                    <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      <span className="inline-block bg-[#635BFF] text-white font-sans font-bold text-xs px-3 py-1 rounded-full shadow-xs">
                        Stripe Maksutosite: #pi_3Molyapinat8492
                      </span>
                      <span className="inline-block bg-emerald-600 text-white font-sans font-bold text-xs px-3 py-1 rounded-full shadow-xs">
                        ⚡ Webhook-siirto: OK
                      </span>
                    </div>
                    <h3 className="font-heading text-2xl md:text-3xl text-wood-dark">
                      Kiitos tilauksestasi, {customerName.split(" ")[0] || "Mölyfani"}! 🐒🎉
                    </h3>
                    <p className="font-body text-xs md:text-sm text-wood-dark/85 max-w-md mx-auto">
                      Maksu on vahvistettu ja kuitti on lähetetty osoitteeseen <strong>{customerEmail}</strong>.
                    </p>
                  </div>

                  {/* Tilauksen ja toimituksen yksityiskohdat (Printful-siirto) */}
                  <div className="bg-slate-50 rounded-2xl p-4 text-left font-sans text-xs text-slate-700 space-y-2 border border-slate-200 max-w-md mx-auto shadow-2xs">
                    <div className="flex justify-between border-b border-slate-200 pb-1.5">
                      <span>Tuotteet:</span>
                      <strong className="text-right">{effectiveItems.map((i) => `${i.quantity}x Koko ${i.size}`).join(", ")}</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-1.5">
                      <span>Vastaanottaja:</span>
                      <strong>{customerName}</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-1.5">
                      <span>Toimitusosoite:</span>
                      <strong className="text-right">{customerAddress}, {customerZip} {customerCity}</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-1.5">
                      <span>Puhelinnumero:</span>
                      <strong>{customerPhone} (SMS-seuranta)</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-1.5">
                      <span>Maksettu summa:</span>
                      <strong className="text-emerald-600 font-bold">{effectiveTotalFormatted}</strong>
                    </div>
                    <div className="flex justify-between pt-0.5 text-emerald-700 font-semibold">
                      <span>Tilaustila:</span>
                      <span>Siirretty Printful-tuotantoon (Riika, Latvia) 🚀</span>
                    </div>
                  </div>

                  {/* WEBHOOK JSON -LOKIN TARKASTELUPAINIKE (TAPA B) */}
                  <div className="max-w-md mx-auto text-left">
                    <button
                      type="button"
                      onClick={() => setShowWebhookLog(!showWebhookLog)}
                      className="text-xs font-mono font-bold text-slate-600 hover:text-[#635BFF] flex items-center justify-between w-full p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 transition-colors cursor-pointer border border-slate-200"
                    >
                      <span>⚡ Näytä Webhookin välittämä JSON-tieto (Tapa B)</span>
                      <span>{showWebhookLog ? "▲ Piilota" : "▼ Avaa"}</span>
                    </button>

                    {showWebhookLog && (
                      <div className="bg-slate-900 text-slate-200 rounded-xl p-3 font-mono text-[11px] mt-2 overflow-x-auto shadow-inner border border-slate-800">
                        <pre className="whitespace-pre">
{JSON.stringify({
  endpoint: "/api/stripe-webhook",
  event: "checkout.session.completed",
  store_id: 18892987,
  recipient: {
    name: customerName,
    address1: customerAddress,
    city: customerCity,
    zip: customerZip,
    country_code: "FI",
    phone: customerPhone,
    email: customerEmail,
  },
  items: effectiveItems.map((i) => ({
    sync_variant_id: i.syncVariantId,
    product: "Mölyapinat lasten T-paita",
    size: i.size,
    quantity: i.quantity,
  })),
  fulfillment_center: "Printful European Hub, Riga, Latvia",
  status: "pending_fulfillment"
}, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setIsStripeModalOpen(false)}
                      className="bg-forest-green hover:brightness-110 text-white font-heading text-base md:text-lg px-8 py-3 rounded-2xl shadow-xl transition-all cursor-pointer"
                    >
                      Palaa Mölyapinat-sivustolle 🍌
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RUUDUN KESKELLÄ NÄYTTÄVÄ LISÄTTY OSTOSKORIIN -ILMOITUS */}
      <AnimatePresence>
        {cartNotification && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-4">
            <motion.div
              initial={{ scale: 0.75, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: -15 }}
              transition={{ type: "spring", damping: 22, stiffness: 350 }}
              className="bg-white/95 backdrop-blur-md border-4 border-wood-dark shadow-[0_20px_60px_rgba(0,0,0,0.35)] rounded-3xl p-6 flex flex-col items-center text-center max-w-sm pointer-events-auto"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1], rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
                className="w-16 h-16 rounded-2xl bg-banana/30 border-2 border-banana flex items-center justify-center text-3xl mb-3 shadow-inner"
              >
                🍌
              </motion.div>
              <h4 className="font-heading text-2xl text-wood-dark leading-tight text-shadow-fun">
                Mölyapinat T-paita ({cartNotification.size})
              </h4>
              <p className="font-body font-bold text-forest-green text-base mt-1.5 flex items-center gap-2">
                <Check className="w-5 h-5 stroke-[3] text-forest-green" />
                Lisätty ostoskoriin!
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Aaltojakaja kohti seuraavaa hiekanväristä osiota */}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <div className="absolute bottom-0 left-0 w-full wave-divider h-10 md:h-[100px] pointer-events-none" style={{ '--wave-color': 'hsl(var(--background))' } as any}></div>
    </section>
  );
};

export default ShopSection;

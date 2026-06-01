import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Settings, ShieldCheck, Sparkles, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { CookiePolicyModal } from "./CookiePolicyModal";

export const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  // Evästeiden suostumustilat
  const [consent, setConsent] = useState({
    essential: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Tarkistetaan onko suostumus jo annettu aiemmin
    const savedConsent = localStorage.getItem("molyapinat-cookie-consent");
    if (!savedConsent) {
      // Pieni viive tyylikästä sisääntuloa varten
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      try {
        setConsent(JSON.parse(savedConsent));
      } catch (e) {
        console.error("Virhe evästeasetusten lukemisessa", e);
      }
    }
  }, []);

  // Kuunnellaan alapalkista tulevaa signaalia avata asetukset uudelleen
  useEffect(() => {
    const handleOpenSettings = () => {
      setShowSettings(true);
      setIsVisible(true);
    };

    window.addEventListener("open-cookie-settings", handleOpenSettings);
    return () => window.removeEventListener("open-cookie-settings", handleOpenSettings);
  }, []);

  const saveConsent = (updatedConsent: typeof consent) => {
    localStorage.setItem("molyapinat-cookie-consent", JSON.stringify(updatedConsent));
    setConsent(updatedConsent);
    setIsVisible(false);
    
    // Tässä vaiheessa reaalimaailmassa ladattaisiin tai estettäisiin kolmannen osapuolen skriptit
    if (updatedConsent.analytics) {
      console.log("Analytiikkaevästeet sallittu - ladataan Google Analytics...");
      // Esim. window.gtag('consent', 'update', { 'analytics_storage': 'granted' });
    }
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(allAccepted);
  };

  const handleAcceptEssential = () => {
    const onlyEssential = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    saveConsent(onlyEssential);
  };

  const handleSaveCustom = () => {
    saveConsent(consent);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed bottom-16 left-4 right-4 md:bottom-6 md:left-auto md:right-8 md:max-w-md z-[100] border-4 border-wood-dark shadow-2xl rounded-3xl bg-background overflow-hidden lauta-clean"
          >
            {/* Leikkisä viidakkoteemainen banneri */}
            <div className="p-4 md:p-6 space-y-3 md:space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className="bg-primary/20 p-1.5 md:p-2 rounded-xl border-2 border-wood-dark/10 animate-bounce" style={{ animationDuration: '4s' }}>
                    <Cookie className="w-5 h-5 md:w-6 md:h-6 text-bright-orange" />
                  </div>
                  <h3 className="font-heading text-base md:text-xl text-wood-dark">
                    Banaanievästeet? 🍌
                  </h3>
                </div>
                <button 
                  onClick={handleAcceptEssential}
                  className="p-1 hover:bg-wood-dark/5 rounded-lg transition-colors text-wood-dark/60 hover:text-wood-dark"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!showSettings ? (
                // Päänäkymä
                <div className="space-y-3 md:space-y-4">
                  <p className="font-body text-xs md:text-sm text-wood-dark/80 leading-relaxed">
                    Evästeet takaavat apinamaisen hyvän käyttökokemuksen ja auttavat meitä analysoimaan sivujen liikennettä. Lue lisää{" "}
                    <button 
                      onClick={() => setIsPolicyOpen(true)}
                      className="text-forest-green hover:underline font-bold"
                    >
                      evästekäytännöstämme
                    </button>.
                  </p>
                  
                  <div className="flex gap-2 pt-1.5 md:pt-2">
                    <button
                      onClick={handleAcceptAll}
                      className="flex-1 py-2.5 px-3 bg-bright-orange text-white font-heading text-sm md:text-base rounded-xl border-2 border-wood-dark shadow-fun-small hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center cursor-pointer font-bold text-center"
                    >
                      Hyväksy kaikki
                    </button>
                    <button
                      onClick={handleAcceptEssential}
                      className="flex-1 py-2.5 px-2 bg-white hover:bg-slate-50 text-wood-dark font-body text-xs md:text-sm rounded-xl border-2 border-wood-dark/60 transition-all font-bold cursor-pointer flex items-center justify-center text-center"
                    >
                      Vain välttämättömät
                    </button>
                  </div>
                </div>
              ) : (
                // Asetusnäkymä (laajennus bannerin sisällä)
                <div className="space-y-4 pt-1">
                  <p className="font-body text-xs text-wood-dark/80">
                    Muokkaa evästevalintojasi. Välttämättömät evästeet ovat aina päällä sivuston toiminnan takaamiseksi.
                  </p>

                  <div className="space-y-3 bg-white/50 p-3 rounded-2xl border border-wood-dark/10">
                    {/* Välttämättömät */}
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h4 className="font-heading text-xs md:text-sm text-wood-dark">Välttämättömät</h4>
                        <p className="text-[10px] text-wood-dark/60 leading-normal">Tekninen toiminta (aina päällä).</p>
                      </div>
                      <Switch checked={true} disabled className="data-[state=checked]:bg-forest-green" />
                    </div>

                    {/* Toiminnalliset */}
                    <div className="flex items-center justify-between gap-4 border-t border-wood-dark/5 pt-2">
                      <div>
                        <h4 className="font-heading text-xs md:text-sm text-wood-dark">Toiminnalliset</h4>
                        <p className="text-[10px] text-wood-dark/60 leading-normal">Muistaa asetukset ja valinnat.</p>
                      </div>
                      <Switch 
                        checked={consent.functional} 
                        onCheckedChange={(checked) => setConsent({ ...consent, functional: checked })} 
                        className="data-[state=checked]:bg-bright-orange"
                      />
                    </div>

                    {/* Tilastot */}
                    <div className="flex items-center justify-between gap-4 border-t border-wood-dark/5 pt-2">
                      <div>
                        <h4 className="font-heading text-xs md:text-sm text-wood-dark">Tilastot & Analytiikka</h4>
                        <p className="text-[10px] text-wood-dark/60 leading-normal">Kävijäliikenteen seuranta (Google Analytics).</p>
                      </div>
                      <Switch 
                        checked={consent.analytics} 
                        onCheckedChange={(checked) => setConsent({ ...consent, analytics: checked })} 
                        className="data-[state=checked]:bg-bright-orange"
                      />
                    </div>

                    {/* Markkinointi */}
                    <div className="flex items-center justify-between gap-4 border-t border-wood-dark/5 pt-2">
                      <div>
                        <h4 className="font-heading text-xs md:text-sm text-wood-dark">Markkinointi</h4>
                        <p className="text-[10px] text-wood-dark/60 leading-normal">Kohdennettu mainonta ja seuranta.</p>
                      </div>
                      <Switch 
                        checked={consent.marketing} 
                        onCheckedChange={(checked) => setConsent({ ...consent, marketing: checked })} 
                        className="data-[state=checked]:bg-bright-orange"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowSettings(false)}
                      className="py-2.5 px-3 bg-white hover:bg-slate-50 text-wood-dark font-body text-xs md:text-sm rounded-xl border-2 border-wood-dark/60 transition-all font-semibold"
                    >
                      Takaisin
                    </button>
                    <button
                      onClick={handleSaveCustom}
                      className="flex-1 py-2.5 px-3 bg-forest-green text-white font-heading text-sm md:text-base rounded-xl border-2 border-wood-dark shadow-fun-small hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      Tallenna valinnat
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CookiePolicyModal isOpen={isPolicyOpen} onOpenChange={setIsPolicyOpen} />
    </>
  );
};

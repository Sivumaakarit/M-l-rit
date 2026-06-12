import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BandMembers from "@/components/BandMembers";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const MusicSection = lazy(() => import("@/components/MusicSection"));
const TourCalendar = lazy(() => import("@/components/TourCalendar"));

const Index = () => {
  const { hash } = useLocation();
  
  useEffect(() => {
    if (hash) {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }

      const id = hash.replace("#", "");
      let lastY = 0;
      let stableCount = 0;
      
      const scrollInterval = setInterval(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 120;
          const y = element.getBoundingClientRect().top + window.scrollY - headerOffset;
          
          // Scrollataan vain jos paikka on muuttunut tai olemme alussa
          if (Math.abs(y - lastY) > 5) {
            window.scrollTo({ top: y, behavior: 'auto' });
            stableCount = 0;
          } else {
            stableCount++;
          }
          
          lastY = y;
          
          // Jos paikka on pysynyt täsmälleen samana 5 peräkkäisellä tarkistuksella (0.5s), 
          // voimme olettaa että Suspense on renderöinyt ja kuvat ovat asettuneet paikoilleen.
          if (stableCount >= 5) {
            clearInterval(scrollInterval);
          }
        }
      }, 100);

      // Turvamekanismi: lopetetaan yritykset viimeistään 4 sekunnin kuluttua
      const timeout = setTimeout(() => {
        clearInterval(scrollInterval);
      }, 4000);

      return () => {
        clearInterval(scrollInterval);
        clearTimeout(timeout);
      };
    }
  }, [hash]);

  return (
    <main className="min-h-screen">


      <Header />
      <HeroSection />
      
      <Suspense fallback={<div className="h-40 bg-secondary/10 flex items-center justify-center font-bold text-wood-dark opacity-50">Ladataan banaaniseikkailua... 🍌</div>}>
        <BandMembers />
        <MusicSection />
        <TourCalendar />
        <ContactSection />
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;

import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";

const BandMembers = lazy(() => import("@/components/BandMembers"));
const MusicSection = lazy(() => import("@/components/MusicSection"));
const TourCalendar = lazy(() => import("@/components/TourCalendar"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  const { hash } = useLocation();
  
  useEffect(() => {
    if (hash) {
      // Estetään selaimen oletus-skrollaus refreshatessa
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }

      const targetId = hash.replace("#", "");
      let attempts = 0;
      const maxAttempts = 30; // 3 sekuntia yhteensä 100ms välein
      
      const scrollInterval = setInterval(() => {
        const element = document.getElementById(targetId);
        attempts++;
        
        if (element) {
          // Lasketaan tavoitekohta (huomioidaan kiinteä header)
          const headerOffset = 120; // Kasvatettu hieman varmuuden vuoksi
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });

          // Pysäytetään haku, kun elementti löytyy
          clearInterval(scrollInterval);
        } else if (attempts >= maxAttempts) {
          clearInterval(scrollInterval);
        }
      }, 100);
      
      return () => clearInterval(scrollInterval);
    }
  }, [hash]);

  return (
    <main className="min-h-screen">
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MusicGroup",
          "name": "Mölyapinat",
          "description": "Vauhdikas lastenmusiikkiyhtye Pielavedeltä.",
          "genre": "Children's Music",
          "url": "https://molyapinat.fi",
          "image": "https://molyapinat.fi/logo.webp",
          "member": [
            { "@type": "OrganizationRole", "member": { "@type": "Person", "name": "Make" }, "roleName": "Laulu" },
            { "@type": "OrganizationRole", "member": { "@type": "Person", "name": "Saku" }, "roleName": "Kitara" },
            { "@type": "OrganizationRole", "member": { "@type": "Person", "name": "Olli" }, "roleName": "Basso" },
            { "@type": "OrganizationRole", "member": { "@type": "Person", "name": "Jone" }, "roleName": "Rummut" }
          ]
        })}
      </script>

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

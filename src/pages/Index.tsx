import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";

const BandMembers = lazy(() => import("@/components/BandMembers"));
const MusicSection = lazy(() => import("@/components/MusicSection"));
const TourCalendar = lazy(() => import("@/components/TourCalendar"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <main className="min-h-screen">
      {/* SEO & Meta-tiedot */}
      <title>Mölyapinat - Parasta lastenmusiikkia!</title>
      <meta name="description" content="Mölyapinat on vauhdikas lastenmusiikkiyhtye, joka tuo iloa ja banaaninmakuista menoa jokaiseen päivään. Tilaa meidät keikalle!" />
      
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

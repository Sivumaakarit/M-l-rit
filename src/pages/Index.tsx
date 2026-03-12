import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BandMembers from "@/components/BandMembers";
import MusicSection from "@/components/MusicSection";
import TourCalendar from "@/components/TourCalendar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

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
          "image": "https://molyapinat.fi/assets/logo.webp",
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
      <BandMembers />
      <MusicSection />
      <TourCalendar />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;

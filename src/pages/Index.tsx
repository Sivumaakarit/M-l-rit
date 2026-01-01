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

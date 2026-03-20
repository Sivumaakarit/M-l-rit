import { motion } from "framer-motion";
import { Calendar, MapPin, Banana, Music, Users, Star, Mail } from "lucide-react";

interface Gig {
  date: string;
  city: string;
  venue: string;
  lineup: string;
  isPrivate?: boolean;
}

const gigs: Gig[] = [
  { date: "29.4.", city: "Mäntsälä", venue: "Yksityistilaisuus", lineup: "Möykkä Make solo", isPrivate: true },
  { date: "1.5.", city: "Nummela", venue: "Tori", lineup: "Mölyapinat Duo" },
  { date: "2.5.", city: "Lappeenranta", venue: "Pääkirjasto", lineup: "Mölyapinat Duo" },
  { date: "5.5.", city: "Vantaa", venue: "Yksityistilaisuus", lineup: "Mölyapinat Duo", isPrivate: true },
  { date: "12.5.", city: "Kerava", venue: "Untola Fest", lineup: "Mölyapinat Duo + Soffi" },
  { date: "13.5.", city: "Lohja", venue: "Yksityistilaisuus", lineup: "Mölyapinat Duo", isPrivate: true },
  { date: "14.5.", city: "Lohja", venue: "Aplicon kevätmarkkinat", lineup: "Mölyapinat Bändi" },
  { date: "16.5.", city: "Pielavesi", venue: "Kevätkarkelot", lineup: "Mölyapinat Bändi" },
  { date: "19.5.", city: "Kerava", venue: "Yksityistilaisuus", lineup: "Mölyapinat Duo", isPrivate: true },
  { date: "26.5.", city: "Helsinki", venue: "Yksityistilaisuus", lineup: "Mölyapinat Duo", isPrivate: true },
  { date: "14.7.", city: "Tampere", venue: "Finlaysonin kesälava", lineup: "Mölyapinat Bändi" }
];

const TourCalendar = () => {
  return (
    <section id="keikat" className="pt-12 md:pt-24 pb-24 md:pb-48 bg-background relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-10">
        <Banana className="absolute top-20 left-10 w-32 h-32 rotate-12" />
        <Star className="absolute bottom-40 right-20 w-24 h-24 -rotate-12" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block wood-clean rounded-full px-6 py-4 md:px-12 md:py-6 shadow-2xl border-4 border-wood-dark relative overflow-hidden mb-6 max-w-[95vw]">
            <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl text-wood-dark text-shadow-fun flex items-center justify-center gap-2 md:gap-4 flex-wrap">
              <Music className="w-6 h-6 md:w-10 md:h-10 text-bright-orange" />
              Mölyapinat Keikkakalenteri 2026
              <Music className="w-6 h-6 md:w-10 md:h-10 text-bright-orange rotate-180" />
            </h2>
            {/* Shine effect */}
            <motion.div
              className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              animate={{ left: "200%" }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
            />
          </div>
          <p className="font-body text-xl md:text-2xl text-wood-dark/80 max-w-2xl mx-auto font-bold">
            Tule mukaan banaanitanssiin! Täältä löydät meidät tänä vuonna - kalenteri päivittyy koko ajan 🍌
          </p>
        </motion.div>

        {/* Desktop Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 bg-wood-dark text-white rounded-t-3xl font-heading text-lg shadow-xl mb-2 border-b-4 border-primary/30">
          <div className="col-span-2 flex items-center gap-2 tracking-wide"><Calendar className="w-5 h-5 text-primary" /> Päivämäärä</div>
          <div className="col-span-3 flex items-center gap-2 tracking-wide"><MapPin className="w-5 h-5 text-primary" /> Paikkakunta</div>
          <div className="col-span-4 flex items-center gap-2 tracking-wide"><Star className="w-5 h-5 text-primary" /> Paikka / Tapahtuma</div>
          <div className="col-span-3 flex items-center gap-2 tracking-wide"><Users className="w-5 h-5 text-primary" /> Kokoonpano</div>
        </div>

        {/* Gig List */}
        <div className="flex flex-col gap-3">
          {gigs.map((gig, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01, x: 5 }}
              className="group"
            >
              <div className={`
                lauta-clean p-6 md:p-8 flex flex-col md:grid md:grid-cols-12 md:items-center gap-4 shadow-lg border-l-8 
                ${gig.isPrivate ? 'border-sand opacity-90' : 'border-bright-orange'} 
                ${index === gigs.length - 1 ? 'rounded-b-3xl' : ''}
                transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-bright-orange/10
              `}>
                {/* Mobile Labels + Desktop Columns */}
                <div className="col-span-2 flex items-center md:block">
                  <span className="md:hidden font-heading text-sm text-wood-dark/50 w-24">Päivä:</span>
                  <div className="bg-primary/20 md:bg-transparent px-3 py-1 rounded-full md:p-0">
                    <span className="font-heading text-xl md:text-2xl text-wood-dark">{gig.date}</span>
                  </div>
                </div>

                <div className="col-span-3 flex items-center md:block">
                  <span className="md:hidden font-heading text-sm text-wood-dark/50 w-24">Kunta:</span>
                  <span className="font-heading text-xl text-forest-green">{gig.city}</span>
                </div>

                <div className="col-span-4 flex items-center md:block">
                  <span className="md:hidden font-heading text-sm text-wood-dark/50 w-24">Paikka:</span>
                  <span className={`font-body text-lg md:text-xl font-bold ${gig.isPrivate ? 'italic text-wood-dark/60' : 'text-wood-dark'}`}>
                    {gig.venue || "-"}
                  </span>
                </div>

                <div className="col-span-3 flex items-center md:block">
                  <span className="md:hidden font-heading text-sm text-wood-dark/50 w-24">Kenellä:</span>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-bright-orange/10 rounded-lg hidden md:block">
                      <Users className="w-5 h-5 text-bright-orange" />
                    </div>
                    <span className="font-heading text-lg md:text-xl text-wood-dark">{gig.lineup}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Wave at the bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-32 md:h-48 fill-secondary transform rotate-180 opacity-50">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>

      {/* Wave divider from CSS */}
      <div className="absolute bottom-0 left-0 w-full wave-divider h-10 md:h-[100px]" style={{ '--wave-color': 'hsl(var(--secondary))' } as any}></div>
    </section>
  );
};

export default TourCalendar;
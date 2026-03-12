import { motion } from "framer-motion";
import { Calendar, MapPin, Info } from "lucide-react";

interface Gig {
  date: string;
  city: string;
  venue: string;
  ticketUrl?: string;
}

const gigs: Gig[] = [
  {
    date: "14.03.2026",
    city: "Helsinki",
    venue: "Tiivistämö",
    ticketUrl: "#"
  },
  {
    date: "28.03.2026",
    city: "Tampere",
    venue: "Pakkahuone",
    ticketUrl: "#"
  },
  {
    date: "11.04.2026",
    city: "Turku",
    venue: "Logomo",
    ticketUrl: "#"
  },
  {
    date: "25.04.2026",
    city: "Lahti",
    venue: "Sibeliustalo",
    ticketUrl: "#"
  },
  {
    date: "09.05.2026",
    city: "Oulu",
    venue: "Energia Areena",
    ticketUrl: "#"
  }
];

const TourCalendar = () => {
  return (
    <section id="tour" className="py-24 pb-48 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block wood-clean rounded-3xl px-10 py-5 shadow-xl mb-6 relative">
            <h2 className="font-heading text-3xl md:text-5xl text-wood-dark text-shadow-fun relative z-10">
              🎪 Keikat & Seikkailut 🎪
            </h2>
          </div>
          <p className="font-body text-lg md:text-xl text-wood-dark max-w-xl mx-auto font-bold px-4">
            Tule mukaan banaanitanssiin! Täältä löydät tulevat <span className="text-forest-green">keikkamme.</span>
          </p>
        </motion.div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {gigs.map((gig, index) => (
            <motion.div
              key={gig.date + gig.city}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <div className="lauta-clean p-3 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-6 shadow-xl border-l-8 border-bright-orange w-full">
                <div className="flex items-center gap-4 md:gap-6 overflow-hidden">
                  <div className="bg-primary rounded-2xl p-3 md:p-4 text-center min-w-[80px] md:min-w-[100px] shadow-inner border-2 border-wood-dark/10 flex-shrink-0">
                    <Calendar className="w-6 h-6 md:w-8 md:h-8 mx-auto text-wood-dark mb-1" />
                    <span className="font-heading text-sm md:text-lg text-wood-dark whitespace-nowrap">
                      {gig.date}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-xl md:text-2xl text-wood-dark mb-1 truncate">
                      {gig.city}
                    </h3>
                    <p className="font-body text-forest-green text-base md:text-lg flex items-center gap-2 font-bold truncate">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      {gig.venue}
                    </p>
                  </div>
                </div>

                {gig.ticketUrl && (
                  <motion.a
                    href={gig.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-bright-orange text-white font-heading text-lg md:text-xl px-6 md:px-8 py-3 md:py-4 rounded-2xl shadow-lg flex items-center justify-center gap-3 hover:shadow-2xl transition-all w-full md:w-auto mt-2 md:mt-0"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Info className="w-5 h-5 md:w-6 md:h-6" />
                    Osta liput! 🍌
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <div className="absolute bottom-0 left-0 w-full wave-divider" style={{ '--wave-color': 'hsl(var(--secondary))' } as any}></div>
    </section>
  );
};

export default TourCalendar;
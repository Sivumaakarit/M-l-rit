import { motion } from "framer-motion";
import { Calendar, MapPin, Ticket } from "lucide-react";

// ============================================
// KEIKKAKALENTERI - Muokkaa tätä listaa!
// ============================================
const tourDates = [
  {
    date: "15.2.2026",
    city: "Helsinki",
    venue: "Kulttuuritalo",
    ticketUrl: "https://lippu.fi",
  },
  {
    date: "22.2.2026",
    city: "Tampere",
    venue: "Tullikamarin klubi",
    ticketUrl: "https://lippu.fi",
  },
  {
    date: "1.3.2026",
    city: "Turku",
    venue: "Logomo",
    ticketUrl: "https://lippu.fi",
  },
  {
    date: "8.3.2026",
    city: "Oulu",
    venue: "Tullisali",
    ticketUrl: "https://lippu.fi",
  },
  {
    date: "15.3.2026",
    city: "Jyväskylä",
    venue: "Paviljonki",
    ticketUrl: "https://lippu.fi",
  },
];
// ============================================

const TourCalendar = () => {
  return (
    <section id="tour" className="py-16 bg-sand">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block wood-texture rounded-3xl px-8 py-4 shadow-lg mb-4">
            <h2 className="font-heading text-3xl md:text-4xl text-wood-dark">
              🎪 Möly-kiertue 2026 🎪
            </h2>
          </div>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            Tule tanssimaan kanssamme livenä!
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {tourDates.map((gig, index) => (
            <motion.div
              key={`${gig.date}-${gig.city}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="wood-texture rounded-3xl p-1 shadow-lg"
            >
              <div className="bg-card/95 rounded-2xl p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary rounded-2xl p-3 text-center min-w-[80px]">
                      <Calendar className="w-6 h-6 mx-auto text-primary-foreground mb-1" />
                      <span className="font-heading text-sm text-primary-foreground">
                        {gig.date}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl text-foreground">
                        {gig.city}
                      </h3>
                      <p className="font-body text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {gig.venue}
                      </p>
                    </div>
                  </div>
                  <motion.a
                    href={gig.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-bright-orange text-primary-foreground font-heading text-lg px-6 py-3 rounded-2xl shadow-md flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Ticket className="w-5 h-5" />
                    Osta liput
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Wave divider */}
      <div className="mt-16">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            className="fill-secondary"
          />
        </svg>
      </div>
    </section>
  );
};

export default TourCalendar;

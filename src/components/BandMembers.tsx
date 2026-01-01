import { motion } from "framer-motion";
import makeMonkey from "@/assets/make-monkey.png";
import mokaMonkey from "@/assets/moka-monkey.png";
import mukaMonkey from "@/assets/muka-monkey.png";
import banskuAnsku from "@/assets/bansku-ansku.png";
import soffi from "@/assets/soffi.png";

interface BandMember {
  name: string;
  image: string;
  description: string;
  color: string;
}

const bandMembers: BandMember[] = [
  {
    name: "Make",
    image: makeMonkey,
    description: "Keltaiset aurinkolasit ja villit tanssiliikkeet!",
    color: "bg-primary",
  },
  {
    name: "Mökä",
    image: mokaMonkey,
    description: "Vihreät lasit ja aina valmis mölyämään!",
    color: "bg-neon-green",
  },
  {
    name: "Muka",
    image: mukaMonkey,
    description: "Punaiset lasit ja täynnä energiaa!",
    color: "bg-destructive",
  },
  {
    name: "Bansku-Ansku",
    image: banskuAnsku,
    description: "Mölymetsän pörröisin energiapakkaus!",
    color: "bg-primary",
  },
  {
    name: "Soffi",
    image: soffi,
    description: "Pitää apinalauman järjestyksessä!",
    color: "bg-bright-orange",
  },
];

const MemberCard = ({ member, index }: { member: BandMember; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.05,
        rotate: [0, -2, 2, -2, 0],
        transition: { duration: 0.4 },
      }}
      className="group cursor-pointer"
    >
      <div
        className={`rounded-3xl p-4 shadow-xl transition-shadow group-hover:shadow-2xl ${member.color}`}
      >
        <div className="bg-card rounded-2xl p-4 text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover rounded-full border-4 border-wood-light shadow-lg"
            />
            <motion.div
              className="absolute -top-2 -right-2 text-2xl"
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎵
            </motion.div>
          </div>
          <h3 className="font-heading text-2xl text-foreground mb-2">
            {member.name}
          </h3>
          <p className="font-body text-muted-foreground text-sm">
            {member.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const BandMembers = () => {
  return (
    <section id="members" className="py-16 bg-sand">
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
              🐒 Mölyapinat-jäsenet 🐒
            </h2>
          </div>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            Tutustu Mölymetsän hulluun apinakaartiin!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {bandMembers.map((member, index) => (
            <MemberCard key={member.name} member={member} index={index} />
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
            d="M0 0L48 10C96 20 192 40 288 50C384 60 480 60 576 55C672 50 768 40 864 35C960 30 1056 30 1152 35C1248 40 1344 50 1392 55L1440 60V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0Z"
            className="fill-sand"
          />
          <path
            d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            className="fill-secondary"
          />
        </svg>
      </div>
    </section>
  );
};

export default BandMembers;

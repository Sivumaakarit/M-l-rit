import { motion } from "framer-motion";
import { useMolyRain, MolyRainDisplay } from "./MolyRain";
import makeMonkey from "@/assets/make.webp";
import mokaMonkey from "@/assets/moka.webp";
import mukaMonkey from "@/assets/muka5.webp";
import banskuAnsku from "@/assets/ansku1.webp";
import soffi from "@/assets/soffi2.webp";

interface BandMember {
  name: string;
  image: string;
  description: string;
  color: string;
}

const bandMembers: BandMember[] = [
  {
    name: "Muka",
    image: mukaMonkey,
    description: "Keltaiset aurinkolasit, basso ja villit tanssiliikkeet!",
    color: "bg-banana",
  },
  {
    name: "Mökä",
    image: mokaMonkey,
    description: "Vihreät lasit, rummutus ja aina valmis mölyämään!",
    color: "bg-neon-green",
  },
  {
    name: "Make",
    image: makeMonkey,
    description: "Oranssit aurinkolasit, kitara ja täynnä apinaenergiaa!",
    color: "bg-bright-orange",
  },
  {
    name: "Bansku-Ansku",
    image: banskuAnsku,
    description: "Metsän hattaraisin kampaus ja laulu!",
    color: "bg-banana",
  },
  {
    name: "Soffi",
    image: soffi,
    description: "Laulu ja tanssi - pitää apinalauman järjestyksessä!",
    color: "bg-bright-orange",
  },
];

const BananaRain = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute text-xl animate-banana-fall"
          style={{
            left: `${15 + i * 15}%`,
            animationDelay: `${i * 0.2}s`,
            animationDuration: `${1.5 + Math.random()}s`,
          }}
        >
          🍌
        </div>
      ))}
    </div>
  );
};

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
      className="group cursor-pointer relative"
    >
      <BananaRain />
      <div
        className={`rounded-3xl p-4 shadow-xl transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(var(--glow-color),0.4)] ${member.color}`}
        style={{ 
          // @ts-ignore - Dynamic variable for the glow color
          "--glow-color": member.color === 'bg-banana' ? '255, 215, 0' : 
                          member.color === 'bg-neon-green' ? '50, 205, 50' : 
                          '255, 127, 80' 
        }}
      >
        <div className="bg-card rounded-2xl p-4 text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover rounded-full border-4 border-wood-light shadow-lg"
              loading="lazy"
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
          <p className="font-body text-muted-foreground text-sm font-medium">
            {member.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const BandMembers = () => {
  const { particles, triggerRain } = useMolyRain();

  return (
    <section id="members" className="pt-24 pb-48 bg-background relative overflow-hidden">
      <MolyRainDisplay particles={particles} />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
          <div className="relative inline-block group/header">
            {/* "Älä vaan paina tästä!" Vinkki */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3, duration: 1 }}
              className="absolute -left-36 lg:-left-48 -top-14 whitespace-nowrap hidden sm:block pointer-events-none group-hover/header:opacity-0 transition-opacity duration-300"
            >
              <div className="flex flex-col items-end gap-2 text-right">
                <span className="font-heading text-lg lg:text-xl text-destructive animate-pulse text-shadow-fun">
                  Älä vaan paina tästä!
                </span>
                <svg width="60" height="40" viewBox="0 0 60 40" fill="none" className="-rotate-12 mr-6">
                  <path 
                    d="M10 10 Q30 10 50 30 M50 30 L35 30 M50 30 L50 15" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-destructive"
                  />
                </svg>
              </div>
            </motion.div>

            <motion.div 
              onClick={triggerRain}
              whileHover={{ 
                rotate: [0, -2, 2, -1, 1, 0], 
                transition: { duration: 1.2, ease: "easeInOut" } 
              }}
              whileTap={{ scale: 0.95 }}
              style={{ transformOrigin: "top center" }}
              className="inline-block wood-clean rounded-3xl px-10 py-5 shadow-xl mb-6 overflow-hidden cursor-pointer active:brightness-95 transition-all relative z-10"
            >
              <h2 className="font-heading text-3xl md:text-5xl text-wood-dark text-shadow-fun">
                🐒 Mölyapinat-jäsenet 🐒
              </h2>
            </motion.div>
          </div>
          <p className="font-body text-xl text-wood-dark max-w-xl mx-auto font-medium">
            Tutustu Mölymetsän hauskaan apinakaartiin! <span className="text-forest-green underline decoration-primary decoration-2 underline-offset-4 sm:hidden">Paina kylttiä nähdäksesi banaanisadetta!</span> 🍌
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {bandMembers.map((member, index) => (
            <MemberCard key={member.name} member={member} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 max-w-5xl mx-auto bg-sand/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-dashed border-wood-dark/20"
        >
          <div className="space-y-8">
            <h3 className="font-heading text-3xl text-wood-dark text-center underline decoration-primary decoration-8 underline-offset-4">
              Apinointia jo vuodesta 2014! 🍌
            </h3>
            
            <div className="grid md:grid-cols-2 gap-12 text-wood-dark font-body text-lg md:text-xl leading-relaxed">
              <div className="space-y-6">
                <p className="font-bold text-forest-green text-2xl">
                  Menevää musiikkia koko perheelle!
                </p>
                <p>
                  Mölyapinat-keikalla koet paljon mukaansa tempaavia lauluja ja vuorovaikutusta – aina on mahdollisuus myös liikkua. 
                  Huomioimme myös lasten iän ja säädämme volyymin paikan mukaan. Tarvittaessa soitamme vaikka täysin akustisesti!
                </p>
              </div>
              <div className="space-y-6">
                <p>
                  Ohjelmistomme koostuu pääasiassa omista kappaleista, mutta mukana on myös tuttuja biisejä apinamaisilla sanoituksilla, 
                  kuten <em className="text-forest-green font-bold">Banaanin metsästys</em>.
                </p>
                <div className="bg-primary p-4 rounded-2xl border-2 border-wood-dark/20 italic text-base shadow-inner">
                  &quot;Meidät on nähty niin laivoilla, Linnanmäellä kuin päiväkodeissakin!&quot;
                </div>
              </div>
            </div>

            {/* Uusi koko leveyden infolaatikko */}
            <div className="mt-8 bg-primary/20 p-6 rounded-3xl border-4 border-dashed border-primary/40 w-full">
              <p className="font-heading text-xl md:text-3xl text-forest-green text-center leading-relaxed font-bold">
                🍌 <span className="underline decoration-bright-orange decoration-4 underline-offset-8">Mölyapinat esiintyvät myös pienemmillä kokoonpanoilla ja Make-Mölyapina myös yksin!</span> 🐒
              </p>
            </div>
            </div>
        </motion.div>
      </div>          

{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <div className="absolute bottom-0 left-0 w-full wave-divider" style={{ '--wave-color': 'hsl(var(--secondary))' } as any}></div>
    </section>
  );
};

export default BandMembers;
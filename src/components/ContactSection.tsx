import { motion } from "framer-motion";
import { useState } from "react";
import { Send, User, Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { useMolyRain, MolyRainDisplay } from "./MolyRain";

const ContactSection = () => {
  const { particles, triggerRain } = useMolyRain();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Täytä kaikki kentät!");
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/xeerkkak", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Kiitos viestistäsi! 🍌 Palaamme asiaan pian!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Hups! Jotain meni vikaan. Yritä myöhemmin uudelleen.");
      }
    } catch (error) {
      toast.error("Lähetys epäonnistui. Tarkista verkkoyhteys.");
    }
  };

  return (
    <section id="contact" className="pt-24 pb-20 bg-secondary relative overflow-hidden">
      <MolyRainDisplay particles={particles} />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div 
            onClick={triggerRain}
            whileHover={{ 
              rotate: [0, -2, 2, -1, 1, 0], 
              transition: { duration: 1.2, ease: "easeInOut" } 
            }}
            whileTap={{ scale: 0.95 }}
            style={{ transformOrigin: "top center" }}
            className="inline-block wood-clean rounded-3xl px-10 py-5 shadow-xl mb-6 overflow-hidden cursor-pointer active:brightness-95 transition-all"
          >
            <h2 className="font-heading text-3xl md:text-5xl text-wood-dark text-shadow-fun">
              📬 Tilaa Mölyapinat 📬
            </h2>
          </motion.div>
          <p className="font-body text-xl text-wood-dark max-w-xl mx-auto font-bold">
            Haluatko meidät esiintymään? <span className="text-forest-green">Ota yhteyttä! 🍌</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="lauta-clean p-8 md:p-12 shadow-2xl space-y-8"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-inner space-y-6 border-4 border-wood-dark/10">
              <div>
                <label className="font-heading text-xl text-wood-dark flex items-center gap-3 mb-3">
                  <User className="w-6 h-6 text-bright-orange" />
                  Nimi
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-white border-4 border-wood-light/50 rounded-2xl px-5 py-4 font-body text-lg focus:border-primary focus:outline-none transition-all shadow-sm"
                  placeholder="Kirjoita nimesi"
                />
              </div>

              <div>
                <label className="font-heading text-xl text-wood-dark flex items-center gap-3 mb-3">
                  <Mail className="w-6 h-6 text-neon-green" />
                  Sähköposti
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-white border-4 border-wood-light/50 rounded-2xl px-5 py-4 font-body text-lg focus:border-primary focus:outline-none transition-all shadow-sm"
                  placeholder="sinun@email.fi"
                />
              </div>

              <div>
                <label className="font-heading text-xl text-wood-dark flex items-center gap-3 mb-3">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  Viesti
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  className="w-full bg-white border-4 border-wood-light/50 rounded-2xl px-5 py-4 font-body text-lg focus:border-primary focus:outline-none transition-all shadow-sm resize-none"
                  placeholder="Kerro meille miten voimme auttaa!"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-bright-orange text-white font-heading text-2xl py-5 rounded-2xl shadow-xl flex items-center justify-center gap-4 hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-8 h-8" />
              Lähetä viesti 🍌
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
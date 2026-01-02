import { motion } from "framer-motion";
import { useState } from "react";
import { Send, User, Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Tarkistetaan, että kentät on täytetty
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Täytä kaikki kentät!");
      return;
    }

    // 2. Lähetetään tiedot Netliffylle taustalla (AJAX/Fetch)
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        "form-name": "contact", // Tämän on oltava täsmälleen sama kuin <form name="contact">
        ...formData,
      }).toString(),
    })
      .then(() => {
        // 3. Jos lähetys onnistuu, näytetään viesti ja tyhjennetään lomake
        toast.success("Kiitos viestistäsi! 🍌 Palaamme asiaan pian!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        // 4. Jos tapahtuu virhe, näytetään siitä ilmoitus
        toast.error("Hups! Lähetys epäonnistui: " + error);
      });
  };

  return (
    <section id="contact" className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block wood-texture rounded-3xl px-8 py-4 shadow-lg mb-4">
            <h2 className="font-display text-3xl md:text-4xl text-wood-dark">
              📬 Tilaa Mölyapinat 📬
            </h2>
          </div>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            Haluatko meidät esiintymään? Ota yhteyttä!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            name="contact"
            method="POST"
            data-netlify="true"
            className="bg-card rounded-3xl p-6 md:p-8 shadow-xl space-y-6"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div>
              <label className="font-body font-semibold text-foreground flex items-center gap-2 mb-2">
                <User className="w-5 h-5 text-bright-orange" />
                Nimi
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-background border-2 border-border rounded-2xl px-4 py-3 font-body focus:border-primary focus:outline-none transition-colors"
                placeholder="Kirjoita nimesi"
              />
            </div>

            <div>
              <label className="font-body font-semibold text-foreground flex items-center gap-2 mb-2">
                <Mail className="w-5 h-5 text-neon-green" />
                Sähköposti
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-background border-2 border-border rounded-2xl px-4 py-3 font-body focus:border-primary focus:outline-none transition-colors"
                placeholder="sinun@email.fi"
              />
            </div>

            <div>
              <label className="font-body font-semibold text-foreground flex items-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Viesti
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                className="w-full bg-background border-2 border-border rounded-2xl px-4 py-3 font-body focus:border-primary focus:outline-none transition-colors resize-none"
                placeholder="Kerro meille miten voimme auttaa!"
              />
            </div>

            <motion.button
              type="submit"
              className="w-full bg-bright-orange text-primary-foreground font-display text-xl py-4 rounded-2xl shadow-lg flex items-center justify-center gap-3 hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-6 h-6" />
              Lähetä viesti 🍌
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

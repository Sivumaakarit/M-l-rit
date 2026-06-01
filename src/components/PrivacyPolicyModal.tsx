import { Shield, Sparkles, User, Mail, FileText, CheckCircle, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PrivacyPolicyModal = ({ isOpen, onOpenChange }: PrivacyPolicyModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col p-0 border-4 border-wood-dark shadow-2xl rounded-3xl bg-background">
        {/* Leikkisä viidakkoteemainen yläosa */}
        <div className="bg-gradient-to-r from-hero-green/40 to-primary/40 px-6 py-5 border-b-4 border-wood-dark relative">
          <div className="absolute right-4 top-2 text-3xl select-none animate-bounce">
            🍌
          </div>
          <DialogHeader className="space-y-1">
            <DialogTitle className="font-heading text-2xl md:text-3xl text-wood-dark flex items-center gap-3 text-shadow-fun">
              <Shield className="w-8 h-8 text-forest-green animate-pulse" />
              Tietosuojaseloste
            </DialogTitle>
            <DialogDescription className="font-body text-wood-dark/80 text-sm font-bold">
              Mölyapinat – Henkilötietojen suojaaminen ja käsittely
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Sisältöalue (vieritettävä) */}
        <div className="flex-1 overflow-y-auto px-6 py-6 font-body text-wood-dark space-y-6">
          <div className="bg-white/60 border-2 border-wood-dark/10 rounded-2xl p-4 text-sm leading-relaxed mb-4 flex gap-3 items-start">
            <Info className="w-5 h-5 text-bright-orange shrink-0 mt-0.5" />
            <p>
              Tämä tietosuojaseloste kuvaa, miten keräämme, käsittelemme ja suojaamme yhteydenottajien ja keikkatilaajien henkilötietoja EU:n yleisen tietosuoja-asetuksen (GDPR) mukaisesti.
            </p>
          </div>

          <div className="space-y-6 text-sm md:text-base">
            {/* 1. REKISTERINPITÄJÄ */}
            <section className="space-y-2 border-b border-wood-dark/10 pb-4">
              <h3 className="font-heading text-lg md:text-xl text-forest-green flex items-center gap-2">
                <span className="text-xl">1.</span> Rekisterinpitäjä
              </h3>
              <div className="pl-6 space-y-1 text-slate-700">
                <p><strong>Nimi / Ryhmä:</strong> Mölyapinat (bändi / esiintyjäryhmä)</p>
                <p><strong>Verkkosivusto:</strong> <a href="https://www.molyapinat.fi" target="_blank" rel="noopener noreferrer" className="text-forest-green hover:underline">www.molyapinat.fi</a></p>
                <p><strong>Kuvaus:</strong> Bändi toimii itsenäisenä ryhmänä ja vastaa sivuston kautta kerätyistä tiedoista yhteisesti.</p>
              </div>
            </section>

            {/* 2. YHTEYSHENKILÖ */}
            <section className="space-y-2 border-b border-wood-dark/10 pb-4">
              <h3 className="font-heading text-lg md:text-xl text-forest-green flex items-center gap-2">
                <span className="text-xl">2.</span> Yhteyshenkilö tietosuoja-asioissa
              </h3>
              <div className="pl-6 space-y-2 text-slate-700">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-bright-orange" />
                  <span><strong>Nimi:</strong> Esko Mäki</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-bright-orange" />
                  <span><strong>Sähköposti:</strong> <a href="mailto:eskomk@gmail.com" className="text-forest-green hover:underline">eskomk@gmail.com</a></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs">📞</span>
                  <span><strong>Puhelin:</strong> 050 540 3661</span>
                </div>
              </div>
            </section>

            {/* 3. REKISTERIN NIMI */}
            <section className="space-y-2 border-b border-wood-dark/10 pb-4">
              <h3 className="font-heading text-lg md:text-xl text-forest-green flex items-center gap-2">
                <span className="text-xl">3.</span> Rekisterin nimi
              </h3>
              <p className="pl-6 text-slate-700 font-bold">
                Mölyapinat-bändin keikkakysely- ja yhteydenottorekisteri.
              </p>
            </section>

            {/* 4. HENKILÖTIETOJEN KÄSITTELYN TARKOITUS JA OIKEUSPERUSTE */}
            <section className="space-y-2 border-b border-wood-dark/10 pb-4">
              <h3 className="font-heading text-lg md:text-xl text-forest-green flex items-center gap-2">
                <span className="text-xl">4.</span> Käyttötarkoitus & oikeusperuste
              </h3>
              <div className="pl-6 space-y-3 text-slate-700">
                <p>Käsittelemme tietoja vain ja ainoastaan bändin toimintaan liittyvissä asioissa:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Yhteydenottoihin vastaaminen:</strong> Keikkatarjousten, kyselyiden ja palautteiden käsittely.</li>
                  <li><strong>Keikkojen sopiminen:</strong> Tarvittavien tietojen vaihtaminen keikan käytännön järjestelyjä, aikataulutusta ja mahdollista laskutusta/palkkionmaksua varten.</li>
                </ul>
                <p className="mt-2 font-semibold">Käsittelyn oikeusperusteet:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Sopimus tai sen valmistelu:</strong> Käsittely on tarpeen keikkatarjouksen tekemiseksi tai sovitun esiintymisen järjestämiseksi.</li>
                  <li><strong>Oikeutettu etu:</strong> Yhteydenottopyyntöihin vastaaminen ja suora viestintä keikkatilaajan kanssa.</li>
                </ul>
              </div>
            </section>

            {/* 5. REKISTERIN TIETOSISÄLTÖ */}
            <section className="space-y-2 border-b border-wood-dark/10 pb-4">
              <h3 className="font-heading text-lg md:text-xl text-forest-green flex items-center gap-2">
                <span className="text-xl">5.</span> Rekisterin tietosisältö
              </h3>
              <div className="pl-6 space-y-2 text-slate-700">
                <p>Verkkosivuston yhteydenottolomakkeen kautta kerätään vain ne tiedot, jotka yhteydenottaja itse meille antaa:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  <div className="bg-white/40 p-2 rounded-xl border border-wood-dark/5 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-neon-green shrink-0" />
                    <span>Yhteyshenkilön tai tilaajan nimi</span>
                  </div>
                  <div className="bg-white/40 p-2 rounded-xl border border-wood-dark/5 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-neon-green shrink-0" />
                    <span>Sähköpostiosoite ja/tai puhelinnumero</span>
                  </div>
                  <div className="bg-white/40 p-2 rounded-xl border border-wood-dark/5 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-neon-green shrink-0" />
                    <span>Keikkatapahtumaan liittyvät tiedot</span>
                  </div>
                  <div className="bg-white/40 p-2 rounded-xl border border-wood-dark/5 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-neon-green shrink-0" />
                    <span>Vapaamuotoisen viestin tiedot</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. SÄÄNNÖNMUKAISET TIETOLÄHTEET */}
            <section className="space-y-2 border-b border-wood-dark/10 pb-4">
              <h3 className="font-heading text-lg md:text-xl text-forest-green flex items-center gap-2">
                <span className="text-xl">6.</span> Säännönmukaiset tietolähteet
              </h3>
              <p className="pl-6 text-slate-700">
                Tiedot saadaan ainoastaan suoraan sivuston käyttäjältä itseltään, kun hän täyttää ja lähettää verkkosivulla olevan yhteydenottolomakkeen tai lähettää bändille sähköpostia.
              </p>
            </section>

            {/* 7. TIETOJEN LUOVUTUKSET JA SIIRROT */}
            <section className="space-y-2 border-b border-wood-dark/10 pb-4">
              <h3 className="font-heading text-lg md:text-xl text-forest-green flex items-center gap-2">
                <span className="text-xl">7.</span> Tietojen luovutukset ja siirrot
              </h3>
              <p className="pl-6 text-slate-700">
                Käsittelemme saatuja viestejä luottamuksellisesti vain bändin jäsenten kesken. Tietoja ei luovuteta ulkopuolisille, ellei se ole välttämätöntä keikan toteuttamiseksi (esimerkiksi keikkapaikan tekniikasta vastaavalle taholle) tai ellei lainsäädäntö sitä vaadi. Tietoja ei siirretä EU:n tai ETA-alueen ulkopuolelle.
              </p>
            </section>

            {/* 8. REKISTERIN SUOJAUKSEN PERIAATTEET */}
            <section className="space-y-2 border-b border-wood-dark/10 pb-4">
              <h3 className="font-heading text-lg md:text-xl text-forest-green flex items-center gap-2">
                <span className="text-xl">8.</span> Rekisterin suojauksen periaatteet
              </h3>
              <p className="pl-6 text-slate-700">
                Lomakkeen kautta tulleet viestit ohjautuvat suojattuun sähköpostilaatikkoon, johon on pääsy vain nimetyillä bändin jäsenillä. Verkkosivustomme käyttää suojattua HTTPS-yhteyttä, mikä tarkoittaa, että lomakkeelle syötetyt tiedot matkaavat selaimesi ja sivuston välillä salattuna. Mitään erillisiä paperitulosteita viesteistä ei tehdä.
              </p>
            </section>

            {/* 9. TIETOJEN SÄILYTYSAIKA */}
            <section className="space-y-2 border-b border-wood-dark/10 pb-4">
              <h3 className="font-heading text-lg md:text-xl text-forest-green flex items-center gap-2">
                <span className="text-xl">9.</span> Tietojen säilytysaika
              </h3>
              <div className="pl-6 space-y-2 text-slate-700">
                <p>Säilytämme yhteydenottotietoja vain niin kauan kuin se on tarpeen kyselyyn vastaamiseksi tai keikan hoitamiseksi.</p>
                <p>Jos kysely ei johda keikkaan, tiedot ja viestit poistetaan säännöllisesti <strong>6 kuukauden</strong> kuluessa.</p>
                <p>Toteutuneiden keikkojen perustietoja ja viestihistoriaa voidaan säilyttää pidempään mahdollisia myöhempiä keikkatilauksia ja yhteydenpitoa varten, tai jos lainsäädäntö vaatii tositteiden säilyttämistä.</p>
              </div>
            </section>

            {/* 10. REKISTERÖIDYN OIKEUDET */}
            <section className="space-y-2 border-b border-wood-dark/10 pb-4">
              <h3 className="font-heading text-lg md:text-xl text-forest-green flex items-center gap-2">
                <span className="text-xl">10.</span> Rekisteröidyn oikeudet
              </h3>
              <p className="pl-6 text-slate-700">
                Lomakkeen täyttäjällä on milloin tahansa oikeus pyytää meitä näyttämään, mitä tietoja hänestä on tallennettu, pyytää korjaamaan virheelliset tiedot tai vaatia meitä poistamaan kaikki hänen viestinsä ja yhteystietonsa järjestelmästämme. Pyynnöt voi lähettää sähköpostitse kohdassa 2 mainitulle yhteyshenkilölle (Esko Mäki).
              </p>
            </section>

            {/* 11. MUUTOKSET TIETOSUOJASELOSTEESEEN */}
            <section className="space-y-2">
              <h3 className="font-heading text-lg md:text-xl text-forest-green flex items-center gap-2">
                <span className="text-xl">11.</span> Muutokset tietosuojaselosteeseen
              </h3>
              <p className="pl-6 text-slate-700">
                Voimme päivittää tätä selostetta tarvittaessa, jos esimerkiksi verkkosivujemme lomakkeet tai bändin yhteystiedot muuttuvat.
              </p>
              <p className="pl-6 pt-2 text-xs text-slate-400 font-bold">
                Päivitetty / Laadittu: 1.6.2026
              </p>
            </section>
          </div>
        </div>

        {/* Leikkisä viidakkoteemainen sulkupainike alhaalla */}
        <div className="bg-wood-clean px-6 py-4 border-t-4 border-wood-dark flex justify-end gap-3">
          <button
            onClick={() => onOpenChange(false)}
            className="px-6 py-2.5 bg-bright-orange text-white font-heading text-lg rounded-2xl border-3 border-wood-dark shadow-fun-small hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
            Selvä pyy! 🍌
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

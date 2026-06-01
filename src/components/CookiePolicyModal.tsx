import { Cookie, Sparkles, CheckCircle2, ShieldQuestion, HelpCircle, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface CookiePolicyModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CookiePolicyModal = ({ isOpen, onOpenChange }: CookiePolicyModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col p-0 border-4 border-wood-dark shadow-2xl rounded-3xl bg-background">
        {/* Leikkisä viidakkoteemainen yläosa */}
        <div className="bg-gradient-to-r from-hero-green/40 to-primary/40 px-6 py-5 border-b-4 border-wood-dark relative">
          <div className="absolute right-4 top-2 text-3xl select-none animate-bounce" style={{ animationDuration: '3s' }}>
            🍪
          </div>
          <DialogHeader className="space-y-1">
            <DialogTitle className="font-heading text-2xl md:text-3xl text-wood-dark flex items-center gap-3 text-shadow-fun">
              <Cookie className="w-8 h-8 text-bright-orange animate-spin" style={{ animationDuration: '10s' }} />
              Evästekäytäntö
            </DialogTitle>
            <DialogDescription className="font-body text-wood-dark/80 text-sm font-bold">
              Mölyapinat – Evästeiden käyttö ja tietosuoja
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Sisältöalue (vieritettävä) */}
        <div className="flex-1 overflow-y-auto px-6 py-6 font-body text-wood-dark space-y-6">
          <div className="bg-white/60 border-2 border-wood-dark/10 rounded-2xl p-4 text-sm leading-relaxed mb-4 flex gap-3 items-start">
            <CheckCircle2 className="w-5 h-5 text-forest-green shrink-0 mt-0.5" />
            <p>
              Verkkosivustollamme käytetään evästeitä (cookies) ja vastaavia tekniikoita käyttökokemuksen parantamiseksi, sivuston toimivuuden varmistamiseksi sekä kävijäliikenteen analysointiin ja markkinointiin.
            </p>
          </div>

          <div className="space-y-6 text-sm md:text-base">
            {/* MITÄ EVÄSTEET OVAT? */}
            <section className="space-y-2 border-b border-wood-dark/10 pb-4">
              <h3 className="font-heading text-lg md:text-xl text-forest-green flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-bright-orange" />
                Mitä evästeet ovat?
              </h3>
              <p className="pl-7 text-slate-700 leading-relaxed">
                Eväste on pieni tekstitiedosto, jonka verkkosivusto tallentaa tietokoneellesi tai mobiililaitteellesi, kun vierailet sivustolla. Evästeet auttavat sivustoa muistamaan asetuksesi ja toimintasi (kuten kielivalinnan tai valinnat) tietyn ajan, jotta sinun ei tarvitse syöttää niitä uudelleen. Evästeet eivät vahingoita laitettasi eivätkä ne pysty lukemaan muita tietoja laitteesi kiintolevyltä.
              </p>
            </section>

            {/* MITÄ EVÄSTEITÄ KÄYTÄMME JA MIKSI? */}
            <section className="space-y-3 border-b border-wood-dark/10 pb-4">
              <h3 className="font-heading text-lg md:text-xl text-forest-green flex items-center gap-2">
                <ShieldQuestion className="w-5 h-5 text-bright-orange" />
                Mitä evästeitä käytämme ja miksi?
              </h3>
              <p className="pl-7 text-slate-700">Käytämme sivustollamme seuraaviin ryhmiin kuuluvia evästeitä:</p>
              
              <div className="pl-7 space-y-4">
                {/* Välttämättömät evästeet */}
                <div className="bg-white/40 p-4 rounded-2xl border border-wood-dark/5 space-y-1">
                  <h4 className="font-heading text-base text-wood-dark flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-forest-green" />
                    Välttämättömät evästeet (Aina päällä)
                  </h4>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                    Nämä evästeet ovat sivuston teknisen toiminnan kannalta pakollisia. Ne mahdollistavat perustoiminnot, kuten sivulla siirtymisen ja suojattujen osioiden käytön. Sivusto ei toimi kunnolla ilman näitä evästeitä. Traficomin linjauksen mukaan näiden evästeiden asettaminen ei vaadi erillistä suostumusta.
                  </p>
                </div>

                {/* Toiminnalliset evästeet */}
                <div className="bg-white/40 p-4 rounded-2xl border border-wood-dark/5 space-y-1">
                  <h4 className="font-heading text-base text-wood-dark flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    Toiminnalliset evästeet
                  </h4>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                    Näiden avulla sivusto muistaa tekemäsi valinnat (kuten evästeasetuksesi tai alueen) ja tarjoaa parempia ja yksilöllisempiä ominaisuuksia.
                  </p>
                </div>

                {/* Tilastot ja analytiikka */}
                <div className="bg-white/40 p-4 rounded-2xl border border-wood-dark/5 space-y-1">
                  <h4 className="font-heading text-base text-wood-dark flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-bright-orange" />
                    Tilastot ja analytiikka (Tuotekehitys)
                  </h4>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                    Käytämme kolmannen osapuolen työkaluja (kuten Google Analytics) keräämään tietoa siitä, miten sivustoamme käytetään (esim. kävijämäärät, suosituimmat sivut). Tämä auttaa meitä kehittämään verkkosivuston sisältöä ja toimivuutta. Traficomin ohjeiden mukaisesti nämä evästeet ovat <strong>oletuksena pois päältä</strong> ja vaativat aktiivisen suostumuksesi.
                  </p>
                </div>

                {/* Markkinointievästeet */}
                <div className="bg-white/40 p-4 rounded-2xl border border-wood-dark/5 space-y-1">
                  <h4 className="font-heading text-base text-wood-dark flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-neon-green" />
                    Markkinointievästeet
                  </h4>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                    Näitä evästeitä käytetään seuraamaan kävijöitä eri verkkosivustoilla. Tarkoituksena on näyttää mainoksia, jotka ovat yksittäiselle käyttäjille merkityksellisiä ja kiinnostavia (esim. Googlen tai Facebookin kohdennettu mainonta). Myös nämä vaativat aina suostumuksesi.
                  </p>
                </div>
              </div>
            </section>

            {/* MITEN VOIT HALLITA TAI ESTÄÄ EVÄSTEITÄ */}
            <section className="space-y-2 border-b border-wood-dark/10 pb-4">
              <h3 className="font-heading text-lg md:text-xl text-forest-green flex items-center gap-2">
                <span className="text-lg">⚙️</span>
                Miten voit hallita tai estää evästeitä?
              </h3>
              <div className="pl-7 text-slate-700 space-y-2 leading-relaxed">
                <p>
                  Traficomin ja tietosuojasääntelyn mukaisesti suostumuksen antamisen ja siitä kieltäytymisen tulee olla sivustollamme yhtä helppoa. Voit hallita evästeasetuksiasi, muuttaa valintojasi tai peruuttaa suostumuksesi milloin tahansa sivustollamme näkyvän evästebannerin tai sivuston alalaidasta löytyvän <strong>Evästeasetukset</strong>-linkin kautta.
                </p>
                <p>
                  Vaihtoehtoisesti voit estää evästeiden käytön tai tyhjentää evästehistorian suoraan selaimesi asetuksista. Huomioithan, että välttämättömien evästeiden estäminen saattaa vaikuttaa verkkosivuston toimivuuteen, eikä osa palveluista välttämättä toimi oikein.
                </p>
              </div>
            </section>

            {/* LISÄTIETOJA EVÄSTEISTÄ */}
            <section className="space-y-2 border-b border-wood-dark/10 pb-4">
              <h3 className="font-heading text-lg md:text-xl text-forest-green flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-bright-orange" />
                Lisätietoja evästeistä
              </h3>
              <p className="pl-7 text-slate-700 leading-relaxed">
                Voit lukea lisää evästeistä, niiden tarkoituksesta ja Suomen kansallisista evästesuosituksista Liikenne- ja viestintävirasto Traficomin viralliselta verkkosivustolta: <br />
                <a 
                  href="https://www.traficom.fi/fi/palveluntarjoajille/viestintaverkot-ja-palvelut/evasteohjeistus-palveluntarjoajille" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-forest-green hover:underline font-bold"
                >
                  Traficomin evästeohjeistus palveluntarjoajille ➜
                </a>
              </p>
            </section>

            {/* MUUTOKSET EVÄSTEKÄYTÄNTÖÖN */}
            <section className="space-y-2">
              <h3 className="font-heading text-lg md:text-xl text-forest-green flex items-center gap-2">
                <span className="text-lg">📅</span>
                Muutokset evästekäytäntöön
              </h3>
              <p className="pl-7 text-slate-700">
                Varaamme oikeuden päivittää tätä evästekäytäntöä esimerkiksi palveluidemme kehityksen tai muuttuvan lainsäädännön vuoksi.
              </p>
              <p className="pl-7 pt-2 text-xs text-slate-400 font-bold">
                Päivitetty / Laadittu: 1.6.2026
              </p>
            </section>
          </div>
        </div>

        {/* Sulkupainike */}
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

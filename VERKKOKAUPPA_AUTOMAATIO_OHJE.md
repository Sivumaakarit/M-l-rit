# 🍌 Mölyapinat & Sivumaakarit: Verkkokauppa- ja Automaatioarkkitehtuuri

Tämä dokumentti sisältää täydellisen ja pysyvän yhteenvedon Mölyapinoiden verkkokauppatoteutuksesta, automaatioista, talous- ja ALV-laskelmista, kirjanpitotyökaluista sekä ohjeet järjestelmän ylläpitoon ja uusien tuotteiden lisäämiseen.

---

## 1. Järjestelmän Arkkitehtuuri & Tilausketju

Verkkokauppa on rakennettu 100 % automatisoiduksi: tilausten vastaanotto, maksu, valmistus tehtaalla, postitus ja asiakkaan seurantaviestit toimivat ilman manuaalista työtä.

```
[1. Asiakas tilaa sivulta (molyapinat.fi)]
             │
             ▼
[2. Stripe Kassa & Maksutavat (Kortti, MobilePay jne.)]
             │
             ├─────────────────────────────────────────────────┐
             ▼ (Raha tilillesi)                                ▼ (Webhook-kutsu Verceliin)
     [Stripe siirtää rahat]                         [api/stripe-webhook.ts]
                                                               │
                                                               ▼ (Luo tilauksen koon & osoitteen mukaan)
                                                    [3. Printfulin Tehdas (Riika, Latvia)]
                                                               │
                                                               ▼ (Paita painetaan ja pakataan)
                                                    [4. Paketti toimitukseen (Posti)]
                                                               │
                                                               ▼ (Printful ilmoittaa valmistumisesta)
                                                    [api/printful-webhook.ts]
                                                               │
                                                               ▼ (Resend lähettää asiakkaalle)
                                                    [5. Sähköposti: "Mölyapinat paita on matkalla!" + Postin seurantalinkki]
```

### Ketjun vaiheet sekunti sekunnilta:
1. **Asiakkaan tilaus:** Asiakas valitsee koon (XS–XL) interaktiivisesta galleriasta, näkee uudet mallikuvat ja siirtyy Stripe-kassalle.
2. **Maksutapahtuma:** Asiakas maksaa 24,90 € (toimituskulut 0 € sisältyy hintaan). Stripe kirjaa maksun ja asiakkaan toimitusosoitteen.
3. **Automaattinen tehdaslähetys (`api/stripe-webhook.ts`):** 
   - Stripe lähettää `checkout.session.completed` -kutsun palvelimellemme.
   - Koodi poimii asiakkaan osoitteen ja valitun koon.
   - Tilaus lähetetään välittömästi Printfulin tehtaalle tuotantoon.
   - Pakettiin injektoidaan personoitu lähetyslista (Mölyapinat-apinalogo + tervehdys).
4. **Valmistus & Postitus:** Printful valmistaa paidan ja antaa sen Postin kuljetettavaksi.
5. **Seurantaviesti asiakkaalle (`api/printful-webhook.ts`):**
   - Kun Printful postittaa paketin, se kutsuu `package_shipped` -webhookiamme.
   - Koodimme lähettää Resend-sähköpostipalvelun kautta asiakkaalle iloisen, brändätyn toimitusvahvistuksen, jossa on suora **"Seuraa lähetystä (Posti)"** -painike.
   - Vastausosoitteena (`Reply-To`) toimii `jullenmusiikki@gmail.com`.
6. **Palautus- ja vaihtokäytäntö (Reilut pelisäännöt & nollariski):**
   - **Viallinen tuote:** Printful korvaa 100 % veloituksetta uudella, kun kuva lähetetään osoitteeseen `jullenmusiikki@gmail.com`.
   - **Koon vaihto tai katumus:** Asiakas vastaa itse palautuksen postikuluista Lohjalle (kuluttajansuojalain mukainen ehto mittatilaustuotteissa).
   - Palautettu ehjä paita otetaan bändin keikkamyyntiin, jolloin rahaa ei häviä.

---

## 2. Talous- ja Katelaskelma (Per Paita)

Myyntihinta: **24,90 €** (kuluttajahinta sis. 25,5 % ALV ja toimituskulut).

| Erä | Summa | Selite |
| :--- | :---: | :--- |
| **Kuluttajahinta** | **24,90 €** | Asiakkaan maksama kokonaishinta |
| – Myynnin ALV (25,5 %) | **-5,06 €** | Verottajan osuus (veroton myynti on 19,84 €) |
| – Stripe-välityskulu | **-0,62 €** | Korttimaksu / MobilePay (n. 1,5–1,8 % + 0,25 €, ALV 0 %) |
| – Printful-paita + DTG-printti | **-8,11 €** | Gildan 5000B + iso rintapainatus (ALV 0 % Y-tunnuksella) |
| – Printful-rahti Suomeen | **-4,49 €** | Posti Flat Rate -toimitus asiakkaan kotiosoitteeseen |
| **= PUHDAS LIIKEVOITTO** | **+6,62 €** | **Käteinen yrityksen tilille per paita (Kate 33,4 %)** |

### Miksi tämä malli on ylivoimainen pienyrittäjälle:
* **0 € varastoriskiä:** Yhtäkään paitaa ei tarvitse ostaa ennakkoon varastoon seisomaan.
* **0 h pakkausrumbaa:** Printful huolehtii tulostuksesta, laatikoinnista ja postituksesta.
* **Terve 33,4 % kate:** Yli 6,60 euroa puhdasta voittoa per paita riskittömästi.
* **Psykologinen hinnoittelu:** 24,90 € ilmaisella toimituksella on alle 25 euron maagisen heräteostokynnyksen vanhemmille ja faneille.

---

## 3. ALV ja Verotus: Y-tunnus & OmaVero

### A. Stripe ja ALV
* Stripe laskuttaa omat välityspalkkionsa (n. 0,62 €) **ALV 0 % käännetyllä verovelvollisuudella (EU Reverse Charge)**, koska olet syöttänyt Stripeen Y-tunnuksesi (`3631144-1`).
* Asiakkaan maksamasta 24,90 eurosta 5,06 € on arvonlisäveroa. Stripe siirtää koko rahan tilillesi, ja sinä tilität 5,06 € Suomen Verohallinnolle.

### B. Printful ja ALV 0 % (EU Reverse Charge) -hyväksyntäprosessi
* Printful sijaitsee Latviassa (EU-maa).
* **Tärkeä käytännön huomio:** Printful **hylkää** julkiset YTJ-tulosteet, koska kuka tahansa voi tulostaa niitä netistä.
* **Oikea hyväksytty dokumentti:**
  1. Kirjaudu OmaVeroon toiminimen/yrityksen puolesta.
  2. Valitse: *Veroasiat ➔ Todistukset ➔ Todistus arvonlisäverovelvollisuudesta*.
  3. Laita rasti ruutuun *"Haluan tilata alv-todistuksen"* ja lähetä tilaus.
  4. OmaVero tuottaa monikielisen PDF-todistuksen (*Certificate of VAT registration*), jossa on Verohallinnon virallinen leima ja QR-koodi.
* **Printfulin Legal Infon täsmäytys (Kriittinen vaihe):**
  - Ennen ALV-hakemuksen lähettämistä varmista osoitteessa `Printful Dashboard > Settings > Billing > Legal info`:
    * **Full name:** `Esko Ilmari Mäki` (etunimi ensin)
    * **Status:** `Registered business` (tai *An individual or sole proprietorship*)
    * **Company name:** `Sivumaakarit`
    * **Registration number:** `3631144-1` (virallinen Y-tunnus väliviivalla)
    * **Address:** `Siuntionkatu 21b B 2, 08150 Lohja`
* **ALV-tunnuksen syöttö:**
  - Siirry: `Billing > VAT / Tax ID`.
  - Syötä VAT ID muodossa: `FI36311441` (ilman väliviivaa).
  - EU:n VIES-tietokanta hakee automaattisesti nimen virallisessa muodossa: `Mäki Esko Ilmari / Sivumaakarit`.
  - Liitä Verohallinnon PDF ja lähetä (*Submit*).
* **Jos hakemus oli aiemmin hylätty (*Declined*):**
  - Tiedot eivät päivity automaattisesti, vaan vanha merkintä pitää ensin poistaa roskakorikuvakkeesta (**Remove**), jonka jälkeen uusi hakemus lähetetään puhtaalta pöydältä.
* **Tulos:** Printful vahvistaa statuksen (**Approved**). Tämän jälkeen Printful laskuttaa tuotannon ja rahdin suoraan **ALV 0 % käännetyllä verovelvollisuudella**, eikä Latvian 21 % alvia tarvitse maksaa.

### C. Sivumaakareiden ja Mölyapinoiden Suhde Verotuksessa
* Sivumaakarit (Y-tunnus 3631144-1) toimii virallisena verkkokaupan operaattorina ja tavarakauppiaana. Toiminimellä voi vapaasti harjoittaa verkkokauppatoimintaa mainostoimiston lisäksi.
* Verottajalle tämä on normaalia tavarakauppaa: myynnistä tilitetään ALV 25,5 % ja liikevoitto on yrityksen tuloa.

### D. Omakustanteiset Lahjat, Koon Vaihdot ja Kaverin Puolesta Tilaaminen
1. **Onko lahjoja pakko ilmoittaa verottajalle?**  
   Ei ole pakko. Jos maksat paidan omasta pussistasi ja annat sen sukulaiselle tai kaverille henkilökohtaisena lahjana, voit jättää sen kokonaan pois yrityksen kirjanpidosta.
2. **Milloin se kannattaa ilmoittaa?**  
   Jos paita liittyy bändin näkyvyyteen (faniarvonta, kilpailuvoitto, koon vaihto tai bändiläisen esiintymisasu), se on yrityksen **vähennyskelpoinen kulu** (12,60 € per paita), joka laskee maksettavaa tuloveroasi.
3. **Kaverin puolesta tilaus & MobilePay:**  
   Jos tilaat paidan bändikaverille ja hän maksaa sinulle MobilePaylla omakustannehinnan (12,60 €), kyseessä on **veroton kulukorvaus (kulujen tasaus)**. Tästä ei mene veroa, eikä sitä tarvitse ilmoittaa.

### E. Verottajan aikataulut (Toiminimi / Sivumaakarit)
1. **ALV-ilmoitus (OmaVero):**
   * Jos valittu verokausi on kalenterivuosi: ilmoitus ja maksu kerralla **28.2.2027**.
   * *(Tarkistettavissa OmaVerosta: Omat veroasiat ➔ Arvonlisävero).*
2. **Elinkeinotoiminnan veroilmoitus (Lomake 5):**
   * Annetaan vasta **keväällä 2027 (huhtikuun alussa)**.
   * Siinä ilmoitetaan vain koko vuoden yhteenlaskettu liikevaihto miinus kulut = verotettava liiketulos.

---

## 4. Salainen Kirjanpito- ja Hallintanäkymä (`/hallinta`)

Sivustolle on rakennettu kevyt ja suojattu kirjanpitoapuri osoitteeseen:
👉 **`https://molyapinat.fi/hallinta`** (paikallisesti: `http://localhost:8080/hallinta`)

### Ominaisuudet ja välilehdet:
* **Salasanasuojaus:** Salasana on **`Huhtikuu26`**.
* **Neutraali ulkoasu:** Kirjautumisruudussa lukee vain *”Mölyapinat Hallinta”*.
* **Välilehti 1: 📊 Verkkokaupan Myynnit & Kirjanpito:**
  - Verollinen myynti (€), ALV 25,5 %, Tuotantokulut ja Puhdas liikevoitto.
  - **Veroilmoitusapuri:** Näyttää suoraan yhteenlasketut summat niihin ruutuihin, joita OmaVero ja Lomake 5 kysyvät.
  - **Lataa Excel / CSV:** Yhdellä klikkauksella saat ladattua `Molyapinat_Kirjanpitoraportti_2026.csv` -tiedoston.
* **Välilehti 2: ⚡ Uusi Pikatilaus (Koon vaihdot, lahjat & bändipaidat):**
  - Voit tilata paidan suoraan Printfuliin syöttämällä vastaanottajan osoitteen ja valitsemalla koon.
  - Lomakkeessa on kytkin: **"Vahvista tilaus heti tuotantoon (Auto-confirm)"** vs **"Suositus testeihin: Luonnos (Draft)"**.
  - Luonnostilassa voit tarkistaa tilauksen ja perua sen Printfulissa ilman mitään kuluja!
  - Pikatilaukset pidetään täysin erillään myynneistä, joten ne **eivät sotke myynnin ALV:ia**, vaan toimivat valinnaisina yrityksen kuluvähennyksinä.
* **📧 Automaattiset sähköposti-ilmoitukset Eskolle (`eskomk@gmail.com`):**
  - Jokaisesta saapuneesta tilauksesta (Stripe-ostot ja pikatilaukset) lähtee heti sähköposti suoraan osoitteeseen `eskomk@gmail.com`.
  - Viestissä on asiakkaan tiedot, osoite, valittu koko sekä suora linkki Printfuliin kuittausta tai perumista varten.

### Tilaustavan ohjaus (Luonnos / Draft vs Suora automaatio):
- **Asetus:** `PRINTFUL_AUTO_CONFIRM=false` (Asetettu `.env.local`-tiedostoon ja asetettavissa Verceliin).
- **Kun `PRINTFUL_AUTO_CONFIRM=false`:** Tilaukset luodaan Printfuliin luonnoksina (Draft). Esko saa sähköpostiin tiedon ja linkin, käy tarkistamassa tilauksen ja voi joko hyväksyä sen painoon tai perua sen.
- **Kun `PRINTFUL_AUTO_CONFIRM=true`:** Tilaukset siirtyvät 100 % suoraan tuotantoon Riian tehtaalle ilman kuittaustarvetta.
### Nelinkertainen SEO- ja Näkymättömyyssuojaus:
1. `public/robots.txt` sisältää kiellon `Disallow: /hallinta` kaikille hakukoneille.
2. Sivun koodiin injektoidaan dynaamisesti `<meta name="robots" content="noindex, nofollow, noarchive" />`.
3. Sivuston navigaatiossa, footerissa tai teksteissä **ei ole yhtäkään linkkiä** tälle sivulle.
4. Sivua ei löydy sivukartasta (`sitemap.xml`).
👉 Kukaan ei voi eksyä sivulle vahingossa Google-haun kautta.

---

## 5. Tulevien Tuotteiden Lisääminen (Pipot, Lippikset, Hupparit)

Taustakoodi (`api/stripe-webhook.ts`) on rakennettu universaaliksi. Kun haluat lisätä uusia tuotteita myyntiin:

1. **Luo tuote Printfulissa:**
   - Tee uusi tuotepohja (esim. pipo tai lippis) Printfulin tuotevalikoimasta.
   - Ota talteen tuotteen Printful `sync_variant_id`.
2. **Luo Stripe Payment Link:**
   - Luo Stripessä uusi maksulinkki kyseiselle tuotteelle (esim. 19,90 €).
   - Aseta metadataan:
     - `sync_variant_id`: Printfulin varianttikoodi
     - `product_name`: esim. "Mölyapinat-talvipipo"
3. **Lisää tuote sivulle:**
   - Lisää tuotekortti ja ostosnappi [ShopSection.tsx](file:///Users/eskomaki/Antigravity/VerkkoSivut/Mölärit/src/components/ShopSection.tsx) -tiedostoon.
   - **Koko tausta-automaatio toimii suoraan ilman koodimuutoksia!**

---

## 6. Julkaisun ja Ympäristömuuttujien Checklist

1. **Printful ALV 0 % -status:** Tilassa **`Approved`** (EU Reverse Charge aktiivinen, veroton tuotantohinta 8,11 € + toimitus 4,49 € = 12,60 €).
2. **Kooditason varalinkki:** `ShopSection.tsx` sisältää aina `DEFAULT_STRIPE_PAYMENT_LINK` -varalinkin, jotta ostaminen toimii aina virheettömästi.
3. **Vercelin ympäristömuuttujat:**  
   Muista että `.env.local` ei siirry Gitiin. Ympäristömuuttujat lisätään Verceliin komennolla:
   ```bash
   echo -n "https://buy.stripe.com/..." | npx vercel env add VITE_STRIPE_PAYMENT_LINK production
   echo -n "oma_printful_api_avain" | npx vercel env add PRINTFUL_API_KEY production
   echo -n "oma_printful_api_avain" | npx vercel env add VITE_PRINTFUL_API_KEY production
   echo -n "18892987" | npx vercel env add VITE_PRINTFUL_STORE_ID production
   echo -n "re_..." | npx vercel env add RESEND_API_KEY production
   echo -n "true" | npx vercel env add PRINTFUL_AUTO_CONFIRM production
   ```
4. **Vercel SPA-reititys (`vercel.json`):**  
   Sisältää rewriten `{"source": "/((?!api/.*).*)", "destination": "/index.html"}`, jotta `/hallinta` toimii suorilla osoitteilla ilman 404-virheitä.
5. **Julkaisukomento Verceliin:**
   ```bash
   git add .
   git commit -m "feat: complete automated print-on-demand store with accounting dashboard"
   git push origin main
   npx vercel --prod --yes
   ```


# 🐒🍌 CASE STUDY & MASTER-MUISTIO: MÖLYAPINAT
## Moderni Verkkosivusto, Täysautomaattinen Fanituotekauppa ja Print-on-Demand -Infrastruktuuri

> **Dokumentin tarkoitus:**  
> Tämä on Mölyapinoiden virallinen järjestelmämuistio ja esittelydokumentti (Case Study). Dokumentti kuvaa seikkaperäisesti, miten Mölyapinat-bändin digitaalinen koti ja automatisoitu verkkokauppa on rakennettu, miten tilausketju pyörii täysin itsenäisesti ilman varastoriskiä, sekä miten fanituotteiden tuotot ja kirjanpito hoidetaan. Tätä dokumenttia voi esitellä bändin jäsenille, tuottajille ja yhteistyökumppaneille.

---

## 🌟 1. Johdanto & Projektin Tavoite

Mölyapinat on energinen, osallistava ja huippusuosittu lastenmusiikkiyhtye Lohjalta. Bändin kasvava keikkasuosio ja fanikunta loivat tarpeen:
1. **Huipputason brändiverkkosivustolle (`molyapinat.fi`),** joka toimii keikkamyynnin moottorina, tarjoaa mediamateriaalin tapahtumajärjestäjille ja innostaa lapsiperheitä.
2. **Modernille, riskittömälle fanituotekaupalle,** josta fanit voivat tilata virallisen bändipaidan suoraan kotiovelleen helposti (myös MobilePaylla) ilman, että kenenkään bändin jäsenen tarvitsee postittaa paketteja tai pitää paitalaatikoita kotonaan.

---

## ⚙️ 2. Automaation Ydin: Tilaus- ja Toimitusketju (Zero-Touch)

Verkkokaupassa ei ole manuaalisia välikäsiä. Koko ketju fanin klikkauksesta kotiinkuljetukseen on 100 % koodattu ja automatisoitu:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. Fani tilaa paidan osoitteesta molyapinat.fi                              │
│    - Valitsee koon (XS–XL) interaktiivisesta 4 mallikuvan galleriasta       │
│    - Hinta: 24,90 € (sisältää ilmaisen Postin toimituksen kotiin)           │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 2. Stripe Kassa & Maksutavat                                                │
│    - Maksuvaihtoehdot: MobilePay, Apple Pay, Google Pay, Pankkikortit       │
│    - Asiakas syöttää vain nimensä, toimitusosoitteensa ja puhelinnumeronsa  │
└──────────────────┬───────────────────────────────────────┬──────────────────┘
                   │                                       │
                   ▼ (Raha tilille)                        ▼ (Webhook-heräte)
         [Stripe siirtää rahat]                 [api/stripe-webhook.ts]
                                                           │
                                                           ▼ (Luo tilauksen tehtaalle)
                                                [3. Printfulin Tehdas (Riika)]
                                                           │
                                                           ▼ (DTG-tulostus & pakkaus)
                                                [4. Paketti Postiin]
                                                           │
                                                           ▼ (Webhook-ilmoitus tehtaalta)
                                                [api/printful-webhook.ts]
                                                           │
                                                           ▼ (Resend-sähköpostipalvelu)
                                                [5. Toimitussähköposti asiakkaalle]
                                                    - "Mölyapinat paita on matkalla! 🍌🐒"
                                                    - Suora Postin seurantapainike
```

---

## 🎨 3. Personointi ja Brändikokemus

Mölyapinoiden fanituotekaupassa mikään ei näytä geneeriseltä verkkokaupalta – kaikki henkii Mölymetsän riemukasta ilmettä:

### A. Verkkokaupan käyttöliittymä (`ShopSection.tsx`):
* **4 aitoa mallikuvaa:** Eteenpäin, taaksepäin, mallin päällä ja lähikuvassa.
* **Kuvan zoomaus (Lightbox):** Kuvaa klikkaamalla aukeaa terävä täyden ruudun lähikuva printistä.
* **Hauska ostoskorianimaatio:** Kun koko valitaan ja lisätään koriin, ruudun keskelle ponnahtaa pomppiva banaani-ikoni (`🍌`) Luckiest Guy -otsikkofontilla.
* **Aito Vipps MobilePay -logo:** Virallinen violetti squircle-logo herättää heti luottamusta suomalaisissa ostajissa.

### B. Paketin sisältä löytyvä tulostettu lähetyslista (Packing Slip):
Kun fani avaa postipaketin, sen sisällä on personoitu tulostettu lähetyslista:
* **Yläkulmassa:** Virallinen Mölyapinat-apinalogo suoraan tulostettuna.
* **Lähettäjän tiedot:** *Mölyapinat • Virallinen fanikauppa • www.molyapinat.fi*
* **Asiakaspalvelu:** `jullenmusiikki@gmail.com` • Puh: +358 50 540 3661
* **Lämmin viesti lapselle ja perheelle:**  
  *”Kiitos tilauksestasi! Toivottavasti virallinen Mölyapinat-bändipaita tuo paljon iloa ja riemukasta menoa! Terveisin Mölyapinat 🍌🐒”*

### C. Toimitussähköposti:
Kun Printful vie paketin Postin kuljetettavaksi:
* Asiakkaan sähköpostiin kilahtaa brändätty ilmoitus.
* Viestissä on iso banaaninkeltainen toimintapainike: **”Seuraa lähetystä (Posti)”**, jota klikkaamalla näkee lähetyksen kulun suoraan Postin järjestelmässä.
* Lähettäjän vastausosoitteena toimii suoraan Julle (`jullenmusiikki@gmail.com`).

### D. Vaihto- ja Palautuskäytäntö (Reilut pelisäännöt & Nollariski):
Koska kyseessä on tilaustyönä valmistettava fanituote eikä pikamuotiketju:
1. **Virhetilanteet (painovika, reikä tai postivaurio):** Printful valmistaa ja postittaa uuden korvaavan tuotteen **100 % veloituksetta** asiakkaan toimitettua kuvan virheestä osoitteeseen `jullenmusiikki@gmail.com`.
2. **Koon vaihto tai katumus:** Kuluttajansuojalain mukaisesti asiakas vastaa itse palautuksen postikuluista (kotimaan toimitus Keravalle). Tämä estää turhat kokeilutilaukset ("tilaan 3 paitaa ja palautan 2").
3. **Mitä palautetulle ehjälle paidalle tehdään?** Bändi ei lähetä sitä takaisin Latviaan, vaan se otetaan bändin keikkamyyntiin ja myydään seuraavalla keikalla käteisellä/MobilePaylla suoraan fanipöydästä! Näin rahaa ei häviä yhtään senttiä.

---

## 💰 4. Talous- ja Katelaskelma (Per Paita)

Fanituotteen myyntihinta on **24,90 €**. Hinta sisältää Suomen arvonlisäveron (25,5 %) ja ilmaisen toimituksen asiakkaan kotiin.

### Kuluerittely ja Voitto sentilleen:

| Erä | Summa | Huomiot ja Verokäsittely |
| :--- | :---: | :--- |
| **Kuluttajahinta (Brutto)** | **24,90 €** | Asiakkaan maksama kokonaissumma |
| – Myynnin ALV (25,5 %) | **-5,06 €** | Tilitetään Suomen Verohallinnolle (Veroton hinta 19,84 €) |
| – Stripe-välityskulu | **-0,62 €** | Korttimaksu / MobilePay (ALV 0 % EU Reverse Charge) |
| – Paidanteko + DTG-etupainatus | **-8,11 €** | Gildan 5000B huippulaatu (ALV 0 % Y-tunnuksella) |
| – Postitus Suomeen (Posti Flat Rate) | **-4,49 €** | Toimitus suoraan tehtaalta asiakkaalle (ALV 0 %) |
| **= PUHDAS VOITTO (VIIVAN ALLE)** | **+6,62 €** | **Käteinen yrityksen pankkitilille per myyty paita** |

### Tärkeimmät taloudelliset edut bändille:
1. **Kate on 33,4 % verottomasta myynnistä:** Yli 6,60 euroa puhdasta rahaa bändille joka ikisestä paidasta ilman työtunteja.
2. **Nollariski:** Ei tarvitse sijoittaa 1000–3000 euroa paitavarastoon, josta tietyt koot jäisivät myymättä. Jokainen paita valmistetaan vasta, kun asiakas on sen jo maksanut.
3. **Korkea ostohalu:** 24,90 € ilmaisella toimituksella on vanhemmille erittäin helppo heräteostos keikan jälkeen tai synttärilahjaksi.

---

## 🏛️ 5. ALV ja Verotus: Miten Y-tunnus, Omakustanteet & Lahjat toimivat?

Yritysmuotona toimii **Sivumaakarit (Y-tunnus: 3631144-1)**.

1. **Sivumaakareiden ja Mölyapinoiden suhde verottajan silmin:**
   - Sivumaakarit (päätoimiala: *Muu mainostoimistojen toiminta*) voi Suomen toiminimilain mukaan täysin vapaasti toimia Mölyapinoiden virallisen verkkokaupan operaattorina ja fanituotteiden myyjänä.
   - Verottajalle kyseessä on normaalia, laillista tavarakauppaa: myynnistä tilitetään ALV 25,5 % ja liikevoitto on yrityksen tuloa.
2. **Stripe (Irlanti / EU):**
   - Stripen tiedoissa on Y-tunnus. Stripe laskuttaa transaktiokulut **ALV 0 % käännetyllä verovelvollisuudella**.
3. **Printful (Latvia / EU) & ALV 0 % -hyväksyntäprosessi (Tärkeä kokemusoppi):**
   - **Miksi YTJ-tuloste ei kelpaa:** Printful hylkää julkisen verkon YTJ-hakutulosteet, koska kuka tahansa voi ladata niitä netistä.
   - **Oikea virallinen dokumentti:** Verohallinnon OmaVerosta tilattava virallinen **Todistus arvonlisäverovelvollisuudesta** (*Certificate of VAT registration*, esim. `L0495485266`), joka sisältää 5 kieltä, Verohallinnon leimat ja QR-koodin.
   - **Tilin Legal Infon täsmäävyys (Kriittinen vaatimus):** Printfulin tilin asetuksissa (`Billing > Legal info`) tietojen on täsmättävä todistukseen kirjaimellisesti ennen ALV-hakemuksen lähetystä:
     * *Full name:* `Esko Ilmari Mäki`
     * *Company name:* `Sivumaakarit`
     * *Registration number (Y-tunnus):* `3631144-1`
     * *Address:* `Siuntionkatu 21b B 2, 08150 Lohja`
   - **EU VIES -automaattihaku:** Kun VAT ID -kenttään syötetään `FI36311441` (ilman väliviivaa), järjestelmä noutaa EU:n VIES-tietokannasta virallisen nimen `Mäki Esko Ilmari / Sivumaakarit`. Kun tilin Legal Info on edellä mainitusti kunnossa, hakemus menee läpi.
   - **Hyöty:** Printful myy tuotannon ja toimituskulut suoraan **ALV 0 % EU-käännetyllä verovelvollisuudella (Reverse Charge)**, jolloin Latvian 21 % alvia ei tarvitse maksaa.
4. **Onko omakustanteiset lahjat, koon vaihdot ja bänditilaukset pakko ilmoittaa verottajalle?**
   - **Ei ole mikään pakko!** Kulujen vähentäminen on yrityksen oikeus, ei velvollisuus.
   - Jos tilaat paidan omasta pussistasi ja haluat antaa sen puhtaasti henkilökohtaisena lahjana sukulaiselle tai kaverille, voit jättää sen kokonaan pois yrityksen kirjanpidosta.
   - **Miksi ne kannattaa ilmoittaa?** Jos paita liittyy bändin toimintaan (arvontapalkinto faneille, koon vaihto tai bändiläisen esiintymisasu), se on yrityksen **vähennyskelpoinen kulu**, joka laskee maksettavaa tuloveroasi!
5. **Kaverin puolesta tilaus ja MobilePay-kulukorvaus:**
   - Jos tilaat paidan bändikaverille (Printful veloittaa 12,60 €) ja bändikaveri maksaa sinulle MobilePaylla tasan omakustannehinnan (12,60 €), kyseessä on **veroton kulukorvaus (kulujen tasaus)**.
   - Koska välistä ei otettu voittoa, se ei ole tuloa eikä siitä makseta veroa. Verottaja pitää tällaista kavereiden välistä kulujen jakoa täysin normaalina.
6. **Verottajan ilmoitusaikataulu:**
   - **ALV-ilmoitus (OmaVero):** Jos ALV-kausi on vuosi, vuoden 2026 myyntien ALV (5,06 € / paita) ilmoitetaan ja tilitetään **28.2.2027**.
   - **Elinkeinotoiminnan veroilmoitus (Lomake 5):** Täytetään kerran vuodessa **huhtikuussa 2027**, jolloin ilmoitetaan vain vuoden yhteenlasketut tulot miinus kulut.

---

## 🔒 6. Salainen Kirjanpitonäkymä (`/hallinta`)

Eskolle ja bändin vastuuhenkilöille on luotu oma suojattu työkalu:  
👉 **`https://molyapinat.fi/hallinta`**

* **Salasana:** `Huhtikuu26`
* **Näkymättömyys:** 
  - Koko julkiselta sivustolta ei ole yhtäkään linkkiä tälle sivulle.
  - `robots.txt` estää hakukoneet (`Disallow: /hallinta`).
  - Sivun koodissa on `<meta name="robots" content="noindex, nofollow, noarchive" />`.
  - Google ei koskaan näytä tätä sivua hakutuloksissa.
* **Mitä sivulta saa:**
  - **📊 Verkkokaupan myynnit:** Reaaliaikaiset myynnit, ALV:t ja tuotot.
  - **🏛️ Veroilmoitusapuri:** Kertoo suoraan luvut, jotka syötetään OmaVeroon ja Lomakkeelle 5.
  - **📥 Lataa Excel / CSV -painike:** Lataa suoraan koneelle virallisen kirjanpitoraportin valmiina Excel-tiedostona.
  - **⚡ Uusi Pikatilaus (Koon vaihdot, lahjat & bändipaidat):** Voit tilata paidan suoraan tehtaalle kenelle tahansa syöttämällä vastaanottajan osoitteen ja valitsemalla koon.
  - **🛡️ Luonnostila vs Automaatio (Kytkin):** Voit valita luodaanko tilaus luonnoksena (Draft, jolloin voit tarkistaa sen Printfulissa ja halutessasi perua ilman kuluja) vai suoraan tehdastuotantoon.
  - **📧 Sähköposti-ilmoitus:** Jokaisesta saapuneesta tilauksesta lähtee välitön ilmoitus ja kuittauslinkki Eskon sähköpostiin (`eskomk@gmail.com`).

### ⚙️ Miten tilaustapaa vaihdetaan (Luonnos vs Suora tuotanto):
1. **Verkkokaupan tilaukset (Stripe-maksu):**  
   - Tuotannossa aktiivisena: `PRINTFUL_AUTO_CONFIRM=true` (Tilaukset menevät heti tehtaalle valmistukseen).
   - Jos halutaan palauttaa luonnostila (Draft): vaihdetaan Vercelin Environment Variables -asetuksissa `PRINTFUL_AUTO_CONFIRM=false`.
2. **Pikatilaukset hallintapaneelista (`/hallinta`):**  
   - Lomakkeessa on suora valintaruutu: *”Vahvista tilaus heti tuotantoon (Auto-confirm)”* (oletuksena päällä). Jos rasti poistetaan, tilaus syntyy Printfuliin turvallisena luonnoksena ja voidaan perua ilman kuluja.
3. **Kooditason varalinkki:**  
   - `ShopSection.tsx` sisältää aina `DEFAULT_STRIPE_PAYMENT_LINK` -varalinkin, jotta "Stripe-maksulinkkiä ei ole määritetty!" -virhettä ei voi tulla.

---

## 🚀 7. Tulevaisuuden Mahdollisuudet: Uudet Tuotteet

Järjestelmän taustakoodi on rakennettu siten, että samalla integraatiolla voidaan ottaa myyntiin mitä tahansa uusia Printful-tuotteita ilman uutta koodaustyötä:
* **Mölyapinat-talvipipot** (syksy/talvi)
* **Mölyapinat-lippikset** (kesäfestarit)
* **Lasten hupparit ja kangaskassit**
* **Mölymetsä-juomapullot ja mukit**

Kun uusi tuote halutaan myyntiin:
1. Luodaan tuotepohja Printfulissa.
2. Luodaan vastaava Stripe-maksulinkki.
3. Lisätään tuotekortti sivustolle. Taustajärjestelmä hoitaa loput automaattisesti!

---

*Tämä dokumentti on tallennettu projektin juureen tiedostoksi: `MOLYAPINAT_CASE_STUDY_JA_MUISTIO.md`.*  
*Tekijä & Arkkitehtuuri: Sivumaakarit • 2026*

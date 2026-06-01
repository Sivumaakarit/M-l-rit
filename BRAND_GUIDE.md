# 🐒 Mölyapinat – Visuaalinen brändiopas 🍌

Tämä opas on tarkoitettu Mölyapinat-bändin somesisällön tuottajille, graafikoille ja yhteistyökumppaneille. Sen avulla varmistetaan, että Mölyapinoiden viestintä, kuvat ja sometekstit pysyvät **yhtenäisinä, energisinä ja tunnistettavina** kaikissa kanavissa!

---

## 🎨 Brändivärit (Color Palette)

Mölyapinoiden väripaletti on saanut inspiraationsa syvältä Mölymetsän siimeksestä, banaanipuiden katveesta ja luonnonpuun lämmöstä. Käytä näitä värejä somemateriaaleissa, Canva-malleissa ja bannereissa.

### 1. Päävärit (Primary Colors)

| Väri | Nimi | HEX | HSL | Kuvaus / Käyttö |
| :--- | :--- | :--- | :--- | :--- |
| <span style="display:inline-block;width:30px;height:20px;background:#FCD34D;border:2px solid #000;border-radius:4px;"></span> | **Banaani-keltainen** | `#FFD21A` | HSL `48 100% 55%` | Brändin sielu. Huomioväri, ilon, banaanien ja auringon väri. |
| <span style="display:inline-block;width:30px;height:20px;background:#FF6A1A;border:2px solid #000;border-radius:4px;"></span> | **Möly-oranssi** | `#FF6A1A` | HSL `25 100% 55%` | Toimintakehoitteet, energia, iloiset korostukset ja reippaus. |
| <span style="display:inline-block;width:30px;height:20px;background:#236B3D;border:2px solid #000;border-radius:4px;"></span> | **Viidakon-vihreä** | `#236B3D` | HSL `140 50% 28%` | Metsäteema, rauhoittavat elementit, tekstivärit ja luonto. |

### 2. Tukivärit (Supporting Colors)

| Väri | Nimi | HEX | HSL | Kuvaus / Käyttö |
| :--- | :--- | :--- | :--- | :--- |
| <span style="display:inline-block;width:30px;height:20px;background:#4A3525;border:2px solid #000;border-radius:4px;"></span> | **Lankku-ruskea** | `#4A3525` | HSL `25 35% 22%` | Tekstin pääväri, reunukset, puukuvioiden tummat osat. |
| <span style="display:inline-block;width:30px;height:20px;background:#D1EEDF;border:2px solid #000;border-radius:4px;"></span> | **Minttu-vihreä** | `#D1EEDF` | HSL `150 40% 90%` | Taustat, pehmeät laatikot, raikas korostus. |
| <span style="display:inline-block;width:30px;height:20px;background:#1AE61A;border:2px solid #000;border-radius:4px;"></span> | **Neon-vihreä** | `#1AE61A` | HSL `120 80% 50%` | Tehosteet, dynaamiset kohdat, sähäkkä energia. |
| <span style="display:inline-block;width:30px;height:20px;background:#FFFDF5;border:2px solid #000;border-radius:4px;"></span> | **Hiekan-vaalea** | `#FFFDF5` | HSL `45 100% 96%` | Päätaustaväri. Pehmeä luonnonvalkoinen, joka ei rasita silmiä. |

---

## 🔤 Typografia (Typography)

Mölyapinoiden typografia yhdistää **sarjakuvamaisen riehakkuuden** ja **lapsiystävällisen selkeyden**.

### 1. Otsikkofontti: `Luckiest Guy`
- **Käyttö**: Isot otsikot, some-kuvien päätekstit, herätteet ja bändin nimi.
- **Tuntuma**: Sarjakuvamainen, pullea, energinen ja jämäkkä.
- **Lähde**: [Google Fonts – Luckiest Guy](https://fonts.google.com/specimen/Luckiest+Guy)
- **Tyylivinkki**: Käytä otsikoissa pientä varjoa luomaan dynaamista 3D-ilmettä (Tailwindissa `text-shadow-fun` tai CSS: `text-shadow: 2px 2px 0px rgba(74, 53, 37, 0.3)`).

### 2. Leipätekstifontti: `Quicksand`
- **Käyttö**: Pidemmät sometekstit, kuvatekstit, selostukset ja nettisivujen leipäteksti.
- **Tuntuma**: Pyöristetty sans-serif, erittäin ystävällinen, helppolukuinen ja pehmeä.
- **Lähde**: [Google Fonts – Quicksand](https://fonts.google.com/specimen/Quicksand) (suositellut painot: `500 (Medium)` ja `700 (Bold)`).

---

## 🪵 Visuaalinen ilme & Efektit (Visual Elements)

Mölymetsän visuaaliseen maailmaan kuuluu luonnonläheisyys ja orgaaniset muodot:

1. **Puulankku-teemat (Wood Texture)**:
   - Nettisivujen pääelementeissä käytetään puulankkukuvioita (`lauta-clean`, `wood-clean`).
   - Somen kuvapohjissa ja videoissa kannattaa hyödyntää **vaaleaa puuta taustana** ja **tummanruskeita reunuksia** (kuin puukylttejä viidakossa!).
2. **Pyöristetyt kulmat (Soft Edges)**:
   - Ei teräviä kulmia! Kaikki elementit (painikkeet, kuvakehykset, somegrafiikat) pyöristetään reilusti (nettisivuilla `rounded-2xl` tai `rounded-3xl` / `1.5rem`). Tämä viestii turvallisuudesta ja lapsiystävällisyydestä.
3. **Tummanruskeat ääriviivat (Outlines)**:
   - Käytä somegrafiikassa elementtien ympärillä selkeitä, tummanruskeita (`#4A3525`) ääriviivoja (2px–4px) ja varjoja pelkän mustan sijaan. Se pitää ilmeen lämpimänä.

---

## 🐒 Tone of Voice – Äänensävy somessa

Miten Mölyapinat puhuvat ja viestivät? Somessa meidän tulee kuulostaa samalta kuin lavalla: **innostavilta, osallistavilta ja ripauksen hassuilta!**

### 1. Viestinnän kulmakivet
- **Positiivisuus & Energia**: Viestit alkavat reippaasti ja ne hehkuttavat musiikin ja yhdessä tekemisen riemua.
- **Osallistaminen**: Kysy lapsilta ja vanhemmilta kysymyksiä! *"Mikä on teidän perheen suosikki-mölybiisi?"* tai *"Ketkä kaikki ovat tulossa pomppimaan viikonloppuna meidän kanssa?"*.
- **Kaksitasoisuus**: Puhutellaan sekä pieniä "mölyapinoita" (lapset) että "isompia apinoita" (vanhemmat, opettajat, tapahtumajärjestäjät), sillä vanhemmat tekevät keikkatilaukset ja lipunostot!

### 2. Emojien käyttö (Erittäin tärkeää! 🍌)
Mölyapinat rakastavat emojeita. Niitä käytetään aina tekstin alussa, lopussa ja väleissä tuomaan iloa ja rytmiä.

**Suosituimmat emojit:**
- Apinat: 🐒, 🦍, 🦧
- Banaanit & Eväät: 🍌, 🥥, 🍍
- Musiikki: 🎵, 🎶, 🎸, 🥁, 🎤, 🎷
- Pomppiminen & Luonto: 🌴, 🌿, ☀️, ✨, 💥

### 3. Esimerkkejä someteksteistä

#### Esimerkki 1: Keikkailmoitus (Facebook & Instagram)
> 🌴 **HUOMIO KAIKKI MÖLYAPINAT!** 🌴
> 
> Tänä lauantaina pistetään viidakossa töminäksi, kun Mölyapinat rantautuu esiintymään Mölymetsän kesäjuhlille! 🐒🎶
> 
> Ota mukaan parhaat hyppelykengät ja reippain lauluääni, sillä luvassa on banaanisadetta ja apinamaista menoa koko perheelle! 🍌🎸
> 
> 📍 Missä: Mölymetsän torilava
> 🕐 Milloin: Lauantaina klo 13:00 (vapaa pääsy!)
> 
> Nähdäänkö siellä? Kommentoi alle millä apinatyylillä olet tulossa paikalle! 👇🌿
> 
> #mölyapinat #lastenmusiikki #keikat #kokoperheentapahtuma

#### Esimerkki 2: Keikkakyselyt / Markkinointi (B2B vanhemmille/tapahtumajärjestäjille)
> 🎤 **Etsitkö tapahtumaasi sellaista ohjelmaa, joka saa takuulla kaikenikäiset pomppimaan?** 🥁
> 
> Mölyapinat tuo mukanaan energisen, osallistavan ja laadukkaan lastenmusiikkiesityksen, joka tempaa lapset ja vanhemmat mukaan ensitahdeista lähtien! 🐒✨
> 
> Keikkailemme ympäri Suomen ja esityksemme sopii niin suuriin festareihin, koulujen tapahtumiin kuin synttäreillekin.
> 
> 🍌 Pyydä tarjous helposti ja nopeasti verkkosivuiltamme: www.molyapinat.fi tai laita viestiä yhteysapinallemme Esko Mäelle: eskomk@gmail.com! 📩
> 
> Pistäkäämme yhdessä kunnon mölyt pystyyn! 🎸🌴

---

## 🖼️ Juliste- ja printtimainosohjeistus (Poster & Print Guidelines)

Tämä osio antaa suorat ohjeet graafiselle suunnittelijalle tai tekoälylle (kuten Midjourney, DALL-E) uuden julisteen, kansikuvan tai printtimainoksen luomiseen.

### 1. Mintunvihreä (`#D1EEDF`) – Se tärkein taustaväri 🌴
Mölyapinoiden visuaalinen perusta nojaa vahvasti **raikkaaseen mintunvihreään taustaan**. 
- **Miksi?** Mintunvihreä tausta antaa parhaan mahdollisen **kontrastin bändin keltaisille (banaanit) ja oransseille (logo, painikkeet) elementeille**. Keltainen ja oranssi "pomppaavat" upeasti vihreältä pohjalta, mikä tekee mainoksesta erittäin huomiota herättävän.
- **Käyttö**: Käytä julisteiden taustana joko tasaista mintunvihreää `#D1EEDF` tai pehmeää pystysuuntaista liukuväriä mintunvihreästä hieman lämpimämpään lehtivihreään (`#A8D5BA`).

### 2. Asettelu ja sommittelu (Layout Structure)
Kun teet julistetta tai mainosta, noudata tätä kolmiosaista rakennetta:

```
┌────────────────────────────────────────┐
│  [ KAARUVA TAI VINO OTSIKKO ] 🍌       │  <-- Keltainen tai oranssi Luckiest Guy, tumma reuna
├────────────────────────────────────────┤
│                                        │
│          PÄÄKUVA / KUVITUS             │  <-- Mölyapinat soittimineen
│        (esim. mintulla pohjalla)       │
│                                        │
├────────────────────────────────────────┤
│  ┌──────────────────────────────────┐  │
│  │   [ PYÖRISTETTY TIETOLAATIKKO ]  │  │  <-- Puukuviollinen kyltti tai vaalea hiekan sävy
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
```

- **Yläosa (Otsikko)**: Aseta pääotsikko (esim. *"KEIKALLA MÖLYMETSÄSSÄ"* tai bändin nimi) hieman vinoon tai kaarevaan linjaan. Käytä aina `Luckiest Guy` -fonttia, keltaista tai oranssia väriä ja paksua lankunruskeaa (`#4A3525`) ääriviivaa ja varjoa.
- **Keskiosa (Kuvitus)**:
  - **Kuva**: Mölyapinat (apinat, bändin jäsenet soittimineen) sijoitetaan keskiöön.
  - **Tehosteet**: Ympärille voi ripotella leijuvia banaaneja (`🍌`) ja nuotteja (`🎵`), jotka tuovat kuvaan dynaamisuutta ja leikkisyyttä.
- **Alaosa (Tiedot)**:
  - **Tietolaatikot**: Keikan päivämäärät, paikat ja kellonajat sijoitetaan pyöristetyille laatikkoelementeille.
  - **Tyyli**: Suosi laatikon taustana joko vaaleaa puukuviointia (`wood-clean` / `#D4C3A3`) tai vaaleaa hiekansävyä `#FFFDF5`, jossa on tummanruskeat reunaviivat. Tämä takaa sen, että tärkeät tiedot ovat helppolukuisia.

### 3. Prompt-ohje tekoälylle (esim. kansikuvan tai julisteen luontiin)
Jos haluat luoda uuden taustakuvan tai kuvituksen tekoälyllä, käytä tätä valmista pohjaa:

> *A fun, playful children's illustration of cool cartoon monkeys playing instruments (guitar, drums, microphone) in a vibrant jungle setting. Primary background color is a fresh, light mint green (#D1EEDF) with lush tropical leaves. Scattered floating yellow bananas and musical notes in the air. Warm lighting, thick friendly outlines, bold organic shapes with heavily rounded corners. Cartoonish, warm, energetic, and highly appealing to kids, professional quality vector style.*

---
*Mölyapinat – Lastenmusiikkia suurella sydämellä ja kovalla metelillä!*

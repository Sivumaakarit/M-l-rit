# 🐒 Mölyapinat 🐒

Tervetuloa Mölyapinat-lastenmusiikkibändin virallisille verkkosivuille! Mölyapinat tarjoavat lastenmusiikkia suurella sydämellä ja kovalla metelillä. 🍌

Sivusto on moderni, nopea ja responsiivinen yhden sivun verkkosovellus (Single-Page Application), joka on optimoitu sekä kävijöille että hakukoneille.

---

## 🌟 Ominaisuudet

- **Dynaaminen keikkakalenteri**: Mölyapinoiden tulevat esiintymiset ja menneet keikat selkeästi ja leikkisästi ryhmiteltyinä.
- **Musiikkiosio**: Mahdollisuus kuunnella bändin sinkkuja ja katsella musiikkivideoita suoraan sivustolta.
- **Bändin esittely**: Leikkisät kortit Mölyapinoiden jäsenistä ja heidän soittimistaan.
- **Yhteydenottolomake**: Suora ja helppo keikkakyselyjärjestelmä integroituna Formspree-palveluun.
- **Tietosuojaseloste (GDPR)**: Sisäänrakennettu, tyylikäs ja saavutettava tietosuojaseloste, joka avautuu suoraan sivustolla modaalina (sekä alapalkista että lomakkeesta).
- **Evästesuostumus ja -asetukset**: Traficomin ja GDPR:n säädökset täyttävä, animoitu evästebanneri ja hienojakoinen evästeasetusten hallinta.

---

## 🛠️ Teknologiapino

Tämä sivusto on rakennettu moderneilla verkkoteknologioilla korkean suorituskyvyn varmistamiseksi:

- **Ydin**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Kääntäjä & Kehitysympäristö**: [Vite](https://vitejs.dev/)
- **Tyylittely**: [Tailwind CSS](https://tailwindcss.com/)
- **UI-komponentit**: [shadcn/ui](https://ui.shadcn.com/) (Radix Primitives)
- **Animaatiot**: [Framer Motion](https://www.framer.com/motion/)
- **Ikonit**: [Lucide React](https://lucide.dev/)

---

## 💻 Paikallinen kehitys

Seuraa näitä ohjeita ajaaksesi ja kehittääksesi sivustoa paikallisesti:

### 1. Asenna riippuvuudet
Varmista, että sinulla on [Node.js](https://nodejs.org/) asennettuna. Suorita sitten projektin juuressa:
```sh
npm install
```

### 2. Käynnistä kehityspalvelin
Käynnistä paikallinen kehityspalvelin automaattisella päivityksellä (Hot Module Replacement):
```sh
npm run dev
```
Avaa sen jälkeen selaimessa osoite: [http://localhost:8080/](http://localhost:8080/)

### 3. Rakenna tuotantoversio
Rakenna sivusto valmiiksi tuotantoa varten (dist-kansioon):
```sh
npm run build
```

---

## 🚀 Julkaisu (Deploy)

Projektissa on valmis julkaisuskripti `deploy.sh`, joka automatisoi laadunvarmistuksen, Git-tallennuksen ja julkaisun:

```sh
# Aja julkaisu antamalla commit-viesti argumenttina
bash deploy.sh "feat: uusi päivitys sivustolle"
```

Tämä skripti tekee automaattisesti seuraavat vaiheet:
1. **Laadunvarmistus**: Ajaa tuotantobuildin paikallisesti varmistaakseen, ettei koodissa ole kääntymisvirheitä.
2. **Kooditallennus (Git)**: Tallentaa kaikki muutokset paikalliseen repositoryyn ja tekee commitin.
3. **Päivitys GitHubiin**: Työntää koodin GitHub-repositorioomme.
4. **Vercel-julkaisu**: Julkaisee sivuston automaattisesti livenä Verceliin.

---

## 🔗 Linkit

- **Kotisivut livenä**: [https://molyapinat.fi](https://molyapinat.fi)
- **GitHub**: [https://github.com/Sivumaakarit/M-l-rit](https://github.com/Sivumaakarit/M-l-rit)

---
*Sivuston ylläpidosta ja kehityksestä vastaa [Sivumaakarit](https://sivumaakarit.fi) – Premium Web Architecture & AI Optimization.*

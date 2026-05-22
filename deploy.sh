#!/bin/bash
# Sivumaakareiden nopean ja helpon julkaisun skripti
set -e

# Tarkistetaan onko commit-viesti annettu argumenttina, muuten kysytään sitä interaktiivisesti
if [ -z "$1" ]; then
    echo -n "📝 Kirjoita commit-viesti (esim. 'Uusi sinkku lisätty'): "
    read msg
else
    msg="$1"
fi

# Jos viesti on tyhjä, keskeytetään
if [ -z "$msg" ]; then
    echo "❌ Virhe: Commit-viesti on pakollinen julkaisua varten!"
    exit 1
fi

echo ""
echo "🛠️  1/4: Varmistetaan laatu (npm run build)..."
npm run build

echo ""
echo "💾 2/4: Tallennetaan koodimuutokset..."
git add .
# Sallitaan commitin epäonnistuminen jos mitään muutoksia ei ole tehty
git commit -m "$msg" || echo "ℹ️  Ei uusia muutoksia tallennettavana."

echo ""
echo "🚀 3/4: Työnnetään koodi GitHubiin..."
git push origin main

echo ""
echo "⚡ 4/4: Julkaistaan sivusto livenä Verceliin..."
npx vercel --prod --yes

echo ""
echo "🎉 TÄYDELLISTÄ! Sivusto on nyt onnistuneesti julkaistu livenä!"
echo "🔗 GitHub: https://github.com/Sivumaakarit/M-l-rit"
echo "🔗 Kotisivut: https://molyapinat.fi"

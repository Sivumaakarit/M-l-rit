/**
 * Printful API -integraatiopalvelu
 * 
 * Kun lisäät Printful API -avaimen .env-tiedostoon:
 * VITE_PRINTFUL_API_KEY=oma_api_avain
 * 
 * Tämä moduuli mahdollistaa tuotteiden hakemisen ja tilausten lähettämisen Printfulille.
 */

export interface PrintfulProductItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  sizes: string[];
  colors?: string[];
  externalId?: string;
}

export interface OrderRecipient {
  name: string;
  address1: string;
  city: string;
  zip: string;
  country_code: string; // 'FI'
  email: string;
  phone?: string;
}

export interface OrderItem {
  sync_variant_id: number;
  quantity: number;
}

export const PRINTFUL_CONFIG = {
  apiKey: import.meta.env.VITE_PRINTFUL_API_KEY || "",
  baseUrl: "https://api.printful.com",
};

/**
 * Tarkistaa onko Printful API -avain asetettu
 */
export const isPrintfulConfigured = (): boolean => {
  return Boolean(PRINTFUL_CONFIG.apiKey && PRINTFUL_CONFIG.apiKey.length > 5);
};

/**
 * Hakee kaupan synkronoidut tuotteet Printfulista
 */
export async function getPrintfulStoreProducts() {
  if (!isPrintfulConfigured()) {
    console.info("Printful API -avainta ei ole vielä asetettu. Käytetään paikallista tuotedataa.");
    return null;
  }

  try {
    const res = await fetch(`${PRINTFUL_CONFIG.baseUrl}/store/products`, {
      headers: {
        Authorization: `Bearer ${PRINTFUL_CONFIG.apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Printful API virhe: ${res.statusText}`);
    }

    const data = await res.json();
    return data.result;
  } catch (error) {
    console.error("Virhe haettaessa Printful-tuotteita:", error);
    return null;
  }
}

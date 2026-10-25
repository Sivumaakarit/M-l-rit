// api/get-orders.ts
// Vercel Serverless Function: Hakee Printfulin todelliset tilaukset salaiselle /hallinta-sivulle

export default async function handler(req: any, res: any) {
  // CORS- ja metoditarkistus
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Only GET and POST are supported." });
  }

  try {
    const password = req.query?.password || req.body?.password || req.headers?.authorization?.replace("Bearer ", "");

    if (password !== "Huhtikuu26") {
      return res.status(401).json({ error: "Unauthorized. Virheellinen salasana." });
    }

    const printfulApiKey = process.env.VITE_PRINTFUL_API_KEY || process.env.PRINTFUL_API_KEY;

    if (!printfulApiKey) {
      return res.status(500).json({ error: "PRINTFUL_API_KEY missing in environment variables" });
    }

    const pfResponse = await fetch("https://api.printful.com/orders?limit=100", {
      headers: {
        Authorization: `Bearer ${printfulApiKey}`,
      },
    });

    const pfData = await pfResponse.json();

    if (!pfResponse.ok) {
      console.error("Printful orders fetch error:", pfData);
      return res.status(400).json({ error: "Printful orders fetch failed", details: pfData });
    }

    // Suodatetaan pois vanhat testinäytteet (is_sample: true)
    const rawOrders = pfData?.result || [];
    const realOrders = rawOrders.filter((o: any) => !o.is_sample);

    return res.status(200).json({
      success: true,
      orders: realOrders,
      totalCount: realOrders.length,
    });
  } catch (error: any) {
    console.error("Get orders error:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}

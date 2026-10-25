// api/manual-order.ts
// Vercel Serverless Function: Pikatilaukset (Koon vaihdot, lahjat, kilpailuvoitot & bänditilaukset)
// Lähettää tilauksen suoraan Printfulin tehtaalle ilman Stripe-maksua (veloitus suoraan kauppiaan Printful-tililtä)

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Only POST is supported." });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { password, recipient, sync_variant_id, order_type, product_title, auto_confirm } = body;

    // Turvatarkistus: vaatii ylläpidon salasanan
    if (password !== "Huhtikuu26") {
      return res.status(401).json({ error: "Unauthorized. Virheellinen salasana." });
    }

    if (!recipient?.name || !recipient?.address1 || !recipient?.city || !recipient?.zip) {
      return res.status(400).json({ error: "Vastaanottajan nimi, osoite, postinumero ja kaupunki ovat pakollisia." });
    }

    const printfulApiKey = process.env.VITE_PRINTFUL_API_KEY || process.env.PRINTFUL_API_KEY;

    if (!printfulApiKey) {
      return res.status(500).json({ error: "PRINTFUL_API_KEY missing in environment variables" });
    }

    const itemVariantId = Number(sync_variant_id) || 5567606607; // Oletuksena S-koko (5567606607)
    const orderTitle = product_title || "Mölyapinat Lasten T-paita";
    const orderTag = order_type || "Pikatilaus";

    let cleanZip = String(recipient.zip || "").trim();
    // Poistetaan maakoodi alusta (FI-, FIN-) ja ylimääräiset välilyönnit
    cleanZip = cleanZip.replace(/^(FI|FIN)[ -]?/i, "").replace(/\s+/g, "");
    // Jos suomalainen postinumero on annettu 4-numeroisena (esim. 4200), lisätään etunolla (04200)
    if (/^\d{4}$/.test(cleanZip)) {
      cleanZip = cleanZip.padStart(5, "0");
    }

    const countryCode = (recipient.country_code || "FI").toUpperCase();

    const printfulOrderPayload = {
      recipient: {
        name: recipient.name.trim(),
        address1: recipient.address1.trim(),
        city: recipient.city.trim(),
        zip: cleanZip,
        country_code: countryCode,
        phone: recipient.phone ? String(recipient.phone).trim() : "",
        email: recipient.email ? String(recipient.email).trim() : "jullenmusiikki@gmail.com",
      },
      items: [
        {
          sync_variant_id: itemVariantId,
          quantity: 1,
        },
      ],
      packing_slip: {
        line1: "Mölyapinat",
        line2: `Virallinen fanituote • ${orderTag}`,
        email: "jullenmusiikki@gmail.com",
        phone: "+358505403661",
        message: `Mölyapinat virallinen ${orderTitle} sinulle! Toivottavasti tämä tuo paljon riemua ja vauhtia päivään! Terveisin Mölyapinat 🍌🐒`,
        logo_url: "https://files.cdn.printful.com/files/d6b/d6bf6f12c856565beffec64bce7f106d_preview.png",
      },
      retail_costs: {
        currency: "EUR",
        subtotal: "0.00",
        total: "0.00",
      },
    };

    const autoConfirm = auto_confirm === true;
    const printfulEndpoint = autoConfirm 
      ? "https://api.printful.com/orders?confirm=true" 
      : "https://api.printful.com/orders";

    const printfulResponse = await fetch(printfulEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${printfulApiKey}`,
      },
      body: JSON.stringify(printfulOrderPayload),
    });

    const printfulResult = await printfulResponse.json();

    if (!printfulResponse.ok) {
      console.error("Printful API manual order error:", printfulResult);
      const detailedMessage = 
        printfulResult?.error?.message || 
        (typeof printfulResult?.result === "string" ? printfulResult?.result : null) || 
        "Printful order creation failed";
      return res.status(400).json({ error: detailedMessage, details: printfulResult });
    }

    let finalStatus = printfulResult?.result?.status;

    // Jos autoConfirm on päällä ja tilaus jäisi draft-tilaan, vahvistetaan se
    if (autoConfirm && finalStatus === "draft" && printfulResult?.result?.id) {
      try {
        const confirmResponse = await fetch(`https://api.printful.com/orders/${printfulResult.result.id}/confirm`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${printfulApiKey}`,
          },
        });
        const confirmResult = await confirmResponse.json();
        if (confirmResponse.ok && confirmResult?.result?.status) {
          finalStatus = confirmResult.result.status;
        }
      } catch (confirmErr) {
        console.warn("Printful manual order auto-confirm warning:", confirmErr);
      }
    }

    // Sähköposti-ilmoitus Eskolle (eskomk@gmail.com)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const orderId = printfulResult?.result?.id || "N/A";
        const emailSubject = autoConfirm
          ? `🍌 Pikatilaus lähetetty tehtaalle! (#${orderId})`
          : `🍌 Uusi Pikatilaus luotu luonnoksena Printfuliin (#${orderId})`;

        const emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #2b7a4b; border-radius: 16px; background: #ffffff;">
            <div style="background: #d8f5e5; padding: 16px; border-radius: 12px; text-align: center; margin-bottom: 20px;">
              <h1 style="color: #1e5834; margin: 0; font-size: 24px;">🍌 PIKATILAUS / TESTITILAUS</h1>
              <p style="color: #2b7a4b; margin: 6px 0 0; font-weight: bold;">Tilaus #${orderId} • ${orderTag}</p>
            </div>

            <p style="font-size: 15px; color: #333;">Hallintapaneelista tehtiin pikatilaus:</p>

            <table style="width: 100%; border-collapse: collapse; margin: 16px 0; background: #f9fbf9; border-radius: 8px;">
              <tr><td style="padding: 8px 12px; font-weight: bold;">Vastaanottaja:</td><td style="padding: 8px 12px;">${recipient.name}</td></tr>
              <tr><td style="padding: 8px 12px; font-weight: bold;">Osoite:</td><td style="padding: 8px 12px;">${recipient.address1}, ${recipient.zip} ${recipient.city}</td></tr>
              <tr><td style="padding: 8px 12px; font-weight: bold;">Tuote:</td><td style="padding: 8px 12px; color: #1e5834; font-weight: bold;">${orderTitle}</td></tr>
              <tr><td style="padding: 8px 12px; font-weight: bold;">Tyyppi:</td><td style="padding: 8px 12px;">${orderTag}</td></tr>
              <tr><td style="padding: 8px 12px; font-weight: bold;">Tila Printfulissa:</td><td style="padding: 8px 12px; color: ${autoConfirm ? "#166534" : "#b45309"}; font-weight: bold;">${autoConfirm ? "Vahvistettu tuotantoon" : "Luonnos (Draft) – Voit tarkistaa tai perua"}</td></tr>
            </table>

            ${!autoConfirm ? `
              <div style="background: #fffbeb; border: 2px dashed #f59e0b; border-radius: 12px; padding: 16px; margin: 16px 0; text-align: center;">
                <p style="margin: 0 0 10px; color: #854d0e; font-weight: bold;">Voit nyt tarkistaa tilauksen ja joko vahvistaa tai perua sen Printfulissa:</p>
                <a href="https://www.printful.com/dashboard/default/orders" style="display: inline-block; background: #ff6b00; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 999px; font-weight: bold;" target="_blank">
                  Avaa tilaus Printfulissa &rarr;
                </a>
              </div>
            ` : ""}
          </div>
        `;

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Mölyapinat <onboarding@resend.dev>",
            to: ["eskomk@gmail.com"],
            subject: emailSubject,
            html: emailHtml,
          }),
        });
      } catch (e) {
        console.warn("Admin notification email failed:", e);
      }
    }

    return res.status(200).json({
      success: true,
      orderId: printfulResult?.result?.id,
      status: finalStatus,
      recipient: recipient.name,
      orderType: orderTag,
      autoConfirm,
    });
  } catch (error: any) {
    console.error("Manual order error:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}

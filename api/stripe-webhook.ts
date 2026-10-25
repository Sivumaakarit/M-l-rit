// api/stripe-webhook.ts
// Vercel Serverless Function: Stripe Webhook -> Printful Order Automation
// Vastaanottaa Stripen maksutapahtuman ja lähettää tilauksen automaattisesti Printfulin tehtaalle (Riika, Latvia)

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Only POST is supported." });
  }

  try {
    const event = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    // Varmistetaan että tapahtuma on onnistunut maksu: checkout.session.completed
    if (event?.type !== "checkout.session.completed") {
      return res.status(200).json({ received: true, ignored: true, reason: "Event is not checkout.session.completed" });
    }

    const session = event.data?.object;
    const customerDetails = session?.customer_details;
    const shippingDetails = session?.shipping_details || session?.customer_details;

    // T-paidan oletusvariantit (Printful sync_variant_id):
    const defaultSizeVariantMap: Record<string, number> = {
      XS: 5567606606,
      S: 5567606607,
      M: 5567606608,
      L: 5567606609,
      XL: 5567606610,
    };

    let orderItems: Array<{ sync_variant_id: number; quantity: number }> = [];

    if (session?.metadata?.items) {
      try {
        orderItems = JSON.parse(session.metadata.items);
      } catch (e) {
        console.warn("Could not parse session.metadata.items JSON", e);
      }
    }

    if (!orderItems.length) {
      const directVariantId = session?.metadata?.sync_variant_id ? Number(session.metadata.sync_variant_id) : null;
      const rawRef = session?.client_reference_id || "";

      if (directVariantId) {
        const qty = session?.metadata?.quantity ? Number(session.metadata.quantity) : 1;
        orderItems.push({ sync_variant_id: directVariantId, quantity: qty > 0 ? qty : 1 });
      } else if (rawRef.startsWith("Molyapinat-")) {
        // Purkaa korin tuotteet, esim. "Molyapinat-1xS_2xM" tai "Molyapinat-1xL"
        const itemsStr = rawRef.replace("Molyapinat-", "");
        const parts = itemsStr.split("_");
        for (const part of parts) {
          const match = part.match(/^(\d+)x([A-Za-z0-9]+)$/);
          if (match) {
            const qty = parseInt(match[1], 10) || 1;
            const sizeKey = match[2].toUpperCase();
            const variantId = defaultSizeVariantMap[sizeKey] || 5567606607;
            orderItems.push({ sync_variant_id: variantId, quantity: qty });
          } else if (defaultSizeVariantMap[part.toUpperCase()]) {
            orderItems.push({ sync_variant_id: defaultSizeVariantMap[part.toUpperCase()], quantity: 1 });
          }
        }
      } else if (rawRef.startsWith("Koko-")) {
        const sizeKey = rawRef.replace("Koko-", "").toUpperCase();
        const variantId = defaultSizeVariantMap[sizeKey] || 5567606607;
        orderItems.push({ sync_variant_id: variantId, quantity: 1 });
      } else if (defaultSizeVariantMap[rawRef.toUpperCase()]) {
        orderItems.push({ sync_variant_id: defaultSizeVariantMap[rawRef.toUpperCase()], quantity: 1 });
      } else if (session?.metadata?.size && defaultSizeVariantMap[session.metadata.size.toUpperCase()]) {
        const qty = session?.metadata?.quantity ? Number(session.metadata.quantity) : 1;
        orderItems.push({ sync_variant_id: defaultSizeVariantMap[session.metadata.size.toUpperCase()], quantity: qty > 0 ? qty : 1 });
      }

      // Fallback jos koon määritys puuttuu: oletus S-koko (1 kpl)
      if (!orderItems.length) {
        orderItems = [{ sync_variant_id: 5567606607, quantity: 1 }];
      }
    }

    const printfulApiKey = process.env.VITE_PRINTFUL_API_KEY || process.env.PRINTFUL_API_KEY;

    if (!printfulApiKey) {
      console.error("PRINTFUL_API_KEY puuttuu ympäristömuuttujista!");
      return res.status(500).json({ error: "PRINTFUL_API_KEY missing in environment variables" });
    }

    // Lasketaan dynaamisesti toteutunut myyntihinta Stripen veloituksesta (esim. 2490 senttiä = 24.90 €)
    const totalAmountEur = session?.amount_total ? (session.amount_total / 100).toFixed(2) : "24.90";
    const productTitle = session?.metadata?.product_name || "Mölyapinat-fanituote";

    // Luodaan Printful-tilaus vastaanotetuilla asiakastiedoilla ja brändätyllä lähetyslistalla
    const printfulOrderPayload = {
      recipient: {
        name: shippingDetails?.name || customerDetails?.name || "Mölyapinat Tilaaja",
        address1: shippingDetails?.address?.line1 || "Katuosoite",
        city: shippingDetails?.address?.city || "Helsinki",
        zip: shippingDetails?.address?.postal_code || "00100",
        country_code: shippingDetails?.address?.country || "FI",
        phone: customerDetails?.phone || shippingDetails?.phone || "",
        email: customerDetails?.email || "",
      },
      items: orderItems,
      packing_slip: {
        line1: "Mölyapinat",
        line2: "Virallinen fanikauppa • www.molyapinat.fi",
        email: "jullenmusiikki@gmail.com",
        phone: "+358505403661",
        message: `Kiitos tilauksestasi! Toivottavasti virallinen ${productTitle} tuo paljon iloa ja riemukasta menoa! Terveisin Mölyapinat 🍌🐒`,
        logo_url: "https://files.cdn.printful.com/files/d6b/d6bf6f12c856565beffec64bce7f106d_preview.png",
      },
      retail_costs: {
        currency: "EUR",
        subtotal: totalAmountEur,
        total: totalAmountEur,
      },
    };

    // Tarkistetaan halutaanko tilaus heti tehtaalle vai luonnoksena hyväksyttäväksi
    // Oletus: false (luonnos/draft), jotta Esko voi tarkistaa ja halutessaan perua tilauksen
    const autoConfirm = (process.env.PRINTFUL_AUTO_CONFIRM || process.env.VITE_PRINTFUL_AUTO_CONFIRM) === "true";
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
      console.error("Printful API error:", printfulResult);
      return res.status(400).json({ error: "Printful order creation failed", details: printfulResult });
    }

    let finalStatus = printfulResult?.result?.status;

    // Jos autoConfirm on päällä ja tilaus jäisi silti draft-tilaan, vahvistetaan se heti
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
        console.warn("Printful auto-confirm fallback error:", confirmErr);
      }
    }

    // LÄHETETÄÄN VÄLITÖN SÄHKÖPOSTI-ILMOITUS ESKOLLE (eskomk@gmail.com)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const orderId = printfulResult?.result?.id || "N/A";
        const itemsSummary = orderItems.map((i) => {
          const sizeName = Object.entries(defaultSizeVariantMap).find(([_, id]) => id === i.sync_variant_id)?.[0] || "Tuntematon";
          return `${i.quantity} kpl (Koko: ${sizeName})`;
        }).join(", ");

        const adminSubject = autoConfirm
          ? `🍌 Uusi Mölyapinat-tilaus vastaanotettu & viety tuotantoon! (#${orderId})`
          : `🍌 UUSI TILAUS SAAPUNUT! Muista kuitata Printfulissa (Tilaus #${orderId})`;

        const adminHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #2b7a4b; border-radius: 16px; background: #ffffff;">
            <div style="background: #d8f5e5; padding: 16px; border-radius: 12px; text-align: center; margin-bottom: 20px;">
              <h1 style="color: #1e5834; margin: 0; font-size: 24px;">🍌 UUSI MÖLYAPINAT-TILAUS!</h1>
              <p style="color: #2b7a4b; margin: 6px 0 0; font-weight: bold;">Printful Tilaus #${orderId}</p>
            </div>

            <p style="font-size: 16px; line-height: 1.5; color: #333;">Hei Esko! Verkkokaupasta on juuri tehty uusi tilaus.</p>

            <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: #f9fbf9; border-radius: 8px; overflow: hidden;">
              <tr style="border-bottom: 1px solid #e2e8e0;">
                <td style="padding: 10px 14px; font-weight: bold; color: #555;">Tilaaja:</td>
                <td style="padding: 10px 14px; color: #111;">${shippingDetails?.name || customerDetails?.name || "Asiakas"}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8e0;">
                <td style="padding: 10px 14px; font-weight: bold; color: #555;">Osoite:</td>
                <td style="padding: 10px 14px; color: #111;">${shippingDetails?.address?.line1 || ""}, ${shippingDetails?.address?.postal_code || ""} ${shippingDetails?.address?.city || ""}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8e0;">
                <td style="padding: 10px 14px; font-weight: bold; color: #555;">Tuotteet:</td>
                <td style="padding: 10px 14px; color: #1e5834; font-weight: bold;">${itemsSummary}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8e0;">
                <td style="padding: 10px 14px; font-weight: bold; color: #555;">Maksettu summa:</td>
                <td style="padding: 10px 14px; color: #111; font-weight: bold;">${totalAmountEur} €</td>
              </tr>
              <tr>
                <td style="padding: 10px 14px; font-weight: bold; color: #555;">Tila Printfulissa:</td>
                <td style="padding: 10px 14px; color: ${autoConfirm ? "#166534" : "#b45309"}; font-weight: bold;">
                  ${autoConfirm ? "✅ Vahvistettu suoraan tehtaalle" : "⚠️ Luonnos (Draft) – Vaatii kuittauksen"}
                </td>
              </tr>
            </table>

            ${!autoConfirm ? `
              <div style="background: #fffbeb; border: 2px dashed #f59e0b; border-radius: 12px; padding: 16px; margin: 20px 0; text-align: center;">
                <p style="margin: 0 0 12px; color: #854d0e; font-weight: bold; font-size: 15px;">
                  👉 Tilaus on nyt Printfulissa luonnoksena. Käy tarkistamassa se ja paina "Confirm order" viedäksesi sen painoon (tai "Cancel order" jos tämä oli testi):
                </p>
                <a href="https://www.printful.com/dashboard/default/orders" style="display: inline-block; background: #ff6b00; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 999px; font-weight: bold; font-size: 15px;" target="_blank">
                  Avaa tilaus Printfulissa &rarr;
                </a>
              </div>
            ` : `
              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 14px; margin: 20px 0; color: #166534; font-size: 14px;">
                Tilaus on siirretty automaattisesti tehtaalle työn alle.
              </div>
            `}

            <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee; font-size: 12px; color: #888;">
              Mölyapinat Automaatio • www.molyapinat.fi • Hallintapaneeli: <a href="https://molyapinat.fi/hallinta" style="color: #2b7a4b;">molyapinat.fi/hallinta</a>
            </div>
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
            subject: adminSubject,
            html: adminHtml,
          }),
        });
      } catch (emailErr) {
        console.warn("Could not send admin notification email to eskomk@gmail.com:", emailErr);
      }
    }

    return res.status(200).json({
      success: true,
      stripeEventId: event.id,
      paymentMethodTypes: session?.payment_method_types || [],
      amountTotal: totalAmountEur,
      printfulOrderId: printfulResult?.result?.id,
      status: finalStatus,
      autoConfirm,
    });
  } catch (error: any) {
    console.error("Webhook käsittelyvirhe:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}

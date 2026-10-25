// api/printful-webhook.ts
// Vercel Serverless Function: Printful Webhook -> Resend Sähköpostiautomaatio
// Vastaanottaa Printfulin 'package_shipped' -tapahtuman ja lähettää asiakkaalle suomenkielisen toimitusvahvistuksen seurantakoodilla

export default async function handler(req: any, res: any) {
  // Printful testaa webhook-osoitteen toimivuuden usein GET-pyynnöllä
  if (req.method === "GET") {
    return res.status(200).json({ ok: true, service: "Mölyapinat Printful Webhook ready" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Only POST is supported." });
  }

  try {
    const payload = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const eventType = payload?.type;
    const eventData = payload?.data;

    // Varmistetaan että kyseessä on paketin postitus
    if (eventType !== "package_shipped") {
      return res.status(200).json({
        received: true,
        ignored: true,
        reason: `Ignored event: ${eventType}. Only 'package_shipped' triggers delivery email.`,
      });
    }

    const shipment = eventData?.shipment;
    const order = eventData?.order;

    const recipientEmail = order?.recipient?.email;
    const recipientName = order?.recipient?.name || "Mölyapina-fani";
    const trackingNumber = shipment?.tracking_number;
    const trackingUrl = shipment?.tracking_url || `https://www.posti.fi/fi/seuranta#/lahetys/${trackingNumber}`;

    if (!recipientEmail) {
      console.warn("Printful Webhook: recipient email puuttuu tilauksesta.");
      return res.status(200).json({ received: true, warning: "Recipient email is missing." });
    }

    if (!trackingNumber) {
      console.warn("Printful Webhook: tracking_number puuttuu lähetyksestä.");
      return res.status(200).json({ received: true, warning: "Tracking number is missing." });
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error("RESEND_API_KEY puuttuu ympäristömuuttujista! Sähköpostia ei lähetetty.");
      return res.status(200).json({
        received: true,
        error: "RESEND_API_KEY missing in environment variables. Email could not be sent.",
        trackingNumber,
        recipientEmail,
      });
    }

    // Suora linkki Postin seurantaan
    const postiTrackingUrl = `https://www.posti.fi/fi/seuranta#/lahetys/${encodeURIComponent(trackingNumber)}`;

    // Brändätty, iloinen ja kaikissa sähköpostiohjelmissa (Gmail, Apple Mail, Outlook) toimiva inline-HTML
    const emailHtml = `
<!DOCTYPE html>
<html lang="fi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mölyapinat T-paitasi on matkalla!</title>
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=Quicksand:wght@600;700;800&display=swap");
    .luckiest-heading {
      font-family: "Luckiest Guy", "Arial Black", Impact, -apple-system, sans-serif !important;
      font-style: normal !important;
      font-weight: 900 !important;
    }
  </style>
</head>
<body style="font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #eaf6ef; margin: 0; padding: 24px 12px; color: #2d261e;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 580px; background: #ffffff; border-radius: 28px; overflow: hidden; border: 3px solid #2b7a4b; box-shadow: 0 12px 30px rgba(43, 122, 75, 0.12);">
          
          <!-- Minttuisa Yläpalkki Mölyapinat-apinalogolla ja isolla Luckiest Guy / Arial Black -otsikolla -->
          <tr>
            <td style="background: linear-gradient(180deg, #d8f5e5 0%, #c4edd6 100%); padding: 36px 24px 30px 24px; text-align: center; border-bottom: 2px solid #b2e4c8;">
              <div style="margin-bottom: 16px;">
                <img src="https://molyapinat.fi/logo.png" alt="Mölyapinat Logo" width="100" height="104" style="display: block; margin: 0 auto; width: 100px; height: auto; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.12));" />
              </div>
              <h1 class="luckiest-heading" style="margin: 0; font-family: 'Luckiest Guy', 'Arial Black', Impact, -apple-system, sans-serif; font-style: normal; font-size: 30px; font-weight: 900; color: #1e5834; letter-spacing: 0.5px; line-height: 1.25; text-transform: uppercase;">
                Mölyapinat T-paitasi on matkalla!
              </h1>
              <p style="margin: 10px 0 0; font-family: 'Quicksand', -apple-system, sans-serif; font-size: 15px; font-weight: 700; color: #2d6a43;">Paita on painettu ja luovutettu kuljettajalle 📦</p>
            </td>
          </tr>

          <!-- Sisältöosio -->
          <tr>
            <td style="padding: 36px 28px; line-height: 1.6; font-size: 15px; font-family: 'Quicksand', -apple-system, sans-serif;">
              <p style="margin-top: 0; font-size: 18px; color: #1e5834; font-weight: 700;">Hei <strong>\${recipientName}</strong>! 🍌</p>
              <p>Iloisia uutisia: virallinen <strong>Mölyapinat-bändipaitasi</strong> on nyt valmis ja matkalla kohti kotia! Paita on pakattu huolellisesti ja lähtenyt keskusvarastoltamme.</p>

              <!-- Seurantalaatikko -->
              <div style="background: #fffbeb; border: 2px dashed #f59e0b; border-radius: 20px; padding: 24px 20px; text-align: center; margin: 26px 0;">
                <div style="font-size: 12px; text-transform: uppercase; font-weight: 800; color: #854d0e; letter-spacing: 1.5px;">Lähetyksesi seurantakoodi:</div>
                <div style="font-size: 24px; font-weight: 800; letter-spacing: 3px; color: #b45309; margin: 10px 0; font-family: monospace;">\${trackingNumber}</div>
                <div style="margin-top: 16px;">
                  <a href="\${postiTrackingUrl}" style="display: inline-block; background: #ff6b00; color: #ffffff !important; text-decoration: none; font-weight: 800; font-size: 16px; padding: 14px 30px; border-radius: 999px; box-shadow: 0 4px 14px rgba(255,107,0,0.35); font-family: 'Quicksand', -apple-system, sans-serif;" target="_blank" rel="noopener noreferrer">
                    Seuraa lähetystä Postin sivuilla &rarr;
                  </a>
                </div>
              </div>

              <!-- Ennakkotieto noudosta -->
              <div style="background: #f0fdf4; border-left: 4px solid #2b7a4b; padding: 16px 20px; border-radius: 12px; margin: 24px 0; font-size: 13px; color: #166534; line-height: 1.55;">
                <strong>💡 Tärkeä huomio saapumisilmoituksesta:</strong><br>
                Kun paketti saapuu Suomeen lähipostiisi tai pakettiautomaattiin, saat Postilta saapumisilmoituksen (tekstiviestillä tai sähköpostilla). Kansainvälisen postituksen vuoksi Postin omassa viestissä saattaa lukea teknisesti <em>"Lähtömaa Liettua, nimi ei saatavilla"</em> – kyseessä on juuri tämä odottamasi Mölyapinat-bändipaita!
              </div>

              <p style="margin-top: 24px; font-weight: 600;">Riemukkaita hetkiä ja kovaa mölyä uuden paidan kanssa! Nähdään keikoilla! 🎸🐒</p>
              <p style="margin-bottom: 0;"><strong>Terveisin,</strong><br><span style="font-family: 'Luckiest Guy', 'Arial Black', Impact, sans-serif; font-size: 20px; font-weight: 900; color: #1e5834;">MÖLYAPINAT</span></p>
            </td>
          </tr>

          <!-- Alatunniste -->
          <tr>
            <td style="background: #f6fbf8; border-top: 1px solid #e1efe7; padding: 24px; text-align: center; font-size: 12px; color: #5c6b62; line-height: 1.6; font-family: 'Quicksand', sans-serif;">
              <strong style="color: #1e5834;">Mölyapinat Official</strong> • <a href="https://molyapinat.fi" style="color: #2b7a4b; text-decoration: underline; font-weight: 700;">www.molyapinat.fi</a><br>
              Kysyttävää tilauksesta? Voit vastata suoraan tähän sähköpostiin (vastaukset ohjautuvat osoitteeseen <a href="mailto:jullenmusiikki@gmail.com" style="color: #2b7a4b; text-decoration: underline; font-weight: 700;">jullenmusiikki@gmail.com</a>).
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // Lähetetään sähköposti Resend API:n kautta
    const senderEmail = process.env.RESEND_FROM_EMAIL || "Mölyapinat <onboarding@resend.dev>";

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: senderEmail,
        to: [recipientEmail],
        reply_to: "jullenmusiikki@gmail.com",
        subject: "🍌 Mölyapinat T-paitasi on matkalla! 📦",
        html: emailHtml,
      }),
    });

    const resendResult = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API error:", resendResult);
      return res.status(400).json({ error: "Resend email delivery failed", details: resendResult });
    }

    return res.status(200).json({
      success: true,
      message: "Delivery email sent successfully via Resend",
      emailId: resendResult?.id,
      trackingNumber,
      recipientEmail,
    });
  } catch (error: any) {
    console.error("Printful Webhook error:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}

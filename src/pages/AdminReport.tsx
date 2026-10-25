import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Lock, 
  Unlock, 
  Download, 
  ArrowLeft, 
  CheckCircle2, 
  TrendingUp, 
  Euro, 
  Package, 
  FileText, 
  Sparkles,
  Send,
  Gift,
  RefreshCw,
  User,
  MapPin,
  Mail,
  Phone,
  Tag,
  Loader2,
  ListOrdered
} from "lucide-react";
import { toast } from "sonner";

interface OrderRecord {
  id: string;
  date: string;
  customer: string;
  item: string;
  size: string;
  grossAmount: number;
  vatAmount: number;
  netAmount: number;
  stripeFee: number;
  printfulCost: number;
  netProfit: number;
  paymentMethod: string;
  status: string;
}

interface ManualOrderRecord {
  id: string;
  date: string;
  recipientName: string;
  address: string;
  postalCode: string;
  city: string;
  item: string;
  size: string;
  orderType: string;
  cost: number;
  status: string;
}

// Oletusmyynnit tuotantoon: täysin tyhjä, alkaa nollista
const INITIAL_SALES_ORDERS: OrderRecord[] = [];
const INITIAL_MANUAL_ORDERS: ManualOrderRecord[] = [];

const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL"];
const ORDER_TYPES = [
  "Koon vaihto (Asiakas palauttanut Keravalle)",
  "Lahja / Fanipalkinto",
  "Kilpailuvoitto (Some/Keikka)",
  "Bändijäsenen oma tilaus",
  "Muu promolähetys"
];

export default function AdminReport() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState(false);
  
  // Välilehdet: "sales" (myynnit & kirjanpito) tai "quick_order" (pikatilaukset & lahjat)
  const [activeTab, setActiveTab] = useState<"sales" | "quick_order">("sales");

  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [manualOrders, setManualOrders] = useState<ManualOrderRecord[]>(() => {
    const saved = localStorage.getItem("moly_manual_orders");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.filter((o: any) => o.id !== "MOLY-PIKA-01" && !o.recipientName?.includes("Julle"));
      } catch {
        return [];
      }
    }
    return [];
  });

  // Pikatilauslomakkeen tila
  const [productTitle, setProductTitle] = useState("Mölyapinat Lasten T-paita");
  const [selectedSize, setSelectedSize] = useState("S");
  const [orderType, setOrderType] = useState(ORDER_TYPES[0]);
  const [recipientName, setRecipientName] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [recipientZip, setRecipientZip] = useState("");
  const [recipientCity, setRecipientCity] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [quickOrderAutoConfirm, setQuickOrderAutoConfirm] = useState(true);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  const selectedYear = "2026";

  // Asetetaan noindex-metatagit ja neutraali otsikko
  useEffect(() => {
    document.title = "Mölyapinat Hallinta";
    let metaTag = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    let created = false;
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.name = "robots";
      document.head.appendChild(metaTag);
      created = true;
    }
    const prevContent = metaTag.content;
    metaTag.content = "noindex, nofollow, noarchive";

    return () => {
      if (created && metaTag) {
        document.head.removeChild(metaTag);
      } else if (metaTag) {
        metaTag.content = prevContent;
      }
    };
  }, []);

  // Hakee reaaliaikaiset tilaukset Printful-rajapinnasta
  const fetchLiveOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const res = await fetch("/api/get-orders?password=Huhtikuu26");
      if (res.ok) {
        const data = await res.json();
        if (data?.orders) {
          const mapped: OrderRecord[] = data.orders.map((o: any) => {
            const gross = parseFloat(o.retail_costs?.total || "24.90");
            const vat = parseFloat(((gross * 25.5) / 125.5).toFixed(2));
            const net = parseFloat((gross - vat).toFixed(2));
            const printful = parseFloat(o.costs?.total || "12.60");
            const profit = parseFloat((net - 0.62 - printful).toFixed(2));
            const itemName = o.items?.[0]?.name || "Mölyapinat T-paita";
            const sizePart = itemName.includes("/") ? itemName.split("/")[1].trim() : "S";

            return {
              id: `PF-${o.id}`,
              date: o.created ? new Date(o.created * 1000).toISOString().replace("T", " ").slice(0, 16) : "",
              customer: `${o.recipient?.name || "Asiakas"} (${o.recipient?.city || ""})`,
              item: "Mölyapinat T-paita",
              size: sizePart,
              grossAmount: gross,
              vatAmount: vat,
              netAmount: net,
              stripeFee: 0.62,
              printfulCost: printful,
              netProfit: profit,
              paymentMethod: "Stripe / MobilePay",
              status: o.status === "fulfilled" ? "Toimitettu" : o.status === "draft" ? "Luonnos" : "Valmistuksessa",
            };
          });
          setOrders(mapped);
        }
      }
    } catch (err) {
      console.warn("Could not fetch live orders:", err);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  // Tarkistetaan onko käyttäjä jo kirjautunut tällä istunnolla ja siivotaan vanhat esimerkkidatat
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("moly_admin_authenticated");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
      fetchLiveOrders();
    }

    // Puhdistetaan vanhat mallitilaukset localStoragesta
    const savedManual = localStorage.getItem("moly_manual_orders");
    if (savedManual) {
      try {
        const parsed = JSON.parse(savedManual);
        const cleaned = parsed.filter((o: any) => o.id !== "MOLY-PIKA-01" && !o.recipientName?.includes("Julle"));
        if (cleaned.length !== parsed.length) {
          localStorage.setItem("moly_manual_orders", JSON.stringify(cleaned));
          setManualOrders(cleaned);
        }
      } catch (e) {}
    }
  }, []);

  // Tallennetaan manuaaliset tilaukset localStorageen
  useEffect(() => {
    localStorage.setItem("moly_manual_orders", JSON.stringify(manualOrders));
  }, [manualOrders]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "Huhtikuu26") {
      setIsAuthenticated(true);
      setAuthError(false);
      sessionStorage.setItem("moly_admin_authenticated", "true");
      fetchLiveOrders();
      toast.success("Kirjauduttu sisään onnistuneesti!", {
        description: "Tervetuloa Mölyapinoiden hallintaan.",
      });
    } else {
      setAuthError(true);
      toast.error("Väärä salasana!", {
        description: "Tarkista salasana ja yritä uudelleen.",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("moly_admin_authenticated");
    setPasswordInput("");
    toast.info("Kirjauduttu ulos");
  };

  // Pikatilauksen lähetys
  const handleQuickOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipientName.trim() || !recipientAddress.trim() || !recipientZip.trim() || !recipientCity.trim()) {
      toast.error("Täytä pakolliset kentät!", {
        description: "Nimi, katuosoite, postinumero ja kaupunki vaaditaan.",
      });
      return;
    }

    setIsSubmittingOrder(true);

    try {
      // Lähetetään tilaus serverless funktiolle api/manual-order.ts
      const response = await fetch("/api/manual-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: "Huhtikuu26",
          recipient: {
            name: recipientName.trim(),
            address1: recipientAddress.trim(),
            zip: recipientZip.trim(),
            city: recipientCity.trim(),
            country_code: "FI",
            phone: recipientPhone.trim(),
            email: recipientEmail.trim() || "jullenmusiikki@gmail.com",
          },
          sync_variant_id: selectedSize === "XS" ? 5567606606 : selectedSize === "S" ? 5567606607 : selectedSize === "M" ? 5567606608 : selectedSize === "L" ? 5567606609 : 5567606610,
          order_type: orderType,
          product_title: productTitle,
          auto_confirm: quickOrderAutoConfirm,
        }),
      });

      const resData = await response.json();

      const newOrderRecord: ManualOrderRecord = {
        id: resData?.orderId ? `PF-${resData.orderId}` : `PIKA-${Date.now().toString().slice(-4)}`,
        date: new Date().toISOString().replace("T", " ").slice(0, 16),
        recipientName: recipientName.trim(),
        address: recipientAddress.trim(),
        postalCode: recipientZip.trim(),
        city: recipientCity.trim(),
        item: productTitle,
        size: selectedSize,
        orderType: orderType,
        cost: 12.60,
        status: resData?.status === "draft" ? "Luonnos (Draft)" : resData?.status || "Vahvistettu",
      };

      setManualOrders([newOrderRecord, ...manualOrders]);

      if (quickOrderAutoConfirm) {
        toast.success("Pikatilaus lähetetty suoraan tuotantoon!", {
          description: `Paita koossa ${selectedSize} laitettu valmistukseen vastaanottajalle ${recipientName}. Sähköposti lähetetty myös osoitteeseen eskomk@gmail.com.`,
        });
      } else {
        toast.success("Pikatilaus luotu luonnoksena Printfuliin!", {
          description: `Tilaus #${resData?.orderId || ""} on nyt Printfulissa luonnoksena. Voit tarkistaa tai perua sen Printfulin hallinnasta. Ilmoitus lähetetty sähköpostiisi (eskomk@gmail.com).`,
        });
      }

      // Tyhjennetään lomake
      setRecipientName("");
      setRecipientAddress("");
      setRecipientZip("");
      setRecipientCity("");
      setRecipientPhone("");
      setRecipientEmail("");
    } catch (err: any) {
      console.warn("Pikatilaus lokaalitilassa tallennettu paikallisesti:", err);
      // Lokaalitestitilassa luodaan silti tallenne
      const newOrderRecord: ManualOrderRecord = {
        id: `PIKA-${Date.now().toString().slice(-4)}`,
        date: new Date().toISOString().replace("T", " ").slice(0, 16),
        recipientName: recipientName.trim(),
        address: recipientAddress.trim(),
        postalCode: recipientZip.trim(),
        city: recipientCity.trim(),
        item: productTitle,
        size: selectedSize,
        orderType: orderType,
        cost: 12.60,
        status: "Testitilaus (Lokaali)",
      };
      setManualOrders([newOrderRecord, ...manualOrders]);
      toast.success("Pikatilaus kirjattu (Testitila)!", {
        description: `Paita koossa ${selectedSize} kirjattu vastaanottajalle ${recipientName}.`,
      });
      setRecipientName("");
      setRecipientAddress("");
      setRecipientZip("");
      setRecipientCity("");
      setRecipientPhone("");
      setRecipientEmail("");
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  // Lasketaan virallisen myynnin summat
  const totalGross = orders.reduce((acc, curr) => acc + curr.grossAmount, 0);
  const totalVat = orders.reduce((acc, curr) => acc + curr.vatAmount, 0);
  const totalNet = orders.reduce((acc, curr) => acc + curr.netAmount, 0);
  const totalStripeFees = orders.reduce((acc, curr) => acc + curr.stripeFee, 0);
  const totalPrintfulCosts = orders.reduce((acc, curr) => acc + curr.printfulCost, 0);
  const totalProfit = orders.reduce((acc, curr) => acc + curr.netProfit, 0);

  // Lasketaan pikatilausten kulut (vähennyskelpoiset promo/hävikkikulut)
  const totalManualCosts = manualOrders.reduce((acc, curr) => acc + curr.cost, 0);

  // CSV-tiedoston luonti ja lataus
  const exportToCSV = () => {
    const headers = [
      "Tilaus-ID",
      "Päivämäärä",
      "Asiakas / Kohde",
      "Tuote",
      "Koko",
      "Maksutapa",
      "Myynti brutto (EUR sis. ALV 25.5%)",
      "Myynnin ALV 25.5% (EUR)",
      "Myynti netto (EUR)",
      "Stripe kulut (EUR)",
      "Printful tuotanto+rahti (EUR)",
      "Puhdas liikevoitto (EUR)",
      "Tila"
    ];

    const rows = orders.map((o) => [
      o.id,
      o.date,
      `"${o.customer}"`,
      `"${o.item}"`,
      o.size,
      `"${o.paymentMethod}"`,
      o.grossAmount.toFixed(2).replace(".", ","),
      o.vatAmount.toFixed(2).replace(".", ","),
      o.netAmount.toFixed(2).replace(".", ","),
      o.stripeFee.toFixed(2).replace(".", ","),
      o.printfulCost.toFixed(2).replace(".", ","),
      o.netProfit.toFixed(2).replace(".", ","),
      o.status
    ]);

    const summaryRows = [
      [],
      ["--- YHTEENVETO VEROTTAJALLE & KIRJANPITOON ---"],
      ["Koko verollinen myynti (EUR)", totalGross.toFixed(2).replace(".", ",")],
      ["Tilitettävä ALV 25.5% (EUR)", totalVat.toFixed(2).replace(".", ",")],
      ["Veroton liikevaihto (EUR)", totalNet.toFixed(2).replace(".", ",")],
      ["Vähennettävät myyntikulut (Stripe + Printful)", (totalStripeFees + totalPrintfulCosts).toFixed(2).replace(".", ",")],
      ["Verotettava liiketulos / Voitto (EUR)", totalProfit.toFixed(2).replace(".", ",")],
      [],
      ["--- ERILLINEN PIKATILAUSTEN JA LAHJOJEN KULUERITTELY (EI MYYNTIÄ) ---"],
      ["Pikatilaukset kpl", manualOrders.length],
      ["Pikatilausten vähennyskelpoiset kulut yhteensä (EUR)", totalManualCosts.toFixed(2).replace(".", ",")]
    ];

    const csvContent = "\uFEFF" + [headers.join(";"), ...rows.map(r => r.join(";")), ...summaryRows.map(r => r.join(";"))].join("\r\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Molyapinat_Kirjanpitoraportti_${selectedYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Raportti ladattu!", {
      description: `Tiedosto Molyapinat_Kirjanpitoraportti_${selectedYear}.csv tallennettu koneellesi.`,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 selection:bg-amber-400 selection:text-slate-900">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500" />
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-amber-400/10 border border-amber-400/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-amber-400 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Mölyapinat Hallinta</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Ylläpidon salasana
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setAuthError(false);
                }}
                placeholder="Kirjoita salasana..."
                className={`w-full px-4 py-3 bg-slate-950 border ${
                  authError ? "border-rose-500 ring-2 ring-rose-500/20" : "border-slate-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                } rounded-xl text-white placeholder-slate-500 outline-none transition-all duration-200 text-sm`}
                autoFocus
              />
              {authError && (
                <p className="text-xs text-rose-400 mt-2 font-medium">
                  Väärä salasana. Yritä uudelleen.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-400/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Unlock className="w-4 h-4" />
              Avaa hallintapaneeli
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Palaa takaisin etusivulle
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans selection:bg-amber-400 selection:text-slate-900">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Yläpalkki */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🍌🐒</span>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                Mölyapinat Hallinta
              </h1>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Veroton liikevaihto, tilitettävä ALV ja omat pikatilaukset
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-semibold text-slate-300 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Takaisin kauppaan
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/50 text-rose-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Kirjaudu ulos
            </button>
          </div>
        </div>

        {/* Päävälilehdet: Myynnit vs. Pikatilaus */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab("sales")}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "sales"
                ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20"
                : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            📊 Verkkokaupan Myynnit & Kirjanpito
          </button>

          <button
            onClick={() => setActiveTab("quick_order")}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "quick_order"
                ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20"
                : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Send className="w-4 h-4" />
            ⚡ Uusi Pikatilaus (Vaihdot, lahjat & bändi)
          </button>
        </div>

        {/* ======================================================== */}
        {/* VÄLILEHTI 1: VERKKOKAUPAN MYYNNIT & KIRJANPITO           */}
        {/* ======================================================== */}
        {activeTab === "sales" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* ALV 0% status banneri */}
            <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-emerald-200">
                    EU ALV 0 % (Käännetty verovelvollisuus) Aktivoituna
                  </p>
                  <p className="text-xs text-emerald-300/80">
                    Y-tunnus: 3631144-1 (Sivumaakarit). Printful ja Stripe laskuttavat palvelunsa 0 % arvonlisäverolla.
                  </p>
                </div>
              </div>
              <button
                onClick={exportToCSV}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-400/20 transition-all shrink-0 cursor-pointer active:scale-95"
              >
                <Download className="w-4 h-4" />
                Lataa Excel / CSV
              </button>
            </div>

            {/* Avainlukukortit (KPI) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
                <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center justify-between">
                  Verollinen myynti
                  <Euro className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-white">{totalGross.toFixed(2)} €</div>
                <p className="text-xs text-slate-500 mt-1">Sisältää 25,5 % arvonlisäveron</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
                <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center justify-between">
                  Myynnin ALV 25,5 %
                  <FileText className="w-4 h-4 text-orange-400" />
                </div>
                <div className="text-2xl font-black text-orange-400">{totalVat.toFixed(2)} €</div>
                <p className="text-xs text-slate-500 mt-1">Tilitetään Verohallinnolle (OmaVero)</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
                <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center justify-between">
                  Tuotanto- ja maksukulut
                  <Package className="w-4 h-4 text-rose-400" />
                </div>
                <div className="text-2xl font-black text-rose-300">
                  {(totalStripeFees + totalPrintfulCosts).toFixed(2)} €
                </div>
                <p className="text-xs text-slate-500 mt-1">Printful {totalPrintfulCosts.toFixed(2)} € + Stripe {totalStripeFees.toFixed(2)} €</p>
              </div>

              <div className="bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border border-amber-400/30 rounded-2xl p-5 relative overflow-hidden shadow-lg">
                <div className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center justify-between">
                  Puhdas Liikevoitto
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-black text-amber-300">+{totalProfit.toFixed(2)} €</div>
                <p className="text-xs text-amber-400/80 mt-1 font-medium">Kate 33,4 % (6,62 € / paita)</p>
              </div>
            </div>

            {/* Verottajan apuri (Mitä syötät OmaVeroon & Lomakkeelle 5) */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white">
                  Veroilmoitusapuri (Kevät 2027)
                </h2>
              </div>
              <p className="text-slate-400 text-sm mb-6">
                Kun teet veroilmoitusta ensi vuonna, voit syöttää nämä valmiiksi lasketut luvut suoraan Verohallinnon kenttiin:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h3 className="text-sm font-bold text-amber-400 mb-3 flex items-center gap-2">
                    🏛️ OmaVero (Arvonlisäveroilmoitus 2026)
                  </h3>
                  <ul className="text-xs space-y-2 text-slate-300">
                    <li className="flex justify-between pb-1 border-b border-slate-900">
                      <span>Vero kotimaan myynneistä (25,5 %):</span>
                      <span className="font-bold text-white">{totalVat.toFixed(2)} €</span>
                    </li>
                    <li className="flex justify-between pb-1 border-b border-slate-900">
                      <span>Palveluostot muista EU-maista (Stripe):</span>
                      <span className="font-bold text-white">{totalStripeFees.toFixed(2)} €</span>
                    </li>
                    <li className="flex justify-between pb-1 border-b border-slate-900">
                      <span>Tavaraostot muista EU-maista (Printful):</span>
                      <span className="font-bold text-white">{totalPrintfulCosts.toFixed(2)} €</span>
                    </li>
                    <li className="flex justify-between pt-1 text-emerald-400 font-bold">
                      <span>Maksettava ALV yhteensä:</span>
                      <span>{totalVat.toFixed(2)} €</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h3 className="text-sm font-bold text-amber-400 mb-3 flex items-center gap-2">
                    📋 Lomake 5 (Elinkeinotoiminnan veroilmoitus)
                  </h3>
                  <ul className="text-xs space-y-2 text-slate-300">
                    <li className="flex justify-between pb-1 border-b border-slate-900">
                      <span>Veroton liikevaihto:</span>
                      <span className="font-bold text-white">{totalNet.toFixed(2)} €</span>
                    </li>
                    <li className="flex justify-between pb-1 border-b border-slate-900">
                      <span>Aine- ja tarvikeostot (Printful):</span>
                      <span className="font-bold text-white">{totalPrintfulCosts.toFixed(2)} €</span>
                    </li>
                    <li className="flex justify-between pb-1 border-b border-slate-900">
                      <span>Muut liiketoiminnan kulut (Stripe):</span>
                      <span className="font-bold text-white">{totalStripeFees.toFixed(2)} €</span>
                    </li>
                    <li className="flex justify-between pt-1 text-emerald-400 font-bold">
                      <span>Tilikauden verotettava voitto:</span>
                      <span>+{totalProfit.toFixed(2)} €</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Myyntitilausten taulukko */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-white">Toteutuneet verkkokauppamyynnit</h2>
                  <p className="text-xs text-slate-400">Asiakastilaukset Stripe-kassan kautta</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={fetchLiveOrders}
                    disabled={isLoadingOrders}
                    className="p-1.5 rounded-lg bg-slate-950 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer disabled:opacity-50"
                    title="Päivitä tilaukset Printfulista"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingOrders ? "animate-spin text-amber-400" : ""}`} />
                  </button>
                  <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                    {orders.length} myyntiä kirjattu
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Tilaus</th>
                      <th className="py-3 px-4">Pvm</th>
                      <th className="py-3 px-4">Tuote & Koko</th>
                      <th className="py-3 px-4">Maksutapa</th>
                      <th className="py-3 px-4">Myynti (sis. ALV)</th>
                      <th className="py-3 px-4">Kulut</th>
                      <th className="py-3 px-4 text-right">Voitto</th>
                      <th className="py-3 px-4">Tila</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-500 text-xs">
                          {isLoadingOrders ? "Haetaan tilauksia Printfulista..." : "Ei vielä myyntejä. Uudet verkkokaupan tilaukset kirjautuvat tähän reaaliajassa! 🍌"}
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-white">{order.id}</td>
                          <td className="py-3.5 px-4 text-slate-400">{order.date}</td>
                          <td className="py-3.5 px-4 font-medium text-white">
                            {order.item} <span className="text-amber-400 font-bold ml-1">({order.size})</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                              {order.paymentMethod}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-white">
                            {order.grossAmount.toFixed(2)} €
                          </td>
                          <td className="py-3.5 px-4 text-rose-300">
                            -{(order.stripeFee + order.printfulCost).toFixed(2)} €
                          </td>
                          <td className="py-3.5 px-4 font-bold text-emerald-400 text-right">
                            +{order.netProfit.toFixed(2)} €
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/50">
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VÄLILEHTI 2: PIKATILAUS (VAIHDOT, LAHJAT & BÄNDITILAUKSET) */}
        {/* ======================================================== */}
        {activeTab === "quick_order" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Tärkeä vero- ja kirjanpito-ohje pikatilauksille */}
            <div className="bg-amber-950/25 border border-amber-800/40 rounded-2xl p-4.5 flex items-start gap-3">
              <Gift className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-200/90 leading-relaxed">
                <strong className="text-amber-300 block text-sm mb-1 font-bold">
                  Miten pikatilaus toimii ja miksi se ei sotke myyntiveroja:
                </strong>
                Pikatilaukset lähetetään suoraan Printfulin tehtaalle ilman Stripe-maksua. Printful veloittaa tuotannon ja postituksen (n. 12,60 € ALV 0 %) suoraan yrityksesi Printful-tililtä. 
                Koska kyseessä ei ole asiakasmyynti, <strong>näistä ei kerry myynnin ALV:ia</strong>. Ne kirjataan kirjanpitoon yrityksesi vähennyskelpoisiksi ostoiksi / promokuluiksi.
              </div>
            </div>

            {/* Pikatilauslomake */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <Send className="w-5 h-5 text-amber-400" />
                    Tilaa tuote suoraan tehtaalta
                  </h2>
                  <p className="text-slate-400 text-xs mt-1">
                    Koon vaihdot Keravalle palautetuista, lahjat kavereille, kilpailupalkinnot tai bändin omat paidat
                  </p>
                </div>
                <span className="hidden sm:inline-block bg-slate-950 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-xl border border-amber-400/20">
                  Omakustanne n. 12,60 € (ALV 0%)
                </span>
              </div>

              <form onSubmit={handleQuickOrderSubmit} className="space-y-6">
                
                {/* Ylärivi: Tuote, Tilaustyyppi ja Koko */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Tuotevalinta (Valmius tuleville tuotteille) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-amber-400" />
                      Tuote
                    </label>
                    <select
                      value={productTitle}
                      onChange={(e) => setProductTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs sm:text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    >
                      <option value="Mölyapinat Lasten T-paita">Mölyapinat Lasten T-paita (Valkoinen)</option>
                      <option value="Mölyapinat Pipo" disabled>Mölyapinat Pipo (Tulossa)</option>
                      <option value="Mölyapinat Lippis" disabled>Mölyapinat Lippis (Tulossa)</option>
                    </select>
                  </div>

                  {/* Tilaustyyppi */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                      Tilaustyyppi / Syy
                    </label>
                    <select
                      value={orderType}
                      onChange={(e) => setOrderType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs sm:text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    >
                      {ORDER_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  {/* Koko-pillerit */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Valitse koko
                    </label>
                    <div className="grid grid-cols-5 gap-1.5">
                      {AVAILABLE_SIZES.map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                            selectedSize === sz
                              ? "bg-amber-400 text-slate-950 border-amber-400 shadow-sm"
                              : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-600"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Vastaanottajan toimitusosoite */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    Vastaanottajan Toimitusosoite (Suomi)
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Vastaanottajan Nimi *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                          placeholder="Etunimi Sukunimi"
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs sm:text-sm outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Katuosoite *
                      </label>
                      <input
                        type="text"
                        required
                        value={recipientAddress}
                        onChange={(e) => setRecipientAddress(e.target.value)}
                        placeholder="Esim. Keskuskatu 4 B 2"
                        className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs sm:text-sm outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          Postinumero *
                        </label>
                        <input
                          type="text"
                          required
                          value={recipientZip}
                          onChange={(e) => setRecipientZip(e.target.value)}
                          placeholder="04200"
                          className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs sm:text-sm outline-none focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          Kaupunki *
                        </label>
                        <input
                          type="text"
                          required
                          value={recipientCity}
                          onChange={(e) => setRecipientCity(e.target.value)}
                          placeholder="Kerava"
                          className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs sm:text-sm outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          Puhelinnumero (Postin SMS)
                        </label>
                        <div className="relative">
                          <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-3 pointer-events-none" />
                          <input
                            type="tel"
                            value={recipientPhone}
                            onChange={(e) => setRecipientPhone(e.target.value)}
                            placeholder="040 1234567"
                            className="w-full pl-8 pr-2 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs sm:text-sm outline-none focus:border-amber-400"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          Sähköposti (Seurantaviesti)
                        </label>
                        <div className="relative">
                          <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-3 pointer-events-none" />
                          <input
                            type="email"
                            value={recipientEmail}
                            onChange={(e) => setRecipientEmail(e.target.value)}
                            placeholder="fani@gmail.com"
                            className="w-full pl-8 pr-2 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs sm:text-sm outline-none focus:border-amber-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tilaustapa: Luonnos (Draft / Tarkistus & Perumismahdollisuus) vs Suora tehtaalle */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={quickOrderAutoConfirm}
                      onChange={(e) => setQuickOrderAutoConfirm(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-amber-400 bg-slate-900 cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-200">
                          Vahvista tilaus heti tuotantoon (Auto-confirm)
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          quickOrderAutoConfirm 
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800" 
                            : "bg-amber-950 text-amber-400 border border-amber-800"
                        }`}>
                          {quickOrderAutoConfirm ? "Tehdastuotanto" : "Suositus testeihin: Luonnos (Draft)"}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {quickOrderAutoConfirm
                          ? "⚡ Tilaus siirtyy suoraan Riian tehtaalle painettavaksi ja toimitettavaksi (veloitus menee Printful-laskutuksesta)."
                          : "🛡️ Tilaus luodaan Printfuliin luonnoksena. Saat sähköpostiin (eskomk@gmail.com) vahvistuslinkin, josta voit tarkistaa tilauksen ja joko kuitata sen tai perua ilman kuluja."}
                      </p>
                    </div>
                  </label>
                </div>

                {/* Lähetyspainike */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    Pakettiin tulostuu virallinen Mölyapinat-apinalogo ja tervehdys.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmittingOrder}
                    className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-400/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    {isSubmittingOrder ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Lähetetään tehtaalle...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {quickOrderAutoConfirm ? "Lähetä suoraan tuotantoon ➔" : "Luo luonnostilaus Printfuliin ➔"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Lähetettyjen pikatilausten loki */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <ListOrdered className="w-4 h-4 text-amber-400" />
                    Lähetetyt pikatilaukset & lahjat
                  </h2>
                  <p className="text-xs text-slate-400">
                    Omat tilaukset (Koon vaihdot, kilpailuvoitot ja bänditilaukset)
                  </p>
                </div>
                <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                  {manualOrders.length} tilausta
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Tunnus</th>
                      <th className="py-3 px-4">Pvm</th>
                      <th className="py-3 px-4">Vastaanottaja & Osoite</th>
                      <th className="py-3 px-4">Koko</th>
                      <th className="py-3 px-4">Tyyppi / Syy</th>
                      <th className="py-3 px-4">Omakustanne</th>
                      <th className="py-3 px-4">Tila</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {manualOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-500 text-xs">
                          Ei vielä pikatilauksia. Tekemäsi bänditilaukset ja lahjat näkyvät tässä! 📦
                        </td>
                      </tr>
                    ) : (
                      manualOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-white">{ord.id}</td>
                          <td className="py-3 px-4 text-slate-400">{ord.date}</td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-white">{ord.recipientName}</div>
                            <div className="text-[11px] text-slate-400">{ord.address}, {ord.postalCode} {ord.city}</div>
                          </td>
                          <td className="py-3 px-4 font-bold text-amber-400">{ord.size}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 text-[11px] font-medium">
                              {ord.orderType}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-400 font-medium">
                            {ord.cost.toFixed(2)} €
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-950 text-amber-300 border border-amber-800/50">
                              {ord.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

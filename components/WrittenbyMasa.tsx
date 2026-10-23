"use client";

import { useEffect, useState } from "react";
import { MOR, SUNUCU, ANAHTAR } from "@/components/WrittenbySanatci";

/* writtenby. masası: sanatçı başvurularını okuma ve karar verme. Yalnız Berkay için.
   Anahtar bağlantının # kısmında gelir (sunucuya gitmez), bu tarayıcıda saklanır.
   Sunucu anahtarın yalnız sha256 özetini bilir (basvurulari_oku / basvuru_karar). */

type Basvuru = {
  id: string; olusturma: string; ad: string; eposta: string; sehir: string | null; alan: string;
  baglanti: string | null; mektup: string; eser_baslik: string | null; eser: string;
  izin_site: boolean; izin_kitap: boolean; durum: "bekliyor" | "kabul" | "ret";
};

const FILTRELER = [["bekliyor", "Bekleyenler"], ["kabul", "Kabul"], ["ret", "Ret"], ["hepsi", "Hepsi"]] as const;
const DURUM_AD = { bekliyor: "Bekliyor", kabul: "Kabul edildi", ret: "Reddedildi" };

const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" };
const serif: React.CSSProperties = { fontFamily: "var(--font-serif, Georgia), Georgia, serif" };
const kart: React.CSSProperties = { background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "20px", backdropFilter: "blur(12px)" };
const dugme: React.CSSProperties = { padding: "0.6rem 1.2rem", borderRadius: "999px", border: "1px solid var(--glass-border)", background: "transparent", color: "inherit", font: "inherit", cursor: "pointer" };

async function cagir<T>(fn: string, govde: object): Promise<T> {
  const r = await fetch(`${SUNUCU}/rest/v1/rpc/${fn}`, {
    method: "POST", headers: { apikey: ANAHTAR, "Content-Type": "application/json" }, body: JSON.stringify(govde),
  });
  if (!r.ok) throw new Error((await r.json().catch(() => null))?.message ?? "hata");
  return (r.status === 204 ? null : await r.json()) as T;
}

function okunur(t: string) {
  return new Date(t).toLocaleString("tr-TR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

/** Anahtar önce bağlantının # kısmından, yoksa bu tarayıcının hafızasından okunur. */
function anahtarOku(): string {
  let k = window.location.hash.slice(1);
  try {
    if (k) { localStorage.setItem("wb-masa", k); history.replaceState(null, "", window.location.pathname); }
    else k = localStorage.getItem("wb-masa") ?? "";
  } catch { /* gizli pencere: yalnız bu oturum */ }
  return k;
}

export function WrittenbyMasa() {
  const [anahtar, setAnahtar] = useState<string | null>(null);
  const [filtre, setFiltre] = useState<(typeof FILTRELER)[number][0]>("bekliyor");
  const [surum, setSurum] = useState(0);
  const [liste, setListe] = useState<Basvuru[] | null>(null);
  const [hata, setHata] = useState<string | null>(null);

  useEffect(() => {
    let iptal = false;
    const k = anahtarOku();
    (async () => {
      if (!k) { setAnahtar(""); return; }
      try {
        const l = await cagir<Basvuru[]>("basvurulari_oku", { anahtar: k, filtre });
        if (!iptal) { setAnahtar(k); setListe(l); setHata(null); }
      } catch (e) {
        if (!iptal) { setAnahtar(k); setListe(null); setHata((e as Error).message === "yetki" ? "Anahtar geçersiz. Masa bağlantısını yeniden aç." : "Başvurular yüklenemedi."); }
      }
    })();
    return () => { iptal = true; };
  }, [filtre, surum]);

  async function karar(id: string, k: Basvuru["durum"]) {
    try { await cagir("basvuru_karar", { anahtar, basvuru: id, karar: k }); setSurum((s) => s + 1); }
    catch { setHata("Karar kaydedilemedi."); }
  }

  return (
    <main style={{ maxWidth: "860px", margin: "0 auto", padding: "clamp(3rem, 8vh, 5rem) clamp(1.25rem, 5vw, 3rem)" }}>
      <p style={{ ...mono, color: MOR }}>writtenby. · masa</p>
      <h1 style={{ ...serif, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(2rem, 6vw, 3rem)", marginTop: "0.6rem" }}>Sanatçı mektupları</h1>

      {anahtar === "" ? (
        <p style={{ marginTop: "2rem", lineHeight: 1.6, opacity: 0.8 }}>Bu masa yalnızca anahtarlı bağlantıyla açılır.</p>
      ) : (
        <>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1.6rem" }}>
            {FILTRELER.map(([k, ad]) => (
              <button key={k} onClick={() => setFiltre(k)}
                style={{ ...dugme, background: filtre === k ? MOR : "transparent", color: filtre === k ? "#fff" : "inherit", borderColor: filtre === k ? MOR : undefined }}>{ad}</button>
            ))}
          </div>

          {hata && <p role="alert" style={{ color: "#ff6b5b", marginTop: "1.4rem" }}>{hata}</p>}
          {liste && liste.length === 0 && <p style={{ marginTop: "2rem", opacity: 0.7 }}>Burada henüz mektup yok.</p>}

          <div style={{ display: "grid", gap: "1.2rem", marginTop: "1.6rem" }}>
            {liste?.map((b) => (
              <article key={b.id} style={{ ...kart, padding: "clamp(1.3rem, 4vw, 2rem)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", alignItems: "baseline" }}>
                  <h2 style={{ ...serif, fontSize: "1.6rem", fontWeight: 600 }}>{b.ad}</h2>
                  <span style={{ ...mono, color: b.durum === "kabul" ? MOR : undefined, opacity: b.durum === "kabul" ? 1 : 0.6 }}>{DURUM_AD[b.durum]}</span>
                </div>
                <p style={{ marginTop: "0.4rem", opacity: 0.75, lineHeight: 1.6 }}>
                  {b.alan}{b.sehir ? ` · ${b.sehir}` : ""} · {okunur(b.olusturma)}<br />
                  <a href={`mailto:${b.eposta}`} style={{ color: MOR }}>{b.eposta}</a>
                  {b.baglanti && <> · <a href={b.baglanti} target="_blank" rel="noopener noreferrer" style={{ color: MOR }}>bağlantı ↗</a></>}
                </p>

                <p style={{ ...mono, opacity: 0.55, marginTop: "1.4rem" }}>Mektup</p>
                <p style={{ ...serif, fontSize: "1.1rem", lineHeight: 1.7, marginTop: "0.5rem", whiteSpace: "pre-wrap" }}>{b.mektup}</p>

                <p style={{ ...mono, opacity: 0.55, marginTop: "1.4rem" }}>Eser{b.eser_baslik ? ` · ${b.eser_baslik}` : ""}</p>
                <p style={{ ...serif, fontSize: "1.1rem", lineHeight: 1.7, marginTop: "0.5rem", whiteSpace: "pre-wrap" }}>{b.eser}</p>

                <p style={{ marginTop: "1.2rem", fontSize: "0.92rem", opacity: 0.7 }}>
                  Sitede yayın izni: {b.izin_site ? "var" : "yok"} · Kitapta basım izni: {b.izin_kitap ? "var" : "yok"}
                </p>

                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1.2rem" }}>
                  {b.durum !== "kabul" && <button onClick={() => karar(b.id, "kabul")} style={{ ...dugme, background: MOR, borderColor: MOR, color: "#fff" }}>Kabul et</button>}
                  {b.durum !== "ret" && <button onClick={() => karar(b.id, "ret")} style={dugme}>Reddet</button>}
                  {b.durum !== "bekliyor" && <button onClick={() => karar(b.id, "bekliyor")} style={{ ...dugme, opacity: 0.7 }}>Beklemeye al</button>}
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </main>
  );
}

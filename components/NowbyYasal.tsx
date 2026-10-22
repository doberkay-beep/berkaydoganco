import Link from "next/link";

/* nowby. — uygulamanın gizlilik sayfası için iskelet (HerebySayfa'nın kardeşi).
   App Store bu sayfaya bağlantı verir. */

const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" };

export function NowbyYasal({ baslik, guncelleme, children, en = false }: { baslik: string; guncelleme: string; children: React.ReactNode; en?: boolean }) {
  return (
    <main lang={en ? "en" : "tr"} style={{ maxWidth: "760px", margin: "0 auto", padding: "clamp(3rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3.25rem) 6rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(2.5rem, 7vh, 4rem)", flexWrap: "wrap", gap: "1rem" }}>
        <Link href={en ? "/en/nowby" : "/nowby"} style={{ fontFamily: "var(--font-serif, Georgia), Georgia, serif", fontSize: "1.6rem", color: "var(--ink)" }}>
          nowby<span style={{ color: "#FF6A3D" }}>.</span>
        </Link>
        <nav style={{ display: "flex", gap: "1.2rem", ...mono, color: "var(--muted)" }}>
          <Link href={en ? "/nowby/gizlilik" : "/en/nowby/privacy"} lang={en ? "tr" : "en"}>{en ? "Türkçe" : "English"}</Link>
        </nav>
      </div>
      <div style={{ ...mono, color: "#FF6A3D", marginBottom: "0.8rem" }}>nowby.</div>
      <h1 className="cg-serif" style={{ fontSize: "clamp(2.2rem, 6vw, 3.4rem)", lineHeight: 1.05, margin: "0 0 1rem" }}>{baslik}</h1>
      <p style={{ ...mono, color: "var(--muted)", marginBottom: "2.5rem" }}>{en ? "Last updated" : "Son güncelleme"}: {guncelleme}</p>
      <div style={{ fontSize: "1.02rem", lineHeight: 1.75, color: "var(--ink)", maxWidth: "68ch" }}>{children}</div>
      <p style={{ marginTop: "3rem", borderTop: "1px solid var(--line)", paddingTop: "1.5rem", color: "var(--muted)", fontSize: "0.95rem" }}>
        {en ? "Questions:" : "Sorular için:"} <a href="mailto:do.berkay@icloud.com" style={{ color: "var(--ink)", textDecoration: "underline" }}>do.berkay@icloud.com</a>
      </p>
    </main>
  );
}

export const h2: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", margin: "2.2rem 0 0.6rem", color: "var(--ink)" };

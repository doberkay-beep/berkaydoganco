import { REVIEWS, type Lang } from "@/lib/site";

/* OKUR SESİ — gerçek okur yorumları, kaynağıyla (lib/site.ts REVIEWS; uydurma yok).
   Ana sayfada ilk üçü; tamamı Hakkımda #okurlar ve Basın Odası'nda. */
export function OkurSesi({ lang, adet = 3, tumuLink = true }: { lang: Lang; adet?: number; tumuLink?: boolean }) {
  const tr = lang === "tr";
  return (
    <div>
      <div className="os-grid">
        {REVIEWS.slice(0, adet).map((r) => (
          <figure key={r.text} lang="tr" style={{ margin: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1rem", padding: "1.4rem 1.5rem", border: "1px solid var(--line)", borderRadius: "14px", background: "var(--bg-2)" }}>
            <blockquote style={{ margin: 0, fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.08rem", lineHeight: 1.5, color: "var(--ink)" }}>&ldquo;{r.text}&rdquo;</blockquote>
            <figcaption style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent-2)" }}>
              {r.source} · {r.kitap}
            </figcaption>
          </figure>
        ))}
      </div>
      {tumuLink && REVIEWS.length > adet && (
        <a href="/hakkimda#okurlar" className="cg-link" style={{ display: "inline-block", marginTop: "1.25rem", fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>
          {tr ? `Tüm yorumlar (${REVIEWS.length})` : `All reviews (${REVIEWS.length})`} →
        </a>
      )}
    </div>
  );
}

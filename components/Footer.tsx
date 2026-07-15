"use client";

import { usePathname } from "next/navigation";
import { content, type Lang } from "@/lib/content";

export function Footer() {
  const pathname = usePathname();
  const lang: Lang = pathname.startsWith("/en") ? "en" : "tr";
  const t = content[lang].footer;

  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "3rem 2.75rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>
      <div>
        <p style={{ fontFamily: "var(--font-grotesk)", fontSize: "1.5rem", fontWeight: 400, letterSpacing: "0.14em", color: "var(--cream)", marginBottom: "0.5rem" }}>
          BERKAY DOĞAN
        </p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-dim)", letterSpacing: "0.1em" }}>
          berkaydogan.co
        </p>
      </div>

      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {[
          { label: "Instagram", href: "https://instagram.com/berkaydgn__" },
          { label: "YouTube", href: "https://youtube.com/@yazarberkaydogan" },
        ].map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="link-muted" style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--text-dim)", transition: "color 0.2s" }}>
            {s.label.toUpperCase()}
          </a>
        ))}
      </div>

      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-dim)", letterSpacing: "0.08em", width: "100%", borderTop: "1px solid var(--border)", paddingTop: "1.5rem", marginTop: "0.5rem" }}>
        © 2026 Berkay Doğan — {t.sign}
      </p>

      <style>{`
        .link-muted:hover { color: var(--accent) !important; }
        @media (max-width: 768px) { footer { padding: 2.5rem 1.5rem !important; } }
      `}</style>
    </footer>
  );
}

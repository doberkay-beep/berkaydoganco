"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import { content, type Lang } from "@/lib/content";

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  // Dil tespiti: /en ile başlıyorsa EN
  const isEn = pathname.startsWith("/en");
  const lang: Lang = isEn ? "en" : "tr";
  const t = content[lang].nav;

  // TR ve EN sayfa yolları
  const base = isEn ? "/en" : "";
  const links = [
    { href: `${base}/` === "/en/" ? "/en" : `${base}/`, label: t.home, match: isEn ? "/en" : "/" },
    { href: `${base}/tasfiye`, label: t.tasfiye, match: `${base}/tasfiye` },
    { href: `${base}/murekkep-ve-koz`, label: t.murekkep, match: `${base}/murekkep-ve-koz` },
    { href: `${base}/yazilar`, label: t.yazilar, match: `${base}/yazilar` },
    { href: `${base}/medya`, label: t.medya, match: `${base}/medya` },
    { href: `${base}/basinda`, label: t.basinda, match: `${base}/basinda` },
    { href: `${base}/yazar`, label: t.author, match: `${base}/yazar` },
    { href: `${base}/iletisim`, label: t.contact, match: `${base}/iletisim` },
  ];

  // Dil değiştirme: mevcut sayfanın diğer dildeki karşılığına git
  const switchLang = () => {
    let target: string;
    if (isEn) {
      // /en/... -> /...
      target = pathname.replace(/^\/en/, "") || "/";
    } else {
      // /... -> /en/...
      target = pathname === "/" ? "/en" : `/en${pathname}`;
    }
    router.push(target);
  };

  const isActive = (match: string) => {
    if (match === "/" || match === "/en") return pathname === match;
    return pathname === match || pathname === match + "/";
  };

  return (
    <nav
      className="glass"
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: "0 2rem",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderLeft: "none",
        borderRight: "none",
        borderTop: "none",
      }}
    >
      <Link href={isEn ? "/en" : "/"} style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.15em", color: "var(--text)" }}>
        BD
      </Link>

      <div className="desktop-nav" style={{ display: "flex", gap: "1.1rem", alignItems: "center" }}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.18em",
              color: isActive(link.match) ? "var(--text)" : "var(--text-dim)",
              transition: "color 0.2s",
              borderBottom: isActive(link.match) ? "1px solid var(--text)" : "1px solid transparent",
              paddingBottom: "2px",
            }}
          >
            {link.label}
          </Link>
        ))}

        {/* Dil + Tema kontrolleri */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginLeft: "0.5rem", paddingLeft: "1.5rem", borderLeft: "1px solid var(--border-bright)" }}>
          <button onClick={switchLang} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.15em", color: "var(--text-muted)", transition: "color 0.2s" }}>
            {isEn ? "TR" : "EN"}
          </button>
          <button onClick={toggle} aria-label="Tema" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex", alignItems: "center", transition: "color 0.2s" }}>
            {theme === "dark" ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.2" y1="4.2" x2="5.6" y2="5.6"/><line x1="18.4" y1="18.4" x2="19.8" y2="19.8"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.2" y1="19.8" x2="5.6" y2="18.4"/><line x1="18.4" y1="5.6" x2="19.8" y2="4.2"/></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobil */}
      <button onClick={() => setOpen(!open)} className="mobile-burger" style={{ background: "none", border: "none", color: "var(--text)", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.15em", display: "none" }} aria-label="Menü">
        {open ? "KAPAT" : "MENÜ"}
      </button>

      {open && (
        <div style={{ position: "fixed", top: "60px", left: 0, right: 0, bottom: 0, background: "var(--bg)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "2.5rem", zIndex: 99 }}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} style={{ fontFamily: "var(--font-grotesk)", fontSize: "1.4rem", fontWeight: 700, letterSpacing: "0.08em", color: isActive(link.match) ? "var(--text)" : "var(--text-dim)" }}>
              {link.label}
            </Link>
          ))}
          <div style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}>
            <button onClick={() => { switchLang(); setOpen(false); }} style={{ background: "none", border: "1px solid var(--border-bright)", padding: "0.5rem 1rem", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--text-muted)" }}>
              {isEn ? "TÜRKÇE" : "ENGLISH"}
            </button>
            <button onClick={toggle} style={{ background: "none", border: "1px solid var(--border-bright)", padding: "0.5rem 1rem", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--text-muted)" }}>
              {theme === "dark" ? "AYDINLIK" : "KARANLIK"}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1100px) {
          .desktop-nav { display: none !important; }
          .mobile-burger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

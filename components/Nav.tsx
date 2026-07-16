"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { content, TRENDYOL_URL, type Lang } from "@/lib/content";

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Dil tespiti: /en ile başlıyorsa EN
  const isEn = pathname.startsWith("/en");
  const lang: Lang = isEn ? "en" : "tr";
  const t = content[lang].nav;

  // TR ve EN sayfa yolları
  const base = isEn ? "/en" : "";

  // "Kitaplar" grubu altındaki kitap sayfaları
  const bookLinks = [
    { href: `${base}/tasfiye`, label: t.tasfiye, match: `${base}/tasfiye` },
    { href: `${base}/murekkep-ve-koz`, label: t.murekkep, match: `${base}/murekkep-ve-koz` },
  ];

  type NavItem =
    | { type: "link"; href: string; label: string; match: string }
    | { type: "group"; label: string; children: { href: string; label: string; match: string }[] };

  const links: NavItem[] = [
    { type: "link", href: `${base}/` === "/en/" ? "/en" : `${base}/`, label: t.home, match: isEn ? "/en" : "/" },
    { type: "group", label: t.kitaplar, children: bookLinks },
    { type: "link", href: `${base}/yazilar`, label: t.yazilar, match: `${base}/yazilar` },
    { type: "link", href: `${base}/medya`, label: t.medya, match: `${base}/medya` },
    { type: "link", href: `${base}/anlar`, label: t.anlar, match: `${base}/anlar` },
    { type: "link", href: `${base}/basinda`, label: t.basinda, match: `${base}/basinda` },
    { type: "link", href: `${base}/yazar`, label: t.author, match: `${base}/yazar` },
    { type: "link", href: `${base}/iletisim`, label: t.contact, match: `${base}/iletisim` },
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
        padding: "0 2.75rem",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(11, 5, 6, 0.78)",
        backdropFilter: "blur(18px) saturate(140%)",
        WebkitBackdropFilter: "blur(18px) saturate(140%)",
        borderLeft: "none",
        borderRight: "none",
        borderTop: "none",
        borderBottom: "1px solid var(--dim)",
      }}
    >
      {/* Sol — logo */}
      <Link href={isEn ? "/en" : "/"} style={{ fontFamily: "var(--font-grotesk)", fontWeight: 400, fontSize: "1.05rem", letterSpacing: "0.18em", color: "var(--cream)" }}>
        BD
      </Link>

      {/* Orta — menü */}
      <div className="desktop-nav" style={{ flex: 1, display: "flex", gap: "1.1rem", alignItems: "center", justifyContent: "center" }}>
        {links.map((link) => {
          if (link.type === "group") {
            const groupActive = link.children.some((c) => isActive(c.match));
            return (
              <div key={link.label} className="nav-dropdown" tabIndex={0} style={{ position: "relative" }}>
                <span
                  className="nav-dropdown-trigger"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.18em",
                    color: groupActive ? "var(--text)" : "var(--text-dim)",
                    transition: "color 0.2s",
                    borderBottom: groupActive ? "1px solid var(--text)" : "1px solid transparent",
                    paddingBottom: "2px",
                    cursor: "default",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {link.label}
                  <span style={{ fontSize: "0.5rem" }} aria-hidden="true">▾</span>
                </span>
                <div className="nav-dropdown-menu glass" style={{ position: "absolute", top: "calc(100% + 14px)", left: 0, minWidth: "190px", padding: "0.4rem", borderRadius: "2px", border: "1px solid var(--dim)" }}>
                  {link.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      style={{
                        display: "block",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.62rem",
                        letterSpacing: "0.16em",
                        color: isActive(c.match) ? "var(--text)" : "var(--text-muted)",
                        padding: "0.6rem 0.75rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }
          return (
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
          );
        })}
      </div>

      {/* Sağ — dil + Satın Al */}
      <div className="desktop-actions" style={{ display: "flex", alignItems: "center", gap: "1.35rem" }}>
        <button onClick={switchLang} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.15em", color: "var(--text-muted)", transition: "color 0.2s" }}>
          {isEn ? "TR" : "EN"}
        </button>
        <a href={TRENDYOL_URL} target="_blank" rel="noopener noreferrer" className="btn btn-fill" style={{ padding: "0.6rem 1.35rem", fontSize: "0.6rem" }}>
          {t.buy}
        </a>
      </div>

      {/* Mobil */}
      <button onClick={() => setOpen(!open)} className="mobile-burger" style={{ background: "none", border: "none", color: "var(--text)", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.15em", display: "none" }} aria-label="Menü">
        {open ? "KAPAT" : "MENÜ"}
      </button>

      {open && (
        <div style={{ position: "fixed", top: "60px", left: 0, right: 0, bottom: 0, background: "var(--bg)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "2.5rem", zIndex: 99 }}>
          {links.map((link) => {
            if (link.type === "group") {
              return (
                <div key={link.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", fontWeight: 400, letterSpacing: "0.25em", color: "var(--text-dim)" }}>{link.label}</span>
                  {link.children.map((c) => (
                    <Link key={c.href} href={c.href} onClick={() => setOpen(false)} style={{ fontFamily: "var(--font-grotesk)", fontSize: "1.6rem", fontWeight: 400, letterSpacing: "0.06em", color: isActive(c.match) ? "var(--cream)" : "var(--gray)" }}>
                      {c.label}
                    </Link>
                  ))}
                </div>
              );
            }
            return (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} style={{ fontFamily: "var(--font-grotesk)", fontSize: "1.6rem", fontWeight: 400, letterSpacing: "0.06em", color: isActive(link.match) ? "var(--cream)" : "var(--gray)" }}>
                {link.label}
              </Link>
            );
          })}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "center", marginTop: "1rem" }}>
            <a href={TRENDYOL_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="btn btn-fill">
              {t.buy}
            </a>
            <button onClick={() => { switchLang(); setOpen(false); }} style={{ background: "none", border: "1px solid var(--border-bright)", padding: "0.5rem 1rem", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--text-muted)" }}>
              {isEn ? "TÜRKÇE" : "ENGLISH"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "ANASAYFA" },
  { href: "/tasfiye", label: "TASFİYE" },
  { href: "/yazar", label: "YAZAR" },
  { href: "/deneme", label: "DENEME" },
  { href: "/iletisim", label: "İLETİŞİM" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: "0 2rem",
      height: "56px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid #1a1a1a",
      background: "rgba(0,0,0,0.92)",
      backdropFilter: "blur(8px)",
    }}>
      {/* Logo */}
      <Link href="/" style={{
        fontFamily: "var(--font-grotesk)",
        fontWeight: 700,
        fontSize: "0.9rem",
        letterSpacing: "0.15em",
        color: "var(--white)",
      }}>
        BD
      </Link>

      {/* Desktop links */}
      <div style={{
        display: "flex",
        gap: "2.5rem",
        alignItems: "center",
      }} className="desktop-nav">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: pathname === link.href ? "var(--white)" : "var(--grey-muted)",
              transition: "color 0.2s",
              borderBottom: pathname === link.href ? "1px solid var(--white)" : "none",
              paddingBottom: "2px",
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile burger */}
      <button
        onClick={() => setOpen(!open)}
        className="mobile-burger"
        style={{
          background: "none",
          border: "none",
          color: "var(--white)",
          cursor: "pointer",
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          letterSpacing: "0.15em",
          display: "none",
        }}
        aria-label="Menü"
      >
        {open ? "KAPAT" : "MENÜ"}
      </button>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: "fixed",
          top: "56px",
          left: 0,
          right: 0,
          bottom: 0,
          background: "var(--black)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "3rem",
          zIndex: 99,
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--font-grotesk)",
                fontSize: "1.5rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: pathname === link.href ? "var(--white)" : "var(--grey-muted)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-burger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

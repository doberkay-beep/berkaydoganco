"use client";

import { useState } from "react";

/**
 * Mürekkep ve Köz — 3D kapak. Tıklayınca çevrilir (ön ↔ arka).
 * CSS değerleri CLAUDE.md spec'ine sadık: perspective 1800px,
 * varsayılan rotateY(14deg), tıklama rotateY(-166deg) .9s cubic-bezier(.4,.15,.2,1).
 * Süzülme (translate) transform'dan bağımsız tutuldu ki çevirme ile çakışmasın.
 */
export function BookCover3D({
  frontSrc = "/murekkep-ve-koz-on-kapak.jpg",
  backSrc = "/murekkep-ve-koz-arka-kapak.jpg",
  frontAlt = "Mürekkep ve Köz — ön kapak",
  backAlt = "Mürekkep ve Köz — arka kapak",
  badge,
  hintDefault,
  hintFlipped,
}: {
  frontSrc?: string;
  backSrc?: string;
  frontAlt?: string;
  backAlt?: string;
  badge: string;
  hintDefault: string;
  hintFlipped: string;
}) {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((f) => !f);

  return (
    <div className="bc3d-stage">
      <div
        className={`bc3d-book${flipped ? " is-flipped" : ""}`}
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={flipped ? hintFlipped : hintDefault}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
      >
        <div className="bc3d-face bc3d-front">
          <div className="bc3d-cover">
            <img src={frontSrc} alt={frontAlt} loading="lazy" />
            <span className="bc3d-spine" aria-hidden="true" />
            <span className="bc3d-shine" aria-hidden="true" />
          </div>
          <span className="bc3d-badge">{badge}</span>
        </div>
        <div className="bc3d-face bc3d-back">
          <div className="bc3d-cover">
            <img src={backSrc} alt={backAlt} loading="lazy" />
            <span className="bc3d-spine bc3d-spine-r" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="bc3d-ground" aria-hidden="true" />
      <p className="bc3d-hint">{flipped ? hintFlipped : hintDefault}</p>

      <style>{`
        .bc3d-stage {
          perspective: 1800px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .bc3d-book {
          position: relative;
          width: 280px;
          height: 435px;
          transform-style: preserve-3d;
          transform: rotateY(14deg);
          transition: transform 0.9s cubic-bezier(0.4, 0.15, 0.2, 1);
          animation: bc3dFloat 6.5s ease-in-out infinite alternate;
          cursor: pointer;
        }
        .bc3d-book.is-flipped { transform: rotateY(-166deg); }
        @keyframes bc3dFloat { from { translate: 0 0; } to { translate: 0 -16px; } }

        .bc3d-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .bc3d-back { transform: rotateY(180deg); }

        .bc3d-cover {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: 2px;
          box-shadow: 0 24px 55px rgba(0, 0, 0, 0.55);
        }
        .bc3d-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Sırt gölgesi — sol kenarda 20px koyu gradient */
        .bc3d-spine {
          position: absolute;
          top: 0; left: 0; bottom: 0;
          width: 20px;
          background: linear-gradient(to right, rgba(0, 0, 0, 0.55), transparent);
          pointer-events: none;
        }
        .bc3d-spine-r {
          left: auto; right: 0;
          background: linear-gradient(to left, rgba(0, 0, 0, 0.55), transparent);
        }

        /* Parıltı sweep — 5.5s */
        .bc3d-shine {
          position: absolute;
          top: 0; left: -60%;
          width: 40%; height: 100%;
          background: linear-gradient(105deg, transparent, rgba(255, 255, 255, 0.18), transparent);
          transform: skewX(-18deg);
          animation: bc3dShine 5.5s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes bc3dShine { 0% { left: -60%; } 55%, 100% { left: 135%; } }

        /* Rozet — #1 TRENDYOL ŞİİR, hafif sallanır 3.4s */
        .bc3d-badge {
          position: absolute;
          top: -13px; right: -13px;
          background: var(--bordo);
          color: var(--cream);
          font-family: var(--font-mono);
          font-size: 0.5rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.5rem 0.7rem;
          border-radius: 2px;
          white-space: nowrap;
          transform-origin: top right;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
          animation: bc3dSway 3.4s ease-in-out infinite;
        }
        @keyframes bc3dSway { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }

        /* Zemin gölgesi — blur'lu, kitapla senkron nefes alır (6.5s) */
        .bc3d-ground {
          width: 210px;
          height: 26px;
          margin-top: 18px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.6), transparent 70%);
          filter: blur(12px);
          animation: bc3dGround 6.5s ease-in-out infinite alternate;
        }
        @keyframes bc3dGround {
          from { transform: scaleX(1); opacity: 0.6; }
          to { transform: scaleX(0.8); opacity: 0.38; }
        }

        .bc3d-hint {
          margin-top: 1.5rem;
          font-family: var(--font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gray);
          text-align: center;
        }

        @media (max-width: 768px) {
          .bc3d-book { width: 240px; height: 373px; }
          .bc3d-ground { width: 180px; }
        }
      `}</style>
    </div>
  );
}

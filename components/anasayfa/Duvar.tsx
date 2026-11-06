"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useRef } from "react";
import Link from "next/link";
import { useIlerleme } from "./ilerleme";
import { YOUTUBE_URL, INSTAGRAM_URL, SUBSTACK_URL } from "@/lib/site";
import s from "./anasayfa.module.css";

const DIZELER = [
  "Geri dönmüyorum, geleceğime âşığım.",
  "Yalan yaşanmışlıklarıma veda ettim.",
  "Haksız hükümleri gamsızlığa vurdum.",
  "Denizlerin dalgalarına vurdum.",
  "Yıkılamadım, yıktım.",
];

type Eser = { slug: string; ad: string; kapak: string; tur: string; cikis: string; desc: string };

export function Duvar({ tasfiye, murekkep }: { tasfiye: Eser; murekkep: Eser }) {
  const kok = useRef<HTMLElement | null>(null);
  const hat = useRef<HTMLDivElement | null>(null);
  const kapi = useRef<HTMLDivElement | null>(null);
  const ipucu = useRef<HTMLParagraphElement | null>(null);
  const siir = useRef<HTMLParagraphElement | null>(null);
  const son = useRef(-1);
  const ciz = useCallback((p: number) => {
    const h = hat.current;
    if (!h) return;
    const yol = h.scrollWidth - window.innerWidth;
    h.style.transform = `translate3d(${(-p * yol).toFixed(1)}px,0,0)`;
    if (ipucu.current) ipucu.current.style.opacity = p > 0.012 ? "0" : "1";
    // Son bölümde çıkış kapısı büyür: karanlıktan gün ışığına.
    const d = kapi.current;
    if (d) {
      const t = Math.max(0, Math.min(1, (p - 0.9) / 0.1));
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cx = d.offsetLeft + d.offsetWidth / 2 - p * yol;
      const cy = d.offsetTop + d.offsetHeight / 2;
      const sMax = Math.max((2 * Math.max(cx, vw - cx)) / d.offsetWidth, (2 * Math.max(cy, vh - cy)) / d.offsetHeight) * 1.04;
      const o = t * t * (3 - 2 * t);
      d.style.transform = `scale(${(1 + (sMax - 1) * o).toFixed(3)})`;
      d.style.setProperty("--yazi", (1 - t * 2.4).toFixed(3));
    }
    const e = siir.current;
    if (!e) return;
    // Şiir duvardan geçerken kelimeler sırayla yanar.
    const r = e.getBoundingClientRect();
    const vw = window.innerWidth;
    const bas = vw * 0.92;
    const bit = Math.min(vw * 0.08, vw - r.width) - r.width * 0.12;
    const ilerleme = Math.max(0, Math.min(1, (bas - r.left) / (bas - bit)));
    const kel = e.querySelectorAll<HTMLElement>("[data-k]");
    const n = Math.floor(ilerleme * (kel.length + 0.999));
    if (n === son.current) return;
    son.current = n;
    kel.forEach((k, i) => k.classList.toggle(s.yanik, i < n));
  }, []);
  useIlerleme(kok, ciz);
  return (
    <>
    <section ref={kok} className={s.koridor}>
      <div className={s.sabit}>
        <p ref={ipucu} className={s.ipucu}>Aşağı kaydır, duvar boyunca yürü <span aria-hidden>→</span></p>
        <div className={s.zemin} aria-hidden />
        <div ref={hat} className={s.hat}>
          <div className={s.acilis}>
            <h1>Berkay Doğan</h1>
            <p>İstanbul&apos;da yaşayan şair ve yazar.</p>
          </div>
          <figure className={s.eser}>
            <Link href={`/kitaplar/${murekkep.slug}/`}><img src={murekkep.kapak} alt={`${murekkep.ad} kapağı`} /></Link>
            <figcaption><strong>{murekkep.ad}</strong><span>{murekkep.tur}, {murekkep.cikis}</span></figcaption>
          </figure>
          <figure className={s.eser}>
            <img src="/anasayfa/el-yazisi.webp" alt="Kâğıt üzerinde Geleceğime Âşığım şiiri" />
            <figcaption><strong>Geleceğime Âşığım</strong><span>Mürekkep ve Köz, s. 77</span></figcaption>
          </figure>
          <p ref={siir} className={s.siir}>
            {DIZELER.map((d, i) => (
              <span key={d} className={i === DIZELER.length - 1 ? s.son : undefined}>
                {d.split(" ").map((w, j) => (
                  <span key={j} data-k="" className={s.kelime}>{w} </span>
                ))}
              </span>
            ))}
          </p>
          <figure className={s.eser}>
            <Link href={`/kitaplar/${tasfiye.slug}/`}><img src={tasfiye.kapak} alt={`${tasfiye.ad} kapağı`} /></Link>
            <figcaption><strong>{tasfiye.ad}</strong><span>{tasfiye.tur}, {tasfiye.cikis}</span></figcaption>
          </figure>
          <figure className={s.eser}>
            <img src="/images/portre-dikey.jpg" alt="Berkay Doğan" />
            <figcaption><strong>Berkay Doğan</strong><span>İstanbul</span></figcaption>
          </figure>
          <div ref={kapi} className={s.kapi} aria-hidden><span>Çıkış</span></div>
        </div>
      </div>
    </section>
    <section id="contact" className={s.cikis}>
      <p className={s.cikisAd}>Berkay Doğan</p>
      <nav className={s.cikisListe}>
        <Link href="/kitaplar/">Kitaplar</Link>
        <Link href="/yazilar/">Yazılar</Link>
        <Link href="/sozler/">Sözler</Link>
        <Link href="/notlar/">Gece Notları</Link>
        <Link href="/ogrenciler/">Öğrenciler için</Link>
        <Link href="/video/">İzle ve dinle</Link>
        <Link href="/by/">by. atölyesi</Link>
        <Link href="/hakkimda/">Hakkımda</Link>
        <Link href="/press/">Basın odası</Link>
        <a href="mailto:do.berkay@icloud.com">İletişim</a>
      </nav>
      <p className={s.cikisSosyal}>
        <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">YouTube</a>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">Substack</a>
      </p>
    </section>
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

/* ============ Scroll ile beliren sarmalayıcı ============ */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  style,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Hareket azaltma tercihi olanlara animasyon gösterme
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Component = as as React.ElementType;
  return (
    <Component
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Component>
  );
}

/* ============ Sayı sayma animasyonu ============ */
export function CountUp({
  end,
  duration = 1600,
  prefix = "",
  suffix = "",
  style,
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(end);
      return;
    }

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            // easeOutExpo
            const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
            setVal(Math.round(eased * end));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} style={style}>
      {prefix}{val}{suffix}
    </span>
  );
}

/* ============ Parallax görsel ============ */
export function Parallax({
  src,
  alt = "",
  filter,
  strength = 0.15,
  style,
}: {
  src: string;
  alt?: string;
  filter?: string;
  strength?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const viewH = window.innerHeight;
        // Elemanın ekran ortasına göre konumu
        const offset = (rect.top + rect.height / 2 - viewH / 2) * strength;
        el.style.transform = `translateY(${offset}px) scale(1.12)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      style={{ ...style, filter, willChange: "transform" }}
    />
  );
}

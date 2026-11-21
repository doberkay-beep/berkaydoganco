"use client";

/* hereby. haritası — 19 Kas 2026 (Berkay: "sadece harita olmalı").
   Yalnız ışıklar: hereby sunucusundaki harita_isiklari() ~300 m ızgaraya yuvarlanmış konum ve
   o hücredeki iz sayısını verir. Metin, yazar, semt, tarih yok; gizli, özel ve hediye izler hariç.
   Okumak için oraya gitmek gerekir: harita yalnız merak uyandırır. */

import { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { SUNUCU, ANAHTAR } from "@/components/WrittenbySanatci";

const KIZIL = "#c9241a";
type Isik = { enlem: number; boylam: number; sayi: number };

function stilAdresi(): string {
  const acik = typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "light";
  return `https://tiles.openfreemap.org/styles/${acik ? "positron" : "dark"}`;
}

export default function HerebyHarita({ en }: { en: boolean }) {
  const kap = useRef<HTMLDivElement>(null);
  const [toplam, setToplam] = useState<number | null>(null);

  useEffect(() => {
    let iptal = false;
    let harita: import("maplibre-gl").Map | null = null;
    let gozcu: MutationObserver | null = null;

    (async () => {
      const [maplibre, yanit] = await Promise.all([
        import("maplibre-gl"),
        fetch(`${SUNUCU}/rest/v1/rpc/harita_isiklari`, {
          method: "POST",
          headers: { apikey: ANAHTAR, "Content-Type": "application/json" },
          body: "{}",
        }).then((r) => (r.ok ? r.json() : [])).catch(() => []),
      ]);
      if (iptal || !kap.current) return;
      const isiklar: Isik[] = Array.isArray(yanit) ? yanit : [];
      setToplam(isiklar.reduce((t, i) => t + (i.sayi || 0), 0));

      const veri = {
        type: "FeatureCollection" as const,
        features: isiklar.map((i) => ({
          type: "Feature" as const,
          properties: { sayi: i.sayi },
          geometry: { type: "Point" as const, coordinates: [i.boylam, i.enlem] },
        })),
      };

      harita = new maplibre.Map({
        container: kap.current,
        style: stilAdresi(),
        center: [28.98, 41.03],
        zoom: 11.3,
        cooperativeGestures: true,
        attributionControl: { compact: true },
      });
      harita.addControl(new maplibre.NavigationControl({ showCompass: false }), "top-right");

      const katmanlar = () => {
        if (!harita || harita.getSource("isiklar")) return;
        harita.addSource("isiklar", { type: "geojson", data: veri });
        harita.addLayer({
          id: "hale",
          type: "circle",
          source: "isiklar",
          paint: {
            "circle-color": KIZIL,
            "circle-opacity": 0.18,
            "circle-blur": 0.9,
            "circle-radius": ["interpolate", ["linear"], ["zoom"], 8, ["+", 8, ["*", 3, ["get", "sayi"]]], 15, ["+", 26, ["*", 6, ["get", "sayi"]]]],
          },
        });
        harita.addLayer({
          id: "isik",
          type: "circle",
          source: "isiklar",
          paint: {
            "circle-color": KIZIL,
            "circle-opacity": 0.95,
            "circle-radius": ["interpolate", ["linear"], ["zoom"], 8, 2.5, 15, 6],
            "circle-stroke-color": "#ffffff",
            "circle-stroke-opacity": 0.35,
            "circle-stroke-width": 1,
          },
        });
      };
      harita.on("style.load", katmanlar);

      // Açılış İstanbul'da (ışıkların çoğu orada); dünyadaki diğerleri uzaklaşınca görünür.

      // Site teması değişince harita da değişsin.
      gozcu = new MutationObserver(() => harita?.setStyle(stilAdresi()));
      gozcu.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    })();

    return () => {
      iptal = true;
      gozcu?.disconnect();
      harita?.remove();
    };
  }, []);

  return (
    <div>
      <div
        ref={kap}
        role="img"
        aria-label={en ? "Map of places where lines have been left on hereby." : "hereby'da satır bırakılan yerlerin haritası."}
        style={{ width: "100%", height: "min(560px, 70vh)", borderRadius: "22px", overflow: "hidden", border: "1px solid var(--glass-border)", background: "var(--glass-bg)" }}
      />
      <p style={{ marginTop: "0.9rem", fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.6 }}>
        {toplam !== null && toplam > 0 && (
          <>
            {en ? `${toplam} lines are waiting. ` : `${toplam} satır bekliyor. `}
          </>
        )}
        {en
          ? "Each light is a place, not an exact spot; what is written there can only be read by going there."
          : "Her ışık bir semt köşesi, tam nokta değil; orada ne yazdığını yalnız oraya giden okuyabilir."}
      </p>
    </div>
  );
}

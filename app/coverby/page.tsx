import type { Metadata } from "next";
import { Bodoni_Moda, Inter_Tight } from "next/font/google";
import { CoverbySayfa } from "@/components/CoverbySayfa";

/* coverby. — by. atölyesinin deneme işi: hayatının bir bölümüne kapak.
   Deneme dönemi: kapak tarayıcıda çizilir, hiçbir şey sunucuya gitmez; defter isteği e-postayla. */

const bodoni = Bodoni_Moda({ subsets: ["latin", "latin-ext"], weight: ["400", "500"], style: ["normal", "italic"], display: "swap" });
const grotesk = Inter_Tight({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600"], display: "swap" });

export const metadata: Metadata = {
  title: { absolute: "coverby. — Hayatının her bölümüne bir kapak" },
  description: "Hayatının bir dönemine ad koy, by. atölyesi ona bir kitap kapağı çizsin. İstersen o kapakla boş bir defter iste; o bölümü sen yaz.",
  alternates: { canonical: "/coverby" },
  robots: { index: false, follow: true },
};

export default function Sayfa() {
  return <CoverbySayfa serif={bodoni.style.fontFamily} grotesk={grotesk.style.fontFamily} />;
}

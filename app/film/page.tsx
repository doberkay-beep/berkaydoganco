import type { Metadata } from "next";
import FilmFragman from "@/components/FilmFragman";

export const metadata: Metadata = {
  title: { absolute: "Film — Berkay Doğan" },
  description: "Tasfiye'nin 50 saniyelik sinematik fragmanı: İstanbul gecesi, daktilo, hüküm ve közler. Gerçek çekim, özgün skor.",
  alternates: { canonical: "/film" },
  openGraph: {
    title: "Tasfiye — Film",
    description: "50 saniyelik sinematik fragman: İstanbul gecesi, daktilo, hüküm ve közler.",
    url: "https://www.berkaydogan.co/film",
    type: "website",
    images: [{ url: "https://www.berkaydogan.co/film/fragman-poster.jpg" }],
  },
};

export default function FilmPage() {
  return <FilmFragman />;
}

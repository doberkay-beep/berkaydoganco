import type { Metadata } from "next";
import FilmFragman from "@/components/FilmFragman";

export const metadata: Metadata = {
  title: { absolute: "Film — Berkay Doğan" },
  description: "TASFİYE: Film — 8 dakikalık kısa film (metinler kitaptan, ses yazarın) + 50 saniyelik sinematik fragman ve kampanya kısaları.",
  alternates: { canonical: "/film" },
  openGraph: {
    title: "Tasfiye — Film",
    description: "8 dakikalık kısa film + sinematik fragman.",
    url: "https://www.berkaydogan.co/film",
    type: "website",
    images: [{ url: "https://www.berkaydogan.co/film/fragman-poster.jpg" }],
  },
};

export default function FilmPage() {
  return <FilmFragman />;
}

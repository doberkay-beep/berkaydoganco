import type { Metadata } from "next";
import { GIT_HEDEFLER } from "@/lib/kitaplar";
import { Yonlendir } from "@/components/Yonlendir";

export const dynamic = "force-static";

export function generateStaticParams() {
  return Object.keys(GIT_HEDEFLER).map((kanal) => ({ kanal }));
}

export async function generateMetadata({ params }: { params: Promise<{ kanal: string }> }): Promise<Metadata> {
  const { kanal } = await params;
  return {
    title: { absolute: `Yönlendirme — ${kanal}` },
    robots: { index: false, follow: false },
  };
}

export default async function GitPage({ params }: { params: Promise<{ kanal: string }> }) {
  const { kanal } = await params;
  // Statik export'ta bilinmeyen kanal zaten 404'a düşer; güvence olarak ana sayfa
  const hedef = GIT_HEDEFLER[kanal] ?? "/";
  return <Yonlendir hedef={hedef} kanal={kanal} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KITAPLAR } from "@/lib/kitaplar";
import { KitapSayfasi } from "@/components/KitapSayfasi";

export const dynamic = "force-static";

const SITE = "https://www.berkaydogan.co";

export function generateStaticParams() {
  return KITAPLAR.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const k = KITAPLAR.find((x) => x.slug === slug);
  if (!k) return {};
  return {
    title: { absolute: `${k.ad} — Berkay Doğan` },
    description: k.desc,
    alternates: { canonical: `/kitaplar/${k.slug}` },
    openGraph: {
      title: `${k.ad} — Berkay Doğan`,
      description: k.desc,
      url: `${SITE}/kitaplar/${k.slug}`,
      type: "book",
      images: [{ url: `${SITE}${k.kapak}` }],
    },
  };
}

export default async function KitapPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const kitap = KITAPLAR.find((x) => x.slug === slug);
  if (!kitap) notFound();
  const diger = KITAPLAR.find((x) => x.slug !== slug)!;
  return <KitapSayfasi kitap={kitap} diger={diger} />;
}

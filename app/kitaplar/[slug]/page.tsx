import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KITAPLAR } from "@/lib/kitaplar";
import { KitapSayfasi } from "@/components/KitapSayfasi";
import { AUTHOR_REF } from "@/lib/site";

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

  // Kitabın kendi kanonik URL'sinde self-contained Book + breadcrumb şeması —
  // zengin sonuç + yazar entity'sine (AUTHOR_REF @id) bağ.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Book",
        name: kitap.ad,
        author: AUTHOR_REF,
        inLanguage: "tr",
        genre: kitap.tur,
        description: kitap.desc,
        image: `${SITE}${kitap.kapak}`,
        url: `${SITE}/kitaplar/${kitap.slug}/`,
        ...(kitap.isbn ? { isbn: kitap.isbn } : {}),
        ...(kitap.sayfaSayisi ? { numberOfPages: kitap.sayfaSayisi } : {}),
        ...(kitap.fiyat
          ? {
              offers: {
                "@type": "Offer",
                price: kitap.fiyat,
                priceCurrency: "TRY",
                availability: "https://schema.org/InStock",
                url: `${SITE}/kitaplar/${kitap.slug}/`,
              },
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Berkay Doğan", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Kitaplar", item: `${SITE}/kitaplar/` },
          { "@type": "ListItem", position: 3, name: kitap.ad, item: `${SITE}/kitaplar/${kitap.slug}/` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <KitapSayfasi kitap={kitap} diger={diger} />
    </>
  );
}

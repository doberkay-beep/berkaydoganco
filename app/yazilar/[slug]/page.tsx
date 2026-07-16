import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllYaziSlugs, getYazi, getAdjacentYazilar } from "@/lib/yazilar";
import { YaziDetay } from "@/components/YaziDetay";
import { YaziSchema } from "@/components/Schema";

export function generateStaticParams() {
  return getAllYaziSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const yazi = await getYazi(slug);
  if (!yazi) return { title: "Yazı" };
  return { title: yazi.title, description: yazi.excerpt };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const yazi = await getYazi(slug);
  if (!yazi) notFound();
  const { prev, next } = getAdjacentYazilar(slug, yazi.lang);
  return (
    <>
      <YaziSchema title={yazi.title} description={yazi.excerpt} datePublished={yazi.date} slug={yazi.slug} lang="tr" />
      <YaziDetay yazi={yazi} lang="tr" prev={prev} next={next} />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllYaziSlugs, getYazi, getAdjacentYazilar } from "@/lib/yazilar";
import { YaziDetay } from "@/components/YaziDetay";

export function generateStaticParams() {
  return getAllYaziSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const yazi = await getYazi(slug);
  if (!yazi) return { title: "Yazı — Berkay Doğan" };
  return { title: `${yazi.title} — Berkay Doğan`, description: yazi.excerpt };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const yazi = await getYazi(slug);
  if (!yazi) notFound();
  const { prev, next } = getAdjacentYazilar(slug, yazi.lang);
  return <YaziDetay yazi={yazi} lang="tr" prev={prev} next={next} />;
}

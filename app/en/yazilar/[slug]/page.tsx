import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllYaziSlugs, getYazi } from "@/lib/yazilar";
import { YaziDetay } from "@/components/YaziDetay";

export function generateStaticParams() {
  return getAllYaziSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const yazi = await getYazi(slug);
  if (!yazi) return { title: "Writing — Berkay Doğan" };
  return { title: `${yazi.title} — Berkay Doğan`, description: yazi.excerpt };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const yazi = await getYazi(slug);
  if (!yazi) notFound();
  return <YaziDetay yazi={yazi} lang="en" />;
}

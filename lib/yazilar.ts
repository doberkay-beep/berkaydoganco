import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const yazilarDir = path.join(process.cwd(), "content/yazilar");

export type Yazi = {
  slug: string;
  title: string;
  date: string;
  lang: string;
  excerpt: string;
  tags: string[];
  readingTime: number;
  contentHtml: string;
};

export type YaziMeta = Omit<Yazi, "contentHtml">;

// Kelime sayısından tahmini okuma süresi (dakika). En az 1.
function readingTimeFromContent(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function getAllYaziSlugs(): string[] {
  if (!fs.existsSync(yazilarDir)) return [];
  return fs
    .readdirSync(yazilarDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllYazilar(lang?: string): YaziMeta[] {
  const slugs = getAllYaziSlugs();
  const list = slugs.map((slug) => {
    const fullPath = path.join(yazilarDir, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      lang: data.lang || "tr",
      excerpt: data.excerpt || "",
      tags: data.tags || [],
      readingTime: readingTimeFromContent(content),
    } as YaziMeta;
  });
  const filtered = lang ? list.filter((y) => y.lang === lang) : list;
  return filtered.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Bir yazının aynı dildeki önceki (daha eski) ve sonraki (daha yeni) yazısı
export function getAdjacentYazilar(
  slug: string,
  lang: string
): { prev: YaziMeta | null; next: YaziMeta | null } {
  const list = getAllYazilar(lang); // en yeni → en eski sıralı
  const idx = list.findIndex((y) => y.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  const newer = idx > 0 ? list[idx - 1] : null; // daha yeni → "sonraki"
  const older = idx < list.length - 1 ? list[idx + 1] : null; // daha eski → "önceki"
  return { prev: older, next: newer };
}

export async function getYazi(slug: string): Promise<Yazi | null> {
  const fullPath = path.join(yazilarDir, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();
  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    lang: data.lang || "tr",
    excerpt: data.excerpt || "",
    tags: data.tags || [],
    readingTime: readingTimeFromContent(content),
    contentHtml,
  };
}

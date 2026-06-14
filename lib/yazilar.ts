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
  contentHtml: string;
};

export type YaziMeta = Omit<Yazi, "contentHtml">;

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
    const { data } = matter(fileContents);
    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      lang: data.lang || "tr",
      excerpt: data.excerpt || "",
      tags: data.tags || [],
    } as YaziMeta;
  });
  const filtered = lang ? list.filter((y) => y.lang === lang) : list;
  return filtered.sort((a, b) => (a.date < b.date ? 1 : -1));
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
    contentHtml,
  };
}

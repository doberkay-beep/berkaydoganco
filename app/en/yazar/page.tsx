import type { Metadata } from "next";
import { AuthorContent } from "@/components/AuthorContent";
export const metadata: Metadata = { title: "Author — Berkay Doğan", description: "Berkay Doğan is a poet and writer based in Istanbul." };
export default function Page() { return <AuthorContent lang="en" />; }

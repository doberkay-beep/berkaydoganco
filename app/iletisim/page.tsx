import type { Metadata } from "next";
import { ContactContent } from "@/components/ContactContent";
export const metadata: Metadata = { title: "İletişim — Berkay Doğan", description: "Berkay Doğan ile iletişim." };
export default function Page() { return <ContactContent lang="tr" />; }

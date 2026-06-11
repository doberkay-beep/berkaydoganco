import type { Metadata } from "next";
import { ContactContent } from "@/components/ContactContent";
export const metadata: Metadata = { title: "Contact — Berkay Doğan", description: "Get in touch with Berkay Doğan." };
export default function Page() { return <ContactContent lang="en" />; }

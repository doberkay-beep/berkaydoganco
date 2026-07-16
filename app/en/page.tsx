import type { Metadata } from "next";
import { HomeContent } from "@/components/HomeContent";
import { PersonSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: { absolute: "Berkay Doğan | Poet & Writer — Tasfiye, Ink and Ember" },
  description: "To destroy is the only way to build. Welcome to a 161-page execution of existence.",
};

export default function Page() {
  return (
    <>
      <PersonSchema />
      <HomeContent lang="en" />
    </>
  );
}

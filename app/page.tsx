import { HomeContent } from "@/components/HomeContent";
import { PersonSchema } from "@/components/Schema";

export default function Page() {
  return (
    <>
      <PersonSchema />
      <HomeContent lang="tr" />
    </>
  );
}

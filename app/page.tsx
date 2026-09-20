import { Cagdas } from "@/components/Cagdas";
import { WebSiteSchema, PersonSchema, MurekkepBookSchema, TasfiyeBookSchema } from "@/components/Schema";

export default function Page() {
  return (
    <>
      <WebSiteSchema />
      <PersonSchema />
      <MurekkepBookSchema />
      <TasfiyeBookSchema />
      <Cagdas />
    </>
  );
}

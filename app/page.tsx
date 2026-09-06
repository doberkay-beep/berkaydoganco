import { Cagdas } from "@/components/Cagdas";
import { PersonSchema, MurekkepBookSchema, TasfiyeBookSchema } from "@/components/Schema";

export default function Page() {
  return (
    <>
      <PersonSchema />
      <MurekkepBookSchema />
      <TasfiyeBookSchema />
      <Cagdas />
    </>
  );
}

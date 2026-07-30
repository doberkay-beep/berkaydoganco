import { SafKaranlik } from "@/components/SafKaranlik";
import { PersonSchema, MurekkepBookSchema, TasfiyeBookSchema } from "@/components/Schema";

export default function Page() {
  return (
    <>
      <PersonSchema />
      <MurekkepBookSchema />
      <TasfiyeBookSchema />
      <SafKaranlik />
    </>
  );
}

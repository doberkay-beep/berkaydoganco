// POST /api/frameby/anahtar/  { jws }  →  { anahtar, bitis }
import { islemiDogrula, anahtarUret } from "../_lib/frameby.js";

export default {
  async fetch(istek) {
    if (istek.method !== "POST") return new Response(null, { status: 405, headers: { allow: "POST" } });
    let jws;
    try {
      ({ jws } = await istek.json());
    } catch {
      return Response.json({ hata: "bicim" }, { status: 400 });
    }
    try {
      const islem = islemiDogrula(jws);
      return Response.json(anahtarUret(islem.expiresDate), { headers: { "cache-control": "no-store" } });
    } catch (e) {
      return Response.json({ hata: e.message }, { status: 403, headers: { "cache-control": "no-store" } });
    }
  },
};

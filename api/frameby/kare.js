// GET /api/frameby/kare/?id=<kare>   başlık: X-Frameby-Anahtar
// Ücretli katman görselini gizli Blob deposundan (frameby-ozel, kareler/<id>.jpg) verir.
import { get } from "@vercel/blob";
import { anahtarGecerli } from "../_lib/frameby.js";

export default {
  async fetch(istek) {
    const id = new URL(istek.url).searchParams.get("id") || "";
    if (!/^[a-z0-9-]{3,64}$/.test(id)) return new Response(null, { status: 400 });
    if (!anahtarGecerli(istek.headers.get("x-frameby-anahtar"))) return new Response(null, { status: 401 });
    const dosya = await get(`kareler/${id}.jpg`, { access: "private" });
    if (!dosya || dosya.statusCode !== 200) return new Response(null, { status: 404 });
    return new Response(dosya.stream, {
      headers: { "content-type": "image/jpeg", "cache-control": "private, max-age=86400" },
    });
  },
};

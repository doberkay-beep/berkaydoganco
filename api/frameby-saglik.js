export default {
  fetch() {
    return Response.json({ ok: true, blob: Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID), imza: Boolean(process.env.FRAMEBY_IMZA) });
  },
};

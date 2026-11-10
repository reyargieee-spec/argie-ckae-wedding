/* Small data layer. Uses Supabase when config.js has keys,
   otherwise a local demo store (this browser only). */
(function () {
  const W = window.WEDDING || {};
  const live = !!(W.supabaseUrl && W.supabaseAnonKey && window.supabase);
  const sb = live ? window.supabase.createClient(W.supabaseUrl, W.supabaseAnonKey) : null;
  const BUCKET = "wedding-photos";
  const chan = ("BroadcastChannel" in window) ? new BroadcastChannel("wedding-demo") : null;
  const listeners = {};

  const lsGet = (k) => { try { return JSON.parse(localStorage.getItem("wd_" + k) || "[]"); } catch (e) { return []; } };
  const lsSet = (k, v) => { try { localStorage.setItem("wd_" + k, JSON.stringify(v)); return true; } catch (e) { return false; } };
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  function notify(table) {
    (listeners[table] || []).forEach((fn) => fn());
  }
  if (chan) chan.onmessage = (e) => notify(e.data);

  async function list(table, { limit = 500 } = {}) {
    if (!live) return lsGet(table).slice().reverse().slice(0, limit);
    const { data, error } = await sb.from(table).select("*").order("created_at", { ascending: false }).limit(limit);
    if (error) throw error;
    return data || [];
  }

  async function insert(table, row) {
    if (!live) {
      const rows = lsGet(table);
      const full = Object.assign({ id: uid(), created_at: new Date().toISOString() }, row);
      rows.push(full);
      if (!lsSet(table, rows)) throw new Error("Demo storage is full. Connect Supabase to store more.");
      notify(table); if (chan) chan.postMessage(table);
      return full;
    }
    const { error } = await sb.from(table).insert(row);
    if (error) throw error;
    notify(table);
    return row;
  }

  // Resize an image file to a JPEG blob before upload
  function compress(file, max = 1800, quality = 0.82) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const s = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        c.toBlob((b) => b ? resolve(b) : reject(new Error("Could not read that photo.")), "image/jpeg", quality);
      };
      img.onerror = () => reject(new Error("That file doesn't look like a photo."));
      img.src = url;
    });
  }

  async function uploadPhoto(file) {
    if (!live) {
      const blob = await compress(file, 900, 0.7);
      return await new Promise((res) => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(blob); });
    }
    const blob = await compress(file);
    const path = new Date().toISOString().slice(0, 10) + "/" + uid() + ".jpg";
    const { error } = await sb.storage.from(BUCKET).upload(path, blob, { contentType: "image/jpeg" });
    if (error) throw error;
    return sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
  }

  // Refresh on own changes, other tabs (demo), and every 15s (live)
  function watch(table, fn) {
    (listeners[table] = listeners[table] || []).push(fn);
    fn();
    if (live) setInterval(() => { if (!document.hidden) fn(); }, 15000);
  }

  window.Store = { live, list, insert, uploadPhoto, watch };
})();

export default async function handler(req, res) {
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw9suZC3kmxE0JqbkLthh9_6hIMlns7mfSJpaqGK6ZMFEpO1GmbaSvoVoLEPrZTopjQ-w/exec";

  try {
    if (req.method === "GET") {
      const url = `${SCRIPT_URL}?action=${encodeURIComponent(req.query.action || "load")}`;
      const r = await fetch(url);
      const txt = await r.text();
      res.setHeader("Content-Type", "application/json");
      return res.status(200).send(txt);
    }
    
    if (req.method === "POST") {
      const r = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: typeof req.body === "string" ? req.body : JSON.stringify(req.body),
      });
      const txt = await r.text();
      res.setHeader("Content-Type", "application/json");
      return res.status(200).send(txt);
    }

    return res.status(405).json({ ok: false, error: "Method not allowed" });
  } catch (e) {
    return res.status(500).json({ ok: false, error: String(e) });
  }
}

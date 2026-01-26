const API_URL = "https://script.google.com/macros/s/AKfycbxIOHLLxjtOeUKvlKmP6LU1gjBKHacFOn8_I11I8a9pcH5SnGZ9kyivWag64wsnE1yWcA/exec";

export async function loadAllData() {
  const res = await fetch(`${API_URL}?action=load`);
  const json = await res.json();
  if (!json.ok) throw new Error(json.error || "Erro ao carregar dados");
  return json;
}

export async function saveAllData(data: {
  products: any[];
  candidates: any[];
  history: any[];
}) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "save",
      products: data.products,
      candidates: data.candidates,
      history: data.history,
    }),
  });

  const json = await res.json();
  if (!json.ok) throw new Error(json.error || "Erro ao salvar dados");
  return json;
}

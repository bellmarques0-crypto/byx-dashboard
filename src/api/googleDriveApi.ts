const API_URL = "/api/byx";

type CandidatesMap = Record<string, any[]>;

function flattenCandidates(candidates: CandidatesMap) {
  // vira uma lista: [{ productId, index, ...campos }]
  const out: any[] = [];
  Object.entries(candidates || {}).forEach(([productId, list]) => {
    (list || []).forEach((c, index) => {
      out.push({ productId, index, ...c });
    });
  });
  return out;
}

function unflattenCandidates(rows: any[]) {
  const out: CandidatesMap = {};
  (rows || []).forEach((r) => {
    const productId = r.productId || "";
    if (!productId) return;
    if (!out[productId]) out[productId] = [];

    const idx = Number(r.index);
    const candidate = { ...r };
    delete candidate.productId;
    delete candidate.index;

    if (Number.isFinite(idx) && idx >= 0) out[productId][idx] = candidate;
    else out[productId].push(candidate);
  });

  // garante que não tem buracos "undefined"
  Object.keys(out).forEach((k) => {
    out[k] = (out[k] || []).map((x) => x || {
      nome: "", horarioTrabalho: "", instrutor: "", horarioCurso: "",
      inicioCurso: "", fimCurso: "", aso: "", admissao: "", inicioOperacao: "", observacao: ""
    });
  });

  return out;
}

export async function loadAllData() {
  const res = await fetch(`${API_URL}?action=load`);
  const json = await res.json();
  if (!json.ok) throw new Error(json.error || "Erro ao carregar dados");

  // candidates volta como lista, converte pra mapa de novo:
  return {
    ...json,
    candidates: unflattenCandidates(json.candidates || []),
  };
}

export async function saveAllData(data: {
  products: any[];
  candidates: CandidatesMap;
  history: any[];
  username: string;
  password: string;
}) {
  const res = await fetch(API_URL, {
    method: "POST",
    redirect: "follow",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      action: "save",
      username: data.username,
      password: data.password,
      products: data.products || [],
      candidates: flattenCandidates(data.candidates || {}),
      history: data.history || [],
    }),
  });
//Histórico de salvamento
  export async function loadSaveLogs() {
  const res = await fetch(`${API_URL}?action=loadSaveLogs`);
  const json = await res.json();
  if (!json.ok) throw new Error(json.error || "Erro ao carregar logs");
  return json.logs || [];
}

  
  const json = await res.json();
  if (!json.ok) throw new Error(json.error || "Erro ao salvar dados");
  return json;
}

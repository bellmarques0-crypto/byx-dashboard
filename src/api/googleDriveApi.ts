const API_URL =
  "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjMfO2NlJlcZw7XMRStOpPY-NAKBJEKamWhBA_vuOIfxzr9UzGvso7U-ReskPRzFL_Hm6ltWt2-qaE6Dvdd7OHntLDMx_yJ_F3T4Hav3wfXGTHJBd6d4ksk252xB7RAQxq3TTA8mc2d0lqbntXa1IC06NGe8-pt9kcZRu8q-F0xGEVtoLJsY3R04bBPFa5jNAnhuqPMHcy3TXHKQKB4xFaY7eOJ13q5FU9ADbgM98n1YzYVWdZuy9hlA6ZqkUJKl-GFLF0Iwah9UcOT4hMhvDcCRsh1UJeFE_JVhjpz87_Hj-4On8Q&lib=MSMnv9-6QLNULCvvVpCX50xfyjpLQm4Ks";

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

  const json = await res.json();
  if (!json.ok) throw new Error(json.error || "Erro ao salvar dados");
  return json;
}

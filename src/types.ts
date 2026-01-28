export interface ProductSummary {
  id: string;
  name: string;
  jornada: string; // 👈 NOVO
  hc: number;
  pa: number;
  hcGordura: number;
  real: number;
}

export interface Candidate {
  nome: string;
  horarioTrabalho: string;
  instrutor: string;
  horarioCurso: string;
  inicioCurso: string;
  fimCurso: string;
  aso: string;
  admissao: string;
  inicioOperacao: string;
  observacao: string;
}

export interface HistoryEntry extends Candidate {
  id: string;
  produtoOrigem: string;

  // Data em que foi jogado para o histórico
  dataAdmissaoRegistro: string;

  // Novo: diferencia ADMITIDO e DESISTÊNCIA
  tipo: "ADMITIDO" | "DESISTENCIA";

  // Só para desistência
  dataDesistencia?: string;
  motivoDesistencia?: string;
}

export type ViewMode =
  | "SUMMARY"
  | "PRODUCT_DETAIL"
  | "HISTORY"
  | "SAVE_LOGS";

export interface DashboardState {
  view: ViewMode;
  selectedProductId: string | null;
}

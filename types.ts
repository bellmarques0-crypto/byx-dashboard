
export interface ProductSummary {
  id: string;
  name: string;
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
  dataAdmissaoRegistro: string;
}

export type ViewMode = 'SUMMARY' | 'PRODUCT_DETAIL' | 'HISTORY';

export interface DashboardState {
  view: ViewMode;
  selectedProductId: string | null;
}

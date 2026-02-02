
import { ProductSummary, Candidate } from './types';

export const INITIAL_PRODUCTS: ProductSummary[] = [
  { id: 'cartao', name: 'Cartão 6h20', hc: 0, pa: 0, hcGordura: 0, real: 0 },
  { id: 'cartao', name: 'Cartão 8h12', hc: 0, pa: 0, hcGordura: 0, real: 0 },
  { id: 'cartao', name: 'Cartão WPP', hc: 0, pa: 0, hcGordura: 0, real: 0 },
  { id: 'emprestimos', name: 'Empréstimos 6h20', hc: 8, pa: 6, hcGordura: 0, real: 0 },
  { id: 'emprestimos', name: 'Empréstimos 8h12', hc: 8, pa: 6, hcGordura: 0, real: 0 },
  { id: 'retencao', name: 'Retenção', hc: 0, pa: 0, hcGordura: 0, real: 0 },
  { id: 'pine', name: 'Pine', hc: 0, pa: 0, hcGordura: 0, real: 0 },
];

export const INITIAL_CANDIDATES: Record<string, Candidate[]> = {
  'cartao': [
    { nome: '', horarioTrabalho: '', instrutor: '', horarioCurso: '', inicioCurso: '', fimCurso: ' ', aso: '', admissao: '', inicioOperacao: '', observacao: '' }
  ],
  'emprestimos': [
     { nome: '', horarioTrabalho: '', instrutor: '', horarioCurso: '', inicioCurso: '', fimCurso: ' ', aso: '', admissao: '', inicioOperacao: '', observacao: '' }
  ],
  'retencao': [
    { nome: '', horarioTrabalho: '', instrutor: '', horarioCurso: '', inicioCurso: '', fimCurso: ' ', aso: '', admissao: '', inicioOperacao: '', observacao: '' }
  ],
  'pine': [
     { nome: '', horarioTrabalho: '', instrutor: '', horarioCurso: '', inicioCurso: '', fimCurso: ' ', aso: '', admissao: '', inicioOperacao: '', observacao: '' }
  ]
};

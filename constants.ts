
import { ProductSummary, Candidate } from './types';

export const INITIAL_PRODUCTS: ProductSummary[] = [
  { id: 'cartao', name: 'Cartão', hc: 48, pa: 24, hcGordura: 60, real: 27 },
  { id: 'emprestimos', name: 'Empréstimos', hc: 8, pa: 6, hcGordura: 9, real: 7 },
  { id: 'retencao', name: 'Retenção', hc: 4, pa: 4, hcGordura: 4, real: 5 },
  { id: 'pine', name: 'Pine', hc: 23, pa: 23, hcGordura: 34, real: 22 },
];

export const INITIAL_CANDIDATES: Record<string, Candidate[]> = {
  'cartao': [
    { nome: 'GABRIELA BRUNA ALMEIDA DE OLIVEIRA', horarioTrabalho: '14:00 ás 20:20 SEG-SAB', instrutor: 'VITORIA', horarioCurso: '08:30 às 12:00', inicioCurso: '15/11/2026', fimCurso: '21/11/2026', aso: '21/11/2026', admissao: '21/11/2026', inicioOperacao: '', observacao: '' },
    { nome: 'GABRIELLE APARECIDA SILVA AZEVEDO', horarioTrabalho: '14:00 ás 20:20 SEG-SAB', instrutor: 'VITORIA', horarioCurso: '08:30 às 12:00', inicioCurso: '15/11/2026', fimCurso: '21/11/2026', aso: '21/11/2026', admissao: '21/11/2026', inicioOperacao: '', observacao: '' },
    { nome: 'MARCOS VINICIUS SANTOS', horarioTrabalho: '14:00 ás 20:20 SEG-SAB', instrutor: 'VITORIA', horarioCurso: '08:30 às 12:00', inicioCurso: '16/11/2026', fimCurso: '22/11/2026', aso: '22/11/2026', admissao: '22/11/2026', inicioOperacao: '', observacao: '' },
    { nome: 'ANA PAULA FERREIRA', horarioTrabalho: '11:40 ás 18:00 SEG-SAB', instrutor: 'RICARDO', horarioCurso: '09:00 às 12:30', inicioCurso: '17/11/2026', fimCurso: '23/11/2026', aso: '23/11/2026', admissao: '23/11/2026', inicioOperacao: '', observacao: '' }
  ],
  'emprestimos': [
    { nome: 'JOÃO PEDRO OLIVEIRA', horarioTrabalho: '11:00 ás 19:12 SEG-SEX', instrutor: 'JULIANA', horarioCurso: '13:00 às 16:30', inicioCurso: '10/11/2026', fimCurso: '16/11/2026', aso: '16/11/2026', admissao: '16/11/2026', inicioOperacao: '', observacao: '' },
    { nome: 'CARLA MENDES SOUZA', horarioTrabalho: '11:00 ás 19:12 SEG-SEX', instrutor: 'JULIANA', horarioCurso: '13:00 às 16:30', inicioCurso: '11/11/2026', fimCurso: '17/11/2026', aso: '17/11/2026', admissao: '17/11/2026', inicioOperacao: '', observacao: '' }
  ],
  'retencao': [
    { nome: 'BEATRIZ REIS', horarioTrabalho: '14:00 ás 20:20 SEG-SAB', instrutor: 'VITORIA', horarioCurso: '08:30 às 12:00', inicioCurso: '12/11/2026', fimCurso: '18/11/2026', aso: '18/11/2026', admissao: '18/11/2026', inicioOperacao: '', observacao: '' }
  ],
  'pine': [
    { nome: 'LUCAS SILVA MAGALHÃES', horarioTrabalho: '11:40 ás 18:00 SEG-SAB', instrutor: 'RICARDO', horarioCurso: '09:00 às 12:30', inicioCurso: '05/11/2026', fimCurso: '11/11/2026', aso: '11/11/2026', admissao: '11/11/2026', inicioOperacao: '12/11/2026', observacao: '' },
    { nome: 'FERNANDA LIMA', horarioTrabalho: '11:40 ás 18:00 SEG-SAB', instrutor: 'RICARDO', horarioCurso: '09:00 às 12:30', inicioCurso: '05/11/2026', fimCurso: '11/11/2026', aso: '11/11/2026', admissao: '11/11/2026', inicioOperacao: '12/11/2026', observacao: '' }
  ]
};

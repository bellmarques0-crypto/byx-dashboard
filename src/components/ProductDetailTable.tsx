
import React from 'react';
import { Candidate } from '../types';

interface Props {
  productId: string;
  vagas: number;
  candidates: Candidate[];
  onUpdateCandidate: (productId: string, index: number, field: keyof Candidate, value: any) => void;
}

export const ProductDetailTable: React.FC<Props> = ({ productId, vagas, candidates, onUpdateCandidate }) => {
  
  const HORARIOS_TRABALHO = [
    "11:00 ás 19:12 SEG-SEX",
    "11:40 ás 18:00 SEG-SAB",
    "14:00 ás 20:20 SEG-SAB"
  ];

  const renderCell = (index: number, field: keyof Candidate, type = "text") => {
    const value = candidates[index]?.[field] ?? '';
    return (
      <input
        type={type}
        value={value}
        onChange={(e) => onUpdateCandidate(productId, index, field, e.target.value)}
        placeholder="..."
        className="w-full bg-transparent focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-md px-2 py-1 text-[12px] text-black font-semibold transition-all"
      />
    );
  };

  const renderHorarioSelect = (index: number) => {
    const value = candidates[index]?.horarioTrabalho ?? '';
    return (
      <div className="relative group w-full">
        <select
          value={value}
          onChange={(e) => onUpdateCandidate(productId, index, 'horarioTrabalho', e.target.value)}
          className="w-full bg-transparent focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-md px-2 py-1 text-[12px] text-black font-semibold transition-all cursor-pointer appearance-none pr-8"
        >
          <option value="">Selecione...</option>
          {HORARIOS_TRABALHO.map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500 group-hover:text-blue-600">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-12">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-[12px] text-left border-collapse whitespace-nowrap">
          <thead className="bg-[#4a5f9e] text-white uppercase font-bold text-[11px]">
            <tr>
              <th className="px-4 py-4 border-r border-white/10 text-center w-20 sticky left-0 bg-[#4a5f9e] z-10">ITEM</th>
              <th className="px-6 py-4 border-r border-white/10 min-w-[500px]">NOME DO CANDIDATO</th>
              <th className="px-6 py-4 border-r border-white/10 min-w-[220px]">HORÁRIO TRABALHO</th>
              <th className="px-6 py-4 border-r border-white/10 min-w-90">INSTRUTOR</th>
              <th className="px-6 py-4 border-r border-white/10 min-w-[220px]">HORÁRIO CURSO</th>
              <th className="px-6 py-4 border-r border-white/10 min-w-[200px] text-emerald-100 bg-emerald-800/50 text-center">INÍCIO CURSO</th>
              <th className="px-6 py-4 border-r border-white/10 min-w-[200px] text-center">FIM CURSO</th>
              <th className="px-6 py-4 border-r border-white/10 min-w-[200px] text-center">ASO</th>
              <th className="px-6 py-4 border-r border-white/10 min-w-[200px] text-center">ADMISSÃO</th>
              <th className="px-6 py-4 border-r border-white/10 min-w-[220px] text-center">INÍCIO NA OPERAÇÃO</th>
              <th className="px-6 py-4 border-r border-white/10 min-w-[300px]">OBS</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: vagas }).map((_, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-blue-50/60' : 'bg-white hover:bg-blue-100/40 transition-colors'}>
                <td className="px-4 py-3 border-b border-gray-100 text-center font-bold text-black opacity-60 sticky left-0 z-10 bg-inherit shadow-[2px_0_4px_rgba(0,0,0,0.05)] text-[11px]">
                  {idx + 1}
                </td>
                <td className="px-6 py-3 border-b border-gray-100 font-bold text-black tracking-tight">
                  {renderCell(idx, 'nome')}
                </td>
                <td className="px-4 py-3 border-b border-gray-100 font-bold text-black">
                  {renderHorarioSelect(idx)}
                </td>
                <td className="px-6 py-3 border-b border-gray-100 font-bold text-black uppercase">
                  {renderCell(idx, 'instrutor')}
                </td>
                <td className="px-6 py-3 border-b border-gray-100 font-bold text-black">
                  {renderCell(idx, 'horarioCurso')}
                </td>
                <td className="px-6 py-3 border-b border-emerald-100 bg-emerald-50/50 font-black text-black text-center">
                  {renderCell(idx, 'inicioCurso')}
                </td>
                <td className="px-6 py-3 border-b border-gray-100 font-bold text-black text-center">
                  {renderCell(idx, 'fimCurso')}
                </td>
                <td className="px-6 py-3 border-b border-gray-100 font-bold text-black text-center">
                  {renderCell(idx, 'aso')}
                </td>
                <td className="px-6 py-3 border-b border-gray-100 font-bold text-black text-center">
                  {renderCell(idx, 'admissao')}
                </td>
                <td className="px-6 py-3 border-b border-gray-100 font-bold text-black text-center">
                  {renderCell(idx, 'inicioOperacao')}
                </td>
                <td className="px-6 py-3 border-b border-gray-100 italic font-medium text-black">
                  {renderCell(idx, 'observacao')}
                </td>
              </tr>
            ))}
            {vagas === 0 && (
              <tr>
                <td colSpan={11} className="px-8 py-32 text-center text-black font-bold text-xl italic bg-gray-50/50">
                  Nenhuma vaga cadastrada para este produto no Quadro Geral.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

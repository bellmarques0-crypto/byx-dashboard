
import React, { useState } from 'react';
import { HistoryEntry } from '../types';

interface Props {
  data: HistoryEntry[];
  onClearHistory: () => void;
}

export const HistoryTable: React.FC<Props> = ({ data, onClearHistory }) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleClearClick = () => {
    if (isConfirming) {
      onClearHistory();
      setIsConfirming(false);
    } else {
      setIsConfirming(true);
      // Volta ao estado normal após 3 segundos se não confirmar
      setTimeout(() => setIsConfirming(false), 3000);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-12 animate-in fade-in duration-500">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-purple-50/30">
        <div>
          <h2 className="text-lg font-bold text-purple-900">Histórico</h2>
          <p className="text-xs text-purple-700">Admitidos e desistências registradas.</p>
        </div>
        <button 
          onClick={handleClearClick}
          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-tight transition-all shadow-sm border ${
            isConfirming 
              ? 'bg-red-600 text-white border-red-700 animate-pulse scale-105' 
              : 'text-red-600 border-red-200 bg-red-50 hover:bg-red-100'
          }`}
        >
          {isConfirming ? "CLIQUE PARA CONFIRMAR LIMPEZA" : "Limpar Histórico"}
        </button>
      </div>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-[11px] text-left border-collapse whitespace-nowrap">
          <thead className="bg-[#2d112b] text-white uppercase font-bold">
            <tr>
              <th className="px-4 py-3 border-r border-white/10 text-center">DATA REGISTRO</th>
              <th className="px-6 py-3 border-r border-white/10">NOME DO PROFISSIONAL</th>
              <th className="px-6 py-3 border-r border-white/10 text-center">PRODUTO</th>
              <th className="px-6 py-3 border-r border-white/10">HORÁRIO</th>
              <th className="px-6 py-3 border-r border-white/10">INSTRUTOR</th>
              <th className="px-6 py-3 border-r border-white/10 text-center">ADMISSÃO</th>
              <th className="px-6 py-3 border-r border-white/10 text-center">INÍCIO OPERAÇÃO</th>
              <th className="px-6 py-3">OBSERVAÇÕES ANTERIORES</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((entry, idx) => (
                <tr key={entry.id} className={idx % 2 === 0 ? 'bg-purple-50/20' : 'bg-white hover:bg-purple-100/30 transition-colors'}>
                  <td className="px-4 py-2.5 border-b border-gray-100 text-center font-bold text-purple-800">
                    {entry.dataAdmissaoRegistro}
                  </td>
                  <td className="px-6 py-2.5 border-b border-gray-100 font-bold text-black uppercase">
                    {entry.nome}
                  </td>
                  <td className="px-6 py-2.5 border-b border-gray-100 text-center">
                    <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-black">
                      {entry.produtoOrigem}
                    </span>
                  </td>
                  {/* Dados com letras cinza escuro conforme solicitado */}
                  <td className="px-6 py-2.5 border-b border-gray-100 font-medium text-gray-700">
                    {entry.horarioTrabalho}
                  </td>
                  <td className="px-6 py-2.5 border-b border-gray-100 uppercase text-gray-700">
                    {entry.instrutor}
                  </td>
                  <td className="px-6 py-2.5 border-b border-gray-100 text-center font-bold text-gray-700">
                    {entry.admissao}
                  </td>
                  <td className="px-6 py-2.5 border-b border-gray-100 text-center font-bold text-gray-700">
                    {entry.inicioOperacao}
                  </td>
                  <td className="px-6 py-2.5 border-b border-gray-100 italic text-gray-700">
                    {entry.observacao}
                  </td>
                </tr>
              )).reverse() 
            ) : (
              <tr>
                <td colSpan={8} className="px-8 py-20 text-center text-gray-400 font-medium italic">
                  Nenhum registro de admissão encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { HistoryEntry } from "../types";

interface Props {
  data: HistoryEntry[];
  onClearHistory: () => void;
  onRestore: (historyId: string) => void; // ✅ novo
}


export function formatDateBR(value?: string) {
  if (!value) return "-";

  // Se já estiver no formato BR, devolve como está
  if (typeof value === "string" && value.includes("/")) return value;

  // Aceita "YYYY-MM-DD" ou ISO
  const d = new Date(value);
  if (isNaN(d.getTime())) return "-";

  return d.toLocaleDateString("pt-BR");
}

function diffDays(start?: string, end?: string) {
  if (!start || !end) return "";
  const s = new Date(start);
  const e = new Date(end);
  if (isNaN(s.getTime()) || isNaN(e.getTime())) return "";
  const ms = e.getTime() - s.getTime();
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  return `${Math.max(0, days)} dia(s)`;
}

export const HistoryTable: React.FC<Props> = ({ data, onClearHistory }) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleClearClick = () => {
    if (isConfirming) {
      onClearHistory();
      setIsConfirming(false);
    } else {
      setIsConfirming(true);
      setTimeout(() => setIsConfirming(false), 3000);
    }
  };

  const rows = [...(data || [])].reverse();

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
              ? "bg-red-600 text-white border-red-700 animate-pulse scale-105"
              : "text-red-600 border-red-200 bg-red-50 hover:bg-red-100"
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
              <th className="px-6 py-3 border-r border-white/10 text-center">INÍCIO CURSO</th>

              {/* NOVAS COLUNAS (DESISTÊNCIA) */}
              <th className="px-6 py-3 border-r border-white/10 text-center">DATA DESISTÊNCIA</th>
              <th className="px-6 py-3 border-r border-white/10">MOTIVO DESISTÊNCIA</th>
              <th className="px-6 py-3 border-r border-white/10 text-center">TEMPO EM TREINAMENTO</th>
              <th className="px-6 py-3">OBSERVAÇÕES</th>
              <th className="px-6 py-3 text-center">AÇÕES</th>

            </tr>
          </thead>

          <tbody>
            {rows.length > 0 ? (
              rows.map((entry, idx) => {
                const e: any = entry; // para suportar campos novos sem quebrar o type
                const dataDesistencia = e.dataDesistencia || "";
                const motivoDesistencia = e.motivoDesistencia || "";
                const tempoTreinamento = diffDays(e.inicioCurso, dataDesistencia);

                return (
                  <tr
                    key={entry.id}
                    className={
                      idx % 2 === 0
                        ? "bg-purple-50/20"
                        : "bg-white hover:bg-purple-100/30 transition-colors"
                    }
                  >
                    <td className="px-4 py-2.5 border-b border-gray-100 text-center font-bold text-purple-800">
                      {formatDateBR(entry.dataAdmissaoRegistro)}
                    </td>

                    <td className="px-6 py-2.5 border-b border-gray-100 font-bold text-black uppercase">
                      {entry.nome}
                    </td>

                    <td className="px-6 py-2.5 border-b border-gray-100 text-center">
                      <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-black">
                        {entry.produtoOrigem}
                      </span>
                    </td>

                    <td className="px-6 py-2.5 border-b border-gray-100 font-medium text-gray-700">
                      {entry.horarioTrabalho}
                    </td>

                    <td className="px-6 py-2.5 border-b border-gray-100 uppercase text-gray-700">
                      {entry.instrutor}
                    </td>

                    <td className="px-6 py-2.5 border-b border-gray-100 text-center font-bold text-gray-700">
                      {formatDateBR(entry.admissao)}
                    </td>
                    
                    <td className="px-6 py-2.5 border-b border-gray-100 text-center font-bold text-gray-700">
                      {formatDateBR(entry.inicioOperacao)}
                    </td>
                    
                    <td className="px-6 py-2.5 border-b border-gray-100 text-center font-bold text-gray-700">
                      {formatDateBR(entry.inicioCurso)}
                    </td>
                    
                    {/* DATA DESISTÊNCIA */}
                    <td className="px-6 py-2.5 border-b border-gray-100 text-center font-bold text-gray-700">
                      {formatDateBR(entry.dataDesistencia)}
                    </td>


                    {/* MOTIVO DESISTÊNCIA */}
                    <td className="px-6 py-2.5 border-b border-gray-100 text-gray-700">
                      {motivoDesistencia || "-"}
                    </td>

                    {/* TEMPO EM TREINAMENTO */}
                    <td className="px-6 py-2.5 border-b border-gray-100 text-center font-bold text-gray-700">
                      {tempoTreinamento || "-"}
                    </td>

                    <td className="px-6 py-2.5 border-b border-gray-100 italic text-gray-700">
                      {entry.observacao}
                    </td>

                    <td className="px-6 py-2.5 border-b border-gray-100 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRestore(entry.id);
                        }}
                        className="px-3 py-1 rounded bg-blue-600 text-white font-bold text-[10px] hover:bg-blue-700"
                      >
                        VOLTAR
                      </button>
                    </td>

                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={11} className="px-8 py-20 text-center text-gray-400 font-medium italic">
                  Nenhum registro encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

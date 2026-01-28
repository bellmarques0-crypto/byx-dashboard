import React from "react";

type SaveLog = {
  dataHora?: string;
  nome?: string;
  qtdProdutos?: number | string;
  qtdCandidatos?: number | string;
  qtdHistorico?: number | string;
};

export const SaveLogsTable: React.FC<{ data: SaveLog[] }> = ({ data }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-12">
      <div className="p-4 border-b border-gray-100 bg-slate-50/50">
        <h2 className="text-lg font-bold text-slate-900">Histórico de Salvamentos</h2>
        <p className="text-xs text-slate-600">Registros de quem salvou e quantos itens existiam.</p>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-[11px] text-left border-collapse whitespace-nowrap">
          <thead className="bg-[#111827] text-white uppercase font-bold">
            <tr>
              <th className="px-4 py-3 border-r border-white/10">DATA/HORA</th>
              <th className="px-4 py-3 border-r border-white/10">NOME</th>
              <th className="px-4 py-3 border-r border-white/10 text-center">PRODUTOS</th>
              <th className="px-4 py-3 border-r border-white/10 text-center">CANDIDATOS</th>
              <th className="px-4 py-3 text-center">HISTÓRICO</th>
            </tr>
          </thead>

          <tbody>
            {data?.length ? (
              [...data].reverse().map((r, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-slate-50/40" : "bg-white"}>
                  <td className="px-4 py-2.5 border-b border-gray-100 font-bold text-slate-800">
                    {r.dataHora || "-"}
                  </td>
                  <td className="px-4 py-2.5 border-b border-gray-100 font-bold text-slate-900">
                    {r.nome || "-"}
                  </td>
                  <td className="px-4 py-2.5 border-b border-gray-100 text-center font-bold text-slate-700">
                    {r.qtdProdutos ?? 0}
                  </td>
                  <td className="px-4 py-2.5 border-b border-gray-100 text-center font-bold text-slate-700">
                    {r.qtdCandidatos ?? 0}
                  </td>
                  <td className="px-4 py-2.5 border-b border-gray-100 text-center font-bold text-slate-700">
                    {r.qtdHistorico ?? 0}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-medium italic">
                  Nenhum salvamento registrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

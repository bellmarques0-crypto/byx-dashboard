
import React from 'react';
import { ProductSummary } from '../types';

interface CalculatedProduct extends ProductSummary {
  vagas: number;
  emCurso: number;
  rs: number;
}

interface Props {
  data: CalculatedProduct[];
  onUpdate: (id: string, field: keyof ProductSummary, value: any) => void;
  onRowClick: (id: string) => void;
}

export const SummaryTable: React.FC<Props> = ({ data, onUpdate, onRowClick }) => {
  const totals = data.reduce((acc, curr) => ({
    hc: acc.hc + curr.hc,
    pa: acc.pa + curr.pa,
    hcGordura: acc.hcGordura + curr.hcGordura,
    real: acc.real + curr.real,
    vagas: acc.vagas + curr.vagas,
    emCurso: acc.emCurso + curr.emCurso,
    rs: acc.rs + curr.rs,
  }), { hc: 0, pa: 0, hcGordura: 0, real: 0, vagas: 0, emCurso: 0, rs: 0 });

  const EditableCell = ({ value, id, field, type = "number", className = "" }: { value: any, id: string, field: keyof ProductSummary, type?: string, className?: string }) => (
    <input
      type={type}
      value={value}
      onChange={(e) => onUpdate(id, field, type === "number" ? Number(e.target.value) : e.target.value)}
      className={`w-full bg-transparent text-center focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1 transition-all ${className}`}
      onClick={(e) => e.stopPropagation()}
    />
  );

  return (
    <div className="overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-[#003366] text-white">
            <tr>
              <th className="px-4 py-3 font-semibold border-r border-white/10 min-w-[200px]">Produto</th>
              <th className="px-4 py-3 font-semibold border-r border-white/10 text-center">HC</th>
              <th className="px-4 py-3 font-semibold border-r border-white/10 text-center">PA</th>
              <th className="px-4 py-3 font-semibold border-r border-white/10 text-center">HC + gordura</th>
              <th className="px-4 py-3 font-semibold border-r border-white/10 text-center">Real</th>
              <th className="px-4 py-3 font-semibold bg-blue-700 text-center">Vagas</th>
              <th className="px-4 py-3 font-semibold bg-indigo-900 text-center">Em curso</th>
              <th className="px-4 py-3 font-semibold bg-slate-800 text-center">R&S</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr 
                key={row.id} 
                className={`${idx % 2 === 0 ? 'bg-blue-50/30' : 'bg-white'} hover:bg-gray-100 cursor-pointer`}
                onClick={() => onRowClick(row.id)}
              >
                <td className="px-4 py-3 border-b border-gray-200 font-bold text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    {row.name}
                  </div>
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-center">
                  <EditableCell value={row.hc} id={row.id} field="hc" className="text-gray-700 font-medium" />
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-center">
                  <EditableCell value={row.pa} id={row.id} field="pa" className="text-gray-700 font-medium" />
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-center">
                  <EditableCell value={row.hcGordura} id={row.id} field="hcGordura" className="font-bold text-blue-900" />
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-center">
                  <EditableCell value={row.real} id={row.id} field="real" className="font-bold text-indigo-800" />
                </td>
                <td className="px-4 py-3 border-b border-blue-700/20 text-center font-black text-white bg-blue-700/80">
                  {row.vagas}
                </td>
                <td className="px-4 py-3 border-b border-indigo-900/20 text-center font-black text-white bg-indigo-800/80">
                  {row.emCurso}
                </td>
                <td className="px-4 py-3 border-b border-slate-900/20 text-center font-black text-white bg-slate-700/80">
                  {row.rs}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-[#1a1a1a] text-white font-bold text-center">
            <tr>
              <td className="px-4 py-3 border-r border-white/5 text-right" colSpan={1}>TOTAL GERAL:</td>
              <td className="px-4 py-3 border-r border-white/5">{totals.hc}</td>
              <td className="px-4 py-3 border-r border-white/5">{totals.pa}</td>
              <td className="px-4 py-3 border-r border-white/5">{totals.hcGordura}</td>
              <td className="px-4 py-3 border-r border-white/5">{totals.real}</td>
              <td className="px-4 py-3 bg-blue-900/40 border-r border-white/5">{totals.vagas}</td>
              <td className="px-4 py-3 bg-indigo-900/40 border-r border-white/5">{totals.emCurso}</td>
              <td className="px-4 py-3 bg-slate-900/40">{totals.rs}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

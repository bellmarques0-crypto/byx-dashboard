
import React from 'react';
import { ViewMode, ProductSummary } from '../types';

interface CalculatedProduct extends ProductSummary {
  vagas: number;
  emCurso: number;
  rs: number;
}

interface Props {
  activeView: ViewMode;
  selectedProductId: string | null;
  products: CalculatedProduct[];
  onProductSelect: (id: string) => void;
  onHomeSelect: () => void;
  onHistorySelect: () => void;
}

export const Sidebar: React.FC<Props> = ({ 
  activeView, 
  selectedProductId, 
  products, 
  onProductSelect, 
  onHomeSelect,
  onHistorySelect
}) => {
  return (
    <aside className="w-72 bg-white border-r border-gray-200 hidden lg:flex flex-col shadow-sm">
      <div className="p-6">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Painel de Controle</h2>
        <nav className="space-y-1">
          <button
            onClick={onHomeSelect}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
              activeView === 'SUMMARY' 
                ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Capa (Quadro Geral)
          </button>

          <button
            onClick={onHistorySelect}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
              activeView === 'HISTORY' 
                ? 'bg-purple-50 text-purple-700 shadow-sm border border-purple-100' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Histórico
          </button>
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Detalhes por Produto</h2>
        <div className="space-y-1">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => onProductSelect(product.id)}
              className={`w-full flex flex-col items-start px-3 py-2 text-sm rounded-lg transition-all border ${
                selectedProductId === product.id && activeView === 'PRODUCT_DETAIL'
                  ? 'bg-blue-50 text-blue-700 shadow-sm border-blue-100' 
                  : 'text-gray-600 hover:bg-gray-50 border-transparent'
              }`}
            >
              <div className="flex justify-between w-full items-center">
                <span className="font-bold">{product.name}</span>
                {product.vagas > 0 ? (
                  <span className="bg-blue-100 text-blue-800 text-[9px] px-1.5 py-0.5 rounded-full font-black uppercase">
                    {product.vagas} Vagas
                  </span>
                ) : (
                  <span className="bg-gray-100 text-gray-500 text-[9px] px-1.5 py-0.5 rounded-full font-black uppercase">
                    Completo
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

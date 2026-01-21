
import React, { useState, useMemo, useEffect } from 'react';
import { SummaryTable } from './components/SummaryTable';
import { ProductDetailTable } from './components/ProductDetailTable';
import { HistoryTable } from './components/HistoryTable';
import { Sidebar } from './components/Sidebar';
import { DashboardHeader } from './components/DashboardHeader';
import { INITIAL_PRODUCTS, INITIAL_CANDIDATES } from './constants';
import { ViewMode, ProductSummary, Candidate, HistoryEntry } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('SUMMARY');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductSummary[]>(INITIAL_PRODUCTS);
  const [candidates, setCandidates] = useState<Record<string, Candidate[]>>(INITIAL_CANDIDATES);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('byx_products');
    const savedCandidates = localStorage.getItem('byx_candidates');
    const savedHistory = localStorage.getItem('byx_history');

    if (savedProducts) {
      try { setProducts(JSON.parse(savedProducts)); } catch (e) { console.error(e); }
    }
    if (savedCandidates) {
      try { setCandidates(JSON.parse(savedCandidates)); } catch (e) { console.error(e); }
    }
    if (savedHistory) {
      try { setHistory(JSON.parse(savedHistory)); } catch (e) { console.error(e); }
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('byx_products', JSON.stringify(products));
      localStorage.setItem('byx_candidates', JSON.stringify(candidates));
      localStorage.setItem('byx_history', JSON.stringify(history));
      setIsSaving(false);
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 3000);
    }, 600);
  };

  const handleUpdateProduct = (id: string, field: keyof ProductSummary, value: any) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleUpdateCandidate = (productId: string, index: number, field: keyof Candidate, value: any) => {
    const productName = products.find(p => p.id === productId)?.name || 'Desconhecido';
    
    // Check for "ADMITIDO" trigger
    if (field === 'observacao' && typeof value === 'string' && value.trim().toUpperCase() === 'ADMITIDO') {
      const candidateToAdmit = candidates[productId]?.[index];
      
      if (candidateToAdmit && candidateToAdmit.nome.trim() !== '') {
        // 1. Move to history
        const newHistoryEntry: HistoryEntry = {
          ...candidateToAdmit,
          observacao: value,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          produtoOrigem: productName,
          dataAdmissaoRegistro: new Date().toLocaleDateString('pt-BR')
        };
        setHistory(prev => [...prev, newHistoryEntry]);

        // 2. Clear candidate from the table row
        setCandidates(prev => {
          const productCandidates = [...(prev[productId] || [])];
          productCandidates[index] = {
            nome: '', horarioTrabalho: '', instrutor: '', horarioCurso: '',
            inicioCurso: '', fimCurso: '', aso: '', admissao: '', inicioOperacao: '', observacao: ''
          };
          return { ...prev, [productId]: productCandidates };
        });

        return;
      }
    }

    setCandidates(prev => {
      const productCandidates = [...(prev[productId] || [])];
      while (productCandidates.length <= index) {
        productCandidates.push({
          nome: '', horarioTrabalho: '', instrutor: '', horarioCurso: '',
          inicioCurso: '', fimCurso: '', aso: '', admissao: '', inicioOperacao: '', observacao: ''
        });
      }
      productCandidates[index] = { ...productCandidates[index], [field]: value };
      return { ...prev, [productId]: productCandidates };
    });
  };

  const productDataWithCalculations = useMemo(() => {
    return products.map(p => {
      const vagas = Math.max(0, p.hcGordura - p.real);
      const prodCandidates = candidates[p.id] || [];
      const emCurso = prodCandidates.slice(0, vagas).filter(c => c.inicioCurso?.trim() !== '').length;
      const rs = Math.max(0, vagas - emCurso);
      
      return { ...p, vagas, emCurso, rs };
    });
  }, [products, candidates]);

  const handleProductSelect = (id: string) => {
    setSelectedProductId(id);
    setView('PRODUCT_DETAIL');
  };

  const handleGoHome = () => {
    setView('SUMMARY');
    setSelectedProductId(null);
  };

  const handleGoHistory = () => {
    setView('HISTORY');
    setSelectedProductId(null);
  };

  const handleClearHistory = () => {
    // Atualiza estado e limpa storage imediatamente para ser definitivo
    setHistory([]);
    localStorage.setItem('byx_history', '[]');
  };

  const selectedProduct = productDataWithCalculations.find(p => p.id === selectedProductId);

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader 
        onHomeClick={handleGoHome} 
        onSaveClick={handleSave} 
        isSaving={isSaving}
        showSuccess={showSaveSuccess}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          activeView={view} 
          selectedProductId={selectedProductId}
          products={productDataWithCalculations}
          onProductSelect={handleProductSelect}
          onHomeSelect={handleGoHome}
          onHistorySelect={handleGoHistory}
        />

        <main className="flex-1 bg-gray-50 p-6 overflow-auto custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {view === 'SUMMARY' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <header>
                  <h1 className="text-2xl font-bold text-black">Quadro de Necessidade de Contratação</h1>
                </header>
                <SummaryTable 
                  data={productDataWithCalculations} 
                  onUpdate={handleUpdateProduct}
                  onRowClick={handleProductSelect} 
                />
              </div>
            )}

            {view === 'PRODUCT_DETAIL' && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <header className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold text-black">
                      Vagas Disponíveis: {selectedProduct?.vagas} para {selectedProduct?.name}
                    </h1>
                    <p className="text-black font-medium text-sm opacity-70">Digite "ADMITIDO" na coluna OBS para mover o candidato ao histórico.</p>
                  </div>
                  <button 
                    onClick={handleGoHome}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    Voltar para Capa
                  </button>
                </header>
                <ProductDetailTable 
                  productId={selectedProductId || ''} 
                  vagas={selectedProduct?.vagas || 0}
                  candidates={candidates[selectedProductId || ''] || []}
                  onUpdateCandidate={handleUpdateCandidate}
                />
              </div>
            )}

            {view === 'HISTORY' && (
              <div className="space-y-6 animate-in slide-in-from-bottom duration-300">
                <header className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold text-black">Histórico de Admissões</h1>
                  <button 
                    onClick={handleGoHome}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    Voltar para Capa
                  </button>
                </header>
                <HistoryTable data={history} onClearHistory={handleClearHistory} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;

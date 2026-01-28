import { loadAllData, saveAllData, loadSaveLogs } from "./api/googleDriveApi";
import React, { useState, useMemo, useEffect } from "react";
import { SummaryTable } from "./components/SummaryTable";
import { ProductDetailTable } from "./components/ProductDetailTable";
import { HistoryTable } from "./components/HistoryTable";
import { Sidebar } from "./components/Sidebar";
import { DashboardHeader } from "./components/DashboardHeader";
import { SaveLogsTable } from "./components/SaveLogsTable";
import { INITIAL_PRODUCTS, INITIAL_CANDIDATES } from "./constants";
import { ViewMode, ProductSummary, Candidate, HistoryEntry } from "./types";

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>("SUMMARY");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const [products, setProducts] = useState<ProductSummary[]>(INITIAL_PRODUCTS);
  const [candidates, setCandidates] = useState<Record<string, Candidate[]>>(INITIAL_CANDIDATES);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [saveLogs, setSaveLogs] = useState<any[]>([]);

  const [isSaving, setIsSaving] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  useEffect(() => {
    async function loadFromDrive() {
      try {
        const data = await loadAllData();
        setProducts(data.products || []);
        setCandidates(data.candidates || {});
        setHistory(data.history || []);

        const logs = await loadSaveLogs();
        setSaveLogs(logs || []);

        console.log("Dados carregados do Google Drive com sucesso!");
      } catch (err: any) {
        console.error(err);
        alert("Erro ao carregar do Google Drive: " + (err?.message || JSON.stringify(err)));
      }
    }

    loadFromDrive();
  }, []);

  const handleSave = async () => {
    const username = window.prompt("Usuário:");
    if (!username || !username.trim()) {
      alert("Salvamento cancelado.");
      return;
    }

    const password = window.prompt("Senha:");
    if (!password || !password.trim()) {
      alert("Salvamento cancelado.");
      return;
    }

    try {
      setIsSaving(true);

      await saveAllData({
        products,
        candidates,
        history,
        username: username.trim(),
        password: password.trim(),
      });

      // Recarrega logs após salvar (para aparecer o novo registro sem atualizar a página)
      const logs = await loadSaveLogs();
      setSaveLogs(logs || []);

      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 2000);

      alert("Dados salvos com sucesso!");
    } catch (err: any) {
      console.error(err);
      alert("Erro ao salvar: " + (err?.message || JSON.stringify(err)));
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateProduct = (id: string, field: keyof ProductSummary, value: any) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleUpdateCandidate = (
    productId: string,
    index: number,
    field: keyof Candidate,
    value: any
  ) => {
    const productName = products.find((p) => p.id === productId)?.name || "Desconhecido";

    // Check for "ADMITIDO/DESISTENCIA" trigger
    if (field === "observacao" && typeof value === "string") {
      const obs = value.trim().toUpperCase();

      const isAdmitido = obs === "ADMITIDO";
      const isDesistencia = obs === "DESISTÊNCIA" || obs === "DESISTENCIA";

      if (isAdmitido || isDesistencia) {
        const candidateToMove = candidates[productId]?.[index];

        if (candidateToMove && candidateToMove.nome?.trim() !== "") {
          let dataDesistencia = "";
          let motivoDesistencia = "";

          if (isDesistencia) {
            dataDesistencia = window.prompt("Data da desistência (YYYY-MM-DD):") || "";
            motivoDesistencia = window.prompt("Motivo da desistência:") || "";
          }

          const newHistoryEntry: any = {
            ...candidateToMove,
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            produtoOrigem: productName,
            dataAdmissaoRegistro: new Date().toLocaleDateString("pt-BR"),
            tipo: isDesistencia ? "DESISTENCIA" : "ADMITIDO",
            dataDesistencia,
            motivoDesistencia,
          };

          setHistory((prev) => [...prev, newHistoryEntry]);

          // limpar linha
          setCandidates((prev) => {
            const productCandidates = [...(prev[productId] || [])];
            productCandidates[index] = {
              nome: "",
              horarioTrabalho: "",
              instrutor: "",
              horarioCurso: "",
              inicioCurso: "",
              fimCurso: "",
              aso: "",
              admissao: "",
              inicioOperacao: "",
              observacao: "",
            };
            return { ...prev, [productId]: productCandidates };
          });

          return;
        }
      }
    }

    setCandidates((prev) => {
      const productCandidates = [...(prev[productId] || [])];
      while (productCandidates.length <= index) {
        productCandidates.push({
          nome: "",
          horarioTrabalho: "",
          instrutor: "",
          horarioCurso: "",
          inicioCurso: "",
          fimCurso: "",
          aso: "",
          admissao: "",
          inicioOperacao: "",
          observacao: "",
        });
      }
      productCandidates[index] = { ...productCandidates[index], [field]: value };
      return { ...prev, [productId]: productCandidates };
    });
  };

  const productDataWithCalculations = useMemo(() => {
    return products.map((p) => {
      const vagas = Math.max(0, p.hcGordura - p.real);
      const prodCandidates = candidates[p.id] || [];
      const emCurso = prodCandidates.slice(0, vagas).filter((c) => c.inicioCurso?.trim() !== "").length;
      const rs = Math.max(0, vagas - emCurso);

      return { ...p, vagas, emCurso, rs };
    });
  }, [products, candidates]);

  const handleProductSelect = (id: string) => {
    setSelectedProductId(id);
    setView("PRODUCT_DETAIL");
  };

  const handleGoHome = () => {
    setView("SUMMARY");
    setSelectedProductId(null);
  };

  const handleGoHistory = () => {
    setView("HISTORY");
    setSelectedProductId(null);
  };

  const handleGoSaveLogs = () => {
    setView("SAVE_LOGS");
    setSelectedProductId(null);
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.setItem("byx_history", "[]");
  };

  const selectedProduct = productDataWithCalculations.find((p) => p.id === selectedProductId);

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
            {view === "SUMMARY" && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <header className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-black">
                    Quadro de Necessidade de Contratação
                  </h1>

                  <button
                    onClick={handleGoSaveLogs}
                    className="px-4 py-2 text-sm font-bold text-white bg-slate-800 rounded-lg hover:bg-slate-900 transition"
                  >
                    Histórico de Salvamentos
                  </button>
                </header>

                <SummaryTable
                  data={productDataWithCalculations}
                  onUpdate={handleUpdateProduct}
                  onRowClick={handleProductSelect}
                />
              </div>
            )}

            {view === "PRODUCT_DETAIL" && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <header className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold text-black">
                      Vagas Disponíveis: {selectedProduct?.vagas} para {selectedProduct?.name}
                    </h1>
                    <p className="text-black font-medium text-sm opacity-70">
                      Apenas digite "ADMITIDO" ou "DESISTÊNCIA" após preencher tudo.
                    </p>
                  </div>

                  <button
                    onClick={handleGoHome}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    Voltar para Capa
                  </button>
                </header>

                <ProductDetailTable
                  productId={selectedProductId || ""}
                  vagas={selectedProduct?.vagas || 0}
                  candidates={candidates[selectedProductId || ""] || []}
                  onUpdateCandidate={handleUpdateCandidate}
                />
              </div>
            )}

            {view === "HISTORY" && (
              <div className="space-y-6 animate-in slide-in-from-bottom duration-300">
                <header className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold text-black">Histórico</h1>

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

            {view === "SAVE_LOGS" && (
              <div className="space-y-6 animate-in slide-in-from-bottom duration-300">
                <header className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold text-black">Histórico de Salvamentos</h1>

                  <button
                    onClick={handleGoHome}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    Voltar para Capa
                  </button>
                </header>

                <SaveLogsTable data={saveLogs} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;

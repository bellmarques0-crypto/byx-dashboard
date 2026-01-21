
import React from 'react';

interface Props {
  onHomeClick: () => void;
  onSaveClick: () => void;
  isSaving?: boolean;
  showSuccess?: boolean;
}

export const DashboardHeader: React.FC<Props> = ({ onHomeClick, onSaveClick, isSaving, showSuccess }) => {
  return (
    <header className="bg-[#003366] text-white py-3 px-6 shadow-md z-10 sticky top-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4 cursor-pointer" onClick={onHomeClick}>
          <div className="bg-white p-1 rounded-lg">
            {/* Logo da Proativa conforme solicitado */}
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Logotipo_Proativa.png/320px-Logotipo_Proativa.png" 
              alt="Proativa" 
              className="h-8 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/120x40?text=PROATIVA';
              }}
            />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none tracking-tight uppercase">CONTRATAÇÕES BYX</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {showSuccess && (
              <span className="text-blue-200 text-xs font-bold animate-in fade-in slide-in-from-right-2">
                ✓ Dados salvos com sucesso!
              </span>
            )}
            <button
              onClick={onSaveClick}
              disabled={isSaving}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all transform active:scale-95 ${
                isSaving 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-500 shadow-lg border border-blue-400/30'
              }`}
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Salvando...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  SALVAR DADOS
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

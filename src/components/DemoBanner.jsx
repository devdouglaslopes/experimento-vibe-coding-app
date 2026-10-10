import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function DemoBanner({ onResetData }) {
  return (
    <aside className="demo-disclaimer" aria-label="Aviso de ambiente demonstrativo">
      <div className="demo-disclaimer-content">
        <AlertTriangle size={18} aria-hidden="true" />
        <span>
          <strong>Ambiente de Demonstração:</strong> Protótipo com dados estritamente fictícios. Não utilize informações reais de pacientes.
        </span>
      </div>
      {onResetData && (
        <button
          onClick={onResetData}
          className="btn btn-secondary btn-sm"
          title="Restaura a lista inicial de atendimentos fictícios"
        >
          <RotateCcw size={14} aria-hidden="true" />
          Restaurar Dados Simulados
        </button>
      )}
    </aside>
  );
}

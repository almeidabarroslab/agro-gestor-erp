import React from 'react';
import LucideIcon from '../ui/LucideIcon';

const StockAlertCard = ({ insumosBaixoEstoque }) => {
  if (insumosBaixoEstoque.length === 0) return null;

  return (
    <div className="bg-rose-50 border border-rose-300 rounded-xl shadow-lg p-5 mb-8">
      <h3 className="text-xl font-bold text-rose-700 flex items-center mb-3">
        <LucideIcon
          name="AlertTriangle"
          className="w-6 h-6 mr-2 animate-pulse"
        />{" "}
        ALERTA: Estoque Crítico!
      </h3>
      <p className="text-sm text-gray-700 mb-3">
        Os seguintes **{insumosBaixoEstoque.length} insumos** estão com estoque
        abaixo de 10 unidades e requerem reposição imediata:
      </p>
      <div className="flex flex-wrap gap-2">
        {insumosBaixoEstoque.map((r) => (
          <span
            key={r.id}
            className="text-xs font-semibold px-3 py-1 bg-rose-200 text-rose-900 rounded-full"
          >
            {r.nome} ({r.estoque.toFixed(1)} {r.unidade})
          </span>
        ))}
      </div>
    </div>
  );
};

export default StockAlertCard;
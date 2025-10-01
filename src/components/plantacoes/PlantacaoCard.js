import React from 'react';
import LucideIcon from '../ui/LucideIcon';
import { formatarData, formatarMoeda, calcularDiasPlantio } from '../../utils/helpers';

const PlantacaoCard = ({
  plantacao,
  onEdit,
  onTrack,
  onYield,
  onDetails,
  onApplyInsumo,
  onPlanResources,
}) => {
  const dias = calcularDiasPlantio(plantacao.dataPlantio);
  const custoTotalInsumos =
    plantacao.aplicacoes?.reduce((sum, app) => sum + (app.custo || 0), 0) || 0;

  const renderRendimento = () => {
    if (plantacao.status === "Colhida" && plantacao.rendimentoFinal > 0) {
      return (
        <span className="text-sm font-semibold text-purple-600">
          <LucideIcon name="CheckSquare" className="inline w-4 h-4 mr-1" />{" "}
          {plantacao.rendimentoFinal} Ton/Ha (Colhida)
        </span>
      );
    }
    return (
      <span className="text-sm font-medium text-gray-500">
        <LucideIcon name="Gauge" className="inline w-4 h-4 mr-1" /> Rendimento:
        Pendente
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 border-t-4 border-teal-500 flex flex-col justify-between hover:shadow-xl transition duration-300">
      <div>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <LucideIcon name="Leaf" className="w-6 h-6 mr-2 text-teal-500" />
            {plantacao.nome}
          </h3>
          <div
            className={`px-3 py-1 text-xs font-semibold rounded-full shadow-inner ${
              plantacao.status === "Plantada"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-teal-100 text-teal-800"
            }`}
          >
            {plantacao.status}
          </div>
        </div>

        <p className="text-xs text-gray-500 font-semibold mb-2">
          Cultura: **{plantacao.cultura}**
        </p>
        <p className="text-sm text-gray-600 mb-2">
          **Área:** {plantacao.areaHa} Ha | **Plantio:**{" "}
          {formatarData(plantacao.dataPlantio)}
        </p>
        <p className="text-xs text-gray-500 mb-3">
          Ciclo de Plantio: **{dias} dias**
        </p>

        <div className="border-t border-gray-100 pt-3 mt-3 space-y-2">
          <div className="text-sm text-gray-700">
            **Custo Insumos:**{" "}
            <span className="font-semibold text-rose-600">
              {formatarMoeda(custoTotalInsumos)}
            </span>
          </div>
          {renderRendimento()}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-gray-100">
        <button
          onClick={() => onPlanResources(plantacao)}
          className="flex-1 flex items-center justify-center p-2 text-xs font-medium text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 transition shadow-md min-w-1/3"
        >
          <LucideIcon name="Calendar" className="w-4 h-4 mr-1" /> Plano de
          Insumos
        </button>
        <button
          onClick={() => onApplyInsumo(plantacao)}
          className="flex-1 flex items-center justify-center p-2 text-xs font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition shadow-md min-w-1/3"
        >
          <LucideIcon name="Leaf" className="w-4 h-4 mr-1" /> Aplicar Insumo
        </button>
        <button
          onClick={() => onTrack(plantacao)}
          className="flex-1 flex items-center justify-center p-2 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition shadow-md min-w-1/3"
        >
          <LucideIcon name="RefreshCw" className="w-4 h-4 mr-1" /> Medir
        </button>
        <button
          onClick={() => onDetails(plantacao)}
          className="flex-1 flex items-center justify-center p-2 text-xs font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition shadow-md min-w-1/3"
        >
          <LucideIcon name="Bot" className="w-4 h-4 mr-1" /> Análise IA
        </button>
        <button
          onClick={() => onYield(plantacao)}
          className="flex-1 flex items-center justify-center p-2 text-xs font-medium text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition shadow-md min-w-1/3"
        >
          <LucideIcon name="CheckSquare" className="w-4 h-4 mr-1" /> Colheita
        </button>
        <button
          onClick={() => onEdit(plantacao)}
          className="p-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          <LucideIcon name="Settings" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PlantacaoCard;
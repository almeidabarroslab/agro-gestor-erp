import React from 'react';
import LucideIcon from '../ui/LucideIcon';
import PlantacaoCard from './PlantacaoCard';

const PlantacoesView = ({ plantacoes, isLoading, error, openModal }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 flex items-center">
          <LucideIcon
            name="Leaf"
            className="w-6 h-6 mr-2 text-teal-600"
          />{" "}
          Gestão de Plantações
        </h2>
        <button
          onClick={() => openModal("cadastro_plantacao")}
          className="flex items-center px-4 py-2 bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-600 transition shadow-lg"
        >
          <LucideIcon name="Plus" className="w-5 h-5 mr-2" /> Nova
          Plantação
        </button>
      </div>
      {error && (
        <div
          className="bg-rose-100 border-l-4 border-rose-500 text-rose-700 p-4 mb-4 rounded-lg"
          role="alert"
        >
          <p className="font-bold">Erro de Dados</p>
          <p>{error}</p>
        </div>
      )}
      {isLoading ? (
        <div className="text-center p-12">
          <LucideIcon
            name="Tractor"
            className="w-12 h-12 animate-spin text-teal-500 mx-auto"
          />
          <p className="text-gray-500 mt-2">Carregando plantações...</p>
        </div>
      ) : plantacoes.length === 0 ? (
        <div className="text-center p-16 bg-white rounded-xl shadow-lg border-dashed border-2 border-gray-300">
          <p className="text-xl text-gray-500 mb-4">
            Nenhuma plantação cadastrada ainda.
          </p>
          <button
            onClick={() => openModal("cadastro_plantacao")}
            className="inline-flex items-center px-6 py-3 bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-600 transition shadow-xl"
          >
            <LucideIcon name="Plus" className="w-5 h-5 mr-2" /> Comece
            cadastrando sua primeira área!
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {plantacoes.map((p) => (
            <PlantacaoCard
              key={p.id}
              plantacao={p}
              onEdit={() => openModal("cadastro_plantacao", p)}
              onTrack={() => openModal("crescimento", p)}
              onYield={() => openModal("rendimento", p)}
              onDetails={() => openModal("detalhes", p)}
              onApplyInsumo={() => openModal("aplicacao_insumo", p)}
              onPlanResources={() => openModal("plano_recursos", p)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlantacoesView;
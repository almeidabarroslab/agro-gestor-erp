import React from "react";
import LucideIcon from "../../components/ui/LucideIcon";
import { formatarMoeda } from "../../utils/helpers";

const MaquinarioView = ({
  maquinario,
  isLoadingMaquinario,
  openMaquinarioModal,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
          <LucideIcon name="Tractor" className="w-8 h-8 mr-3 text-blue-600" />
          Gestão de Maquinário
        </h2>
        <button
          onClick={() => openMaquinarioModal()}
          className="flex items-center px-4 py-2 bg-sky-500 text-white font-medium rounded-xl hover:bg-sky-600 transition shadow-lg"
        >
          <LucideIcon name="Plus" className="w-5 h-5 mr-2" /> Nova Máquina
        </button>
      </div>

      {isLoadingMaquinario ? (
        <div className="text-center p-12">
          <LucideIcon
            name="Tractor"
            className="w-12 h-12 animate-spin text-blue-500 mx-auto"
          />
          <p className="text-gray-500 mt-2">Carregando maquinário...</p>
        </div>
      ) : maquinario.length === 0 ? (
        <div className="text-center p-16 bg-white rounded-xl shadow-md border-dashed border-2 border-gray-300">
          <p className="text-xl text-gray-500 mb-4">
            Nenhuma máquina cadastrada.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {maquinario.map((m) => (
            <div key={m.id} className="card-base border-blue-500">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-800">{m.nome}</h3>
                <button
                  onClick={() => openMaquinarioModal(m)}
                  className="px-3 py-1 text-sm bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                  Editar
                </button>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600">
                  Tipo: <span className="font-semibold">{m.tipo}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Marca: {m.marca} {m.modelo} ({m.ano})
                </p>
                <p className="text-md font-bold text-gray-700 flex justify-between mt-2 pt-2 border-t">
                  Custo/Hora:{" "}
                  <span className="text-blue-600">
                    {formatarMoeda(m.custoHora)}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MaquinarioView;

import React from "react";
import LucideIcon from "../ui/LucideIcon";
import { formatarMoeda } from "../../utils/helpers";

const RecursosView = ({ recursos, isLoading, error, openRecursoModal }) => {
  const totalValorEstoque = recursos.reduce(
    (sum, r) => sum + (r.estoque * r.custoUnitario || 0),
    0
  );
  const insumosAbaixoMin = recursos.filter((r) => r.estoque < 10);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 flex items-center">
          <LucideIcon name="Package" className="w-6 h-6 mr-2 text-orange-600" />{" "}
          Gestão de Insumos / Estoque
        </h2>
        <button
          onClick={() => openRecursoModal()}
          className="flex items-center px-4 py-2 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition shadow-lg"
        >
          <LucideIcon name="Plus" className="w-5 h-5 mr-2" /> Novo Insumo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-5 flex items-center justify-between border-l-4 border-gray-200">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Valor Total do Estoque
            </p>
            <p className="text-3xl font-bold mt-1 text-teal-600">
              {formatarMoeda(totalValorEstoque)}
            </p>
          </div>
          <LucideIcon
            name="DollarSign"
            className="w-8 h-8 opacity-30 text-teal-600"
          />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-5 flex items-center justify-between border-l-4 border-gray-200">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Insumos com Estoque Baixo
            </p>
            <p className="text-3xl font-bold mt-1 text-yellow-600">
              {insumosAbaixoMin.length}
            </p>
          </div>
          <LucideIcon
            name="List"
            className="w-8 h-8 opacity-30 text-yellow-600"
          />
        </div>
      </div>

      {error && (
        <div
          className="bg-rose-100 border-l-4 border-rose-500 text-rose-700 p-4 mb-4 rounded-lg"
          role="alert"
        >
          <p className="font-bold">Erro de Estoque</p>
          <p>{error}</p>
        </div>
      )}

      <h3 className="text-2xl font-semibold text-gray-700 mb-4">
        Itens em Estoque
      </h3>

      {isLoading ? (
        <div className="text-center p-12">
          {" "}
          <LucideIcon
            name="Tractor"
            className="w-12 h-12 animate-spin text-orange-500 mx-auto"
          />{" "}
          <p className="text-gray-500 mt-2">Carregando insumos...</p>{" "}
        </div>
      ) : recursos.length === 0 ? (
        <div className="text-center p-16 bg-white rounded-xl shadow-lg border-dashed border-2 border-gray-300">
          <p className="text-xl text-gray-500 mb-4">
            Nenhum insumo cadastrado.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recursos.map((r) => (
            <div
              key={r.id}
              className={`bg-white rounded-xl shadow-lg p-5 border-t-4 border-orange-500 hover:shadow-xl transition duration-300 ${
                r.estoque < 10 ? "bg-yellow-50 border-yellow-500" : ""
              }`}
            >
              <h3 className="text-xl font-bold text-gray-800">{r.nome}</h3>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600">Tipo: **{r.tipo}**</p>
                <p className="text-lg font-bold text-gray-700 flex justify-between">
                  Estoque:{" "}
                  <span
                    className={
                      r.estoque < 10 ? "text-rose-600" : "text-teal-600"
                    }
                  >
                    {r.estoque.toFixed(2)} {r.unidade}
                  </span>
                </p>
                <p className="text-sm text-gray-500 flex justify-between">
                  Custo Unitário:{" "}
                  <span className="text-rose-500">
                    {formatarMoeda(r.custoUnitario)}/{r.unidade}
                  </span>
                </p>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => openRecursoModal(r)}
                  className="px-3 py-1 text-sm bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecursosView;

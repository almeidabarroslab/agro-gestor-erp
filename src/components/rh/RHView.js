import React from 'react';
import LucideIcon from '../ui/LucideIcon';
import { formatarMoeda } from '../../utils/helpers';

const RHView = ({ equipe, isLoadingRH, openMembroModal }) => {
  const custoMensalRH = equipe.reduce(
    (sum, m) => sum + (parseFloat(m.custoHora) * 160 || 0),
    0
  ); // 160h/mês estimado

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 flex items-center">
          <LucideIcon name="Users" className="w-6 h-6 mr-2 text-rose-600" />{" "}
          Gestão de Mão de Obra / RH
        </h2>
        <button
          onClick={() => openMembroModal()}
          className="flex items-center px-4 py-2 bg-rose-500 text-white font-medium rounded-xl hover:bg-rose-600 transition shadow-lg"
        >
          <LucideIcon name="Plus" className="w-5 h-5 mr-2" /> Novo Membro
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-5 flex items-center justify-between border-l-4 border-gray-200 hover:shadow-xl transition">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Membros Ativos na Equipe
            </p>
            <p className="text-3xl font-bold mt-1 text-rose-600">
              {equipe.filter((m) => m.status === "Ativo").length}
            </p>
          </div>
          <LucideIcon
            name="Users"
            className="w-8 h-8 opacity-30 text-rose-600"
          />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-5 flex items-center justify-between border-l-4 border-gray-200 hover:shadow-xl transition">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Custo Mensal Estimado (160h)
            </p>
            <p className="text-3xl font-bold mt-1 text-orange-600">
              {formatarMoeda(custoMensalRH)}
            </p>
          </div>
          <LucideIcon
            name="DollarSign"
            className="w-8 h-8 opacity-30 text-orange-600"
          />
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-gray-700 mb-4">
        Equipe Cadastrada
      </h3>
      {isLoadingRH ? (
        <div className="text-center p-12">
          {" "}
          <LucideIcon
            name="Tractor"
            className="w-12 h-12 animate-spin text-rose-500 mx-auto"
          />{" "}
          <p className="text-gray-500 mt-2">Carregando equipe...</p>{" "}
        </div>
      ) : equipe.length === 0 ? (
        <div className="text-center p-16 bg-white rounded-xl shadow-lg border-dashed border-2 border-gray-300">
          <p className="text-xl text-gray-500 mb-4">
            Nenhum membro de equipe cadastrado.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {equipe.map((m) => (
            <div
              key={m.id}
              className={`bg-white rounded-xl shadow-lg p-5 border-t-4 border-rose-500 hover:shadow-xl transition duration-300 ${
                m.status === "Licença" || m.status === "Inativo"
                  ? "bg-gray-100"
                  : ""
              }`}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-800">{m.nome}</h3>
                <div
                  className={`px-3 py-1 text-xs font-semibold rounded-full shadow-inner ${
                    m.status === "Ativo"
                      ? "bg-teal-100 text-teal-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {m.status}
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600">Função: **{m.funcao}**</p>
                <p className="text-md font-bold text-gray-700 flex justify-between">
                  Custo/Hora:{" "}
                  <span className="text-rose-600">
                    {formatarMoeda(m.custoHora)}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Contato: {m.contato || "N/A"}
                </p>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => openMembroModal(m)}
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

export default RHView;
import React from 'react';
import LucideIcon from '../ui/LucideIcon';
import LeadBoard from './LeadBoard'; // Import the new component

const CRMView = ({
  contatos,
  isLoadingCRM,
  openContatoModal,
  updateContatoStatus,
}) => {
  const clientes = contatos.filter((c) => c.tipo === 'Cliente');
  const fornecedores = contatos.filter((c) => c.tipo === 'Fornecedor');

  const totalClientes = clientes.length;
  const totalFornecedores = fornecedores.length;
  const totalLeads = contatos.filter((c) => c.status === 'Lead').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 flex items-center">
          <LucideIcon name="Briefcase" className="w-6 h-6 mr-2 text-sky-600" />{' '}
          Gestão de Clientes / Fornecedores (CRM)
        </h2>
        <button
          onClick={() => openContatoModal()}
          className="flex items-center px-4 py-2 bg-sky-500 text-white font-medium rounded-xl hover:bg-sky-600 transition shadow-lg"
        >
          <LucideIcon name="Plus" className="w-5 h-5 mr-2" /> Novo Contato
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-5 flex items-center justify-between border-l-4 border-gray-200 hover:shadow-xl transition">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Total de Clientes
            </p>
            <p className="text-3xl font-bold mt-1 text-sky-600">
              {totalClientes}
            </p>
          </div>
          <LucideIcon
            name="Users"
            className="w-8 h-8 opacity-30 text-sky-600"
          />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-5 flex items-center justify-between border-l-4 border-gray-200 hover:shadow-xl transition">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Total de Fornecedores
            </p>
            <p className="text-3xl font-bold mt-1 text-blue-600">
              {totalFornecedores}
            </p>
          </div>
          <LucideIcon
            name="Briefcase"
            className="w-8 h-8 opacity-30 text-blue-600"
          />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-5 flex items-center justify-between border-l-4 border-gray-200 hover:shadow-xl transition">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Leads em Potencial
            </p>
            <p className="text-3xl font-bold mt-1 text-yellow-600">
              {totalLeads}
            </p>
          </div>
          <LucideIcon
            name="Star"
            className="w-8 h-8 opacity-30 text-yellow-600"
          />
        </div>
      </div>

      <LeadBoard
        contatos={contatos}
        updateContatoStatus={updateContatoStatus}
      />

      <h3 className="text-2xl font-semibold text-gray-700 mb-4 mt-8">
        Lista de Contatos
      </h3>
      {isLoadingCRM ? (
        <div className="text-center p-12">
          {' '}
          <LucideIcon
            name="Tractor"
            className="w-12 h-12 animate-spin text-sky-500 mx-auto"
          />{' '}
          <p className="text-gray-500 mt-2">Carregando contatos...</p>{' '}
        </div>
      ) : contatos.length === 0 ? (
        <div className="text-center p-16 bg-white rounded-xl shadow-lg border-dashed border-2 border-gray-300">
          <p className="text-xl text-gray-500 mb-4">
            Nenhum cliente ou fornecedor cadastrado.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {contatos.map((c) => (
            <div
              key={c.id}
              className={`bg-white rounded-xl shadow-lg p-5 border-t-4 ${
                c.tipo === 'Cliente' ? 'border-sky-500' : 'border-blue-500'
              } hover:shadow-xl transition duration-300`}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-800">{c.nome}</h3>
                <div
                  className={`px-3 py-1 text-xs font-semibold rounded-full shadow-inner ${
                    c.tipo === 'Cliente'
                      ? 'bg-sky-100 text-sky-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {c.tipo}
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p className="flex items-center">
                  <LucideIcon
                    name="FileText"
                    className="w-4 h-4 mr-2 opacity-60"
                  />{' '}
                  Documento: {c.documento || 'N/A'}
                </p>
                <p className="flex items-center">
                  <LucideIcon
                    name="Phone"
                    className="w-4 h-4 mr-2 opacity-60"
                  />{' '}
                  Telefone: {c.telefone || 'N/A'}
                </p>
                <p className="flex items-center">
                  <LucideIcon name="Mail" className="w-4 h-4 mr-2 opacity-60" />{' '}
                  Email: {c.email || 'N/A'}
                </p>
                <p className="flex items-center">
                  <LucideIcon
                    name="MapPin"
                    className="w-4 h-4 mr-2 opacity-60"
                  />{' '}
                  Endereço: {c.endereco || 'N/A'}
                </p>
                <p className="flex items-center">
                  <LucideIcon
                    name="Tractor"
                    className="w-4 h-4 mr-2 opacity-60"
                  />{' '}
                  Propriedade: {c.nomePropriedade || 'N/A'} (
                  {c.tamanhoPropriedade || 'N/A'} ha)
                </p>
                <p className="flex items-center">
                  <LucideIcon name="Leaf" className="w-4 h-4 mr-2 opacity-60" />{' '}
                  Cultura: {c.cultura || 'N/A'}
                </p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    c.status === 'Ativo'
                      ? 'bg-green-100 text-green-800'
                      : c.status === 'Inativo'
                      ? 'bg-red-100 text-red-800'
                      : c.status === 'Lead'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {c.status}
                </span>
                <button
                  onClick={() => openContatoModal(c)}
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

export default CRMView;

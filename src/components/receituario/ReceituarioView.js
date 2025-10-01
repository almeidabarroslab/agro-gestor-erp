import React from 'react';
import LucideIcon from '../ui/LucideIcon';

const ReceituarioView = ({ receituarios, isLoading, openReceituarioModal, contatos, recursos }) => {

  const getNome = (id, lista) => lista.find(item => item.id === id)?.nome || 'N/A';

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 flex items-center">
          <LucideIcon name="FileText" className="w-8 h-8 mr-2 text-green-600" />
          Receituários Agronômicos
        </h2>
        <button
          onClick={() => openReceituarioModal()}
          className="flex items-center px-4 py-2 bg-green-500 text-white font-medium rounded-xl hover:bg-green-600 transition shadow-lg"
        >
          <LucideIcon name="Plus" className="w-5 h-5 mr-2" /> Novo Receituário
        </button>
      </div>

      {isLoading ? (
        <div className="text-center p-12">
          <LucideIcon name="FileText" className="w-12 h-12 animate-spin text-green-500 mx-auto" />
          <p className="text-gray-500 mt-2">Carregando receituários...</p>
        </div>
      ) : receituarios.length === 0 ? (
        <div className="text-center p-16 bg-white rounded-xl shadow-lg border-dashed border-2 border-gray-300">
          <p className="text-xl text-gray-500 mb-4">Nenhum receituário emitido.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cultura</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {receituarios.map((r) => (
                <tr key={r.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{getNome(r.cliente, contatos)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{r.cultura}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getNome(r.produto, recursos)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(r.createdAt?.toDate()).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900">Visualizar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReceituarioView;

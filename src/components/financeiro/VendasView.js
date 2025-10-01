import React, { useMemo } from 'react';
import LucideIcon from '../ui/LucideIcon';
import { formatarData, formatarMoeda } from '../../utils/helpers';

const VendasView = ({ vendas, isLoading, error, contatos, openVendaModal }) => {
  const { totalReceita, totalCusto, totalLucro } = useMemo(() => {
    let receita = 0;
    let custo = 0;
    vendas.forEach((v) => {
      receita += v.valorTotal || 0;
      custo += v.custoInsumos || 0;
    });
    return {
      totalReceita: receita,
      totalCusto: custo,
      totalLucro: receita - custo,
    };
  }, [vendas]);

  const dashboardCards = [
    {
      title: "Receita Total Bruta",
      value: formatarMoeda(totalReceita),
      icon: "DollarSign",
      color: "text-teal-600",
      bg: "bg-teal-100",
    },
    {
      title: "Custo Total de Insumos (Vendas)",
      value: formatarMoeda(totalCusto),
      icon: "Package",
      color: "text-rose-600",
      bg: "bg-rose-100",
    },
    {
      title: "Lucro Bruto Estimado",
      value: formatarMoeda(totalLucro),
      icon: "TrendingUp",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
  ];

  const contatoMap = useMemo(() => {
    return contatos.reduce((acc, c) => {
      acc[c.id] = c.nome;
      return acc;
    }, {});
  }, [contatos]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 flex items-center">
          <LucideIcon name="Receipt" className="w-6 h-6 mr-2 text-blue-600" />{" "}
          Gestão Financeira / Vendas
        </h2>
        <button
          onClick={openVendaModal}
          className="flex items-center px-4 py-2 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 transition shadow-lg"
        >
          <LucideIcon name="Plus" className="w-5 h-5 mr-2" /> Nova Venda
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-5 flex items-center justify-between border-l-4 border-gray-200 hover:shadow-xl transition"
          >
            <div>
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <p className={`text-3xl font-bold mt-1 ${card.color}`}>
                {card.value}
              </p>
            </div>
            <LucideIcon
              name={card.icon}
              className={`w-8 h-8 opacity-30 ${card.color}`}
            />
          </div>
        ))}
      </div>

      {error && (
        <div
          className="bg-rose-100 border-l-4 border-rose-500 text-rose-700 p-4 mb-4 rounded-lg"
          role="alert"
        >
          <p className="font-bold">Erro de Vendas</p>
          <p>{error}</p>
        </div>
      )}

      <h3 className="text-2xl font-semibold text-gray-700 mb-4">
        Histórico de Transações
      </h3>
      {isLoading ? (
        <div className="text-center p-12">
          {" "}
          <LucideIcon
            name="Tractor"
            className="w-12 h-12 animate-spin text-blue-500 mx-auto"
          />{" "}
          <p className="text-gray-500 mt-2">
            Carregando histórico de vendas...
          </p>{" "}
        </div>
      ) : vendas.length === 0 ? (
        <div className="text-center p-16 bg-white rounded-xl shadow-lg border-dashed border-2 border-gray-300">
          <p className="text-xl text-gray-500 mb-4">
            Nenhuma venda registrada ainda.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cultura (Origem)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qtd. Vendida
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Receita Bruta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Custo (Insumos)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lucro Bruto Estimado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vendas.map((v) => (
                <tr key={v.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {v.dataVenda ? formatarData(v.dataVenda) : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">
                    {v.nomeCliente || contatoMap[v.clienteId] || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {v.cultura || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {v.quantidade.toFixed(2)} {v.unidade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-teal-600">
                    {formatarMoeda(v.valorTotal)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-rose-600">
                    {formatarMoeda(v.custoInsumos)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-extrabold text-blue-700">
                    {formatarMoeda(v.lucroBruto)}
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

export default VendasView;
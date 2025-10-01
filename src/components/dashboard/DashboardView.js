import React from 'react';
import LucideIcon from '../ui/LucideIcon';
import StockAlertCard from './StockAlertCard';
import { formatarMoeda } from '../../utils/helpers';

const DashboardView = ({ plantacoes, recursos, vendas, equipe }) => {
  // 1. Métricas de Plantação
  const totalAreaHa = plantacoes.reduce((sum, p) => sum + (p.areaHa || 0), 0);
  const plantacoesAtivas = plantacoes.filter(
    (p) => p.status === "Plantada"
  ).length;
  const custoTotalInsumosGasto = plantacoes.reduce(
    (sum, p) =>
      sum + (p.aplicacoes?.reduce((s, a) => s + (a.custo || 0), 0) || 0),
    0
  );

  // 2. Métricas Financeiras
  const totalReceita = vendas.reduce((sum, v) => sum + (v.valorTotal || 0), 0);
  const totalLucroInsumos = vendas.reduce(
    (sum, v) => sum + (v.lucroBruto || 0),
    0
  );

  // 3. Métricas de RH
  const totalMembrosAtivos = equipe.filter((m) => m.status === "Ativo").length;
  // Estimativa de custo mensal baseada em 160 horas/mês
  const custoMensalRH = equipe.reduce(
    (sum, m) => sum + (parseFloat(m.custoHora) * 160 || 0),
    0
  );

  // Lucro Líquido Estimado (Lucro Insumos - Custo RH) - Simplificado
  const lucroLiquidoEstimado = totalLucroInsumos - custoMensalRH;

  // 4. Métricas de Estoque
  const valorEstoqueAtual = recursos.reduce(
    (sum, r) => sum + (r.estoque * r.custoUnitario || 0),
    0
  );
  const insumosBaixoEstoque = recursos.filter((r) => r.estoque < 10);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center">
        <LucideIcon name="PieChart" className="w-6 h-6 mr-2 text-teal-700" />{" "}
        Dashboard ERP (Visão Geral)
      </h2>

      <StockAlertCard insumosBaixoEstoque={insumosBaixoEstoque} />

      {/* FINANCEIRO & LUCRO */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-blue-700 mb-4 border-b pb-2">
          Desempenho Financeiro
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-teal-500 hover:shadow-xl transition">
            <p className="text-sm font-medium text-gray-500">
              Receita Total (Vendas)
            </p>
            <p className="text-3xl font-bold mt-1 text-teal-600">
              {formatarMoeda(totalReceita)}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-rose-500 hover:shadow-xl transition">
            <p className="text-sm font-medium text-gray-500">
              Custo Total (Insumos Aplicados)
            </p>
            <p className="text-3xl font-bold mt-1 text-rose-600">
              {formatarMoeda(custoTotalInsumosGasto)}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-orange-500 hover:shadow-xl transition">
            <p className="text-sm font-medium text-gray-500">
              Custo Mensal Mão de Obra (Est.)
            </p>
            <p className="text-3xl font-bold mt-1 text-orange-600">
              {formatarMoeda(custoMensalRH)}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-blue-500 hover:shadow-xl transition">
            <p className="text-sm font-medium text-gray-500">
              Lucro Líquido Estimado (Vendas - Custo Total)
            </p>
            <p className="text-3xl font-bold mt-1 text-blue-600">
              {formatarMoeda(lucroLiquidoEstimado)}
            </p>
          </div>
        </div>
      </div>

      {/* PRODUÇÃO & RECURSOS */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-orange-700 mb-4 border-b pb-2">
          Produção e Inventário
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-yellow-500 hover:shadow-xl transition">
            <p className="text-sm font-medium text-gray-500">
              Área Total Gerenciada (Ha)
            </p>
            <p className="text-3xl font-bold mt-1 text-yellow-600">
              {totalAreaHa.toFixed(2)} Ha
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-teal-500 hover:shadow-xl transition">
            <p className="text-sm font-medium text-gray-500">
              Plantações Ativas
            </p>
            <p className="text-3xl font-bold mt-1 text-teal-600">
              {plantacoesAtivas}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-sky-500 hover:shadow-xl transition">
            <p className="text-sm font-medium text-gray-500">
              Valor Atual do Estoque
            </p>
            <p className="text-3xl font-bold mt-1 text-sky-600">
              {formatarMoeda(valorEstoqueAtual)}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-rose-500 hover:shadow-xl transition">
            <p className="text-sm font-medium text-gray-500">
              Membros Ativos (RH)
            </p>
            <p className="text-3xl font-bold mt-1 text-rose-600">
              {totalMembrosAtivos}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
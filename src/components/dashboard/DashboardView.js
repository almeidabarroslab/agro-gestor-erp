import React, { useRef, useEffect } from "react";
import LucideIcon from "../ui/LucideIcon";
import StockAlertCard from "./StockAlertCard";
import { formatarMoeda } from "../../utils/helpers";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement, // Added PointElement to fix the "point" registration error
  Title,
  Tooltip,
  Legend
);

const DashboardView = ({ plantacoes, recursos, vendas, equipe }) => {
  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const barCanvasRef = useRef(null);
  const lineCanvasRef = useRef(null);

  useEffect(() => {
    // Ensure the canvas elements exist before initializing charts
    if (barCanvasRef.current) {
      if (barChartRef.current) {
        barChartRef.current.destroy();
      }
      barChartRef.current = new ChartJS(barCanvasRef.current, {
        type: "bar",
        data: vendasPorMes,
        options: {
          responsive: true,
          plugins: { legend: { position: "top" } },
        },
      });
    }

    if (lineCanvasRef.current) {
      if (lineChartRef.current) {
        lineChartRef.current.destroy();
      }
      lineChartRef.current = new ChartJS(lineCanvasRef.current, {
        type: "line",
        data: custoPorMes,
        options: {
          responsive: true,
          plugins: { legend: { position: "top" } },
        },
      });
    }

    return () => {
      // Cleanup chart instances on unmount
      if (barChartRef.current) {
        barChartRef.current.destroy();
      }
      if (lineChartRef.current) {
        lineChartRef.current.destroy();
      }
    };
  }, []); // Add dependencies if charts need to update dynamically

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

  const vendasPorMes = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Vendas (R$)",
        data: [
          12000, 15000, 8000, 20000, 25000, 30000, 28000, 32000, 40000, 45000,
          50000, 60000,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const custoPorMes = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Custos (R$)",
        data: [
          10000, 12000, 7000, 15000, 20000, 25000, 23000, 27000, 35000, 40000,
          45000, 50000,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

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

      {/* ANÁLISE DE VENDAS E CUSTOS */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-purple-700 mb-4 border-b pb-2">
          Análise de Vendas e Custos
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="text-lg font-medium text-gray-700 mb-4">
              Vendas por Mês
            </h4>
            <canvas ref={barCanvasRef}></canvas>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="text-lg font-medium text-gray-700 mb-4">
              Custos por Mês
            </h4>
            <canvas ref={lineCanvasRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;

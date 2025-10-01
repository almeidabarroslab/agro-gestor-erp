import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import LucideIcon from '../ui/LucideIcon';
import { formatarMoeda } from '../../utils/helpers';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AnaliseCustosView = ({ plantacoes, recursos }) => {

  const processarDadosCustos = () => {
    if (!plantacoes || plantacoes.length === 0) return { labels: [], datasets: [] };

    const labels = plantacoes.map(p => p.nome);
    const custoPorHa = plantacoes.map(p => {
      const custoTotal = p.aplicacoes?.reduce((acc, app) => acc + (app.custo || 0), 0) || 0;
      return p.areaHa > 0 ? (custoTotal / p.areaHa) : 0;
    });

    return {
      labels,
      datasets: [
        {
          label: 'Custo por Hectare (R$)',
          data: custoPorHa,
          backgroundColor: 'rgba(22, 163, 74, 0.6)',
          borderColor: 'rgba(22, 163, 74, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const processarDadosCustosPorTipo = () => {
    const custosPorTipo = {};
    plantacoes.forEach(p => {
      p.aplicacoes?.forEach(app => {
        const recurso = recursos.find(r => r.id === app.recursoId);
        if (recurso) {
          const tipo = recurso.tipo || 'Outros';
          custosPorTipo[tipo] = (custosPorTipo[tipo] || 0) + (app.custo || 0);
        }
      });
    });

    return {
      labels: Object.keys(custosPorTipo),
      datasets: [
        {
          label: 'Custo por Tipo de Insumo',
          data: Object.values(custosPorTipo),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
        },
      ],
    };
  };

  const dadosCustoPorHa = processarDadosCustos();
  const dadosCustoPorTipo = processarDadosCustosPorTipo();

  const custoTotalGeral = plantacoes.reduce((acc, p) => acc + (p.aplicacoes?.reduce((a, app) => a + (app.custo || 0), 0) || 0), 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center">
        <LucideIcon name="BarChart3" className="w-8 h-8 mr-2 text-green-600" />
        Análise de Custos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-5">
          <h3 className="text-sm font-medium text-gray-500">Custo Total Acumulado</h3>
          <p className="text-3xl font-bold mt-1 text-green-600">{formatarMoeda(custoTotalGeral)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Custo por Hectare (R$/Ha)</h3>
          <Bar data={dadosCustoPorHa} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Distribuição de Custos por Tipo de Insumo</h3>
          <Doughnut data={dadosCustoPorTipo} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </div>
      </div>
    </div>
  );
};

export default AnaliseCustosView;

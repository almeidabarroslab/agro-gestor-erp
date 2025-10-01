import React, { useState } from 'react';
import LucideIcon from '../ui/LucideIcon';
import { simularAnaliseIA } from '../../services/gemini';
import { formatarData, calcularDiasPlantio } from '../../utils/helpers';

const DetalhesCrescimentoModal = ({ plantacao, onClose }) => {
  const [analiseIA, setAnaliseIA] = useState(null);
  const [isLoadingIA, setIsLoadingIA] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const dias = calcularDiasPlantio(plantacao.dataPlantio);
  const ultimoCrescimento =
    plantacao.dadosCrescimento?.length > 0
      ? plantacao.dadosCrescimento
          .slice()
          .sort((a, b) => new Date(a.data) - new Date(b.data))
          .pop()
      : null;

  const handleAnaliseIA = async () => {
    if (!ultimoCrescimento) {
      setAnaliseIA({
        text: "Impossível analisar: Não há dados de crescimento registrados.",
        sources: [],
      });
      return;
    }
    setIsLoadingIA(true);
    setAnaliseIA(null);
    try {
      const result = await simularAnaliseIA(plantacao, ultimoCrescimento, dias);
      setAnaliseIA(result);
    } catch (error) {
      setAnaliseIA({
        text: "Erro crítico ao processar a análise.",
        sources: [],
      });
    } finally {
      setIsLoadingIA(false);
    }
  };
  const toggleHistory = () => {
    setShowHistory((prev) => !prev);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-2xl space-y-6 max-w-3xl w-full">
      <h2 className="text-2xl font-bold text-teal-700">
        Análise e Detalhes de: {plantacao.nome}
      </h2>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-lg font-semibold text-gray-700">Status Atual</p>
          <p className="text-sm">**Cultivo:** {plantacao.cultura}</p>
          <p className="text-sm">
            **Início:** {formatarData(plantacao.dataPlantio)}
          </p>
          <p className="text-sm">**Ciclo:** {dias} dias</p>
          {ultimoCrescimento && (
            <div className="mt-2 text-xs font-medium text-blue-700 border-t pt-2 mt-2">
              <p>Última Medição: {formatarData(ultimoCrescimento.data)}</p>
              <p>
                Altura: {ultimoCrescimento.alturaCm} cm | Folhas:{" "}
                {ultimoCrescimento.folhasPorPlanta}
              </p>
            </div>
          )}
        </div>
        <div className="flex-1 p-4 rounded-lg bg-blue-50 border border-blue-200 flex flex-col justify-between">
          <p className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
            <LucideIcon name="Bot" className="w-5 h-5 mr-2" /> Análise
            Agronômica
          </p>
          <button
            onClick={handleAnaliseIA}
            disabled={isLoadingIA || !ultimoCrescimento}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
          >
            {isLoadingIA ? "Analisando dados..." : "Gerar Recomendação da IA"}
          </button>
        </div>
      </div>
      {analiseIA && (
        <div className="p-4 bg-gray-100 rounded-lg shadow-inner">
          <h3 className="text-md font-bold text-blue-800 mb-2">
            Resultado da Análise Expert:
          </h3>
          <p className="text-gray-700 whitespace-pre-wrap">{analiseIA.text}</p>
          {analiseIA.sources?.length > 0 && (
            <div className="mt-3 text-xs text-gray-500 border-t pt-2">
              **Fontes Consultadas:**
              <ul className="list-disc list-inside ml-2 mt-1">
                {analiseIA.sources.map((source, index) => (
                  <li key={index}>
                    <a
                      href={source.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      <div className="border-t pt-4">
        <button
          onClick={toggleHistory}
          className="flex items-center text-md font-semibold text-gray-700 hover:text-gray-900 transition"
        >
          <LucideIcon name="TrendingUp" className="w-5 h-5 mr-2" /> Histórico de
          Crescimento ({plantacao.dadosCrescimento?.length || 0} medições)
          <span className="ml-2 text-xs text-gray-500">
            [{showHistory ? "Esconder" : "Mostrar"}]
          </span>
        </button>
        {showHistory &&
        plantacao.dadosCrescimento &&
        plantacao.dadosCrescimento.length > 0 ? (
          <div className="mt-4 max-h-60 overflow-y-auto bg-white border rounded-lg p-3">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Data
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Dias no Ciclo
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Altura (cm)
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Nº Folhas
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {plantacao.dadosCrescimento
                  .slice()
                  .sort((a, b) => new Date(a.data) - new Date(b.data))
                  .map((dado, index) => {
                    return (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {formatarData(dado.data)}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          {calcularDiasPlantio(
                            plantacao.dataPlantio,
                            dado.data
                          )}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          {dado.alturaCm}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          {dado.folhasPorPlanta}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : (
          showHistory && (
            <p className="mt-4 text-sm text-gray-500">
              Nenhum dado de crescimento no histórico.
            </p>
          )
        )}
      </div>
      <div className="flex justify-end pt-4 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-white bg-rose-500 rounded-lg hover:bg-rose-600 transition"
        >
          Fechar Detalhes
        </button>
      </div>
    </div>
  );
};

export default DetalhesCrescimentoModal;

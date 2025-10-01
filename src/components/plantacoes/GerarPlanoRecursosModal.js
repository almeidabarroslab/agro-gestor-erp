import React, { useState, useEffect, useCallback } from 'react';
import LucideIcon from '../ui/LucideIcon';
import { simularPlanoRecursosIA } from '../../services/gemini';

const GerarPlanoRecursosModal = ({ plantacao, onClose }) => {
  const [planoIA, setPlanoIA] = useState(null);
  const [isLoadingIA, setIsLoadingIA] = useState(false);

  const handleGerarPlano = useCallback(async () => {
    setIsLoadingIA(true);
    setPlanoIA(null);
    try {
      const result = await simularPlanoRecursosIA(
        plantacao.cultura,
        plantacao.areaHa
      );
      setPlanoIA(result);
    } catch (error) {
      setPlanoIA({
        text: "Erro ao gerar o plano de recursos. Tente novamente.",
        sources: [],
      });
    } finally {
      setIsLoadingIA(false);
    }
  }, [plantacao.cultura, plantacao.areaHa]);

  useEffect(() => {
    if (!planoIA && !isLoadingIA) {
      handleGerarPlano();
    }
  }, [planoIA, isLoadingIA, handleGerarPlano]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-2xl space-y-6 max-w-4xl w-full">
      <h2 className="text-2xl font-bold text-yellow-700 flex items-center">
        <LucideIcon name="Calendar" className="w-6 h-6 mr-2" /> Plano de Insumos
        Sugerido (IA)
      </h2>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <p className="text-md font-semibold text-gray-700">
          Plantação: {plantacao.nome}
        </p>
        <p className="text-sm text-gray-600">
          Cultura: **{plantacao.cultura}** | Área: **{plantacao.areaHa} Ha**
        </p>
        <p className="text-sm text-gray-500 mt-1">
          O plano abaixo cobre as próximas 6 semanas (30 dias úteis) para esta
          área, focado na otimização de custos e manejo.
        </p>
      </div>

      <div className="min-h-[200px] border rounded-lg p-4 bg-white shadow-inner">
        {isLoadingIA && (
          <div className="text-center p-8">
            <LucideIcon
              name="Bot"
              className="w-8 h-8 animate-pulse text-yellow-600 mx-auto"
            />
            <p className="text-yellow-600 mt-2">
              Gerando cronograma agronômico otimizado...
            </p>
          </div>
        )}
        {planoIA && (
          <div>
            <p className="text-gray-700 whitespace-pre-wrap text-sm">
              {planoIA.text}
            </p>
            {planoIA.sources?.length > 0 && (
              <div className="mt-4 text-xs text-gray-500 border-t pt-2">
                **Fontes Consultadas:**
                <ul className="list-disc list-inside ml-2 mt-1">
                  {planoIA.sources.map((source, index) => (
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
      </div>

      <div className="flex justify-end pt-4 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-white bg-rose-500 rounded-lg hover:bg-rose-600 transition"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default GerarPlanoRecursosModal;

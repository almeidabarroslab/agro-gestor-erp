import React, { useState, useMemo } from 'react';
import { CULTURES } from '../../utils/constants';
import DefinirAreaMapa from './DefinirAreaMapa';

const CadastroPlantacaoForm = ({
  onSave,
  onClose,
  plantacaoEdit,
  updatePlantacao,
}) => {
  const [nome, setNome] = useState(plantacaoEdit ? plantacaoEdit.nome : '');
  const [areaHa, setAreaHa] = useState(
    plantacaoEdit ? plantacaoEdit.areaHa : ''
  );
  const [dataPlantio, setDataPlantio] = useState(
    plantacaoEdit ? plantacaoEdit.dataPlantio.split('T')[0] : ''
  );
  const [cultura, setCultura] = useState(
    plantacaoEdit ? plantacaoEdit.cultura : CULTURES[0]
  );
  const [areaGeo, setAreaGeo] = useState(
    plantacaoEdit ? plantacaoEdit.areaGeo : null
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const dadosPlantacao = {
      nome,
      areaHa: parseFloat(areaHa),
      dataPlantio,
      cultura,
      status: plantacaoEdit ? plantacaoEdit.status : 'Plantada',
      areaGeo,
    };
    try {
      if (plantacaoEdit) {
        await updatePlantacao(plantacaoEdit.id, dadosPlantacao);
      } else {
        await onSave(dadosPlantacao);
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setIsLoading(false);
    }
  };

  const areaInicialGeoJSON = useMemo(() => {
    if (!plantacaoEdit || !plantacaoEdit.areaGeo) return null;
    const coordinates = plantacaoEdit.areaGeo.map((p) => [
      p.longitude,
      p.latitude,
    ]);
    return {
      type: 'Polygon',
      coordinates: [coordinates],
    };
  }, [plantacaoEdit]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-2xl max-h-[95vh] space-y-4 max-w-2xl w-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-teal-700">
        {plantacaoEdit ? 'Editar Plantação' : 'Nova Plantação'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-gray-700"
          >
            Nome da Plantação
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 p-2 border"
          />
        </div>

        <div>
          <label
            htmlFor="cultura"
            className="block text-sm font-medium text-gray-700"
          >
            Tipo de Cultura
          </label>
          <select
            id="cultura"
            value={cultura}
            onChange={(e) => setCultura(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 p-2 border"
          >
            {CULTURES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label
              htmlFor="areaHa"
              className="block text-sm font-medium text-gray-700"
            >
              Área (Ha)
            </label>
            <input
              type="number"
              id="areaHa"
              value={areaHa}
              onChange={(e) => setAreaHa(e.target.value)}
              step="0.01"
              min="0.1"
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 p-2 border"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="dataPlantio"
              className="block text-sm font-medium text-gray-700"
            >
              Data de Plantio
            </label>
            <input
              type="date"
              id="dataPlantio"
              value={dataPlantio}
              onChange={(e) => setDataPlantio(e.target.value)}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 p-2 border"
            />
          </div>
        </div>

        <DefinirAreaMapa
          onAreaDefined={setAreaGeo}
          onAreaCalculated={setAreaHa}
          areaInicial={areaInicialGeoJSON}
        />

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading
              ? 'Salvando...'
              : plantacaoEdit
              ? 'Atualizar Plantação'
              : 'Criar Plantação'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroPlantacaoForm;

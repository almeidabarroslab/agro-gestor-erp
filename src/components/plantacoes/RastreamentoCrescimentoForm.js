import React, { useState } from 'react';

const RastreamentoCrescimentoForm = ({
  plantacao,
  onClose,
  updatePlantacao,
}) => {
  const [altura, setAltura] = useState("");
  const [folhas, setFolhas] = useState("");
  const [dataMedicao, setDataMedicao] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isLoading, setIsLoading] = useState(false);
  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const novoDado = {
      data: dataMedicao,
      alturaCm: parseFloat(altura),
      folhasPorPlanta: parseInt(folhas, 10),
      observacao: `Medição em ${dataMedicao}`,
      recordedAt: new Date().toISOString(),
    };
    const dadosCrescimento = [...(plantacao.dadosCrescimento || []), novoDado];
    try {
      await updatePlantacao(plantacao.id, { dadosCrescimento });
      onClose();
    } catch (error) {
      console.error("Erro ao registrar crescimento:", error);
      setIsLoading(false);
    }
  };
  return (
    <div className="p-6 bg-white rounded-xl shadow-2xl space-y-4 max-w-lg w-full">
      <h2 className="text-2xl font-bold text-blue-700">
        Registrar Crescimento: {plantacao.nome}
      </h2>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label
            htmlFor="dataMedicao"
            className="block text-sm font-medium text-gray-700"
          >
            Data da Medição
          </label>
          <input
            type="date"
            id="dataMedicao"
            value={dataMedicao}
            onChange={(e) => setDataMedicao(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label
              htmlFor="altura"
              className="block text-sm font-medium text-gray-700"
            >
              Altura Média (cm)
            </label>
            <input
              type="number"
              id="altura"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
              step="0.1"
              min="0"
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="folhas"
              className="block text-sm font-medium text-gray-700"
            >
              Nº Médio de Folhas
            </label>
            <input
              type="number"
              id="folhas"
              value={folhas}
              onChange={(e) => setFolhas(e.target.value)}
              step="1"
              min="1"
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>
        </div>
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
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Registrando..." : "Salvar Medição"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RastreamentoCrescimentoForm;

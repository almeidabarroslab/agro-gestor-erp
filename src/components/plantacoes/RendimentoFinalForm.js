import React, { useState } from 'react';

const RendimentoFinalForm = ({ plantacao, onClose, updatePlantacao }) => {
  const [rendimento, setRendimento] = useState(plantacao.rendimentoFinal || "");
  const [isLoading, setIsLoading] = useState(false);
  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const novoStatus = parseFloat(rendimento) > 0 ? "Colhida" : "Plantada";
    try {
      await updatePlantacao(plantacao.id, {
        rendimentoFinal: parseFloat(rendimento),
        status: novoStatus,
      });
      onClose();
    } catch (error) {
      console.error("Erro ao registrar rendimento:", error);
      setIsLoading(false);
    }
  };
  return (
    <div className="p-6 bg-white rounded-xl shadow-2xl space-y-4 max-w-lg w-full">
      <h2 className="text-2xl font-bold text-purple-700">
        Registrar Rendimento Final: {plantacao.nome}
      </h2>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label
            htmlFor="rendimento"
            className="block text-sm font-medium text-gray-700"
          >
            Rendimento Total (Toneladas/Ha)
          </label>
          <input
            type="number"
            id="rendimento"
            value={rendimento}
            onChange={(e) => setRendimento(e.target.value)}
            step="0.01"
            min="0"
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
          />
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
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Registrando..." : "Salvar Rendimento"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RendimentoFinalForm;

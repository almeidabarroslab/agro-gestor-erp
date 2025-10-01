import React, { useState } from 'react';

const CadastroRecursoForm = ({
  onClose,
  addRecurso,
  recursoEdit,
  updateRecurso,
}) => {
  const [nome, setNome] = useState(recursoEdit ? recursoEdit.nome : "");
  const [tipo, setTipo] = useState(
    recursoEdit ? recursoEdit.tipo : "Fertilizante"
  );
  const [unidade, setUnidade] = useState(
    recursoEdit ? recursoEdit.unidade : "Kg"
  );
  const [estoque, setEstoque] = useState(recursoEdit ? recursoEdit.estoque : 0);
  const [custoUnitario, setCustoUnitario] = useState(
    recursoEdit ? recursoEdit.custoUnitario : 0
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const dadosRecurso = {
      nome,
      tipo,
      unidade,
      estoque: parseFloat(estoque),
      custoUnitario: parseFloat(custoUnitario),
      isInitial: false,
    };

    try {
      if (recursoEdit) {
        await updateRecurso(recursoEdit.id, dadosRecurso);
      } else {
        await addRecurso(dadosRecurso);
      }
      onClose();
    } catch (error) {
      console.error("Erro ao salvar recurso:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-2xl space-y-4 max-w-lg w-full">
      <h2 className="text-2xl font-bold text-orange-700">
        {recursoEdit ? "Editar Insumo" : "Novo Insumo em Estoque"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-gray-700"
          >
            Nome do Insumo (Ex: KNO3, Nim, etc.)
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 border"
          />
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label
              htmlFor="tipo"
              className="block text-sm font-medium text-gray-700"
            >
              Tipo
            </label>
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 border"
            >
              <option>Fertilizante</option>
              <option>Defensivo Agrícola</option>
              <option>Semente</option>
              <option>Outro</option>
            </select>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="unidade"
              className="block text-sm font-medium text-gray-700"
            >
              Unidade de Medida
            </label>
            <select
              id="unidade"
              value={unidade}
              onChange={(e) => setUnidade(e.target.value)}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 border"
            >
              <option>Kg</option>
              <option>L</option>
              <option>un</option>
              <option>Pacote</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label
              htmlFor="estoque"
              className="block text-sm font-medium text-gray-700"
            >
              Estoque Atual
            </label>
            <input
              type="number"
              id="estoque"
              value={estoque}
              onChange={(e) => setEstoque(e.target.value)}
              step="0.01"
              min="0"
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 border"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="custoUnitario"
              className="block text-sm font-medium text-gray-700"
            >
              Custo Unitário (R$ / {unidade})
            </label>
            <input
              type="number"
              id="custoUnitario"
              value={custoUnitario}
              onChange={(e) => setCustoUnitario(e.target.value)}
              step="0.01"
              min="0"
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 border"
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
            className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading
              ? "Salvando..."
              : recursoEdit
              ? "Atualizar Insumo"
              : "Adicionar Insumo"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroRecursoForm;

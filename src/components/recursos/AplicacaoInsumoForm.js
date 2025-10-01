import React, { useState } from 'react';
import { formatarMoeda } from '../../utils/helpers';

const AplicacaoInsumoForm = ({
  plantacao,
  recursos,
  onClose,
  updatePlantacao,
  updateRecurso,
}) => {
  const [selectedRecursoId, setSelectedRecursoId] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [dataAplicacao, setDataAplicacao] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const recursosDisponiveis = recursos.filter((r) => r.estoque > 0);
  const recursoSelecionado = recursosDisponiveis.find(
    (r) => r.id === selectedRecursoId
  );
  const custo = recursoSelecionado
    ? parseFloat(quantidade) * recursoSelecionado.custoUnitario
    : 0;

  const handleSave = async (e) => {
    e.preventDefault();
    setError(null);
    if (!recursoSelecionado) {
      setError("Selecione um insumo válido.");
      return;
    }
    if (parseFloat(quantidade) <= 0) {
      setError("Quantidade deve ser maior que zero.");
      return;
    }
    if (parseFloat(quantidade) > recursoSelecionado.estoque) {
      setError(
        `Estoque insuficiente! Disponível: ${recursoSelecionado.estoque} ${recursoSelecionado.unidade}`
      );
      return;
    }

    setIsLoading(true);

    try {
      const novaAplicacao = {
        recursoId: recursoSelecionado.id,
        nomeRecurso: recursoSelecionado.nome,
        unidade: recursoSelecionado.unidade,
        quantidade: parseFloat(quantidade),
        custo: custo,
        data: dataAplicacao,
        recordedAt: new Date().toISOString(),
      };
      const aplicacoes = [...(plantacao.aplicacoes || []), novaAplicacao];
      await updatePlantacao(plantacao.id, { aplicacoes });

      const novoEstoque = recursoSelecionado.estoque - parseFloat(quantidade);
      await updateRecurso(recursoSelecionado.id, { estoque: novoEstoque });

      onClose();
    } catch (error) {
      console.error("Erro ao registrar aplicação:", error);
      setError("Falha ao salvar a aplicação e atualizar o estoque.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-2xl space-y-4 max-w-lg w-full">
      <h2 className="text-2xl font-bold text-orange-700">
        Aplicar Insumo em: {plantacao.nome}
      </h2>
      {error && (
        <div className="bg-rose-100 text-rose-700 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label
            htmlFor="recurso"
            className="block text-sm font-medium text-gray-700"
          >
            Selecione o Insumo
          </label>
          <select
            id="recurso"
            value={selectedRecursoId}
            onChange={(e) => setSelectedRecursoId(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 border"
          >
            <option value="">-- Selecione um insumo --</option>
            {recursosDisponiveis.map((r) => (
              <option key={r.id} value={r.id}>
                {r.nome} ({r.tipo}) - Estoque: {r.estoque} {r.unidade}
              </option>
            ))}
          </select>
          {recursosDisponiveis.length === 0 && (
            <p className="mt-2 text-sm text-rose-500">
              Nenhum insumo com estoque disponível. Adicione no módulo de
              Insumos/Estoque.
            </p>
          )}
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label
              htmlFor="quantidade"
              className="block text-sm font-medium text-gray-700"
            >
              Quantidade Usada ({recursoSelecionado?.unidade || "un"})
            </label>
            <input
              type="number"
              id="quantidade"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              step="0.01"
              min="0.01"
              required
              disabled={!selectedRecursoId}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 border"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="dataAplicacao"
              className="block text-sm font-medium text-gray-700"
            >
              Data de Aplicação
            </label>
            <input
              type="date"
              id="dataAplicacao"
              value={dataAplicacao}
              onChange={(e) => setDataAplicacao(e.target.value)}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 border"
            />
          </div>
        </div>
        {selectedRecursoId && (
          <p className="text-md font-bold text-gray-700 pt-2">
            Custo Desta Aplicação:{" "}
            <span className="text-rose-600">{formatarMoeda(custo)}</span>
          </p>
        )}
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
            {isLoading ? "Aplicando..." : "Confirmar Aplicação"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AplicacaoInsumoForm;

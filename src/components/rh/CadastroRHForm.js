import React, { useState } from 'react';
import LucideIcon from '../ui/LucideIcon';
import { simularGeracaoDescricaoVagaIA } from '../../services/gemini';

const CadastroRHForm = ({ onClose, addMembro, membroEdit, updateMembro }) => {
  const [nome, setNome] = useState(membroEdit ? membroEdit.nome : "");
  const [funcao, setFuncao] = useState(
    membroEdit ? membroEdit.funcao : "Colhedor"
  );
  const [custoHora, setCustoHora] = useState(
    membroEdit ? membroEdit.custoHora : 15.0
  );
  const [status, setStatus] = useState(
    membroEdit ? membroEdit.status : "Ativo"
  );
  const [contato, setContato] = useState(membroEdit ? membroEdit.contato : "");
  const [isLoading, setIsLoading] = useState(false);

  const [descricaoVagaIA, setDescricaoVagaIA] = useState("");
  const [isLoadingIA, setIsLoadingIA] = useState(false);

  const handleGerarDescricao = async (e) => {
    e.preventDefault();
    if (!funcao || !custoHora) {
      setDescricaoVagaIA(
        "Preencha a Função e o Custo/Hora para gerar a descrição."
      );
      return;
    }

    setIsLoadingIA(true);
    setDescricaoVagaIA("");

    try {
      const result = await simularGeracaoDescricaoVagaIA(
        funcao,
        parseFloat(custoHora)
      );
      setDescricaoVagaIA(result.text);
    } catch (error) {
      setDescricaoVagaIA("Falha ao gerar a descrição da vaga pela IA.");
    } finally {
      setIsLoadingIA(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const dadosMembro = {
      nome,
      funcao,
      custoHora: parseFloat(custoHora),
      status,
      contato,
    };

    try {
      if (membroEdit) {
        await updateMembro(membroEdit.id, dadosMembro);
      } else {
        await addMembro(dadosMembro);
      }
      onClose();
    } catch (error) {
      console.error("Erro ao salvar membro:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-2xl space-y-4 max-w-4xl w-full">
      <h2 className="text-2xl font-bold text-rose-700">
        {membroEdit ? "Editar Membro da Equipe" : "Novo Membro da Equipe"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700"
            >
              Nome Completo
            </label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 p-2 border"
            />
          </div>
          <div>
            <label
              htmlFor="contato"
              className="block text-sm font-medium text-gray-700"
            >
              Contato (Telefone/Email)
            </label>
            <input
              type="text"
              id="contato"
              value={contato}
              onChange={(e) => setContato(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 p-2 border"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="funcao"
              className="block text-sm font-medium text-gray-700"
            >
              Função
            </label>
            <select
              id="funcao"
              value={funcao}
              onChange={(e) => setFuncao(e.target.value)}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 p-2 border"
            >
              <option>Colhedor</option>
              <option>Tratorista</option>
              <option>Agrônomo</option>
              <option>Administrativo</option>
              <option>Geral</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="custoHora"
              className="block text-sm font-medium text-gray-700"
            >
              Custo/Hora (R$)
            </label>
            <input
              type="number"
              id="custoHora"
              value={custoHora}
              onChange={(e) => setCustoHora(e.target.value)}
              step="0.01"
              min="0"
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 p-2 border"
            />
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 p-2 border"
            >
              <option>Ativo</option>
              <option>Licença</option>
              <option>Inativo</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleGerarDescricao}
            disabled={isLoadingIA || !funcao || parseFloat(custoHora) <= 0}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            <LucideIcon name="Bot" className="w-4 h-4 mr-2" />
            {isLoadingIA
              ? "Gerando Descrição..."
              : "✨ Gerar Descrição de Vaga (IA)"}
          </button>
        </div>

        {descricaoVagaIA && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-300 rounded-xl shadow-inner max-h-64 overflow-y-auto">
            <h3 className="text-md font-bold text-blue-800 mb-2">
              Descrição Gerada:
            </h3>
            <div className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
              {descricaoVagaIA}
            </div>
          </div>
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
            className="px-4 py-2 text-sm font-medium text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading
              ? "Salvando..."
              : membroEdit
              ? "Atualizar Membro"
              : "Adicionar Membro"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroRHForm;

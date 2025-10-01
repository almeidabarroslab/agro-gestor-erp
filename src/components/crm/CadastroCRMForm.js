import React, { useState } from 'react';

const CadastroCRMForm = ({
  onClose,
  addContato,
  contatoEdit,
  updateContato,
}) => {
  const [nome, setNome] = useState(contatoEdit ? contatoEdit.nome : "");
  const [tipo, setTipo] = useState(contatoEdit ? contatoEdit.tipo : "Cliente");
  const [documento, setDocumento] = useState(
    contatoEdit ? contatoEdit.documento : ""
  );
  const [telefone, setTelefone] = useState(
    contatoEdit ? contatoEdit.telefone : ""
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const dadosContato = {
      nome,
      tipo,
      documento,
      telefone,
    };

    try {
      if (contatoEdit) {
        await updateContato(contatoEdit.id, dadosContato);
      } else {
        await addContato(dadosContato);
      }
      onClose();
    } catch (error) {
      console.error("Erro ao salvar contato:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-2xl space-y-4 max-w-lg w-full">
      <h2 className="text-2xl font-bold text-sky-700">
        {contatoEdit ? "Editar Contato" : "Novo Cliente ou Fornecedor"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-gray-700"
          >
            Nome/Razão Social
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
          />
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label
              htmlFor="tipo"
              className="block text-sm font-medium text-gray-700"
            >
              Tipo de Contato
            </label>
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
            >
              <option>Cliente</option>
              <option>Fornecedor</option>
            </select>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="documento"
              className="block text-sm font-medium text-gray-700"
            >
              CPF/CNPJ
            </label>
            <input
              type="text"
              id="documento"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="telefone"
            className="block text-sm font-medium text-gray-700"
          >
            Telefone
          </label>
          <input
            type="tel"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
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
            className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading
              ? "Salvando..."
              : contatoEdit
              ? "Atualizar Contato"
              : "Adicionar Contato"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroCRMForm;

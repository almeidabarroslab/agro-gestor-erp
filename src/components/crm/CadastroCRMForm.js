import React, { useState } from 'react';

const CadastroCRMForm = ({
  onClose,
  addContato,
  contatoEdit,
  updateContato,
}) => {
  const [nome, setNome] = useState(contatoEdit ? contatoEdit.nome : '');
  const [tipo, setTipo] = useState(contatoEdit ? contatoEdit.tipo : 'Cliente');
  const [documento, setDocumento] = useState(
    contatoEdit ? contatoEdit.documento : ''
  );
  const [telefone, setTelefone] = useState(
    contatoEdit ? contatoEdit.telefone : ''
  );
  const [email, setEmail] = useState(contatoEdit ? contatoEdit.email : '');
  const [endereco, setEndereco] = useState(
    contatoEdit ? contatoEdit.endereco : ''
  );
  const [origem, setOrigem] = useState(contatoEdit ? contatoEdit.origem : '');
  const [status, setStatus] = useState(
    contatoEdit ? contatoEdit.status : 'Ativo'
  );
  const [historico, setHistorico] = useState(
    contatoEdit ? contatoEdit.historico : ''
  );
  const [dataNascimento, setDataNascimento] = useState(
    contatoEdit ? contatoEdit.dataNascimento : ''
  );
  const [inscricaoEstadual, setInscricaoEstadual] = useState(
    contatoEdit ? contatoEdit.inscricaoEstadual : ''
  );
  const [nomePropriedade, setNomePropriedade] = useState(
    contatoEdit ? contatoEdit.nomePropriedade : ''
  );
  const [tamanhoPropriedade, setTamanhoPropriedade] = useState(
    contatoEdit ? contatoEdit.tamanhoPropriedade : ''
  );
  const [cultura, setCultura] = useState(
    contatoEdit ? contatoEdit.cultura : ''
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
      email,
      endereco,
      origem,
      status,
      historico,
      dataNascimento,
      inscricaoEstadual,
      nomePropriedade,
      tamanhoPropriedade,
      cultura,
    };

    try {
      if (contatoEdit) {
        await updateContato(contatoEdit.id, dadosContato);
      } else {
        await addContato(dadosContato);
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar contato:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-2xl space-y-4 max-w-lg w-full">
      <h2 className="text-2xl font-bold text-sky-700">
        {contatoEdit ? 'Editar Contato' : 'Novo Cliente ou Fornecedor'}
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

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
          />
        </div>

        <div>
          <label
            htmlFor="endereco"
            className="block text-sm font-medium text-gray-700"
          >
            Endereço
          </label>
          <input
            type="text"
            id="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
          />
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label
              htmlFor="origem"
              className="block text-sm font-medium text-gray-700"
            >
              Origem do Contato
            </label>
            <select
              id="origem"
              value={origem}
              onChange={(e) => setOrigem(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
            >
              <option>Indicação</option>
              <option>Feira/Evento</option>
              <option>Mídia Social</option>
              <option>Site</option>
              <option>Outro</option>
            </select>
          </div>
          <div className="w-1/2">
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
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
            >
              <option>Ativo</option>
              <option>Inativo</option>
              <option>Lead</option>
              <option>Em Negociação</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="dataNascimento"
            className="block text-sm font-medium text-gray-700"
          >
            Data de Nascimento/Fundação
          </label>
          <input
            type="date"
            id="dataNascimento"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
          />
        </div>

        <div>
          <label
            htmlFor="inscricaoEstadual"
            className="block text-sm font-medium text-gray-700"
          >
            Inscrição Estadual
          </label>
          <input
            type="text"
            id="inscricaoEstadual"
            value={inscricaoEstadual}
            onChange={(e) => setInscricaoEstadual(e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
          />
        </div>

        <h3 className="text-xl font-semibold text-sky-600 pt-4 border-t mt-6">
          Informações da Propriedade
        </h3>

        <div>
          <label
            htmlFor="nomePropriedade"
            className="block text-sm font-medium text-gray-700"
          >
            Nome da Propriedade
          </label>
          <input
            type="text"
            id="nomePropriedade"
            value={nomePropriedade}
            onChange={(e) => setNomePropriedade(e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
          />
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label
              htmlFor="tamanhoPropriedade"
              className="block text-sm font-medium text-gray-700"
            >
              Tamanho (hectares)
            </label>
            <input
              type="number"
              id="tamanhoPropriedade"
              value={tamanhoPropriedade}
              onChange={(e) => setTamanhoPropriedade(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="cultura"
              className="block text-sm font-medium text-gray-700"
            >
              Principal Cultura
            </label>
            <input
              type="text"
              id="cultura"
              value={cultura}
              onChange={(e) => setCultura(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="historico"
            className="block text-sm font-medium text-gray-700"
          >
            Histórico de Interações
          </label>
          <textarea
            id="historico"
            rows="3"
            value={historico}
            onChange={(e) => setHistorico(e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
            placeholder="Registre aqui as conversas, negociações, etc."
          ></textarea>
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
              ? 'Salvando...'
              : contatoEdit
              ? 'Atualizar Contato'
              : 'Adicionar Contato'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroCRMForm;

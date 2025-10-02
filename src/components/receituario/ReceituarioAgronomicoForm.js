import React, { useState } from "react";
import LucideIcon from "../ui/LucideIcon";

const ReceituarioAgronomicoForm = ({
  onClose,
  onSave,
  contatos,
  plantacoes,
  recursos,
}) => {
  const [cliente, setCliente] = useState("");
  const [propriedade, setPropriedade] = useState("");
  const [cultura, setCultura] = useState("");
  const [alvo, setAlvo] = useState("");
  const [produto, setProduto] = useState("");
  const [dosagem, setDosagem] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [recomendacao, setRecomendacao] = useState("");
  const [embalagem, setEmbalagem] = useState("");
  const [epoca, setEpoca] = useState("");
  const [carencia, setCarencia] = useState("");
  const [equipamento, setEquipamento] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const receituarioData = {
      cliente,
      propriedade,
      cultura,
      alvo,
      produto,
      dosagem,
      observacoes,
      diagnostico,
      recomendacao,
      embalagem,
      epoca,
      carencia,
      equipamento,
    };
    onSave(receituarioData);
    onClose();
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-2xl space-y-4 w-full">
      <h2 className="text-2xl font-bold text-sky-700 flex items-center">
        <LucideIcon name="FileText" className="w-6 h-6 mr-2" />
        Emitir Receituário Agronômico
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Cliente e Propriedade */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Cliente
            </label>
            <select
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
              required
            >
              <option value="">Selecione o Cliente</option>
              {contatos
                .filter((c) => c.tipo === "Cliente")
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Propriedade
            </label>
            <input
              type="text"
              placeholder="Nome da Fazenda/Sítio"
              value={propriedade}
              onChange={(e) => setPropriedade(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
              required
            />
          </div>
        </div>

        {/* Cultura e Alvo */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Cultura
            </label>
            <select
              value={cultura}
              onChange={(e) => setCultura(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
              required
            >
              <option value="">Selecione a Cultura</option>
              {[...new Set(plantacoes.map((p) => p.cultura))].map((cult) => (
                <option key={cult} value={cult}>
                  {cult}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Praga/Doença Alvo
            </label>
            <input
              type="text"
              placeholder="Ex: Ferrugem asiática"
              value={alvo}
              onChange={(e) => setAlvo(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
              required
            />
          </div>
        </div>

        {/* Diagnóstico */}
        <h3 className="text-xl font-semibold text-sky-600 pt-4 border-t mt-6">
          Diagnóstico e Recomendação
        </h3>
        <textarea
          placeholder="Diagnóstico detalhado da situação"
          value={diagnostico}
          onChange={(e) => setDiagnostico(e.target.value)}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border h-20"
        ></textarea>

        {/* Produto e Dosagem */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Produto Recomendado (Defensivo)
            </label>
            <select
              value={produto}
              onChange={(e) => setProduto(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
              required
            >
              <option value="">Selecione o Produto</option>
              {recursos
                .filter((r) => r.tipo === "Defensivo Agrícola")
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Dosagem
            </label>
            <input
              type="text"
              placeholder="Ex: 2L/ha"
              value={dosagem}
              onChange={(e) => setDosagem(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
              required
            />
          </div>
        </div>

        {/* Outros Detalhes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Embalagem e Devolução
            </label>
            <input
              type="text"
              placeholder="Ex: Devolver em posto credenciado"
              value={embalagem}
              onChange={(e) => setEmbalagem(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Época de Aplicação
            </label>
            <input
              type="text"
              placeholder="Ex: Início do florescimento"
              value={epoca}
              onChange={(e) => setEpoca(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Intervalo de Carência
            </label>
            <input
              type="text"
              placeholder="Ex: 15 dias para colheita"
              value={carencia}
              onChange={(e) => setCarencia(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Equipamento de Aplicação
            </label>
            <input
              type="text"
              placeholder="Ex: Pulverizador de barra"
              value={equipamento}
              onChange={(e) => setEquipamento(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
            />
          </div>
        </div>

        <textarea
          placeholder="Recomendações técnicas complementares"
          value={recomendacao}
          onChange={(e) => setRecomendacao(e.target.value)}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border h-20"
        ></textarea>

        {/* Observações */}
        <h3 className="text-xl font-semibold text-sky-600 pt-4 border-t mt-6">
          Observações Gerais
        </h3>
        <textarea
          placeholder="Outras observações e recomendações de aplicação"
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border h-24"
        ></textarea>

        {/* Botões */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition"
          >
            Emitir e Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReceituarioAgronomicoForm;

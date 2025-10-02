import React, { useState } from "react";
import LucideIcon from "../../components/ui/LucideIcon";

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
    <div className="p-6 bg-white rounded-xl shadow-2xl space-y-4 max-w-3xl w-full">
      <h2 className="text-2xl font-bold text-green-700 flex items-center mb-4">
        <LucideIcon name="FileText" className="w-6 h-6 mr-2" />
        Emitir Receituário Agronômico
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cliente
            </label>
            <select
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Propriedade
            </label>
            <input
              type="text"
              placeholder="Nome da Fazenda/Sítio"
              value={propriedade}
              onChange={(e) => setPropriedade(e.target.value)}
              className="input-base"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cultura
            </label>
            <select
              value={cultura}
              onChange={(e) => setCultura(e.target.value)}
              className="input-base"
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Praga/Doença Alvo
            </label>
            <input
              type="text"
              placeholder="Ex: Ferrugem asiática"
              value={alvo}
              onChange={(e) => setAlvo(e.target.value)}
              className="input-base"
              required
            />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-700 pt-4 border-t mt-6">
          Diagnóstico e Recomendação
        </h3>
        <textarea
className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border h-20"
        ></textarea>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Produto Recomendado
            </label>
            <select
              value={produto}
              onChange={(e) => setProduto(e.target.value)}
              className="input-base"
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dosagem
            </label>
            <input
              type="text"
              placeholder="Ex: 2L/ha"
              value={dosagem}
              onChange={(e) => setDosagem(e.target.value)}
              className="input-base"
              required
            />
          </div>
        </div>

        <textarea
          placeholder="Recomendações técnicas complementares"
          value={recomendacao}
          onChange={(e) => setRecomendacao(e.target.value)}
          className="input-base h-20"
        ></textarea>

        <h3 className="text-xl font-semibold text-gray-700 pt-4 border-t mt-6">
          Instruções de Aplicação
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Época de Aplicação
            </label>
            <input
              type="text"
              placeholder="Ex: Início do florescimento"
              value={epoca}
              onChange={(e) => setEpoca(e.target.value)}
              className="input-base"
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
              className="input-base"
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
              className="input-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Embalagem e Devolução
            </label>
            <input
              type="text"
              placeholder="Ex: Devolver em posto credenciado"
              value={embalagem}
              onChange={(e) => setEmbalagem(e.target.value)}
              className="input-base"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Observações Gerais
          </label>
          <textarea
            placeholder="Outras observações importantes"
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border h-24"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
            Cancelar
          </button>
          <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition disabled:opacity-50">
            Emitir e Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReceituarioAgronomicoForm;

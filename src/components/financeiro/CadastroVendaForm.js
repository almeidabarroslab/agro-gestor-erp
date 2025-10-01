import React, { useState } from 'react';
import LucideIcon from '../ui/LucideIcon';
import { simularEmissaoNFeIA } from '../../services/gemini';
import { formatarMoeda } from '../../utils/helpers';

const CadastroVendaForm = ({
  plantacoes,
  contatos,
  onClose,
  addVenda,
  getCustoTotalPlantacao,
}) => {
  const [selectedPlantacaoId, setSelectedPlantacaoId] = useState("");
  const [selectedClienteId, setSelectedClienteId] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valorUnitario, setValorUnitario] = useState("");
  const [dataVenda, setDataVenda] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showNFe, setShowNFe] = useState(false);
  const [nfeContent, setNfeContent] = useState("");
  const [isLoadingNFe, setIsLoadingNFe] = useState(false);

  const plantacoesColhidas = plantacoes.filter(
    (p) => p.status === "Colhida" && p.rendimentoFinal > 0
  );
  const plantacaoSelecionada = plantacoesColhidas.find(
    (p) => p.id === selectedPlantacaoId
  );

  const clientes = contatos.filter((c) => c.tipo === "Cliente");
  const clienteSelecionado = clientes.find((c) => c.id === selectedClienteId);

  const valorTotal = parseFloat(quantidade) * parseFloat(valorUnitario) || 0;
  const custoEstimado = plantacaoSelecionada
    ? getCustoTotalPlantacao(plantacaoSelecionada.id)
    : 0;
  const lucroBruto = valorTotal - custoEstimado;

  const handleSimularNFe = async () => {
    if (
      !plantacaoSelecionada ||
      !clienteSelecionado ||
      !quantidade ||
      !valorUnitario ||
      valorTotal <= 0
    ) {
      setError(
        "Preencha todos os campos da venda, incluindo o cliente, antes de simular a NF-e."
      );
      return;
    }

    setIsLoadingNFe(true);
    setNfeContent("");
    setShowNFe(true);

    try {
      const dadosVenda = {
        produto: plantacaoSelecionada.cultura,
        quantidade: parseFloat(quantidade),
        unidade: "Kg (Simulação)",
        valorTotal: valorTotal,
        dataVenda: dataVenda,
      };
      const result = await simularEmissaoNFeIA(dadosVenda, custoEstimado);
      setNfeContent(result.text);
    } catch (err) {
      setNfeContent("Falha ao se conectar com o sistema de simulação de NF-e.");
    } finally {
      setIsLoadingNFe(false);
    }
  };

  const handleSaveVenda = async (e) => {
    e.preventDefault();
    setError(null);
    if (
      !plantacaoSelecionada ||
      !clienteSelecionado ||
      valorTotal <= 0 ||
      parseFloat(quantidade) <= 0
    ) {
      setError(
        "Preencha todos os campos corretamente, incluindo o cliente. O valor total deve ser maior que zero."
      );
      return;
    }

    setIsLoading(true);

    const novaVenda = {
      plantacaoId: selectedPlantacaoId,
      clienteId: selectedClienteId,
      nomeCliente: clienteSelecionado.nome,
      cultura: plantacaoSelecionada.cultura,
      produto: plantacaoSelecionada.cultura,
      quantidade: parseFloat(quantidade),
      unidade: "Kg",
      valorUnitario: parseFloat(valorUnitario),
      valorTotal: valorTotal,
      custoInsumos: custoEstimado,
      lucroBruto: lucroBruto,
      dataVenda: dataVenda,
    };

    try {
      await addVenda(novaVenda);
      onClose();
    } catch (err) {
      console.error("Erro ao registrar venda:", err);
      setError("Falha ao registrar a venda.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-2xl space-y-4 max-w-4xl w-full">
      <h2 className="text-2xl font-bold text-blue-700">Registrar Nova Venda</h2>
      {error && (
        <div className="bg-rose-100 text-rose-700 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSaveVenda} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="plantacao"
              className="block text-sm font-medium text-gray-700"
            >
              Plantação Colhida (Origem)
            </label>
            <select
              id="plantacao"
              value={selectedPlantacaoId}
              onChange={(e) => {
                setSelectedPlantacaoId(e.target.value);
                setShowNFe(false);
                setNfeContent("");
              }}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            >
              <option value="">-- Selecione a plantação --</option>
              {plantacoesColhidas.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome} ({p.cultura}) - Rendimento: {p.rendimentoFinal}{" "}
                  Ton/Ha
                </option>
              ))}
            </select>
            {plantacoesColhidas.length === 0 && (
              <p className="mt-2 text-xs text-yellow-600">
                Nenhuma plantação colhida para venda.
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="cliente"
              className="block text-sm font-medium text-gray-700"
            >
              Cliente (Comprador)
            </label>
            <select
              id="cliente"
              value={selectedClienteId}
              onChange={(e) => {
                setSelectedClienteId(e.target.value);
                setShowNFe(false);
                setNfeContent("");
              }}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            >
              <option value="">-- Selecione o cliente --</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome} ({c.documento})
                </option>
              ))}
            </select>
            {clientes.length === 0 && (
              <p className="mt-2 text-xs text-rose-600">
                Cadastre clientes no módulo CRM.
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="quantidade"
              className="block text-sm font-medium text-gray-700"
            >
              Quantidade Vendida (Kg)
            </label>
            <input
              type="number"
              id="quantidade"
              value={quantidade}
              onChange={(e) => {
                setQuantidade(e.target.value);
                setShowNFe(false);
              }}
              step="0.01"
              min="0.01"
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>
          <div>
            <label
              htmlFor="valorUnitario"
              className="block text-sm font-medium text-gray-700"
            >
              Valor Unitário (R$/Kg)
            </label>
            <input
              type="number"
              id="valorUnitario"
              value={valorUnitario}
              onChange={(e) => {
                setValorUnitario(e.target.value);
                setShowNFe(false);
              }}
              step="0.01"
              min="0.01"
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>
          <div>
            <label
              htmlFor="dataVenda"
              className="block text-sm font-medium text-gray-700"
            >
              Data da Venda
            </label>
            <input
              type="date"
              id="dataVenda"
              value={dataVenda}
              onChange={(e) => {
                setDataVenda(e.target.value);
                setShowNFe(false);
              }}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-lg font-bold text-blue-700 flex justify-between">
            <span>VALOR TOTAL DA VENDA:</span>
            <span className="text-2xl font-extrabold">
              {formatarMoeda(valorTotal)}
            </span>
          </p>
          <p className="text-sm text-gray-600 flex justify-between">
            <span>Custo de Insumos Estimado:</span>
            <span className="font-semibold text-rose-600">
              {formatarMoeda(custoEstimado)}
            </span>
          </p>
          <p className="text-lg font-bold text-teal-700 flex justify-between border-t border-blue-300 mt-2 pt-2">
            <span>LUCRO BRUTO ESTIMADO:</span>
            <span className="font-extrabold">{formatarMoeda(lucroBruto)}</span>
          </p>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleSimularNFe}
            disabled={
              !plantacaoSelecionada ||
              !clienteSelecionado ||
              valorTotal <= 0 ||
              isLoadingNFe
            }
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition disabled:bg-gray-400"
          >
            <LucideIcon name="Bot" className="w-4 h-4 mr-2" />
            {isLoadingNFe ? "Simulando NF-e..." : "Simular Emissão NF-e (IA)"}
          </button>
          <div className="flex space-x-3">
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
              disabled={
                isLoading ||
                valorTotal <= 0 ||
                !plantacaoSelecionada ||
                !clienteSelecionado
              }
            >
              {isLoading ? "Registrando..." : "Registrar Venda"}
            </button>
          </div>
        </div>
      </form>

      {showNFe && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-300 rounded-xl shadow-inner max-h-96 overflow-y-auto">
          <h3 className="text-xl font-bold text-yellow-800 mb-3 flex items-center">
            <LucideIcon name="Receipt" className="w-5 h-5 mr-2" /> Simulação de
            NF-e (IA)
          </h3>
          <div className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
            {nfeContent || "Gerando conteúdo..."}
          </div>
        </div>
      )}
    </div>
  );
};

export default CadastroVendaForm;

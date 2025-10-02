import React, { useState, useEffect } from "react";
import LucideIcon from "../../components/ui/LucideIcon";

const CadastroMaquinarioForm = ({
  onSave,
  onClose,
  maquinaEdit,
  updateMaquina,
}) => {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [custoHora, setCustoHora] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (maquinaEdit) {
      setNome(maquinaEdit.nome || "");
      setTipo(maquinaEdit.tipo || "");
      setMarca(maquinaEdit.marca || "");
      setModelo(maquinaEdit.modelo || "");
      setAno(maquinaEdit.ano || "");
      setCustoHora(maquinaEdit.custoHora || "");
    }
  }, [maquinaEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const maquinaData = {
      nome,
      tipo,
      marca,
      modelo,
      ano: Number(ano),
      custoHora: parseFloat(custoHora),
    };
    try {
      if (maquinaEdit) {
        await updateMaquina(maquinaEdit.id, maquinaData);
      } else {
        await onSave(maquinaData);
      }
      onClose();
    } catch (error) {
      console.error("Erro ao salvar máquina:", error);
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-xl shadow-2xl space-y-6 max-w-lg w-full"
    >
      <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
        <LucideIcon name="Tractor" className="w-6 h-6 mr-2 text-blue-600" />
        {maquinaEdit ? "Editar Máquina" : "Cadastrar Nova Máquina"}
      </h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Nome da Máquina (ex: Trator John Deere)"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="input-base"
          required
        />
        <input
          type="text"
          placeholder="Tipo (ex: Trator, Colheitadeira)"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="input-base"
        />
        <input
          type="text"
          placeholder="Marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          className="input-base"
        />
        <input
          type="text"
          placeholder="Modelo"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          className="input-base"
        />
        <input
          type="number"
          placeholder="Ano"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          className="input-base"
        />
        <input
          type="number"
          step="0.01"
          placeholder="Custo por Hora (R$)"
          value={custoHora}
          onChange={(e) => setCustoHora(e.target.value)}
          className="input-base"
          required
        />
      </div>
      <div className="flex justify-end space-x-4 pt-4 mt-4 border-t">
        <button type="button" onClick={onClose} className="btn-secondary">
          Cancelar
        </button>
        <button
          type="submit"
          className="btn-primary bg-blue-600 hover:bg-blue-700"
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default CadastroMaquinarioForm;

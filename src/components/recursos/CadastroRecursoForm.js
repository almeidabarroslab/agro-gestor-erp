import React, { useState } from "react";
import FormWrapper from "../ui/FormWrapper";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";

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
    <FormWrapper
      title={recursoEdit ? "Editar Insumo" : "Novo Insumo em Estoque"}
      onSubmit={handleSubmit}
      onCancel={onClose}
      submitLabel={recursoEdit ? "Atualizar Insumo" : "Adicionar Insumo"}
      isLoading={isLoading}
      maxWidth="max-w-2xl"
    >
      <FormInput
        label="Nome do Insumo"
        id="nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
        placeholder="Ex: KNO3, Nim, etc."
      />

      <div className="grid grid-cols-2 gap-4">
        <FormSelect
          label="Tipo"
          id="tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          options={["Fertilizante", "Defensivo Agrícola", "Semente", "Outro"]}
          required
        />
        <FormSelect
          label="Unidade de Medida"
          id="unidade"
          value={unidade}
          onChange={(e) => setUnidade(e.target.value)}
          options={["Kg", "L", "un", "Pacote"]}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="Estoque Atual"
          id="estoque"
          type="number"
          value={estoque}
          onChange={(e) => setEstoque(e.target.value)}
          step="0.01"
          min="0"
          required
        />
        <FormInput
          label={`Custo Unitário (R$ / ${unidade})`}
          id="custoUnitario"
          type="number"
          value={custoUnitario}
          onChange={(e) => setCustoUnitario(e.target.value)}
          step="0.01"
          min="0"
          required
        />
      </div>
    </FormWrapper>
  );
};

export default CadastroRecursoForm;

import React, { useState, useMemo } from "react";
import { CULTURES } from "../../utils/constants";
import DefinirAreaMapa from "./DefinirAreaMapa";
import FormWrapper from "../ui/FormWrapper";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";

const CadastroPlantacaoForm = ({
  onSave,
  onClose,
  plantacaoEdit,
  updatePlantacao,
}) => {
  const [nome, setNome] = useState(plantacaoEdit ? plantacaoEdit.nome : "");
  const [areaHa, setAreaHa] = useState(
    plantacaoEdit ? plantacaoEdit.areaHa : ""
  );
  const [dataPlantio, setDataPlantio] = useState(
    plantacaoEdit ? plantacaoEdit.dataPlantio.split("T")[0] : ""
  );
  const [cultura, setCultura] = useState(
    plantacaoEdit ? plantacaoEdit.cultura : CULTURES[0]
  );
  const [areaGeo, setAreaGeo] = useState(
    plantacaoEdit ? plantacaoEdit.areaGeo : null
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const dadosPlantacao = {
      nome,
      areaHa: parseFloat(areaHa),
      dataPlantio,
      cultura,
      status: plantacaoEdit ? plantacaoEdit.status : "Plantada",
      areaGeo,
    };
    try {
      if (plantacaoEdit) {
        await updatePlantacao(plantacaoEdit.id, dadosPlantacao);
      } else {
        await onSave(dadosPlantacao);
      }
      onClose();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      setIsLoading(false);
    }
  };

  const areaInicialGeoJSON = useMemo(() => {
    if (!plantacaoEdit || !plantacaoEdit.areaGeo) return null;
    const coordinates = plantacaoEdit.areaGeo.map((p) => [
      p.longitude,
      p.latitude,
    ]);
    return {
      type: "Polygon",
      coordinates: [coordinates],
    };
  }, [plantacaoEdit]);

  return (
    <FormWrapper
      title={plantacaoEdit ? "Editar Plantação" : "Nova Plantação"}
      onSubmit={handleSubmit}
      onCancel={onClose}
      submitLabel={plantacaoEdit ? "Atualizar Plantação" : "Criar Plantação"}
      isLoading={isLoading}
      maxWidth="max-w-3xl"
    >
      <FormInput
        label="Nome da Plantação"
        id="nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
        placeholder="Ex: Talhão 01 - Norte"
      />

      <FormSelect
        label="Tipo de Cultura"
        id="cultura"
        value={cultura}
        onChange={(e) => setCultura(e.target.value)}
        options={CULTURES}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="Área (Ha)"
          id="areaHa"
          type="number"
          value={areaHa}
          onChange={(e) => setAreaHa(e.target.value)}
          step="0.01"
          min="0.1"
          required
        />
        <FormInput
          label="Data de Plantio"
          id="dataPlantio"
          type="date"
          value={dataPlantio}
          onChange={(e) => setDataPlantio(e.target.value)}
          required
        />
      </div>

      <DefinirAreaMapa
        onAreaDefined={setAreaGeo}
        onAreaCalculated={setAreaHa}
        areaInicial={areaInicialGeoJSON}
      />
    </FormWrapper>
  );
};

export default CadastroPlantacaoForm;

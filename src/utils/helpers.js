export const formatarData = (isoDate) => {
  if (!isoDate) return "N/A";
  const date = new Date(isoDate);
  return date.toLocaleDateString("pt-BR");
};

export const formatarMoeda = (valor) => {
  if (typeof valor !== "number" || isNaN(valor)) return "R$ 0,00";
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export const calcularDiasPlantio = (dataPlantioISO, dataReferenciaISO = null) => {
  if (!dataPlantioISO) return "N/A";
  const dataPlantio = new Date(dataPlantioISO);
  const dataReferencia = dataReferenciaISO
    ? new Date(dataReferenciaISO)
    : new Date();
  dataPlantio.setHours(0, 0, 0, 0);
  dataReferencia.setHours(0, 0, 0, 0);

  const diffTime = dataReferencia.getTime() - dataPlantio.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};
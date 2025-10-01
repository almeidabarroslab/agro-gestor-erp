export const CULTURES = [
  "Melancia Sem Semente",
  "Melancia Sakata",
  "Tomate Híbrido Landaw",
  "Quiabo Chifre de Veado",
];

export const INITIAL_RESOURCES = [
  {
    nome: "NPK 4-14-8",
    tipo: "Fertilizante",
    unidade: "Kg",
    estoque: 500.0,
    custoUnitario: 3.5,
    isInitial: true,
  },
  {
    nome: "Nitrato de Cálcio",
    tipo: "Fertilizante",
    unidade: "Kg",
    estoque: 150.0,
    custoUnitario: 8.2,
    isInitial: true,
  },
  {
    nome: "Cloreto de Potássio (KCL)",
    tipo: "Fertilizante",
    unidade: "Kg",
    estoque: 300.0,
    custoUnitario: 5.8,
    isInitial: true,
  },
  {
    nome: "Inseticida Pulgões/Tripes",
    tipo: "Defensivo Agrícola",
    unidade: "L",
    estoque: 20.0,
    custoUnitario: 45.0,
    isInitial: true,
  },
  {
    nome: "Fungicida Preventivo",
    tipo: "Defensivo Agrícola",
    unidade: "L",
    estoque: 15.0,
    custoUnitario: 65.0,
    isInitial: true,
  },
  {
    nome: "Tomate Semente Landaw (Pacotes)",
    tipo: "Semente",
    unidade: "Pacote",
    estoque: 10.0,
    custoUnitario: 120.0,
    isInitial: true,
  },
  {
    nome: "Quiabo Semente Chifre de Veado",
    tipo: "Semente",
    unidade: "Pacote",
    estoque: 5.0,
    custoUnitario: 55.0,
    isInitial: true,
  },
];

export const AGRONOMY_PROMPTS = {
  "Melancia Sem Semente": {
    focus:
      "Ciclo de melancia sem semente. Foco em Potássio (K) na frutificação e prevenção de doenças como Míldio e Fusarium.",
    context:
      "Melancia sem semente exige foco em Potássio na fase reprodutiva e atenção a pragas como Pulgão e Tripes. Atingir alto teor de sólidos solúveis é crucial.",
  },
  "Melancia Sakata": {
    focus:
      "Melancia Sakata (variedades de alta produtividade). Foco em bom pegamento de frutos, nutrição equilibrada, e resistência a doenças específicas como Fon raça 1.",
    context:
      "Variedades Sakata (Olímpia, Galápagos) são precoces e visam alta produtividade. O manejo deve garantir nutrição precisa e boa pós-colheita. Controle rigoroso de pragas mastigadoras e sugadoras.",
  },
  "Tomate Híbrido Landaw": {
    focus:
      "Tomate Híbrido Landaw (cultivo de alta exigência). Ênfase em manejo hídrico, suprimento de Cálcio (Ca) e Boro (B) e controle de viroses e pragas como Traça, Mosca Branca e Broca.",
    context:
      "A cultura do tomate é muito exigente em Ca e B para evitar necrose apical (fundo preto). O excesso de Nitrogênio deve ser evitado. Controle de pragas vetoras de viroses é crítico.",
  },
  "Quiabo Chifre de Veado": {
    focus:
      "Quiabo Chifre de Veado. Foco no manejo de Pulgões, Mosca Branca e Nematoides, além da necessidade de colheitas diárias e nutrição (NPK) constante.",
    context:
      "Quiabo exige rotação de cultura devido a nematoides. O monitoramento de sugadores (pulgões, mosca branca) é vital para evitar perdas de produtividade. Manter boa umidade do solo é importante.",
  },
};

import { AGRONOMY_PROMPTS } from "../utils/constants";
import { formatarData, formatarMoeda } from "../utils/helpers";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

const MAX_RETRIES = 3;
const DELAY = 1000;

const retryFetch = async (url, options) => {
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return response;
    } catch (error) {
      if (i === MAX_RETRIES - 1) throw error;
      await new Promise((resolve) =>
        setTimeout(resolve, DELAY * Math.pow(2, i))
      );
    }
  }
};

export const simularAnaliseIA = async (
  plantacao,
  ultimoCrescimento,
  diasPlantio
) => {
  const apiKey = API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

  const culturaPrompt =
    AGRONOMY_PROMPTS[plantacao.cultura] ||
    AGRONOMY_PROMPTS["Melancia Sem Semente"];

  const userQuery = `Análise Agronômica para a cultura de ${
    plantacao.cultura
  }: A plantação "${
    plantacao.nome
  }" está no ${diasPlantio}º dia desde o plantio. A última medição (em ${formatarData(
    ultimoCrescimento.data
  )}) indicou uma altura média de ${
    ultimoCrescimento.alturaCm
  } cm e um número médio de ${ultimoCrescimento.folhasPorPlanta} folhas.
    Contexto Específico: ${culturaPrompt.context}
    Com base no ciclo de vida típico para esta cultura, identifique os principais desafios ou necessidades (nutricionais, de pragas/doenças) para esta fase de crescimento e forneça uma recomendação concisa de ação imediata para o produtor. Responda em Português-BR.`;

  const systemPrompt = `Você é um engenheiro agrônomo especialista em cultura de ${plantacao.cultura} e fornece análises precisas e práticas. Seu foco é prevenção de problemas e otimização de produtividade. Foco Primário: ${culturaPrompt.focus}`;

  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    tools: [{ google_search: {} }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };

  try {
    const response = await retryFetch(apiUrl, options);
    const result = await response.json();
    const candidate = result.candidates?.[0];

    if (candidate && candidate.content?.parts?.[0]?.text) {
      const text = candidate.content.parts[0].text;
      let sources = [];
      const groundingMetadata = candidate.groundingMetadata;
      if (groundingMetadata && groundingMetadata.groundingAttributions) {
        sources = groundingMetadata.groundingAttributions
          .map((attribution) => ({
            uri: attribution.web?.uri,
            title: attribution.web?.title,
          }))
          .filter((source) => source.uri && source.title);
      }
      return { text, sources };
    }
    return {
      text: "Falha ao obter análise da IA. Tente novamente.",
      sources: [],
    };
  } catch (error) {
    console.error("Erro na chamada da API Gemini:", error);
    return {
      text: "Erro de conexão ou servidor da IA. Por favor, verifique o console para mais detalhes.",
      sources: [],
    };
  }
};

export const simularPlanoRecursosIA = async (cultura, areaHa) => {
  const apiKey = API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

  const culturaPrompt =
    AGRONOMY_PROMPTS[cultura] || AGRONOMY_PROMPTS["Melancia Sem Semente"];

  const userQuery = `Gere um Plano de Aplicação de Insumos e um Cronograma Agronômico de 30 dias para a cultura de ${cultura}, com uma área total de ${areaHa} hectares.
    Divida o plano em 3 fases (Semana 1-2, Semana 3-4, Semana 5-6). Para cada fase, liste:
    1. Atividades Cruciais (Ex: irrigação, desbaste, controle de pragas).
    2. Nutrientes Focais (Ex: NPK específico, Ca, B, K).
    3. Insumos Sugeridos e Quantidade TOTAL ESTIMADA NECESSÁRIA para os ${areaHa} hectares.
    Foque nos aspectos agronômicos críticos: ${culturaPrompt.focus}. Responda em Português-BR.`;

  const systemPrompt =
    "Você é um especialista em planejamento agrícola (ERP) e gera planos de insumos práticos e detalhados. Formate a saída usando tópicos e sub-tópicos de forma clara e profissional.";

  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    tools: [{ google_search: {} }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };

  try {
    const response = await retryFetch(apiUrl, options);
    const result = await response.json();
    const candidate = result.candidates?.[0];

    if (candidate && candidate.content?.parts?.[0]?.text) {
      const text = candidate.content.parts[0].text;
      let sources = [];
      const groundingMetadata = candidate.groundingMetadata;
      if (groundingMetadata && groundingMetadata.groundingAttributions) {
        sources = groundingMetadata.groundingAttributions
          .map((attribution) => ({
            uri: attribution.web?.uri,
            title: attribution.web?.title,
          }))
          .filter((source) => source.uri && source.title);
      }
      return { text, sources };
    }
    return {
      text: "Falha ao obter plano de recursos da IA. Tente novamente.",
      sources: [],
    };
  } catch (error) {
    console.error("Erro na chamada da API Gemini (Plano de Recursos):", error);
    return { text: "Erro de conexão ou servidor da IA.", sources: [] };
  }
};

export const simularEmissaoNFeIA = async (dadosVenda, custo) => {
  const apiKey = API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

  const lucroBruto = dadosVenda.valorTotal - custo;

  const userQuery = `Simule o conteúdo detalhado de uma Nota Fiscal Eletrônica (NF-e) e a seção de informações adicionais para uma venda agrícola, baseando-se nos seguintes dados:
    - Produto: ${dadosVenda.produto}
    - Quantidade: ${dadosVenda.quantidade} ${dadosVenda.unidade}
    - Valor Total da Nota: ${formatarMoeda(dadosVenda.valorTotal)}
    - Custo Total de Insumos (para fins internos/simulação): ${formatarMoeda(
      custo
    )}
    - Lucro Bruto Estimado: ${formatarMoeda(lucroBruto)}
    - Data da Venda: ${formatarData(dadosVenda.dataVenda)}
    
    Formate o resultado como um documento NF-e simulado, incluindo as seções: Cabeçalho (Remetente/Destinatário Fictícios), Detalhes do Produto, Cálculos Fiscais (simulados: ICMS, PIS, COFINS como 'A Definir - Simulação'), e, o mais importante, uma seção de **Informações Adicionais** que contenha a **Declaração de Conformidade Agronômica (Simulada)** e a **Margem de Lucro Bruta** da operação. Responda em Português-BR.`;

  const systemPrompt =
    "Você é um sistema de suporte fiscal e logístico que gera simulações de NF-e para o agronegócio. Garanta que o documento simulado tenha aparência profissional e destaque claramente a informação de lucro bruto na seção de informações adicionais.";

  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    tools: [{ google_search: {} }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };

  try {
    const response = await retryFetch(apiUrl, options);
    const result = await response.json();
    const candidate = result.candidates?.[0];

    if (candidate && candidate.content?.parts?.[0]?.text) {
      return { text: candidate.content.parts[0].text };
    }
    return { text: "Falha ao simular a NF-e. Tente novamente." };
  } catch (error) {
    console.error("Erro na chamada da API Gemini (NF-e):", error);
    return { text: "Erro de conexão ou servidor da IA." };
  }
};

export const simularGeracaoDescricaoVagaIA = async (funcao, custoHora) => {
  const apiKey = API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

  let senioridade = "Júnior/Pleno";
  if (custoHora >= 30) senioridade = "Pleno";
  if (custoHora >= 50) senioridade = "Sênior/Especialista";

  const userQuery = `Gere uma descrição de vaga profissional e atraente para a função de "${funcao}" no setor do agronegócio. A senioridade esperada é ${senioridade} (baseado no custo/hora de R$${custoHora}/h). Inclua as seções:
    1. Título da Vaga (com o nível de senioridade).
    2. Responsabilidades Chave (focadas na cultura de melancia/tomate/quiabo).
    3. Requisitos Essenciais e Desejáveis.
    4. Benefícios (Simulados).
    5. Como se Candidatar.
    Responda em Português-BR.`;

  const systemPrompt =
    "Você é um especialista em Recursos Humanos (RH) do agronegócio e gera descrições de vaga claras, detalhadas e profissionais.";

  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    tools: [{ google_search: {} }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };

  try {
    const response = await retryFetch(apiUrl, options);
    const result = await response.json();
    const candidate = result.candidates?.[0];

    if (candidate && candidate.content?.parts?.[0]?.text) {
      return { text: candidate.content.parts[0].text };
    }
    return { text: "Falha ao gerar a descrição da vaga. Tente novamente." };
  } catch (error) {
    console.error("Erro na chamada da API Gemini (RH):", error);
    return { text: "Erro de conexão ou servidor da IA." };
  }
};

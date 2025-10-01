import {
  simularAnaliseIA,
  simularPlanoRecursosIA,
  simularEmissaoNFeIA,
} from "src/services/gemini";
import { AGRONOMY_PROMPTS } from "src/utils/constants";

describe("Gemini Service", () => {
  const originalFetch = global.fetch;
  const originalError = console.error;

  beforeEach(() => {
    jest.setTimeout(20000);
    console.error = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    console.error = originalError;
  });

  test("testRetryFetchSucceedsAfterTransientFailureWithExponentialBackoff", async () => {
    const callTimes = [];
    let callCount = 0;

    global.fetch = async () => {
      callTimes.push(Date.now());
      callCount += 1;
      if (callCount === 1) {
        return { ok: false, status: 500 };
      }
      return {
        ok: true,
        json: async () => ({
          candidates: [
            {
              content: {
                parts: [{ text: "NF-e simulada gerada com sucesso" }],
              },
            },
          ],
        }),
      };
    };

    const dadosVenda = {
      produto: "Tomate",
      quantidade: 100,
      unidade: "caixas",
      valorTotal: 5000,
      dataVenda: new Date().toISOString(),
    };
    const result = await simularEmissaoNFeIA(dadosVenda, 3000);

    expect(result.text).toBe("NF-e simulada gerada com sucesso");
    expect(callTimes.length).toBe(2);
    const delta = callTimes[1] - callTimes[0];
    expect(delta).toBeGreaterThanOrEqual(900); // tolerate minor scheduling jitter
  });

  test("testSimularAnaliseIAReturnsTextAndFilteredSourcesOnValidCandidate", async () => {
    global.fetch = async () => ({
      ok: true,
      json: async () => ({
        candidates: [
          {
            content: { parts: [{ text: "Análise agronômica detalhada" }] },
            groundingMetadata: {
              groundingAttributions: [
                {
                  web: {
                    uri: "https://valid.example.com",
                    title: "Fonte Válida",
                  },
                },
                {
                  web: { uri: "https://missing-title.example.com", title: "" },
                },
                { web: { uri: "", title: "Sem URI" } },
              ],
            },
          },
        ],
      }),
    });

    const plantacao = { cultura: "Melancia Sakata", nome: "Lote A" };
    const ultimoCrescimento = {
      data: new Date().toISOString(),
      alturaCm: 25,
      folhasPorPlanta: 8,
    };
    const result = await simularAnaliseIA(plantacao, ultimoCrescimento, 15);

    expect(result.text).toBe("Análise agronômica detalhada");
    expect(Array.isArray(result.sources)).toBe(true);
    expect(result.sources).toEqual([
      { uri: "https://valid.example.com", title: "Fonte Válida" },
    ]);
  });

  test("testSimularPlanoRecursosIAPostsCorrectPayloadAndReturnsTextAndSources", async () => {
    let capturedOptions = null;

    global.fetch = async (url, options) => {
      capturedOptions = options;
      return {
        ok: true,
        json: async () => ({
          candidates: [
            {
              content: { parts: [{ text: "Plano de recursos gerado" }] },
              groundingMetadata: {
                groundingAttributions: [
                  { web: { uri: "https://a.com", title: "A" } },
                  { web: { uri: "", title: "Missing" } },
                ],
              },
            },
          ],
        }),
      };
    };

    const cultura = "Tomate Híbrido Landaw";
    const areaHa = 12.5;
    const result = await simularPlanoRecursosIA(cultura, areaHa);

    expect(result.text).toBe("Plano de recursos gerado");
    expect(result.sources).toEqual([{ uri: "https://a.com", title: "A" }]);

    expect(capturedOptions).toBeTruthy();
    expect(capturedOptions.method).toBe("POST");
    expect(capturedOptions.headers["Content-Type"]).toBe("application/json");

    const body = JSON.parse(capturedOptions.body);
    expect(Array.isArray(body.contents)).toBe(true);
    const userText = body.contents[0].parts[0].text;
    expect(userText).toContain(cultura);
    expect(userText).toContain(String(areaHa));
    expect(userText).toContain(AGRONOMY_PROMPTS[cultura].focus);

    expect(Array.isArray(body.tools)).toBe(true);
    expect(body.tools[0]).toHaveProperty("google_search");

    const systemText = body.systemInstruction.parts[0].text;
    expect(systemText).toContain("ERP");
  });

  test("testSimularAnaliseIAHandlesMaxRetryFailureGracefully", async () => {
    let calls = 0;
    global.fetch = async () => {
      calls += 1;
      return { ok: false, status: 503 };
    };

    const plantacao = { cultura: "Quiabo Chifre de Veado", nome: "Talhão 5" };
    const ultimoCrescimento = {
      data: new Date().toISOString(),
      alturaCm: 12,
      folhasPorPlanta: 5,
    };
    const result = await simularAnaliseIA(plantacao, ultimoCrescimento, 10);

    expect(result.text).toBe(
      "Erro de conexão ou servidor da IA. Por favor, verifique o console para mais detalhes."
    );
    expect(result.sources).toEqual([]);
    expect(calls).toBe(3);
  });

  test("testSimularEmissaoNFeIAReturnsFallbackWhenCandidateMissing", async () => {
    global.fetch = async () => ({
      ok: true,
      json: async () => ({
        candidates: [{ content: { parts: [{}] } }],
      }),
    });

    const dadosVenda = {
      produto: "Melancia",
      quantidade: 50,
      unidade: "un",
      valorTotal: 2000,
      dataVenda: new Date().toISOString(),
    };
    const result = await simularEmissaoNFeIA(dadosVenda, 1500);

    expect(result.text).toBe("Falha ao simular a NF-e. Tente novamente.");
  });

  test("testSimularAnaliseIAFallsBackToDefaultCulturePrompt", async () => {
    let capturedBody = null;

    global.fetch = async (url, options) => {
      capturedBody = JSON.parse(options.body);
      return {
        ok: true,
        json: async () => ({
          candidates: [
            {
              content: { parts: [{ text: "Análise com cultura padrão" }] },
            },
          ],
        }),
      };
    };

    const plantacao = { cultura: "CulturaDesconhecidaXYZ", nome: "Área 9" };
    const ultimoCrescimento = {
      data: new Date().toISOString(),
      alturaCm: 30,
      folhasPorPlanta: 10,
    };
    const result = await simularAnaliseIA(plantacao, ultimoCrescimento, 20);

    expect(result.text).toBe("Análise com cultura padrão");

    const defaultPrompt = AGRONOMY_PROMPTS["Melancia Sem Semente"];
    const userText = capturedBody.contents[0].parts[0].text;
    const systemText = capturedBody.systemInstruction.parts[0].text;

    expect(userText).toContain(defaultPrompt.context);
    expect(systemText).toContain(defaultPrompt.focus);
  });
});

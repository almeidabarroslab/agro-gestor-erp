import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Firebase and Hooks
import { useFirebase, setupInitialData } from "./firebase/config";
import usePlantacoes from "./hooks/usePlantacoes";
import useRecursos from "./hooks/useRecursos";
import useVendas from "./hooks/useVendas";
import useRH from "./hooks/useRH";
import useCRM from "./hooks/useCRM";
import useMaquinario from "./hooks/useMaquinario";
import useReceituarios from "./hooks/useReceituarios";
import useTasks from "./hooks/useTasks";

// UI Components
import SplashScreen from "./components/ui/SplashScreen";
import Modal from "./components/ui/Modal";
import MainNavigation from "./components/layout/MainNavigation";

// Views
import DashboardView from "./components/dashboard/DashboardView";
import PlantacoesView from "./components/plantacoes/PlantacoesView";
import RecursosView from "./components/recursos/RecursosView";
import VendasView from "./components/financeiro/VendasView";
import RHView from "./components/rh/RHView";
import CRMView from "./components/crm/CRMView";
import ProdutorRuralView from "./components/marketing/ProdutorRuralView";
import MaquinarioView from "./components/maquinario/MaquinarioView";
import ReceituarioView from "./components/receituario/ReceituarioView";
import MapaView from "./components/mapa/MapaView";
import AnaliseCustosView from "./components/analise/AnaliseCustosView";
import TaskView from "./components/tasks/TaskView";

// Forms and Modals
import CadastroPlantacaoForm from "./components/plantacoes/CadastroPlantacaoForm";
import RastreamentoCrescimentoForm from "./components/plantacoes/RastreamentoCrescimentoForm";
import RendimentoFinalForm from "./components/plantacoes/RendimentoFinalForm";
import DetalhesCrescimentoModal from "./components/plantacoes/DetalhesCrescimentoModal";
import GerarPlanoRecursosModal from "./components/plantacoes/GerarPlanoRecursosModal";
import CadastroRecursoForm from "./components/recursos/CadastroRecursoForm";
import AplicacaoInsumoForm from "./components/recursos/AplicacaoInsumoForm";
import CadastroVendaForm from "./components/financeiro/CadastroVendaForm";
import CadastroRHForm from "./components/rh/CadastroRHForm";
import CadastroCRMForm from "./components/crm/CadastroCRMForm";
import CadastroMaquinarioForm from "./components/maquinario/CadastroMaquinarioForm";
import ReceituarioAgronomicoForm from "./components/receituario/ReceituarioAgronomicoForm";

// Services
import { getWeatherForecast, getCurrentWeather } from "./services/weatherAPI";

const App = () => {
  const { db, auth, userId, isAuthReady, user } = useFirebase();
  const {
    plantacoes,
    isLoading,
    error,
    addPlantacao,
    updatePlantacao,
    getCustoTotalPlantacao,
  } = usePlantacoes(db, userId, isAuthReady);
  const {
    recursos,
    isLoadingRecursos,
    errorRecursos,
    addRecurso,
    updateRecurso,
  } = useRecursos(db, userId, isAuthReady);
  const { vendas, isLoadingVendas, errorVendas, addVenda } = useVendas(
    db,
    userId,
    isAuthReady
  );
  const { equipe, isLoadingRH, addMembro, updateMembro } = useRH(
    db,
    userId,
    isAuthReady
  );
  const {
    contatos,
    isLoadingCRM,
    addContato,
    updateContato,
    updateContatoStatus,
  } = useCRM(db, userId, isAuthReady);
  const { maquinario, isLoadingMaquinario, addMaquina, updateMaquina } =
    useMaquinario(db, userId, isAuthReady);
  const {
    receituarios,
    isLoading: isLoadingReceituarios,
    addReceituario,
  } = useReceituarios(db, userId, isAuthReady);
  // eslint-disable-next-line no-unused-vars
  const { tasks, addTask, updateTask, deleteTask } = useTasks(
    db,
    userId,
    isAuthReady
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    if (db && isAuthReady && auth.currentUser) {
      setupInitialData(db, userId);
    }
  }, [db, isAuthReady, userId, auth]);

  const openModal = (type, item = null) => {
    setSelectedItem(item);
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedItem(null);
  };

  const handleLogout = () => {
    auth.signOut();
  };

  const renderModalContent = () => {
    switch (modalType) {
      case "cadastro_plantacao":
        return (
          <CadastroPlantacaoForm
            onSave={addPlantacao}
            onClose={closeModal}
            plantacaoEdit={selectedItem}
            updatePlantacao={updatePlantacao}
          />
        );
      case "crescimento":
        return (
          <RastreamentoCrescimentoForm
            plantacao={selectedItem}
            onClose={closeModal}
            updatePlantacao={updatePlantacao}
          />
        );
      case "rendimento":
        return (
          <RendimentoFinalForm
            plantacao={selectedItem}
            onClose={closeModal}
            updatePlantacao={updatePlantacao}
          />
        );
      case "detalhes":
        return (
          <DetalhesCrescimentoModal
            plantacao={selectedItem}
            onClose={closeModal}
          />
        );
      case "cadastro_recurso":
        return (
          <CadastroRecursoForm
            onClose={closeModal}
            addRecurso={addRecurso}
            recursoEdit={selectedItem}
            updateRecurso={updateRecurso}
          />
        );
      case "aplicacao_insumo":
        return (
          <AplicacaoInsumoForm
            plantacao={selectedItem}
            recursos={recursos}
            onClose={closeModal}
            updatePlantacao={updatePlantacao}
            updateRecurso={updateRecurso}
          />
        );
      case "plano_recursos":
        return (
          <GerarPlanoRecursosModal
            plantacao={selectedItem}
            onClose={closeModal}
          />
        );
      case "cadastro_venda":
        return (
          <CadastroVendaForm
            plantacoes={plantacoes}
            contatos={contatos}
            onClose={closeModal}
            addVenda={addVenda}
            getCustoTotalPlantacao={getCustoTotalPlantacao}
          />
        );
      case "cadastro_rh":
        return (
          <CadastroRHForm
            onClose={closeModal}
            addMembro={addMembro}
            updateMembro={updateMembro}
            membroEdit={selectedItem}
          />
        );
      case "cadastro_crm":
        return (
          <CadastroCRMForm
            onClose={closeModal}
            addContato={addContato}
            updateContato={updateContato}
            contatoEdit={selectedItem}
          />
        );
      case "cadastro_maquinario":
        return (
          <CadastroMaquinarioForm
            onClose={closeModal}
            onSave={addMaquina}
            updateMaquina={updateMaquina}
            maquinaEdit={selectedItem}
          />
        );
      case "cadastro_receituario":
        return (
          <ReceituarioAgronomicoForm
            onClose={closeModal}
            onSave={addReceituario}
            contatos={contatos}
            plantacoes={plantacoes}
            recursos={recursos}
          />
        );
      default:
        return null;
    }
  };

  const fetchWeatherData = async () => {
    try {
      const latitude = -23.5505; // Exemplo: São Paulo
      const longitude = -46.6333;
      const currentWeather = await getCurrentWeather(latitude, longitude);
      const weatherForecast = await getWeatherForecast(latitude, longitude);
      setWeather(currentWeather);
      setForecast(weatherForecast);
      console.log("Clima Atual:", currentWeather);
      console.log("Previsão do Tempo:", weatherForecast);
    } catch (error) {
      console.error("Erro ao buscar dados climáticos:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (!isAuthReady) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <MainNavigation user={user} onLogout={handleLogout} />

      {/* Weather Info */}
      <div className="container mx-auto p-4">
        {weather && (
          <div className="mb-4 p-4 bg-gradient-to-r from-blue-200 to-blue-50 rounded-xl shadow flex flex-col md:flex-row md:items-center md:gap-8 border border-blue-300">
            <div className="flex items-center gap-2 mb-2 md:mb-0">
              <span className="text-3xl">🌤️</span>
              <span className="font-bold text-lg">Clima Atual:</span>
              <span className="capitalize text-blue-900">
                {weather.description ||
                  weather.weather?.[0]?.description ||
                  "-"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">🌡️ Temperatura:</span>
              <span className="text-blue-800">
                {weather.temp || weather.main?.temp || "-"}°C
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">💧 Umidade:</span>
              <span className="text-blue-800">
                {weather.humidity || weather.main?.humidity || "-"}%
              </span>
            </div>
          </div>
        )}
        {forecast && forecast.daily && (
          <div className="mb-4 p-4 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl shadow border border-blue-200">
            <span className="font-bold text-lg">
              Previsão dos próximos dias:
            </span>
            <ul className="flex flex-wrap gap-4 mt-2">
              {forecast.daily.slice(0, 3).map((day, idx) => (
                <li
                  key={idx}
                  className="p-3 bg-white rounded-lg shadow text-center min-w-[120px] border border-blue-100"
                >
                  <div className="font-semibold text-blue-700">
                    {new Date(day.dt * 1000).toLocaleDateString()}
                  </div>
                  <div className="text-2xl">
                    {day.weather?.[0]?.icon ? (
                      <img
                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                        alt="icon"
                        className="inline w-10 h-10"
                      />
                    ) : (
                      "☀️"
                    )}
                  </div>
                  <div className="text-blue-900">
                    Temp: <b>{day.temp?.day || "-"}°C</b>
                  </div>
                  <div className="capitalize text-blue-800">
                    {day.weather?.[0]?.description || "-"}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <main className="container mx-auto p-4">
        <Routes>
          <Route
            path="/"
            element={
              <DashboardView
                plantacoes={plantacoes}
                recursos={recursos}
                vendas={vendas}
                equipe={equipe}
              />
            }
          />
          <Route
            path="/plantacoes"
            element={
              <PlantacoesView
                plantacoes={plantacoes}
                isLoading={isLoading}
                error={error}
                openModal={openModal}
              />
            }
          />
          <Route
            path="/recursos"
            element={
              <RecursosView
                recursos={recursos}
                isLoading={isLoadingRecursos}
                error={errorRecursos}
                openRecursoModal={(r) => openModal("cadastro_recurso", r)}
              />
            }
          />
          <Route
            path="/vendas"
            element={
              <VendasView
                vendas={vendas}
                isLoading={isLoadingVendas}
                error={errorVendas}
                contatos={contatos}
                openVendaModal={() => openModal("cadastro_venda")}
              />
            }
          />
          <Route
            path="/rh"
            element={
              <RHView
                equipe={equipe}
                isLoadingRH={isLoadingRH}
                openMembroModal={(m) => openModal("cadastro_rh", m)}
              />
            }
          />
          <Route
            path="/crm"
            element={
              <CRMView
                contatos={contatos}
                isLoadingCRM={isLoadingCRM}
                openContatoModal={(c) => openModal("cadastro_crm", c)}
                updateContatoStatus={updateContatoStatus}
              />
            }
          />
          <Route path="/produtor-rural" element={<ProdutorRuralView />} />
          <Route
            path="/maquinario"
            element={
              <MaquinarioView
                maquinario={maquinario}
                isLoadingMaquinario={isLoadingMaquinario}
                openMaquinarioModal={(m) => openModal("cadastro_maquinario", m)}
              />
            }
          />
          <Route
            path="/receituarios"
            element={
              <ReceituarioView
                receituarios={receituarios}
                isLoading={isLoadingReceituarios}
                openReceituarioModal={() => openModal("cadastro_receituario")}
                contatos={contatos}
                recursos={recursos}
              />
            }
          />
          <Route path="/mapa" element={<MapaView plantacoes={plantacoes} />} />
          <Route
            path="/analise-custos"
            element={
              <AnaliseCustosView plantacoes={plantacoes} recursos={recursos} />
            }
          />
          <Route
            path="/tasks"
            element={
              <TaskView
                tasks={tasks}
                onAddTask={addTask}
                onEditTask={updateTask}
                onDeleteTask={deleteTask}
                resources={recursos}
                plantations={plantacoes}
                team={equipe}
              />
            }
          />
        </Routes>
      </main>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default App;

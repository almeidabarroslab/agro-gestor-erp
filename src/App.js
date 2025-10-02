import React, { useState, useEffect, useCallback } from "react";
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

  const openModal = useCallback((type, item = null) => {
    setSelectedItem(item);
    setModalType(type);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedItem(null);
  }, []);

  const handleLogout = useCallback(() => {
    auth.signOut();
  }, [auth]);

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
      const latitude = -22.6083;
      const longitude = -47.3811;
      const currentWeather = await getCurrentWeather(latitude, longitude);
      const weatherForecast = await getWeatherForecast(latitude, longitude);
      setWeather(currentWeather);
      setForecast(weatherForecast);
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

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Routes>
          <Route
            path="/"
            element={
              <DashboardView
                plantacoes={plantacoes}
                recursos={recursos}
                vendas={vendas}
                equipe={equipe}
                weather={weather}
                forecast={forecast}
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

export default React.memo(App);

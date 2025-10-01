import React, { useState, useEffect } from "react";

// Firebase and Hooks
import { useFirebase, setupInitialData } from "./firebase/config";
import usePlantacoes from "./hooks/usePlantacoes";
import useRecursos from "./hooks/useRecursos";
import useVendas from "./hooks/useVendas";
import useRH from "./hooks/useRH";
import useCRM from "./hooks/useCRM";

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

// Constants
const VIEW_PLANTACOES = "plantacoes";
const VIEW_RECURSOS = "recursos";
const VIEW_FINANCEIRO = "financeiro";
const VIEW_RH = "rh";
const VIEW_CRM = "crm";
const VIEW_DASHBOARD = "dashboard";

const App = () => {
  const { db, auth, userId, isAuthReady } = useFirebase();
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
  const { contatos, isLoadingCRM, addContato, updateContato } = useCRM(
    db,
    userId,
    isAuthReady
  );

  const [currentView, setCurrentView] = useState(VIEW_DASHBOARD);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

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
      default:
        return null;
    }
  };

  const renderView = () => {
    switch (currentView) {
      case VIEW_RECURSOS:
        return (
          <RecursosView
            recursos={recursos}
            isLoading={isLoadingRecursos}
            error={errorRecursos}
            openRecursoModal={(r) => openModal("cadastro_recurso", r)}
          />
        );
      case VIEW_FINANCEIRO:
        return (
          <VendasView
            vendas={vendas}
            isLoading={isLoadingVendas}
            error={errorVendas}
            contatos={contatos}
            openVendaModal={() => openModal("cadastro_venda")}
          />
        );
      case VIEW_RH:
        return (
          <RHView
            equipe={equipe}
            isLoadingRH={isLoadingRH}
            openMembroModal={(m) => openModal("cadastro_rh", m)}
          />
        );
      case VIEW_CRM:
        return (
          <CRMView
            contatos={contatos}
            isLoadingCRM={isLoadingCRM}
            openContatoModal={(c) => openModal("cadastro_crm", c)}
          />
        );
      case VIEW_PLANTACOES:
        return (
          <PlantacoesView
            plantacoes={plantacoes}
            isLoading={isLoading}
            error={error}
            openModal={openModal}
          />
        );
      case VIEW_DASHBOARD:
      default:
        return (
          <DashboardView
            plantacoes={plantacoes}
            recursos={recursos}
            vendas={vendas}
            equipe={equipe}
          />
        );
    }
  };

  if (!isAuthReady) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-gray-800 shadow-md p-3 sticky top-0 z-20">
        <div className="container mx-auto flex justify-between items-center">
          <img
            src="https://i.imgur.com/4a8RBx6.png"
            alt="GG AGRO Logo"
            className="h-10"
          />
          <div className="text-sm text-gray-400">
            ID do Usuário: <span className="font-mono text-xs">{userId}</span>
          </div>
        </div>
      </header>

      <MainNavigation currentView={currentView} setView={setCurrentView} />

      <main className="container mx-auto">{renderView()}</main>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default App;

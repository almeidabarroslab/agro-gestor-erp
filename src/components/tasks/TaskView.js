import React, { useState } from "react";

const initialTaskState = {
  name: "",
  status: "pendente",
  prioridade: "baixa",
  recursoId: "",
  plantacaoId: "",
  responsavelId: "",
  id: crypto.randomUUID(),
};

const TaskView = ({
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  resources,
  plantations,
  team,
}) => {
  const [filter, setFilter] = useState({
    status: "",
    prioridade: "",
    recursoId: "",
    plantacaoId: "",
    responsavelId: "",
  });
  const [modalTask, setModalTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const openNewTaskModal = () => {
    setModalTask({ ...initialTaskState });
    setIsModalOpen(true);
  };

  const openEditTaskModal = (task) => {
    setModalTask({ ...task });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalTask(null);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setModalTask((prev) => ({ ...prev, [name]: value }));
  };

  // Garante que modalTask nunca seja null ao salvar
  const handleModalSubmit = (e) => {
    e.preventDefault();
    const safeTask = {
      ...initialTaskState,
      ...modalTask,
    };
    console.log("Salvando tarefa:", safeTask);
    if (safeTask.id) {
      onEditTask(safeTask);
    } else {
      onAddTask(safeTask);
    }
    closeModal();
  };

  const filteredTasks = tasks.filter(
    (task) =>
      (filter.status === "" || task.status === filter.status) &&
      (filter.prioridade === "" || task.prioridade === filter.prioridade) &&
      (filter.recursoId === "" || task.recursoId === filter.recursoId) &&
      (filter.plantacaoId === "" || task.plantacaoId === filter.plantacaoId) &&
      (filter.responsavelId === "" ||
        task.responsavelId === filter.responsavelId)
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Gestão Completa de Tarefas</h2>
      {/* Filtros */}
      <div className="mb-4 flex flex-wrap gap-2">
        <select
          name="status"
          value={filter.status}
          onChange={handleFilterChange}
          className="border rounded p-2"
        >
          <option value="">Todos os Status</option>
          <option value="pendente">Pendente</option>
          <option value="em andamento">Em Andamento</option>
          <option value="concluida">Concluída</option>
        </select>
        <select
          name="prioridade"
          value={filter.prioridade}
          onChange={handleFilterChange}
          className="border rounded p-2"
        >
          <option value="">Todas as Prioridades</option>
          <option value="alta">Alta</option>
          <option value="media">Média</option>
          <option value="baixa">Baixa</option>
        </select>
        <select
          name="recursoId"
          value={filter.recursoId}
          onChange={handleFilterChange}
          className="border rounded p-2"
        >
          <option value="">Todos os Recursos</option>
          {resources.map((resource) => (
            <option key={resource.id} value={resource.id}>
              {resource.name}
            </option>
          ))}
        </select>
        <select
          name="plantacaoId"
          value={filter.plantacaoId}
          onChange={handleFilterChange}
          className="border rounded p-2"
        >
          <option value="">Todas as Plantações</option>
          {plantations.map((plantation) => (
            <option key={plantation.id} value={plantation.id}>
              {plantation.name}
            </option>
          ))}
        </select>
        <select
          name="responsavelId"
          value={filter.responsavelId}
          onChange={handleFilterChange}
          className="border rounded p-2"
        >
          <option value="">Todos os Responsáveis</option>
          {team.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
      </div>
      {/* Botão Nova Tarefa */}
      <button
        onClick={openNewTaskModal}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Nova Tarefa
      </button>
      {/* Modal de Criação/Edição */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">
              {modalTask.id ? "Editar Tarefa" : "Nova Tarefa"}
            </h3>
            <form onSubmit={handleModalSubmit}>
              <input
                name="name"
                type="text"
                value={modalTask.name}
                onChange={handleModalChange}
                placeholder="Nome da Tarefa"
                className="border rounded p-2 mb-2 w-full"
                required
              />
              <select
                name="status"
                value={modalTask.status}
                onChange={handleModalChange}
                className="border rounded p-2 mb-2 w-full"
              >
                <option value="pendente">Pendente</option>
                <option value="em andamento">Em Andamento</option>
                <option value="concluida">Concluída</option>
              </select>
              <select
                name="prioridade"
                value={modalTask.prioridade}
                onChange={handleModalChange}
                className="border rounded p-2 mb-2 w-full"
              >
                <option value="alta">Alta</option>
                <option value="media">Média</option>
                <option value="baixa">Baixa</option>
              </select>
              <select
                name="recursoId"
                value={modalTask.recursoId}
                onChange={handleModalChange}
                className="border rounded p-2 mb-2 w-full"
              >
                <option value="">Selecione um Recurso</option>
                {resources.map((resource) => (
                  <option key={resource.id} value={resource.id}>
                    {resource.name}
                  </option>
                ))}
              </select>
              <select
                name="plantacaoId"
                value={modalTask.plantacaoId}
                onChange={handleModalChange}
                className="border rounded p-2 mb-2 w-full"
              >
                <option value="">Selecione uma Plantação</option>
                {plantations.map((plantation) => (
                  <option key={plantation.id} value={plantation.id}>
                    {plantation.name}
                  </option>
                ))}
              </select>
              <select
                name="responsavelId"
                value={modalTask.responsavelId}
                onChange={handleModalChange}
                className="border rounded p-2 mb-2 w-full"
              >
                <option value="">Selecione um Responsável</option>
                {team.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Listagem de Tarefas */}
      <ul className="list-disc pl-5">
        {filteredTasks.map((task) => (
          <li key={task.id} className="mb-2 flex items-center">
            <span className="mr-2">
              <b>{task.name}</b> (Prioridade: {task.prioridade}, Status:{" "}
              {task.status})
              {task.recursoId && (
                <>
                  {" "}
                  | Recurso:{" "}
                  {resources.find((r) => r.id === task.recursoId)?.name}
                </>
              )}
              {task.plantacaoId && (
                <>
                  {" "}
                  | Plantação:{" "}
                  {plantations.find((p) => p.id === task.plantacaoId)?.name}
                </>
              )}
              {task.responsavelId && (
                <>
                  {" "}
                  | Responsável:{" "}
                  {team.find((t) => t.id === task.responsavelId)?.name}
                </>
              )}
            </span>
            <button
              onClick={() => openEditTaskModal(task)}
              className="ml-4 text-blue-500 hover:underline"
            >
              Editar
            </button>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="ml-4 text-red-500 hover:underline"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskView;

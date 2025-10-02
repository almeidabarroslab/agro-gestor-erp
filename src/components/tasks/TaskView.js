import React, { useState } from "react";
import LucideIcon from "../../components/ui/LucideIcon";

const initialTaskState = {
  name: "",
  status: "pendente",
  prioridade: "baixa",
  recursoId: "",
  plantacaoId: "",
  responsavelId: "",
  id: null,
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
    responsavelId: "",
  });
  const [modalTask, setModalTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const openNewTaskModal = () => {
    setModalTask({ ...initialTaskState, id: crypto.randomUUID() });
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

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (!modalTask) return;

    // Check if it's a new task by seeing if it exists in the tasks array
    const isNewTask = !tasks.some((task) => task.id === modalTask.id);

    if (isNewTask) {
      onAddTask(modalTask);
    } else {
      onEditTask(modalTask.id, modalTask);
    }
    closeModal();
  };

  const filteredTasks = tasks.filter(
    (task) =>
      (filter.status === "" || task.status === filter.status) &&
      (filter.prioridade === "" || task.prioridade === filter.prioridade) &&
      (filter.responsavelId === "" ||
        task.responsavelId === filter.responsavelId)
  );

  const getResourceName = (id) =>
    resources.find((r) => r.id === id)?.name || "N/A";
  const getPlantationName = (id) =>
    plantations.find((p) => p.id === id)?.name || "N/A";
  const getTeamMemberName = (id) =>
    team.find((t) => t.id === id)?.name || "N/A";

  const priorityClasses = {
    alta: "border-red-500 bg-red-50 text-red-800",
    media: "border-yellow-500 bg-yellow-50 text-yellow-800",
    baixa: "border-blue-500 bg-blue-50 text-blue-800",
  };

  const statusClasses = {
    pendente: "bg-gray-200 text-gray-800",
    "em andamento": "bg-blue-200 text-blue-800",
    concluida: "bg-green-200 text-green-800",
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
          <LucideIcon
            name="CheckSquare"
            className="w-8 h-8 mr-3 text-purple-600"
          />
          Gestão de Tarefas
        </h2>
        <button
          onClick={openNewTaskModal}
          className="btn-primary bg-purple-600 hover:bg-purple-700 flex items-center"
        >
          <LucideIcon name="Plus" className="w-5 h-5 mr-2" /> Nova Tarefa
        </button>
      </div>

      <div className="mb-6 p-4 bg-white rounded-xl shadow-md flex flex-wrap gap-4 items-center">
        <select
          name="status"
          value={filter.status}
          onChange={handleFilterChange}
          className="input-base w-full md:w-auto"
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
          className="input-base w-full md:w-auto"
        >
          <option value="">Todas as Prioridades</option>
          <option value="alta">Alta</option>
          <option value="media">Média</option>
          <option value="baixa">Baixa</option>
        </select>
        <select
          name="responsavelId"
          value={filter.responsavelId}
          onChange={handleFilterChange}
          className="input-base w-full md:w-auto"
        >
          <option value="">Todos os Responsáveis</option>
          {team.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
      </div>

      {isModalOpen && modalTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4 text-purple-700">
              {tasks.some((t) => t.id === modalTask.id)
                ? "Editar Tarefa"
                : "Nova Tarefa"}
            </h3>
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <input
                name="name"
                type="text"
                value={modalTask.name}
                onChange={handleModalChange}
                placeholder="Nome da Tarefa"
                className="input-base"
                required
              />
              <select
                name="status"
                value={modalTask.status}
                onChange={handleModalChange}
                className="input-base"
              >
                <option value="pendente">Pendente</option>
                <option value="em andamento">Em Andamento</option>
                <option value="concluida">Concluída</option>
              </select>
              <select
                name="prioridade"
                value={modalTask.prioridade}
                onChange={handleModalChange}
                className="input-base"
              >
                <option value="alta">Alta</option>
                <option value="media">Média</option>
                <option value="baixa">Baixa</option>
              </select>
              <select
                name="recursoId"
                value={modalTask.recursoId}
                onChange={handleModalChange}
                className="input-base"
              >
                <option value="">Selecione um Recurso (Opcional)</option>
                {resources.map((resource) => (
                  <option key={resource.id} value={resource.id}>
                    {resource.nome}
                  </option>
                ))}
              </select>
              <select
                name="plantacaoId"
                value={modalTask.plantacaoId}
                onChange={handleModalChange}
                className="input-base"
              >
                <option value="">Selecione uma Plantação (Opcional)</option>
                {plantations.map((plantation) => (
                  <option key={plantation.id} value={plantation.id}>
                    {plantation.nome}
                  </option>
                ))}
              </select>
              <select
                name="responsavelId"
                value={modalTask.responsavelId}
                onChange={handleModalChange}
                className="input-base"
              >
                <option value="">Selecione um Responsável (Opcional)</option>
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
                  className="btn-secondary"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primary bg-purple-600 hover:bg-purple-700"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {filteredTasks.length === 0 ? (
        <div className="text-center p-16 bg-white rounded-xl shadow-md border-dashed border-2 border-gray-300">
          <p className="text-xl text-gray-500">Nenhuma tarefa encontrada.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`card-base border-l-4 ${
                priorityClasses[task.prioridade]
              }`}
            >
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-lg text-gray-800 flex-1 pr-4">
                  {task.name}
                </h4>
                <span
                  className={`px-2 py-1 text-xs font-bold rounded-full ${
                    statusClasses[task.status]
                  }`}
                >
                  {task.status}
                </span>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Responsável:</span>{" "}
                  {getTeamMemberName(task.responsavelId)}
                </p>
                <p>
                  <span className="font-semibold">Plantação:</span>{" "}
                  {getPlantationName(task.plantacaoId)}
                </p>
                <p>
                  <span className="font-semibold">Recurso:</span>{" "}
                  {getResourceName(task.recursoId)}
                </p>
              </div>
              <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                <button
                  onClick={() => openEditTaskModal(task)}
                  className="px-3 py-1 text-sm bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskView;

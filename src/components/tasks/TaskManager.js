import React, { useState } from "react";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: "",
    recursoId: null,
    plantacaoId: null,
    responsavelId: null,
    status: "pendente",
    prioridade: "media",
  });

  console.log("Rendering TaskManager component");
  console.log("Current newTask state:", newTask);

  const addTask = () => {
    if (newTask.name.trim() === "") return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        ...newTask,
        completed: false,
      },
    ]);
    setNewTask({
      name: "",
      recursoId: null,
      plantacaoId: null,
      responsavelId: null,
      status: "pendente",
      prioridade: "media",
    });
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Gestão de Tarefas</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newTask.name}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Nova tarefa"
          className="border rounded p-2 mr-2"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Adicionar
        </button>
      </div>
      <ul className="list-disc pl-5">
        {tasks.map((task) => (
          <li key={task.id} className="mb-2 flex items-center">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
              className="mr-2"
            />
            <span
              className={task.completed ? "line-through text-gray-500" : ""}
            >
              {task.name} (Prioridade: {task.prioridade}, Status: {task.status})
            </span>
            <button
              onClick={() => deleteTask(task.id)}
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

export default TaskManager;

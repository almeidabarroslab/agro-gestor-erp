import React, { useState, useEffect } from 'react';
import LucideIcon from '../ui/LucideIcon';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const columns = {
  Lead: { title: 'Lead', color: 'yellow' },
  'Em Negociação': { title: 'Em Negociação', color: 'blue' },
  Ativo: { title: 'Ganho (Ativo)', color: 'green' },
  Inativo: { title: 'Perdido (Inativo)', color: 'red' },
};

const LeadCard = ({ lead, index }) => (
  <Draggable draggableId={lead.id} index={index}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={`bg-white p-3 rounded-lg shadow-sm border border-gray-200 mb-3 ${
          snapshot.isDragging ? 'shadow-lg border-sky-500' : ''
        }`}
      >
        <h4 className="font-bold text-gray-800">{lead.nome}</h4>
        <p className="text-sm text-gray-600">
          {lead.nomePropriedade || 'Sem propriedade'}
        </p>
        <div className="flex items-center mt-2">
          <LucideIcon name="User" className="w-4 h-4 mr-1 text-gray-400" />
          <span className="text-xs text-gray-500">{lead.tipo}</span>
        </div>
      </div>
    )}
  </Draggable>
);

const LeadColumn = ({ columnId, column, leads }) => (
  <div className="bg-gray-100 rounded-lg p-3 flex-1 min-w-[250px]">
    <h3 className={`font-semibold mb-4 text-lg text-${column.color}-600`}>
      {column.title}
    </h3>
    <Droppable droppableId={columnId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`min-h-[200px] ${
            snapshot.isDraggingOver ? 'bg-sky-100' : ''
          }`}
        >
          {leads.map((lead, index) => (
            <LeadCard key={lead.id} lead={lead} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

const LeadBoard = ({ contatos, updateContatoStatus }) => {
  const [boardData, setBoardData] = useState({
    Lead: [],
    'Em Negociação': [],
    Ativo: [],
    Inativo: [],
  });

  useEffect(() => {
    const newBoardData = {
      Lead: [],
      'Em Negociação': [],
      Ativo: [],
      Inativo: [],
    };
    contatos.forEach((contato) => {
      if (newBoardData[contato.status]) {
        newBoardData[contato.status].push(contato);
      }
    });
    setBoardData(newBoardData);
  }, [contatos]);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    const startColumnId = source.droppableId;
    const finishColumnId = destination.droppableId;

    if (startColumnId === finishColumnId) {
      // Reordering within the same column
      const column = boardData[startColumnId];
      const newItems = Array.from(column);
      const [reorderedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, reorderedItem);

      setBoardData({
        ...boardData,
        [startColumnId]: newItems,
      });
      return;
    }

    // Moving from one column to another
    const startColumn = boardData[startColumnId];
    const finishColumn = boardData[finishColumnId];

    const startItems = Array.from(startColumn);
    const [movedItem] = startItems.splice(source.index, 1);
    const finishItems = Array.from(finishColumn);
    finishItems.splice(destination.index, 0, movedItem);

    setBoardData({
      ...boardData,
      [startColumnId]: startItems,
      [finishColumnId]: finishItems,
    });

    // Update status in Firestore
    updateContatoStatus(draggableId, finishColumnId);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center">
        <LucideIcon name="KanbanSquare" className="w-6 h-6 mr-2 text-sky-600" />
        Quadro de Leads
      </h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {Object.entries(columns).map(([columnId, column]) => (
            <LeadColumn
              key={columnId}
              columnId={columnId}
              column={column}
              leads={boardData[columnId]}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default LeadBoard;

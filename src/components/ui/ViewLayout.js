import React from 'react';
import LucideIcon from './LucideIcon';
import Button from './Button';

const ViewLayout = ({
  title,
  icon,
  children,
  onAddNew,
  addButtonLabel = 'Adicionar',
  isLoading = false,
  error = null,
  emptyMessage = 'Nenhum item encontrado',
  emptyAction,
  showAddButton = true,
}) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 flex items-center">
          {icon && (
            <LucideIcon name={icon} className="w-7 h-7 mr-3 text-blue-600" />
          )}
          {title}
        </h2>
        {showAddButton && onAddNew && (
          <Button variant="primary" onClick={onAddNew} icon="Plus">
            {addButtonLabel}
          </Button>
        )}
      </div>

      {error && (
        <div
          className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg shadow-sm"
          role="alert"
        >
          <div className="flex items-center">
            <LucideIcon name="AlertCircle" className="w-5 h-5 mr-2" />
            <div>
              <p className="font-bold">Erro</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="text-center p-16">
          <LucideIcon
            name="Loader2"
            className="w-12 h-12 animate-spin text-blue-500 mx-auto"
          />
          <p className="text-gray-500 mt-4 text-lg">Carregando...</p>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export const EmptyState = ({ message, onAction, actionLabel, icon = 'Inbox' }) => {
  return (
    <div className="text-center p-16 bg-white rounded-xl shadow-lg border-2 border-dashed border-gray-300">
      <LucideIcon name={icon} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <p className="text-xl text-gray-500 mb-6">{message}</p>
      {onAction && (
        <Button variant="primary" onClick={onAction} icon="Plus" size="lg">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default ViewLayout;

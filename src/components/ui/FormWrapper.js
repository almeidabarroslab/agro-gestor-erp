import React from 'react';
import Button from './Button';

const FormWrapper = ({
  title,
  children,
  onSubmit,
  onCancel,
  submitLabel = 'Salvar',
  cancelLabel = 'Cancelar',
  isLoading = false,
  maxWidth = 'max-w-2xl',
  className = '',
}) => {
  return (
    <div
      className={`p-6 bg-white rounded-xl shadow-2xl ${maxWidth} w-full space-y-6 max-h-[90vh] overflow-y-auto ${className}`}
    >
      {title && (
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">
          {title}
        </h2>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        {children}

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button type="submit" variant="primary" loading={isLoading}>
            {submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormWrapper;

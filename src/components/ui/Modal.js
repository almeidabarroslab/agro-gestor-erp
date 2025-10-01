import React from 'react';
import LucideIcon from './LucideIcon';

const Modal = ({ children, isOpen, onClose, maxWidth = "max-w-4xl" }) => {
  if (!isOpen) return null;

  return (
    // Outer wrapper: fixed, dark overlay, allows vertical scrolling of the entire modal view
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Inner content wrapper: centered with margin, defined max height */}
      <div
        className={`relative ${maxWidth} w-full`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Children (Form content) - they contain bg-white, shadow etc. */}
        {children}
        {/* Close button - style adjusted to be visible over the content */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 transition bg-white/80 rounded-full p-2 shadow-xl z-10"
          aria-label="Fechar"
        >
          <LucideIcon name="Plus" className="w-6 h-6 rotate-45" />
        </button>
      </div>
    </div>
  );
};

export default Modal;
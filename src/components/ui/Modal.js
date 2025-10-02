import React, { useEffect } from "react";
import LucideIcon from "./LucideIcon";

const Modal = ({ children, isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-center items-start pt-12 md:pt-20 px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl flex flex-col"
        style={{ maxHeight: "calc(100vh - 8rem)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-y-auto p-6">{children}</div>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition bg-gray-100 hover:bg-gray-200 rounded-full p-2"
          aria-label="Fechar"
        >
          <LucideIcon name="Plus" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Modal;

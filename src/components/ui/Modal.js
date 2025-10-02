import React from "react";
import LucideIcon from "./LucideIcon";

const Modal = ({ children, isOpen, onClose, maxWidth = "max-w-2xl" }) => {
  if (!isOpen) return null;

  return (
    // Outer wrapper: fixed, dark overlay, allows vertical scrolling of the entire modal view
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-center items-center">
      {/* Centered modal with equal top/bottom spacing and fixed width */}
      <div
        className={`relative w-full ${maxWidth} mx-auto my-12 bg-white rounded-xl shadow-xl p-6 flex flex-col items-stretch overflow-y-auto`}
        style={{ minHeight: "0", maxHeight: "calc(100vh - 6rem)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
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

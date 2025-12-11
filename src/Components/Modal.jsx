import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      
      {/* Modal Box */}
      <div className="bg-white p-6 rounded-lg shadow-lg min-w-[500px] relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-xl text-gray-600 hover:text-black cursor-pointer"
        >
          ×
        </button>

        {/* Actual content passed from parent */}
        {children}
      </div>
    </div>
  );
}

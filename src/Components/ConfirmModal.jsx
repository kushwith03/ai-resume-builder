import React from 'react';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-sm bg-base-200 border border-white/10 rounded-3xl shadow-2xl overflow-hidden scale-in-center">
        <div className="p-6 md:p-8 space-y-6">
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-black text-white">{title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{message}</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onCancel}
              className="btn btn-ghost flex-1 rounded-2xl font-bold text-slate-500 hover:text-white hover:bg-white/5 transition-all"
            >
              {cancelText}
            </button>
            <button 
              onClick={onConfirm}
              className="btn btn-error flex-1 rounded-2xl font-black shadow-lg shadow-error/20 transition-all"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

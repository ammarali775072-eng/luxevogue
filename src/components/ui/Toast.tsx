import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { Check, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useUIStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-4 p-4 rounded-none bg-[#101118]/95 backdrop-blur-xl border border-[#D6B36A]/30 text-[#F5F5F7] shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 animate-slide-up"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#D6B36A]/40 flex items-center justify-center bg-[#D6B36A]/10 text-[#F3D58A] shrink-0">
              {toast.type === 'info' ? (
                <Info className="w-4 h-4" />
              ) : (
                <Check className="w-4 h-4" />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide text-white">{toast.title}</p>
              {toast.description && (
                <p className="text-xs text-[#9698A3] mt-0.5">{toast.description}</p>
              )}
            </div>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#9698A3] hover:text-white transition-colors p-1"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

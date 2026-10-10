import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <aside className="toast-container" aria-live="polite" aria-label="Notificações do sistema">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isDanger = toast.type === 'danger';

        return (
          <div
            key={toast.id}
            className={`toast ${isSuccess ? 'toast-success' : isDanger ? 'toast-danger' : 'toast-info'}`}
            role="status"
          >
            {isSuccess && <CheckCircle2 size={18} style={{ color: 'var(--success-600)', flexShrink: 0 }} />}
            {isDanger && <AlertCircle size={18} style={{ color: 'var(--danger-600)', flexShrink: 0 }} />}
            {!isSuccess && !isDanger && <Info size={18} style={{ color: 'var(--primary-600)', flexShrink: 0 }} />}

            <div style={{ flex: 1, fontSize: '0.875rem' }}>
              {toast.message}
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="btn-icon"
              style={{ padding: '2px' }}
              aria-label="Dispensar notificação"
              type="button"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </aside>
  );
}

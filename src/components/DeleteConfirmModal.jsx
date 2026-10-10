import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, appointment }) {
  if (!isOpen || !appointment) return null;

  return (
    <div
      className="modal-overlay"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-desc"
    >
      <div className="modal-content" style={{ maxWidth: '440px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--danger-600)' }}>
            <AlertTriangle size={22} />
            <h2 id="delete-dialog-title" className="modal-title" style={{ fontSize: '1.1rem' }}>
              Confirmar Exclusão
            </h2>
          </div>
          <button
            onClick={onClose}
            className="btn-icon"
            aria-label="Cancelar exclusão"
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p id="delete-dialog-desc" style={{ fontSize: '0.925rem', color: 'var(--gray-700)', lineHeight: 1.5 }}>
            Tem certeza de que deseja remover o atendimento de <strong>{appointment.paciente}</strong>, agendado para <strong>{appointment.data}</strong> às <strong>{appointment.horario}</strong>?
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginTop: '0.6rem' }}>
            Esta ação removerá o registro do armazenamento local.
          </p>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onConfirm(appointment.id)}
            className="btn btn-danger"
          >
            <Trash2 size={16} />
            <span>Excluir Definitivamente</span>
          </button>
        </div>
      </div>
    </div>
  );
}

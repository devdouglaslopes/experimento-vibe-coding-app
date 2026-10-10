import React, { useState, useEffect, useRef } from 'react';
import { X, AlertCircle, Save, Calendar, Clock, User, FileText } from 'lucide-react';

export default function AppointmentFormModal({ isOpen, onClose, onSave, appointmentToEdit }) {
  const [paciente, setPaciente] = useState('');
  const [data, setData] = useState(() => new Date().toISOString().split('T')[0]);
  const [horario, setHorario] = useState('09:00');
  const [descricao, setDescricao] = useState('');
  const [errors, setErrors] = useState({});

  const firstInputRef = useRef(null);

  const isEditing = Boolean(appointmentToEdit);

  useEffect(() => {
    if (isOpen) {
      if (appointmentToEdit) {
        setPaciente(appointmentToEdit.paciente || '');
        setData(appointmentToEdit.data || '');
        setHorario(appointmentToEdit.horario || '');
        setDescricao(appointmentToEdit.descricao || '');
      } else {
        // Valores default para novo cadastro
        setPaciente('');
        // Padrão: data de hoje
        const today = new Date().toISOString().split('T')[0];
        setData(today);
        setHorario('09:00');
        setDescricao('');
      }
      setErrors({});

      // Foco inicial no primeiro campo
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, appointmentToEdit]);

  // Fechar com Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    const cleanPaciente = paciente.trim();
    if (!cleanPaciente) {
      newErrors.paciente = 'O nome fictício do paciente é obrigatório.';
    } else if (cleanPaciente.length < 3) {
      newErrors.paciente = 'O nome deve ter no mínimo 3 caracteres.';
    }

    if (!data) {
      newErrors.data = 'A data do atendimento é obrigatória.';
    }

    if (!horario) {
      newErrors.horario = 'O horário do atendimento é obrigatório.';
    }

    const cleanDescricao = descricao.trim();
    if (!cleanDescricao) {
      newErrors.descricao = 'A descrição do atendimento é obrigatória.';
    } else if (cleanDescricao.length < 5) {
      newErrors.descricao = 'Forneça uma descrição mais detalhada (ao menos 5 caracteres).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      id: appointmentToEdit ? appointmentToEdit.id : undefined,
      paciente: paciente.trim(),
      data,
      horario,
      descricao: descricao.trim(),
    });
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">
            {isEditing ? 'Editar Atendimento Fictício' : 'Cadastrar Novo Atendimento'}
          </h2>
          <button
            onClick={onClose}
            className="btn-icon"
            aria-label="Fechar janela"
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label" htmlFor="paciente">
                Nome do Paciente (Fictício) <span className="form-label-required">*</span>
              </label>
              <input
                ref={firstInputRef}
                id="paciente"
                type="text"
                className={`form-input ${errors.paciente ? 'has-error' : ''}`}
                placeholder="Ex: Ana Souza (Fictício)"
                value={paciente}
                onChange={(e) => {
                  setPaciente(e.target.value);
                  if (errors.paciente) setErrors((prev) => ({ ...prev, paciente: null }));
                }}
                aria-invalid={Boolean(errors.paciente)}
                aria-describedby={errors.paciente ? 'paciente-error' : 'paciente-hint'}
              />
              <p id="paciente-hint" className="form-hint">
                Use apenas nomes e identificadores simulados.
              </p>
              {errors.paciente && (
                <p id="paciente-error" className="form-error-msg" role="alert">
                  <AlertCircle size={14} />
                  <span>{errors.paciente}</span>
                </p>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="data">
                  Data <span className="form-label-required">*</span>
                </label>
                <input
                  id="data"
                  type="date"
                  className={`form-input ${errors.data ? 'has-error' : ''}`}
                  value={data}
                  onChange={(e) => {
                    setData(e.target.value);
                    if (errors.data) setErrors((prev) => ({ ...prev, data: null }));
                  }}
                  aria-invalid={Boolean(errors.data)}
                  aria-describedby={errors.data ? 'data-error' : undefined}
                />
                {errors.data && (
                  <p id="data-error" className="form-error-msg" role="alert">
                    <AlertCircle size={14} />
                    <span>{errors.data}</span>
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="horario">
                  Horário <span className="form-label-required">*</span>
                </label>
                <input
                  id="horario"
                  type="time"
                  className={`form-input ${errors.horario ? 'has-error' : ''}`}
                  value={horario}
                  onChange={(e) => {
                    setHorario(e.target.value);
                    if (errors.horario) setErrors((prev) => ({ ...prev, horario: null }));
                  }}
                  aria-invalid={Boolean(errors.horario)}
                  aria-describedby={errors.horario ? 'horario-error' : undefined}
                />
                {errors.horario && (
                  <p id="horario-error" className="form-error-msg" role="alert">
                    <AlertCircle size={14} />
                    <span>{errors.horario}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="descricao">
                Descrição do Atendimento <span className="form-label-required">*</span>
              </label>
              <textarea
                id="descricao"
                rows="4"
                className={`form-textarea ${errors.descricao ? 'has-error' : ''}`}
                placeholder="Ex: Consulta de rotina, queixa clínica simulada ou orientações gerais..."
                value={descricao}
                onChange={(e) => {
                  setDescricao(e.target.value);
                  if (errors.descricao) setErrors((prev) => ({ ...prev, descricao: null }));
                }}
                aria-invalid={Boolean(errors.descricao)}
                aria-describedby={errors.descricao ? 'descricao-error' : undefined}
              />
              {errors.descricao && (
                <p id="descricao-error" className="form-error-msg" role="alert">
                  <AlertCircle size={14} />
                  <span>{errors.descricao}</span>
                </p>
              )}
            </div>
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
              type="submit"
              className="btn btn-primary"
            >
              <Save size={16} />
              <span>{isEditing ? 'Salvar Alterações' : 'Cadastrar Atendimento'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

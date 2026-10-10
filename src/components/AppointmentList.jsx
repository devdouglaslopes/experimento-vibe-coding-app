import React, { useState, useMemo } from 'react';
import { Plus, Search, Calendar, Clock, Edit2, Trash2, UserX, FileText } from 'lucide-react';

export default function AppointmentList({
  appointments,
  onOpenCreateModal,
  onOpenEditModal,
  onOpenDeleteModal
}) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtragem dinâmica
  const filteredAppointments = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return appointments;
    return appointments.filter(
      (item) =>
        item.paciente.toLowerCase().includes(term) ||
        item.descricao.toLowerCase().includes(term)
    );
  }, [appointments, searchTerm]);

  // Formatação de data amigável (YYYY-MM-DD -> DD/MM/YYYY)
  const formatDateBR = (isoDate) => {
    if (!isoDate) return '-';
    const parts = isoDate.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return isoDate;
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Atendimentos Cadastrados</h2>
          <p className="page-subtitle">
            Gerencie prontuários demonstrativos e agendamentos simulados.
          </p>
        </div>

        <button
          onClick={onOpenCreateModal}
          className="btn btn-primary"
          style={{ width: 'fit-content' }}
        >
          <Plus size={18} />
          <span>Novo Atendimento</span>
        </button>
      </div>

      <div className="filter-bar">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por nome do paciente ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Buscar atendimentos"
          />
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--gray-500)', fontWeight: 500 }}>
          Exibindo {filteredAppointments.length} de {appointments.length} atendimento(s)
        </div>
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <UserX size={28} />
          </div>
          <h3 className="empty-state-title">
            {searchTerm ? 'Nenhum atendimento encontrado' : 'Nenhum atendimento cadastrado'}
          </h3>
          <p className="empty-state-text">
            {searchTerm
              ? `Nenhum resultado corresponde à busca "${searchTerm}". Tente outros termos.`
              : 'Comece adicionando seu primeiro atendimento de saúde fictício.'}
          </p>
          {searchTerm ? (
            <button
              onClick={() => setSearchTerm('')}
              className="btn btn-secondary btn-sm"
            >
              Limpar busca
            </button>
          ) : (
            <button
              onClick={onOpenCreateModal}
              className="btn btn-primary"
            >
              <Plus size={16} />
              <span>Cadastrar Atendimento</span>
            </button>
          )}
        </div>
      ) : (
        <div className="appointments-grid">
          {filteredAppointments.map((item) => (
            <article key={item.id} className="appointment-card" data-testid={`card-${item.id}`}>
              <div>
                <div className="card-header-row">
                  <h3 className="patient-name">{item.paciente}</h3>
                  <span className="tag-badge tag-teal" style={{ fontSize: '0.7rem' }}>Fictício</span>
                </div>

                <div className="datetime-chips">
                  <span className="chip" title="Data do atendimento">
                    <Calendar size={14} style={{ color: 'var(--primary-600)' }} />
                    <span>{formatDateBR(item.data)}</span>
                  </span>
                  <span className="chip" title="Horário previsto">
                    <Clock size={14} style={{ color: 'var(--teal-600)' }} />
                    <span>{item.horario}</span>
                  </span>
                </div>

                <p className="card-description">{item.descricao}</p>
              </div>

              <div className="card-footer">
                <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>
                  ID: {item.id.slice(-6)}
                </span>
                <div className="card-actions">
                  <button
                    onClick={() => onOpenEditModal(item)}
                    className="btn btn-secondary btn-sm"
                    title={`Editar atendimento de ${item.paciente}`}
                    aria-label={`Editar atendimento de ${item.paciente}`}
                  >
                    <Edit2 size={14} />
                    <span>Editar</span>
                  </button>
                  <button
                    onClick={() => onOpenDeleteModal(item)}
                    className="btn btn-ghost-danger btn-sm"
                    title={`Excluir atendimento de ${item.paciente}`}
                    aria-label={`Excluir atendimento de ${item.paciente}`}
                  >
                    <Trash2 size={14} />
                    <span>Excluir</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

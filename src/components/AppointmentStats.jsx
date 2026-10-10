import React from 'react';
import { Calendar, Clock, Users } from 'lucide-react';

export default function AppointmentStats({ appointments }) {
  const total = appointments.length;

  const todayStr = new Date().toISOString().split('T')[0];
  const hoje = appointments.filter((a) => a.data === todayStr).length;

  return (
    <section className="stats-grid" aria-label="Indicadores gerais dos atendimentos">
      <div className="stat-card">
        <div className="stat-icon-wrapper" style={{ backgroundColor: 'var(--primary-50)', color: 'var(--primary-600)' }}>
          <Users size={22} />
        </div>
        <div>
          <div className="stat-value">{total}</div>
          <div className="stat-label">Total de Atendimentos</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper" style={{ backgroundColor: 'var(--teal-50)', color: 'var(--teal-600)' }}>
          <Calendar size={22} />
        </div>
        <div>
          <div className="stat-value">{hoje}</div>
          <div className="stat-label">Agendados para Hoje</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper" style={{ backgroundColor: 'var(--warning-50)', color: 'var(--warning-600)' }}>
          <Clock size={22} />
        </div>
        <div>
          <div className="stat-value">{total > 0 ? 'Ativo' : 'Vazio'}</div>
          <div className="stat-label">Status da Fila Local</div>
        </div>
      </div>
    </section>
  );
}

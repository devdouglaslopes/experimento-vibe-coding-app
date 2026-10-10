import React from 'react';
import { HeartPulse, LogOut, User } from 'lucide-react';

export default function Navbar({ user, onLogout }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-icon-wrapper" aria-hidden="true">
            <HeartPulse size={22} />
          </div>
          <div>
            <h1 className="brand-title">
              Gestão de Atendimentos
              <span className="tag-badge tag-teal">Demo</span>
            </h1>
            <span className="brand-subtitle">Simulador de Prontuário & Agenda de Saúde</span>
          </div>
        </div>

        <div className="navbar-user-actions">
          <div className="user-profile-summary">
            <div className="user-avatar" title={user?.nome || 'Operador'}>
              <User size={18} />
            </div>
            <div className="user-info" style={{ display: 'none', minWidth: '120px' }}>
              <strong style={{ fontSize: '0.85rem', display: 'block' }}>{user?.nome || 'Usuário'}</strong>
              <small style={{ color: 'var(--gray-500)', fontSize: '0.75rem' }}>{user?.cargo}</small>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="btn btn-secondary btn-sm"
            title="Encerrar sessão de demonstração"
            aria-label="Sair da sessão demonstrativa"
          >
            <LogOut size={15} />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </header>
  );
}

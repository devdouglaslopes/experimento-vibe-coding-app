import React, { useState } from 'react';
import { HeartPulse, Lock, Mail, AlertCircle, Info, ArrowRight } from 'lucide-react';
import { DEMO_USER } from '../data/mockData';

export default function LoginView({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'O e-mail é obrigatório para acessar.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Informe um endereço de e-mail válido (ex: operador@demo.local).';
    }

    if (!password) {
      newErrors.password = 'A senha demonstrativa é obrigatória.';
    } else if (password.length < 4) {
      newErrors.password = 'A senha deve conter no mínimo 4 caracteres no ambiente de teste.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onLoginSuccess({
      ...DEMO_USER,
      email: email.trim()
    });
  };

  const handleFillDemoCredentials = () => {
    setEmail(DEMO_USER.email);
    setPassword('saude123');
    setErrors({});
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo" aria-hidden="true">
            <HeartPulse size={28} />
          </div>
          <h2 className="page-title" style={{ fontSize: '1.4rem' }}>Acesso Demonstrativo</h2>
          <p className="page-subtitle">Sistema de Gestão de Atendimentos de Saúde</p>
        </div>

        <div className="login-demo-notice" role="alert">
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start' }}>
            <Info size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Atenção:</strong> Este é um protótipo com finalidade didática e de teste. O acesso é meramente simulado e não substitui autenticação de produção.
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">
              E-mail do operador <span className="form-label-required">*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="login-email"
                type="email"
                className={`form-input ${errors.email ? 'has-error' : ''}`}
                placeholder="ex: atendimento.demo@saudedigital.local"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                }}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <p id="email-error" className="form-error-msg" role="alert">
                <AlertCircle size={14} />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="login-password">
              Senha demonstrativa <span className="form-label-required">*</span>
            </label>
            <input
              id="login-password"
              type="password"
              className={`form-input ${errors.password ? 'has-error' : ''}`}
              placeholder="Digite qualquer senha para teste (mín. 4 caracteres)"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
              }}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'password-error' : undefined}
              autoComplete="current-password"
            />
            {errors.password && (
              <p id="password-error" className="form-error-msg" role="alert">
                <AlertCircle size={14} />
                <span>{errors.password}</span>
              </p>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.75rem' }}
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Acessando...' : 'Entrar na Demonstração'}</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              onClick={handleFillDemoCredentials}
              className="btn btn-secondary"
              style={{ width: '100%', fontSize: '0.85rem' }}
            >
              Preencher dados de teste com 1 clique
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

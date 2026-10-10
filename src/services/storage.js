import { INITIAL_MOCK_APPOINTMENTS, DEMO_USER } from '../data/mockData';

const APPOINTMENTS_STORAGE_KEY = 'saude_demo_atendimentos_v1';
const AUTH_STORAGE_KEY = 'saude_demo_auth_session_v1';

export const storageService = {
  getAppointments: () => {
    try {
      const data = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(INITIAL_MOCK_APPOINTMENTS));
        return INITIAL_MOCK_APPOINTMENTS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.warn('Erro ao ler localStorage, utilizando dados em memória.', e);
      return INITIAL_MOCK_APPOINTMENTS;
    }
  },

  saveAppointments: (appointments) => {
    try {
      localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(appointments));
    } catch (e) {
      console.warn('Erro ao salvar no localStorage.', e);
    }
  },

  resetToInitialData: () => {
    try {
      localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(INITIAL_MOCK_APPOINTMENTS));
      return INITIAL_MOCK_APPOINTMENTS;
    } catch (e) {
      return INITIAL_MOCK_APPOINTMENTS;
    }
  },

  getAuthSession: () => {
    try {
      const session = localStorage.getItem(AUTH_STORAGE_KEY);
      return session ? JSON.parse(session) : null;
    } catch (e) {
      return null;
    }
  },

  setAuthSession: (user) => {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.warn('Erro ao persistir sessão demonstrativa.', e);
    }
  },

  clearAuthSession: () => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.warn('Erro ao remover sessão.', e);
    }
  }
};

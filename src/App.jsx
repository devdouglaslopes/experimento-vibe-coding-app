import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import DemoBanner from './components/DemoBanner';
import LoginView from './components/LoginView';
import AppointmentStats from './components/AppointmentStats';
import AppointmentList from './components/AppointmentList';
import AppointmentFormModal from './components/AppointmentFormModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import { storageService } from './services/storage';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => storageService.getAuthSession());
  const [appointments, setAppointments] = useState(() => storageService.getAppointments());

  // Estado dos modais
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [appointmentToEdit, setAppointmentToEdit] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  // Sistema de notificações toast
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Sincroniza atendimentos com o localStorage sempre que mudar
  useEffect(() => {
    storageService.saveAppointments(appointments);
  }, [appointments]);

  // Autenticação demonstrativa
  const handleLogin = (user) => {
    storageService.setAuthSession(user);
    setCurrentUser(user);
    addToast(`Bem-vindo(a) ao ambiente demonstrativo, ${user.nome}!`, 'info');
  };

  const handleLogout = () => {
    storageService.clearAuthSession();
    setCurrentUser(null);
    addToast('Sessão demonstrativa encerrada.', 'info');
  };

  // Abrir modal de criação
  const handleOpenCreateModal = () => {
    setAppointmentToEdit(null);
    setIsFormModalOpen(true);
  };

  // Abrir modal de edição
  const handleOpenEditModal = (appointment) => {
    setAppointmentToEdit(appointment);
    setIsFormModalOpen(true);
  };

  // Salvar (criar ou atualizar)
  const handleSaveAppointment = (appointmentData) => {
    if (appointmentData.id) {
      // Edição
      setAppointments((prev) =>
        prev.map((item) => (item.id === appointmentData.id ? { ...item, ...appointmentData } : item))
      );
      addToast(`Atendimento de "${appointmentData.paciente}" atualizado com sucesso!`, 'success');
    } else {
      // Criação
      const newAppointment = {
        ...appointmentData,
        id: `atend-${Date.now().toString().slice(-4)}`,
        criadoEm: new Date().toISOString()
      };
      setAppointments((prev) => [newAppointment, ...prev]);
      addToast(`Atendimento de "${appointmentData.paciente}" cadastrado com sucesso!`, 'success');
    }

    setIsFormModalOpen(false);
    setAppointmentToEdit(null);
  };

  // Modal de exclusão
  const handleOpenDeleteModal = (appointment) => {
    setAppointmentToDelete(appointment);
    setIsDeleteModalOpen(true);
  };

  // Confirmar exclusão
  const handleConfirmDelete = (id) => {
    const item = appointments.find((a) => a.id === id);
    setAppointments((prev) => prev.filter((a) => a.id !== id));
    setIsDeleteModalOpen(false);
    setAppointmentToDelete(null);
    addToast(`Atendimento de "${item?.paciente || 'paciente'}" excluído com sucesso.`, 'danger');
  };

  // Restaurar dados originais de simulação
  const handleResetData = () => {
    if (window.confirm('Deseja recarregar a lista padrão de atendimentos fictícios? Dados adicionados localmente serão substituídos.')) {
      const reset = storageService.resetToInitialData();
      setAppointments(reset);
      addToast('Dados fictícios de demonstração restaurados!', 'info');
    }
  };

  // Se não estiver logado no protótipo, exibir login demonstrativo
  if (!currentUser) {
    return (
      <>
        <LoginView onLoginSuccess={handleLogin} />
        <Toast toasts={toasts} onDismiss={removeToast} />
      </>
    );
  }

  return (
    <div className="app-container">
      <DemoBanner onResetData={handleResetData} />
      <Navbar user={currentUser} onLogout={handleLogout} />

      <main className="main-content">
        <AppointmentStats appointments={appointments} />
        <AppointmentList
          appointments={appointments}
          onOpenCreateModal={handleOpenCreateModal}
          onOpenEditModal={handleOpenEditModal}
          onOpenDeleteModal={handleOpenDeleteModal}
        />
      </main>

      {/* Modal de cadastro/edição */}
      <AppointmentFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setAppointmentToEdit(null);
        }}
        onSave={handleSaveAppointment}
        appointmentToEdit={appointmentToEdit}
      />

      {/* Modal de confirmação de exclusão */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setAppointmentToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        appointment={appointmentToDelete}
      />

      {/* Notificações toast */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}

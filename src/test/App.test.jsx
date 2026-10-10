import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import App from '../App';
import LoginView from '../components/LoginView';
import AppointmentFormModal from '../components/AppointmentFormModal';

describe('Gestão de Atendimentos de Saúde - Testes Funcionais', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Fluxo de Login Demonstrativo', () => {
    it('deve exibir mensagens de validação ao tentar submeter formulário de login vazio', async () => {
      render(<LoginView onLoginSuccess={vi.fn()} />);

      const submitBtn = screen.getByRole('button', { name: /entrar na demonstração/i });
      fireEvent.click(submitBtn);

      expect(await screen.findByText(/o e-mail é obrigatório para acessar/i)).toBeInTheDocument();
      expect(screen.getByText(/a senha demonstrativa é obrigatória/i)).toBeInTheDocument();
    });

    it('permite preencher credenciais de teste com 1 clique e realizar login demonstrativo', async () => {
      const mockLogin = vi.fn();
      render(<LoginView onLoginSuccess={mockLogin} />);

      const prefillBtn = screen.getByRole('button', { name: /preencher dados de teste com 1 clique/i });
      fireEvent.click(prefillBtn);

      const submitBtn = screen.getByRole('button', { name: /entrar na demonstração/i });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith(
          expect.objectContaining({
            email: 'atendimento.demo@saudedigital.local'
          })
        );
      });
    });
  });

  describe('Validações do Formulário de Atendimento', () => {
    it('valida campos obrigatórios e impede cadastro inválido', async () => {
      const mockSave = vi.fn();
      const mockClose = vi.fn();

      render(
        <AppointmentFormModal
          isOpen={true}
          onClose={mockClose}
          onSave={mockSave}
          appointmentToEdit={null}
        />
      );

      // Limpa os campos preenchidos por padrão
      const pacienteInput = screen.getByLabelText(/nome do paciente/i);
      fireEvent.change(pacienteInput, { target: { value: '' } });

      const descInput = screen.getByLabelText(/descrição do atendimento/i);
      fireEvent.change(descInput, { target: { value: '' } });

      const saveBtn = screen.getByRole('button', { name: /cadastrar atendimento/i });
      fireEvent.click(saveBtn);

      expect(await screen.findByText(/o nome fictício do paciente é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/a descrição do atendimento é obrigatória/i)).toBeInTheDocument();
      expect(mockSave).not.toHaveBeenCalled();
    });

    it('valida tamanho mínimo de nome e descrição', async () => {
      const mockSave = vi.fn();
      render(
        <AppointmentFormModal
          isOpen={true}
          onClose={vi.fn()}
          onSave={mockSave}
          appointmentToEdit={null}
        />
      );

      const pacienteInput = screen.getByLabelText(/nome do paciente/i);
      fireEvent.change(pacienteInput, { target: { value: 'Ab' } });

      const descInput = screen.getByLabelText(/descrição do atendimento/i);
      fireEvent.change(descInput, { target: { value: 'Oi' } });

      const saveBtn = screen.getByRole('button', { name: /cadastrar atendimento/i });
      fireEvent.click(saveBtn);

      expect(await screen.findByText(/o nome deve ter no mínimo 3 caracteres/i)).toBeInTheDocument();
      expect(screen.getByText(/ao menos 5 caracteres/i)).toBeInTheDocument();
      expect(mockSave).not.toHaveBeenCalled();
    });
  });

  describe('Área de Gestão e CRUD de Atendimentos', () => {
    it('renderiza os atendimentos fictícios padrão após o login', async () => {
      render(<App />);

      // Efetua login demo
      const prefillBtn = screen.getByRole('button', { name: /preencher dados de teste com 1 clique/i });
      fireEvent.click(prefillBtn);
      const submitBtn = screen.getByRole('button', { name: /entrar na demonstração/i });
      fireEvent.click(submitBtn);

      expect(await screen.findByText(/atendimentos cadastrados/i)).toBeInTheDocument();
      expect(screen.getByText(/Carlos Eduardo Ramos \(Fictício\)/i)).toBeInTheDocument();
      expect(screen.getByText(/Mariana Silveira Duarte \(Fictícia\)/i)).toBeInTheDocument();
    });

    it('permite cadastrar um novo atendimento com sucesso', async () => {
      render(<App />);

      // Login
      fireEvent.click(screen.getByRole('button', { name: /preencher dados de teste com 1 clique/i }));
      fireEvent.click(screen.getByRole('button', { name: /entrar na demonstração/i }));

      // Abrir modal de novo atendimento
      const novoBtn = await screen.findByRole('button', { name: /novo atendimento/i });
      fireEvent.click(novoBtn);

      // Preencher formulário
      const pacienteInput = screen.getByLabelText(/nome do paciente/i);
      fireEvent.change(pacienteInput, { target: { value: 'Roberto Albuquerque (Fictício)' } });

      const dataInput = screen.getByLabelText(/data/i);
      fireEvent.change(dataInput, { target: { value: '2026-10-20' } });

      const horarioInput = screen.getByLabelText(/horário/i);
      fireEvent.change(horarioInput, { target: { value: '11:00' } });

      const descInput = screen.getByLabelText(/descrição do atendimento/i);
      fireEvent.change(descInput, { target: { value: 'Consulta dermatológica simulada para acompanhamento.' } });

      // Salvar
      const salvarBtn = screen.getByRole('button', { name: /cadastrar atendimento/i });
      fireEvent.click(salvarBtn);

      // Verificar que foi adicionado à tela
      expect(await screen.findByRole('heading', { name: /roberto albuquerque \(fictício\)/i })).toBeInTheDocument();
      expect(screen.getByText(/Consulta dermatológica simulada/i)).toBeInTheDocument();
    });

    it('permite editar um atendimento existente', async () => {
      render(<App />);

      // Login
      fireEvent.click(screen.getByRole('button', { name: /preencher dados de teste com 1 clique/i }));
      fireEvent.click(screen.getByRole('button', { name: /entrar na demonstração/i }));

      // Clicar em editar do primeiro registro
      const editBtn = await screen.findByRole('button', { name: /editar atendimento de carlos eduardo ramos/i });
      fireEvent.click(editBtn);

      // Alterar nome
      const pacienteInput = screen.getByLabelText(/nome do paciente/i);
      fireEvent.change(pacienteInput, { target: { value: 'Carlos Ramos Atualizado (Fictício)' } });

      const salvarBtn = screen.getByRole('button', { name: /salvar alterações/i });
      fireEvent.click(salvarBtn);

      expect(await screen.findByRole('heading', { name: /carlos ramos atualizado \(fictício\)/i })).toBeInTheDocument();
    });

    it('permite excluir um atendimento mediante confirmação', async () => {
      render(<App />);

      // Login
      fireEvent.click(screen.getByRole('button', { name: /preencher dados de teste com 1 clique/i }));
      fireEvent.click(screen.getByRole('button', { name: /entrar na demonstração/i }));

      // Clicar em excluir do registro de Beatriz
      const deleteBtn = await screen.findByRole('button', { name: /excluir atendimento de beatriz vasconcelos/i });
      fireEvent.click(deleteBtn);

      // Confirmação no modal
      expect(screen.getByRole('heading', { name: /confirmar exclusão/i })).toBeInTheDocument();
      const confirmBtn = screen.getByRole('button', { name: /excluir definitivamente/i });
      fireEvent.click(confirmBtn);

      // Verificar que o cartão do atendimento foi removido da listagem
      await waitFor(() => {
        expect(screen.queryByTestId('card-atend-004')).not.toBeInTheDocument();
      });
    });

    it('filtra atendimentos pela barra de busca', async () => {
      render(<App />);

      // Login
      fireEvent.click(screen.getByRole('button', { name: /preencher dados de teste com 1 clique/i }));
      fireEvent.click(screen.getByRole('button', { name: /entrar na demonstração/i }));

      await screen.findByText(/Carlos Eduardo Ramos \(Fictício\)/i);

      const searchInput = screen.getByPlaceholderText(/buscar por nome do paciente ou descrição/i);
      fireEvent.change(searchInput, { target: { value: 'Mariana' } });

      // Mariana deve estar visível, Carlos não
      expect(screen.getByText(/Mariana Silveira Duarte \(Fictícia\)/i)).toBeInTheDocument();
      expect(screen.queryByText(/Carlos Eduardo Ramos \(Fictício\)/i)).not.toBeInTheDocument();
    });
  });
});

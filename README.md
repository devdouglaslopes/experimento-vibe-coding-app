# Gestão de Atendimentos de Saúde (Protótipo Demonstrativo)

Aplicação web desenvolvida para demonstração e estudo de fluxos de gestão de atendimentos em saúde digital, concebida sob princípios de UX/UI limpos, acessibilidade e design responsivo.

> **Importante:** Esta aplicação utiliza **exclusivamente dados fictícios**. O login disponibilizado é puramente demonstrativo para testes locais e validação de interface, não constituindo um mecanismo de autenticação seguro para produção.

---

## 🚀 Como Executar

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm** (ou yarn/pnpm)

### Instalação de dependências
```bash
npm install
```

### Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:5173`.

### Executar os testes automatizados
```bash
npm test
```

### Gerar build de produção
```bash
npm run build
```

---

## 🧩 Funcionalidades Implementadas

1. **Acesso Demonstrativo (Login Simulado):**
   - Validação de campos obrigatórios (formato de e-mail e senha mínima).
   - Botão para preenchimento de teste com 1 clique.
   - Indicação visual e textual clara de ambiente não seguro/demonstrativo.

2. **Gestão de Atendimentos (CRUD Completo):**
   - **Cadastrar:** Formulário modal com validação instantânea para Nome Fictício do Paciente, Data, Horário e Descrição.
   - **Listar:** Exibição em cartões responsivos com formatação de data brasileira (DD/MM/AAAA) e tags de identificação.
   - **Buscar/Filtrar:** Filtro em tempo real por nome do paciente ou descrição.
   - **Editar:** Edição dos dados com persistência local imediata.
   - **Excluir:** Diálogo modal de confirmação para prevenir exclusões acidentais.
   - **Restaurar:** Botão para recarregar a base de demonstração original a qualquer momento.

3. **Validação e Tratamento de Erros:**
   - Mensagens claras, compreensíveis e contextuais logo abaixo de cada campo inválido.
   - Estados de foco e contraste adequados com suporte a leitores de tela (`aria-invalid`, `aria-describedby`, `role="alert"`).

4. **Armazenamento:**
   - Persistência no `localStorage` do navegador para manter alterações durante a sessão e entre recarregamentos.

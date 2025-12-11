# Status do Projeto Frida

Este documento resume o estado atual do desenvolvimento, funcionalidades implementadas e lacunas identificadas.

## ✅ Funcionalidades Implementadas

### 1. Autenticação (`AuthService`)

- [x] Cadastro de Usuária (Nome, CPF, Email, Telefone, Senha).
- [x] Login via JWT e Refresh Token.
- [x] Logout.
- [x] Middleware de proteção de rotas.

### 2. Usuários (`UserService`)

- [x] CRUD completo de usuárias (Listar, Detalhar, Criar, Editar, Deletar).
- [x] Listagem paginada.
- [x] Diferenciação por Role (Permissões).

### 3. Avaliação de Risco (`RiskAssessmentService`)

- [x] Cadastro de Perguntas e Respostas.
- [x] **Lógica de Risco**: Algoritmo completo de cálculo de risco (Frida Methodology).
- [x] Histórico de avaliações.
- [x] Upsert: Atualiza a avaliação se já existir uma recente.

### 4. Comunicação

- [x] **Chat**: Estrutura base via WebSocket (Socket.io).
- [x] **Notícias**: CRUD básico de notícias.

---

## 🚧 Lacunas e Oportunidades (Missing Features)

### 1. Serviço de Email / Notificações (Priority: High)

- **Ausente**: Não há serviço de envio de emails transacionais.
- **Impacto**: Funcionalidade de "Esqueci minha senha" não pode ser implementada sem isso.
- **Sugestão**: Implementar `MailService` usando Nodemailer + AWS SES ou SendGrid.

### 2. Blob Storage / Uploads (Priority: Medium)

- **Ausente**: Não há lógica para upload de arquivos (ex: Foto de Perfil da usuária, Imagens nas notícias).
- **Impacto**: O app fica visualmente limitado.
- **Sugestão**: Implementar `StorageService` (Local em dev, S3/MinIO em prod).

### 3. Recuperação de Senha (Priority: High)

- **Ausente**: O fluxo de `forgot-password` e `reset-password` não existe na `AuthService`.

### 4. Observabilidade (Priority: Medium)

- **Ausente**: Logging estruturado (apenas `morgan` básico).
- **Sugestão**: Adicionar Winston ou Pino para logs de erro e auditoria.

### 5. Testes Automatizados (Priority: High)

- **Ausente**: O comando `npm test` retorna "Error: no test specified".
- **Sugestão**: Configurar Jest e criar testes unitários para os Services, especialmente `RiskAssessmentService`.

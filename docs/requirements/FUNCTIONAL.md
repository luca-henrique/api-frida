# Requisitos do Sistema - Projeto Frida

## 1. Requisitos Funcionais (RF)

### Autenticação e Usuários

- **RF01 - Cadastro de Usuária**: O sistema deve permitir que usuárias se cadastrem fornecendo Nome, CPF, Email, Telefone, Senha e Endereço.
- **RF02 - Login**: O sistema deve permitir login via Email e Senha, retornando um token JWT.
- **RF03 - Gestão de Perfil**: A usuária deve poder visualizar e editar seus dados cadastrais.
- **RF04 - Recuperação de Senha**: (Pendente) O sistema deve permitir a redefinição de senha via email.

### Avaliação de Risco (Risk Assessment)

- **RF05 - Responder Questionário**: A usuária deve poder responder a um questionário de avaliação de risco.
- **RF06 - Cálculo Automático**: O sistema deve calcular automaticamente o nível de risco (Baixo, Médio, Alto) com base nas respostas.
- **RF07 - Histórico de Avaliações**: A usuária deve poder visualizar o histórico de suas avaliações anteriores.
- **RF08 - Última Avaliação**: O sistema deve destacar a avaliação mais recente no perfil da usuária.

### Comunicação e Conteúdo

- **RF09 - Notícias**: O sistema deve listar notícias relevantes para as usuárias.
- **RF10 - Chat**: O sistema deve permitir comunicação em tempo real (via Socket.io) entre usuárias e administradores/apoio.

---

## 2. Requisitos Não Funcionais (RNF)

### Segurança

- **RNF01 - Criptografia**: Todas as senhas devem ser armazenadas com hash (BCrypt).
- **RNF02 - Autenticação**: O acesso às rotas protegidas deve ser via JWT (JSON Web Token).
- **RNF03 - Proteção de Dados**: O sistema deve seguir princípios da LGPD, protegendo dados sensíveis como CPF e endereço.

### Desempenho e Confiabilidade

- **RNF04 - Disponibilidade**: O sistema deve estar disponível 24/7.
- **RNF05 - Escalabilidade**: O backend deve ser capaz de suportar múltiplas conexões simultâneas (Node.js + Cluster/PM2).

### Arquitetura

- **RNF06 - API REST**: A comunicação deve ser feita via API RESTful padrão.
- **RNF07 - Documentação**: A API deve ser documentada (OpenAPI/Swagger).

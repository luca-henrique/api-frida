# Padrão de Commits

Este projeto segue um padrão rigoroso para mensagens de commit, facilitando a leitura do histórico e a geração de changelogs.

## Formato

`tipo(escopo): mensagem`

| Tipo       | Emoji | Finalidade                                       | Exemplo                                |
| :--------- | :---: | :----------------------------------------------- | :------------------------------------- |
| `feat`     |  ✨   | Adicionar uma nova funcionalidade.               | `feat(auth): add JWT support`          |
| `fix`      |  🐛   | Corrigir um bug.                                 | `fix(api): handle null response`       |
| `refactor` |  📦   | Reescrever o código sem alterar o comportamento. | `refactor(core): cleanup utils`        |
| `perf`     |  🚀   | Melhorar o desempenho do código.                 | `perf(db): reduce query time`          |
| `style`    |  💎   | Ajustar o estilo ou formatação do código.        | `style: format code with prettier`     |
| `test`     |  🚨   | Adicionar ou corrigir testes.                    | `test(api): add integration tests`     |
| `docs`     |  📚   | Atualizar a documentação.                        | `docs(readme): update usage section`   |
| `build`    |  🛠️   | Alterar dependências ou configurações de build.  | `build(deps): bump axios to 1.7.0`     |
| `ci`       |  ⚙️   | Ajustar scripts ou configurações de CI.          | `ci(actions): update node version`     |
| `ops`      |  🔧   | Modificar infraestrutura ou processos de deploy. | `ops(docker): add production compose`  |
| `chore`    |  ♻️   | Executar tarefas que não afetam o código.        | `chore: remove unused scripts`         |
| `revert`   |  🗑️   | Reverter uma alteração anterior.                 | `revert: feat(api): add user endpoint` |

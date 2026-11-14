<!-- regra-id: global:comando-ponto · versao: 2026-11-06 08:42 · origem: geo · base: 36afbf60500b -->
# 📍 Comando "." — atualizar e listar as tarefas-mãe pendentes

Quando o usuário mandar só um ponto (`.`) numa conversa, a IA faz isto, sem perguntar:

1. ✅ **Atualizar com o remoto:** `git fetch origin main` e depois `git pull --rebase origin main`
   (regra de `git-geral.md`; nunca `git merge` nem `git pull` sem `--rebase`). Se o remoto não
   tiver a branch principal, dizer isso e parar.
2. ✅ **Listar só as tarefas-mãe pendentes (C68):** ler `tasks/STATUS.md` e listar **apenas as
   tarefas-mãe** com status `⬜` Pendente, com o ID, o título e quantas subtarefas abertas cada
   uma tem. ⛔ Não listar subtarefas, nem mãe `🔄` Em progresso, `👀`, `⛔`, `✅` ou `❌`.
   **Projeto no banco (C58)** (`rules-ai`; `aulasenai` depois do corte): ler as tabelas
   `quadro_*` do Supabase com a chave `anon` (ex.: `node scripts/gerenciador.mjs`), filtrando
   `tipo = 'mae'` e `status_codigo = 'pendente'`. Sem
   rede, sem chave de leitura ou com o Supabase fora do ar, dizer em 1 linha que o banco não
   responde e listar pelo **quadro local** (C77, `quadro-sem-banco.md`): ler
   `tasks/local/QUADRO-LOCAL.md` e listar as mães `⬜` dele, com o código `LOCAL-…`, o título e as
   subtarefas abertas, marcadas **(local)**. Com leitura do banco (`anon`) mas sem gravação,
   listar **as duas** fontes juntas (mães do banco e mães locais, estas marcadas **(local)**), sem
   repetir uma mãe local que já foi sincronizada. O `git pull` do passo 1 segue valendo para o
   código, as regras e o `tasks/local/`.
3. ✅ Responder com essa lista e mais nada. ⛔ Não começar nenhuma tarefa pendente só por causa
   do ponto.
4. ✅ Se o projeto tiver trava de sessão (como o `tasks/.sessao-ativa` do `rules-ai`), seguir a
   trava dele antes de atualizar.

O ponto não gera commit: a atualização do repositório não muda arquivos do projeto.

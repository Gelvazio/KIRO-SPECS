<!-- regra-id: global:inicio-de-conversa · versao: 2026-11-07 08:19 · origem: geo · base: 8eae7edf41c7 -->
# 🚪 Início de conversa — quadro, leitura do projeto e checklist

Decidido em 2026-11-04 (pedido do usuário). Vale para **todas as IAs** (Claude Code, Codex, Gemini,
Grok, DeepSeek, Copilot etc.) e **todo projeto** em `C:\fontes`. Complementa
`quadro-de-tarefas.md` (modelos do quadro) e `quadro-sem-banco.md` (quadro local).

## Quadro em toda conversa

- ✅ **Toda conversa dentro de um projeto tem o quadro de tarefas.** Se o projeto ainda não tem
  quadro (sem `tasks/`, sem `STATUS.md` na raiz e sem quadro no banco), **sincronizar na hora**,
  antes de qualquer outra ação, sem perguntar ao usuário.
- ✅ **Sincronizar** = o que o projeto manda: `git fetch` + `git pull --rebase origin main`; se o
  projeto tiver `rules-local/`, rodar `node rules-local/sessao.mjs`; se tiver a pasta
  `.claude/rules/tasks/`, criar `tasks/STATUS.md` e `tasks/etapas/` pelos modelos dela.
- ✅ **Quadro que já existe em outro formato** (ex.: `docs/ROADMAP.md`, ou tabelas `quadro_*` no
  banco) é o quadro do projeto: a IA usa esse e diz isso em 1 linha. Não cria quadro novo ao lado.
- ⛔ Não criar quadro novo por conta própria quando já existe um. Em dúvida sobre qual é o quadro,
  perguntar ao usuário.
- ⛔ Sem rede ou sem `C:\fontes`: avisar em 1 linha e seguir sem sincronizar. Nunca inventar quadro.

## Ler o projeto antes de mexer

- ✅ Ler o `CLAUDE.md` do projeto (se existir) e o `AGENTS.md` (se existir). **Vencem** as regras
  globais: em divergência, vale a do projeto.
- ✅ Consultar `docs/` e `bugs/` do projeto antes de modificar qualquer arquivo:
  - arquivo com orientação (`docs/ORIENTACAO_<tipo>_<arquivo>.md`, ex.: `ORIENTACAO_JS_AULAS.md`,
    `ORIENTACAO_JS_SUPABASE.md`, `ORIENTACAO_USUARIO.md` para autenticação): ler inteira e aplicar
    antes de editar;
  - arquivo sem orientação, num projeto que tem a pasta `docs/` com orientações: avisar o usuário;
  - bug identificado: o plano está em `bugs/bug-*.md`.
- ✅ Tarefa grande: o plano é a própria etapa do quadro (`ciclo-da-task.md`); `docs/<tarefa>.md` só
  no projeto sem quadro.

## Checklist de início

```
☐ Li o CLAUDE.md global e o do projeto (se existir)?
☐ O projeto tem quadro? Se não, sincronizei agora?
☐ Li o quadro e retomei de onde parou?
☐ Consultei docs/ e bugs/ para o que vou modificar?
☐ Entendi as regras críticas (commit, documentação, segurança)?
```

Só agir depois de marcar todos os itens.

## Ordem de precedência

Do mais forte para o mais fraco: instrução do usuário na conversa → `CLAUDE.md`/`AGENTS.md` do
projeto → regras globais (`regras/`, pelo `dist/REGRAS-GLOBAIS.md`) → `CLAUDE.md` global de
fora do bloco gerenciado → docs de apoio.

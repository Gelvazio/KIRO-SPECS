<!-- regra-id: global:auto-instalar-rules-local · versao: 2026-11-08 00:58 · origem: geo · base: 9b3cf84cd5c0 -->
# 🪄 Projeto sem `rules-local/` — o Claude Code instala sozinho ao abrir a sessão

Decidido em 2026-11-08 (pedido do usuário: "atualize as regras globais do Claude Code para sempre
já iniciar as regras se elas não existirem num projeto"). Vale para o **Claude Code**, em todo
projeto dentro de `C:\fontes`. Complementa `rules-local.md` (o que é o `rules-local/`).

## A regra

- ✅ **Gancho global `SessionStart`** no `~/.claude/settings.json` roda, ao abrir a sessão:
  `node C:/fontes/rules-ai/scripts/garantir-rules-local.mjs`.
- ✅ O script confere a pasta do projeto. Se **não existe `rules-local/VERSAO.md`**, roda o
  `scripts/instalar-rules-local.mjs` nela: copia scripts e regras, grava os ganchos do projeto
  (`.claude/settings.json`, `.codex/hooks.json`), o aviso no `AGENTS.md`/`CLAUDE.md` (se existir)
  e baixa as regras. Já existe → não faz nada.
- ✅ Depois de instalar, a IA trata a **primeira versão** como instalação (versão anterior
  `nenhuma`): todos os itens `sem ajuste — instalação`, **nenhuma TASK** (`rules-local.md`).
- ⛔ **Não instala** fora de `C:\fontes`, no próprio `rules-ai` (é a fonte) nem em
  `DEMAIS-PROJETOS-*`.
- ⛔ **Não faz commit nem push.** O projeto com Git commita `rules-local/` junto com a tarefa
  seguinte, como manda `rules-local.md`. Pasta sem Git (projeto novo) fica só no disco.
- ✅ O script **nunca falha a sessão** (sempre sai com código 0) e escreve uma linha dizendo o que
  fez (instalado, ou o erro).
- ✅ Sem `C:\fontes\rules-ai` (nuvem, outra máquina): o gancho não existe ou sai calado; vale o
  que diz `rules-local.md` ("Na nuvem").

## Instalar o gancho numa máquina

Uma vez por conta do Claude Code, acrescentar em `hooks.SessionStart` do `~/.claude/settings.json`
(sem apagar os outros ganchos):

```json
{
  "hooks": [
    { "type": "command",
      "command": "node C:/fontes/rules-ai/scripts/garantir-rules-local.mjs",
      "timeout": 30 }
  ]
}
```

## Como conferir

```
☐ O gancho está em hooks.SessionStart do ~/.claude/settings.json?
☐ Abrir sessão numa pasta nova de C:\fontes cria rules-local/ e .claude/settings.json?
☐ O rules-ai e DEMAIS-PROJETOS-* continuam sem receber a pasta?
```

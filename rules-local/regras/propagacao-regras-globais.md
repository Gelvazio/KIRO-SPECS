<!-- regra-id: global:propagacao-regras-globais · versao: 2026-11-07 09:59 · origem: geo · base: 1a8818932475 -->
# 🔁 Regra atualizada → copiada para as regras globais de todas as IAs neste PC

Decidido em 2026-11-07 (pedido do usuário: "sempre que atualizar alguma regra, ela deve ser copiada
para as regras globais de todas as IAs aqui neste PC"). Vale para o repositório `rules-ai` e para
**todas as IAs instaladas neste PC**.

## ⚙️ Ativação por clone (fazer uma vez em cada cópia do `rules-ai`)

O hook fica na pasta `.githooks/`, mas o Git só o usa depois de apontar para ela. Essa configuração
é local de cada clone (`.git/config`), não vai para o GitHub. Em cada cópia do `rules-ai` (em outro
computador, outra pasta ou outro clone), rodar uma vez, na raiz do repositório:

```
git config core.hooksPath .githooks
```

Conferir: `git config core.hooksPath` deve mostrar `.githooks`. Sem isso, as regras não são copiadas
para as IAs daquele clone, e a IA deve avisar o usuário em 1 linha em vez de seguir como se
estivesse sincronizada.

## A regra

- ✅ Sempre que um arquivo de `regras/` (ou o `regras/INDEX.md`) mudar **no GitHub**, a mudança
  chega às regras globais de **todas** as IAs deste PC: Claude Code (e as contas A, B e C), Gemini
  CLI, Codex, Grok, Qoder, opencode, Devin, Kiro, Kilo Code, Hermes e as demais listadas em
  `DESTINOS` de `scripts/sincronizar.mjs`.
- ✅ **Só vale o que está no GitHub.** A fonte é `origin/main`: nada que existe só no computador é
  copiado (isso é a decisão de 2026-10-24, mantida).
- ✅ **Como acontece:** o hook `.githooks/reference-transaction` roda quando `origin/main` muda
  localmente, o que acontece depois de `git push` ou de `git pull`/`git fetch` que trouxe commits.
  Ele dispara `node scripts/sincronizar.mjs --aplicar --so-globais` em segundo plano, com o log em
  `.git/sincronizar-regras.log`.
- ✅ Regra nova (arquivo novo em `regras/`) entra no `INDEX.md` no mesmo commit; sem a linha no
  índice, a regra não chega às IAs.
- ⛔ **Não editar à mão** os arquivos globais das IAs (`~/.claude/CLAUDE.md`, `~/.codex/AGENTS.md`,
  `~/.gemini/GEMINI.md` etc.). Só o bloco entre `rules-ai:inicio` e `rules-ai:fim` é gerado; texto
  fora dele não é propagado e fica como divergência.
- ⛔ Regra nova nasce em `C:\fontes\rules-ai\regras\`, nunca direto no `CLAUDE.md` global.

## Limites

- A cópia só acontece depois do push (ou do pull). Edição local ainda não enviada ao GitHub não
  chega às IAs, e o próprio `sincronizar.mjs` recusa a cópia enquanto `regras/` diferir de
  `origin/main`.
- A sincronização roda em segundo plano: a falha não aparece na hora. Conferir o log
  `.git/sincronizar-regras.log`. Para rodar à mão: `node scripts/sincronizar.mjs --aplicar --so-globais`.

## Como conferir

```
☐ git config core.hooksPath mostra .githooks neste clone?
☐ O push/pull trouxe a regra para origin/main?
☐ .git/sincronizar-regras.log mostra "gravado" ou "igual" para os destinos?
☐ A regra aparece no dist/REGRAS-GLOBAIS.md e no bloco gerenciado dos destinos?
```

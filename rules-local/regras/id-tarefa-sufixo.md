<!-- regra-id: global:id-tarefa-sufixo · versao: 2026-11-13 19:01 · origem: geo · base: 13abaedc48b0 -->
# 🏷️ ID da tarefa-mãe nova termina em `-BANCO-DADOS` ou `-TAREFA-LOCAL` (C78)

Decidida em 2026-11-13 (pedido do usuário). Vale para **todas as IAs e todos os projetos**. Complementa
`quadro-de-tarefas.md` (modelo do quadro no banco) e `quadro-sem-banco.md` (modo local, C77).

## A regra

- ✅ **Tarefa-mãe criada no banco** (RPC `criar_tarefa_mae`): o código **termina em `-BANCO-DADOS`**.
  Ex.: `COLUNA-CALCULA-MEDIA-BANCO-DADOS`.
- ✅ **Tarefa-mãe criada de forma local**, quando a IA **não tem acesso de gravação ao banco**
  (`quadro-sem-banco.md`): o código **termina em `-TAREFA-LOCAL`**. Ex.:
  `COLUNA-CALCULA-MEDIA-TAREFA-LOCAL`. Substitui o formato antigo `LOCAL-<AAAAMMDD>-<HHMM>-<HASH4>`.
- ✅ A **subtarefa** herda o código da mãe: `<mãe>.<n>` (ex.: `COLUNA-CALCULA-MEDIA-BANCO-DADOS.1`).
- ✅ O **nome** antes do sufixo é curto, descritivo e só com maiúsculas, dígitos e hífens (o banco
  recusa outro formato). Já existe o mesmo código: acrescentar `-AAAAMMDD` antes do sufixo.
- ✅ Sufixo uma vez só: nunca `…-BANCO-DADOS-BANCO-DADOS`, nem os dois sufixos juntos.

## Tarefa local que chega ao banco

- ✅ Na sincronização (`quadro-sem-banco.md`), a mãe local entra no banco **com o mesmo código**,
  ou seja, **continua terminando em `-TAREFA-LOCAL`** (junto da coluna `tipo_regra = 'local'`). Ela
  **não** ganha `-BANCO-DADOS`: o sufixo mostra de onde a tarefa nasceu.
- ✅ O script `scripts/quadro_sincronizar_local.mjs` reconhece a tarefa local pelo sufixo
  `-TAREFA-LOCAL` e, por compatibilidade, também pelo prefixo antigo `LOCAL-`.

## O que não muda

- ⛔ Não renomear tarefa que já existe (o código é a chave; as já criadas ficam como estão).
- ⛔ Projeto que ainda está em `.md` (numeração `#N` no `tasks/STATUS.md`) mantém o ID dele até
  migrar para o banco; a regra vale para a tarefa nova **no banco** e para a **local**.
- ⛔ O sufixo não muda nível, modelo, prioridade nem a reserva: é só parte do código.
- A trava é por regra escrita: a RPC `criar_tarefa_mae` não confere o sufixo; quem cria confere.

## Como conferir

```
☐ A mãe nova criada no banco termina em -BANCO-DADOS?
☐ A mãe nova criada sem acesso ao banco termina em -TAREFA-LOCAL (e não em LOCAL-AAAAMMDD…)?
☐ As subtarefas são <mãe>.<n>, sem sufixo repetido?
☐ Só maiúsculas, dígitos e hífens no código?
```

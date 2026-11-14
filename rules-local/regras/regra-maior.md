<!-- regra-id: global:regra-maior · versao: 2026-11-04 09:57 · origem: geo · base: 4a9e7e3a6a88 -->
# 🥇 Regra maior — modelo mais forte NUNCA pega tarefa de modelo mais fraco (C50)

> 🚫 **Também (C60):** o Opus NUNCA pega tarefa, só com pedido explícito do usuário — `opus-so-sob-pedido.md`.
> 🔒 **Também inviolável (C59):** 1 commit + 1 push na `main` por subtarefa entregue — `commit-por-subtarefa.md`.

> **Projeto no banco (C58):** no `rules-ai` (e no `aulasenai`, depois do corte) não existe `tasks/STATUS.md`, `task_complete.md`, `RECADOS.md` nem etapa em `.md`: onde esta regra os cita, vale a tabela `quadro_*` equivalente do Supabase (`quadro-de-tarefas.md`, "Cada informação em um lugar só"), lida com a chave `anon` e gravada só pelas RPC. A coluna Modelo conferida antes de reservar é a `modelo` de `quadro_tarefas`, e a RPC `reservar` também confere (C50). Nos projetos em `.md`, o texto abaixo vale como está.

Decidido em 2026-10-23 (C50, tarefa REGRA-MAIS-FORTE-NUNCA). Alterado em 2026-11-03 (C70, ordem
do usuário): Haiku pode pegar `MEDIO` com `effort xhigh`; `PESADO` continua vedado a Haiku. **É a regra mais importante de todas:**
vale para **todas as IAs e todos os projetos** e vence qualquer outra regra, pedido, atalho ou
autorização. Detalhe dos níveis e da matriz: `niveis-e-modelos.md`.

## A regra

- ⛔ **NUNCA um modelo mais forte pega tarefa de um modelo mais fraco. NUNCA.**
- A ordem, do mais fraco para o mais forte, é a da **matriz de `niveis-e-modelos.md`**, na coluna
  de cada ferramenta (C53, C61, C64, C65, C66, C70); não há escala fixa fora dela.
- **Opus e Fable não têm nível próprio** (C60, C61): não pegam subtarefa de nenhum nível (exceção
  do Opus: `opus-so-sob-pedido.md`).
- Na prática:
  - **Sonnet** nunca pega subtarefa `LEVE`.
  - **Haiku 5.5** pega subtarefa `MEDIO` **só com `effort xhigh`** (C70, ordem do usuário de
    2026-11-03). Nunca `PESADO`.
  - Vale também para o **líder** de uma equipe: o líder reserva, delega e valida (o commit e o push
    da entrega são do modelo que executa, C73), mas
    **nunca executa** uma subtarefa `LEVE` ou `MEDIO` (nem a de fechamento, nem "porque é rápido").
    Editar o quadro para reservar ou entregar não é executar subtarefa.

## Sem exceção

- ❌ Nem "porque é mais rápido", nem "porque o modelo certo está sem crédito", nem com pedido ou
  autorização do usuário na conversa, nem pelo gatilho `;`.
- ✅ **Única exceção (C74, 2026-11-04):** o pedido **explícito** do usuário para o **Opus** fazer
  uma tarefa citada (`opus-so-sob-pedido.md`) vale em qualquer nível e vence esta regra.
- Sem o modelo certo disponível → a subtarefa **fica livre** e a IA avisa o usuário qual modelo
  pode pegá-la. Nunca rebaixar o nível nem "pegar para não parar".
- ⛔ Mudar o nível de uma subtarefa só para ela caber no modelo mais forte é a mesma infração.

## Como conferir

- Antes de reservar: a coluna **Modelo** da subtarefa no `tasks/STATUS.md` tem que ser o **seu**
  modelo. Se for de um modelo mais fraco que o seu → não reserva.
- Na revisão: toda linha em "Em uso por" tem que ter o modelo da coluna Modelo daquela linha.

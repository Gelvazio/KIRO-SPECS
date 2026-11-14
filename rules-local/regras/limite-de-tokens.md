<!-- regra-id: global:limite-de-tokens · versao: 2026-11-08 08:39 · origem: geo · base: 082a0c54a8eb -->
# 🪙 Limite de tokens — no máximo 3 milhões por sessão (C69)

Decidida em 2026-11-03 (pedido do usuário, depois de uma sessão que gastou milhões de tokens com
7 agentes Opus relendo as mesmas regras e entregou só 6 de 66 arquivos). Alterada no mesmo dia
(ordem do usuário): o limite subiu de 1 milhão para 3 milhões por sessão. Vale para **todas as
IAs, todos os modelos e todos os projetos**.

## A regra

- ⛔ **Uma sessão gasta no máximo 3.000.000 de tokens.** Conta a sessão inteira: a conversa
  principal **e todos os agentes e subagentes** que ela abrir (entrada, saída e cache). Não é
  por agente.
- ⛔ **Passou de 3 milhões, tem algo errado no prompt ou no desenho do trabalho.** A IA para na
  hora, não abre mais nenhum agente e avisa o usuário: quanto gastou (estimativa), em quê e o
  que mudar para gastar menos.
- ✅ Só continua com um "sim" explícito do usuário para aquela continuação. O "sim" vale só para
  aquele pedido.

## Antes de gastar

- ✅ Antes de abrir agente, rodar script com modelo pago ou ler muitos arquivos: **estimar os
  tokens e dizer ao usuário**. Se a estimativa, somada ao que a sessão já gastou, passar de
  3 milhões, não começa: propõe um caminho mais barato.
- ✅ Pedido do usuário para "abrir mais agentes" **não dispensa** a estimativa: dizer o custo antes.
- Lembrar no cálculo:
  - cada subagente já nasce com o contexto das regras globais (no Claude Code, perto de 150 mil
    tokens) antes de fazer qualquer coisa;
  - a cada passo o agente reenvia todo o contexto que já leu;
  - vários agentes lendo o mesmo conjunto multiplicam o custo pelo número de agentes.

## Como gastar menos

- 1 agente lendo o conjunto uma vez, em vez de vários relendo o mesmo.
- Ler só o necessário, e trechos em vez de arquivos inteiros quando der.
- Effort do nível (C21); `xhigh`/`max` só onde a regra manda ou o usuário pede.
- Gravar cada entrega assim que fica pronta, sem acumular para o fim.
- Trabalho em massa e repetitivo (revisar dezenas de arquivos, gerar muitos textos): script com
  API barata e contexto fixo em cache, em vez de agentes.
- Sessão longa: abrir sessão nova com handoff em vez de arrastar o contexto.

## Como medir

- **Claude Code:** o uso da sessão no app e o `subagent_tokens` que cada agente devolve ao
  terminar (somar todos).
- **Outras IAs:** o contador de uso da ferramenta. Sem contador, estimar 1 token a cada
  3 caracteres lidos ou escritos, vezes o número de passos.

## Como conferir

```
☐ Estimei os tokens antes de abrir agente, script pago ou leitura grande, e disse ao usuário?
☐ A sessão inteira (conversa + todos os agentes) ficou abaixo de 3 milhões de tokens?
☐ Se passou, parei, avisei e só segui com "sim" explícito?
```

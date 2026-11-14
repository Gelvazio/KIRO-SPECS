<!-- regra-id: global:estimativa-de-tokens · versao: 2026-11-04 09:57 · origem: geo · base: 633f643a41dd -->
# 🧮 Estimativa de tokens antes de começar a tarefa (C75)

Decidida em 2026-11-04 (pedido do usuário: "quero sempre isso no início"). Vale para **todas as
IAs, todos os modelos e todos os projetos**. Complementa `limite-de-tokens.md` (C69), que fixa o
teto da sessão inteira.

## A regra

- ✅ **Antes de começar qualquer tarefa** (o que vira TASK, `ciclo-da-task.md`), a IA diz ao
  usuário **quantos tokens estima gastar** para fazê-la, numa linha, antes de abrir agente, ler
  muitos arquivos ou mudar qualquer coisa.
- ✅ É uma **estimativa simulada**: não dá para saber 100%. A IA mostra o número e a base dele
  (o que vai ler, quantos passos, quantos agentes), sem prometer exatidão.
- ⛔ **Passou de 1.000.000 de tokens na estimativa:** a IA **não começa**. Só começa com
  **aprovação explícita do usuário** para aquela tarefa ("sim, pode gastar"). O "sim" vale só para
  ela.
- ✅ Se, no meio do trabalho, o gasto real passar muito da estimativa (mais que o dobro) ou chegar
  perto de 1.000.000 sem aprovação, a IA para e avisa com o novo número, e só segue com novo "sim".
- ✅ Pergunta, explicação e análise que não mudam nada (não viram TASK) não precisam da estimativa.

## Como estimar

- Somar: contexto inicial da sessão ou do agente (no Claude Code, perto de 150 mil tokens por
  agente novo), leitura (1 token a cada ~3 caracteres lidos), saída escrita e o **reenvio do
  contexto a cada passo** (contexto médio × número de passos).
- Vários agentes lendo o mesmo conjunto multiplicam a leitura pelo número de agentes.
- Na dúvida, arredondar **para cima** e dizer a faixa (ex.: "entre 300 mil e 500 mil").

## Formato

```
🧮 Estimativa: ~<N> tokens (<faixa>) — base: <o que vai ler/fazer, passos, agentes>.
```

Acima de 1 milhão, acrescentar: `Preciso do seu "sim" explícito para começar.`

## Como conferir

```
☐ Disse a estimativa de tokens antes de começar a tarefa?
☐ A estimativa mostrou a base (leitura, passos, agentes)?
☐ Se passou de 1 milhão, só comecei com "sim" explícito do usuário para esta tarefa?
☐ Se o gasto real estourou a estimativa, parei e avisei?
```

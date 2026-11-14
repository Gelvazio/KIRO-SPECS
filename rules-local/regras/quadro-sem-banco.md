<!-- regra-id: global:quadro-sem-banco · versao: 2026-11-13 19:01 · origem: geo · base: b60b1da510e7 -->
# 🪂 Quadro sem acesso ao banco — tarefa local em `.md` no GitHub, sincronizada depois (C77)

Decidida em 2026-11-04 (pedido do usuário). Vale para **todas as IAs e todos os projetos**.
**Prevalece sobre** a frase "sem arquivo de queda" de `quadro-de-tarefas.md` ("Quem não alcança o
banco"), `comando-ponto.md`, `comando-interrogacao.md` e `frentes-e-reserva.md`: o quadro **não
fica mais indisponível**, ele cai para o modo local descrito aqui. O rollback do quadro inteiro
(`api/ROLLBACK-QUADRO.md`) continua só por ordem do usuário e **não** é este modo.

## Quando vale

- ✅ **Só quando a IA não consegue gravar no banco:** sem `SUPABASE_URL`/`SUPABASE_SERVICE_KEY`,
  sem rede, ou Supabase fora do ar. Com a chave `anon` ela ainda **lê** o banco, mas não grava:
  também cai no modo local.
- ❌ Com acesso de gravação ao banco, **é proibido** criar tarefa local: vale o fluxo normal (RPC).
- ✅ Antes de cair no modo local, a IA tenta uma vez e diz em 1 linha por quê (ex.: "sem
  `SUPABASE_SERVICE_KEY`; usando o quadro local").

## Onde mora a tarefa local

- ✅ No **GitHub do próprio projeto**, em `tasks/local/`:
  - `tasks/local/QUADRO-LOCAL.md`: o **quadro**, uma linha por tarefa (código, título, nível,
    modelo, status, em uso por, dependências);
  - `tasks/local/<CODIGO>.md`: **um arquivo por tarefa mãe**, com as subtarefas em seções.
- ✅ **Código (C78, 2026-11-13):** `<NOME-DA-TAREFA>-TAREFA-LOCAL` (maiúsculas, dígitos e hífens,
  que é o que o banco aceita no código da mãe) e `<mãe>.<n>` para a subtarefa; regra completa em
  `id-tarefa-sufixo.md`. Substitui o formato antigo `LOCAL-<AAAAMMDD>-<HHMM>-<HASH4>`, que o script
  de sincronização ainda reconhece nas tarefas já criadas. O sufixo `-TAREFA-LOCAL` nunca colide
  com os códigos criados no banco (`-BANCO-DADOS`) e **continua** no código depois da sincronização.
- ✅ **Campos de cada tarefa** (os mesmos de `quadro_tarefas`, para a sincronização ser 1 para 1):
  `projeto`, `codigo`, `tipo` (`mae`/`sub`), `mae`, `titulo`, `prioridade`, `nivel`, `modelo`,
  `effort`, `depende_de`, `status`, `em_uso_por`, `descricao`, `criterios_aceitacao`, `entrega`,
  `verificacao`. Regra de nível e modelo: a mesma de `niveis-e-modelos.md` (padrão C71 se o Jev
  não puder escolher).
- ✅ A tarefa nasce com `tipo_regra: local` no cabeçalho do arquivo.
- ✅ **Formato do arquivo** (lido por `scripts/quadro_local_leitor.mjs`): `# Título da mãe`, linhas
  `- campo: valor` (valor em várias linhas: continuação indentada com 2 espaços), e cada subtarefa
  numa seção `## <código> — <título>` com `status: ⬜`/`🔄`/`✅` e `atualizado_em` (ISO) quando 🔄.

## Ciclo no modo local

1. **Criar** a tarefa em `tasks/local/` e **publicar** (commit + push) antes de assumir. Na nuvem
   sem `git push` direto, publicar pelo GitHub MCP.
2. **Reservar** = trocar `Em uso por` e `Status` da linha em `QUADRO-LOCAL.md`, commit + push. O
   **push é a trava**: se for rejeitado, outra sessão reservou antes; `git pull`, escolher
   outra subtarefa, nunca forçar o push.
3. **Percentual** em `Em uso por` (` · NN%`) como em C31; a trava de sessão do projeto continua
   valendo.
4. **Entregar** = preencher `entrega`/`verificacao` na seção, marcar ✅ na linha, commit + push.
5. ⛔ Não criar quadro paralelo em JSON, banco local ou outra pasta: **só** `tasks/local/`.

## Pegar a próxima tarefa no modo local

- ✅ Os critérios são os de `frentes-e-reserva.md` ("Pegar uma subtarefa"), **sem mudar nenhum**;
  só muda de onde se lê e onde se grava:
  1. `git fetch` + `git pull --rebase` da branch principal (sem sincronizar, o quadro mente);
  2. ler `tasks/local/QUADRO-LOCAL.md`. Se o banco responde para **leitura** (`anon`), ler também
     as tarefas dele, para respeitar dependência de uma tarefa do banco (`depende_de` com
     `projeto:codigo`); sem leitura, dependência de tarefa do banco é tratada como **não
     cumprida** e a IA avisa o usuário;
  3. escolher uma **subtarefa** com `Em uso por = —`, dependências ✅ e **do seu modelo**, de
     maior prioridade (🔴 → 🟠 → 🟡 → 🟢; empate = ordem do quadro); sem subtarefa livre do seu
     modelo, não pega nenhuma e avisa;
  4. **reservar:** `Em uso por` = `<frente> (desde <data hora>) · 0%` e `Status` = 🔄 na linha
     do `QUADRO-LOCAL.md` e `atualizado_em` na seção; **commit + push imediatos** e só então
     trabalhar. Push recusado = outra frente pegou antes: `git pull --rebase`, reler, escolher
     outra, nunca forçar;
  5. **nível e modelo** valem como no banco (`niveis-e-modelos.md`, regra maior C50). Subtarefa
     local sem nível: o Jev classifica; **Jev fora do ar → padrão C71** (`MEDIO · só Sonnet,
     DeepSeek V4 Pro ou Devin (SWE-2) · effort medium`), nunca a IA escolhe o nível sozinha.
- ✅ Tarefa grande sem o "sim" do usuário ao plano continua 👀 e não é pega.

## Sincronização quando chegar uma IA com acesso ao banco

- ✅ **É a 1ª coisa depois da C76** (sincronizar regras): se existir `tasks/local/*.md` com tarefa
  não sincronizada e a IA grava no banco, ela sincroniza **antes de atender o pedido**.
- ✅ **Quem sincroniza usa o script** (ensaio sem `--aplicar`; só com `--aplicar` grava e apaga):
  `node scripts/quadro_sincronizar_local.mjs --aplicar` (opções: `--pasta <dir>`,
  `--replicar-entrega`). Ele faz os passos abaixo e imprime a tabela `código local → id no banco`
  para a mensagem do commit; o commit + push continua sendo da IA.
- ✅ Os passos que o script faz, para cada tarefa mãe de `tasks/local/`, pela ordem de criação:
  1. `criar_tarefa_mae` e `criar_subtarefa` com os campos do arquivo (nível, modelo e effort
     vêm do arquivo; o `criar_subtarefa` valida);
  2. `marcar_tipo_regra(p_id, 'local')` em **cada** linha criada (a mãe e as subtarefas);
  3. subtarefa local ✅: a `entrega` e a `verificacao` locais entram no fim da descrição no banco
     (nada se perde). Com `--replicar-entrega` o script também repete `reservar` e `entregar`
     (autor em `QUADRO_IA`/`QUADRO_MODELO_IA`); se a RPC recusar (ex.: modelo que não atende o
     nível, regra maior), vira aviso, não erro;
  4. conferir pelo `anon` que as linhas existem com `tipo_regra = 'local'`;
  5. **só então** apagar a tarefa de `tasks/local/` e da linha de `QUADRO-LOCAL.md`; commit + push
     com a tabela `código local → id no banco` na mensagem.
- ⏳ Tarefa local **em execução** (🔄, atualizada há menos de 60 min): não sincronizar; a sessão
  dona termina antes. Passou de 60 min: a IA avisa o usuário e assume ou sincroniza como estiver.
- ✅ Falhou no meio: nada é apagado. A sincronização é **idempotente** (código local já no banco
  é pulado) e a IA diz ao usuário o que sobrou.
- ✅ Quando `tasks/local/` esvazia, o arquivo `QUADRO-LOCAL.md` fica só com o cabeçalho.

## A coluna `tipo_regra`

- ✅ Em `public.quadro_tarefas`: `tipo_regra text not null default 'banco_dados'`, só aceita
  `'local'` ou `'banco_dados'` (`database/quadro/28-tipo-regra.sql`).
- ✅ **Toda tarefa que já está no banco é `banco_dados`** (o `default` preenche as existentes).
- ✅ **Tarefa que nasceu no modo local é `local`**, mesmo depois de sincronizada. Quem grava é a
  RPC `marcar_tipo_regra` (só com a chave de serviço); as RPC de criação não mudam.
- ✅ O dashboard e o gerenciador podem mostrar a coluna; ela não muda status, reserva nem nível.

## Como conferir

```
☐ Tentei o banco antes de cair no modo local, e disse o motivo em 1 linha?
☐ A tarefa local está em tasks/local/ e foi publicada (commit + push) antes de assumir?
☐ Reservei por commit + push, e o push foi aceito (sem forçar)?
☐ Com acesso ao banco: sincronizei tasks/local/ antes do pedido e marquei tipo_regra = 'local'?
☐ Só apaguei a tarefa local depois de conferir que ela está no banco?
```

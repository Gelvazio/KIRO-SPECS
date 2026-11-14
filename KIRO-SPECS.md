# KIRO-SPECS — Kiro Crew: como funciona e como usar aqui

> Fonte: README e estrutura do repositório <https://github.com/kirodotdev/KiroCrew>
> (lido em 2026-11-14). Licença do projeto: Apache-2.0.
> Os detalhes finos (chaves de configuração, guia do Windows) estão nos documentos do próprio
> repositório, citados ao longo do texto. Onde algo não foi confirmado, está marcado.

---

## 1. O que é

O **Kiro Crew** é um espaço de trabalho de desenvolvimento de código aberto que roda **na sua
máquina** (ou em hardware remoto que você controla). O README o descreve como **persistente,
self-learning e self-evolving**.

Você usa o mesmo espaço de trabalho por:

- aplicativo **desktop**;
- **painel web** (por padrão em `http://localhost:5476`);
- **CLI** (`kirocrew`);
- **canais de mensagem** (Slack, Discord): a mesma conversa continua neles.

## 2. Para que serve (objetivo)

Manter o trabalho de desenvolvimento vivo **além de uma única sessão de chat**.

| Ideia | O que significa na prática |
|---|---|
| Persistência | Sessões, memória, agendamentos e checkpoints de tarefas sobrevivem a reinício do Gateway |
| Aprendizado | Correções e falhas viram lições duráveis; padrões repetidos viram skills reutilizáveis |
| Execução sem supervisão | Tarefas de várias etapas, tarefas recorrentes e monitoramentos (heartbeats) que avisam quando algo precisa de atenção |
| Apps | "Kiro Crew Apps": interface própria + agentes + skills + agendamentos + integrações + serviços de backend para uma tarefa específica |

## 3. Arquitetura

Três camadas:

```
 Superfícies                Gateway                       Sessões de agente
 ───────────────            ───────────────────────       ──────────────────────────
 desktop / painel web  ──►  acesso, sessões, memória, ──► runtime ACP + harness
 CLI / Slack / Discord      agendamentos, aprovações,     (agent.acp_backend),
                            apps. Estado fica no host     ferramentas MCP e modelos
                            do Gateway
```

- **Gateway:** o centro. Separa "onde o agente roda" de "onde você trabalha". Guarda o estado no
  host dele.
- **Sessão de agente:** cada conversa ou tarefa em segundo plano é uma sessão lógica; pode ter
  processo dedicado ou um handle num runtime ACP compartilhado.
- **Harness:** o agente que de fato executa. O padrão é o **`kiro-cli`**; outros harnesses ACP são
  suportados (pré-requisitos no guia de instalação do repositório).

### Segurança (defense in depth)

Aprovação de ferramentas, isolamento de SO quando disponível, proteção de caminhos sensíveis,
redação de credenciais, regras de negação, eventos de auditoria e perfis de governança. O painel
escuta só em **loopback** por padrão (não fica exposto na rede).

## 4. Conceitos principais

| Conceito | Descrição |
|---|---|
| **Gateway** | Processo que controla acesso, sessões, memória, agendamentos, aprovações e apps |
| **Sessão** | Uma conversa ou tarefa em segundo plano |
| **Subagentes** | Execução isolada para trabalho paralelo; o resultado volta à conversa principal |
| **Crew Members** | Mantêm lições privadas em armazenamento de memória próprio |
| **Skills** | Conjuntos reutilizáveis em markdown (pasta `skills/`); podem nascer de padrões repetidos e ser editadas |
| **Apps** | Interfaces e fluxos de domínio com APIs, eventos e hooks do Gateway |
| **Heartbeats** | Monitoramentos que avisam quando algo exige atenção |
| **Checkpoints** | Pontos de retomada das tarefas, mantidos mesmo após reiniciar |

Não há uma lista fechada de "papéis" de agentes no README: o que existe são subagentes, Crew
Members, skills e apps.

## 5. Fluxo de trabalho

1. Você pede algo pelo app, painel, CLI ou canal de mensagem.
2. O Gateway recebe e aplica acesso, políticas e aprovações.
3. Uma sessão de agente executa pelo runtime ACP, com ferramentas MCP.
4. A tarefa é planejada, executada em etapas, **validada** e **tentada de novo** se falhar, com
   checkpoints.
5. Lições e skills são registradas para uso futuro.
6. No painel você vê: chamadas de ferramenta, progresso dos subagentes, aprovações,
   agendamentos, memória e logs.

### Exemplos de pedido (do README)

- **Com verificação:** "implemente o plano de migração e pare se os testes falharem",
  validando a cada etapa.
- **Recorrente:** "resumo diário do trabalho pendente, às 9h em dias úteis" (com fuso horário).
- **Delegação:** "pesquise três opções em paralelo com subagentes isolados e recomende uma".
- **Diagnóstico:** enviar uma captura de tela de erro para o modelo ativo.

## 6. Estrutura do repositório

| Pasta / arquivo | Para quê |
|---|---|
| `src/kiro_crew/` | Pacote Python principal (núcleo do Gateway); docs de usuário em `src/kiro_crew/docs/` |
| `native/kc_native/` | Componente nativo |
| `packages/kirocrew-client-py/` | Cliente Python |
| `skills/` | Skills em markdown |
| `docs/` | Docs de contribuidores e arquitetura (instalação, Docker, Windows, remoto, release, specs de módulos) |
| `docs/system-specs/modules/config.md` | Especificação de configuração (chaves e precedência) |
| `config/`, `docker/`, `packaging/`, `scripts/`, `bin/` | Configuração, contêineres, empacotamento e auxiliares |
| `test/`, `evals/`, `semgrep/`, `semgrep-tests/` | Testes, avaliações e análise estática |
| `website/`, `site/` | Sites do projeto |
| `install.sh`, `install.ps1`, `cli.sh`, `cloud-install.sh`, `minimal_install.sh` | Instaladores |
| `Makefile`, `make.ps1` | Build |
| `AGENTS.md`, `CLAUDE.md` | Regras para assistentes de IA que mexem no repositório |
| `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CHANGELOG.md`, `TENETS.md`, `GOVERNANCE.md` | Documentação do projeto |

## 7. Requisitos

- **macOS / Linux:** Python 3.12+, Node.js 22.12+ (24 LTS recomendado) e npm.
- **Agente padrão:** `kiro-cli` instalado no host do Gateway e `kiro-cli login` feito antes do uso.
- **Windows:** instalação nativa, pelo guia específico para Windows em `docs/` do repositório
  (o repositório tem `install.ps1` e `make.ps1`; **os passos exatos não foram lidos aqui**).
- **Docker:** imagem pública multiarquitetura no GHCR.

## 8. Instalação

Escolha **uma** das formas:

**a) Aplicativo desktop** — baixe na página do projeto (macOS `.dmg`, Windows `.exe`,
Linux `.deb`/`.rpm`/AppImage). Canais: Stable (padrão), Insider e Nightly.

**b) Instalação em uma linha (macOS/Linux)**

```bash
curl -fsSL https://download.crew.kiro.dev/cli.sh | sh
```

Depois abra `http://localhost:5476`. Dá para fixar versão com `--version` (mínima: 0.1.2).

**c) Docker**

```bash
docker run -d --name kirocrew -p 127.0.0.1:5476:5476 -v kirocrew-home:/home/kirocrew ghcr.io/kirodotdev/kirocrew:stable
```

**d) A partir do código-fonte**

```bash
git clone https://github.com/kirodotdev/KiroCrew
cd KiroCrew
make build
source .venv/bin/activate
```

> ⚠️ Os comandos acima baixam e executam código de terceiros: confira a fonte antes de rodar.
> Neste computador (Windows 11), o caminho mais direto é o **app desktop (.exe)** ou o guia
> de Windows do repositório.

## 9. Comandos da CLI

| Comando | Função |
|---|---|
| `kirocrew setup` | Configuração inicial |
| `kirocrew doctor` | Verifica o ambiente e diagnostica |
| `kirocrew gateway` | Inicia o Gateway (porta por `KIROCREW_PORT` ou `--port <n>`) |
| `kirocrew service install` / `service status` | Execução persistente, iniciando no boot |
| `kirocrew logs` / `kirocrew logs -f` | Logs (e acompanhar em tempo real) |
| `kirocrew config get` / `set <chave> <valor>` / `edit` | Configuração |
| `kirocrew telemetry disable` / `status` | Telemetria |

## 10. Configuração

- Dados do usuário em **`~/.kiro/crew`** (mude com `KIROCREW_HOME`); algumas pastas ficam em
  `~/.kiro`.
- Variáveis citadas: `KIROCREW_PORT`, `KIROCREW_HOME`, `KIROCREW_TELEMETRY_DISABLED`,
  `KIROCREW_TELEMETRY`, `DO_NOT_TRACK`.
- Escolha do agente: chave `agent.acp_backend`.
- **Telemetria:** heartbeat diário anônimo com 5 campos (ID aleatório da instância, versão, versão
  do Python, forma de instalação, flag de primeiro envio). O README diz que prompts, arquivos e
  credenciais **não** são enviados. Desligue com `kirocrew telemetry disable` ou `DO_NOT_TRACK=1`.

## 11. Como usar aqui (`C:\fontes\KIRO-SPECS`)

Esta pasta está sem Git e só tem as regras globais (`rules-local/`) e este documento. Um caminho
sugerido:

1. **Instalar** o Kiro Crew (app desktop para Windows, ou o guia de Windows do repositório).
2. **Instalar e autenticar o `kiro-cli`** (`kiro-cli login`), que é o agente padrão.
3. Rodar `kirocrew setup` e depois `kirocrew doctor`.
4. Subir o Gateway (`kirocrew gateway`) ou deixá-lo persistente (`kirocrew service install`) e abrir
   `http://localhost:5476`.
5. **Apontar uma sessão para a pasta do projeto** que você quer desenvolver (por exemplo, um dos
   projetos em `C:\fontes`) e pedir tarefas em linguagem natural.
6. Antes de tarefas longas, pedir **verificação por etapa** e **parada em falha**; para rotinas,
   pedir agendamento com horário e fuso.
7. Revisar as **aprovações de ferramenta** no painel; manter o painel só em loopback.
8. Usar `kirocrew logs -f` se algo falhar.

### Cuidados e relação com as regras deste ambiente

- O Kiro Crew **grava memória e lições em `~/.kiro/crew`**. Isso é independente do quadro de
  tarefas e do `rules-local/`; em divergência, **vale o quadro** do projeto (memoria-ai.md).
- Ele **aprende e cria skills sozinho**. Conferir o que foi criado antes de confiar.
- As regras globais daqui continuam valendo para quem altera código: commit por subtarefa,
  sem backup, sem testes novos fora de correção de bug, nunca abrir navegador por IA.
- O Kiro Crew tem `AGENTS.md` e `CLAUDE.md` próprios: se for **contribuir** com o repositório,
  leia-os e o `CONTRIBUTING.md` primeiro.

## 12. Limites desta leitura

- O README completo tem cerca de 158 mil caracteres; só os primeiros 100 mil foram processados.
  Pode haver detalhes (canais Slack/Discord, apps, governança, guia do Windows) não cobertos.
- O fluxo detalhado de **Windows** e a lista exata de chaves de configuração estão nos documentos
  do repositório e **não** foram confirmados aqui.
- Nada foi instalado nem executado: este documento descreve, não testa.

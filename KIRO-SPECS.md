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
- **Agente padrão:** `kiro-cli` (<https://kiro.dev/cli/>) instalado no host do Gateway e
  `kiro-cli login` feito antes do uso. Na primeira abertura, o Kiro Crew confere isso e mostra o
  link do guia oficial se faltar. Ele **não** baixa nem faz login por você.
- **Windows (instalação pelo código-fonte):**

  | Ferramenta | Observação |
  |---|---|
  | Git for Windows | para clonar |
  | `kiro-cli` | instalar e logar à parte |
  | Python **3.12–3.13** | **3.12 é o testado no Windows**; evitar o atalho `python` da Microsoft Store |
  | Node.js 22.12+ | só para montar o painel (`winget install OpenJS.NodeJS.LTS`) |

  Não precisa de administrador: tudo instala por usuário em `%USERPROFILE%`.
- **Windows (instalador desktop):** o `.exe` já traz o backend embutido, **sem Python à parte**.
- **Docker:** imagem pública multiarquitetura no GHCR.

## 8. Instalação

Escolha **uma** das formas:

**a) Aplicativo desktop** (o mais simples no Windows) — o app se atualiza sozinho no mesmo canal.

| Canal | O que segue |
|---|---|
| **Stable** (padrão) | Versões estáveis |
| **Insider** | Candidatas a release |
| **Nightly** | A branch `main` (pode instalar lado a lado com o Stable) |

Windows x64 (`.exe`), links do README:

- Stable: <https://download.crew.kiro.dev/desktop/stable/latest/KiroCrew-Setup.exe>
- Insider: <https://download.crew.kiro.dev/desktop/insider/latest/KiroCrew-Setup.exe>
- Nightly: <https://download.crew.kiro.dev/desktop/nightly/latest/KiroCrew-Setup.exe>

Sobre o instalador do Windows (guia `docs/guides/windows-install.md`): assinado (Authenticode),
instala **por usuário por padrão**, sem UAC; o SmartScreen ainda pode mostrar um aviso no primeiro
download. Desinstalar remove o app e o cache de atualização, mas **mantém seus dados**
(`~/.kiro/crew`). Também há `.dmg` (macOS) e `.deb`/`.rpm`/AppImage (Linux x86_64 e aarch64).

**b) Instalação em uma linha (macOS/Linux)**

```bash
curl -fsSL https://download.crew.kiro.dev/cli.sh | sh
```

Depois abra `http://localhost:5476`. Dá para fixar versão com `--version` (mínima: 0.1.2).

**c) Docker**

```bash
docker run -d --name kirocrew -p 127.0.0.1:5476:5476 -v kirocrew-home:/home/kirocrew ghcr.io/kirodotdev/kirocrew:stable
```

**d) A partir do código-fonte (macOS/Linux)**

```bash
git clone https://github.com/kirodotdev/KiroCrew
cd KiroCrew
make build
source .venv/bin/activate
kirocrew setup
kirocrew doctor
kirocrew gateway
```

**e) A partir do código-fonte (Windows, PowerShell)** — o `make.ps1` é o equivalente do Makefile
(alvos: `build`, `frontend`, `backend`, `test`, `wheel`, `backend-bin`, `desktop`, `clean`).

```powershell
git clone https://github.com/kirodotdev/KiroCrew.git
cd KiroCrew
.\make.ps1 build
kirocrew kas install   # opcional: baixa o motor KAS embutido desta versão
kirocrew setup
kirocrew gateway
```

Se aparecer "running scripts is disabled", libere só para você ou só para uma execução:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
powershell -ExecutionPolicy Bypass -File .\make.ps1 build
```

O guia do Windows também traz o passo manual (venv + `pip install -e ".[voice]"` +
`python -m kiro_crew.frontend stage .`). Abra a URL do painel que o `gateway` imprimir.

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
- No Windows, o arquivo de configuração é `%USERPROFILE%\.kiro\crew\config.json`.

### Telemetria (detalhe)

- **Heartbeat diário anônimo**, com exatamente 5 campos: ID aleatório da instância (UUID4, não vem
  de hostname, usuário, MAC ou IP), versão do app (só o número, sem carimbo de build), versão
  menor do Python, forma de instalação (ex.: `dmg`) e flag de primeiro envio.
- **Recibo de instalação de app** (evento separado): depois de instalar ou atualizar um app do
  catálogo oficial, envia um GET com identificador público do app, token HMAC, tipo
  (`fresh`/`update`) e versão. Apps de registros próprios, pastas locais ou auto-registrados
  **não** geram recibo.
- **Nunca enviados:** prompts, respostas do modelo, conteúdo e caminhos de arquivos, nomes de
  repositório ou branch, credenciais, variáveis de ambiente, hostname, usuário e IP (o CDN não
  registra IP). O login do Kiro usado pelo `kiro-cli` nunca é lido nem enviado.
- A primeira saída só acontece **depois** da tela de privacidade da primeira execução.
- **Desligar:** botão **Turn off** na tela Privacy, ou **Settings > Privacy > Send anonymous usage
  heartbeat**, ou:

  ```bash
  kirocrew telemetry disable          # métricas locais + heartbeat (grava no config.json)
  export KIROCREW_TELEMETRY_DISABLED=1 # só o heartbeat
  export DO_NOT_TRACK=1                # tudo (métricas locais + heartbeat)
  kirocrew telemetry status            # mostra as chaves e o que seria enviado
  ```

  No PowerShell, use `$env:DO_NOT_TRACK = "1"`.
- Já fica **desligada** em CI e quando `KIROCREW_HOME` não aponta para `~/.kiro/crew`.
- Empresas podem bloquear por política (`capabilities.telemetry.enabled = false`).
- **Métricas locais** (`telemetry.enabled`) são outra coisa: ficam só na máquina, limitadas a
  30 dias e 100 MB; desligam com `KIROCREW_TELEMETRY=0` ou `DO_NOT_TRACK=1`.

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

### Cuidados específicos do Windows (do guia `windows-install.md`)

- **Sem sandbox de SO no Windows.** O harness padrão (KAS) roda **sem confinamento** e pode ler a
  sua pasta de usuário, incluindo `.aws` e `.ssh`. Scripts, hooks, servidores MCP de terceiros e
  outros harnesses também. O Kiro Crew limpa variáveis de ambiente com credenciais e registra cada
  execução na auditoria, mas **não impede a leitura**.
- **Para ficar dentro do sandbox do `kiro-cli`:** em Settings → Agent Harness escolha **Kiro CLI**
  (`"acp_backend": "kiro"`).
- **Para recusar execuções sem confinamento**, em `%USERPROFILE%\.kiro\crew\config.json`:

  ```json
  { "agent": { "sandbox_allow_unsandboxed_exec": false } }
  ```

  Efeito colateral: MCP, apps com backend, crons de script e hooks passam a dar erro de sandbox.
  O `kirocrew setup` pergunta isso (padrão: **não**) e o `kirocrew doctor` mostra o estado em
  **Sandbox**.
- **Não funcionam no Windows (por enquanto):** crons de comando (`sh -c`; use cron de **script**
  ou de **mensagem para o LLM**), skills por projeto (`<projeto>/.kiro/skills`; as globais
  funcionam), Duplicar no Spec Builder, título da aba do terminal e túnel SSH de instâncias.
- **Hooks no Windows** rodam em `cmd.exe`: use `%KIROCREW_HOOK_EVENT%`, não `$VAR`, e aspas
  duplas. Hook escrito para macOS/Linux precisa ser reescrito.
- **Funcionam:** Gateway, chat, painel, crons de mensagem, Issue Radar (com `gh`), Spec Builder
  (menos Duplicar), Code Review Sage, automação de navegador (`browser`), memória vetorial local,
  voz (`System.Speech`), `kirocrew cloud launch`/`connect` (este exige o plugin AWS Session
  Manager) e `kirocrew pod` (via Agendador de Tarefas).
- **Computer use** (controlar apps) fica atrás de uma opção explícita em Settings → Computer Use;
  um Gateway sem privilégio não enxerga janelas elevadas.

### Canais de mensagem suportados

Slack, Discord, Telegram, Teams, Webex, WeCom, WeChat (Weixin), WhatsApp, Feishu (Lark) e iMessage.
Cada um tem guia próprio em `docs/guides/` ou `src/kiro_crew/docs/` (ex.:
`slack-setup.md`, `discord-integration.md`).

### Cuidados e relação com as regras deste ambiente

- O Kiro Crew **grava memória e lições em `~/.kiro/crew`**. Isso é independente do quadro de
  tarefas e do `rules-local/`; em divergência, **vale o quadro** do projeto (memoria-ai.md).
- Ele **aprende e cria skills sozinho**. Conferir o que foi criado antes de confiar.
- As regras globais daqui continuam valendo para quem altera código: commit por subtarefa,
  sem backup, sem testes novos fora de correção de bug, nunca abrir navegador por IA.
- O Kiro Crew tem `AGENTS.md` e `CLAUDE.md` próprios: se for **contribuir** com o repositório,
  leia-os e o `CONTRIBUTING.md` primeiro.

## 12. Onde aprofundar (docs do repositório)

| Assunto | Arquivo |
|---|---|
| Instalação, serviço, atualização, recuperação | `docs/guides/install.md` |
| Windows | `docs/guides/windows-install.md` |
| Docker | `docs/guides/docker.md` |
| Host remoto e celular | `docs/guides/remote-and-mobile.md` |
| App desktop / release | `docs/build/desktop-app.md`, `docs/build/release.md` |
| Recursos e skills | `src/kiro_crew/docs/index.md`, `skills/README.md` |
| Arquitetura, MCP, segurança | `docs/architecture/overview.md`, `mcp.md`, `security-deep-dive.md` |
| Sessões, config, memória, governança, métricas | `docs/system-specs/modules/` (`session.md`, `config.md`, `memory-skills-hooks.md`, `governance.md`, `metrics.md`, `security.md`) |
| Criar apps | `docs/app-kit/getting-started.md` |
| Problemas | `src/kiro_crew/docs/troubleshooting.md` |
| Contribuir | `CONTRIBUTING.md`, `TENETS.md`, `GOVERNANCE.md`, `AGENTS.md`, `CHANGELOG.md` |

Site oficial: <https://kiro.dev/crew/>. Issues: <https://github.com/kirodotdev/KiroCrew/issues>.
Vulnerabilidades: reportar em privado, conforme o `SECURITY.md`.

## 13. Cobertura desta leitura

- **README:** lido por inteiro (193 mil caracteres). Do caractere ~100 mil em diante há só a lista
  de colaboradores e o rodapé do GitHub; todo o conteúdo técnico está nas linhas 1–369.
- **Guia do Windows:** lidas as seções de instalador, pré-requisitos, instalação nativa, sandbox e
  tabela de recursos (cerca de 400 das ~1.030 linhas). As seções internas (travas de arquivo, Job
  object, estruturas Win32, solução de problemas) **não** foram lidas.
- **Não lidos:** `install.md`, `docker.md` e os specs de módulos; confira lá chaves de configuração
  exatas e a versão atual.
- Nada foi instalado nem executado: este documento descreve, não testa.

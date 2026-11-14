<!-- regra-id: global:mods-claude-code · versao: 2026-11-06 08:42 · origem: geo · base: 326802c9100f -->
# 🧩 Mods do Claude Code (marketplace `benai-mods`)

> **Projeto no banco (C58):** no `rules-ai` (e no `aulasenai`, depois do corte) não existe `tasks/STATUS.md`, `task_complete.md`, `RECADOS.md` nem etapa em `.md`: onde esta regra os cita, vale a tabela `quadro_*` equivalente do Supabase (`quadro-de-tarefas.md`, "Cada informação em um lugar só"), lida com a chave `anon` e gravada só pelas RPC. Nos projetos em `.md`, o texto abaixo vale como está.

Decidido em 2026-10-24 (pedido do usuário). Vale para o **Claude Code** em **todos os projetos**.
Fonte dos mods: `C:\fontes\rules-ai\MODS-CLAUDE-CODE\benai-mods` (marketplace local, só com o
README e os plugins; descrição de cada um no README).

## Os 15 mods, instalados e ativos em todos os projetos

Atualizado em 2026-11-04 (pedido do usuário: instalar todos os mods do vídeo e mandar instalar nos
outros repositórios). Instalados no escopo do usuário
(`claude plugin install <mod>@benai-mods --scope user`) e ligados em `~/.claude/settings.json`
(`enabledPlugins`), valendo em qualquer pasta:

| Mod | Para que serve |
|-----|----------------|
| `helper-desk@benai-mods` | Barra de progresso acima do prompt e painel de subagentes (obrigatório em todo chat) |
| `handoff@benai-mods` | Perto de 250 mil tokens, escreve o handoff do chat e abre um chat novo com ele |
| `reflect@benai-mods` | Quando o usuário corrige a IA, oferece salvar a correção como regra |
| `chat-inventory@benai-mods` | Painel "In this chat": tarefas, conectores, arquivos e skills usados |
| `mods@benai-mods` | `/mods`: liga e desliga cada mod |
| `brain-dump@benai-mods` | Molda um prompt longo e solto num prompt de 4 partes, com até 3 perguntas |
| `cache-clock@benai-mods` | Contagem regressiva do cache do chat e botão "Keep warm" |
| `screen-share@benai-mods` | `/screen-share`: esconde nomes, e-mails, telefones e valores na gravação |
| `replay-theater@benai-mods` | `/replay`: percorre os diffs feitos pela IA no último turno |
| `token-weather@benai-mods` | Previsão do tempo da janela de contexto acima do prompt (sol, nublado, chuva, tempestade) |
| `blast-radius@benai-mods` | Segura comando Bash arriscado (`rm -rf`, `git reset --hard`, push forçado, `DROP`), mostra o que mudaria e pergunta Continuar/Cancelar |
| `edit-lock@benai-mods` | Bloqueia Edit/Write em arquivo que outra conversa editou nos últimos 10 min (trava em `~/.claude/edit-locks/`) |
| `file-panel@benai-mods` | `/files`: painel com os arquivos lidos, editados e criados no chat |
| `theme-switcher@benai-mods` | `/tema`: lista e troca o tema visual |
| `side-browser@benai-mods` | `/browser <url>`: painel ao lado do chat com o texto e os links da página (leitor de texto, sem JavaScript) |

**You Should Know:** já vem embutido no Claude Code; não há pasta nem instalação. O usuário liga
quando quiser (pelo `/config`; a IA não liga sozinha).

## Instalar nos outros repositórios (regra de instalação)

- ✅ **Os mods são do usuário, não do repositório:** instalar uma vez no escopo `user` vale para
  todos os repositórios da máquina. Nenhum repositório precisa de cópia dos mods.
- ✅ **No começo de uma sessão do Claude Code em qualquer projeto**, a IA confere
  `claude plugin list` (ou `~/.claude/plugins/installed_plugins.json`). Se faltar algum dos 15,
  instala só o que falta, sem perguntar, e avisa em 1 linha quais instalou:

  ```bash
  claude plugin marketplace add C:/fontes/rules-ai/MODS-CLAUDE-CODE/benai-mods   # só se ainda não houver o marketplace benai-mods
  for m in helper-desk handoff reflect chat-inventory mods brain-dump cache-clock screen-share \
           replay-theater token-weather blast-radius edit-lock file-panel theme-switcher side-browser; do
    claude plugin install "$m@benai-mods" --scope user
  done
  ```

- ✅ Depois, `/reload-plugins` nos chats já abertos.
- ⛔ **Nuvem e máquina sem `C:/fontes/rules-ai`:** o marketplace não existe lá e o container some
  ao fim da sessão. A IA diz em 1 linha "mods não instalados (sem `C:/fontes/rules-ai`)" e segue;
  não copia os mods para dentro do projeto e não trava o pedido. Para instalar na nuvem, clonar o
  `Gelvazio/rules-ai` e apontar o `marketplace add` para `MODS-CLAUDE-CODE/benai-mods` do clone.
- ✅ A fonte dos mods é só `C:\fontes\rules-ai\MODS-CLAUDE-CODE\benai-mods`. Mod novo ou mudado
  se faz lá, entra no `marketplace.json` e no README, e a tabela acima ganha a linha.

## Regras

- ✅ **helper-desk:** todo chat com 2 ou mais passos usa `mcp__helper-desk__plan` (regra já existente
  no `CLAUDE.md` global); continua valendo.
- ✅ **reflect:** só **oferece** salvar regra; a IA nunca grava regra global sem o usuário aceitar.
  Regra nova do usuário continua indo para `C:\fontes\rules-ai\regras\` (fonte única), não para
  um `CLAUDE.md` solto.
- ✅ **handoff:** o handoff do mod **complementa** o quadro (`tasks/STATUS.md`) e a memória
  (`memoria-ai.md`); se divergir do quadro, vale o quadro.
- ✅ **blast-radius:** a IA **nunca** responde "Continuar" por conta própria nem reescreve o comando
  para escapar do padrão; só o usuário decide. Cancelou → a IA propõe a alternativa mais segura.
- ✅ **edit-lock:** complementa a trava de sessão de cada projeto (ex.: `tasks/.sessao-ativa`, C29)
  e não a substitui. Bloqueou → a IA avisa o usuário e espera; não apaga a trava sozinha.
- ✅ Projeto ou conta nova do Claude Code: instalar os 15 com o comando acima e conferir em
  `~/.claude/plugins/installed_plugins.json`; depois `/reload-plugins` nos chats abertos.
- Para ligar/desligar um mod: `/mods`, ou `enabledPlugins` no `~/.claude/settings.json`.
- A pasta do marketplace é lida pelo caminho local; se for movida, atualizar
  `extraKnownMarketplaces.benai-mods.source.path` no `settings.json`.

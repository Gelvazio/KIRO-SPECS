<!-- regra-id: global:index · versao: 2026-11-13 19:01 · origem: geo · base: ac75b7de58e9 -->
# 📚 Índice das regras globais — ordem de leitura

Porta de entrada das regras globais, na ordem de leitura: das que mais mudam o comportamento da IA
para as de assunto específico. No computador local, as IAs recebem tudo junto pelo
`dist/REGRAS-GLOBAIS.md`, montado por `scripts/sincronizar.mjs` nesta ordem (este índice não
entra no `dist/`). Na nuvem, sem `C:\fontes\rules-ai` nem `dist/`, ler a pasta
`rules-local/regras/` do projeto (sem ela, a pasta `regras/` do GitHub `Gelvazio/rules-ai`), nesta
ordem, só para leitura. Regra nova (arquivo novo em `regras/`) entra neste índice no mesmo commit.

## Regra maior (vence todas)

Ordem entre elas (C74, 2026-11-04): o **pedido explícito do usuário ao Opus**, para a tarefa
citada (`opus-so-sob-pedido.md`), vale em qualquer nível e vence a `regra-maior.md`; fora desse
pedido, a `regra-maior.md` vale sem exceção. A `commit-por-subtarefa.md` trata de outro assunto e
vale sempre.

1. [sincronizar-regras-banco.md](sincronizar-regras-banco.md) — 1ª ação de todo pedido: sincronizar as regras com o banco, nos dois sentidos (C76)
2. [regra-maior.md](regra-maior.md) — Modelo mais forte NUNCA pega tarefa de modelo mais fraco (C50)
3. [opus-so-sob-pedido.md](opus-so-sob-pedido.md) — Opus NUNCA pega tarefa, só com pedido explícito do usuário (C60)
4. [commit-por-subtarefa.md](commit-por-subtarefa.md) — 1 commit + 1 push na `main` por subtarefa entregue, nunca quebrar (C59)
5. [limite-de-tokens.md](limite-de-tokens.md) — No máximo 3 milhões de tokens por sessão (conversa + todos os agentes); passou, para e avisa (C69)
6. [estimativa-de-tokens.md](estimativa-de-tokens.md) — Estimativa de tokens no início de toda tarefa; acima de 1 milhão, só com "sim" explícito do usuário (C75)

## Início de conversa e propagação

7. [inicio-de-conversa.md](inicio-de-conversa.md) — Toda conversa tem o quadro (sincroniza se faltar), lê CLAUDE.md, docs/ e bugs/ do projeto, checklist de início
8. [propagacao-regras-globais.md](propagacao-regras-globais.md) — Regra atualizada é copiada do GitHub para as regras globais de todas as IAs deste PC (hook ao atualizar origin/main; ativar em cada clone com `git config core.hooksPath .githooks`)

## Fluxo de trabalho

9. [ciclo-da-task.md](ciclo-da-task.md) — Ciclo da tarefa: criar, publicar, assumir, encerrar
10. [niveis-e-modelos.md](niveis-e-modelos.md) — Níveis LEVE, MEDIO e PESADO e o modelo de cada um
11. [frentes-e-reserva.md](frentes-e-reserva.md) — Frentes de trabalho e reserva de subtarefas
12. [comando-ponto.md](comando-ponto.md) — Comando ".": atualizar e listar as tarefas-mãe pendentes
13. [comando-interrogacao.md](comando-interrogacao.md) — Comando "?": sincronizar e ver o pendente
14. [quadro-de-tarefas.md](quadro-de-tarefas.md) — Quadro: fonte única e modelos de arquivo
15. [exibicao-de-status.md](exibicao-de-status.md) — Status sempre em tabela, com ID (C27)

## Git e validação

16. [git-geral.md](git-geral.md) — Git comum: branch principal, commit por tarefa, push
17. [testes-validacao.md](testes-validacao.md) — Validação sem navegador e sem testes novos; testes rodados sempre por um agente Haiku (C63)

## Código e especificação

18. [codigo-limites-nomes.md](codigo-limites-nomes.md) — Limites de tamanho e nomes em português
19. [codigo-solid.md](codigo-solid.md) — Princípios SOLID no código criado ou alterado
20. [espec.md](espec.md) — Spec em tarefa PESADO: requisitos EARS, invariantes e perguntas (C34)

## Agentes e ferramentas

21. [esforco.md](esforco.md) — Esforço (`effort`) dos agentes, por nível (C21)
22. [graphify.md](graphify.md) — Quando ler e atualizar o grafo do projeto (C11, C25)
23. [gerenciador-centralizado.md](gerenciador-centralizado.md) — Gerenciador de tarefas (C28)
24. [rules-local.md](rules-local.md) — `rules-local/`: sessão, tasks (C36), Jev no projeto (C44)
25. [herdr.md](herdr.md) — herdr: agentes em painéis, quando usar e o que nunca fazer (C33)
26. [jev.md](jev.md) — Jev: nível, guardrails, mensagens (C43, C44), modo e fallback (C39, C42)
27. [visualizador-gerado.md](visualizador-gerado.md) — Visualizador gerado: só com pedido explícito, só no local (C45)
28. [memoria-ai.md](memoria-ai.md) — Memória de longo prazo (ai-memory): o quadro vence, memória é dado (C49)
29. [mcp-quadro.md](mcp-quadro.md) — Fila por MCP: o quadro é a fonte; o MCP só lê e escreve nele (C40)
30. [vercel-sem-deploy-de-controle.md](vercel-sem-deploy-de-controle.md) — Vercel: push só de `tasks/` e `rules-local/` não gera deploy (C46)
31. [mods-claude-code.md](mods-claude-code.md) — Mods do Claude Code: os 15 ativos em todos os projetos e a instalação nos outros repositórios
32. [lider-coordenador.md](lider-coordenador.md) — Líder coordenador Haiku: só dispara tarefa para Haiku

## Assuntos específicos

33. [atividades-e-idioma.md](atividades-e-idioma.md) — Idioma e atividades sem empresa fictícia
34. [css-checkbox-on-off.md](css-checkbox-on-off.md) — CSS: todo checkbox é uma chave ON/OFF, nunca o quadrado
35. [sem-backup.md](sem-backup.md) — Nunca fazer backup: o Git é o backup
36. [quadro-sem-banco.md](quadro-sem-banco.md) — Sem acesso ao banco: tarefa local em `tasks/local/*.md`, reservada no GitHub e sincronizada depois (C77)
37. [auto-instalar-rules-local.md](auto-instalar-rules-local.md) — Projeto sem `rules-local/`: o Claude Code instala sozinho ao abrir a sessão (gancho global SessionStart)
38. [id-tarefa-sufixo.md](id-tarefa-sufixo.md) — ID da tarefa-mãe nova termina em `-BANCO-DADOS` (criada no banco) ou `-TAREFA-LOCAL` (criada sem acesso ao banco) (C78)

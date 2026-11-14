# VERSAO — regras globais do rules-ai

<!-- gerado por scripts/sincronizar.mjs; não editar -->

- **Versão:** 2026-11-14-7f3244e1
- **Algoritmo:** sha256 do texto (sem BOM, fim de linha LF); 16 caracteres por arquivo, 8 na versão
- **Fonte:** https://github.com/Gelvazio/rules-ai/tree/main/regras

## Regras

| # | Arquivo | Código |
|---|---------|--------|
| 0 | INDEX.md | d5f56c21149ff49d |
| 1 | sincronizar-regras-banco.md | 7835f92694458f9c |
| 2 | regra-maior.md | 94019a86309467c1 |
| 3 | opus-so-sob-pedido.md | cfa13693bba06285 |
| 4 | commit-por-subtarefa.md | 15d2b2fcff474990 |
| 5 | limite-de-tokens.md | 7ace436eb6cbd47a |
| 6 | estimativa-de-tokens.md | 26ae38f5b0c78f35 |
| 7 | inicio-de-conversa.md | c77602e643cfaf55 |
| 8 | propagacao-regras-globais.md | bc8a381f0a821689 |
| 9 | ciclo-da-task.md | f53a169e323ca670 |
| 10 | niveis-e-modelos.md | e4ac99d033c9789c |
| 11 | frentes-e-reserva.md | 4efdf3cbb3a5d336 |
| 12 | comando-ponto.md | 40d1d72d72aa4e49 |
| 13 | comando-interrogacao.md | 518bacdb7810b51e |
| 14 | quadro-de-tarefas.md | d233779e7acb1056 |
| 15 | exibicao-de-status.md | c2d59a32c573e8eb |
| 16 | git-geral.md | dc523d20e055d96a |
| 17 | testes-validacao.md | eebac2ac3750680f |
| 18 | codigo-limites-nomes.md | c7ea862619071fc4 |
| 19 | codigo-solid.md | 00c1da3c4fd95047 |
| 20 | espec.md | cacb3d38a2b93c38 |
| 21 | esforco.md | 722ceaab9aad5ebb |
| 22 | graphify.md | 02c9922dd1605f9b |
| 23 | gerenciador-centralizado.md | 4ae8d20dc2e65c50 |
| 24 | rules-local.md | 4e38d7c029c00eff |
| 25 | herdr.md | d2bc0a850d56e2d7 |
| 26 | jev.md | 6576d1a7ebb2498b |
| 27 | visualizador-gerado.md | d47b43fc321bca98 |
| 28 | memoria-ai.md | db9c4e9db3c7ae0c |
| 29 | mcp-quadro.md | 752cf4500449658a |
| 30 | vercel-sem-deploy-de-controle.md | 5f5d36c3ec9e1ec5 |
| 31 | mods-claude-code.md | e4596aa1528a8912 |
| 32 | lider-coordenador.md | a58900f95d19b56b |
| 33 | atividades-e-idioma.md | 803790606d43fc11 |
| 34 | css-checkbox-on-off.md | 9fc83d23651519a6 |
| 35 | sem-backup.md | 150bb566b562686b |
| 36 | quadro-sem-banco.md | 293773acc8ee69a1 |
| 37 | auto-instalar-rules-local.md | 53dc026eaa68355d |
| 38 | id-tarefa-sufixo.md | 986448dcded2e324 |

## Pacote do rules-local (scripts e Jev)

- **Código do pacote:** cafe674d

| # | Arquivo | Código |
|---|---------|--------|
| 0 | baixar.mjs | 5a76a1fe888fb8d2 |
| 1 | comparar.mjs | c8236d3502c0ca3b |
| 2 | conferir.mjs | c82d6e4cb69dbc16 |
| 3 | pacote.mjs | 792f53e47f7c2cbd |
| 4 | proxy.mjs | a027d2b70b57a904 |
| 5 | sessao.mjs | cf1f459878707cb9 |
| 6 | jev/cliente.mjs | 6b7824f10440578f |
| 7 | jev/config.mjs | 40c6d99b6227f964 |
| 8 | jev/decidir.mjs | 0548abe0d9805f84 |
| 9 | jev/estado.mjs | f8085b742d5f2927 |
| 10 | jev/ganchos/claude-prompt.mjs | da652d43e1845614 |
| 11 | jev/ganchos/codex-prompt.mjs | cbff42b994d5e2f8 |
| 12 | jev/guardrails/aprovacao.mjs | 960ae110bf3a2f90 |
| 13 | jev/guardrails/comando-destrutivo.mjs | 018623bfa88a7f4d |
| 14 | jev/guardrails/mensagem.mjs | 86fdc067fbb31a90 |
| 15 | jev/guardrails/pasta-proibida.mjs | 5c5d012a60bad0fc |
| 16 | jev/guardrails/redigir.mjs | 005fddf625c0dab1 |
| 17 | jev/guardrails/segredo.mjs | d291c3adabce7a2d |
| 18 | jev/guardrails/seguranca-base.mjs | ef421009a2771efb |
| 19 | jev/mensagem/auditoria.mjs | a87e325f5d6dfa3d |
| 20 | jev/mensagem/classificar.mjs | da0ac005ded640c5 |
| 21 | jev/mensagem/contexto.mjs | faf0c454cedf7705 |
| 22 | jev/mensagem/decisao.mjs | 1b8dae8f13be44c1 |
| 23 | jev/mensagem/estado.mjs | f5070a197804860d |
| 24 | jev/mensagem/limite.mjs | 43777eeb103ac62b |
| 25 | jev/mensagem/perguntas.mjs | b4076242fdb3536e |
| 26 | jev/mensagem/repetida.mjs | 474b24f73b753f48 |
| 27 | jev/modelos.mjs | 699ccc94ca08c347 |
| 28 | jev/perguntas.mjs | 5d7b5f7d2b1903ab |
| 29 | jev/proxy.mjs | a027d2b70b57a904 |
| 30 | jev/quadro-formato.mjs | 7ae4298bf789c584 |

<!-- regra-id: global:sincronizar-regras-banco · versao: 2026-11-04 09:59 · origem: geo · base: eb55bfc2dce5 -->
# 🔃 Sincronizar as regras com o banco — 1ª ação de todo pedido (C76)

Decidida em 2026-11-04 (pedido do usuário: "a primeira ação antes de qualquer pedido é rodar esta
sincronização, antes mesmo de ler as regras"). Vale para **todas as IAs, todos os modelos e todos
os projetos**.

## A regra

- ✅ **Antes de qualquer pedido do usuário** (e antes de ler as regras para atendê-lo), a IA roda:

  ```bash
  python C:/fontes/aulasenai/scripts/quadro/migrar-regras.py
  ```

- ✅ **Primeiro só o índice:** o script compara a tabela pequena `regras_indice` (o `INDEX.md` do
  `rules-ai` e o do `aulasenai`, mais uma assinatura com o sha256 de todas as regras) com o disco.
  Igual → para ali, sem sincronizar nada (pedido do usuário, 2026-11-04). Diferente → sincroniza.
- ✅ Quando sincroniza, é nos **dois sentidos** com a tabela `regras` do Supabase, e no fim
  regrava a `regras_indice`:
  - **disco → banco:** envia o que mudou nos `.md` de regra (compara pelo sha256);
  - **banco → disco:** cria o `.md` da regra que só existe no banco (nunca sobrescreve arquivo
    local; só grava dentro de `C:/fontes`).
- ✅ Depois, se precisar conferir, `python C:/fontes/aulasenai/scripts/quadro/validar-regras.py`
  (esperado: todas íntegras).
- ✅ Só então a IA lê as regras e atende o pedido. Regra que chegou do banco entra na leitura.

## Quando não dá

- **Nuvem ou máquina sem `C:/fontes`:** pula e diz em 1 linha "sem sincronização de regras
  (sem `C:/fontes`)".
- **Sem rede ou Supabase fora do ar:** segue com as regras locais e diz isso em 1 linha.
- O script nunca bloqueia o pedido.

## Versão e conflito (2026-11-04, pedido do usuário)

- ✅ Toda regra tem na 1ª linha o selo
  `<!-- regra-id: COD · versao: AAAA-MM-DD HH:MM · origem: <máquina> · base: <sha> -->`. A cada
  mudança enviada, a versão troca (data, hora e máquina). Não editar o selo à mão.
- ✅ A sincronização decide regra a regra, em 3 vias (disco, banco e a `base` da última
  sincronização, cujo texto fica na tabela `regras_historico`):
  - só o disco mudou → envia; só o banco mudou → traz para o disco;
  - os dois mudaram → junta sozinha com `git merge-file`;
  - não deu para juntar (a mesma linha mudou dos dois lados) → **CONFLITO**: nada é alterado, o
    gancho avisa a cada mensagem e a IA **pede ajuda ao usuário**, mostrando o arquivo do disco e a
    cópia da versão do banco (em `%TEMP%\conflito-regras\`). Resolvido o texto no disco, a próxima
    sincronização segue.

## Cuidados

- Apagar uma regra exige apagar **também** a linha dela na tabela `regras`; senão a sincronização
  a traz de volta para o disco.
- Os arquivos que o script mudar (regra trazida do banco, selo `regra-id` gravado) entram no
  commit da tarefa (C59).

## Como conferir

```
☐ Rodei o migrar-regras.py antes de ler as regras e de atender o pedido?
☐ Se não deu (nuvem, sem rede), avisei em 1 linha?
☐ Regra trazida do banco entrou no commit da tarefa?
```

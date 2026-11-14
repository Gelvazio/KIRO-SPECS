// Download com tempo-limite das regras do rules-ai. Nunca lança exceção: qualquer falha vira
// `{ ok: false, motivo }`. Só módulos `node:`/globais (Node 18+).
// O repositório rules-ai é privado (RULES-LOCAL-BANCO.4): o raw público responde 404. A fonte é
// escolhida UMA vez, ao baixar a VERSAO.md, e reaproveitada nos outros arquivos (sem misturar
// fontes), nesta ordem: 1) pasta local do rules-ai (`git show origin/main:<arquivo>`, no PC);
// 2) tabela `rules_local_arquivos` do Supabase com a chave anon (nuvem); 3) raw público.
// `RULES_LOCAL_URL_BASE` (teste) força o raw nessa URL.
import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

export const URL_RAW_BASE = 'https://raw.githubusercontent.com/Gelvazio/rules-ai/main';
export const TEMPO_LIMITE_MS = 5000;

const CAMINHO_VERSAO = 'VERSAO.md';
const PASTA_REGRAS = 'regras';
const PASTA_LOCAL_PADRAO = 'C:/fontes/rules-ai';
const REFERENCIA_LOCAL = 'origin/main';
const TABELA_BANCO = 'rules_local_arquivos';
const TAMANHO_MAXIMO_ARQUIVO = 10 * 1024 * 1024;
const MOTIVO_TEMPO_ESGOTADO = 'tempo esgotado';
const NOMES_ERRO_TEMPO = ['TimeoutError', 'AbortError'];

/**
 * Converte um erro de rede no motivo padronizado.
 * @param {unknown} erro Erro capturado no download.
 * @returns {string} 'tempo esgotado' ou 'erro de rede: <mensagem>'.
 */
function motivoDoErro(erro) {
  if (NOMES_ERRO_TEMPO.includes(erro?.name)) return MOTIVO_TEMPO_ESGOTADO;
  return `erro de rede: ${erro?.message ?? String(erro)}`;
}

/**
 * Baixa um arquivo do raw (ou da URL de teste) com tempo-limite.
 * @param {string} caminho Caminho dentro do repositório.
 * @param {{urlBase?: string, tempoLimiteMs?: number, buscar?: Function}} opcoes Opções.
 * @returns {Promise<{ok: true, texto: string} | {ok: false, motivo: string}>}
 */
async function lerDoRaw(caminho, opcoes) {
  const { urlBase = URL_RAW_BASE, tempoLimiteMs = TEMPO_LIMITE_MS, buscar = fetch } = opcoes;
  try {
    const resposta = await buscar(`${urlBase}/${caminho}`, {
      signal: AbortSignal.timeout(tempoLimiteMs),
    });
    if (!resposta.ok) return { ok: false, motivo: `HTTP ${resposta.status}` };
    return { ok: true, texto: await resposta.text() };
  } catch (erro) {
    return { ok: false, motivo: motivoDoErro(erro) };
  }
}

/**
 * Lê um arquivo do `origin/main` da pasta local do rules-ai.
 * @param {string} caminho Caminho dentro do repositório.
 * @param {{pastaLocal?: string, tempoLimiteMs?: number}} opcoes Opções.
 * @returns {Promise<{ok: true, texto: string} | {ok: false, motivo: string}>}
 */
function lerDaPastaLocal(caminho, opcoes) {
  const pasta = opcoes.pastaLocal ?? process.env.RULES_LOCAL_PASTA_FONTE ?? PASTA_LOCAL_PADRAO;
  if (!existsSync(join(pasta, '.git'))) return Promise.resolve({ ok: false, motivo: 'sem pasta' });
  const argumentos = ['-C', pasta, 'show', `${REFERENCIA_LOCAL}:${caminho}`];
  const configuracao = {
    encoding: 'utf8', timeout: opcoes.tempoLimiteMs ?? TEMPO_LIMITE_MS,
    maxBuffer: TAMANHO_MAXIMO_ARQUIVO, windowsHide: true,
  };
  return new Promise((resolver) => {
    execFile('git', argumentos, configuracao, (erro, saida) => {
      if (erro) resolver({ ok: false, motivo: `git show falhou em ${caminho}` });
      else resolver({ ok: true, texto: saida });
    });
  });
}

/**
 * Lê um arquivo da tabela `rules_local_arquivos` com a chave anon.
 * @param {string} caminho Caminho dentro do repositório.
 * @param {{tempoLimiteMs?: number, buscar?: Function}} opcoes Opções.
 * @returns {Promise<{ok: true, texto: string} | {ok: false, motivo: string}>}
 */
async function lerDoBanco(caminho, opcoes) {
  const url = String(process.env.SUPABASE_URL ?? '').trim().replace(/\/+$/, '');
  const chave = String(process.env.SUPABASE_ANON_KEY ?? '').trim();
  if (!url || !chave) return { ok: false, motivo: 'sem SUPABASE_URL/SUPABASE_ANON_KEY' };
  const { tempoLimiteMs = TEMPO_LIMITE_MS, buscar = fetch } = opcoes;
  const consulta = `select=conteudo&caminho=eq.${encodeURIComponent(caminho)}`;
  try {
    const resposta = await buscar(`${url}/rest/v1/${TABELA_BANCO}?${consulta}`, {
      headers: { apikey: chave, Authorization: `Bearer ${chave}` },
      signal: AbortSignal.timeout(tempoLimiteMs),
    });
    if (!resposta.ok) return { ok: false, motivo: `HTTP ${resposta.status}` };
    const linhas = await resposta.json();
    if (!Array.isArray(linhas) || linhas.length === 0) {
      return { ok: false, motivo: `${caminho} ausente` };
    }
    return { ok: true, texto: linhas[0].conteudo };
  } catch (erro) {
    return { ok: false, motivo: motivoDoErro(erro) };
  }
}

/** Leitores por fonte, na ordem de tentativa. */
const LEITORES = { local: lerDaPastaLocal, banco: lerDoBanco, raw: lerDoRaw };
const ORDEM_FONTES = ['local', 'banco', 'raw'];

/**
 * Diz em que ordem tentar as fontes: só o raw quando a URL de teste está definida.
 * @param {{urlBase?: string}} opcoes Opções de download.
 * @returns {string[]} Nomes das fontes.
 */
function fontesATentar(opcoes) {
  const urlForcada = opcoes.urlBase && opcoes.urlBase !== URL_RAW_BASE;
  return urlForcada ? ['raw'] : ORDEM_FONTES;
}

/**
 * Baixa um arquivo de texto da fonte já escolhida (padrão: raw).
 * @param {string} caminhoRelativo Caminho dentro do repositório (ex.: 'VERSAO.md').
 * @param {{fonte?: string, urlBase?: string, tempoLimiteMs?: number, buscar?: Function}} [opcoes]
 * @returns {Promise<{ok: true, texto: string} | {ok: false, motivo: string}>}
 */
export async function baixarTexto(caminhoRelativo, opcoes = {}) {
  const leitor = LEITORES[opcoes.fonte] ?? lerDoRaw;
  return leitor(caminhoRelativo, opcoes);
}

/**
 * Baixa a `VERSAO.md` da primeira fonte que responder e grava a escolha em `opcoes.fonte`.
 * @param {object} [opcoes] Mesmas opções de `baixarTexto` (é alterado: ganha `fonte`).
 * @returns {Promise<{ok: true, texto: string, fonte: string} | {ok: false, motivo: string}>}
 */
export async function baixarVersao(opcoes = {}) {
  const falhas = [];
  for (const fonte of fontesATentar(opcoes)) {
    const resultado = await LEITORES[fonte](CAMINHO_VERSAO, opcoes);
    if (resultado.ok) {
      opcoes.fonte = fonte;
      return { ...resultado, fonte };
    }
    falhas.push(`${fonte}: ${resultado.motivo}`);
  }
  return { ok: false, motivo: falhas.join('; ') };
}

/**
 * Baixa as regras listadas, em paralelo; falha se qualquer uma falhar.
 * @param {string[]} arquivos Nomes de arquivo da tabela da `VERSAO.md`.
 * @param {object} [opcoes] Mesmas opções de `baixarTexto`.
 * @returns {Promise<{ok: true, textos: Map<string, string>}
 *   | {ok: false, motivo: string, arquivo: string}>}
 */
export async function baixarRegras(arquivos, opcoes = {}) {
  const resultados = await Promise.all(
    arquivos.map((arquivo) => baixarTexto(`${PASTA_REGRAS}/${arquivo}`, opcoes)),
  );

  const textos = new Map();
  for (const [indice, resultado] of resultados.entries()) {
    if (!resultado.ok) {
      return { ok: false, motivo: resultado.motivo, arquivo: arquivos[indice] };
    }
    textos.set(arquivos[indice], resultado.texto);
  }
  return { ok: true, textos };
}

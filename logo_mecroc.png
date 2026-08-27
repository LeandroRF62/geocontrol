/**
 * GeoControl – Camada de dados (Supabase)
 * 
 * Substitui o localStorage por chamadas ao Supabase.
 * O resto do app.js não precisa saber de SQL — usa só estas funções.
 */

// ── Configuração ─────────────────────────────────────────────
// Preencha com os valores do seu projeto Supabase:
//   Project Settings → API → Project URL e anon public key
const SUPABASE_URL = '__SUPABASE_URL__';
const SUPABASE_KEY = '__SUPABASE_ANON_KEY__';

const _sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ── Estado em memória (espelho dos dados) ────────────────────
// As variáveis globais do app.js continuam existindo.
// db.carregar() as preenche; db.salvar() empurra mudanças.

// ── CARREGAR todos os dados ───────────────────────────────────
async function dbCarregar() {
  const [
    { data: cls },
    { data: eqs },
    { data: pls },
    { data: lcs },
    { data: ins },
    { data: evs },
  ] = await Promise.all([
    _sb.from('clientes').select('*').order('nome'),
    _sb.from('equipamentos').select('*').order('serial'),
    _sb.from('planos').select('*').order('codigo_plano'),
    _sb.from('locais').select('*').order('nome'),
    _sb.from('instalacoes').select('*'),
    _sb.from('eventos').select('*').order('data_evento', { ascending: false }),
  ]);

  // Mapeia de volta para os nomes que o app usa
  clientes      = cls || [];
  equipCadastro = (eqs || []).map(e => ({ ...e }));
  planos        = pls || [];
  locais        = lcs || [];
  instalacoes   = ins || [];
  eventos       = evs || [];
}

// ── UPSERT genérico ──────────────────────────────────────────
async function dbUpsert(tabela, registro) {
  const { error } = await _sb.from(tabela).upsert(registro, { onConflict: 'id' });
  if (error) { showToast(`Erro ao salvar: ${error.message}`, 'error'); throw error; }
}

// ── DELETE genérico ──────────────────────────────────────────
async function dbDelete(tabela, id) {
  const { error } = await _sb.from(tabela).delete().eq('id', id);
  if (error) { showToast(`Erro ao excluir: ${error.message}`, 'error'); throw error; }
}

// ── DELETE por campo ─────────────────────────────────────────
async function dbDeleteWhere(tabela, campo, valor) {
  const { error } = await _sb.from(tabela).delete().eq(campo, valor);
  if (error) { showToast(`Erro ao excluir: ${error.message}`, 'error'); throw error; }
}

// ── Helpers por entidade ─────────────────────────────────────

// CLIENTES
const db = {
  async salvarCliente(dados) {
    await dbUpsert('clientes', dados);
  },
  async excluirCliente(id) {
    await dbDelete('clientes', id);
  },

  // EQUIPAMENTOS
  async salvarEquipamento(dados) {
    await dbUpsert('equipamentos', dados);
  },
  async excluirEquipamento(id) {
    await dbDelete('equipamentos', id);
  },

  // PLANOS
  async salvarPlano(dados) {
    await dbUpsert('planos', dados);
  },
  async excluirPlano(id) {
    await dbDelete('planos', id);
  },

  // LOCAIS
  async salvarLocal(dados) {
    await dbUpsert('locais', dados);
  },
  async excluirLocal(id) {
    // Exclui instalações e eventos vinculados em cascata
    const ids = instalacoes.filter(i => i.id_local === id).map(i => i.id);
    for (const iid of ids) {
      await dbDeleteWhere('eventos', 'id_instalacao', iid);
      await dbDelete('instalacoes', iid);
    }
    await dbDeleteWhere('eventos', 'id_local', id);
    await dbDelete('locais', id);
  },

  // INSTALAÇÕES
  async salvarInstalacao(dados) {
    await dbUpsert('instalacoes', dados);
  },
  async excluirInstalacao(id) {
    await dbDeleteWhere('eventos', 'id_instalacao', id);
    await dbDelete('instalacoes', id);
  },

  // EVENTOS
  async salvarEvento(dados) {
    await dbUpsert('eventos', dados);
  },

  // BATCH (para importarJSON)
  async importarTudo({ clientes: cls, equipCadastro: eqs, planos: pls, locais: lcs, instalacoes: ins, eventos: evs }) {
    // Apaga tudo antes de reimportar
    await _sb.from('eventos').delete().neq('id', 'noop');
    await _sb.from('instalacoes').delete().neq('id', 'noop');
    await _sb.from('locais').delete().neq('id', 'noop');
    await _sb.from('planos').delete().neq('id', 'noop');
    await _sb.from('equipamentos').delete().neq('id', 'noop');
    await _sb.from('clientes').delete().neq('id', 'noop');

    if (cls?.length)  await _sb.from('clientes').insert(cls);
    if (eqs?.length)  await _sb.from('equipamentos').insert(eqs.map(e => ({ id: e.id, serial: e.serial, tipo: e.tipo, modelo: e.modelo, observacoes: e.observacoes || '' })));
    if (pls?.length)  await _sb.from('planos').insert(pls);
    if (lcs?.length)  await _sb.from('locais').insert(lcs);
    if (ins?.length)  await _sb.from('instalacoes').insert(ins);
    if (evs?.length)  await _sb.from('eventos').insert(evs);
  },

  async limparTudo() {
    await _sb.from('eventos').delete().neq('id', 'noop');
    await _sb.from('instalacoes').delete().neq('id', 'noop');
    await _sb.from('locais').delete().neq('id', 'noop');
    await _sb.from('planos').delete().neq('id', 'noop');
    await _sb.from('equipamentos').delete().neq('id', 'noop');
    await _sb.from('clientes').delete().neq('id', 'noop');
  },
};

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

// Inicialização defensiva: falha com mensagem clara em vez de quebrar o app
let _sb = null;
let _dbErro = null;

(function initSupabase(){
  if (typeof supabase === 'undefined' || !supabase.createClient) {
    _dbErro = 'A biblioteca do Supabase não carregou. Verifique sua conexão com a internet.';
    console.error('[GeoControl]', _dbErro);
    return;
  }
  if (SUPABASE_URL.includes('__') || SUPABASE_KEY.includes('__')) {
    _dbErro = 'Credenciais do Supabase não foram configuradas. Verifique os Secrets do GitHub (SUPABASE_URL e SUPABASE_ANON_KEY) e rode o workflow novamente.';
    console.error('[GeoControl]', _dbErro);
    return;
  }
  try {
    _sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('[GeoControl] Supabase conectado:', SUPABASE_URL);
  } catch (e) {
    _dbErro = 'Erro ao inicializar o Supabase: ' + e.message;
    console.error('[GeoControl]', _dbErro);
  }
})();

function _checkDb(){
  if (_dbErro) throw new Error(_dbErro);
  if (!_sb) throw new Error('Supabase não inicializado.');
}

// ── AUTENTICAÇÃO ─────────────────────────────────────────────
// usuarioAtual guarda { id, email, nome, nivel } depois do login.
let usuarioAtual = null;

const auth = {
  async entrar(email, senha) {
    _checkDb();
    const { data, error } = await _sb.auth.signInWithPassword({ email, password: senha });
    if (error) throw error;
    await auth.carregarPerfil();
    return data.user;
  },

  async sair() {
    _checkDb();
    await _sb.auth.signOut();
    usuarioAtual = null;
  },

  // Busca o perfil (nome e nível) do usuário logado
  async carregarPerfil() {
    _checkDb();
    const { data: { user } } = await _sb.auth.getUser();
    if (!user) { usuarioAtual = null; return null; }

    const { data: perfil, error } = await _sb
      .from('perfis').select('*').eq('id', user.id).single();

    if (error) {
      // Sem perfil o app não sabe o que liberar; trata como visualizador.
      console.warn('[GeoControl] Perfil não encontrado, assumindo visualizador:', error.message);
      usuarioAtual = { id: user.id, email: user.email,
                       nome: user.email.split('@')[0], nivel: 'visualizador' };
    } else {
      usuarioAtual = { id: user.id, email: user.email,
                       nome: perfil.nome || user.email.split('@')[0],
                       nivel: perfil.nivel || 'visualizador' };
    }
    window.usuarioAtual = usuarioAtual;
    return usuarioAtual;
  },

  // Existe sessão salva? (mantém o login entre visitas)
  async sessaoAtiva() {
    _checkDb();
    const { data: { session } } = await _sb.auth.getSession();
    if (!session) return false;
    await auth.carregarPerfil();
    return true;
  },

  async redefinirSenha(email) {
    _checkDb();
    const { error } = await _sb.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + window.location.pathname
    });
    if (error) throw error;
  },

  // Helpers de permissão — a checagem real também está no banco (RLS)
  podeEditar()  { return ['admin','editor'].includes(usuarioAtual?.nivel); },
  podeExcluir() { return usuarioAtual?.nivel === 'admin'; },
  ehAdmin()     { return usuarioAtual?.nivel === 'admin'; },
};

// ── Estado em memória (espelho dos dados) ────────────────────
// As variáveis globais do app.js continuam existindo.
// db.carregar() as preenche; db.salvar() empurra mudanças.

// ── CARREGAR todos os dados ───────────────────────────────────
async function dbCarregar() {
  _checkDb();
  const res = await Promise.all([
    _sb.from('clientes').select('*').order('nome'),
    _sb.from('equipamentos').select('*').order('serial'),
    _sb.from('planos').select('*').order('codigo_plano'),
    _sb.from('locais').select('*').order('nome'),
    _sb.from('instalacoes').select('*'),
    _sb.from('eventos').select('*').order('data_evento', { ascending: false }),
  ]);

  // Se alguma consulta falhou, mostra o erro real (ex.: tabela não existe, RLS bloqueando)
  const falha = res.find(r => r.error);
  if (falha) throw new Error(falha.error.message);

  const [{ data: cls }, { data: eqs }, { data: pls },
         { data: lcs }, { data: ins }, { data: evs }] = res;

  // Mapeia de volta para os nomes que o app usa
  clientes      = cls || [];
  equipCadastro = (eqs || []).map(e => ({ ...e }));
  planos        = pls || [];
  locais        = lcs || [];
  instalacoes   = ins || [];
  eventos       = evs || [];
}

// Chaves estrangeiras: '' precisa virar null antes de ir ao Postgres.
// Vale para toda gravação, não só na importação — ex.: eventos de plano
// gravam id_local:'' e id_instalacao:''.
const _FKS = ['id_cliente', 'id_local', 'id_plano', 'id_instalacao'];
function _normalizarFks(registro) {
  const out = { ...registro };
  for (const fk of _FKS) {
    // Só mexe em chaves que o registro já possui — adicionar uma coluna
    // que a tabela não tem faz o Supabase recusar o INSERT.
    if (fk in out && out[fk] === '') out[fk] = null;
  }
  return out;
}

// ── UPSERT genérico ──────────────────────────────────────────
async function dbUpsert(tabela, registro) {
  _checkDb();
  const { error } = await _sb.from(tabela).upsert(_normalizarFks(registro), { onConflict: 'id' });
  if (error) { showToast(`Erro ao salvar: ${error.message}`, 'error'); throw error; }
}

// ── DELETE genérico ──────────────────────────────────────────
async function dbDelete(tabela, id) {
  _checkDb();
  const { error } = await _sb.from(tabela).delete().eq('id', id);
  if (error) { showToast(`Erro ao excluir: ${error.message}`, 'error'); throw error; }
}

// ── DELETE por campo ─────────────────────────────────────────
async function dbDeleteWhere(tabela, campo, valor) {
  _checkDb();
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
    _checkDb();

    // O app usa '' para "sem vínculo", mas no Postgres uma chave estrangeira
    // só aceita null. Reaproveita o normalizador global, que mexe apenas
    // nas chaves presentes no registro.
    const limpar = (registros) => (registros || []).map(_normalizarFks);

    // Apaga tudo antes de reimportar
    await _sb.from('eventos').delete().neq('id', 'noop');
    await _sb.from('instalacoes').delete().neq('id', 'noop');
    await _sb.from('locais').delete().neq('id', 'noop');
    await _sb.from('planos').delete().neq('id', 'noop');
    await _sb.from('equipamentos').delete().neq('id', 'noop');
    await _sb.from('clientes').delete().neq('id', 'noop');

    // Insere em ordem de dependência e reporta erro por tabela.
    // Sem isto, um erro (ex.: coluna inexistente) passaria despercebido
    // e a tabela ficaria vazia sem nenhum aviso.
    const passos = [
      ['clientes',     limpar(cls)],
      ['equipamentos', limpar(eqs).map(e => ({ id: e.id, serial: e.serial, tipo: e.tipo, modelo: e.modelo, observacoes: e.observacoes || '' }))],
      ['planos',       limpar(pls)],
      ['locais',       limpar(lcs)],
      ['instalacoes',  limpar(ins)],
      ['eventos',      limpar(evs)],
    ];

    for (const [tabela, registros] of passos) {
      if (!registros?.length) continue;
      const { error } = await _sb.from(tabela).insert(registros);
      if (error) {
        throw new Error(`Falha ao importar "${tabela}" (${registros.length} registros): ${error.message}`);
      }
      console.log(`[GeoControl] ${tabela}: ${registros.length} registros importados`);
    }
  },

  async limparTudo() {
    _checkDb();
    await _sb.from('eventos').delete().neq('id', 'noop');
    await _sb.from('instalacoes').delete().neq('id', 'noop');
    await _sb.from('locais').delete().neq('id', 'noop');
    await _sb.from('planos').delete().neq('id', 'noop');
    await _sb.from('equipamentos').delete().neq('id', 'noop');
    await _sb.from('clientes').delete().neq('id', 'noop');
  },
};

// ── Exporta explicitamente no escopo global ──────────────────
// `const` no topo de um script não vira propriedade de window,
// então declaramos aqui para garantir que app.js enxergue tudo.
window.db           = db;
window.auth         = auth;
window.dbCarregar   = dbCarregar;
window.dbUpsert     = dbUpsert;
window.dbDelete     = dbDelete;
window.usuarioAtual = usuarioAtual;

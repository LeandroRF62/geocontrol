/**
 * GeoControl – Seed Script
 * 
 * Importa um arquivo JSON exportado do GeoControl para o Supabase.
 * 
 * Uso:
 *   node supabase/seed.js geocontrol_2026-05-01.json
 * 
 * Antes de rodar:
 *   npm install @supabase/supabase-js
 *   Preencha SUPABASE_URL e SUPABASE_KEY abaixo.
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

// ── Configure aqui ────────────────────────────────────────────
const SUPABASE_URL = 'https://SEU_PROJECT_ID.supabase.co';
const SUPABASE_KEY = 'SUA_ANON_KEY'; // ou service_role key para seed
// ─────────────────────────────────────────────────────────────

const arquivo = process.argv[2];
if (!arquivo) {
  console.error('Uso: node supabase/seed.js <arquivo.json>');
  process.exit(1);
}

const dados = JSON.parse(readFileSync(arquivo, 'utf8'));
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

async function upsert(tabela, registros) {
  if (!registros?.length) return;
  const { error } = await sb.from(tabela).upsert(registros, { onConflict: 'id' });
  if (error) throw new Error(`Erro em ${tabela}: ${error.message}`);
  console.log(`✅ ${tabela}: ${registros.length} registros inseridos`);
}

async function main() {
  console.log('🚀 Iniciando importação...\n');

  // Mapeia equipCadastro → equipamentos
  const equip = (dados.equipCadastro || []).map(e => ({
    id: e.id, serial: e.serial, tipo: e.tipo,
    modelo: e.modelo, observacoes: e.observacoes || ''
  }));

  await upsert('clientes',     dados.clientes     || []);
  await upsert('equipamentos', equip);
  await upsert('planos',       dados.planos        || []);
  await upsert('locais',       dados.locais        || []);
  await upsert('instalacoes',  dados.instalacoes   || []);
  await upsert('eventos',      dados.eventos       || []);

  console.log('\n🎉 Importação concluída!');
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });

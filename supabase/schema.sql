-- ============================================================
--  GeoControl – Schema Supabase
--  Execute este arquivo no SQL Editor do Supabase
-- ============================================================

-- Habilita UUID
create extension if not exists "pgcrypto";

-- ── CLIENTES ─────────────────────────────────────────────────
create table if not exists clientes (
  id          text primary key default gen_random_uuid()::text,
  nome        text not null,
  contato     text,
  email       text,
  telefone    text,
  ativo       boolean default true,
  observacoes text,
  created_at  timestamptz default now()
);

-- ── EQUIPAMENTOS (catálogo) ───────────────────────────────────
create table if not exists equipamentos (
  id          text primary key default gen_random_uuid()::text,
  serial      text not null unique,
  tipo        text,
  modelo      text,
  observacoes text,
  created_at  timestamptz default now()
);

-- ── PLANOS EWS ───────────────────────────────────────────────
create table if not exists planos (
  id                  text primary key default gen_random_uuid()::text,
  codigo_plano        text not null,
  tipo_plano          text,
  custo_mensal        numeric(10,2) default 0,
  status              text default 'inativo',
  serial_atual        text,
  data_ativacao       date,
  data_vencimento_ews date,
  valor_anuidade_ews  numeric(10,2) default 0,
  observacoes         text,
  created_at          timestamptz default now()
);

-- ── LOCAIS ───────────────────────────────────────────────────
create table if not exists locais (
  id          text primary key default gen_random_uuid()::text,
  nome        text not null,
  id_cliente  text references clientes(id),
  localizacao text,
  geotecnico  text,
  observacoes text,
  created_at  timestamptz default now()
);

-- ── INSTALAÇÕES ──────────────────────────────────────────────
create table if not exists instalacoes (
  id               text primary key default gen_random_uuid()::text,
  id_local         text references locais(id),
  serial           text,
  id_plano         text references planos(id),
  status           text default 'ativo',
  valor_anuidade   numeric(10,2) default 0,
  data_instalacao  date,
  data_inicio      date,
  data_vencimento  date,
  data_cobranca    date,
  observacoes      text,
  created_at       timestamptz default now()
);

-- ── EVENTOS ──────────────────────────────────────────────────
create table if not exists eventos (
  id              text primary key default gen_random_uuid()::text,
  id_local        text references locais(id),
  id_instalacao   text references instalacoes(id),
  tipo_evento     text,
  descricao       text,
  serial          text,
  serial_anterior text,
  serial_novo     text,
  data_evento     date,
  responsavel     text,
  created_at      timestamptz default now()
);

-- ── ROW LEVEL SECURITY (RLS) ─────────────────────────────────
-- Deixa tudo público por enquanto (sem autenticação).
-- Para adicionar auth depois, troque por políticas de usuário.
alter table clientes    enable row level security;
alter table equipamentos enable row level security;
alter table planos      enable row level security;
alter table locais      enable row level security;
alter table instalacoes enable row level security;
alter table eventos     enable row level security;

create policy "public_all" on clientes    for all using (true) with check (true);
create policy "public_all" on equipamentos for all using (true) with check (true);
create policy "public_all" on planos      for all using (true) with check (true);
create policy "public_all" on locais      for all using (true) with check (true);
create policy "public_all" on instalacoes for all using (true) with check (true);
create policy "public_all" on eventos     for all using (true) with check (true);

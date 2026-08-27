/* ============================================================
   GeoControl – CSS Principal v2.0
============================================================ */
:root {
  --sidebar-w: 240px;
  --topbar-h: 60px;
  --color-primary: #2563eb;
  --color-primary-dark: #1d4ed8;
  --color-secondary: #64748b;
  --color-success: #16a34a;
  --color-danger: #dc2626;
  --color-warning: #d97706;
  --color-info: #0891b2;
  --color-purple: #7c3aed;
  --color-teal: #0f766e;
  --bg-sidebar: #0f172a;
  --bg-topbar: #ffffff;
  --bg-page: #f1f5f9;
  --bg-card: #ffffff;
  --text-main: #1e293b;
  --text-muted: #64748b;
  --text-light: #94a3b8;
  --border-color: #e2e8f0;
  --radius: 10px;
  --shadow: 0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.06);
  --shadow-md: 0 4px 6px rgba(0,0,0,.07), 0 2px 4px rgba(0,0,0,.06);
  --shadow-lg: 0 10px 15px rgba(0,0,0,.1), 0 4px 6px rgba(0,0,0,.05);
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: 'Inter', sans-serif; background: var(--bg-page); color: var(--text-main); min-height: 100vh; overflow-x: hidden; }

/* ===== SIDEBAR ===== */
.sidebar { position: fixed; top: 0; left: 0; width: var(--sidebar-w); height: 100vh; background: var(--bg-sidebar); display: flex; flex-direction: column; z-index: 100; transition: transform .3s ease; }
.sidebar-brand { display: flex; align-items: center; justify-content: center; padding: 0 16px; height: var(--topbar-h); border-bottom: 1px solid rgba(255,255,255,.06); }
.sidebar-nav { flex: 1; padding: 16px 10px; display: flex; flex-direction: column; gap: 4px; overflow-y: auto; }
.nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 8px; color: #94a3b8; text-decoration: none; font-size: 14px; font-weight: 500; transition: all .2s; }
.nav-item:hover { background: rgba(255,255,255,.07); color: #fff; }
.nav-item.active { background: var(--color-primary); color: #fff; }
.nav-item i { width: 18px; text-align: center; }
.sidebar-footer { padding: 14px 20px; border-top: 1px solid rgba(255,255,255,.06); color: #475569; font-size: 12px; }

/* ===== TOPBAR ===== */
.topbar { position: fixed; top: 0; left: var(--sidebar-w); right: 0; height: var(--topbar-h); background: var(--bg-topbar); border-bottom: 1px solid var(--border-color); display: flex; align-items: center; padding: 0 24px; gap: 16px; z-index: 90; box-shadow: var(--shadow); }
.sidebar-toggle-btn { display: none; background: none; border: none; font-size: 18px; color: var(--text-muted); cursor: pointer; padding: 6px; border-radius: 6px; }
.sidebar-toggle-btn:hover { background: var(--bg-page); }
.topbar-title { font-size: 26px; font-weight: 600; color: var(--text-main); flex: 1; }
.topbar-date { font-size: 13px; color: var(--text-muted); }
.topbar-actions { display: flex; align-items: center; gap: 8px; }
@media (max-width: 600px) { .topbar-btn-label { display: none; } }

/* ===== MAIN ===== */
.main-content { margin-left: var(--sidebar-w); padding-top: var(--topbar-h); min-height: 100vh; }
.page { display: none; padding: 28px 28px 40px; }
.page.active { display: block; }
.page-header { margin-bottom: 24px; }
.page-header h1 { font-size: 22px; font-weight: 700; }
.page-header p { font-size: 14px; color: var(--text-muted); margin-top: 4px; }

/* ===== KPI ===== */
.kpi-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 16px; margin-bottom: 24px; }
.kpi-card { background: var(--bg-card); border-radius: var(--radius); padding: 20px; display: flex; align-items: center; gap: 16px; box-shadow: var(--shadow); border-left: 4px solid transparent; transition: transform .2s, box-shadow .2s; }
.kpi-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.kpi-blue  { border-color: var(--color-primary); }
.kpi-green { border-color: var(--color-success); }
.kpi-red   { border-color: var(--color-danger); }
.kpi-yellow{ border-color: var(--color-warning); }
.kpi-danger{ border-color: #9f1239; }
.kpi-orange{ border-color: #c2410c; }
.kpi-purple{ border-color: var(--color-purple); }

.kpi-clickable { cursor: pointer; }
.kpi-clickable:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); filter: brightness(0.97); }
.kpi-teal  { border-color: var(--color-teal); }
.kpi-icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
.kpi-blue .kpi-icon   { background: #eff6ff; color: var(--color-primary); }
.kpi-green .kpi-icon  { background: #f0fdf4; color: var(--color-success); }
.kpi-red .kpi-icon    { background: #fef2f2; color: var(--color-danger); }
.kpi-yellow .kpi-icon { background: #fffbeb; color: var(--color-warning); }
.kpi-danger .kpi-icon { background: #fff1f2; color: #9f1239; }
.kpi-orange .kpi-icon { background: #fff7ed; color: #c2410c; }
.kpi-purple .kpi-icon { background: #f5f3ff; color: var(--color-purple); }
.kpi-teal .kpi-icon   { background: #f0fdfa; color: var(--color-teal); }
.kpi-value { font-size: 26px; font-weight: 700; line-height: 1.1; }
.kpi-label { font-size: 12px; color: var(--text-muted); margin-top: 2px; }

/* ===== DASHBOARD ===== */
.dashboard-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.card { background: var(--bg-card); border-radius: var(--radius); box-shadow: var(--shadow); overflow: hidden; }
.card-full { grid-column: 1 / -1; }
.card-header { padding: 16px 20px; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between; }
.card-header h3 { font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
.card-header h3 i { color: var(--color-primary); }
.card-body { padding: 16px 20px; }

/* ===== TOOLBAR ===== */
.toolbar { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
.search-input { flex: 1; min-width: 200px; max-width: 400px; padding: 9px 14px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 14px; background: #fff; transition: border-color .2s, box-shadow .2s; }
.search-input:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(37,99,235,.1); }
.filter-select { padding: 9px 14px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 14px; background: #fff; cursor: pointer; }
.filter-select:focus { outline: none; border-color: var(--color-primary); }

/* ===== BUTTONS ===== */
.btn { display: inline-flex; align-items: center; gap: 7px; padding: 9px 18px; border-radius: 8px; border: none; font-size: 14px; font-weight: 500; cursor: pointer; transition: all .2s; white-space: nowrap; }
.btn-primary   { background: var(--color-primary); color: #fff; }
.btn-primary:hover { background: var(--color-primary-dark); }
.btn-secondary { background: var(--border-color); color: var(--text-main); }
.btn-secondary:hover { background: #cbd5e1; }
.btn-success   { background: var(--color-success); color: #fff; }
.btn-success:hover { background: #15803d; }
.btn-danger    { background: var(--color-danger); color: #fff; }
.btn-warning   { background: var(--color-warning); color: #fff; }
.btn-info      { background: var(--color-info); color: #fff; }
.btn-sm { padding: 5px 12px; font-size: 12px; }
.btn-icon { padding: 7px 9px; }

/* ===== TABLES ===== */
.table-responsive { overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
.data-table th { padding: 10px 14px; text-align: left; font-weight: 600; color: var(--text-muted); font-size: 12px; text-transform: uppercase; letter-spacing: .4px; background: #f8fafc; border-bottom: 1px solid var(--border-color); white-space: nowrap; }
.data-table td { padding: 11px 14px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
.data-table tr:last-child td { border-bottom: none; }

/* ===== ACCORDION – LOCAIS ===== */
.local-row { cursor: pointer; transition: background .15s; }
.local-row:hover td { background: #f0f7ff; }
.local-row.expanded td { background: #eff6ff; border-bottom: none; }

.local-chevron { color: var(--text-muted); font-size: 11px; transition: transform .2s; display: inline-block; }
.local-chevron.rotated { transform: rotate(90deg); }

.inst-header-row td { background: #f8fafc; padding: 6px 14px; }
.inst-header-row small { font-size: 11px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: .04em; }

.inst-row td { background: #fafbff; padding: 10px 14px; border-bottom: 1px solid #eef2fb; }
.inst-row:last-child td { border-bottom: 2px solid var(--border-color); }

/* ===== BADGES ===== */
.badge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 20px; font-size: 11.5px; font-weight: 600; white-space: nowrap; }
.badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; }
.badge-ativo     { background: #f0fdf4; color: var(--color-success); }
.badge-ativo::before { background: var(--color-success); }
.badge-offline   { background: #fef2f2; color: var(--color-danger); }
.badge-offline::before { background: var(--color-danger); }
.badge-suspenso  { background: #fffbeb; color: var(--color-warning); }
.badge-suspenso::before { background: var(--color-warning); }
.badge-inativo   { background: #f1f5f9; color: var(--text-muted); }
.badge-inativo::before { background: var(--text-muted); }
.badge-disponível { background: #eff6ff; color: var(--color-primary); }
.badge-disponível::before { background: var(--color-primary); }
.badge-instalado { background: #f0fdf4; color: var(--color-teal); }
.badge-instalado::before { background: var(--color-teal); }
.badge-em_testes { background: #f0f9ff; color: var(--color-info); }
.badge-em_testes::before { background: var(--color-info); }
.badge-em_manutencao { background: #fef9c3; color: #92400e; }
.badge-em_manutencao::before { background: #92400e; }
.badge-defeituoso { background: #fef2f2; color: var(--color-danger); }
.badge-defeituoso::before { background: var(--color-danger); }
.badge-descartado { background: #f1f5f9; color: #94a3b8; }
.badge-descartado::before { background: #94a3b8; }
.badge-cancelado  { background: #fef2f2; color: var(--color-danger); }
.badge-cancelado::before { background: var(--color-danger); }
.badge-cobranca       { background: #f0fdfa; color: var(--color-teal); }
.badge-cobranca::before { background: var(--color-teal); }
.badge-instalacao      { background: #eff6ff; color: var(--color-primary); }
.badge-suspensao       { background: #fffbeb; color: var(--color-warning); }
.badge-reativacao      { background: #f0fdf4; color: var(--color-success); }
.badge-troca_equipamento { background: #f5f3ff; color: var(--color-purple); }
.badge-renovacao       { background: #ecfdf5; color: var(--color-teal); }
.badge-cancelamento    { background: #fef2f2; color: var(--color-danger); }
.badge-observacao      { background: #f0f9ff; color: var(--color-info); }
.badge-ativacao_plano     { background: #f0fdf4; color: var(--color-success); }
.badge-suspensao_plano    { background: #fffbeb; color: var(--color-warning); }
.badge-reativacao_plano   { background: #f0fdf4; color: var(--color-teal); }
.badge-transferencia_plano{ background: #f5f3ff; color: var(--color-purple); }
.badge-renovacao_plano    { background: #ecfdf5; color: var(--color-teal); }

/* ===== ACTION BUTTONS ===== */
.action-btns { display: flex; gap: 5px; align-items: center; }

/* ===== PAGINATION ===== */
.pagination { display: flex; justify-content: center; gap: 6px; margin-top: 16px; }
.page-btn { padding: 6px 12px; border: 1px solid var(--border-color); border-radius: 6px; background: #fff; font-size: 13px; cursor: pointer; color: var(--text-main); transition: all .2s; }
.page-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }
.page-btn.active { background: var(--color-primary); border-color: var(--color-primary); color: #fff; }
.page-btn:disabled { opacity: .5; cursor: not-allowed; }

/* ===== MODALS ===== */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.5); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(2px); }
.modal-overlay.hidden { display: none; }
.modal { background: var(--bg-card); border-radius: 14px; width: 100%; max-width: 720px; max-height: 90vh; overflow-y: auto; box-shadow: var(--shadow-lg); animation: modalIn .2s ease; }
.modal-sm { max-width: 500px; }
@keyframes modalIn { from { opacity:0; transform:scale(.96) translateY(-10px); } to { opacity:1; transform:scale(1) translateY(0); } }
.modal-header { padding: 20px 24px; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between; }
.modal-header h2 { font-size: 16px; font-weight: 600; }
.modal-close { background: none; border: none; font-size: 18px; cursor: pointer; color: var(--text-muted); padding: 4px 7px; border-radius: 6px; transition: all .2s; }
.modal-close:hover { background: var(--bg-page); }
.modal-body { padding: 24px; }
.modal-footer { padding: 16px 24px; border-top: 1px solid var(--border-color); display: flex; justify-content: flex-end; gap: 10px; }

/* ===== FORMS ===== */
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
.form-group { display: flex; flex-direction: column; gap: 5px; }
.form-group.full { grid-column: 1 / -1; }
.form-group label { font-size: 13px; font-weight: 500; }
.form-group input, .form-group select, .form-group textarea { padding: 9px 13px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 14px; font-family: inherit; color: var(--text-main); background: #fff; transition: border-color .2s, box-shadow .2s; }
.form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(37,99,235,.1); }
.form-group input:disabled, .form-group select:disabled, .form-group textarea:disabled { background: #f8fafc; color: var(--text-muted); cursor: not-allowed; }
.form-group textarea { resize: vertical; min-height: 80px; }

/* ===== ALERTS ===== */
.alert { padding: 12px 16px; border-radius: 8px; font-size: 13.5px; display: flex; align-items: flex-start; gap: 10px; margin-bottom: 16px; line-height: 1.5; }
.alert i { margin-top: 1px; flex-shrink: 0; }
.alert-info    { background: #eff6ff; color: #1e40af; border-left: 3px solid var(--color-primary); }
.alert-success { background: #f0fdf4; color: #14532d; border-left: 3px solid var(--color-success); }
.alert-warning { background: #fffbeb; color: #78350f; border-left: 3px solid var(--color-warning); }
.alert-danger  { background: #fef2f2; color: #7f1d1d; border-left: 3px solid var(--color-danger); }

/* ===== EMPTY STATE ===== */
.empty-state { text-align: center; padding: 32px; color: var(--text-muted); font-size: 14px; }
.empty-state i { display: block; font-size: 32px; margin-bottom: 10px; opacity: .4; }

/* ===== TOAST ===== */
.toast { position: fixed; bottom: 28px; right: 28px; background: #1e293b; color: #fff; padding: 12px 20px; border-radius: 10px; font-size: 14px; box-shadow: var(--shadow-lg); z-index: 999; display: flex; align-items: center; gap: 10px; animation: toastIn .3s ease; max-width: 360px; }
.toast.hidden { display: none; }
.toast.success { background: var(--color-success); }
.toast.error   { background: var(--color-danger); }
.toast.warning { background: var(--color-warning); }
@keyframes toastIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }

/* ===== VENCIMENTO ===== */
.venc-critico { color: var(--color-danger); font-weight: 600; }
.venc-alerta  { color: var(--color-warning); font-weight: 600; }
.venc-ok      { color: var(--color-success); }

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) { .dashboard-grid { grid-template-columns: 1fr; } }
@media (max-width: 768px) {
  .sidebar { transform: translateX(-100%); }
  .sidebar.open { transform: translateX(0); }
  .sidebar-toggle-btn { display: flex; }
  .topbar { left: 0; }
  .main-content { margin-left: 0; }
  .kpi-grid { grid-template-columns: 1fr 1fr; }
  .page { padding: 16px; }
  .form-grid { grid-template-columns: 1fr; }
  .toolbar { flex-wrap: wrap; }
  .search-input { max-width: 100%; }
}
@media (max-width: 480px) { .kpi-grid { grid-template-columns: 1fr; } }

/* ===== SCROLLBAR ===== */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

canvas { max-height: 240px !important; }

/* ===== GANTT ===== */
.gantt-filter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}
.gantt-filter-grid select[multiple] {
  width: 100%;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 4px;
  font-size: 13px;
  font-family: inherit;
  color: var(--text-main);
  background: #fff;
}
.gantt-filter-grid select[multiple]:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(37,99,235,.1);
}
.gantt-filter-grid select[multiple] option {
  padding: 4px 8px;
  border-radius: 4px;
}
.gantt-filter-grid select[multiple] option:checked {
  background: var(--color-primary);
  color: #fff;
}
.gantt-legenda {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 12px 20px;
  background: var(--bg-card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  margin-bottom: 16px;
  font-size: 13px;
  align-items: center;
}
.gantt-legenda.hidden { display: none; }
.gantt-leg-item {
  display: flex;
  align-items: center;
  gap: 6px;
}
.gantt-leg-dot {
  width: 14px; height: 14px;
  border-radius: 50%;
  border: 1.5px solid rgba(0,0,0,.2);
  flex-shrink: 0;
}
#gantt-container {
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0;
  cursor: grab;
}
#gantt-container:active { cursor: grabbing; }
#gantt-container canvas {
  max-height: none !important;
  display: block;
}
/* Scrollbar estilizada no container do gantt */
#gantt-container::-webkit-scrollbar { height: 8px; }
#gantt-container::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 4px; }
#gantt-container::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 4px; }
#gantt-container::-webkit-scrollbar-thumb:hover { background: #64748b; }
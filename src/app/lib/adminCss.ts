// 본사·브랜드 관리 공용 스타일
export const AD_CSS = `
        .ad-head { display:flex; align-items:flex-end; justify-content:space-between; gap:12px; flex-wrap:wrap; margin-bottom:20px; }
        .ad-sub { font-size:13px; color:#767676; margin-bottom:4px; }
        .ad-h1 { font-size:24px; font-weight:700; margin:0; color:#111; }
        .ad-kpis { display:grid; grid-template-columns:repeat(auto-fit,minmax(170px,1fr)); gap:12px; margin-bottom:16px; }
        .ad-kpi { background:#fff; border:1px solid #e6e6e3; border-radius:6px; padding:16px 18px; }
        .ad-kl { font-size:13px; color:#767676; margin-bottom:8px; } .ad-kv { font-size:24px; font-weight:700; white-space:nowrap; } .ad-ks { font-size:12px; color:#767676; margin-top:4px; }
        .ad-card { background:#fff; border:1px solid #e6e6e3; border-radius:6px; overflow:hidden; margin-bottom:16px; }
        .ad-ch { padding:14px 20px; border-bottom:1px solid #eeeeec; display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap; font-size:14px; font-weight:700; }
        .ad-bar { display:flex; gap:8px; flex-wrap:wrap; align-items:center; padding:12px 20px; border-bottom:1px solid #eeeeec; }
        .ad-scroll { overflow-x:auto; }
        .ad-tbl { width:100%; border-collapse:collapse; font-size:14px; }
        .ad-tbl th { padding:10px 14px; text-align:left; font-size:13px; font-weight:600; color:#767676; background:#f9f9f7; border-bottom:1px solid #eeeeec; white-space:nowrap; }
        .ad-tbl td { padding:12px 14px; border-bottom:1px solid #f2f2f0; vertical-align:middle; white-space:nowrap; }
        .ad-tbl tr:last-child td { border-bottom:none; }
        .ad-tbl tbody tr.click { cursor:pointer; } .ad-tbl tbody tr.click:hover td { background:#f9f9f7; }
        .ad-r { text-align:right !important; } .ad-c { text-align:center !important; }
        .ad-mono { font-family:ui-monospace,monospace; font-size:13px; color:#555; }
        .ad-btn { padding:8px 16px; background:#fff; color:#111; border:1px solid #d6d6d2; border-radius:5px; font-size:13px; cursor:pointer; font-family:inherit; min-height:36px; }
        .ad-btn:hover { border-color:#111; } .ad-btn.p { background:#111; color:#fff; border-color:#111; } .ad-btn.d { color:#b3261e; } .ad-btn:disabled { opacity:.4; cursor:not-allowed; }
        .ad-btn.s { padding:5px 12px; min-height:30px; }
        .ad-chip { padding:6px 14px; border:1px solid #d6d6d2; border-radius:20px; background:#fff; font-size:13px; cursor:pointer; color:#555; font-family:inherit; }
        .ad-chip.on { background:#111; color:#fff; border-color:#111; font-weight:600; }
        .ad-inp { padding:8px 12px; border:1px solid #d6d6d2; border-radius:5px; font-size:14px; font-family:inherit; background:#fff; min-height:38px; color:#111; }
        .ad-inp:focus { outline:none; border-color:#111; }
        .ad-badge { display:inline-block; padding:3px 10px; border-radius:4px; font-size:12px; font-weight:600; background:#f4f4f2; color:#555; }
        .ad-badge.g { background:#eef4f0; color:#3D6A4F; } .ad-badge.r { background:#fbeeed; color:#b3261e; } .ad-badge.b { background:#111; color:#fff; } .ad-badge.n { background:#f4f4f2; color:#111; border:1px solid #d6d6d2; }
        .ad-empty { padding:56px 20px; text-align:center; color:#767676; font-size:14px; line-height:1.8; }
        .ad-note { background:#f4f4f2; border-radius:6px; padding:12px 16px; font-size:13px; color:#555; line-height:1.7; margin-bottom:16px; }
        .ad-mbg { position:fixed; inset:0; background:rgba(0,0,0,.45); z-index:1000; display:flex; align-items:center; justify-content:center; padding:16px; }
        .ad-modal { background:#fff; border-radius:8px; width:100%; max-width:560px; max-height:90vh; overflow-y:auto; }
        .ad-mh { padding:16px 20px; border-bottom:1px solid #eeeeec; display:flex; justify-content:space-between; align-items:center; font-size:16px; }
        .ad-x { width:36px; height:36px; font-size:16px; cursor:pointer; background:none; border:none; }
        .ad-mb { padding:20px; }
        .ad-dl { display:grid; grid-template-columns:100px 1fr; font-size:14px; margin:0 0 16px; }
        .ad-dl dt, .ad-dl dd { padding:9px 0; border-bottom:1px solid #f2f2f0; margin:0; } .ad-dl dt { color:#767676; }
        .ad-h3 { font-size:14px; font-weight:700; margin:18px 0 8px; }
        .ad-row { display:flex; gap:8px; flex-wrap:wrap; align-items:center; }
        .ad-hist { font-size:13px; color:#555; line-height:1.9; }
`

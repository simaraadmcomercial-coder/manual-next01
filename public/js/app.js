import { MODULES, LAYERS } from './data.js';
import { MAN } from './legacy.js';

const $ = (s, r = document) => r.querySelector(s);
const app = $('#app'), qi = $('#q');
const fmt = t => String(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const KEY = 'next01-manual-v2';
let done = {}; try { done = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(done)); } catch (e) {} };
let pendingQ = '', printing = false;

/* ---------- renderers ---------- */
const li = a => a.map(x => `<li>${fmt(x)}</li>`).join('');
function block(b) {
  let h = `<article class="block chunk"><div class="kicker">${b.kicker || ''}</div><h3>${b.title}</h3>`;
  if (b.flow) h += `<ol class="flow">${b.flow.map((x, i) => `<li class="${b.hi === i ? 'hi' : ''}"><span>${x}</span></li>`).join('')}</ol>`;
  if (b.chips) h += `<ul class="chips">${b.chips.map((x, i) => `<li class="${i ? '' : 'hi'}">${x}</li>`).join('')}</ul>`;
  if (b.lead) h += `<p class="lead">${b.lead}</p>`;
  if (b.callout) h += `<div class="callout">${b.callout.map(p => `<p>${p}</p>`).join('')}</div>`;
  if (b.details) h += `<dl class="details">${b.details.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>`;
  if (b.rules) h += `<ul class="rules">${li(b.rules)}</ul>`;
  if (b.cols) h += `<div class="cols">${b.cols.map(c => `<div><h4>${c.h}${c.badge ? `<span class="badge">${c.badge}</span>` : ''}</h4><ul class="rules">${li(c.items)}</ul></div>`).join('')}</div>`;
  if (b.quote) h += `<blockquote>${b.quote}</blockquote>`;
  return h + '</article>';
}
function guide(g, id) {
  const steps = g.steps.map((s, i) => {
    const k = `${id}s${i}`;
    return `<li class="${done[k] ? 'done' : ''}"><label><input type="checkbox" data-k="${k}" ${done[k] ? 'checked' : ''}><span class="n">${i + 1}</span><span class="st">${s.t}</span></label><ul>${li(s.s)}</ul></li>`;
  }).join('');
  const terms = g.terms ? `<dl class="terms">${g.terms.map(t => `<div><dt>${t[0]}</dt><dd>${t[1]}</dd></div>`).join('')}</dl>` : '';
  const tips = g.tips ? `<div class="tips"><b>Boa prática e pontos de atenção</b><ul>${li(g.tips)}</ul></div>` : '';
  return `<section class="guide chunk"><h4>${g.t}</h4>${g.obj ? `<p class="obj">${g.obj}</p>` : ''}${terms}<ol class="steps">${steps}</ol>${tips}<div class="shot">Espaço reservado para as telas deste passo a passo</div></section>`;
}
function feature(f) {
  const gs = (f.man || []).map(i => guide(MAN[i], `m${i}`)).join('');
  return `<details class="m chunk" ${printing ? 'open' : ''}><summary>${f.n} · ${f.t}</summary><div class="body">
    <div class="fgrid"><div class="fcard"><h4>O que faz</h4><p>${fmt(f.faz)}</p></div><div class="fcard"><h4>Por que existe</h4><p>${fmt(f.por)}</p></div></div>
    <div class="how"><h4>Como utilizar</h4><ol>${li(f.como)}</ol></div>
    ${f.con ? `<div class="conn"><h4>Conexão com outras áreas</h4><p>${f.con}</p></div>` : ''}
    ${gs ? `<details class="full" ${printing ? 'open' : ''}><summary>Passo a passo completo</summary>${gs}</details>` : ''}</div></details>`;
}
const empty = '<p class="empty">Conteúdo em preparação.</p>';
function layerHTML(m, key) {
  if (key === 'ent') return m.ent.length ? m.ent.map(block).join('') : empty;
  if (key === 'con') return m.con.length ? m.con.map(feature).join('') : empty;
  return m.faz.length ? m.faz.map((g, i) => guide(g, `${m.id}g${i}`)).join('') : (m.id === 'cadastros' ? '<p class="empty">Os passos a passo dos cadastros estão dentro de cada funcionalidade, em <b>Conhecer a tela</b>.</p>' : empty);
}

/* ---------- páginas ---------- */
function home() {
  return `<section class="hero"><div class="kicker">Manual interativo</div><h1>Entenda, conheça e execute cada processo</h1>
  <p>Escolha um módulo ou pesquise no topo. Cada módulo tem três camadas: <b>Entender</b> a lógica, <b>Conhecer a tela</b> e <b>Fazer</b> o passo a passo.</p></section>
  <ol class="mods">${MODULES.map((m, i) => `<li><a class="mcard" style="--c:${m.cor}" href="#/m/${m.id}/entender"><span class="n">Módulo ${i + 1}</span><h3>${m.t}</h3><p>${m.d}</p><span class="lay">${LAYERS.map(l => `<i class="${m[l[2]].length ? 'on' : ''}">${l[1]}</i>`).join('')}</span></a></li>`).join('')}</ol>`;
}
function modulePage(id, layer) {
  const m = MODULES.find(x => x.id === id); if (!m) return home();
  const cur = LAYERS.find(l => l[0] === layer) || LAYERS[0];
  const i = MODULES.indexOf(m), p = MODULES[i - 1], n = MODULES[i + 1];
  return `<div class="mhead" style="--c:${m.cor}"><a href="#/">← Módulos</a><h1>${m.t}</h1><p>${m.d}</p>
  <nav class="seg">${LAYERS.map(l => `<a href="#/m/${id}/${l[0]}" aria-current="${l[0] === cur[0]}">${l[1]}</a>`).join('')}</nav></div>
  <div class="layer" style="--c:${m.cor}">${layerHTML(m, cur[2])}</div>
  <div class="pager">${p ? `<a href="#/m/${p.id}/${cur[0]}">← ${p.t}</a>` : '<span></span>'}${n ? `<a href="#/m/${n.id}/${cur[0]}">${n.t} →</a>` : ''}</div>`;
}
function book() {
  printing = true;
  const h = `<div class="bar"><span>Pré-visualização do PDF</span><button onclick="window.print()">Imprimir / Salvar como PDF</button></div>
  <section class="cover"><div class="kicker">Next01 · Gestão da Locação</div><h1>Manual do sistema</h1><p>Entender · Conhecer a tela · Fazer</p>
  <ol class="toc">${MODULES.map(m => `<li>${m.t}</li>`).join('')}</ol></section>` +
    MODULES.map(m => `<section class="chap" style="--c:${m.cor}"><h1>${m.t}</h1><p class="d">${m.d}</p>` +
      LAYERS.map(l => `<h2>${l[1]}</h2>${layerHTML(m, l[2])}`).join('') + '</section>').join('');
  printing = false; return h;
}

/* ---------- busca ---------- */
let idx = null;
const flat = (o, a = []) => (o && typeof o === 'object' ? Object.values(o).forEach(v => flat(v, a)) : typeof o === 'string' && a.push(o), a);
function buildIdx() {
  idx = [];
  MODULES.forEach(m => LAYERS.forEach(l => (m[l[2]] || []).forEach(x => {
    const extra = (x.man || []).map(i => MAN[i]);
    const title = x.title || x.t || '';
    idx.push({ m, l, title, text: flat([x, extra]).join(' ') });
  })));
}
function search(q) {
  if (!idx) buildIdx();
  const terms = norm(q).split(/\s+/).filter(Boolean);
  const hits = idx.filter(d => { const t = norm(d.title + ' ' + d.text); return terms.every(w => t.includes(w)); });
  app.innerHTML = `<h1 class="rh">Resultados para “${q.replace(/</g, '&lt;')}”</h1>` + (hits.length ? `<ul class="results">${hits.map(d => `<li><a style="--c:${d.m.cor}" href="#/m/${d.m.id}/${d.l[0]}" data-q="${q.replace(/"/g, '&quot;')}"><span class="tag">${d.m.t} · ${d.l[1]}</span><b>${d.title}</b></a></li>`).join('')}</ul>` : '<p class="empty">Nada encontrado. Tente outra palavra.</p>');
}

/* ---------- roteador ---------- */
function route() {
  const [, a, b, c] = location.hash.split('/');
  document.body.classList.toggle('print', a === 'imprimir');
  app.innerHTML = a === 'm' ? modulePage(b, c) : a === 'imprimir' ? book() : home();
  if (a !== 'imprimir') window.scrollTo(0, 0);
  if (pendingQ) {
    const terms = norm(pendingQ).split(/\s+/).filter(Boolean); pendingQ = '';
    const el = [...app.querySelectorAll('.chunk')].find(e => terms.every(w => norm(e.textContent).includes(w)));
    if (el) { for (let p = el.parentElement; p; p = p.parentElement) if (p.tagName === 'DETAILS') p.open = true; if (el.tagName === 'DETAILS') el.open = true; el.scrollIntoView({ block: 'start' }); el.classList.add('flash'); }
  }
}
window.addEventListener('hashchange', () => { qi.value = ''; route(); });
qi.addEventListener('input', () => qi.value.trim() ? search(qi.value.trim()) : route());
app.addEventListener('click', e => { const a = e.target.closest('a[data-q]'); if (a) { pendingQ = a.dataset.q; if (location.hash === a.getAttribute('href')) { qi.value = ''; route(); } } });
app.addEventListener('change', e => {
  const k = e.target.dataset && e.target.dataset.k; if (!k) return;
  e.target.checked ? done[k] = 1 : delete done[k];
  e.target.closest('li').classList.toggle('done', e.target.checked); save();
});
route();

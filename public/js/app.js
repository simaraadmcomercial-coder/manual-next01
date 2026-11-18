import { MODULES } from './data.js';
import { MAN, FEATS } from './legacy.js';
import { VERSION, SECTIONS, MENU, CONTENT, QUEM, TREINO, FAQ, CONTATOS } from './menu.js';

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
/* ---------- novos blocos ---------- */
const tela = m => `<figure class="tela"><div class="imgw"><img src="img/telas/${m.src}" alt="${m.alt || ''}" loading="lazy">${(m.pins || []).map((p, i) => `<button class="pin" style="left:${p[0]}%;top:${p[1]}%" data-p="${i}" aria-label="Ponto ${i + 1}">${i + 1}</button>`).join('')}</div>${m.pins ? `<ol class="legend">${m.pins.map((p, i) => `<li data-p="${i}"><b>${p[2]}.</b> ${p[3]}</li>`).join('')}</ol>` : ''}</figure>`;
const sub = (s, id) => `<section class="sub chunk"><h3>${s.t}</h3>${s.path ? `<p class="path">${s.path}</p>` : ''}${s.ent ? `<h4 class="lay">Entender</h4>${s.ent.map(x => `<p>${fmt(x)}</p>`).join('')}` : ''}${s.nota ? `<div class="callout"><p>${fmt(s.nota)}</p></div>` : ''}${s.img ? `<h4 class="lay">Conhecer a tela</h4>${tela(s.img)}` : ''}${s.steps ? `<h4 class="lay">Fazer</h4>${guide({ t: 'Passo a passo', steps: s.steps, tips: s.tips }, id)}` : ''}</section>`;
const items = () => MENU.flatMap(g => g.items);
const itemBody = i => { const c = CONTENT[i.id]; return c ? (c.subs || []).map((s, k) => sub(s, `${i.id}${k}`)).join('') + (c.feat || []).map(n => feature(FEATS[n])).join('') : empty; };
const AREAS = MODULES.filter(m => m.faz.length);
const areasBody = () => AREAS.map(m => `<section class="area" style="--c:${m.cor}"><h2>${m.t}</h2><p class="d">${m.d}</p>${m.faz.map((g, i) => guide(g, `${m.id}g${i}`)).join('')}</section>`).join('');
const treinoBody = () => block({ kicker: 'Conscientização', title: 'Por que preencher corretamente', flow: ['Cadastro', 'Comercial', 'Faturamento', 'Financeiro'], hi: 0, lead: TREINO.intro, callout: [TREINO.corrige] }) + MODULES.filter(m => m.ent.length).map(m => `<h2>${m.t}</h2>${m.ent.map(block).join('')}`).join('');
const faqBody = () => FAQ.map(q => `<details class="m chunk" ${printing ? 'open' : ''}><summary>${q[0]}</summary><div class="body"><p>${fmt(q[1])}</p></div></details>`).join('');
const C = CONTATOS;
const contatosBody = () => `<div class="block"><h3>${C.nome}</h3><p>${C.end}</p><p><a href="mailto:${C.email}">${C.email}</a></p><p>${C.tels.map(t => `<a href="tel:${t[1]}">${t[0]}</a>`).join(' · ')}</p></div>`;
const chamadosBody = () => `<div class="block"><h3>Como abrir um chamado</h3><p>No menu lateral do sistema, em <b>Utilitários</b>, use <b>Suporte / Chamados</b>. O botão <b>Meus chamados</b> fica no rodapé do menu.</p><p>Se preferir, fale direto com a Next01:</p>${contatosBody()}</div>`;
const quemBody = () => `<section class="hero"><img class="logo xl" src="img/logo.png" alt="Next01"><div class="kicker">Next01 Software</div><h1>Quem somos</h1><p>${QUEM.intro}</p></section>
<div class="cols3">${QUEM.cards.map(c => `<div class="block"><h3>${c[0]}</h3><p>${c[1]}</p></div>`).join('')}</div>
<h2 class="gh">Três etapas até a órbita</h2><div class="cols3">${QUEM.etapas.map(c => `<div class="block"><span class="kicker">${c[0]}</span><h3>${c[1]}</h3><p>${c[2]}</p></div>`).join('')}</div>
<div class="cta"><h3>Pronto para decolar</h3><p>Fale com a tripulação. Conte o rumo da sua empresa.</p><a href="#/contatos">Ver contatos</a></div>`;
const menusBody = () => MENU.map(g => `<h2 class="gh">${g.g}</h2><ul class="tiles">${g.items.map(i => `<li><a class="tile ${CONTENT[i.id] ? '' : 'prep'}" href="#/menus/${i.id}"><h3>${i.t}</h3><p>${i.d}</p>${CONTENT[i.id] ? '' : '<span class="bd">Em preparação</span>'}</a></li>`).join('')}</ul>`).join('');
const head = (t, d) => `<div class="mhead"><h1>${t}</h1>${d ? `<p>${d}</p>` : ''}</div>`;

/* ---------- páginas ---------- */
function page(a, b) {
  if (a === 'menus') { const i = items().find(x => x.id === b); return i ? `<a class="back" href="#/menus">← Funcionalidade dos menus</a>${head(i.t, i.d)}<div class="layer">${itemBody(i)}</div>` : head('Funcionalidade dos menus', 'Os módulos do sistema, na mesma ordem do menu lateral. Cada um explica o que é, mostra a tela e ensina a fazer.') + menusBody(); }
  if (a === 'areas') return head('Passo a passo por área', 'Resumo de cada área: o que é, o que faz e como fazer.') + `<div class="layer">${areasBody()}</div>`;
  if (a === 'treino') return head('Treinamento consultivo', 'A lógica e a conexão entre os módulos.') + `<div class="layer">${treinoBody()}</div>`;
  if (a === 'faq') return head('Dúvidas frequentes') + `<div class="layer">${faqBody()}</div>`;
  if (a === 'contatos') return head('Contatos') + contatosBody();
  if (a === 'chamados') return head('Abra chamados') + chamadosBody();
  return quemBody();
}
function book() {
  printing = true;
  const sec = (t, h) => `<section class="chap"><h1>${t}</h1>${h}</section>`;
  const h = `<div class="bar"><span>Pré-visualização do PDF</span><button onclick="window.print()">Imprimir / Salvar como PDF</button></div>
  <section class="cover"><img class="logo xl" src="img/logo.png" alt="Next01"><div class="kicker">Next01 Software</div><h1>Manual do sistema</h1><p>Versão ${VERSION}</p><ol class="toc">${SECTIONS.map(s => `<li>${s[1]}</li>`).join('')}</ol></section>`
    + sec('Quem somos', quemBody())
    + sec('Funcionalidade dos menus', items().filter(i => CONTENT[i.id]).map(i => `<h2>${i.t}</h2><p class="d">${i.d}</p>${itemBody(i)}`).join(''))
    + sec('Passo a passo por área', areasBody()) + sec('Treinamento consultivo', treinoBody())
    + sec('Dúvidas frequentes', faqBody()) + sec('Contatos', contatosBody()) + sec('Abra chamados', chamadosBody());
  printing = false; return h;
}

/* ---------- busca ---------- */
let idx = null;
const flat = (o, a = []) => (o && typeof o === 'object' ? Object.values(o).forEach(v => flat(v, a)) : typeof o === 'string' && a.push(o), a);
function buildIdx() {
  idx = [];
  MENU.forEach(g => g.items.forEach(i => { const c = CONTENT[i.id] || {}; idx.push({ href: `#/menus/${i.id}`, tag: 'Funcionalidade dos menus · ' + g.g, title: i.t, text: i.d + ' ' + flat([c, (c.feat || []).map(n => [FEATS[n], (FEATS[n].man || []).map(k => MAN[k])])]).join(' ') }); }));
  AREAS.forEach(m => m.faz.forEach(g => idx.push({ href: '#/areas', tag: 'Passo a passo por área · ' + m.t, title: g.t, text: flat(g).join(' ') })));
  MODULES.filter(m => m.ent.length).forEach(m => idx.push({ href: '#/treino', tag: 'Treinamento consultivo', title: m.t, text: flat(m.ent).join(' ') }));
  FAQ.forEach(q => idx.push({ href: '#/faq', tag: 'Dúvidas frequentes', title: q[0], text: q[1] }));
  idx.push({ href: '#/quem', tag: 'Quem somos', title: 'Next01 Software', text: flat(QUEM).join(' ') }, { href: '#/contatos', tag: 'Contatos', title: 'Contatos', text: flat(CONTATOS).join(' ') });
}
function search(q) {
  if (!idx) buildIdx();
  const terms = norm(q).split(/\s+/).filter(Boolean);
  const hits = idx.filter(d => { const t = norm(d.title + ' ' + d.text); return terms.every(w => t.includes(w)); });
  const qa = q.replace(/</g, '&lt;').replace(/"/g, '&quot;');
  app.innerHTML = `<h1 class="rh">Resultados para “${qa}”</h1>` + (hits.length ? `<ul class="results">${hits.map(d => `<li><a href="${d.href}" data-q="${qa}"><span class="tag">${d.tag}</span><b>${d.title}</b></a></li>`).join('')}</ul>` : '<p class="empty">Nada encontrado. Tente outra palavra.</p>');
}

/* ---------- roteador ---------- */
$('#nav').innerHTML = SECTIONS.map(s => `<a href="#/${s[0]}">${s[1]}</a>`).join('');
$('.ver').textContent = 'Manual Next01 · versão ' + VERSION;
function route() {
  const [, a, b] = location.hash.split('/');
  document.body.classList.toggle('print', a === 'imprimir');
  app.innerHTML = a === 'imprimir' ? book() : page(a, b);
  document.querySelectorAll('#nav a').forEach(l => l.setAttribute('aria-current', String(l.getAttribute('href') === `#/${a || 'quem'}`)));
  if (a !== 'imprimir') window.scrollTo(0, 0);
  if (pendingQ) {
    const terms = norm(pendingQ).split(/\s+/).filter(Boolean); pendingQ = '';
    const el = [...app.querySelectorAll('.chunk')].find(e => terms.every(w => norm(e.textContent).includes(w)));
    if (el) { for (let p = el.parentElement; p; p = p.parentElement) if (p.tagName === 'DETAILS') p.open = true; if (el.tagName === 'DETAILS') el.open = true; el.scrollIntoView({ block: 'start' }); el.classList.add('flash'); }
  }
}
window.addEventListener('hashchange', () => { qi.value = ''; route(); });
qi.addEventListener('input', () => qi.value.trim() ? search(qi.value.trim()) : route());
app.addEventListener('click', e => {
  const a = e.target.closest('a[data-q]'); if (a) { pendingQ = a.dataset.q; if (location.hash === a.getAttribute('href')) { qi.value = ''; route(); } }
  const p = e.target.closest('.pin'); if (p) { const f = p.closest('.tela'); f.querySelectorAll('.legend li').forEach(l => l.classList.toggle('on', l.dataset.p === p.dataset.p)); const l = f.querySelector(`.legend li[data-p="${p.dataset.p}"]`); if (l) l.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
});
app.addEventListener('change', e => {
  const k = e.target.dataset && e.target.dataset.k; if (!k) return;
  e.target.checked ? done[k] = 1 : delete done[k];
  e.target.closest('li').classList.toggle('done', e.target.checked); save();
});
route();

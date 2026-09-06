import { gsap, registerGSAP } from '../lib/gsap';
import { stats } from '../lib/data';

type Align = 'left' | 'right';
type Placement = {
  cell: string;
  tier: string;
  align: Align;
  /** visual order on mobile (gold goes last) */
  order: number;
  sub?: string;
};

// Staggered ledger: hero figure opens, mid stats sit on a shared
// hairline rule, the gold World Cup "1" is isolated with silence above it.
const PLACEMENT: Placement[] = [
  { cell: 'num-cell--hero', tier: 'num-value--hero', align: 'left', order: 0, sub: 'Club + country · 2004 —' },
  { cell: 'num-cell--side', tier: 'num-value--mid', align: 'left', order: 1 },
  { cell: 'num-cell--row2a', tier: 'num-value--mid', align: 'left', order: 2 },
  { cell: 'num-cell--gold', tier: 'num-value--gold', align: 'right', order: 6, sub: 'Qatar 2022 · Lusail' },
  { cell: 'num-cell--row2b', tier: 'num-value--mid', align: 'left', order: 3 },
  { cell: 'num-cell--row2c', tier: 'num-value--mid', align: 'left', order: 4 },
  { cell: 'num-cell--copa', tier: 'num-value--mid', align: 'left', order: 5 },
];

export function mountNumbers(ctx: { root: HTMLElement; reduced: boolean }) {
  const section = ctx.root.querySelector<HTMLElement>('#numbers')!;
  const reduced = ctx.reduced;

  section.classList.add('section', 'section--full', 'bg-hatch');

  const wrap = document.createElement('div');
  wrap.className = 'num-wrap';

  const head = document.createElement('div');
  head.className = 'num-head';
  const eyebrow = document.createElement('span');
  eyebrow.className = 'num-eyebrow';
  eyebrow.innerHTML = '01 <span>— The Reckoning</span>';
  const note = document.createElement('span');
  note.className = 'num-note';
  note.textContent = 'Club + country · 2004 —';
  head.append(eyebrow, note);

  const grid = document.createElement('div');
  grid.className = 'num-grid';
  grid.setAttribute('role', 'list');
  grid.setAttribute('aria-label', 'Lionel Messi career statistics');

  type Row = { cell: HTMLElement; value: HTMLElement; label: HTMLElement; target: number; gold: boolean };
  const rows: Row[] = [];

  stats.forEach((s, i) => {
    const p = PLACEMENT[i];
    const gold = !!s.emphasis;

    const cell = document.createElement('div');
    cell.className = `num-cell ${p.cell}`;
    cell.setAttribute('role', 'listitem');
    cell.setAttribute('aria-label', `${s.label}: ${s.value}`);
    cell.style.order = String(p.order);

    const index = document.createElement('span');
    index.className = 'num-index';
    index.setAttribute('aria-hidden', 'true');
    index.textContent = `${String(i + 1).padStart(2, '0')} / 07`;

    const value = document.createElement('span');
    value.className = `num-value tabular ${p.tier}`;
    value.setAttribute('aria-hidden', 'true');
    value.textContent = '0';

    const label = document.createElement('span');
    label.className = 'num-label';
    label.textContent = s.label;

    cell.append(index, value, label);

    if (p.sub) {
      const sub = document.createElement('span');
      sub.className = 'num-sub';
      sub.textContent = p.sub;
      cell.append(sub);
    }

    grid.append(cell);
    rows.push({ cell, value, label, target: s.value, gold });
  });

  wrap.append(head, grid);
  section.append(wrap);

  const setFinal = (r: Row) => {
    r.value.textContent = String(r.target);
    r.label.style.opacity = '1';
  };

  if (reduced) {
    rows.forEach(setFinal);
    return;
  }

  registerGSAP();

  gsap.set(head, { opacity: 0, y: 16 });
  gsap.set(
    rows.map((r) => r.label),
    { opacity: 0, y: 12 }
  );

  const tl = gsap.timeline({
    scrollTrigger: { trigger: section, start: 'top 70%' },
  });

  tl.to(head, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' }, 0);

  // Animation order: hero → mids in ledger order → gold lands last, in silence.
  const seq = [...rows.filter((r) => !r.gold)];
  const gold = rows.find((r) => r.gold)!;

  seq.forEach((r, k) => {
    const at = 0.1 + k * 0.12;
    const dur = k === 0 ? 2.0 : 1.2;
    const obj = { v: 0 };
    tl.to(
      obj,
      {
        v: r.target,
        duration: dur,
        ease: 'expo.out',
        onUpdate: () => (r.value.textContent = String(Math.round(obj.v))),
        onComplete: () => (r.value.textContent = String(r.target)),
      },
      at
    );
    tl.to(r.label, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, at + dur * 0.7);
  });

  const lastStart = 0.1 + (seq.length - 1) * 0.12;
  const goldAt = lastStart + 1.2 + 0.8;
  const g = { v: 0 };
  tl.to(
    g,
    {
      v: gold.target,
      duration: 1.6,
      ease: 'expo.out',
      onUpdate: () => (gold.value.textContent = String(Math.round(g.v))),
      onComplete: () => (gold.value.textContent = String(gold.target)),
    },
    goldAt
  );
  tl.to(gold.label, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, goldAt + 1.1);
}

'use client';

import { useEffect, useRef } from 'react';
import { registerGSAP, gsap } from '@/lib/gsap';

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    registerGSAP();

    // skip on touch / coarse pointers
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dotEl = dot.current!;
    const ringEl = ring.current!;
    const labelEl = label.current!;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { x: pos.x, y: pos.y };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      gsap.to(dotEl, { x: target.x, y: target.y, duration: 0, overwrite: true });
    };

    window.addEventListener('mousemove', onMove);

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.15;
      pos.y += (target.y - pos.y) * 0.15;
      gsap.set(ringEl, { x: pos.x, y: pos.y });
    };
    gsap.ticker.add(tick);

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      const target = el.closest('[data-cursor]') as HTMLElement | null;
      if (!target) return;

      const mode = target.dataset.cursor as string;
      if (mode === 'hover') {
        gsap.to(ringEl, {
          width: 48,
          height: 48,
          backgroundColor: 'rgba(232,197,71,0.08)',
          borderColor: 'rgba(232,197,71,0.6)',
          duration: 0.3,
          ease: 'power3.out',
        });
        labelEl.textContent = target.dataset.cursorLabel || '';
        gsap.to(labelEl, { opacity: 1, duration: 0.3 });
      } else if (mode === 'view') {
        gsap.to(ringEl, {
          width: 64,
          height: 64,
          backgroundColor: 'rgba(232,197,71,0.06)',
          borderColor: 'rgba(232,197,71,0.5)',
          duration: 0.3,
        });
        labelEl.textContent = '[ VIEW ]';
        gsap.to(labelEl, { opacity: 1, duration: 0.3 });
      } else if (mode === 'playing') {
        gsap.to(ringEl, {
          width: 56,
          height: 56,
          backgroundColor: 'transparent',
          borderColor: 'rgba(232,197,71,0.5)',
          duration: 0.3,
        });
        labelEl.textContent = '[ PLAYING ]';
        gsap.to(labelEl, { opacity: 1, duration: 0.3 });
      } else {
        gsap.to(ringEl, {
          width: 32,
          height: 32,
          backgroundColor: 'transparent',
          borderColor: 'var(--chalk)',
          duration: 0.3,
        });
        gsap.to(labelEl, { opacity: 0, duration: 0.2 });
      }
    };
    window.addEventListener('mouseover', onOver);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: -2,
          left: -2,
          width: 4,
          height: 4,
          borderRadius: 9999,
          background: 'var(--chalk)',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />
      <div
        ref={ring}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: -16,
          left: -16,
          width: 32,
          height: 32,
          borderRadius: 9999,
          border: '1px solid var(--chalk)',
          display: 'grid',
          placeItems: 'center',
          pointerEvents: 'none',
          zIndex: 9997,
          willChange: 'transform, width, height',
        }}
      >
        <span
          ref={label}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 10,
            letterSpacing: '0.12em',
            color: 'var(--chalk)',
            opacity: 0,
            whiteSpace: 'nowrap',
          }}
        />
      </div>
    </>
  );
}
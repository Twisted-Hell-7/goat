'use client';

import { useEffect, useState } from 'react';
import { navLinks } from '@/lib/data';

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '24px clamp(20px, 4vw, 56px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'transparent',
        mixBlendMode: 'normal',
      }}
    >
      <a
        href="#top"
        data-cursor="hover"
        data-cursor-label="[ TOP ]"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 16,
          letterSpacing: '0.08em',
          color: 'var(--chalk)',
        }}
      >
        MESSI
      </a>

      {/* Desktop */}
      <nav
        style={{ display: 'none' }}
        className="nav-desktop"
        aria-label="Primary"
      >
        <ul
          style={{
            display: 'flex',
            gap: 36,
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                data-cursor="hover"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  letterSpacing: '0.12em',
                  color: 'var(--chalk-dim)',
                  transition: 'color 200ms ease',
                }}
                className="nav-link"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile toggle */}
      <button
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        data-cursor="hover"
        className="nav-toggle"
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          gap: 6,
          padding: 8,
        }}
      >
        <span
          style={{
            width: 22,
            height: 1,
            background: 'var(--chalk)',
            transition: 'transform 300ms var(--ease-expo)',
            transform: open ? 'translateY(3.5px) rotate(45deg)' : 'none',
          }}
        />
        <span
          style={{
            width: 22,
            height: 1,
            background: 'var(--chalk)',
            transition: 'transform 300ms var(--ease-expo)',
            transform: open ? 'translateY(-3.5px) rotate(-45deg)' : 'none',
          }}
        />
      </button>

      {/* Mobile takeover */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--void)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 60,
          }}
        >
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              textAlign: 'center',
            }}
          >
            {navLinks.map((l, i) => (
              <li key={l.href} style={{ animationDelay: `${i * 60}ms` }}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 48,
                    color: 'var(--chalk)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style jsx>{`
        .nav-link:hover {
          color: var(--chalk);
        }
        @media (min-width: 768px) {
          :global(.nav-desktop) {
            display: block !important;
          }
          :global(.nav-toggle) {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
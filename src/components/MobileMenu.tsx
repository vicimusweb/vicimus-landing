import { useEffect, useRef, useState } from 'react';
import type { Locale } from '../i18n/utils';

interface NavItem { href: string; label: string }

interface Props {
  locale: Locale;
  navItems: NavItem[];
  labels: {
    open: string;
    close: string;
    switchAria: string;
    hu: string;
    ro: string;
  };
}

export default function MobileMenu({ locale, navItems, labels }: Props) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    const firstLink = panelRef.current?.querySelector<HTMLElement>('a, button');
    firstLink?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const huHref = typeof window !== 'undefined' ? `/${window.location.hash}` : '/';
  const roHref = typeof window !== 'undefined' ? `/ro${window.location.hash}` : '/ro';

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={open ? labels.close : labels.open}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        onClick={() => setOpen((v) => !v)}
        className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-text"
      >
        <span className={`block h-px w-6 bg-current transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`}></span>
        <span className={`block h-px w-6 bg-current transition-opacity ${open ? 'opacity-0' : ''}`}></span>
        <span className={`block h-px w-6 bg-current transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`}></span>
      </button>

      {open && (
        <div
          id="mobile-menu-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={labels.open}
          className="fixed inset-0 z-40 bg-bg flex flex-col"
        >
          <div className="h-16" aria-hidden="true"></div>
          <nav className="flex-1 flex flex-col items-center justify-center gap-8" aria-label="Mobile primary">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-3xl font-medium text-text hover:text-accent transition-colors"
                style={{ letterSpacing: '-0.02em' }}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="p-8 border-t border-border flex items-center justify-center gap-2" role="group" aria-label={labels.switchAria}>
            <a href={huHref} className={`font-mono text-xs uppercase tracking-widest px-2 py-1 ${locale === 'hu' ? 'text-text' : 'text-muted'}`} aria-current={locale === 'hu' ? 'page' : undefined}>
              {labels.hu}
            </a>
            <span className="text-border">/</span>
            <a href={roHref} className={`font-mono text-xs uppercase tracking-widest px-2 py-1 ${locale === 'ro' ? 'text-text' : 'text-muted'}`} aria-current={locale === 'ro' ? 'page' : undefined}>
              {labels.ro}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

import { useEffect, useState } from 'react';
import type { Locale } from '../i18n/utils';

interface Props {
  locale: Locale;
  ariaLabel: string;
  labels: { en: string; ro: string };
}

function targetHref(target: Locale): string {
  if (typeof window === 'undefined') return target === 'en' ? '/' : '/ro';
  const hash = window.location.hash;
  const base = target === 'en' ? '/' : '/ro';
  return `${base}${hash}`;
}

export default function LangSwitcher({ locale, ariaLabel, labels }: Props) {
  const [enHref, setEnHref] = useState('/');
  const [roHref, setRoHref] = useState('/ro');

  useEffect(() => {
    setEnHref(targetHref('en'));
    setRoHref(targetHref('ro'));
  }, []);

  const linkBase =
    'font-mono text-xs uppercase tracking-widest px-2 py-1 transition-colors';
  const active = 'text-text';
  const inactive = 'text-muted hover:text-text';

  return (
    <div role="group" aria-label={ariaLabel} className="flex items-center gap-1">
      <a href={enHref} className={`${linkBase} ${locale === 'en' ? active : inactive}`} aria-current={locale === 'en' ? 'page' : undefined}>
        {labels.en}
      </a>
      <span className="text-border">/</span>
      <a href={roHref} className={`${linkBase} ${locale === 'ro' ? active : inactive}`} aria-current={locale === 'ro' ? 'page' : undefined}>
        {labels.ro}
      </a>
    </div>
  );
}

import hu from './hu.json';
import ro from './ro.json';

export type Locale = 'hu' | 'ro';

export const locales: readonly Locale[] = ['hu', 'ro'] as const;
export const defaultLocale: Locale = 'hu';

export type Dict = typeof hu;

const dictionaries: Record<Locale, Dict> = {
  hu,
  ro: ro as Dict,
};

export function dict(locale: Locale): Dict {
  return dictionaries[locale];
}

export function localeFromPath(pathname: string): Locale {
  return pathname.startsWith('/ro') ? 'ro' : 'hu';
}

export function localizedPath(locale: Locale, path = '/'): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'hu') return normalized === '/' ? '/' : normalized;
  return normalized === '/' ? '/ro' : `/ro${normalized}`;
}

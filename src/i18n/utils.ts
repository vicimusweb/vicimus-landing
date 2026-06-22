import en from './en.json';
import ro from './ro.json';

export type Locale = 'en' | 'ro';

export const locales: readonly Locale[] = ['en', 'ro'] as const;
export const defaultLocale: Locale = 'en';

export type Dict = typeof en;

const dictionaries: Record<Locale, Dict> = {
  en,
  ro: ro as Dict,
};

export function dict(locale: Locale): Dict {
  return dictionaries[locale];
}

export function localeFromPath(pathname: string): Locale {
  return pathname.startsWith('/ro') ? 'ro' : 'en';
}

export function localizedPath(locale: Locale, path = '/'): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'en') return normalized === '/' ? '/' : normalized;
  return normalized === '/' ? '/ro' : `/ro${normalized}`;
}

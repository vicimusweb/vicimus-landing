# Vicimus Landing

Bilingual (HU/RO) one-page landing site for Vicimus SRL, built with Astro + Tailwind.

## Stack

- Astro 4 (static output)
- TypeScript (strict)
- Tailwind CSS v3
- React 18 (two islands: `LangSwitcher`, `MobileMenu`)
- Geist + Geist Mono via `@fontsource-variable`

## Local dev

Requires pnpm + Node 20+.

```bash
pnpm install
pnpm dev          # http://localhost:4321
```

## Type check

```bash
pnpm check        # astro check
```

## Build

```bash
pnpm build        # → dist/
pnpm preview      # serve dist locally
```

## Deploy: Cloudflare Pages

This is a static site. Cloudflare Pages config:

- **Build command:** `pnpm install --frozen-lockfile && pnpm build`
- **Build output directory:** `dist`
- **Root directory:** `vicimus-landing`
- **Node version:** `20`
- **Environment variables:** none required

After connecting the GitHub repo to Cloudflare Pages, set the four fields above in the Pages project settings. Pushes to the production branch trigger a deploy automatically. Routes:
- `/` → Hungarian
- `/ro` → Romanian

## Content edits

All copy lives in `src/i18n/hu.json` and `src/i18n/ro.json`. Same key structure in both files — TypeScript enforces parity at build time. Brand name, phone, email, address are all in the JSON files (no hardcoded strings to chase).

## Structure

```
src/
  components/   # one file per section + the two React islands
  layouts/      # Layout.astro (head, fonts, SEO, animate observer)
  i18n/         # hu.json, ro.json, utils.ts (typed t() helper)
  pages/        # index.astro (HU), ro/index.astro (RO)
  styles/       # global.css (Tailwind directives + CSS vars)
```

## Design tokens

CSS variables in `src/styles/global.css`, mapped into Tailwind via `tailwind.config.mjs`:

| Token | Value | Purpose |
|-------|-------|---------|
| `--bg` | `#0A0A0A` | Page background |
| `--surface` | `#111111` | Header on scroll |
| `--border` | `#1F1F1F` | 1px dividers |
| `--text` | `#FAFAFA` | Primary text |
| `--muted` | `#A1A1A1` | Secondary text |
| `--accent` | `#A3E635` | Lime CTAs / gradient orb |

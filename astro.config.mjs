import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  site: 'https://vicimussolutions.com',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ro'],
    routing: { prefixDefaultLocale: false },
  },
});

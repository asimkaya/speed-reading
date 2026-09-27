import { defineConfig } from 'vite';

// Relative asset paths so the build works under any sub-path (e.g. GitHub Pages /speed-reading/).
export default defineConfig({
  base: './',
});

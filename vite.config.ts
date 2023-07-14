import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  base: '/ts-library/',
  plugins: [UnoCSS()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  // JSX
  esbuild: {
    jsx: 'transform',
    jsxFactory: 'm',
    jsxFragment: "'['"
  }
});
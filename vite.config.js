import legacy from '@vitejs/plugin-legacy';
import { sync } from 'glob';
import path from 'path';
import { defineConfig } from 'vite';
import jsconfigPaths from 'vite-jsconfig-paths';

export default defineConfig({
  root: path.resolve(__dirname, './src'),
  publicDir: path.resolve(__dirname, 'public'),
  plugins: [
    legacy({
      targets: ['defaults', 'IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
    jsconfigPaths()
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }]
  },
  build: {
    rollupOptions: {
      input: {
        input: sync('./src/**/*.html'.replace(/\\/g, '/'))
      }
    },
    outDir: '../dist',
    emptyOutDir: true
  },
  optimizeDeps: {
    entries: ['src/pages/**/*.html', 'src/**/*.js', 'src/**/*.css']
  },
  server: {
    port: 3000,
    open: '/pages/index.html',
    fs: {
      strict: false
    }
  }
});

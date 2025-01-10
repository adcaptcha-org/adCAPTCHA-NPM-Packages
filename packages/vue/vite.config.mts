import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts(), vue()],
  build: {
    lib: {
      entry: 'src/index.tsx', 
      name: '@adcaptcha/vue', 
      fileName: (format) => `index.${format}.js`, 
    },
    rollupOptions: {
      external: ['vue'], 
      output: {
        globals: {
          vue: 'Vue', 
        },
        exports: 'named', 
      },
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './tests/setup.ts', 
  },
});


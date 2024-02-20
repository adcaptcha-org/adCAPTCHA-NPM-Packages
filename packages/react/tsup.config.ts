import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: './src/index.ts'
  },
  external: ['react'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  skipNodeModulesBundle: true
});
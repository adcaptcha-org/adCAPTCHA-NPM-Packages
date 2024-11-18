import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => ({
	test: {
		globals: true,
    	environment: 'happy-dom',
    	setupFiles: './tests/setup.ts', 
	},
	resolve: {
		conditions: mode === 'test' ? ['browser'] : [],
	},
	plugins: [sveltekit()]
}));

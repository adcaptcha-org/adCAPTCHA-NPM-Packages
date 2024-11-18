// vitest.setup.ts
import { vi } from 'vitest';

// Mock `window` and `document` for Svelte's onMount
if (!global.window) {
  global.window = {} as any;
}
if (!global.document) {
  global.document = {} as any;
}

// Mock `window.adcap` if used
global.window.adcap = {
  setupTriggers: vi.fn(),
};
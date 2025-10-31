import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';
import react from '@vitejs/plugin-react';
import { UserConfig } from 'vite';

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [react()],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './tests/setup.js',
      threads: false,
    },
  } as UserConfig),
);

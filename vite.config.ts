import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      // 修改此项，如果此项值为autoUpdate，则为自动给更新
      registerType: "prompt",
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: './',
  define: {
    APP_BUILD_DATE: JSON.stringify(new Date()),
    'process.env': {},
    'process': process,
  },
});

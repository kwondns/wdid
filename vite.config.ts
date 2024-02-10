import { splitVendorChunkPlugin, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), splitVendorChunkPlugin(), visualizer()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.toUpperCase().includes('PAST')) return '@past';
          if (id.toUpperCase().includes('PRESENT')) return '@present';
          if (id.toUpperCase().includes('FUTURE')) return '@future';
          if (
            id.includes('markdown') ||
            id.includes('remark') ||
            id.includes('rehype') ||
            id.includes('md') ||
            id.includes('editor') ||
            id.includes('refractor')
          )
            return '@md';
          if (id.includes('react-router-dom') || id.includes('react-router') || id.includes('remix')) {
            return '@react-router';
          }
          if (id.includes('recoil')) return '@recoil';
        },
      },
    },
  },
});

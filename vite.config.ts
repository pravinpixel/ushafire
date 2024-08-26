import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      overlay: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
      },
    }),
  ],
  // build : {
  //     outDir : "../../"
  // },
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
      {
        find: /^assets(.+)/,
        replacement: path.join(process.cwd(), 'src/assets/$1'),
      },
      {
        find: /^configs(.+)/,
        replacement: path.join(process.cwd(), 'src/configs/$1'),
      },
      {
        find: /^helper(.+)/,
        replacement: path.join(process.cwd(), 'src/helper/$1'),
      },
      {
        find: /^routes(.+)/,
        replacement: path.join(process.cwd(), 'src/routes/$1'),
      },
      {
        find: /^store(.+)/,
        replacement: path.join(process.cwd(), 'src/store/$1'),
      },
      {
        find: /^theme(.+)/,
        replacement: path.join(process.cwd(), 'src/theme/$1'),
      },
      {
        find: /^views(.+)/,
        replacement: path.join(process.cwd(), 'src/views/$1'),
      },
      {
        find: /^zustand-config(.+)/,
        replacement: path.join(process.cwd(), 'src/zustand-config/$1'),
      },
    ],
  },
  server: {
    port: 4000,
  },
  preview: {
    port: 4000,
  },
});

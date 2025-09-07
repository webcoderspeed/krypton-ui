import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['index.ts'],
    format: ['cjs', 'esm'],
    dts: {
      compilerOptions: {
        incremental: false
      }
    },
    clean: true,
    outDir: 'dist',
    target: 'es2020',
    external: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'next',
      'tailwindcss',
      '@radix-ui/*',
      'lucide-react',
      'class-variance-authority',
      'clsx',
      'tailwind-merge'
    ],
    esbuildOptions(options) {
      options.jsx = 'automatic'
      options.alias = {
        '@': '.'
      }
    }
  },
  {
    entry: ['app/globals.css'],
    format: ['cjs', 'esm'],
    dts: false,
    clean: false,
    outDir: 'dist',
    target: 'es2020'
  }
]);
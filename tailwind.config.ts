import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--bg-ink)', ocean: 'var(--bg-ocean)', gold: 'var(--brand-gold)', red: 'var(--brand-red)', cyan: 'var(--accent-cyan)', ivory: 'var(--text-ivory)', muted: 'var(--muted)'
      }
    }
  },
  plugins: []
};

export default config;

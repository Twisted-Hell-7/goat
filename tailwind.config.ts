import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        void: '#030303',
        obsidian: '#0D0D0D',
        chalk: '#EBEBEB',
        'chalk-dim': '#6B6B6B',
        'gold-electric': '#E8C547',
        'scar-red': '#C0392B',
        'ice-blue': '#A8C5D8',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Bebas Neue', 'Impact', 'sans-serif'],
        editorial: ['var(--font-editorial)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontVariantNumeric: {
        tabular: 'tabular-nums',
      },
    },
  },
  plugins: [],
};

export default config;
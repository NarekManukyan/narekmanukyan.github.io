/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic tokens (see src/index.css :root). Solid tokens map to CSS
        // vars; alpha variants are literal so static Tailwind classes work.
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        line: 'var(--line)',
        'line-soft': 'oklch(0.36 0.018 245 / 0.6)',
        ink: 'var(--ink)',
        'ink-muted': 'var(--ink-muted)',
        'ink-faint': 'var(--ink-faint)',
        accent: 'var(--accent)',
        'accent-strong': 'var(--accent-strong)',
        'accent-ink': 'var(--accent-ink)',
        'accent-soft': 'oklch(0.75 0.135 228 / 0.14)',
        'accent-line': 'oklch(0.75 0.135 228 / 0.42)',
        warm: 'var(--warm)',
        'warm-strong': 'var(--warm-strong)',
        'warm-soft': 'oklch(0.82 0.13 78 / 0.14)',
        'warm-line': 'oklch(0.82 0.13 78 / 0.4)',
        navbar: 'oklch(0.155 0.017 245 / 0.72)',
        scrim: 'oklch(0.11 0.015 245 / 0.6)',
      },
      fontFamily: {
        display: ['Bricolage Grotesque', 'Geist', 'sans-serif'],
        sans: ['Geist', 'Inter', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        prose: '68ch',
      },
      transitionTimingFunction: {
        'out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-slower': 'float 11s ease-in-out infinite',
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        glow: '0 0 24px oklch(0.75 0.135 228 / 0.25)',
        'card-hover': '0 12px 40px -12px oklch(0.1 0.02 245 / 0.7)',
      },
    },
  },
  plugins: [],
}

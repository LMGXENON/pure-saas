/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--color-canvas)',
        surface: {
          base: 'var(--color-surface-base)',
          elevated: 'var(--color-surface-elevated)',
          overlay: 'var(--color-surface-overlay)',
          muted: 'var(--color-surface-muted)',
          hover: 'var(--color-surface-hover)',
          selected: 'var(--color-surface-selected)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          accent: 'var(--color-text-accent)',
        },
        border: {
          subtle: 'var(--color-border-subtle)',
          default: 'var(--color-border-default)',
          hover: 'var(--color-border-hover)',
        },
        accent: {
          DEFAULT: 'var(--color-accent-primary)',
          hover: 'var(--color-accent-hover)',
          subtle: 'var(--color-accent-subtle)',
        },
        danger: {
          DEFAULT: 'var(--color-danger-base)',
          text: 'var(--color-danger-text)',
          subtle: 'var(--color-danger-subtle)',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'SF Mono',
          'Menlo',
          'Monaco',
          'monospace',
        ],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'elevated': '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'floating': '0 20px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}

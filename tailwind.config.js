/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          700: '#1a2f55',
          800: '#12213d',
          900: '#0b1528',
          950: '#070d18',
        },
        cyan: {
          300: '#67e8f9',
          400: '#00d2ff',
          500: '#00a3e0',
          600: '#0082b8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      }
    }
  },
  plugins: [],
}

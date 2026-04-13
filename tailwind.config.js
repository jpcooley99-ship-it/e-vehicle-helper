/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        navy: {
          50:  '#eef0f7',
          100: '#d5d9ec',
          200: '#aab3d9',
          300: '#7e8dc6',
          400: '#5367b3',
          500: '#3a4f9f',
          600: '#2e3f85',
          700: '#1e2d6b',
          800: '#152050',
          900: '#0c1535',
          950: '#070d22',
        },
        coral: {
          400: '#ff7a6b',
          500: '#ff5a47',
          600: '#e8432f',
        },
      },
      animation: {
        'fade-in':   'fadeIn 0.45s ease-out',
        'slide-up':  'slideUp 0.35s ease-out',
        'pulse-slow':'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(14px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}

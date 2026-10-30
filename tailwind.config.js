/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#516ca9',
        'primary-dark': '#384b75',
        dark: '#31404a',
        body: '#989da7',
        accent: '#f16583',
        light: '#fafbfc',
        'gray-100': '#eaeef2',
        'gray-800': '#31404a',
      },
      fontFamily: {
        sans: ['Lato', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '3px 3px 13px 0 rgba(0,0,0,0.07)',
        cardLg: '19px 19px 51px 0 rgba(0,0,0,0.08)',
        soft: '7px 7px 13px 0 rgba(0,0,0,0.05)',
      },
      borderRadius: {
        pill: '40px',
        card: '10px',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translate3d(0,80px,0)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        slideInLeft: {
          '0%': { transform: 'translate3d(-100%,0,0)', visibility: 'visible' },
          '100%': { transform: 'translate3d(0,0,0)' },
        },
        slideInRight: {
          '0%': { transform: 'translate3d(100%,0,0)', visibility: 'visible' },
          '100%': { transform: 'translate3d(0,0,0)' },
        },
        slideInUp: {
          '0%': { transform: 'translate3d(0,100%,0)', visibility: 'visible' },
          '100%': { transform: 'translate3d(0,0,0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out both',
        fadeInUp: 'fadeInUp 1s ease-out both',
        slideInLeft: 'slideInLeft 1s ease-out both',
        slideInRight: 'slideInRight 1s ease-out both',
        slideInUp: 'slideInUp 1s ease-out both',
      },
    },
  },
  plugins: [],
};
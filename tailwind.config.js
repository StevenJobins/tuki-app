/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        tuki: {
          rot: '#8F5652',
          'rot-dark': '#7A3E3A',
          mint: '#AADBD7',
          'mint-dark': '#A0D1CA',
          'mint-light': '#D4EFED',
          'mint-bg': '#F0FAF9',
          blau: '#5E6578',
          orange: '#E18B63',
          cream: '#FAF8F5',
          warm: '#FFF9F5',
        },
      },
      fontFamily: {
        rubik: ['Rubik', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}

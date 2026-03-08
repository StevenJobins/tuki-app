/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tuki: {
          'rot': '#8F5652',
          'rot-dark': '#7A3E3A',
          'rot-light': '#A6726E',
          'mint': '#AADBD7',
          'mint-dark': '#A0D1CA',
          'mint-light': '#B4E5E1',
          'blau': '#5E6578',
          'orange': '#E18B63',
          'schwarz': '#000000',
          'weiss': '#FFFFFF',
          'sand': '#F5F0E8',
        }
      },
      fontFamily: {
        'tuki': ['Rubik', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tuki-rot': '#8F5652',
        'tuki-rot-dark': '#7A3E3A',
        'tuki-mint': '#AADBD7',
        'tuki-mint-dark': '#A0D1CA',
        'tuki-blau': '#5E6578',
        'tuki-orange': '#E18B63',
        'tuki-schwarz': '#000000',
        'tuki-weiss': '#FFFFFF',
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

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
          'sand': '#F5F0E8',
          'schwarz': '#1A1A1A',
          'weiss': '#FFFFFF',
          'rot': '#E85A4F',
          'rot-dark': '#D94A3F',
          'blau': '#2E3A59',
          'mint': '#A8D5BA',
          'orange': '#F5A623',
        }
      },
      fontFamily: {
        'tuki': ['Rubik', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

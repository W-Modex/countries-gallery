/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
    colors: {
      'darkElem': 'hsl(209, 23%, 22%)',
      'darkBg': 'hsl(207, 26%, 17%)',
      'white': '#fff',
      'lightTxt': 'hsl(207, 26%, 17%)',
      'lightInp': 'hsl(0, 0%, 52%)',
      'lightBg': 'hsl(0, 0%, 90%)'
    },
  },
  plugins: [],
}


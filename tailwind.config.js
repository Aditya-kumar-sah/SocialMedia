/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'], 
      },
      flex: {
        '3': '3 3 0%',
        '5': '5 5 0%',
        '4': '4 4 0%',
        '9': '9 9 0%',
      },
    },
  },
  plugins: [],
}


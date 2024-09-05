/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,handlebars}"],
  theme: {
    extend: {
      colors: {
        'orange': '#D9843B',
        'black1': '#0D0D0D',
        'colorbutton': '#733C1D',
        'white': "#ffffff"
      },
    },
    width: {
      '125': '48rem',
    }
  },
  plugins: [],
}
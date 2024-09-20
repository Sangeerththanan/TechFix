/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        navBackground: '#708090',
        navMenu: '#333333', // Light gray for the menu items
      },
    },
  },
  plugins: [],
};
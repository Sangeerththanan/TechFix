/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        navBackground: '#181818', // Dark gray for the navbar background
        navMenu: '#333333', // Light gray for the menu items
      },
    },
  },
  plugins: [],
};
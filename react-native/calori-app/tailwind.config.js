/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light theme
        light: {
          background: '#FFFFFF',
          text: '#000000',
          primary: '#007AFF',
        },
        // Dark theme
        dark: {
          background: '#1C1C1E',
          text: '#FFFFFF',
          primary: '#0A84FF',
        },
        // Christmas theme
        christmas: {
          background: '#0C3823',
          text: '#FFFFFF',
          primary: '#D42426',
          accent: '#23965F',
        },
      },
    },
  },
  plugins: [],
};

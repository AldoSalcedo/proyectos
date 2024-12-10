/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // colores personalizados para el tema
        dark: {
          text: "#ECEDEE",
          background: "#151718",
          tint: "#fff",
          icon: "#9BA1A6",
          tabIconDefault: "#9BA1A6",
          tabIconSelected: "#fff",
        },
        light: {
          text: "#11181C",
          background: "#fff",
          tint: "#0a7ea4",
          icon: "#687076",
          tabIconDefault: "#687076",
          tabIconSelected: "#0a7ea4",
        },
      },
    },
  },
  plugins: [],
};

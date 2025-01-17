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
          background: "#f5f5f5",
          surface: "#ffffff",
          text: "#000000",
          "text-secondary": "#666666",
          primary: "#007AFF",
          secondary: "#5856D6",
          accent: "#2ecc71",
          border: "#e0e0e0",
          error: "#ff4444",
          success: "#2ecc71",
        },
        // Dark theme
        dark: {
          background: "#1a1a1a",
          surface: "#2c2c2c",
          text: "#ffffff",
          "text-secondary": "#a0a0a0",
          primary: "#0A84FF",
          secondary: "#5E5CE6",
          accent: "#27ae60",
          border: "#404040",
          error: "#ff4444",
          success: "#27ae60",
        },
        // Christmas theme
        christmas: {
          background: "#2a4c2a",
          surface: "#1a331a",
          text: "#ffffff",
          "text-secondary": "#b8c9b8",
          primary: "#D42426",
          secondary: "#23965F",
          accent: "#ff4444",
          border: "#4c724c",
          error: "#ff4444",
          success: "#23965F",
        },
      },
    },
  },
  plugins: [],
};

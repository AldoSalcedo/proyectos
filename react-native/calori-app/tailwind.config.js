/** @type {import('tailwindcss').Config} */
const colors = {
  light: {
    primary: "#007AFF",
    background: "#FFFFFF",
    surface: "#F2F2F7",
    text: "#000000",
    "text-secondary": "#6B7280",
    border: "#E5E5EA",
    success: "#34C759",
    error: "#FF3B30",
  },
  dark: {
    primary: "#0A84FF",
    background: "#000000",
    surface: "#1C1C1E",
    text: "#FFFFFF",
    "text-secondary": "#8E8E93",
    border: "#38383A",
    success: "#32D74B",
    error: "#FF453A",
  },
};

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
};

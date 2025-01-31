/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        text: "var(--color-text)",
        "text-secondary": "var(--color-text-secondary)",
        border: "var(--color-border)",
        success: "var(--color-success)",
        error: "var(--color-error)",
      },
    },
  },
  plugins: [],
};

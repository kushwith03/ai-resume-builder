/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        saasdim: {
          "primary": "#8b5cf6",
          "secondary": "#a78bfa",
          "accent": "#c4b5fd",
          "neutral": "#1f2937",
          "base-100": "#0f172a", // Deep slate background
          "base-200": "#1e293b", // Lighter slate for cards
          "base-300": "#334155", // Hover states/borders
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
      "light",
      "dark",
    ],
  },
};
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores del briefing
        'brand-bg': '#f7f6f3',
        'brand-surface': '#ffffff',
        'brand-accent': '#2d6a4f',
        'brand-border': '#e0dfd9',
      },
    },
  },
  plugins: [],
}

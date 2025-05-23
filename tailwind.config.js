/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        celadon: "#ACE1AF",
        lincolngreen: "#478778",
        lincolngreenlighter: "#439985",
        cream: "#f9f1f0",
        lincolngreendarker: "#36695d"
      }
    },
  },
  plugins: [],
}


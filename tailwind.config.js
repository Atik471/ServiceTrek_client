/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(3,133,62)",
      },
      fontFamily: {
        sans: ["Poppins", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

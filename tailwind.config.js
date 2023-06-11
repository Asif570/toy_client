/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    fontFamily: {
      head: "Nunito",
    },
    colors: {
      primery: "#757efa",
      light: "#E9F8FF",
      dark: "#242222",
      white: "#ffffff",
      red: "#ff0000",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};

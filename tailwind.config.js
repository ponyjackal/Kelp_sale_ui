/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      blue: "#1fb6ff",
      violet: "#7f00ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
      "green-1": "#46d6a2",
      "green-2": "#36c692",
      "gray-2": "#f1f1f0",
      "gray-1": "#cdcece",
      white: "#ffffff",
      red: "#ff3333",
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      serif: ["Poppins", "sans-serif"],
      helvetica: ["Poppins", "sans-serif"],
    },
    screens: {
      xxxs: "320px",
      xxs: "375px",
      xs: "425px",
      ...defaultTheme.screens,
    },
    extend: {
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

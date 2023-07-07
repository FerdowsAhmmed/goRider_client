/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3B3B3B",
        secondary: "#FECC18",
        tertiary: "#64748b",
        danger: "#d9534f",
        warning: "#fabb47",
        success: "#5cb85c",
        light: "#f8fafc",
        dark: "#020617",
      },
      
    },
  },
  plugins: [require("daisyui")],
};

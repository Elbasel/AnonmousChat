const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],

  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    colors: {
      colors,
    },
    extend: {
      backgroundImage: {
        "dark-bg":
          "url('https://images.unsplash.com/photo-1513569771920-c9e1d31714af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80')",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

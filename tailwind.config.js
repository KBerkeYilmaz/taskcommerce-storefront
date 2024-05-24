/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx,js,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, scale: 0.3 },
          "100%": { opacity: 1, scale: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        fadeInFast: "fadeIn 0.09s ease-in-out",
      },
    },
  },
  plugins: [],
};

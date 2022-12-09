/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "2px 2px 3px 2px rgba(194,194,194,0.35)",
      },
      colors: {
        "dark-blue": "hsl(209, 23%, 22%)",
        "very-dark-blue-D": "hsl(207, 26%, 17%)",
        "very-dark-blue-L": "hsl(200, 15%, 8%)",
        "dark-gray": "hsl(0, 0%, 52%)",
        "very-light-gray": "hsl(0, 0%, 98%)",
      },
      width: {
        4.5: "1.125rem",
        68: "17rem",
        128: "30rem",
      },
      height: {
        22: "5.5rem",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "hsl(209, 23%, 22%)",
        "very-dark-blue-D": "hsl(207, 26%, 17%)",
        "very-dark-blue-L": "hsl(200, 15%, 8%)",
        "dark-gray": "hsl(0, 0%, 52%)",
        "very-light-gray": "hsl(0, 0%, 98%)",
      },
      width: {
        4.5: "1.125rem",
      },
      height: {
        22: "5.5rem",
      },
    },
  },
  plugins: [],
};

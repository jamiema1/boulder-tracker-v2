/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPrimary: "#8ECAE6",
        customSecondary: "#219EBC",
        customDark: "#023047",
        textColor: {
          primary: '#219EBC',
        }
      },
    },
  },
  plugins: [],
}


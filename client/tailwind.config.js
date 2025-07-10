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
        customLight: "#FCFCFC",
        customGrayDark: "#EDEDE9",
        customPrimary: "#C6EDFF",
        customSecondary: "#219EBC",
        customDark: "#023047",
        customSuccess: "#02C037",
        customFailure: "#FF5454"
        // textColor: {
        //   primary: '#219EBC',
        // }
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        // 'montserrat-light': ['Montserrat', 'sans-serif'],
        // 'montserrat-medium': ['Montserrat Medium', 'sans-serif'], 
        // 'montserrat-semibold': ['Montserrat SemiBold', 'sans-serif'],
        // 'montserrat-bold': ['Montserrat Bold', 'sans-serif'],
      }
    },
  },
  plugins: [],
}


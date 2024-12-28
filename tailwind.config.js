/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.pug",
    "./src/**/*.vue",
    "./src/**/*.js",
    "./src/**/*.ts",
    "./src/**/*.jsx",
    "./src/**/*.html",
  ],
  // purge: ["./src/**/*.pug", "./src/**/*.vue", "./src/**/*.html"],
  // darkMode: false,
  theme: {
    extend: {},
    fontFamily: {
      robot: ["Roboto", "sans-serif"],
      stamp: ["Stamper", "sans-serif"],
    },
    colors: {
      white: "#fff",
      primary: "#FBBF51",
      light: "#FFF6E3",
      secondary: "#AECA83",
      text: "#2D2527",
      "svetlo-roz": "#FFECEC",
      "ne-akzent": "#AA98A6",
    },
    screens: {
      lg: { max: "1200px" },

      md: { max: "991px" },

      td: { max: "756px" },

      sm: { max: "576px" },

      xsm: { max: "380px" },
    },
  },
  plugins: [],
};

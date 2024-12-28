const isProduction = process.env.NODE_ENV === "production";

export default {
  syntax: "postcss-scss",
  plugins: {
    "postcss-nested": {},
    autoprefixer: {},
    "postcss-preset-env": {},
    "postcss-simple-vars": {},
    "postcss-mixins": {},
    "postcss-hexrgba": {},
    "postcss-functions": {},
    "postcss-import": {},
    "tailwindcss/nesting": {},
    tailwindcss: {},
    ...(isProduction ? { cssnano: {} } : {}),
  },
};

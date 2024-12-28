import path from "path";

import { VueLoaderPlugin } from "vue-loader";
import webpack from "webpack";

export default {
  plugins: [
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
  ],
  entry: {
    main: "./src/js/index.ts",
  },

  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "/",
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          enforce: true,
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.pug$/,
        oneOf: [
          // это применяется к `<template lang="pug">` в компонентах Vue
          {
            resourceQuery: /^\?vue/,
            use: ["vue-pug-loader"],
          },
          // это применяется к импортам pug внутри JavaScript
          {
            use: ["raw-loader", "vue-pug-loader"],
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { modules: false }]],
          },
        },
      },
    ],
  },

  resolve: {
    alias: {
      "%modules%": path.resolve("./src/blocks/modules"),
      "%components%": path.resolve("./src/blocks/components"),
      "%vue%": path.resolve("./vue"),
      "%classes%": path.resolve("./src/js/classes"),
      "%common%": path.resolve("./src/js/common"),
    },
    extensions: [".*", ".js", ".vue", ".json", ".ts", ".tsx"],
  },
};

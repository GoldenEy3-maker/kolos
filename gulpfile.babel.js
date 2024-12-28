"use strict";

import gulp from "gulp";
import del from "del";
import favicons from "gulp-favicons";
import debug from "gulp-debug";
import browsersync from "browser-sync";
import gulpif from "gulp-if";
import imagemin from "gulp-imagemin";
import imageminPngquant from "imagemin-pngquant";
import imageminZopfli from "imagemin-zopfli";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminGiflossy from "imagemin-giflossy";
import imageminWebp from "imagemin-webp";
import newer from "gulp-newer";
import webpack from "webpack";
import webpackConfig from "./webpack.config.js";
import webpackStream from "webpack-stream";
import svg from "gulp-svg-sprite";
import rename from "gulp-rename";
import sourcemaps from "gulp-sourcemaps";
import plumber from "gulp-plumber";
import postcss from "gulp-postcss";
import replace from "gulp-replace";
import pug from "gulp-pug";

const paths = {
  views: {
    src: ["./src/views/index.pug", "./src/views/pages/**/*.pug"],
    dist: "./dist/",
    watch: ["./src/blocks/**/*.pug", "./src/views/**/*.pug"],
  },
  styles: {
    src: "./src/styles/main.{scss,sass,css}",
    dist: "./dist/styles/",
    watch: [
      "./src/blocks/**/*.{scss,sass,css}",
      "./src/styles/**/*.{scss,sass,css}",
      "./src/blocks/**/*.pug",
      "./src/views/**/*.pug",
      "./src/vue/**/*.vue",
    ],
  },
  scripts: {
    src: "./src/js/index.ts",
    dist: "./dist/js/",
    watch: [
      "./src/blocks/**/*.js",
      "./src/blocks/**/*.ts",
      "./src/js/**/*.js",
      "./src/js/**/*.ts",
      "./src/vue/**/*.js",
      "./src/vue/**/*.vue",
      "./src/vue/**/*.ts",
    ],
  },
  mock: {
    src: "./src/mock/**/*.json",
    dist: "./dist/mock/",
    watch: ["./src/mock/**/*.json"],
  },

  images: {
    src: [
      "./src/img/**/*.{jpg,jpeg,png,gif,tiff,webp,svg,icon,mp4}",
      "!./src/img/favicon/*.{jpg,jpeg,png,gif,webp,tiff}",
    ],
    dist: "./dist/img/",
    watch: "./src/img/**/*.{jpg,jpeg,png,gif,svg,mp4}",
  },
  webp: {
    src: [
      "./src/img/**/*.{jpg,jpeg,png,tiff}",
      "!./src/img/favicon/*.{jpg,jpeg,png,gif}",
    ],
    dist: "./dist/img/",
    watch: [
      "./src/img/**/*.{jpg,jpeg,png,tiff}",
      "!./src/img/favicon.{jpg,jpeg,png,gif}",
    ],
  },
  sprites: {
    src: "./src/img/svg/*.svg",
    dist: "./dist/img/sprites/",
    watch: "./src/img/svg/*.svg",
  },
  fonts: {
    src: "./src/fonts/**/*.{woff,woff2}",
    dist: "./dist/fonts/",
    watch: "./src/fonts/**/*.{woff,woff2}",
  },
  favicons: {
    src: "./src/img/favicon/*.{jpg,jpeg,png,gif,tiff}",
    dist: "./dist/img/favicons/",
  },
  manifest: {
    src: "./src/site.webmanifest",
    dist: "./dist/",
  },
  privacyPolice: {
    src: "./src/privacy-police/*.pdf",
    dist: "./dist/privacy-police/",
  },
  gzip: {
    src: "./src/.htaccess",
    dist: "./dist/",
  },
};

gulp.task("clean", () => {
  return del(["./dist/*"]);
});

gulp.task("manifest", () => {
  return gulp.src(paths.manifest.src).pipe(gulp.dest(paths.manifest.dist));
});

gulp.task("privacy-police", () => {
  return gulp
    .src(paths.privacyPolice.src)
    .pipe(gulp.dest(paths.privacyPolice.dist));
});

gulp.task("favicons", () => {
  return gulp
    .src(paths.favicons.src)
    .pipe(
      favicons({
        icons: {
          appleIcon: true,
          favicons: true,
          online: false,
          appleStartup: false,
          android: false,
          firefox: false,
          yandex: false,
          windows: false,
          coast: false,
        },
      }),
    )
    .pipe(gulp.dest(paths.favicons.dist))
    .pipe(
      debug({
        title: "Favicons",
      }),
    );
});

gulp.task("fonts", () => {
  return gulp
    .src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dist))
    .pipe(
      debug({
        title: "Fonts",
      }),
    );
});

gulp.task("gzip", () => {
  return gulp
    .src(paths.gzip.src)
    .pipe(gulp.dest(paths.gzip.dist))
    .pipe(
      debug({
        title: "GZIP config",
      }),
    );
});

const isProduction = process.env.NODE_ENV === "production";

gulp.task("images", () => {
  return gulp
    .src(paths.images.src)
    .pipe(newer(paths.images.dist))
    .pipe(
      gulpif(
        isProduction,
        imagemin([
          imageminGiflossy({
            optimizationLevel: 3,
            optimize: 3,
            lossy: 2,
          }),
          imageminPngquant({
            speed: 5,
            quality: [0.6, 0.8],
          }),
          imageminZopfli({
            more: true,
          }),
          imageminMozjpeg({
            progressive: true,
            quality: 90,
          }),
          imageminWebp({ quality: 90 }),
          imagemin.svgo({
            plugins: [
              { removeViewBox: false },
              { removeUnusedNS: false },
              { removeUselessStrokeAndFill: false },
              { cleanupIDs: false },
              { removeComments: true },
              { removeEmptyAttrs: true },
              { removeEmptyText: true },
              { collapseGroups: true },
            ],
          }),
        ]),
      ),
    )
    .pipe(gulp.dest(paths.images.dist))
    .pipe(
      debug({
        title: "Images",
      }),
    )
    .pipe(browsersync.stream());
});

webpackConfig.mode = isProduction ? "production" : "development";
webpackConfig.devtool = isProduction ? false : "source-map";

gulp.task("mock", () => {
  return gulp
    .src(paths.mock.src)
    .pipe(gulp.dest(paths.mock.dist))
    .pipe(
      debug({
        title: "MOCK JS files",
      }),
    )
    .on("end", browsersync.reload);
});

gulp.task("scripts", () => {
  return gulp
    .src(paths.scripts.src)
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(
      gulpif(
        isProduction,
        rename({
          suffix: ".min",
        }),
      ),
    )
    .pipe(gulp.dest(paths.scripts.dist))
    .pipe(
      debug({
        title: "JS files",
      }),
    )

    .pipe(browsersync.stream());

  // return tsProject.src()
  // .pipe(webpackStream(webpackConfig), webpack)
  // .pipe(tsProject()).js
  // .pipe(gulpif(production, rename({
  //     suffix: ".min"
  // })))
  // .pipe(gulp.dest(paths.scripts.dist))
  // .pipe(debug({
  //     "title": "JS files"
  // }))
  // .pipe(browsersync.stream());
});

gulp.task("serve", () => {
  browsersync.init({
    server: "./dist/",
    port: 4000,
    notify: true,
    ghostMode: false,
  });

  gulp.watch(paths.views.watch, gulp.parallel("views"));
  gulp.watch(paths.styles.watch, gulp.parallel("styles"));
  gulp.watch(paths.scripts.watch, gulp.parallel("scripts"));
  gulp.watch(paths.sprites.watch, gulp.parallel("sprites"));
  gulp.watch(paths.images.watch, gulp.parallel("images"));
  gulp.watch(paths.fonts.watch, gulp.parallel("fonts"));
});

gulp.task("sprites", () => {
  return gulp
    .src(paths.sprites.src)
    .pipe(
      svg({
        shape: {
          dest: "intermediate-svg",
        },
        mode: {
          stack: {
            sprite: "../sprite.svg",
          },
        },
      }),
    )
    .pipe(gulp.dest(paths.sprites.dist))
    .pipe(
      debug({
        title: "Sprites",
      }),
    )
    .on("end", browsersync.reload);
});

gulp.task("styles", () => {
  return gulp
    .src(paths.styles.src)
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(plumber())
    .pipe(postcss())
    .pipe(
      gulpif(
        isProduction,
        rename({
          suffix: ".min",
        }),
      ),
    )
    .pipe(plumber.stop())
    .pipe(gulpif(!isProduction, sourcemaps.write("./maps/")))
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(
      debug({
        title: "CSS files",
      }),
    )
    .on("end", browsersync.reload);
});

gulp.task("views", () => {
  return gulp
    .src(paths.views.src)
    .pipe(
      pug({
        pretty: true,
      }),
    )
    .pipe(gulpif(isProduction, replace(".css", ".min.css")))
    .pipe(gulpif(isProduction, replace(".js", ".min.js")))
    .pipe(gulp.dest(paths.views.dist))
    .pipe(browsersync.stream());
});

export const development = gulp.series(
  "clean",
  gulp.parallel([
    "views",
    "styles",
    "scripts",
    "mock",
    "images",
    "sprites",
    "fonts",
    "favicons",
    "manifest",
    "privacy-police",
  ]),
  gulp.parallel("serve"),
);

export const prod = gulp.series(
  "clean",
  gulp.series([
    "views",
    "styles",
    "scripts",
    "images",
    "sprites",
    "fonts",
    "favicons",
    "manifest",
    "privacy-police",
    "gzip",
  ]),
);

export default development;

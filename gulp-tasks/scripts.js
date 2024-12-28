"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import gulpif from "gulp-if";
import rename from "gulp-rename";
import browsersync from "browser-sync";
import debug from "gulp-debug";
import yargs from "yargs";
// import ts from "gulp-typescript"
// const tsProject = ts.createProject("tsconfig.json")

const webpackConfig = require("../webpack.config.js"),
  argv = yargs.argv,
  production = !!argv.production;

webpackConfig.mode = production ? "production" : "development";

"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import gulpif from "gulp-if";

import browsersync from "browser-sync";
import debug from "gulp-debug";
import yargs from "yargs";

const argv = yargs.argv,
  production = !!argv.production;

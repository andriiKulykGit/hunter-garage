"use strict"

const gulp = require("gulp")

require("./gulp/dev.js")
require("./gulp/prod.js")

gulp.task("default", gulp.series("clean:dev", "fonts:dev", gulp.parallel("pug:dev", "files:dev", "sass:dev", "images:dev", "js:dev"), gulp.parallel("server:dev", "watch:dev")))

gulp.task("prod", gulp.series("clean:prod", "fonts:prod", gulp.parallel("pug:prod", "files:prod", "sass:prod", "images:prod", "js:prod")))

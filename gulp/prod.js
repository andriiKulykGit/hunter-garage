const autoprefixer = require("gulp-autoprefixer")
const babel = require("gulp-babel")
const changed = require("gulp-changed")
const clean = require("gulp-clean")
const csso = require("gulp-csso")
const fonter = require("gulp-fonter-fix")
const fs = require("fs")
const groupMedia = require("gulp-group-css-media-queries")
const gulp = require("gulp")
const imagemin = require("gulp-imagemin")
const imageminWebp = require("imagemin-webp")
const notify = require("gulp-notify")
const plumber = require("gulp-plumber")
const prettier = require("@bdchauvette/gulp-prettier")
const pug = require("gulp-pug")
const rename = require("gulp-rename")
const replace = require("gulp-replace")
const sass = require("gulp-sass")(require("sass"))
const sassGlob = require("gulp-sass-glob")
const svgmin = require("gulp-svgmin")
const ttf2woff2 = require("gulp-ttf2woff2")
const webpack = require("webpack-stream")

gulp.task("clean:prod", function(done) {
	if (fs.existsSync("./prod/")) {
		return gulp.src("./prod/", { read: false }).pipe(clean({ force: true }))
	}
	done()
})

const plumberNotify = title => {
	return {
		errorHandler: notify.onError({
			title: title,
			message: "Error <%= error.message %>",
			sound: false,
		}),
	}
}

gulp.task("pug:prod", function() {
	return gulp
		.src(["./src/pug/**/*.pug", "!./**/blocks/**/*.*"])
		.pipe(changed("./prod/", { hasChanged: changed.compareContents }))
		.pipe(
			plumber(
				notify.onError({
					title: "PUG",
					message: "Error: <%= error.message %>",
				})
			)
		)
		.pipe(
			pug({
				pretty: true,
			})
		)
		.pipe(
			prettier({
				tabWidth: 4,
				useTabs: true,
				printWidth: 182,
				trailingComma: "es5",
				bracketSpacing: false,
			})
		)
		.pipe(gulp.dest("./prod/"))
})

gulp.task("files:prod", function() {
	return gulp
		.src("./src/files/**/*")
		.pipe(changed("./prod/files/"))
		.pipe(gulp.dest("./prod/files/"))
})

gulp.task("sass:prod", function() {
	return gulp
		.src("./src/scss/*.scss")
		.pipe(changed("./prod/css/"))
		.pipe(plumber(plumberNotify("SCSS")))
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(groupMedia())
		.pipe(replace(/(['"]?)(\.\.\/)+(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi, "$1$2$3$4$6$1"))
		.pipe(csso())
		.pipe(gulp.dest("./prod/css/"))
})

gulp.task("otfToTtf:prod", () => {
	return gulp
		.src(`./src/fonts/*.otf`, {})
		.pipe(
			fonter({
				formats: ["ttf"],
			})
		)
		.pipe(gulp.dest(`./src/fonts/`))
		.pipe(gulp.dest(`./prod/fonts/`))
		.pipe(
			plumber(
				notify.onError({
					title: "FONTS",
					message: "Error: <%= error.message %>. File: <%= file.relative %>!",
				})
			)
		)
})

gulp.task("ttfToWoff:prod", () => {
	return gulp
		.src(`./src/fonts/*.ttf`)
		.pipe(ttf2woff2())
		.pipe(gulp.dest(`./prod/fonts/`))
		.pipe(
			plumber(
				notify.onError({
					title: "FONTS",
					message: "Error: <%= error.message %>",
				})
			)
		)
})

gulp.task("fonts:prod", gulp.series("otfToTtf:prod", "ttfToWoff:prod"))

const imgSrc = ["./src/img/**/*.png", "./src/img/**/*.jpg", "./src/img/**/*.jpeg", "!./src/img/**/*.svg", "!./src/img/favicons/**.*", "!./src/img/placeholder.png"]
gulp.task("images:prod", function() {
	return (
		gulp
			// Webp
			.src(imgSrc)
			.pipe(changed("./prod/img/"))
			.pipe(
				imagemin([
					imageminWebp({
						quality: 85,
					}),
				])
			)
			.pipe(rename({ extname: ".webp" }))
			.pipe(gulp.dest("./prod/img/"))
			// Other
			.pipe(gulp.src(["./src/img/**/*", "!./src/img/**/*.svg"]))
			.pipe(changed("./prod/img/"))
			.pipe(imagemin([imagemin.gifsicle({ interlaced: true }), imagemin.mozjpeg({ quality: 85, progressive: true }), imagemin.optipng({ optimizationLevel: 5 })], { verbose: true }))
			.pipe(gulp.dest("./prod/img/"))
			// Svg
			.pipe(gulp.src("./src/img/**/*.svg"))
			.pipe(changed("./prod/img/"))
			.pipe(svgmin())
			.pipe(gulp.dest("./prod/img/"))
	)
})

gulp.task("js:prod", function() {
	return gulp
		.src("./src/js/*.js")
		.pipe(changed("./prod/js/"))
		.pipe(plumber(plumberNotify("JS")))
		.pipe(babel())
		.pipe(webpack(require("../webpack.config.js")))
		.pipe(gulp.dest("./prod/js/"))
})

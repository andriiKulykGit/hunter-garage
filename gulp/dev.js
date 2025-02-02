// const sourceMaps = require("gulp-sourcemaps")
const autoprefixer = require("gulp-autoprefixer")
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
const server = require("gulp-server-livereload")
const svgmin = require("gulp-svgmin")
const ttf2woff2 = require("gulp-ttf2woff2")
const webpack = require("webpack-stream")

gulp.task("clean:dev", function(done) {
	if (fs.existsSync("./build/")) {
		return gulp.src("./build/", { read: false }).pipe(clean({ force: true }))
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

gulp.task("pug:dev", function() {
	return gulp
		.src(["./src/pug/**/*.pug", "!./**/blocks/**/*.*"])
		.pipe(changed("./build/", { hasChanged: changed.compareContents }))
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
		.pipe(prettier(require("./../.prettierrc")))
		.pipe(gulp.dest("./build/"))
})

gulp.task("files:dev", function() {
	return gulp
		.src("./src/files/**/*")
		.pipe(changed("./build/files/"))
		.pipe(gulp.dest("./build/files/"))
})

gulp.task("sass:dev", function() {
	return gulp
		.src("./src/scss/*.scss")
		.pipe(changed("./build/css/"))
		.pipe(plumber(plumberNotify("SCSS")))
		// .pipe(sourceMaps.init())
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(groupMedia())
		.pipe(replace(/(['"]?)(\.\.\/)+(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi, "$1$2$3$4$6$1"))
		// .pipe(sourceMaps.write())
		.pipe(csso())
		.pipe(gulp.dest("./build/css/"))
})

gulp.task("otfToTtf:dev", () => {
	return gulp
		.src(`./src/fonts/*.otf`, {})
		.pipe(
			fonter({
				formats: ["ttf"],
			})
		)
		.pipe(gulp.dest(`./src/fonts/`))
		.pipe(gulp.dest(`./build/fonts/`))
		.pipe(
			plumber(
				notify.onError({
					title: "FONTS",
					message: "Error: <%= error.message %>. File: <%= file.relative %>!",
				})
			)
		)
})

gulp.task("ttfToWoff:dev", () => {
	return gulp
		.src(`./src/fonts/*.ttf`)
		.pipe(ttf2woff2())
		.pipe(gulp.dest(`./build/fonts/`))
		.pipe(
			plumber(
				notify.onError({
					title: "FONTS",
					message: "Error: <%= error.message %>",
				})
			)
		)
})

gulp.task("fonts:dev", gulp.series("otfToTtf:dev", "ttfToWoff:dev"))

const imgSrc = ["./src/img/**/*.png", "./src/img/**/*.jpg", "./src/img/**/*.jpeg", "!./src/img/**/*.svg", "!./src/img/favicons/**.*", "!./src/img/placeholder.png"]

gulp.task("images:dev", function() {
	return (
		gulp
			// Webp
			.src(imgSrc)
			.pipe(changed("./build/img/"))
			.pipe(
				imagemin([
					imageminWebp({
						quality: 85,
					}),
				])
			)
			.pipe(rename({ extname: ".webp" }))
			.pipe(gulp.dest("./build/img/"))
			// Other
			.pipe(gulp.src(["./src/img/**/*", "!./src/img/**/*.svg"]))
			.pipe(changed("./build/img/"))
			.pipe(gulp.dest("./build/img/"))
			// Svg
			.pipe(gulp.src("./src/img/**/*.svg"))
			.pipe(changed("./build/img/"))
			.pipe(svgmin())
			.pipe(gulp.dest("./build/img/"))
	)
})

gulp.task("js:dev", function() {
	return gulp
		.src("./src/js/*.js")
		.pipe(changed("./build/js/"))
		.pipe(plumber(plumberNotify("JS")))
		.pipe(webpack(require("./../webpack.config.js")))
		.pipe(gulp.dest("./build/js/"))
})

const serverOptions = {
	// host: "",
	livereload: true,
	open: true,
}

gulp.task("server:dev", function() {
	return gulp.src("./build/").pipe(server(serverOptions))
})

gulp.task("watch:dev", function() {
	gulp.watch("./src/scss/**/*.scss", gulp.parallel("sass:dev"))
	gulp.watch(["./src/pug/**/*.pug", "./src/pug/**/*.json"], gulp.parallel("pug:dev"))
	gulp.watch("./src/img/**/*", gulp.parallel("images:dev"))
	gulp.watch("./src/files/**/*", gulp.parallel("files:dev"))
	gulp.watch("./src/js/**/*.js", gulp.parallel("js:dev"))
})

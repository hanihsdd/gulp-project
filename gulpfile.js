// ********************************
// Plugins
// ********************************

var gulp = require("gulp");
	// Sass compile to CSS
	sass = require("gulp-sass");
	// Sourcemaps for Sass
	sourcemaps = require("gulp-sourcemaps");
	// Autoprefixer
	autoprefixer = require("gulp-autoprefixer");
	// Browsersync for live changes
	browsersync = require("browser-sync").create();
	// Useref for JS and CSS concatenation
	useref = require("gulp-useref");
	// Uglify for minifying of JS
	uglify = require("gulp-uglify");
	// Gulp If for conditional tasks
	gulpIf = require("gulp-if");
	// CSSnano to minify CSS
	cssnano = require("gulp-cssnano");
	// Image minification
	imagemin = require("gulp-imagemin");
	// Cache
	cache = require("gulp-cache");
	// Cleaning / deleting no longer used files
	del = require("del");
	// Run sequence
	runSequence = require("run-sequence");


// ********************************
// Development Tasks
// ********************************


// Compile Sass
// ==============================

gulp.task("sass", function() {
	// return files with .scss in dir
	return gulp.src("app/scss/*.scss")
		// Initialise sourcemaps
		.pipe(sourcemaps.init())
		// Autoprefixer
		.pipe(autoprefixer())
		// compile sass to css
		.pipe(sass().on("error", sass.logError))
		// Write sourcemap to current working directory relative to output dir
		.pipe(sourcemaps.write("./"))
		// Outputs css to css folder
		.pipe(gulp.dest("app/css/"))
		// live reload browser
		.pipe(browsersync.reload({
			stream: true
		}))
});



// Run browsersync
// ==============================

gulp.task("browsersync", function() {
	browsersync.init({
		server: {
			baseDir: "app"
		}
	})
});



// Watch for changes with [ array of tasks to complete before watch ]
// ==============================

gulp.task("watch", ["browsersync", "sass"], function() {
		// Watch for changes in Sass and run Sass task
		gulp.watch("app/scss/**/*.scss", ["sass"]);
		// Watch for changes in HTML and reload browser
		gulp.watch("app/*.html", browsersync.reload);
		// Watch for changes in JS and reload browser
		gulp.watch("app/js/**/*.js", browsersync.reload);
});



// ********************************
// Optimization Tasks
// ********************************


// Concatenation / Minification of CSS & JS
// ===============================

gulp.task("useref", function() {
	return gulp.src("app/*.html")
		.pipe(useref())
		// Minify only if it's a JS file
		.pipe(gulpIf("*.js", uglify()))
		// Minify only if it's a CSS file
		.pipe(gulpIf("*.css", cssnano()))
		.pipe(gulp.dest("dist"))
});



// Image Optimization
// ===============================

gulp.task("imagemin", function() {
	return gulp.src("app/img/**/*.+(png|jpg|gif|svg")
	// Cache images that ran through imagemin
		.pipe(cache(imagemin()))
		.pipe(gulp.dest("dist/img"))
});



// Copy fonts to dist
// ===============================

gulp.task("fonts", function() {
	return gulp.src("app/fonts/**/*")
		.pipe(gulp.dest("dist/fonts"))
});



// Cleaning
// ===============================

gulp.task("clean", function() {
	return del.sync("dist").then(function(cb) {
			return cache.clearAll(cb);
	});
});


// Cleaning task that is run with gulp clean:dist
// Will delete the dist folder whenever its run
gulp.task("clean:dist", function() {
	return del.sync(["dist/**/*", "!dist/img", "!dist/img/**/*"]);
});



// ********************************
// Build Sequences
// ********************************


// Default development — run with "gulp"
// ===============================
gulp.task("default", function(cb){
	runSequence(["sass", "browsersync", "watch"], 
		cb
	)
})



// Build task — run with "gulp build"
// ===============================
gulp.task("build", function(cb){
	runSequence("clean:dist",
		["sass", "useref", "imagemin", "fonts"], 
		cb
	)
})





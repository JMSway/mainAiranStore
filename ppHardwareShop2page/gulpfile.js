const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');

const paths = {
	source: 'src/',
	destination: 'public/'
};

function styles() {
	return src(paths.source + 'scss/style.scss')
		.pipe(scss({ outputStyle: 'compressed' }).on('error', scss.logError))
		.pipe(concat('style.min.css'))
		.pipe(dest(paths.source + 'css'))
		.pipe(browserSync.stream());
}

function scripts() {
	return src([paths.source + 'js/main.js'])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest(paths.source + 'js'))
		.pipe(browserSync.stream());
}

function images() {
	return src(paths.source + 'img/**/*')
		.pipe(imagemin([
			imageminMozjpeg({ quality: 75, progressive: true }),
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: false },
					{ cleanupIDs: false }
				]
			})
		]))
		.pipe(dest(paths.destination + 'img/'));
}

function watching() {
	watch([paths.source + 'scss/**/*.scss'], styles);
	watch([paths.source + 'js/main.js'], scripts);
	watch([paths.source + 'img/**/*'], images);
	watch([paths.source + '*.html']).on('change', browserSync.reload);
}

function browsersync() {
	browserSync.init({
		server: {
			baseDir: paths.source,
		},
	});
}

function building() {
	return src([
		paths.source + 'css/style.min.css',
		paths.source + 'js/main.min.js',
		paths.source + 'fonts/**/*',
		paths.source + '**/*.html'
	], { base: paths.source })
		.pipe(dest(paths.destination));
}

function cleanDist() {
	return src(paths.destination, { allowEmpty: true })
		.pipe(clean());
}

exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.watching = watching;
exports.browsersync = browsersync;
exports.build = series(cleanDist, parallel(styles, scripts, images), building);
exports.default = parallel(styles, scripts, images, browsersync, watching);
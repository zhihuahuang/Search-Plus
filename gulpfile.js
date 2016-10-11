var browserify = require('browserify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var gulp = require('gulp');
var concat = require('gulp-concat');

var htmlmin = require('gulp-htmlmin');
var stylus = require('gulp-stylus');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');

var htmlOptions = {
    removeComments: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true
};

gulp.task('minify-html', function () {
    gulp.src('src/**.{html,php}')
        .pipe(htmlmin(htmlOptions))
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', function () {
    var task = gulp.src(['node_modules/normalize.css/normalize.css', 'src/css/style.styl'])
        .pipe(stylus())
        .pipe(autoprefixer());
    
    if (!isDebug) {
        task.pipe(cleanCSS());
    }
    
    task.pipe(concat('style.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-js', function () {
    var task = browserify()
        .add('src/js/main.js')
        .bundle()
        .on('error', function(err) {
            console.log(err);
        })
        .pipe(source('main.js'))
        .pipe(buffer());
    
    if (!isDebug) {
        task.pipe(uglify({
            compress: {
                drop_console: true
            }
        }));
    }

    task.pipe(gulp.dest('dist/js'));
});

gulp.task('minify-json', function () {
    gulp.src('src/data/*.json')
        .pipe(gulp.dest('dist/data'));
});

gulp.task('minify-image', function () {
    gulp.src('src/image/**.{jpg,png,gif,svg}')
        .pipe(gulp.dest('dist/image'));
});

gulp.task('copy', function () {
    gulp.src('node_modules/async/dist/async.min.js')
        .pipe(gulp.dest('dist/js'));
    
    gulp.src('src/*.ico')
        .pipe(gulp.dest('dist'));
});

var isDebug = false;

gulp.task('release', function() {
    isDebug = false;
    
    gulp.start(['minify-html', 'minify-css', 'minify-js', 'minify-json', 'minify-image', 'copy']);
});

gulp.task('debug', function() {
    isDebug = true;
    
    gulp.start(['minify-html', 'minify-css', 'minify-js', 'minify-json', 'minify-image', 'copy']); 
});

gulp.task('watch', function() {
    gulp.watch('src/*/*', ['debug']);
});

gulp.task('default', ['debug']);
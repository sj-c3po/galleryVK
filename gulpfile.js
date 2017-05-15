let
    gulp = require('gulp'),
    size = require('gulp-size'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssnano'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer')
;


let directory_path = 'src/js/libs/';
let scripts = [
    directory_path + 'jquery-1.11.2.min.js',
    directory_path + 'underscore.js',
    directory_path + 'backbone.js',
    directory_path + 'backbone.marionette.js',
    directory_path + 'require.js'
];

gulp.task('concat-libs', () => {
    gulp.src(scripts)
        .pipe(concat('libs.js'))
        .pipe(uglify())
        .pipe(size({showFiles:true}))
        .pipe(gulp.dest('dist'))
    ;
});

gulp.task('relocate-js', () => {
    gulp.src(['src/js/require-config.js', 'src/js/script.js', 'src/js/jstorage.js'])
        .pipe(size({showFiles:true}))
        .pipe(gulp.dest('dist'))
    ;
});

gulp.task('css', () => {
    gulp.src('src/scss/style.scss')
        .pipe(sass())
        .pipe(postcss([
            autoprefixer({ browsers: ['last 3 version'] })
        ]))
        .pipe(cssmin())
        .pipe(size({showFiles:true}))
        .pipe(gulp.dest('dist'))
        ;
});

gulp.task('build', ['concat-libs', 'relocate-js', 'css']);
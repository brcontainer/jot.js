const gulp = require('gulp');
const uglify = require('gulp-uglify')
const rename = require('gulp-rename');
const browserify = require('gulp-browserify');


gulp.task('default', ["minify"], () => {
    console.log('executed')
})

gulp.task('minify', () => {

    gulp.src("src/jot.js")
        .pipe(browserify({
            insertGlobals: false,
            debug: false
        }))
        .pipe(rename("jot.js"))
        .pipe(gulp.dest("dist/js"))

    // gulp.src("dist/js/jot.js")
    //     .pipe(uglify())
    //     .pipe(concat("jot.min.js"))
    //     .pipe(gulp.dest("./dist/js"))
})
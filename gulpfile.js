const gulp = require('gulp');
const path = require('path');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const htmlclean = require('gulp-htmlclean');
const imagemin = require('gulp-imagemin');

// 压缩 public 目录 css
gulp.task('clean-css', function() {
    return gulp.src('./public/**/*.css')
        .pipe(cleanCSS({
            rebase: false
        }))
        .pipe(gulp.dest('./public'));
});
// 压缩 public 目录 html
gulp.task('minify-html', function() {
    return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
             removeComments: true,
             minifyJS: true,
             minifyCSS: true,
             minifyURLs: true,
        }))
        .pipe(gulp.dest('./public'))
});
// 压缩 public 目录 js
gulp.task('minify-js', function() {
    return gulp.src('./public/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});
// 压缩图片任务
function compressImgsFolder(imgFolder='.') {
    return function () {
        return gulp.src(path.join(imgFolder, '/**/*.{png,jpg,gif,svg}'))
            // imagemin Usage at https://github.com/sindresorhus/gulp-imagemin#user-content-options
            .pipe(imagemin([
                    imagemin.gifsicle({interlaced: true}),  // gif 转为交错格式
                    imagemin.jpegtran({progressive: true}), // jpeg 转为渐进式
                    imagemin.optipng({optimizationLevel: 4}),
                    imagemin.svgo({floatPrecision: 1}) // https://github.com/svg/svgo/issues/171
                ], {verbose: false}
            ))
            .pipe(gulp.dest(imgFolder))
    }
}
gulp.task('minify-imgs', compressImgsFolder('./public/images/'));
gulp.task('minify-postImgs', compressImgsFolder('./public/wiki/'));
// 执行 gulp 命令时执行的任务
gulp.task('default', [
    'minify-html', 'clean-css', 'minify-js',
    'minify-imgs', 'minify-postImgs'
]);

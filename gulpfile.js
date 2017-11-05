const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mailer = require("./mail")
gulp.task('lint', () => {
    return gulp
        .src(['code/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format(function (info) {
            return `You have ${info.errorCount} ESLint error and ${info.warningCount} ESLint warnings in your complete code`;
        }, (results) => {
            console.log(results);
            mailer(results);
        }));
});
gulp.task('default', ['lint'], function (results) {
    console.log("Gulp task complete.");
});
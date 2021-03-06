/* eslint-env node */
var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;

gulp.task("default", ["browser-sync", "watch"]);
gulp.task("browser-sync", function(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

});

gulp.task("watch", function(){
    gulp.watch(["index.html", "CSS/*.css", "script/*.js"], reload);
});




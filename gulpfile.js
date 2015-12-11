/**
 * Created by iamchenxin on 15-12-8.
 */

var gulp = require("gulp");
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");

var babel_options = {
    presets: ['es2015',"stage-0",'react']
};
//    "plugins": ["transform-class-properties","transform-async-to-generator","syntax-async-functions","transform-regenerator"]

function Log(txt){
    console.log(txt);
}


gulp.task("ts",function(){
    Log(" compile ts ....");
    var rt = gulp.src("src/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel(babel_options))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dst"));

    return rt;
});
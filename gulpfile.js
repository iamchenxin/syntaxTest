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
  return stdGulpTrans('src','dst');
});


function stdGulpTrans(src, dst) {
  var sourceRoot = path.join(__dirname, src);
  var srcPath = [src+'/**/*.js'];
  return gulp
    .src(srcPath)
    .pipe(sourcemaps.init())
    .pipe(babel({
      'presets': ['es2015', 'stage-0'],
      'plugins': ['transform-flow-strip-types']
    }) )
    .pipe(sourcemaps.write('.', {
      includeContent: true, sourceRoot: sourceRoot, debug:true
    }))
    .pipe(gulp.dest(dst));
}

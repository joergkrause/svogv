/// <binding AfterBuild='default' Clean='clean' />
/**

 Gulpfile.js, Build & Pack processing for debug and test releases.

 Author: Joerg Krause <joerg@krause.net>

 Note: The final packaging process for production is made using WebPack. Gulp is more flexible and has more 
       opportunities while debugging, WebPack is more powerful and has faster loading mechanisms than systemjs 
       used in the gulpfile procdure. 

*/

var gulp = require('gulp');                                 // Build tool
var uglify = require('gulp-uglify');                        // minify JS
var uglifycss = require('gulp-uglifycss');                  // minify CSS
var htmlmin = require('gulp-htmlmin');                      // minify HTML
var ts = require('gulp-typescript');                        // transpile TS
var remHtmlCom = require('gulp-remove-html-comments');      // Remove comments
var sass = require('gulp-sass');                            // transpile SASS
var del = require('del');                                   // helper to delete paths
var flatten = require('gulp-flatten');                      // flat paths to re-arrange in the wwwroot target
var print = require('gulp-print');                          // output helper
var systemBuilder = require('systemjs-builder');            // create a rx bundle because the provided did not work

// from Github structure copy static files to root/dist/demo and execute there
var upPath = "../../dist/";

// The project's structure
var paths = {
  root: upPath + "demo/",
  assets: upPath + "demo/assets/",
  views: upPath + "demo/views/",
  bower: "./bower_components/",
  npm: "./node_modules/",
  app: "./Client/App/"
};

gulp.task('clean:assets', function (cb) {
  return del(paths.assets, { force: true});
});
gulp.task('clean:views', function (cb) {
  return del(paths.views, { force: true});
});
gulp.task('clean:views:index', function (cb) {
  return del(paths.root + "index.html", { force: true});
});
gulp.task('clean', ['clean:assets', 'clean:views', 'clean:views:index']);

gulp.task('copy:js', function () {
  console.log("Assets target: " + paths.assets + 'js/lib');
  return gulp.src([
              paths.bower + 'jquery/dist/jquery.js',
              paths.bower + 'bootstrap/dist/js/bootstrap.js',
              paths.bower + 'tether/dist/js/tether.js',
              paths.npm + 'core-js/client/*.js',
              paths.npm + 'zone.js/dist/*.js',
              paths.npm + 'reflect-metadata/reflect.js',
              paths.npm + 'systemjs/dist/*.js',
              '!/**/*.min.js' // we minify everything by ourselves
            ])
            //.pipe(uglify())
            .pipe(gulp.dest(paths.assets + 'js/lib'));
});

// This is a simple loader while debugging without going through the WebPack hassle
gulp.task('copy:systemjs', function () {
  return gulp.src('./Client/systemjs.config.js')
            .pipe(gulp.dest(paths.assets + 'js'));
});

gulp.task('copy:angular', function () {
  return gulp.src([
                    paths.npm + '@angular/**/Bundles/*.umd.js',
              '!' + paths.npm + '@angular/**/Bundles/*-testing.umd.js'
              ])
              //.pipe(uglify())
              .pipe(gulp.dest(paths.assets + 'js/lib/@angular'));
});

gulp.task('copy:svogv', function () {
  return gulp.src([upPath + 'svogv/bundles/svogv.umd.js'])
             //.pipe(uglify())
             .pipe(gulp.dest(paths.assets + 'js/lib/svogv/bundles/'));
});

// Create RxJs bundle 
gulp.task('copy:rxjs', function () {
    var builder = new systemBuilder('./', {
        paths: {"rxjs/*": "node_modules/rxjs/*.js"},
        map: {"rxjs": "node_modules/rxjs"},
        packages: {"rxjs": {main: 'Rx.js', defaultExtension: "js"}}
    });
    // create the bundle we use from systemjs.config.js
    builder.bundle('rxjs', paths.assets + 'js/lib/rxjs/Bundles/Rx.min.js', {
        sourceMaps: false,
        minify: true,
        mangle: true
    });
});

// we write all css in sass 
gulp.task('sass', function () {
  return gulp.src([
    './Client/Styles/*.scss'
  ])
    .pipe(sass())
    .pipe(uglifycss())
    .pipe(gulp.dest(paths.assets + 'css'));
})
// except those css that's delivered "as is"
gulp.task('copy:css', function () {
  return gulp.src([
              paths.bower + 'font-awesome/css/font-awesome.css'
  ])
             .pipe(gulp.dest(paths.assets + 'css'));
});
// icons and symbols shall be fonts, never want to see a single GIF here
gulp.task('copy:fonts', function () {
  return gulp.src([
              paths.bower + 'bootstrap-sass/assets/fonts/*.*',
              paths.bower + 'font-awesome/fonts/*.*'
  ])
             .pipe(gulp.dest(paths.assets + 'fonts'));
});
// View HTML (component templates)
gulp.task('copy:views:templates', function () {
  console.log(paths.app + '**/*.html');
  return gulp.src([paths.app + '**/*.html'], { base: paths.app + 'Components/' })
             .pipe(print())
             .pipe(remHtmlCom())
             //.pipe(htmlmin({ collapseWhitespace: true }))
             .pipe(gulp.dest(paths.assets + 'js/app/Components/'));
});
gulp.task('copy:views:index', function () {
  return gulp.src(['./Client/Views/index.html'])
             .pipe(remHtmlCom())
             //.pipe(htmlmin({ collapseWhitespace: true }))
             .pipe(gulp.dest(paths.root));
});
gulp.task('copy:views', ['copy:views:index', 'copy:views:templates']);

gulp.task('copy:images', function () {
  return gulp.src(['./Client/Images/**/*.*'])
             .pipe(gulp.dest(paths.assets + 'img'));
});

gulp.task('copy', ['copy:svogv', 'copy:js', 'copy:rxjs', 'copy:angular', 'copy:systemjs', 'copy:css', 'copy:fonts', 'copy:views', 'copy:images']);

// configure TS separately
var tsProject = ts.createProject('tsconfig.json');

gulp.task('ts', function () {
  return tsProject.src()
                  .pipe(tsProject())
                  .js
                  .pipe(gulp.dest(paths.assets + 'js/app/'));

});

// watch the ts folders and start transpiler automatically on save
gulp.task('watchts', ['ts'], function () {
  gulp.watch(paths.app + '**/*.ts', ['ts']);
});

// complete setup
gulp.task('build', ['sass', 'ts', 'copy']);

// for convenience
gulp.task('default', ['build']);

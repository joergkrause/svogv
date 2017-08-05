import {task, watch, src, dest} from 'gulp';
import * as path from 'path';

import {
  SOURCE_ROOT, DEMO_ROOT, DIST_ROOT
} from '../constants';

import {
  execNodeTask, copyTask, sequenceTask, triggerLivereload
} from '../task_helpers';

var htmlmin = require('gulp-htmlmin');                      // minify HTML
var ts = require('gulp-typescript');                        // transpile TS
var sass = require('gulp-sass');                            // transpile SASS
var del = require('del');                                   // helper to delete paths
var systemBuilder = require('systemjs-builder');            // create a rx bundle because the provided did not work

// from Github structure copy static files to root/dist/demo and execute there

// The project's structure
var paths = {
  root: DIST_ROOT + "demo/",
  assets: DIST_ROOT + "demo/assets/",
  views: DIST_ROOT + "demo/views/",
  npm: DEMO_ROOT + "node_modules/",
  app: DEMO_ROOT + "Client/App/"
};

task('clean:assets', function (cb) {
  return del(paths.assets, { force: true});
});
task('clean:views', function (cb) {
  return del(paths.views, { force: true});
});
task('clean:views:index', function (cb) {
  return del(paths.root + 'index.html', { force: true});
});
task('clean', ['clean:assets', 'clean:views', 'clean:views:index']);

task('copy:js', function () {
  return src([
              paths.npm + 'jquery/dist/jquery.js',
              paths.npm + 'bootstrap/dist/js/bootstrap.js',
              paths.npm + 'tether/dist/js/tether.js',
              paths.npm + 'core-js/client/core.js',
              paths.npm + 'zone.js/dist/zone.js',
              paths.npm + 'reflect-metadata/reflect.js',
              paths.npm + 'systemjs/dist/system.js'
  ])
             .pipe(dest(paths.assets + 'js/lib'));
});

// This is a simple loader while debugging without going through the WebPack hassle
task('copy:systemjs', function () {
  return src(DEMO_ROOT + 'Client/systemjs.config.js').pipe(dest(paths.assets + 'js'));
});

task('copy:angular', function () {
  return src([
        paths.npm + '@angular/**/Bundles/*.umd.js',
  '!' + paths.npm + '@angular/**/Bundles/*-testing.umd.js'
  ]).pipe(dest(paths.assets + 'js/lib/@angular'));
});

task('copy:svogv', function () {
  return src(['./dist/svogv/bundles/svogv.umd.js']).pipe(dest(paths.assets + 'js/lib/svogv/bundles/'));
});

// Create RxJs bundle 
task('copy:rxjs', function () {
    var builder = new systemBuilder('./', {
        paths: {"rxjs/*": "node_modules/rxjs/*.js"},
        map: {"rxjs": "node_modules/rxjs"},
        packages: {"rxjs": {main: 'Rx.js', defaultExtension: "js"}}
    });
    // create the bundle we use from systemjs.config.js
    builder.bundle('rxjs', paths.assets + 'js/lib/rxjs/Bundles/Rx.min.js', {
        sourceMaps: true,
        minify: true,
        mangle: true
    });
});

// we write all css in sass 
task('sass', function () {
  return src([
    'Client/Styles/*.scss'
  ])
    .pipe(sass())
    .pipe(dest(paths.assets + 'css'));
})
// except those css that's delivered "as is"
task('copy:css', function () {
  return src([
              paths.npm + 'font-awesome/css/font-awesome.css'
  ])
             .pipe(dest(paths.assets + 'css'));
});
// icons and symbols shall be fonts, never want to see a single GIF here
task('copy:fonts', function () {
  return src([
              paths.npm + 'font-awesome/fonts/*.*'
  ])
             .pipe(dest(paths.assets + 'fonts'));
});
// View HTML (component templates)
task('copy:views:templates', function () {
  console.log(paths.app + '**/*.html');
  return src([paths.app + '**/*.html'], { base: paths.app + 'Components/' })
             .pipe(dest(paths.assets + 'js/app/Components/'));
});
task('copy:views:index', function () {
  return src([DEMO_ROOT + './Client/Views/index.html'])
             .pipe(dest(paths.root));
});
task('copy:views', ['copy:views:index', 'copy:views:templates']);

task('copy:images', function () {
  return src(['./Client/Images/**/*.*'])
             .pipe(dest(paths.assets + 'img'));
});

task('copy', ['copy:svogv', 'copy:js', 'copy:rxjs', 'copy:angular', 'copy:systemjs', 'copy:css', 'copy:fonts', 'copy:views', 'copy:images']);

// configure TS separately
var tsProject = ts.createProject(DEMO_ROOT + 'tsconfig.json');

task('ts', function () {
  return tsProject.src()
                  .pipe(tsProject())
                  .js
                  .pipe(dest(paths.assets + 'js/app/'));

});

// complete setup

task('demo', sequenceTask('clean', 'sass', 'ts', 'copy'));

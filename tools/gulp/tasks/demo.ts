import { task, src, dest } from 'gulp';
import * as path from 'path';

import {
  PROJECT_ROOT, DEMO_ROOT, DIST_DEMO_ROOT
} from '../constants';

import {
  tsBuildTask, sequenceTask
} from '../task_helpers';

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const print = require('gulp-print');
const htmlmin = require('gulp-htmlmin');                      // minify HTML
const cssmin = require('gulp-clean-css');
const ts = require('gulp-typescript');                        // transpile TS
const sass = require('gulp-sass');                            // transpile SASS
const del = require('del');                                   // helper to delete paths
const systemBuilder = require('systemjs-builder');            // create a rx bundle because the provided did not work

// from Github structure copy static files to root/dist/demo and execute there

task(':demo:clean:assets', function (cb) {
  return del(path.join(DIST_DEMO_ROOT, 'assets/'), { force: true });
});
task(':demo:clean:views', function (cb) {
  return del(path.join(DIST_DEMO_ROOT, 'views/'), { force: true });
});
task(':demo:clean:views:index', function (cb) {
  return del(path.join(DIST_DEMO_ROOT, 'inex.html'), { force: true });
});
task(':demo:clean', [':demo:clean:assets', ':demo:clean:views', ':demo:clean:views:index']);

task(':demo:copy:js', function () {
  return src([
    './node_modules/core-js/client/core.js',
    './node_modules/zone.js/dist/zone.js',
    './node_modules/reflect-metadata/Reflect.js',
    './node_modules/systemjs/dist/system.js'
  ])
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(dest(path.join(DIST_DEMO_ROOT, 'assets/js/lib')));
});

// we write all css in sass 
task(':demo:sass', function () {
  return src([
    path.join(DEMO_ROOT, '/styles/*.scss')
  ])
    .pipe(sass())
    .pipe(cssmin())
    .pipe(dest(path.join(DIST_DEMO_ROOT, 'assets/styles')));
})
// except those css that's delivered "as is"
task(':demo:copy:css', function () {
  return src([
    './node_modules/font-awesome/css/font-awesome.css'
  ])
    .pipe(dest(path.join(DIST_DEMO_ROOT, 'assets/styles')));
});
// icons and symbols shall be fonts, never want to see a single GIF here
task(':demo:copy:fonts', function () {
  return src([
    './node_modules/font-awesome/fonts/*.*'
  ])
    .pipe(dest(path.join(DIST_DEMO_ROOT, 'assets/fonts')));
});
// View HTML (component templates)
task(':demo:copy:views:templates', function () {
  return src([DEMO_ROOT + '**/*.html'], { base: path.join(DEMO_ROOT, 'components/') })
    .pipe(print())
    .pipe(dest(path.join(DIST_DEMO_ROOT, 'components/')));
});
task(':demo:copy:views:index', function () {
  return src([path.join(DEMO_ROOT, 'index.html')])
    .pipe(htmlmin())
    .pipe(dest(DIST_DEMO_ROOT));
});
task(':demo:copy:views', [':demo:copy:views:index', ':demo:copy:views:templates']);

task(':demo:copy:images', function () {
  return src([path.join(DEMO_ROOT, 'images/*.*')])
    .pipe(dest(path.join(DIST_DEMO_ROOT, 'assets/images')));
});

task(':demo:copy', [':demo:copy:css', ':demo:copy:fonts', ':demo:copy:views', ':demo:copy:images']);

// complete setup and rollup
/** Path to the tsconfig used for ESM output. */
const tsconfigPath = path.relative(PROJECT_ROOT, path.join(DEMO_ROOT, 'tsconfig.json'));
/** Builds components typescript for tests (CJS output). */
task(':demo:build:components', tsBuildTask(tsconfigPath));


task('demo:build', sequenceTask(':demo:clean', ':demo:sass', ':demo:copy', ':demo:build'));

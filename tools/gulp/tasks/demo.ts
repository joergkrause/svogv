import { task, src, dest } from 'gulp';
import * as path from 'path';

import {
  DEMO_ROOT, DIST_DEMO_ROOT
} from '../constants';

import {
  sequenceTask, execTask
} from '../task_helpers';

const inlineResources = require('../../../scripts/release/inline-resources');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const print = require('gulp-print');
const htmlmin = require('gulp-htmlmin');                      // minify HTML
const cssmin = require('gulp-clean-css');
const sass = require('gulp-sass');                            // transpile SASS
const gzip = require('gulp-zip');
const del = require('del');                                   // helper to delete paths
const systemBuilder = require('systemjs-builder');

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
    './node_modules/systemjs/dist/system.js',
    './node_modules/classlist.js/classList.js'
  ])
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(dest(path.join(DIST_DEMO_ROOT, 'assets/')))
    .pipe(gzip('vendor.js.gz'))
    .pipe(dest(path.join(DIST_DEMO_ROOT, 'assets/')));
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

task(':demo:copy', [':demo:copy:css', ':demo:copy:fonts', ':demo:copy:views', ':demo:copy:images', ':demo:copy:js']);

// complete setup and rollup
/** Builds components typescript for tests (CJS output). */
task(':demo:build:components', execTask('tsc', ['-p', DEMO_ROOT]));

/** Inlines resources (html, css) into the JS output (for either ESM or CJS output). */
task(':demo:inline-resources', function () {
  return inlineResources(DIST_DEMO_ROOT);
});

task(':demo:bundle:create', function () {
  var builder = new systemBuilder('.', {
    paths: { 'npm:': './node_modules/' },
    map: {
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      'rxjs': 'npm:rxjs',
      'svogv': 'npm:svogv/bundles/svogv.umd.js'
    },
    packages: {
      'app': { main: 'main.js', defaultExtension: 'js' },
      'rxjs': { main: 'Rx.js', defaultExtension: 'js' }
    }
  });
  //builder.reset();
  builder.loader.defaultJSExtensions = true;
  return builder
    .buildStatic(path.join(DIST_DEMO_ROOT, 'app/app.js'), path.join(DIST_DEMO_ROOT, './app.bundle.js'), {
      sourceMaps: false,
      minify: false,
      mangle: false
    })
    .then(function () {
      console.log('Bundle completed');
    });
});

task(':demo:bundle:zip', function () {
  return src(path.join(DIST_DEMO_ROOT, './app.bundle.js')).pipe(gzip('app.bundle.js.gz')).pipe(dest(DIST_DEMO_ROOT));
});

task(':demo:del:build-folder', function () {
  return del(path.join(DIST_DEMO_ROOT, 'app/'));
});

task('demo:build', sequenceTask(
  ':demo:clean',
  ':demo:sass',
  ':demo:copy',
  ':demo:build:components',
  ':demo:inline-resources',
  ':demo:bundle:create',
  ':demo:bundle:zip',
  ':demo:del:build-folder'));

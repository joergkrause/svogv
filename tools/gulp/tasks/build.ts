import { task, watch, src, dest } from 'gulp';
import * as path from 'path';

import {
  DIST_COMPONENTS_ROOT, PROJECT_ROOT, COMPONENTS_DIR, HTML_MINIFIER_OPTIONS, LICENSE_BANNER
} from '../constants';
import {
  sassBuildTask, tsBuildTask, copyTask, sequenceTask,
  triggerLivereload
} from '../task_helpers';

// No typings for these.
const inlineResources = require('../../../scripts/release/inline-resources');
const gulpRollup = require('gulp-better-rollup');
const gulpMinifyCss = require('gulp-clean-css');
const gulpMinifyHtml = require('gulp-htmlmin');
const gulpIf = require('gulp-if');
const del = require('del');

task(':build:cleanup', () => {
  del(DIST_COMPONENTS_ROOT);
  del('./node_modules/svogv/');
});

/** [Watch task] Rebuilds (ESM output) whenever ts, scss, or html sources change. */
task(':watch:components', () => {
  watch(path.join(COMPONENTS_DIR, '**/*.ts'), ['build:components', triggerLivereload]);
  watch(path.join(COMPONENTS_DIR, '**/*.scss'), ['build:components', triggerLivereload]);
  watch(path.join(COMPONENTS_DIR, '**/*.html'), ['build:components', triggerLivereload]);
});

/** Builds component typescript only (ESM output). */
task(':build:components:ts', tsBuildTask(path.join(COMPONENTS_DIR, 'tsconfig-srcs.json')));

/** Path to the tsconfig used for ESM output. */
const tsconfigPath = path.relative(PROJECT_ROOT, path.join(COMPONENTS_DIR, 'tsconfig.json'));
/** Builds components typescript for tests (CJS output). */
task(':build:components:spec', tsBuildTask(tsconfigPath));

/** Copies assets (html, markdown) to build output. */
task(':build:components:assets', copyTask([
  path.join(COMPONENTS_DIR, '**/*.!(ts|spec.ts)'),
  path.join(PROJECT_ROOT, 'README.md'),
  path.join(PROJECT_ROOT, 'LICENSE'),
], DIST_COMPONENTS_ROOT));

/** Minifies the HTML and CSS assets in the distribution folder. */
task(':build:components:assets:minify', () => {
  return src('**/*.+(html|css)', { cwd: DIST_COMPONENTS_ROOT })
    .pipe(gulpIf(/.css$/, gulpMinifyCss(), gulpMinifyHtml(HTML_MINIFIER_OPTIONS)))
    .pipe(dest(DIST_COMPONENTS_ROOT));
});

/** Builds scss into css. */
task(':build:components:scss', sassBuildTask(DIST_COMPONENTS_ROOT, COMPONENTS_DIR));

/** Builds the UMD bundle for all of SvOgV. */
task(':build:components:rollup', () => {
  const globals: { [name: string]: string } = {
    // Angular dependencies
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/forms': 'ng.forms',
    '@angular/http': 'ng.http',
    '@angular/router': 'ng.router',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',

    // Rxjs dependencies
    'rxjs/Subject': 'Rx',
    'rxjs/add/observable/fromEvent': 'Rx.Observable',
    'rxjs/add/observable/forkJoin': 'Rx.Observable',
    'rxjs/add/observable/of': 'Rx.Observable',
    'rxjs/add/observable/throw': 'Rx.Observable',
    'rxjs/add/operator/toPromise': 'Rx.Observable.prototype',
    'rxjs/add/operator/map': 'Rx.Observable.prototype',
    'rxjs/add/operator/filter': 'Rx.Observable.prototype',
    'rxjs/add/operator/do': 'Rx.Observable.prototype',
    'rxjs/add/operator/share': 'Rx.Observable.prototype',
    'rxjs/add/operator/finally': 'Rx.Observable.prototype',
    'rxjs/add/operator/catch': 'Rx.Observable.prototype',
    'rxjs/add/operator/first': 'Rx.Observable.prototype',
    'rxjs/Observable': 'Rx'
  };

  const rollupOptions = {
    context: 'this',
    external: Object.keys(globals)
  };

  const rollupGenerateOptions = {
    // Keep the moduleId empty because we don't want to force developers to a specific moduleId.
    moduleId: '',
    moduleName: 'ac.svogv',
    format: 'umd',
    globals,
    banner: LICENSE_BANNER,
    dest: 'svogv.umd.js'
  };

  return src(path.join(DIST_COMPONENTS_ROOT, 'index.js'))
    .pipe(gulpRollup(rollupOptions, rollupGenerateOptions))
    .pipe(dest(path.join(DIST_COMPONENTS_ROOT, 'bundles')));      // copy to dist for reference
});

// refresh the package immediately to simplify local testing with current version
task(':build:components:copy-for-demo', () => {
  let target = './node_modules/svogv/';
  console.log(`** immediate copy from ${DIST_COMPONENTS_ROOT}  to ${target}`);
  return src(DIST_COMPONENTS_ROOT + '**/*.*').pipe(dest(target));
});

/** Builds components with resources (html, css) inlined into the built JS (ESM output). */
task(':build:components:inline', sequenceTask(
  ':build:cleanup',
  ':build:components:ts',
  ':build:components:scss',
  ':build:components:assets',
  ':build:components:assets:minify',
  ':inline-resources'
));

/** Builds components with minified HTML and CSS inlined into the built JS. */
task(':build:components:inline:release', sequenceTask(
  ':build:cleanup',
  ':build:components:ts',
  ':build:components:scss',
  ':build:components:assets',
  ':build:components:assets:minify',
  ':inline-resources'
));

/** Inlines resources (html, css) into the JS output (for either ESM or CJS output). */
task(':inline-resources', function () {
  return inlineResources(DIST_COMPONENTS_ROOT);
});

/** Builds components to ESM output and UMD bundle. */
task('build', sequenceTask(
  ':build:components:inline',
  ':build:components:rollup',
  ':build:components:copy-for-demo'));

task('build:components:release', sequenceTask(
  ':build:components:inline:release',
  ':build:components:rollup'
));


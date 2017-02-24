'use strict'
const path = require('path')
const gulp = require('gulp')
const eslint = require('gulp-eslint')
const excludeGitignore = require('gulp-exclude-gitignore')
const mocha = require('gulp-mocha')
const istanbul = require('gulp-istanbul')
const nsp = require('gulp-nsp')
const plumber = require('gulp-plumber')
const noTpls = '!generators/app/templates/**'

gulp.task('static', function() {
  return gulp.src(['**/*.js', noTpls])
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('nsp', function(cb) {
  nsp({package: path.resolve('package.json')}, cb)
})

gulp.task('pre-test', function() {
  return gulp.src(['generators/**/*.js', noTpls])
    .pipe(excludeGitignore())
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
})

gulp.task('test', ['pre-test'], function(cb) {
  let mochaErr

  gulp.src(['test/**/*.js', noTpls])
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'}))
    .on('error', function(err) {
      mochaErr = err
    })
    .pipe(istanbul.writeReports())
    .on('end', function() {
      cb(mochaErr)
    })
})

gulp.task('watch', function() {
  gulp.watch(['generators/**/*.js', 'test/**'], ['test'])
})

gulp.task('prepublish', ['nsp'])
gulp.task('default', ['static', 'test'])

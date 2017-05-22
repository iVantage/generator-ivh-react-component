'use strict'
const path = require('path')
const gulp = require('gulp')
const standard = require('gulp-standard')
const excludeGitignore = require('gulp-exclude-gitignore')
const mocha = require('gulp-mocha')
const istanbul = require('gulp-istanbul')
const nsp = require('gulp-nsp')
const plumber = require('gulp-plumber')
const noTpls = '!templates/**'

gulp.task('static', () => {
  return gulp.src(['**/*.js', noTpls])
    .pipe(excludeGitignore())
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      breakOnWarning: true
    }))
})

gulp.task('nsp', (cb) => {
  nsp({package: path.resolve('package.json')}, cb)
})

gulp.task('pre-test', () => {
  return gulp.src(['generators/**/*.js', noTpls])
    .pipe(excludeGitignore())
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
})

gulp.task('test', ['pre-test'], (cb) => {
  let mochaErr

  gulp.src(['test/**/*.js', noTpls])
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'}))
    .on('error', (err) => {
      mochaErr = err
    })
    .pipe(istanbul.writeReports())
    .on('end', () => {
      cb(mochaErr)
    })
})

gulp.task('watch', () => {
  gulp.watch(['generators/**/*.js', 'test/**'], ['test'])
})

gulp.task('prepublish', ['nsp'])
gulp.task('default', ['static', 'test'])

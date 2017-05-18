/* global describe, before, it */

'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

describe('generator-ivh-react-component:app', () => {
  before(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        moduleName: 'foo-bar',
        className: 'FooBar',
        desc: 'Super blargus',
        useDotFiles: 'y',
        includeScss: 'y',
        installDeps: 'n'
      })
      .toPromise()
  })

  it('creates files', () => {
    assert.file([
      '.babelrc',
      '.editorconfig',
      '.gitignore',
      'README.md',
      'package.json',
      'postcss.config.js',
      'src/index.js',
      'src/components/foo-bar/index.js',
      'src/components/foo-bar/FooBar.js',
      'src/components/foo-bar/FooBar.css',
      'src/components/foo-bar/FooBar.spec.js',
      'webpack.config.js'
    ])
  })
})

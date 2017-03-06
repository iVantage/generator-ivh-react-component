'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

describe('generator-ivh-react-component:app', function() {
  before(function() {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        moduleName: 'foo-bar',
        className: 'FooBar',
        desc: 'Super blargus',
        useDotFiles: 'y',
        installDeps: 'y'
      })
      .toPromise()
  })

  it('creates files', function() {
    assert.file([
      '.babelrc',
      '.editorconfig',
      '.eslintrc.js',
      '.gitignore',
      'README.md',
      'package.json',
      'postcss.config.js',
      'src/index.js',
      'src/mocks/fileMock.js',
      'src/mocks/styleMock.js',
      'src/components/foo-bar/index.js',
      'src/components/foo-bar/FooBar.js',
      'src/components/foo-bar/FooBar.css',
      'src/components/foo-bar/FooBar.spec.js',
      'webpack.config.js'
    ])
  })
})

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
      'karma.conf.js',
      'package.json',
      'src/components/FooBar.jsx',
      'src/components/FooBar_spec.jsx',
      'webpack.config.js'
    ])
  })
})

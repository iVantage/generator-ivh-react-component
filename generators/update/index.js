'use strict'
const path = require('path')
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const _ = require('lodash')
_.templateSettings.interpolate = /<%=([\s\S]+?)%>/g

module.exports = Generator.extend({
  initializing: function() {
    this.props = {}
  },

  paths: function() {
    this.sourceRoot(path.normalize(__dirname + '/../../templates'))
  },

  writing: function () {
    const props = this.config.getAll()
    const newVersion = require('../../package.json').version

    if(!this.fs.exists(this.destinationPath('.yo-rc.json'))) {
      this.log(chalk.red('Refusing to update, a .yo-rc.json file is required.'))
      return
    }

    const cpTpl = (from, to) => {
      this.fs.copyTpl(
        this.templatePath(from),
        this.destinationPath(to),
        props
      )
    }

    const cp = (from, to) => {
      this.fs.copy(
        this.templatePath(from),
        this.destinationPath(to)
      )
    }

    const rm = (p) => {
      this.fs.delete(this.destinationPath(p))
    }

    const pkgTpl = _.template(
      this.fs.read(this.templatePath('_package.json'))
    )
    const pkg = JSON.parse(pkgTpl(props))

    // @todo - extendJSON will merge properties, for some things
    // (devDependencies) we probably just want to set them so as to not carry
    // forward cruft we don't need anymore.
    this.fs.extendJSON(this.destinationPath('package.json'), _.pick(pkg, [
      'name',
      'main',
      'description',
      'scripts',
      'license',
      'jest',
      'peerDependencies',
      'devDependencies'
    ]))
    cpTpl('webpack.config.js', 'webpack.config.js')

    if(props.useDotFiles) {
      cp('_editorconfig', '.editorconfig')
      cp('_eslintrc.js', '.eslintrc.js')
      cp('_gitignore', '.gitignore')
      cp('_babelrc', '.babelrc')
    } else {
      [
        '.editorconfig',
        '.eslintrc.js',
        '.gitignore',
        '.babelrc'
      ].forEach(rm)
    }

    this.config.set('generatorVersion', newVersion)
  },

  end: function() {
    const msg = chalk.green('Done.')
    this.log(msg)
  }

})



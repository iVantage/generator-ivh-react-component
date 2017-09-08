'use strict'
const path = require('path')
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const _ = require('lodash')
_.templateSettings.interpolate = /<%=([\s\S]+?)%>/g

module.exports = Generator.extend({
  initializing: function () {
    this.props = {}
  },

  paths: function () {
    this.sourceRoot(path.normalize(path.join(__dirname, '/../../templates')))
  },

  writing: function () {
    const props = this.config.getAll()
    const newVersion = require('../../package.json').version

    if (!this.fs.exists(this.destinationPath('.yo-rc.json'))) {
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

    // No longer using eslint
    pkg.dependencies['eslint'] = undefined
    pkg.dependencies['eslint-config-ivantage'] = undefined
    pkg.dependencies['eslint-loader'] = undefined

    pkg.devDependencies['eslint'] = undefined
    pkg.devDependencies['eslint-config-ivantage'] = undefined
    pkg.devDependencies['eslint-loader'] = undefined

    // React update 15.4 --> 15.5
    pkg.devDependencies['react-addons-shallow-compare'] = undefined
    pkg.devDependencies['react-addons-test-utils'] = undefined
    pkg.devDependencies['prop-types'] = undefined

    // Removed postcss plugins
    pkg.devDependencies['postcss-custom-properties'] = undefined

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

    if (props.useDotFiles) {
      cp('_editorconfig', '.editorconfig')
      cp('_gitignore', '.gitignore')
      cp('_babelrc', '.babelrc')
    } else {
      [
        '.editorconfig',
        '.gitignore',
        '.babelrc'
      ].forEach(rm)
    }

    // Standard over eslint!
    rm('.eslintrc.js')

    // No longer using explicit mock files
    rm('src/mocks')

    this.config.set('generatorVersion', newVersion)
  },

  end: function () {
    const msg = chalk.green('Done.')
    this.log(msg)
  }
})

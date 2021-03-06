'use strict'
const path = require('path')
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const _ = require('lodash')

const guessModuleName = () => {
  return _.kebabCase(path.basename(process.cwd()))
}

const guessComponentName = () => {
  let ret = guessModuleName()
  ret = _.camelCase(ret)
  return _.upperFirst(ret)
}

module.exports = Generator.extend({
  initializing: function () {
    this.props = {}
  },

  paths: function () {
    this.sourceRoot(path.normalize(path.join(__dirname, '/../../templates')))
  },

  prompting: function () {
    // Have Yeoman greet the user.
    const me = chalk.red('ivh-react-component')
    this.log(`Much React. Such components. So ${me} generator. Wow.`)

    var prompts = [{
      type: 'input',
      name: 'moduleName',
      message: 'What will be your module id? i.e. require(...)?',
      default: guessModuleName()
    }, {
      type: 'input',
      name: 'className',
      message: 'What would you like to name your component? i.e. <... />?',
      default: guessComponentName()
    }, {
      type: 'input',
      name: 'desc',
      message: 'Please enter a description for your package.',
      default: 'I built a large app once. It was awful.'
    }, {
      type: 'input',
      name: 'useDotFiles',
      message: 'Shall I include dot files, e.g. babel configs? (Y/n).',
      default: 'Y'
    }, {
      type: 'input',
      name: 'includeScss',
      message: 'Shall I include support for SCSS files? (y/N).',
      default: 'N'
    }, {
      type: 'input',
      name: 'installDeps',
      message: 'Shall I install project dependencies for you? (y/N)',
      default: 'N'
    }]

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer
      this.props = props
      // override props
      this.props.includeScss = props.includeScss.toUpperCase() === 'Y'
      this.props.installDeps = props.installDeps.toUpperCase() === 'Y'
      this.props.useDotFiles = props.useDotFiles.toUpperCase() === 'Y'
      this.config.set(Object.assign({
        generatorVersion: require('../../package.json').version
      }, this.props))
    }.bind(this))
  },

  writing: function () {
    const moduleName = this.props.moduleName

    const cp = (from, to) => {
      this.fs.copy(
        this.templatePath(from),
        this.destinationPath(to)
      )
    }

    const cpTpl = (from, to) => {
      this.fs.copyTpl(
        this.templatePath(from),
        this.destinationPath(to),
        this.props
      )
    }

    if (this.props.useDotFiles) {
      cp('_editorconfig', '.editorconfig')
      cp('_gitignore', '.gitignore')
      cp('_babelrc', '.babelrc')
    }

    cp('postcss.config.js', 'postcss.config.js')
    cpTpl('webpack.config.js', 'webpack.config.js')
    cpTpl('_package.json', 'package.json')
    cpTpl('README.md', 'README.md')
    cpTpl('src/index.js', 'src/index.js')
    cpTpl('src/components/greeter/index.js',
        `src/components/${moduleName}/index.js`)
    cpTpl('src/components/greeter/greeter.js',
        `src/components/${moduleName}/${moduleName}.js`)
    cpTpl('src/components/greeter/greeter.css',
        `src/components/${moduleName}/${moduleName}.css`)
    cpTpl('src/components/greeter/greeter.test.js',
        `src/components/${moduleName}/${moduleName}.test.js`)
  },

  install: function () {
    if (this.props.installDeps) {
      this.installDependencies({bower: false})
    }
  },

  end: function () {
    const msg = chalk.green('Done.')
    this.log(msg)
  }
})

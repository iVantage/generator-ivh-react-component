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
  initializing: function() {
    this.props = {}
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
      message: 'Shall I include dot files, e.g. babel/eslint configs? (Y/n).',
      default: 'Y'
    }, {
      type: 'input',
      name: 'installDeps',
      message: 'Shall I install project dependencies for you? (y/N)',
      default: 'N'
    }]

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer
      this.props = props
    }.bind(this))
  },

  writing: function () {
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

    if(this.props.useDotFiles.toUpperCase() === 'Y') {
      cp('_editorconfig', '.editorconfig')
      cp('_eslintrc.js', '.eslintrc.js')
      cp('_gitignore', '.gitignore')
      cp('_babelrc', '.babelrc')
    }

    cp('karma.conf.js', 'karma.conf.js')
    cpTpl('webpack.config.js', 'webpack.config.js')
    cpTpl('_package.json', 'package.json')
    cpTpl('README.md', 'README.md')
    cpTpl('src/components/Greeter.js',
        `src/components/${this.props.className}.js`)
    cpTpl('src/components/Greeter_spec.js',
        `src/components/${this.props.className}_spec.js`)
  },

  install: function () {
    if('Y' === this.props.installDeps.toUpperCase()) {
      this.installDependencies({bower: false})
    }
  }
})


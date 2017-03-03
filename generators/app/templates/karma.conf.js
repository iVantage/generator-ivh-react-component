/* eslint-env node */

const path = require('path')
const srcFiles = 'src/**/!(*_spec).*'
const testFiles = 'src/**/*_spec.*'

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [testFiles],

    preprocessors: {
      [srcFiles]: ['webpack', 'sourcemap'],
      [testFiles]: ['webpack', 'sourcemap']
    },

    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['', '.js']
      },
      module: {
        loaders: [{
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: path.resolve(__dirname, 'node_modules')
        }, {
          test: /\.json$/,
          loader: 'json'
        }]
      },
      externals: {
        cheerio: 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window'
      }
    },

    webpackServer: {
      noInfo: true
    },

    plugins: [
      'karma-chai',
      'karma-coverage',
      'karma-nyan-reporter',
      'karma-spec-reporter',
      'karma-mocha',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader',
      'karma-webpack'
    ],

    babelPreprocessor: {
      options: {
        presets: ['ivantage']
      }
    },

    reporters: ['nyan', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  })
}


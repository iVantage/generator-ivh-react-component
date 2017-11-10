/* eslint-env node */

const path = require('path')
const srcPath = path.join(__dirname, 'src')
const distPath = path.join(__dirname, 'dist')

// Mark all peer dependencies as external
const pkg = require('./package.json')
const peerDeps = pkg.peerDependencies || {}
const externals = Object.keys(peerDeps).reduce((acc, key) => {
  acc[key] = {
    commonjs: key,
    commonjs2: key,
    amd: key
  }
  return acc
}, {})

// React + ReactDOM can always be external
externals.react = {
  root: 'React',
  commonjs: 'react',
  commonjs2: 'react',
  amd: 'react'
}

externals['react-dom'] = {
  root: 'ReactDOM',
  commonjs: 'react-dom',
  commonjs2: 'react-dom',
  amd: 'react-dom'
}

module.exports = {
  entry: './src/index.js',
  resolve: {
    extensions: ['.js']
  },
  output: {
    library: '<%= className %>',
    libraryTarget: 'umd',
    path: distPath,
    filename: 'index.js'
  },
  externals: externals,
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      include: srcPath
    }, {
      test: /\.<% if (includeScss) { %>s?<% } %>css$/,
      use: [
        'style-loader',
        'css-loader?importLoaders=1',
        'postcss-loader'<% if (includeScss) { %>,
        'sass-loader'<% } %>
      ]
    }]
  }
}

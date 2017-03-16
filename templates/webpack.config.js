/* eslint-env node */

const path = require('path')
const srcPath = path.join(__dirname, 'src')

module.exports = {
  entry: './src/index.js',
  resolve: {
    extensions: ['.js']
  },
  output: {
    library: '<%= className %>',
    libraryTarget: 'umd',
    path: './dist',
    filename: 'index.js'
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom'
    }
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      loader: 'eslint-loader',
      include: srcPath
    }, {
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

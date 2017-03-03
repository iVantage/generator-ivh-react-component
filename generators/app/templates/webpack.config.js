/* eslint-env node */

const path = require('path')
const srcPath = path.join(__dirname, 'src')

module.exports = {
  // If you use anything other than a single entry you'll need to update the
  // karama config webpack param manually
  entry: './src/components/<%= className %>.js',
  resolve: {
    extensions: ['', '.js']
  },
  output: {
    library: '<%= className %>',
    libraryTarget: 'umd',
    path: './dist',
    filename: 'index.js',
    include: srcPath
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    'reat-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom'
    }
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint-loader',
      include: srcPath
    }],
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: srcPath
    }]
  }
}

# generator-ivh-react-component [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]

> iVantage flavored components for React

## Installation

First, install [Yeoman](http://yeoman.io) and generator-ivh-react-component
using [npm](https://www.npmjs.com/) (we assume you have pre-installed
[node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-ivh-react-component
```

Then generate your new project:

```bash
yo ivh-react-component
```

Now go forth and build components.

## What's in the Box

A minimal yet featureful boilerplate for building React components.

- Bundling with webpack
- Testing with karma, mocha, chai, and enzyme
- Code coverage with istanbul
- ES6 transpilation with iVantage presets

## Packages Explained

There's nothing worse than having a brand new boilerplate project dumped in your
lap with a ten mile long list of dependencies and no explanation for how things
tie together. We've done our best to keep things minimal while hitting all the
required features. This section provides a brief explanation (and justification)
of the included packages.

We use the babel transpiler to turn es6 (es2015) JavaScript and JSX into
JavaScript of today. Since we're processing all that JS anyway we might as well
inject code coverage markers (via istanbul) during testing. The `cross-env`
package allows us to tell our npm scripts that we're in a e.g. testing
environment in a cross platform friendly way.

- "babel-core"
- "babel-plugin-istanbul"
- "babel-plugin-syntax-jsx"
- "babel-preset-es2015"
- "babel-preset-react"
- "cross-env"

Karma is our test runner which lets us run our tests in real browsers. For
speedy development we're just using PhantomJS (a headless browser) but you may
install the launcher for your favorite browser and use that instead.

Chai and mocha give us some nice struct and syntax for our tests suites and
assertions. We need a few connecting plugins to make the test runner aware of
these libraries.

Enzyme is a special library with some handy utilities for working with testing
with React elements.

- "chai"
- "enzyme"
- "eslint"
- "eslint-config-ivantage"
- "eslint-loader"
- "eslint-plugin-react"
- "karma"
- "karma-chai"
- "karma-coverage"
- "karma-mocha"
- "karma-nyan-reporter"
- "karma-phantomjs-launcher"
- "karma-spec-reporter"
- "karma-webpack"
- "karma-sourcemap-loader"
- "mocha"

This is a react component afterall. We need the library itself as well as some
helpers which allow us to run tests and render elements.

- "react"
- "react-addons-shallow-compare"
- "react-addons-test-utils"
- "react-dom"

Webpack is responsible for bundling all our code together and resolving
any `require` and `import`s. Pretty much any module that ends in *-loader* is
around to let webpack correctly load and package up files.

- "webpack"
- "json-loader"
- "mocha-loader"
- "babel-loader"

Like a cross platform `rm -rf`, rimraf is just around to make cleaning old build
artifacts easy.

- "rimraf"

## License

MIT © [iVantage Health Analytics, LLC](www.ivantagehealth.com)


[npm-image]: https://badge.fury.io/js/generator-ivh-react-component.svg
[npm-url]: https://npmjs.org/package/generator-ivh-react-component
[daviddm-image]: https://david-dm.org/ivantage/generator-ivh-react-component.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ivantage/generator-ivh-react-component

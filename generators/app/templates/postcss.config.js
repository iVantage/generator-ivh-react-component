
const autoprefixer = require('autoprefixer')
const customProperties = require('postcss-custom-properties')()

// Should get a map from ivh-theme
customProperties.setVariables({
  '--ivh-color-danger': 'red'
})

module.exports = {
  plugins: [
    autoprefixer,
    customProperties
  ]
}


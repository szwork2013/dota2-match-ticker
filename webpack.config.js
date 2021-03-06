var webpack = require('webpack')

/**
 * Only uglify if in production
 */
var plugins = process.env.NODE_ENV !== 'production'
  ? []
  : [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]

module.exports = {
  entry: './public/javascripts/entry.js',
  output: {
    path: './public/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: [ 'style', 'css', 'sass' ]
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: JSON.parse(require('fs').readFileSync('./.babelrc'))
      }
    ]
  },
  plugins: plugins
}

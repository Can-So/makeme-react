const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devServer = require('@webpack-blocks/dev-server2')
const splitVendor = require('webpack-blocks-split-vendor')
const happypack = require('webpack-blocks-happypack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const {
  addPlugins, createConfig, entryPoint, env, setOutput,
  sourceMaps, defineConstants, webpack,
} = require('@webpack-blocks/webpack2')

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000
const sourceDir = process.env.SOURCE || 'src'
const publicPath = `/${process.env.PUBLIC_PATH || ''}/`.replace('//', '/')
const sourcePath = path.join(process.cwd(), sourceDir)
const outputPath = path.join(process.cwd(), 'dist')

const babel = () => () => ({
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
})

const config = createConfig([
  entryPoint({
    app: sourcePath,
    mui: 'material-ui',
    styled: 'styled-components',
  }),
  setOutput({
    filename: '[name].[hash].js',
    path: outputPath,
    publicPath,
  }),
  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV,
    'process.env.PUBLIC_PATH': publicPath,
  }),
  addPlugins([
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(process.cwd(), 'public/index.html'),
    }),
  ]),
  happypack([
    babel(),
  ], {
    cacheContext: {
      sourceDir,
    },
  }),
  () => ({
    resolve: {
      modules: [sourceDir, 'node_modules'],
    },
    module: {
      rules: [
        { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]},
        { test: /\.(png|jpe?g)$/, loader: 'url-loader?&limit=8000' },
        { test: /\.(woff2?|ttf|eot)$/, loader: 'url-loader?&limit=8000' },
      ],
    },
  }),

  env('development', [
    devServer({
      contentBase: 'public',
      stats: 'errors-only',
      publicPath,
      host,
      port,
    }),
    sourceMaps(),
    addPlugins([
      new webpack.NamedModulesPlugin(),
      new ProgressBarPlugin(),
    ]),
  ]),

  env('production', [
    splitVendor('base'),
    addPlugins([
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
      new ProgressBarPlugin(),
    ]),
  ]),
])

module.exports = config
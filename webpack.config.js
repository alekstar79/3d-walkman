require('dotenv').config({ path: '.env' })

const { DOCKER_ENV, HOST, LOC_PORT, DOC_PORT } = process.env
const PORT = DOCKER_ENV ? DOC_PORT : LOC_PORT

const path = require('path')
const root = path.resolve(__dirname)

module.exports = ({ /* WEBPACK_BUNDLE, WEBPACK_SERVE */ }, { mode }) => {
  mode = (mode || 'development').trim().toLowerCase()

  return {
    mode,

    ...(mode === 'development' && { devtool: 'eval-source-map' }),

    entry: {
      main: './src/main.js'
    },
    output: {
      path: path.resolve(root, 'dist'),
      filename: 'js/[name].[contenthash:8].js',
      assetModuleFilename: path.join('img', '[name].[contenthash:8][ext]')
    },
    resolve: {
      extensions: ['.pug', '.scss', '.js']
    },

    module: require('./webpack/modules')(mode === 'development'),
    optimization: require('./webpack/optimization')(),
    plugins: require('./webpack/plugins')(root),

    devServer: require('./webpack/server')({
      host: String(HOST || '0.0.0.0').trim().toLowerCase(),
      port: Number(PORT || 80),
      root
    })
  }
}

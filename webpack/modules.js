const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = (DEV) => ({
  rules: [
    {
      test: /\.js$/i,
      use: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.pug$/i,
      loader: 'pug-loader'
    },
    {
      test: /\.(sa|sc|c)ss$/i,
      use: [
        DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]
    },
    {
      test: /\.(jpe?g|png|gif|svg|ico)$/i,
      type: 'asset/resource',
      generator: {
        filename: path.join('img', '[name].[contenthash:8][ext]')
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: path.join('fonts', '[name].[contenthash:8][ext]')
      }
    }
  ]
})

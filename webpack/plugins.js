const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

/**
 * @alternative filename: 'css/[name].[contenthash:8].css'
 * @param {String} contentHashType
 * @param {Object} contentHash
 * @returns {String}
 */
function filename({ contentHashType, chunk: { contentHash } })
{
  return `css/style.${contentHash[contentHashType].slice(0, 8)}.css`
}

module.exports = (root) => ([
  new HtmlWebpackPlugin({
    template: path.resolve(root, 'src', 'templates', 'index.pug'),
    filename: 'index.html',
  }),

  new MiniCssExtractPlugin({
    filename
  }),

  new FileManagerPlugin({
    events: {
      onStart: {
        delete: [path.resolve(root, 'src', 'dist')]
      },
      onEnd: {
        copy: [{
          source: path.resolve(root, 'src', 'static'),
          destination: path.resolve(root, 'dist')
        }]
      }
    }
  })
])

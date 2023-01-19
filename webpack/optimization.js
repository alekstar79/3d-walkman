const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

module.exports = () => ({
  minimizer: [
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,

        options: {
          plugins: [
            ['jpegtran', { progressive: true      }],
            ['optipng',  { optimizationLevel: 5   }],
            ['svgo',     { name: 'preset-default' }]
          ]
        }
      }
    })
  ],
  splitChunks: {
    chunks: 'all'
  }
})

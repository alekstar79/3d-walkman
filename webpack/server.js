const { DOCKER_ENV } = process.env
const path = require('path')

module.exports = ({ host, port, root }) => ({
  compress: !!DOCKER_ENV,

  static: {
    directory: path.resolve(root, 'dist'),
    publicPath: '/'
  },

  host,
  port,

  ...(!DOCKER_ENV && {
    liveReload: true,

    watchFiles: [
      path.resolve(root, 'src')
    ],

    open: {
      target: [`http://${host}:${port}`],
      app: {
        name: 'firefox',
        arguments: []
      }
    },

    client: {
      progress: true
    }
  })
})

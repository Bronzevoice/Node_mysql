module.exports = {
  entry: {
    app: ['./src/index.js']
  },
  output: {
    path: './build',
    filename: 'bundle.js',
    publicPath: '/build/'
  },

  resolve: {
    extension:['','js']
  },
  devServer: {
    host: '0.0.0.0',
    port: 8000,
    inline: true
  },
  module: {
    rules: [
      {
        test: /(\.js|.jsx)$/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}

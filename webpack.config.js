const path = require('path')
const { HotModuleReplacementPlugin } = require('webpack')

module.exports = {
  entry: ['./src/index.ts'],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/assets',
    filename: 'app.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    loaders: [{
      test: /\.ts$/,
      loader: 'ts-loader',
      query: {
        transpileOnly: true,
      },
      exclude: /node_modules/,
    }],
  },
  plugins: [
    new HotModuleReplacementPlugin(),
  ],
}

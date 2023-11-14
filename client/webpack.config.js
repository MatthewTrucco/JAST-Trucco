const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './client/src/js/index.js',
      install: './client/src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './client/index.html',
        title: 'Your PWA Title'
      }),
      new InjectManifest({
        swSrc: './client/src-sw.js', // Path to your source service worker file
        swDest: 'service-worker.js', // Destination filename in output directory
      }),
      new WebpackPwaManifest({
        name: 'Your App Name',
        short_name: 'App',
        description: 'Your application description',
        background_color: '#ffffff',
        crossorigin: 'use-credentials', // Can be set to 'anonymous'
        icons: [
          {
            src: path.resolve('client/src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512] // Multiple icon sizes
          }
        ]
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};

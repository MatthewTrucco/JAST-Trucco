const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); // Import TerserPlugin

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Your PWA Title'
      }),
      new InjectManifest({
        swSrc: './src-sw.js', // Path to your source service worker file
        swDest: 'service-worker.js', // Destination filename in the output directory
      }),
      new WebpackPwaManifest({
        name: 'Your App Name',
        short_name: 'App',
        description: 'Your application description',
        background_color: '#ffffff',
        crossorigin: 'use-credentials', // Can be set to 'anonymous'
        icons: [
          {
            src: path.join(__dirname,'/src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512] // Multiple icon sizes
          }
        ]
      })
    ],
    optimization: {
      minimize: true, // Enable minimization
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            // Add your Terser options here
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {},
            mangle: true,
            module: false,
            output: null,
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_classnames: undefined,
            keep_fnames: false,
            safari10: false,
          },
        }),
      ],
    },
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

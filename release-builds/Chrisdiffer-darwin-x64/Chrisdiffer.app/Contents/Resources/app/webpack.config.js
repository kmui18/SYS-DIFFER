const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { spawn } = require('child_process');

// Config directories
const SRC_DIR = path.resolve(__dirname, 'src');
const OUTPUT_DIR = path.resolve(__dirname, 'dist');

// Any directories you will be adding code/files into, need to be
// added to this array so webpack will pick them up
const defaultInclude = [SRC_DIR];

module.exports = {

  // watch: true,

  // entry: `${SRC_DIR}/index.js`,
  entry: {
    app: ['webpack/hot/dev-server', './src/client/App.jsx'],
  },

  output: {
    path: OUTPUT_DIR,
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  // output: {
  //   path: path.join(__dirname, './public/built'),
  //   filename: 'bundle.js',
  //   publicPath: 'http://localhost:8080/built/'
  // },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            // options: {
            //   modules:true,
            //   importLoaders: 1,
            //   localIdentName: '[name]_[local]_[hash: base64]',
            //   sourceMap: true,
            //   minimize: true,
            // }
          },
        ],
        include: defaultInclude,
      },
      {
        test: /\.(js|jsx)$/,
        use: { loader: 'babel-loader' },
        include: defaultInclude,
        exclude: /node_modules/,
      },
      {
<<<<<<< HEAD
        test: /\.(jpe?g|png|gif)$/,
=======

        test: /\.(jpe?g|png|gif|svg)$/,

>>>>>>> master
        use: [{ loader: 'url-loader?name=assets/[name]__[hash:base64:5].[ext]' }],
        include: defaultInclude,
      },
      {
<<<<<<< HEAD
        test: /\.(eot|svg|ttf|woff|woff2)$/,
=======

        test: /\.(eot|ttf|woff|woff2)$/,

>>>>>>> master
        use: [{ loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' }],
        include: defaultInclude,
      },
      {
        test: /\.json$/,
        use: [{ loader: 'json-loader' }],
        include: defaultInclude,
      },
    ],
  },

  target: 'electron-renderer',

  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],

  devtool: 'cheap-source-map',

  devServer: {
    contentBase: OUTPUT_DIR,
    stats: {
      colors: true,
      chunks: false,
      children: false,
    },
    // devServer: {
    //   contentBase: './public',
    //   publicPath: 'http://localhost:8080/built'
    // },

    before() {
      spawn(
        'electron',
        ['./public/electron.js'],
        { shell: true, env: process.env, stdio: 'inherit' },
      )
        .on('close', code => process.exit(0))
        .on('error', spawnError => console.error(spawnError));
    },
  },
};
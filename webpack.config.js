var path = require('path')
var config = require('config')
var webpack = require('webpack');
var mode, entry, output, plugins, rules, resolve;

if (process.env.NODE_ENV !== 'production') {
    mode = 'development'
    entry = './client/src/index.tsx'
    output = {
        path: path.join(__dirname, [ '/', config.get('buildDirectory') ].join('')),
        filename: '[name].bundle.js',
        publicPath: 'http://localhost:3001/'
    },
    resolve = {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },
    plugins = [
        new webpack.DefinePlugin({ __DEV__: true }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
      ]
    rules = [
        { test: /\.tsx?$/, loader: "awesome-typescript-loader"},
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
        { 
            test: /\.(js|jsx)$/, 
            loader: 'babel-loader',
            exclude: /node_modules/,
        }
    ]
}else{
    mode = 'production'
    entry = {
        main: './client/src/index.js'
    }
    output = {
        path: path.join(__dirname, [ '/', config.get('buildDirectory') ].join('')),
        filename: '[name].bundle.js'
    }
    plugins = [
        new webpack.DefinePlugin({ __DEV__: false, 'process.env.NODE_ENV': "'production'" })
      ];
    rules = [
        { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
        { 
            test: /\.(js|jsx)$/, 
            loader: 'babel-loader',
            options: {
                babelrc: false,
                comments: false,
                presets: [
                  'env',
                  'react',
                ],
              },
            query: {
                cacheDirectory: true,
                presets: ['react', 'env']
            },
            exclude: /node_modules/,
            include: __dirname
        },
    ]
}

module.exports = {
    devtool: 'source-map',
    mode: mode,
    entry: entry,
    resolve: resolve,
    output: output,
    module: {
      rules: rules,
    },
  }

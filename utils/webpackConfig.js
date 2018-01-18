const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = (ReadefilePath, writeFilePath, writeFileName, isproduction) => {
  process.noDeprecation = true;
  if (isproduction) {
    return {
      'entry': [
        path.join(__dirname, './url-production.js'),
        ReadefilePath
      ],
      'output': {
        path: writeFilePath,
        filename: writeFileName
      },
      'module': {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
              presets: [
                "es2015",
                "stage-0"
              ]
            }
          }
        ]
      },
      'plugins': [
        new UglifyJsPlugin()
      ]
    }
  } else {
    return {
      'entry': [
        path.join(__dirname, './url-development.js'),
        ReadefilePath
      ],
      'output': {
        path: writeFilePath,
        filename: writeFileName
      },
      'module': {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
              presets: [
                "es2015",
                "stage-0"
              ]
            }
          }
        ]
      }
    }
  }
}

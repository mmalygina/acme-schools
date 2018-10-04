const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './client/index.js'],
   module: {
     rules: [
       {
         test: /\.js$/,
         use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'env',
              'react',
            ],
          },
         },
         exclude: /node_modules/
       }
     ]
   },
   output: {
     filename: 'bundle.js',
     path: path.join(__dirname, './public'),
   }
 };
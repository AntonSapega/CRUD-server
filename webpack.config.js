const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/server.ts',
  devtool: 'inline-source-map',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

// import * as path from 'path';

// import { dirname } from 'path';
// import { fileURLToPath } from 'url';

// const __dirname = dirname(fileURLToPath(import.meta.url));

// const configurations = {
//   mode: 'development',
//   entry: './src/server.ts',
//   devtool: 'inline-source-map',
//   target: ['node'],
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: 'ts-loader',
//         exclude: /node_modules/,
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.tsx', '.ts', '.js'],
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
// };

// export default configurations;

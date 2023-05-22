// webpack.config.js

module.exports = {
    // Your webpack configuration goes here
    module: {
        entry: './src',
      rules: [
        {
          test: /\.node$/,
          use: 'file-loader',
        },
        // Add your additional loaders here
      ],
    },
  };
  
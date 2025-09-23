const path = require('path');

module.exports = {
  entry: {
    app: './js/scriptConversor.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './js/scriptConversor.js',
  },
};

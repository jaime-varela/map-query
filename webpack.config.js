// webpack.config.js
const Dotenv = require('dotenv-webpack');
 
module.exports = {
  plugins: [
    new Dotenv(),
    new webpack.EnvironmentPlugin(['GMAPSKEY'])
  ]
};
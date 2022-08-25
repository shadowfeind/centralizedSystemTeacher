const path = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.bundle.js",
    chunkFilename: "[name].chunk.js",
    publicPath: "",
  },
  devServer: {
    port: 3020,
    contentBase: path.join(__dirname, "../"),
    watchContentBase: true,
    historyApiFallback: true,
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [miniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [new miniCssExtractPlugin(), new CssMinimizerPlugin()],
};

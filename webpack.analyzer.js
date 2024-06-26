const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { merge } = require("webpack-merge");
const prodConfig = require("./webpack.prod");

module.exports = merge(prodConfig, {
  plugins: [new BundleAnalyzerPlugin()],
});

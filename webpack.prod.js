const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
    output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].lazyChunk.js",
    publicPath: "/",
    },
    mode: "production",
    optimization: {
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin(), new TerserPlugin()],
    // runtimeChunk: "single",
    },
    plugins: [
    // new CompressionPlugin({
    //   test: /\.jpg(\?.*)?$/i,
    //   filename: "[path][query]",
    //   algorithm: "gzip",
    //   deleteOriginalAssets: false,
    // }),
    // new CopyPlugin({
    //   patterns: [{ from: "public/portraits", to: "portraits" }],
    // }),
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
    new CleanWebpackPlugin(),
    ],
    module: {
    rules: [
        {
        test: /\.css$/,
        use: [
            MiniCssExtractPlugin.loader, //extract css into files
            "css-loader", //turn css into commonjs
        ],
        },
    ],
    },
});
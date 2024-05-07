const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
        publicPath: "/",
    },
    devServer: {
        host: "localhost",
        port: 3001,
        open: true,
        hot: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
        {
            test: /\.css$/,
            use: [{ loader: "style-loader" }, { loader: "css-loader" }],
        },
        ],
    },
});
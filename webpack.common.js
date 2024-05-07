const path = require("path");
const htmlWebpackTemplate = require("html-webpack-plugin");
const dotenv = require("dotenv");
const webpack = require("webpack");

function getEnv() {
    const env = dotenv.config().parsed;

    // reduce it to a nice object, the same as before
    const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
    }, {});
    return envKeys;
}

module.exports = {
    entry: path.resolve(__dirname, "src", "index.js"),
    plugins: [
    new htmlWebpackTemplate({
        template: "public/index.html",
        favicon: "src/assets/favicon.ico",
    }),
    new webpack.DefinePlugin(getEnv()),
    ],
    module: {
    rules: [
        {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            },
        },
        },
        {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "url-loader",
        options: {
            name: "/assets/[name].[ext]",
        },
        },
        {
        test: /\.html$/,
        use: ["html-loader"],
        },
    ],
    },
};
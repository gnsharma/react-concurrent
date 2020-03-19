const path = require("path");
const webpack = require("webpack");
const BundleTracker = require("webpack-bundle-tracker");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const isDebug = !process.argv.includes("--release");
const isAnalyze = process.argv.includes("--analyze");

module.exports = {
  entry: "./src/index.js",
  mode: isDebug ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js"],
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000
    // publicPath: "http://localhost:3000/dist/",
  },
  plugins: [
    new BundleTracker(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: isDebug
          ? JSON.stringify("development")
          : JSON.stringify("production")
      }
    }),
    ...(isAnalyze ? [new BundleAnalyzerPlugin()] : [])
  ]
};

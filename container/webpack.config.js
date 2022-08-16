const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = {
  externals: {
    
    'ZoomMtg': 'window.ZoomMtg',
  },
  output: {
    publicPath: "http://localhost:8080/",
  },
  resolve: {
    modules: ["node_modules",path.resolve(__dirname, "msdk/node_modules/@zoomus/websdk/dist/zoom-meeting-2.6.0.min.js")],
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  devServer: {
    port: 8080,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      filename: "remoteEntry.js",
      remotes: {
        counter: "counter@http://localhost:8081/remoteEntry.js",
        msdk: 'msdk@http://localhost:8082/remoteEntry.js',
      },
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new webpack.ProvidePlugin({
      // 'window.ZoomMtg': '@zoomus/websdk',
}),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
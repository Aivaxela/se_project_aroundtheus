const path = require("path"); // connect path to webpack config

module.exports = {
  devtool: "inline-source-map",
  entry: {
    main: "./src/index.js",
  },
  stats: "errors-only", // only output when errors happen
  output: {
    // rewrite the output point using the path utility
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "",
  },
  mode: "development", // add development mode here like this
  devServer: {
    static: path.resolve(__dirname, "./dist"), // specifies a folder from where to serve the application and its contents
    compress: true, // this will speed up file loading in development mode
    port: 8080, // will open your site at localhost:8080 (you can use another port)
    open: true, // site will open automatically in the browser after executing npm run dev
    liveReload: true,
    hot: false,
  },
  module: {
    rules: [
      // this is an array of rules
      // add an object containing rules for Babel to it
      {
        // a regular expression that searches for all js files
        test: /\.js$/,
        // all files must be processed by babel-loader
        loader: "babel-loader",
        // exclude the node_modules folder, we don't need to process files in it
        exclude: "/node_modules/",
      },
    ],
  },
};

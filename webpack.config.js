const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = (env, options) => {
  const dev = options.mode === "development"
  return {
    entry: ["babel-polyfill", "./src/index.jsx"],
    resolve: {
      extensions: [".jsx", ".js"],
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: dev ? "bundle.js" : "[name].bundle.js",
      chunkFilename: "[name].chunks.js",
      publicPath: dev ? "/" : "",
    },
    devServer: dev
      ? {
          overlay: true,
          historyApiFallback: true,
        }
      : {},
    optimization: {
      splitChunks: {
        minChunks: 1,
        cacheGroups: {
          default: false,
        },
        chunks: "all",
      },
      moduleIds: "hashed",
      chunkIds: "named",
    },
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader",
        },
        {
          test: /\.(js|jsx)$/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/react", "@babel/preset-env"],
            plugins: [
              ["@babel/plugin-proposal-class-properties"],
              "babel-plugin-syntax-dynamic-import",
              "@babel/plugin-syntax-optional-chaining",
              "transform-regenerator",
            ],
          },
        },
        {
          test: /\.css$/,
          use: dev
            ? ["style-loader", "css-loader"]
            : [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.scss$/,
          use: dev
            ? ["style-loader", "css-loader", "sass-loader"]
            : [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.(woff|woff2|eot|ttf)$/,
          loader: "file?name=fonts/[name].[ext]",
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: dev
            ? "url-loader"
            : [
                "file-loader?name=./static/media/[name].[hash:8].[ext]",
                {
                  loader: "img-loader",
                  options: {
                    plugins: [
                      require("imagemin-gifsicle")({
                        interlaced: false,
                      }),
                      require("imagemin-mozjpeg")({
                        progressive: true,
                        arithmetic: false,
                      }),
                      require("imagemin-pngquant")({
                        floyd: 0.5,
                        speed: 2,
                      }),
                      require("imagemin-svgo")({
                        plugins: [
                          { removeTitle: true },
                          { convertPathData: false },
                        ],
                      }),
                    ],
                  },
                },
              ],
        },
      ],
    },
    plugins: dev
      ? [
          new HtmlWebpackPlugin({
            template: "./index.html",
            inject: "body",
          }),
        ]
      : [
          new HtmlWebpackPlugin({
            template: "./index.html",
            inject: "body",
            //filename: "./index.html",
            //favicon: "./favicon.ico"
          }),
          new CleanWebpackPlugin("build", {}),
          new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
          }),
        ],
  }
}

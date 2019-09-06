import path from "path";
import glob from "glob";
import HtmlWebpackPlugin from "html-webpack-plugin";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import PurgecssPlugin from "purgecss-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CleanWebpackPlugin from "clean-webpack-plugin";

const PATHS = {
  src: path.join(__dirname, "src")
};

module.exports = {
  mode: "development",
  entry: ["@babel/polyfill", "./src/app.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    overlay: true,
    open: true,
    port: 8000
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css"
    }),
    new OptimizeCSSAssetsPlugin({
      filename: "styles.css"
    }),
    new UglifyJsPlugin({
      test: /\.js$/,
      exclude: /node_modules/,
      cache: true,
      sourceMap: true,
      uglifyOptions: {
        warnings: false,
        output: { comments: false }
      }
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: true
            }
          },

          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.(jpg|jpeg|png|gif|ico|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              filename: "assets/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]"
          }
        }
      }
    ]
  }
};

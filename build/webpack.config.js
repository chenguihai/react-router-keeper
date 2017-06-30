var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var env = process.env.NODE_ENV === "production" ? "production" : "development";
var webpackConfig = {
    entry: {
        build: ['babel-polyfill','./example/App.js'],
        vendor: ['react','react-redux','redux']
    },
    output: {
        publicPath: '',
        filename: 'js/[name].[chunkhash:8].js',
        path: path.resolve(__dirname, '../asset')
    },
    module: {
        rules: [{
            test: /\.(css|scss)$/,
            use: ExtractTextPlugin.extract({
                use: 'css-loader!postcss-loader!sass-loader',
                publicPath: '../'
            })
        }, {
            test: /\.(jsx?|es6)$/, 
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-0', 'react']
            }
        }, {
            test: /\.(png|jpe?g|gif)(\?.*)?$/,
            loader: 'url-loader?limit=8192&name=img/[name].[hash:8].[ext]'
        }, {
            test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
            loader: 'url-loader?limit=8192&name=font/[name].[hash:8].[ext]'
        }],
        noParse: /node_modules\/(jquey|moment|vue\.js)/
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: "\'" + env + "\'"
            }
        }),
        new webpack.ProvidePlugin({
        }),
        new ExtractTextPlugin({
            filename: 'css/demo.[chunkhash:8].css'
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function () {
                    return [
                        require("autoprefixer")({
                            browsers: ['ie>=8', '>1% in CN']
                        })
                    ]
                }
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new HtmlWebpackPlugin({
            template: './example/index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', 'json', '.css', '.scss']
    }
}

if (env == "production") {
    process.env.BABEL_ENV = 'production';
    webpackConfig.plugins.push(new OptimizeCSSPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
            discardComments: {
                removeAll: true
            }
        }
    }));
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        comments: false,
        sourceMap: false
    }));
} else {
    process.env.BABEL_ENV = 'development';
    webpackConfig.devtool = 'cheap-module-eval-source-map';
}

module.exports = webpackConfig;
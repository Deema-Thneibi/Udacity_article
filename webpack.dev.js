const webpack = require('webpack');
const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const { CleanWebpackPlugin} = require('clean-webpack-plugin');
 const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');



module.exports = {
    entry: "./src/client/index.js",
    mode: "development",
    devtool: 'hidden-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'var',
        library: 'Client',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
        }
               
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/client/views/index.html',
        filename: './index.html',
    }),
    new CleanWebpackPlugin({
        // Simulate the removal of files
        dry: true,
        // Write Logs to Console
        verbose: true,
        // Automatically remove all unused webpack assets on rebuild
        cleanStaleWebpackAssets: true,
        protectWebpackAssets: false
})],

optimization: {
    minimizer: [
        new CssMinimizerPlugin(),
    ],
    minimize: true,
},

}
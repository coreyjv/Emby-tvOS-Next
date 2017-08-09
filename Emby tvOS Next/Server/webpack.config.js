const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    context: path.resolve(__dirname, './src'),
    entry: {
        app: ['./index.js']
    },
    resolve: {
        modules: ['node_modules'],
        descriptionFiles: ['package.json'],
        alias: {
            handlebars: 'handlebars/dist/handlebars.min.js'
        }
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.png$/,
                use: 'file-loader?name=[name]-[hash].[ext]&publicPath=/images/&outputPath=/images/'
            },
            {
                test: /\.xml$/,
                use: 'raw-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader?presets[]=es2015']
            }
        ]
    },
    plugins: [
        function () {
            this.plugin("done", function (stats) {
                var stats = stats.toJson();
                var appVersion = stats.hash;
                fs.writeFileSync(path.join(__dirname, "/dist", "version"),appVersion);
                
                var bootstrapSource = fs.readFileSync(path.join(__dirname + "/src/bootstrap.js"), "utf8");

                fs.writeFileSync(path.join(__dirname, "/dist/bootstrap.js"),"var appVersion = \"" + appVersion + "\";" + "\n" + bootstrapSource);
            });
        },
        new webpack.ProvidePlugin({
            'fetch': ['whatwg-fetch','fetch']
        }),
        //TODO Implement in 'prod' only
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //     warnings: false,
        //     screw_ie8: true,
        //     conditionals: true,
        //     unused: true,
        //     comparisons: true,
        //     sequences: true,
        //     dead_code: true,
        //     evaluate: true,
        //     if_return: true,
        //     join_vars: true,
        //     },
        //     output: {
        //     comments: false,
        //     },
        // })
    ]
}
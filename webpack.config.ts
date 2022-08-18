const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    watchOptions: {
        poll: true,
        ignored: /node_modules/
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-typescript"],
                    }
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        compress: true,
        port: 6969,
    },
    plugins: [
        new ESLintPlugin({
            files: "./src/**/*",
        }),
    ],
};
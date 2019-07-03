const path = require('path');
const glob = require('glob');
const nodeExternals = require('webpack-node-externals');

const SOURCE_DIR = path.join(__dirname, 'src/main');
const BUILD_DIR = path.join(__dirname, 'build/main');

console.log(glob.sync(`${SOURCE_DIR}/**/*.js*`));

module.exports = {
    entry: toObject(glob.sync(`${SOURCE_DIR}/**/*.js*`)),
    output: {
        path: BUILD_DIR,
        filename: '[name].js',
    },
    target: 'electron-main',
    externals: [nodeExternals()],
    node: {
        __dirname: false,
        __filename: false,
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: SOURCE_DIR,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-object-rest-spread'],
                    },
                },
            },
        ],
    },
};

function toObject(paths) {
    var ret = {};

    paths.forEach(function(path) {
        // you can define entry names mapped to [name] here
        ret[path.slice(SOURCE_DIR.length + 1, path.lastIndexOf('.'))] = path;
    });
    console.log(SOURCE_DIR);
    console.log(ret);

    return ret;
}

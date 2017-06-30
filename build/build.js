require('./check-versions')();

var ora = require('ora');
var rm = require('rimraf');
var path = require('path');
var chalk = require('chalk');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

var spinner = ora(' 正在打包...');
spinner.start();

rm(path.resolve(__dirname, '../asset/'), err => {
    if (err) throw err;
    webpack(webpackConfig, function(err, stats) {
        spinner.stop();
        if (err) throw err;
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n');

        console.log('> ' + chalk.cyan('打包完成\n'));
    });
});
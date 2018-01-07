const path = require('path');
const fs = require('fs');

const babel = require('babel-core');

const xtpl = require('xtpl');

const webpack = require('webpack');
const webpackConfig = require('./webpackConfig');

const request = require('./request');

// const less = require('less');
const gulp = require('gulp');
const less = require('gulp-less');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const cleanCSSPlugin = new LessPluginCleanCSS({advanced: true});

module.exports = {
    JavaScriptbyBabel: function (ReadeJavaScriptFilePath, WriteJavaScriptFilePath) {
        const _this = this;

        return new Promise((resolve, reject) => {

            babel.transformFile(ReadeJavaScriptFilePath, {}, (error, result) => {
                if (error) {
                    reject(`babel 转换 JavaScript 出错, 原因: ${error}`);
                    return
                }

                _this.WriteFillePromise(WriteJavaScriptFilePath, result.code)
                .then(() => {
                    resolve();
                }, (error) => {
                    reject(`babel 转换 成功, 但 JavaScript 写入出错. 原因: ${error}`);
                });
            })
        });
    },

    JavaScriptbyWebpack: function (ReadeJavaScriptFilePath, WriteJavaScriptFilePath, WriteJavaScriptFileName, isproduction) {
        const _this = this;
        isproduction = isproduction || false;

        const ConfigurationObject = webpackConfig(
            ReadeJavaScriptFilePath,
            WriteJavaScriptFilePath,
            WriteJavaScriptFileName,
            isproduction
        );

        return new Promise((resolve, reject) => {
            webpack(ConfigurationObject, (err, stats) => {

                if (err || stats.hasErrors()) {
                    let error = err || stats.hasErrors()
                    reject(`Webpack 打包 出错, 原因: ${error}`);
                    return
                }
                resolve();
            });
        });
    },

    HTML: function (ReadeHTMLfilePath, WriteHTMLfilePath, data) {
        const _this = this;
        data = data || {};

        return new Promise((resolve, reject) => {

            xtpl.renderFile(ReadeHTMLfilePath, data, (error, content) => {
                if (error) {
                    reject(`读取 xtpl 文件 出错, 原因: ${error}`);
                    return
                }

                _this.WriteFillePromise(WriteHTMLfilePath, content)
                .then(() => {
                    resolve(content);
                }, (error) => {
                    reject(`xtpl 转换 成功, 但 HTML 写入出错. 原因: ${error}`);
                });
            });
        });
    },

    gulpLess: function(ReadeCSSfilePath, WriteCSSfilePath, gulpLessfilePath) {
        const _this = this;

        return new Promise((resolve, reject) => {
            gulp.src(ReadeCSSfilePath)
            .pipe(less({
                'paths': gulpLessfilePath,
                'plugins': [cleanCSSPlugin] // 压缩
            }))
            .pipe(gulp.dest(WriteCSSfilePath))
            .on('error', error => reject(`转换 less 文件出错, 原因: ${error}`))
            .on('end', () => resolve());
        });

    },

    // CSS: function (ReadeCSSfilePath, WriteCSSfilePath) {
    //     const _this = this;

    //     return new Promise((resolve, reject) => {

    //         _this.readFilePromise(ReadeCSSfilePath).then((content) => {

    //             less.render(content, (error, output) => {
    //                 if (error) {
    //                     reject(`转换 less 文件出错, 原因: ${error}`);
    //                     return 
    //                 }

    //                 _this.WriteFillePromise(WriteCSSfilePath, output.css)
    //                 .then(() => {
    //                     resolve();
    //                 }, (error) => {
    //                     reject(`转换 less 文件成功, 但 CSS 写入出错. 原因: ${error}`);
    //                 });
    //             });
    //         }, (error) => {
    //             reject(`读取 less 文件出错, 原因: ${error}`);
    //         });
    //     });
    // },

    readFilePromise: (ReadefilePath) => new Promise((resolve, reject) => {

        fs.readFile(ReadefilePath, 'utf8', (error, content) => {
            if (error) {
                reject(error);
                return
            }
            resolve(content);
        });
    }),

    WriteFillePromise: (writeFilePath, data) => new Promise((resolve, reject) => {

        fs.writeFile(writeFilePath, data, 'utf8', (error) => {
            if (error) {
                reject(error);
                return
            }
            resolve();
        });
    })
}

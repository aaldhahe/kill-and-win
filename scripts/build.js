'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
    throw err;
});

const path = require('path');
const chalk = require('react-dev-utils/chalk');
const fs = require('fs-extra');
const webpack = require('webpack');
const configFactory = require('../config/webpack.config');
const paths = require('../config/paths');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const printHostingInstructions = require('react-dev-utils/printHostingInstructions');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const printBuildError = require('react-dev-utils/printBuildError');

const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;
const useYarn = true;

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

const minifiedFile = paths.appBundleProdminOutput;
const outputFile = paths.appBundleProdOutput;

const isInteractive = process.stdout.isTTY;

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
    process.exit(1);
}

// Generate a prdouction webpack configuration
const configArray = [configFactory('production', outputFile), configFactory('production', minifiedFile)];
// checks that browsers are set in package.json browserslist
//Note: we might not need this or might need to modify the browserlist for production
const { checkBrowsers } = require('react-dev-utils/browsersHelper');
configArray.forEach(function (config) {
    checkBrowsers(paths.appPath, isInteractive)
        .then(() => {
            // First, read the current file sizes in build directory.
            // This lets us display how much they changed later.
            return measureFileSizesBeforeBuild(paths.appBuildSrc);
        })
        .then(previousFileSizes => {
            // Remove all content but keep the directory so that
            // if you're in it, you don't end up in Trash
            fs.emptyDirSync(paths.appBuild);
            // Merge src folder
            // copySrcFolder();
            // Start the webpack build
            return build(previousFileSizes);
        })
        .then(
            ({ stats, previousFileSizes, warnings }) => {
                if (warnings.length) {
                    console.log(chalk.yellow('Compiled with warnings.\n'));
                    console.log(warnings.join('\n\n'));
                    console.log(
                        '\nSearch for the ' +
                            chalk.underline(chalk.yellow('keywords')) +
                            ' to learn more about each warning.'
                    );
                    console.log(
                        'To ignore, add ' + chalk.cyan('// eslint-disable-next-line') + ' to the line before.\n'
                    );
                } else {
                    console.log(chalk.green('Compiled successfully.\n'));
                }

                if (config.optimization.minimize) {
                    console.log(chalk.magenta('File sizes after gzip:\n'));
                }
                printFileSizesAfterBuild(
                    stats,
                    previousFileSizes,
                    paths.appBuildSrc,
                    WARN_AFTER_BUNDLE_GZIP_SIZE,
                    WARN_AFTER_CHUNK_GZIP_SIZE
                );
                console.log();

                const appPackage = require(paths.appPackageJson);
                const publicUrl = paths.publicUrlOrPath;
                const publicPath = config.output.publicPath;
                const buildFolder = path.relative(process.cwd(), paths.appBuild);
                printHostingInstructions(appPackage, publicUrl, publicPath, buildFolder, useYarn);
            },
            err => {
                const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === 'true';
                if (tscCompileOnError) {
                    console.log(
                        chalk.red(
                            'Compiled with the following type errors (you may want to check these before deploying your app):\n'
                        )
                    );
                    printBuildError(err);
                } else {
                    console.log(chalk.red('Failed to compile.\n'));
                    printBuildError(err);
                    process.exit(1);
                }
            }
        )
        .catch(err => {
            if (err && err.message) {
                console.log(chalk.red(err.message));
            }
            process.exit(1);
        });

    // Create the production build and print the deployment instructions.
    function build(previousFileSizes) {
        // This lets you use absolute paths in imports inside large monorepos:
        if (process.env.NODE_PATH) {
            console.log(
                chalk.yellow(
                    'Setting NODE_PATH to resolve modules isnt a good idea if you want use baseUrl in tsconfig.json and specifically for this monorepo project'
                )
            );
            console.log();
        }

        console.log(chalk.magenta('Creating an optimized production build...'));
        const compiler = webpack(config);

        return new Promise((resolve, reject) => {
            compiler.run((err, stats) => {
                let messages;
                if (err) {
                    if (!err.message) {
                        return reject(err);
                    }

                    let errMessage = err.message;

                    // Add additional information for postcss errors, TODO: remove if we don't use css
                    if (Object.prototype.hasOwnProperty.call(err, 'postcssNode')) {
                        errMessage += '\nCompileError: Begins at CSS selector ' + err['postcssNode'].selector;
                    }

                    messages = formatWebpackMessages({
                        errors: [errMessage],
                        warnings: []
                    });
                } else {
                    messages = formatWebpackMessages(stats.toJson({ all: false, warnings: true, errors: true }));
                }
                if (messages.errors.length) {
                    // Only keep the first error. Others are often indicative
                    // of the same problem, but confuse the reader with noise.
                    if (messages.errors.length > 1) {
                        messages.errors.length = 1;
                    }
                    return reject(new Error(messages.errors.join('\n\n')));
                }
                if (
                    process.env.CI &&
                    (typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== 'false') &&
                    messages.warnings.length
                ) {
                    // TODO: not sure we want to treat warnings as errors in CI. However, leaving for starters as team decides later on
                    console.log(
                        chalk.yellow(
                            '\nTreating warnings as errors because process.env.CI = true.\n' +
                                'Most CI servers set it automatically.\n'
                        )
                    );
                    return reject(new Error(messages.warnings.join('\n\n')));
                }

                return resolve({
                    stats,
                    previousFileSizes,
                    warnings: messages.warnings
                });
            });
        });
    }
});

function copySrcFolder() {
    fs.copySync(paths.appSrc, paths.appBuild, {
        dereference: true,
        filter: file => file !== paths.appHtml
    });
}

const HtmlWebpackPlugin = require('html-webpack-plugin');
const PnpWebpackPlugin = require(`pnp-webpack-plugin`);
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const chalk = require('react-dev-utils/chalk');
const paths = require('./paths');
const getEnv = require('./env');
const fs = require('fs');
const useTypeScript = fs.existsSync(paths.appTsConfig);
const shouldUseSourceMap = true;

module.exports = function (webpackEnv, name) {
    const isEnvDevelopment = webpackEnv === 'development';
    const isEnvProduction = webpackEnv === 'production';
    const env = getEnv(webpackEnv);
    const minify = name.indexOf('min') > -1;
    return {
        mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
        bail: isEnvProduction,
        entry: paths.appIndexJs,
        devtool: isEnvProduction
            ? shouldUseSourceMap
                ? 'source-map'
                : false
            : isEnvDevelopment && 'cheap-module-source-map',
        output: {
            filename: name,
            path: paths.appBuildSrc,
            sourceMapFilename: name + '.map',
            library: 'rounds-webclient',
            libraryTarget: 'umd',
            publicPath: paths.publicUrlOrPath
        },
        plugins: [
            new HtmlWebpackPlugin({
                inject: true,
                template: paths.appHtml
            }),

            new ForkTsCheckerWebpackPlugin(
                PnpWebpackPlugin.forkTsCheckerOptions({
                    useTypescriptIncrementalApi: true
                })
            ),
            console.log(chalk.cyan(`NODE_ENV is set to: ${env.NODE_ENV}`)),
            new webpack.DefinePlugin(env)
        ].filter(Boolean),
        optimization: {
            minimize: minify,
            minimizer: [
                // This is only used in production mode
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            ecma: 5,
                            warnings: false
                        },
                        parse: {
                            // We want terser to parse ecma 6 code. However, we don't want it
                            // to apply any minification steps that turns valid ecma 5 code
                            // into invalid ecma 5 code. This is why the 'compress' and 'output'
                            // sections only apply transformations that are ecma 5 safe
                            ecma: 6
                        },
                        output: {
                            ecma: 5,
                            comments: false
                        }
                    },
                    sourceMap: shouldUseSourceMap
                })
            ]
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: paths.appNodeModules,
                    use: [
                        {
                            loader: require.resolve('ts-loader'),
                            options: PnpWebpackPlugin.tsLoaderOptions({ transpileOnly: true })
                        }
                    ]
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: require.resolve('babel-loader'),
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                },
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack']
                },
                {
                    test: /\.s?css$/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    loader: require.resolve('file-loader'),
                    exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/, /\.s?css$/],
                    options: {
                        name: paths.appSvgs
                    }
                }
            ]
        },
        resolve: {
            modules: [__dirname, 'node_modules', paths.appNodeModules, paths.appSrc],
            extensions: paths.moduleFileExtensions
                .map(ext => `.${ext}`)
                .filter(ext => useTypeScript || !ext.includes('ts')),
            plugins: [PnpWebpackPlugin]
        },
        resolveLoader: {
            plugins: [PnpWebpackPlugin.moduleLoader(module)]
        }
    };
};

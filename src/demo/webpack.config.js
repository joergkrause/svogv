let isProd = false;

const config = {
    entry: {
        app: './Client/App/app.ts',
        vendor: './vendor/vendor.ts',
        polyfills: './vendor/polyfills.ts'
    },
    output: {
        filename: '[name].js',
        path: './assets/js/'
    },
    resolve: {
        /*
        * An array of extensions that should be used to resolve modules.
        * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
        */
        extensions: ['.ts', '.js', '.json', '.css', '.scss', '.less']
    },
    module: {
        rules: [
            /*
            * Typescript loader support for .ts and Angular 2 async routes via .async.ts
            * Replace templateUrl and stylesUrl with require()
            *
            * See: https://github.com/s-panferov/awesome-typescript-loader
            * See: https://github.com/TheLarkInn/angular2-template-loader
            */
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }

        ]
    },

    /*
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
        global: true,
        crypto: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};
module.exports = config;
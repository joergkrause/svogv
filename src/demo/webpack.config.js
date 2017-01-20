let isProd = false;

const config = {
    entry: {
        app: './Client/App/app.ts',
        // vendor: './vendor/vendor.ts',
        // polyfills: './vendor/polyfills.ts'
    },
    output: {
        filename: './assets/js/bundle.js'
    },
    resolve: {
        /*
        * An array of extensions that should be used to resolve modules.
        * Wenn die Endung beim Import in den TypeScript Dateien nicht angegeben wird,
        * dann wird versucht die fehlende Endung mit den Endungen hier "wiederherzustellen"
        *
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
                //kümmert sich um das Erstellen von js code aus TypeScript und wandelt die passenden
                //relativen templateUrl aufrufe in ein Konstrukt um das der html Loader versteht.
                use: [
                    'awesome-typescript-loader',
                    'angular2-template-loader'
                ]
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
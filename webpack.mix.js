const mix = require('laravel-mix');
require('laravel-mix-stylelint');

mix.webpackConfig({
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ]
    }
});

mix.stylelint({files: ['**/*.scss']});
mix.js('resources/js/app.js', 'public/js').vue();
mix.postCss('resources/css/app.css', 'public/css', [

]);


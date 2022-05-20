var path = require('path');

module.exports = {
    entry: './src/main/js/app.js',
    devtool: 'eval-source-map',
    cache: true,
	mode: 'production',
    resolve: {
        alias: {
            'stompjs': __dirname + '/node_modules' + '/stompjs/lib/stomp.js',
        },
        extensions: ['.js', '.jsx']
    },
    output: {
        path: __dirname + '/src/main/resources/static/built/',
        filename: 'bundle.js'
    },
	module: {
		rules: [
			{
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"],
            },
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"]
					}
				}]
			}
		]
	}
};
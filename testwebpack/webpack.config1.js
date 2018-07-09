var uglifyjs = require('uglifyjs-webpack-plugin');

module.exports = {
    entry:'./src/index.js',
    output:{
        path:__dirname + '/dist',
        filename:'main.js',
        publicPath:__dirname + '/dist'
    },
    mode:'development',
    
    module:{
        rules:[
            {test:/.less|.css$/,use:['style-loader','css-loader','less-loader']},
            {test:/.jpg|.png$/,use:['url-loader?limit=10&name=./[name].[ext]']}
        ]
    },
    plugins:[
        new uglifyjs()
    ]
};
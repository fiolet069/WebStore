const path = require("path");

module.exports = {
    entry: "./wwwroot/Index.js",
    output: {
        path: path.resolve(__dirname, "wwwroot"),
        filename: "Build.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
}
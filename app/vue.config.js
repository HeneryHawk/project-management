module.exports = {
    transpileDependencies: ["vuetify"],
    configureWebpack: {
        devtool: "source-map",
    },
    devServer: {
        proxy: "http://localhost:3001/",
    },
};
